/** Pure state transition kernel. No browser, network, or tool execution. */
export const STATES = Object.freeze({
  CREATED: 'CREATED', PLANNED: 'PLANNED', AWAITING_APPROVAL: 'AWAITING_APPROVAL',
  EXECUTING: 'EXECUTING', OBSERVING: 'OBSERVING', VERIFYING: 'VERIFYING',
  DECIDING: 'DECIDING', PAUSED: 'PAUSED', BLOCKED: 'BLOCKED',
  INTERRUPTED: 'INTERRUPTED', FAILED: 'FAILED', COMPLETED: 'COMPLETED'
});
const allowed = new Map(Object.entries({
  CREATED: ['PLANNED', 'FAILED'],
  PLANNED: ['AWAITING_APPROVAL', 'PAUSED', 'FAILED'],
  AWAITING_APPROVAL: ['EXECUTING', 'BLOCKED', 'PAUSED', 'FAILED'],
  EXECUTING: ['OBSERVING', 'INTERRUPTED', 'PAUSED', 'FAILED'],
  OBSERVING: ['VERIFYING', 'INTERRUPTED', 'FAILED'],
  VERIFYING: ['DECIDING', 'INTERRUPTED', 'FAILED'],
  DECIDING: ['PLANNED', 'COMPLETED', 'BLOCKED', 'FAILED'],
  PAUSED: ['PLANNED', 'FAILED'],
  BLOCKED: ['PLANNED', 'FAILED'],
  INTERRUPTED: ['PLANNED', 'BLOCKED', 'FAILED'],
  FAILED: [], COMPLETED: []
}));
export function createTask(id, { maxTransitions = 100 } = {}) {
  if (typeof id !== 'string' || !id.trim()) throw new TypeError('Nonempty task ID required');
  if (!Number.isSafeInteger(maxTransitions) || maxTransitions < 1) throw new RangeError('Invalid transition budget');
  return Object.freeze({ id, state: STATES.CREATED, transitions: 0, maxTransitions });
}
export function transition(task, next) {
  if (!task || !allowed.has(task.state)) throw new TypeError('Invalid task state');
  if (!allowed.get(task.state).includes(next)) throw new Error(`Forbidden transition: ${task.state} → ${next}`);
  if (task.transitions >= task.maxTransitions) throw new Error('Task transition budget exhausted');
  return Object.freeze({ ...task, state: next, transitions: task.transitions + 1 });
}
export function canTransition(state, next) { return allowed.get(state)?.includes(next) ?? false; }
