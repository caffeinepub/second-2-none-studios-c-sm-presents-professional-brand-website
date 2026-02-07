# Specification

## Summary
**Goal:** Improve site readability by forcing a light theme with a white background across the entire app, regardless of the user’s system dark mode setting.

**Planned changes:**
- Force the frontend to render in light theme so the global background remains white/light on all routes and states (normal pages, payment success/failure, loading).
- Update any explicitly dark UI surfaces that clash with the new white background (notably the Header brand pill/button background and the Hero intro text container background) to light/neutral surfaces so text remains highly readable.

**User-visible outcome:** The site consistently displays a white/light background and readable UI surfaces even when the device/browser is set to dark mode, with improved text contrast in the header and hero intro area.
