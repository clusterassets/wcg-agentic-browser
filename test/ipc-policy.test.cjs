'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { isTrustedShell, safePageSnapshot } = require('../experiments/electron/ipc-policy.cjs');
test('only top-level shell frame is trusted', () => {
  const shell = path.resolve('experiments/electron/shell.html');
  const sender = { id: 5 };
  const frame = { url: pathToFileURL(shell).href };
  sender.mainFrame = frame;
  assert.equal(isTrustedShell({sender,senderFrame:frame},5,shell),true);
  assert.equal(isTrustedShell({sender,senderFrame:frame},6,shell),false);
  assert.equal(isTrustedShell({sender,senderFrame:{url:frame.url}},5,shell),false);
  assert.equal(isTrustedShell({sender,senderFrame:{url:'https://evil.example'}},5,shell),false);
});
test('page observations are bounded and data-only', () => {
  const o = safePageSnapshot({url:'x'.repeat(3000),title:'t'.repeat(300),headings:Array(60).fill('h'.repeat(300))});
  assert.equal(o.url.length,2048);
  assert.equal(o.title.length,256);
  assert.equal(o.headings.length,30);
  assert.equal(o.headings[0].length,200);
  assert.equal(Object.isFrozen(o),true);
});
