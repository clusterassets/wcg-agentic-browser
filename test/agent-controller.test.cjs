const test = require('node:test');
const assert = require('node:assert/strict');
const { AgentController } = require('../experiments/electron/agent-controller.cjs');
test('draft creation is inert and approval-gated', () => {
  const c = new AgentController();
  const t = c.create('Review this tab', { url: 'https://example.com' });
  assert.equal(t.state, 'AWAITING_APPROVAL');
  assert.match(t.note, /not connected/);
  assert.equal(c.list().length, 1);
  assert.equal(c.dismiss(t.id), true);
});
test('input and capacity are bounded', () => {
  const c = new AgentController({ limit: 1 });
  assert.throws(() => c.create(''));
  assert.throws(() => c.create('x'.repeat(2001)));
  c.create('One');
  assert.throws(() => c.create('Two'));
});
