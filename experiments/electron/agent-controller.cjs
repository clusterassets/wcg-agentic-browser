'use strict';
const { randomUUID } = require('node:crypto');
/** Local-only draft planner. No model or tools are invoked. */
class AgentController {
  #tasks = new Map();
  #limit;
  constructor({ limit = 25 } = {}) {
    if (!Number.isSafeInteger(limit) || limit < 1) throw new RangeError('Invalid task limit');
    this.#limit = limit;
  }
  create(input, context = {}) {
    if (typeof input !== 'string' || !input.trim() || input.length > 2000) throw new TypeError('Enter a task (1–2000 characters)');
    if (this.#tasks.size >= this.#limit) throw new Error('Task limit reached');
    const url = typeof context.url === 'string' ? context.url : '';
    const task = Object.freeze({
      id: randomUUID(), intent: input.trim(), state: 'AWAITING_APPROVAL',
      createdAt: new Date().toISOString(),
      steps: Object.freeze([
        'Review task intent and browser context',
        'Identify required tools and permissions',
        'Request explicit approval before any browser action',
        'Execute, observe and verify approved steps'
      ]),
      contextUrl: /^https?:\/\//.test(url) ? url.slice(0,2048) : '',
      note: 'Planning preview only: execution, model calls and browser tools are not connected.'
    });
    this.#tasks.set(task.id, task);
    return task;
  }
  list() { return [...this.#tasks.values()]; }
  dismiss(id) {
    if (typeof id !== 'string' || !this.#tasks.has(id)) return false;
    this.#tasks.delete(id); return true;
  }
}
module.exports = { AgentController };
