# Use Cases

| ID | Scenario | Expected behavior |
|---|---|---|
| UC-01 | Normal browsing | Tabs, navigation, downloads and profiles work without the agent |
| UC-02 | Web research | Agent gathers sources with user-approved read permissions and traceable citations |
| UC-03 | Developer workflow | Agent inspects approved repository, proposes edits, requests write grant, runs tests and verifies |
| UC-04 | Form submission | Agent prepares fields; user confirms consequential submission |
| UC-05 | Multiple AI providers | User selects supported adapter; unsupported or prohibited automation fails safely |
| UC-06 | Crash recovery | Restore interrupted task without replaying ambiguous external actions |
| UC-07 | Prompt injection | Web content cannot elevate tool permissions or rewrite task authority |
| UC-08 | Accessibility | Full keyboard/screen-reader operation for agent and browser controls |
| UC-09 | Offline mode | Normal cached/local workflows degrade gracefully when inference unavailable |
| UC-10 | Revocation | Active capability revoked; queued actions fail closed |

Each use case needs positive, negative, race-condition, accessibility and audit acceptance tests.
