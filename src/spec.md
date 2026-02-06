# Specification

## Summary
**Goal:** Add the uploaded intro audio as a playable audio player within the homepage Hero section, directly beneath the hero portrait.

**Planned changes:**
- Add an audio player UI to the homepage Hero area, positioned directly under the large portrait image and directly above the “Simply Shane Designs (c)sm” / “-- PRESENTS --” headings.
- Add the uploaded intro audio file to frontend static assets (served under `/assets/`) and wire the Hero audio player to that exact file using its original filename.
- Ensure the new audio player does not remove or disrupt existing Hero content (portrait, headings, subtitle, and the “Site Soundtrack” section).

**User-visible outcome:** On a fresh load of the homepage, users can see and use a standard audio player (play/pause + seek) in the Hero section to listen to the uploaded intro audio without authentication.
