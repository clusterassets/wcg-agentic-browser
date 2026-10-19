# Phase 1 — Electron engine spike

**Status:** Source committed; GUI runtime not verified on Windows.

Prototype: `experiments/electron/`. Includes browser-owned shell and separate sandboxed WebContentsView tabs, default-deny permission handler, restricted navigation and narrow IPC preload. This is not a full browser.

Local validation: Node.js 22 navigation unit tests 2/2 passed; `node --check experiments/electron/main.cjs` passed. GUI behavior, security isolation and memory budgets are unverified.

## Acceptance remaining
1. Install pinned, security-supported Electron and run on Windows.
2. Test tab navigation, redirects, crash recovery, popup policy and permissions.
3. Compare equivalent WebView2 and CEF prototypes.
4. Collect repeatable memory/startup measurements.
5. Review IPC, protocol handling, CSP and download policy.
6. Approve engine ADR-0001 before selecting production stack.
