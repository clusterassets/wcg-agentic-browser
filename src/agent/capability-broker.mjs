/** In-memory, deny-by-default capability prototype. Not a production security boundary. */
export class CapabilityBroker {
  #grants = new Map();
  grant({ taskId, profileId, origin, capability, expiresAt }) {
    for (const value of [taskId, profileId, origin, capability])
      if (typeof value !== 'string' || !value) throw new TypeError('Missing capability scope');
    let parsed;
    try { parsed = new URL(origin); } catch { throw new TypeError('Invalid origin'); }
    if (!['https:', 'http:'].includes(parsed.protocol) || parsed.origin !== origin) throw new TypeError('Canonical HTTP(S) origin required');
    if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) throw new RangeError('Expiry must be in the future');
    const key = JSON.stringify([taskId, profileId, origin, capability]);
    this.#grants.set(key, expiresAt);
    return key;
  }
  allows({ taskId, profileId, origin, capability }, now = Date.now()) {
    const key = JSON.stringify([taskId, profileId, origin, capability]);
    const expiry = this.#grants.get(key);
    if (expiry === undefined) return false;
    if (now >= expiry) { this.#grants.delete(key); return false; }
    return true;
  }
  revoke({ taskId, profileId, origin, capability }) {
    return this.#grants.delete(JSON.stringify([taskId, profileId, origin, capability]));
  }
  clear() { this.#grants.clear(); }
}
