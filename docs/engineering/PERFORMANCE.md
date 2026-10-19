# Low-Memory Performance Plan

Benchmark Electron, WebView2 and CEF on the same Windows machine with identical workloads: cold start, warm start, 1/5/20 tabs, idle and active browsing, downloads, video, agent run, memory pressure and crash recovery.

Measure private working set, aggregate process RSS, peak memory, CPU, disk, startup, page latency, package size and battery impact. Repeat measurements and report variance and median/p95. Set numeric budgets only after baselines. Suspend inactive agents and bound concurrent tools, but never weaken isolation to achieve a RAM target.
