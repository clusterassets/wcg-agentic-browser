# Product Requirements Document (PRD)

## Vision
WCG Agentic Browser is an independent, Edge-like desktop browser with an integrated, permission-gated agent, not a Hermes gateway or an extension-dependent proxy.

## Personas
Everyday browser users, developers, researchers, accessibility users, and operators.

## In scope
- Tabs, navigation, profiles, bookmarks, history, downloads, accessibility, developer tools, and user settings.
- Agent workspace: intent, plan, execute, observe, verify, decide/replan, pause, resume, cancel.
- Explicit authorization for filesystem, terminal, network, forms, account mutations, and external tools.
- Provider adapters with session awareness; task state remains authoritative in local storage.
- SQLite-backed audit, task checkpoints, recovery, diagnostics and privacy controls.
- Optional loopback API for local clients, disabled or authenticated by default.

## Out of scope for MVP
Building a browser rendering engine; unrestricted autonomous purchases or account changes; quota circumvention; automatic credentials extraction; compatibility guarantees for all web-chat UIs or extensions.

## Nonfunctional requirements
Sandboxing, origin/profile isolation, least privilege, reproducible performance budgets, deterministic recovery, signed updates, accessible controls, and no secret leakage to logs.

## Acceptance
No feature is complete without functional, adversarial, failure/recovery and performance evidence. Browser-engine choice remains pending comparative benchmarks.
