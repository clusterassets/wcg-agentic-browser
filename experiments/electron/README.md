# Electron browser engine spike (Phase 1)

Experimental desktop browsing shell for comparative engine evaluation, **not a production browser**.

## Windows run

From repository root with Node.js 22+:

```powershell
npm install --no-save electron@38
npx electron experiments/electron/main.cjs
```

Electron is an experimental dependency. The main Node agent-kernel suite has no third-party dependencies. This experiment has **not** been GUI-tested on Windows in the current environment.

## Implemented
Multi-process Chromium via WebContentsView; tabs, address bar, navigation, back, forward and reload; sandboxed page web contents; narrow preload IPC allowlist; default-deny permissions and popups.

## Missing
Downloads, profiles UX, bookmarks, history UI, accessibility audit, updater, packaging, memory measurements, agent integration and automated GUI acceptance. Shared partition is not production profile isolation. External protocols, redirects and permission policy need dedicated review. **Do not use for sensitive browsing.**
