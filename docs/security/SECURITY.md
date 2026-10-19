# Security Baseline

1. Sandbox renderers; enforce context isolation and narrowly validated IPC.
2. Deny by default; scope grants by profile, origin, tab, task, operation and expiration.
3. Treat website text and model responses as untrusted, never as user authorization.
4. Require explicit review for destructive actions, purchases, messages, uploads and account changes.
5. Keep credentials in OS-backed secret storage where supported; never log cookies, tokens or passwords.
6. Restrict filesystem to user-selected roots; guard symlinks, traversal and TOCTOU races.
7. Block unauthorized local network and privileged endpoint access; authenticate any local API.
8. Quarantine unknown action outcomes; prevent repeated submissions.
9. Review dependencies, sign builds and updates, publish vulnerability reporting and response policy.
10. Honor provider terms; do not automate bypass of limits or access restrictions.
