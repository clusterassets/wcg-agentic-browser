# ADR-0001: Browser Engine Selection

**Status: OPEN.** Candidates: Electron/Chromium, Microsoft WebView2, Chromium Embedded Framework (CEF).

Evaluate cold/warm startup, idle and active working set, total process memory, process count, 1/5/20 tabs, CPU, accessibility, sandboxing, isolation, browser features, packaging, update velocity, Windows compatibility, developer tooling, and licensing.

Decision requires comparable reproducible measurements and security review. Do not select solely on nominal RAM or disable sandboxing to save memory. Engine and application architecture should be independently replaceable.
