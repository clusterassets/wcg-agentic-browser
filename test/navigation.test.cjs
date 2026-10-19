'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { normalizeNavigation } = require('../experiments/electron/navigation.cjs');
test('accepts safe HTTPS addresses', () => {
  assert.equal(normalizeNavigation('example.com'), 'https://example.com/');
  assert.equal(normalizeNavigation('https://example.com/path'), 'https://example.com/path');
});
test('rejects privileged schemes and credentials', () => {
  for (const input of ['file:///etc/passwd','javascript:alert(1)','data:text/html,hi','https://u:p@example.com','', '\u0000', 'a'.repeat(2050)]) assert.equal(normalizeNavigation(input), null, input);
});
