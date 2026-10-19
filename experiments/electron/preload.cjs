'use strict';
const { contextBridge, ipcRenderer } = require('electron');
const channels = new Set(['tabs:list','tabs:new','tabs:activate','tabs:close','tabs:navigate','tabs:back','tabs:forward','tabs:reload','agent:list','agent:draft','agent:dismiss','page:observe']);
contextBridge.exposeInMainWorld('wcg', Object.freeze({
  call: (channel, ...args) => {
    if (!channels.has(channel)) return Promise.reject(new Error('Unsupported command'));
    return ipcRenderer.invoke(channel, ...args);
  },
  onTabs: callback => {
    if (typeof callback !== 'function') return;
    ipcRenderer.on('tabs:state', (_event, tabs) => callback(tabs));
  }
}));
