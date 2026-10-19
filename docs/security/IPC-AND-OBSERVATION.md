# IPC and Page Observation — prototype hardening

The Electron main process must reject IPC from any sender except the top-level local shell frame. A preload channel allowlist alone is not sufficient: renderer origin and frame identity are validated at the main-process boundary.

Read-only page observation is **user-triggered**, bounded to URL, title, description and up to 30 headings. The returned content is untrusted webpage data; it is never treated as an instruction or permission grant. Observations must be invalidated on navigation, and no observation is allowed for non-HTTP(S) pages.

## Limitations
This is an engineering prototype, not a production browser security review. `executeJavaScript` runs a fixed application-authored expression in the page and must be tested against navigation races, hostile pages and renderer failures. Cross-origin frames are not inspected. Do not collect passwords, form values, cookies or hidden user data.

## Next
Introduce profile-specific session partitions, persistent scoped grants, navigation identity tokens, structured audit events and negative Electron E2E tests.
