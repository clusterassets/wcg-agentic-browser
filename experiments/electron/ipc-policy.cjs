'use strict';
const path = require('node:path');
const { pathToFileURL } = require('node:url');
function isTrustedShell(event, shellWebContentsId, shellPath) {
  if (!event || event.sender?.id !== shellWebContentsId) return false;
  const expected = pathToFileURL(path.resolve(shellPath)).href;
  const frame = event.senderFrame;
  if (!frame || frame !== event.sender.mainFrame) return false;
  return frame.url === expected;
}
function safePageSnapshot(input) {
  if (!input || typeof input !== 'object') throw new TypeError('Invalid observation');
  const str = (value, max) => typeof value === 'string' ? value.slice(0, max) : '';
  return Object.freeze({
    url: str(input.url, 2048),
    title: str(input.title, 256),
    description: str(input.description, 500),
    headings: Array.isArray(input.headings) ? input.headings.slice(0, 30).map(x => str(x, 200)) : [],
    capturedAt: new Date().toISOString()
  });
}
module.exports = { isTrustedShell, safePageSnapshot };
