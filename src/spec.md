# Specification

## Summary
**Goal:** Remove the unintended single leading whitespace before the hero intro paragraph text in `Hero.tsx` while keeping styling and post-message spacing unchanged.

**Planned changes:**
- Update `frontend/src/components/Hero.tsx` to eliminate the single leading whitespace character before the intro paragraph that starts with “Hello there, and welcome…”.
- Preserve the existing intro box styling (background/border/spacing classes) and ensure spacing/layout after the intro block remains unchanged.

**User-visible outcome:** The intro paragraph in the hero section starts immediately with “Hello…” (no visible leading space/indent), with the rest of the layout and styling appearing the same as before.
