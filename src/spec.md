# Specification

## Summary
**Goal:** Remove the second hero background image layer from the top of the homepage.

**Planned changes:**
- Update `frontend/src/components/Hero.tsx` to remove the parallax background layer that renders `/assets/generated/layered-background.dim_1920x1080.jpg`.
- Delete `/assets/generated/layered-background.dim_1920x1080.jpg` from frontend static assets if it exists, ensuring the build and site load without missing-asset errors.

**User-visible outcome:** The homepage hero no longer displays (or requests) the second background photo image, while the remaining hero background layers continue to render normally.
