# Browser Engine Benchmark Harness — Phase 1

This folder defines measurement intake, **not** an engine performance claim. Capture measurements from real, comparable Electron, WebView2 and CEF prototypes on the same Windows host.

Run `npm run benchmark:report -- measurements/run1.json` after collecting data. Each JSON record must include engine, engineVersion, os, scenario, runId, measuredAt and numeric metrics (e.g. totalWorkingSetMiB, startupMs, cpuPercent). Keep raw process-level samples and hardware configuration in a separate artifact. Do not mix shared-runtime and bundled-runtime memory without labeling the difference.

**Next tasks:** implement identical navigation workload in all three engines; instrument child-process trees and OS working sets; repeat runs; report median and p95; security review; publish ADR-0001 decision.
