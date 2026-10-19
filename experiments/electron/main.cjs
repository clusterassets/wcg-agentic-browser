'use strict';
const { app, BrowserWindow, WebContentsView, ipcMain, session } = require('electron');
const path = require('node:path');
const { normalizeNavigation } = require('./navigation.cjs');
let win;
const tabs = new Map();
let activeId = null;
let sequence = 0;
const BAR_HEIGHT = 88;
const HOME = 'https://example.com/';
function emitTabs() {
  if (!win || win.isDestroyed()) return;
  win.webContents.send('tabs:state', [...tabs].map(([id, t]) => ({ id, url: t.view.webContents.getURL() || t.url, title: t.view.webContents.getTitle() || 'New tab', active: id === activeId })));
}
function layout() {
  if (!win) return;
  const [width, height] = win.getContentSize();
  for (const [, tab] of tabs) tab.view.setBounds({ x: 0, y: BAR_HEIGHT, width: Math.max(0, width), height: Math.max(0, height - BAR_HEIGHT) });
}
function activate(id) {
  if (!tabs.has(id)) return false;
  if (activeId && tabs.has(activeId)) win.contentView.removeChildView(tabs.get(activeId).view);
  activeId = id;
  win.contentView.addChildView(tabs.get(id).view);
  layout(); emitTabs(); return true;
}
function openTab(url = HOME) {
  const id = String(++sequence);
  const view = new WebContentsView({ webPreferences: { sandbox: true, contextIsolation: true, nodeIntegration: false, webSecurity: true, partition: 'persist:spike' } });
  view.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
  view.webContents.on('will-navigate', (event, target) => { if (!/^https?:\/\//i.test(target)) event.preventDefault(); });
  view.webContents.on('did-navigate', emitTabs);
  view.webContents.on('page-title-updated', emitTabs);
  view.webContents.on('render-process-gone', (_event, details) => { console.error('Renderer terminated:', details.reason); emitTabs(); });
  tabs.set(id, { view, url });
  activate(id);
  view.webContents.loadURL(url).catch(err => console.error('Navigation failed:', err.message));
  return id;
}
function closeTab(id) {
  const tab = tabs.get(id); if (!tab) return false;
  if (id === activeId) { win.contentView.removeChildView(tab.view); activeId = null; }
  tab.view.webContents.close(); tabs.delete(id);
  if (!activeId && tabs.size) activate(tabs.keys().next().value);
  else if (!tabs.size) openTab();
  emitTabs(); return true;
}
app.whenReady().then(() => {
  session.fromPartition('persist:spike').setPermissionRequestHandler((_wc, _permission, callback) => callback(false));
  win = new BrowserWindow({ width: 1100, height: 780, minWidth: 520, minHeight: 320, title: 'WCG Browser Engine Spike', webPreferences: { preload: path.join(__dirname, 'preload.cjs'), sandbox: true, contextIsolation: true, nodeIntegration: false, webSecurity: true } });
  win.removeMenu();
  win.loadFile(path.join(__dirname, 'shell.html'));
  win.on('resize', layout);
  win.webContents.on('did-finish-load', emitTabs);
  ipcMain.handle('tabs:list', () => [...tabs].map(([id, t]) => ({ id, url: t.view.webContents.getURL() || t.url, title: t.view.webContents.getTitle() || 'New tab', active: id === activeId })));
  ipcMain.handle('tabs:new', () => openTab());
  ipcMain.handle('tabs:activate', (_event, id) => activate(id));
  ipcMain.handle('tabs:close', (_event, id) => closeTab(id));
  ipcMain.handle('tabs:navigate', (_event, input) => { const url = normalizeNavigation(input); if (!url) return { ok: false, error: 'Only http(s) navigation is supported' }; const tab = tabs.get(activeId); if (!tab) return { ok: false, error: 'No active tab' }; tab.view.webContents.loadURL(url).catch(err => console.error(err.message)); return { ok: true, url }; });
  ipcMain.handle('tabs:back', () => { const wc = tabs.get(activeId)?.view.webContents; if (wc?.navigationHistory.canGoBack()) wc.navigationHistory.goBack(); });
  ipcMain.handle('tabs:forward', () => { const wc = tabs.get(activeId)?.view.webContents; if (wc?.navigationHistory.canGoForward()) wc.navigationHistory.goForward(); });
  ipcMain.handle('tabs:reload', () => tabs.get(activeId)?.view.webContents.reload());
  openTab();
});
app.on('window-all-closed', () => app.quit());
