# Design Patterns

- Hexagonal architecture: browser, model, persistence and OS implementations behind ports.
- Finite-state machine: explicit transitions and recoverable checkpoints.
- Capability-based security: scoped, short-lived, revocable grants.
- Command/query separation: read tools cannot mutate; action requests carry provenance.
- Strategy/adapters: swappable engine and provider implementations.
- Idempotency and outbox: local durable work, never blind retry of uncertain external effects.
- Circuit breaker and bulkhead: isolate failing providers, tabs and tools.
- Event journal: audit state transitions without logging secrets.
- Resource budgets: bound concurrent tabs, tasks, tool invocations and replan depth.
