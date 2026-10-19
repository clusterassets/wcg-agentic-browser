import test from 'node:test';
import assert from 'node:assert/strict';
import { createTask, transition, canTransition, STATES } from '../src/agent/task-machine.mjs';
import { CapabilityBroker } from '../src/agent/capability-broker.mjs';

test('task follows explicit plan/execute/observe/verify/decide sequence', () => {
  let task = createTask('task-1');
  for (const state of ['PLANNED','AWAITING_APPROVAL','EXECUTING','OBSERVING','VERIFYING','DECIDING','COMPLETED']) task = transition(task, state);
  assert.equal(task.state, STATES.COMPLETED);
  assert.equal(task.transitions, 7);
});
test('invalid transitions fail closed', () => {
  assert.equal(canTransition('CREATED','EXECUTING'), false);
  assert.throws(() => transition(createTask('x'),'EXECUTING'), /Forbidden/);
  assert.throws(() => transition(createTask('x'),'MADE_UP'), /Forbidden/);
});
test('transition budget is enforced', () => {
  const task = transition(createTask('x',{maxTransitions:1}),'PLANNED');
  assert.throws(() => transition(task,'AWAITING_APPROVAL'), /budget/);
});
test('task is immutable', () => {
  const task = createTask('x');
  assert.throws(() => { task.state = 'EXECUTING'; }, TypeError);
});
test('broker denies by default and scopes every dimension', () => {
  const broker = new CapabilityBroker();
  const scope = {taskId:'t',profileId:'p',origin:'https://example.com',capability:'page.read'};
  assert.equal(broker.allows(scope),false);
  broker.grant({...scope,expiresAt:Date.now()+60_000});
  assert.equal(broker.allows(scope),true);
  for (const field of Object.keys(scope)) assert.equal(broker.allows({...scope,[field]:scope[field]+'-other'}),false);
  assert.equal(broker.revoke(scope),true);
  assert.equal(broker.allows(scope),false);
});
test('broker rejects expired and malformed origin grants', () => {
  const broker = new CapabilityBroker();
  const scope = {taskId:'t',profileId:'p',origin:'https://example.com',capability:'page.read'};
  assert.throws(()=>broker.grant({...scope,expiresAt:Date.now()-1}),/Expiry/);
  assert.throws(()=>broker.grant({...scope,origin:'file:///etc/passwd',expiresAt:Date.now()+1000}),/origin/);
  assert.throws(()=>broker.grant({...scope,origin:'https://example.com/path',expiresAt:Date.now()+1000}),/origin/);
});
test('broker expires grant without background timers', () => {
  const broker = new CapabilityBroker();
  const scope = {taskId:'t',profileId:'p',origin:'https://example.com',capability:'page.read'};
  broker.grant({...scope,expiresAt:2000000000000});
  assert.equal(broker.allows(scope,2000000000000),false);
});
