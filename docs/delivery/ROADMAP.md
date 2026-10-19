# Phased Implementation Plan

## Phase 0 — Product and architecture
Requirements, use cases, scope, threat model, success criteria and measurable budgets.

## Phase 1 — Engine spike
Build equivalent Electron, WebView2 and CEF prototypes. Benchmark and publish engine ADR.

## Phase 2 — Browser MVP
Tabs, navigation, history, bookmarks, downloads, profiles, settings, accessible shell, sandboxed IPC.

## Phase 3 — Native agent kernel
Planner, task state machine, model adapters, SQLite journal, pause/cancel/resume, audit and diagnostics.

## Phase 4 — Permissioned tools
Capability broker, browser inspection/navigation, filesystem and developer tools, confirmation surfaces, revocation and adversarial tests.

## Phase 5 — Resilience and providers
Recovery, resource limits, verified provider integrations, optional localhost API and observability.

## Phase 6 — Beta/release
Security review, signed packaging/update, privacy and license decisions, documentation, support, rollback and release gates.

**Dependencies:** No privileged tool execution before authorization broker; no engine selection before comparative benchmark; no public beta before recovery and security acceptance.
