# Specification

## Summary
**Goal:** Fix Training Document #2 so its line-2 link opens the actual PDF in a new tab (like Training Document #1) instead of routing back into the site/SPA.

**Planned changes:**
- Update the Training Document #2 link behavior so clicking the line-2 text opens a direct PDF URL in a new tab/window (no SPA routing/hash navigation).
- Ensure the backend returns a `documentUrl` for Training Document #2 that points to an existing, publicly served static PDF under the frontend `/assets/...` path so it resolves to a real PDF response (not `index.html`).
- Verify Training Document #1 behavior remains unchanged and Training Document #2 title remains exactly as currently set.

**User-visible outcome:** Clicking Training Document #2’s line-2 text opens its PDF directly in the browser PDF viewer in a new tab, without looping back to the website.
