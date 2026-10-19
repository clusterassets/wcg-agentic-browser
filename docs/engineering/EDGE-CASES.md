# Edge Cases and Worst Cases

| Condition | Required behavior |
|---|---|
| Browser or agent crash mid-action | Restore INTERRUPTED, never blindly replay external side effect |
| Payment/form outcome unknown | Quarantine and require inspection |
| Network loss or provider exhaustion | Pause and report; no account cycling |
| Malformed model action | Reject and show actionable diagnostic |
| Page navigates after approval | Re-evaluate grant and origin |
| Permission revoked | Cancel pending/queued use |
| Infinite replan | Stop at bounded budget |
| Disk full, SQLite busy/corrupt | Fail closed, preserve recoverable evidence |
| Prompt injection in DOM | Never elevate privileges |
| Malicious download or archive | Isolate and request deliberate user action |
| Cross-profile or cross-tab leak | Block and record security event |
| Low-memory kill | Shed nonessential work, preserve browser and task integrity |
| App update interrupted | Atomic rollback/recovery |
| No browser engine runtime | Clear installation/repair path; no hidden fallback |

Every row needs a repeatable test and documented operator-facing outcome.
