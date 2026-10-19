# Acceptance Gates

- G0: PRD, use cases, exclusions, architecture and threat model reviewed.
- G1: Engine comparison benchmark and ADR approved.
- G2: Browser MVP supports tabs, navigation, profiles, downloads, keyboard accessibility and safe IPC.
- G3: Agent state machine and SQLite journal pass deterministic and crash-recovery tests.
- G4: Capability broker passes deny-by-default, revocation and prompt-injection tests.
- G5: Provider adapters demonstrate permitted, reproducible integration; unsupported paths fail clearly.
- G6: Packaging, signed update, privacy, performance, accessibility and rollback gates pass.

Testing: unit, integration, E2E, property/fuzz, threat-focused, accessibility, performance, manual adversarial and recovery. No live-provider claim without actual live validation.
