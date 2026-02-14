# Specification

## Summary
**Goal:** Update Training Document #3’s title and ensure its PDF link opens the actual uploaded PDF from a publicly served static /assets path.

**Planned changes:**
- Update backend Training Document #3 (id=3) title to exactly: "Distinction Codex: Unveling the Markers of Authentic Mastery."
- Add the user-provided Training Document #3 PDF to the deployed frontend static assets under `/assets/`.
- Update backend Training Document #3 (id=3) `documentUrl` to point directly to the `/assets/...pdf` file path.
- Adjust the Training Documents UI linking so Training Document #3 resolves via the existing static-asset URL mechanism (e.g., `getStaticAssetUrl(...)`) and opens in a new tab without routing back to the SPA.

**User-visible outcome:** In the Training Documents section, Training Document #3 shows the updated title, and clicking its PDF link opens the real PDF in a new browser tab (not the app shell).
