'use strict';
const { safePageSnapshot } = require('./ipc-policy.cjs');
/**
 * Read-only, explicitly user-invoked observation.
 * Page content is untrusted. No page-provided script is evaluated.
 */
async function observeActivePage(webContents) {
  if (!webContents || webContents.isDestroyed()) throw new Error('No active page');
  const pageUrl = webContents.getURL();
  if (!/^https?:\/\//i.test(pageUrl)) throw new Error('Unsupported page scheme');
  const script = `(() => {
    const text = (value, max) => String(value || '').trim().slice(0, max);
    return {
      url: location.href,
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.content || '',
      headings: Array.from(document.querySelectorAll('h1,h2,h3')).slice(0,30).map(el => text(el.textContent,200))
    };
  })()`;
  const result = await webContents.executeJavaScript(script, true);
  if (webContents.isDestroyed() || webContents.getURL() !== pageUrl) throw new Error('Page navigated during observation');
  return safePageSnapshot(result);
}
module.exports = { observeActivePage };
