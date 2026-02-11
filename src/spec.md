# Specification

## Summary
**Goal:** Fix the broken PDF link for Training Document #3 so it opens the reuploaded PDF file instead of looping back to the website.

**Planned changes:**
- Add the reuploaded Training Document #3 PDF as a static frontend asset under `/assets/`.
- Update the backend metadata for training document id=3 so `documentUrl` exactly matches the uploaded PDF filename (including spaces/case) to ensure `getStaticAssetUrl(documentUrl)` resolves correctly.
- Ensure the Training Documents UI link for document #3 line-2 keeps the exact link text “The attached PDF file (11,939 KB)” and opens the PDF in a new browser tab.

**User-visible outcome:** In the Training Documents section, clicking “The attached PDF file (11,939 KB)” for Training Document #3 opens the correct PDF in a new tab (and the PDF URL loads successfully without redirecting to the SPA home page or 404ing).
