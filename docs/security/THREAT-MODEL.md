# Security Threat Model (STRIDE)

## Protected assets
Sessions, cookies, secrets, browsing history, local files, task grants, tool results, profile boundaries, signed updates.

| Threat | Failure | Control |
|---|---|---|
| Spoofing | Web page imitates permission dialog | Browser-owned trusted UI |
| Tampering | Untrusted IPC alters agent task | Schema validation and privileged state ownership |
| Repudiation | Silent external action | Redacted event journal and confirmation evidence |
| Disclosure | Cross-origin/profile data leak | Isolation, scope validation and minimal data sharing |
| DoS | Infinite planning/tool loops | Time, memory, token and step budgets |
| Elevation | Prompt injection invokes terminal | Capability broker denies without user grant |

Test malicious pages, navigation races, symlink escapes, renderer compromise assumptions, forged tool results, stale permissions, malformed responses, session exhaustion, disk corruption, supply-chain compromise, and update rollback. Zero security issues cannot be guaranteed; document residual risk and patch process.
