# Architecture

## Components
Browser shell → isolated browser-engine adapter → browser-owned permission UI; agent workspace → orchestrator → capability broker → tools; orchestrator → provider adapters; orchestrator → SQLite task journal and redacted telemetry. Optional authenticated loopback server exposes the same permissioned orchestration, never unrestricted renderer IPC.

## Authority
User intent and grants are authoritative. Pages, model output, downloads and tool responses are untrusted data. Provider chat history is an optimization, not a substitute for verified local task state.

## Agent state machine
CREATED → PLANNED → AWAITING_APPROVAL → EXECUTING → OBSERVING → VERIFYING → DECIDING → COMPLETED. PAUSED, BLOCKED, INTERRUPTED and FAILED are explicit states. Replan attempts and resource consumption are bounded. Unknown external side effects require manual inspection, never automatic retry.

## Storage
SQLite WAL, versioned migrations, task/event IDs, retention limits, profile partitioning, redacted diagnostics, no raw credentials. Protect data at rest where platform support permits.

## Isolation
Separate browser profiles, strict IPC schemas, origin checks, navigation invalidation of grants, renderer sandboxing, update verification and process crash boundaries. A model can propose actions but never execute them directly.
