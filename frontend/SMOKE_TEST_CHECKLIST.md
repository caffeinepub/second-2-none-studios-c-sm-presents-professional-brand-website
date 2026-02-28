# Smoke Test Checklist

This document outlines the manual browser smoke-check steps to verify the deployed build is functioning correctly in production.

## Prerequisites
- Access to the production deployment URL: **https://drsjc-studios-gdr.caffeine.xyz/**
- Modern web browser (Chrome, Firefox, Safari, or Edge)
- Browser DevTools open (F12) to monitor console and network

---

## Production Environment Verification

### 0. Confirm Version 109 Deployment
**Objective:** Verify the correct version is live at the production URL.

**Steps:**
1. Open **https://drsjc-studios-gdr.caffeine.xyz/** in a browser
2. Open DevTools → Network tab
3. Confirm assets load from the expected canister URL (format: `https://<CANISTER_ID>.icp0.io`)
4. Check the page title reads **"The Doctor of UDesign (c)sm — Second-2-None Studios"**

**Pass Criteria:**
- ✅ https://drsjc-studios-gdr.caffeine.xyz/ is accessible (HTTP 200)
- ✅ Page title matches expected branding
- ✅ Assets load without 404 errors
- ✅ No deployment-related console errors

**Fail Criteria:**
- ❌ Production URL returns error (404, 503, etc.)
- ❌ Old version content is displayed
- ❌ Assets fail to load

---

## Test Steps

### 1. Landing Page Render
**Objective:** Verify the landing page loads without errors and displays core UI elements.

**Steps:**
1. Navigate to **https://drsjc-studios-gdr.caffeine.xyz/**
2. Wait for the page to fully load (no loading spinners)
3. Verify the following elements are visible:
   - Header with "Second‑2‑None Studios (c)sm." branding
   - Hero section with Dr. Charbonnet's portrait
   - Navigation menu (desktop or mobile hamburger menu)
   - Footer with credentials and attribution

**Pass Criteria:**
- ✅ Page loads without console errors (check browser DevTools)
- ✅ All core UI sections render correctly
- ✅ No blank screens or missing content
- ✅ Responsive layout adapts to viewport size

**Fail Criteria:**
- ❌ Build-time errors in console
- ❌ Blank or partially rendered page
- ❌ Missing header, hero, or footer sections
- ❌ JavaScript errors preventing page load

---

### 2. Internet Identity Login Initiation
**Objective:** Verify the Internet Identity login flow can be initiated in production.

**Steps:**
1. Locate the authentication button in the header:
   - **Desktop:** Look for "Log In" button in the top-right navigation
   - **Mobile:** Open hamburger menu (☰) and find "Log In" button at bottom
2. Click the "Log In" button
3. Observe the authentication flow begins

**Pass Criteria:**
- ✅ "Log In" button is visible and clickable
- ✅ Button has `data-testid="auth-button"` attribute (for automated testing)
- ✅ Clicking initiates Internet Identity flow (new window/tab or redirect)
- ✅ Button shows loading state ("Loading...") during authentication
- ✅ No JavaScript errors in console when clicking

**Fail Criteria:**
- ❌ "Log In" button is missing or not clickable
- ❌ Clicking produces JavaScript errors
- ❌ No authentication flow is initiated
- ❌ Button is disabled without reason

---

### 3. Backend Connectivity Check
**Objective:** Verify the frontend can communicate with the backend canister in production.

**Steps:**
1. Open DevTools → Network tab
2. Load **https://drsjc-studios-gdr.caffeine.xyz/** and observe API calls to the backend canister
3. Check that canister query calls return successfully (no CORS or network errors)
4. Verify the Contact section loads phone/email/location data

**Pass Criteria:**
- ✅ Backend canister calls complete without errors
- ✅ Contact information is displayed (phone, email, location)
- ✅ Publications section loads book listings
- ✅ No CORS errors in the console

**Fail Criteria:**
- ❌ Canister calls fail with network errors
- ❌ CORS errors blocking backend communication
- ❌ Data sections show error states instead of content

---

### 4. Static Assets Load Correctly
**Objective:** Verify all images, PDFs, and media assets load in production.

**Steps:**
1. Scroll through the full page at https://drsjc-studios-gdr.caffeine.xyz/
2. Verify Dr. Charbonnet's portrait images load in Hero and Biography sections
3. Verify QR code images load in the Store section
4. Check that diploma images load in the Credentials section
5. Verify PDF document links are accessible (Training Documents section)

**Pass Criteria:**
- ✅ All portrait/headshot images render without broken image icons
- ✅ QR code images display correctly
- ✅ Diploma images load in Credentials section
- ✅ PDF links open or download correctly

**Fail Criteria:**
- ❌ Broken image icons visible anywhere on the page
- ❌ PDF links return 404 errors
- ❌ Asset paths contain encoding errors

---

### 5. Critical User Flows
**Objective:** Verify key interactive flows work end-to-end in production.

**Steps:**
1. **Navigation:** Click each nav link (Biography, Publications, Store, Media, Booking, Contact) and verify smooth scroll
2. **Publications:** Verify Amazon links open in a new tab
3. **Store:** Verify Bonfire purchase links open in a new tab
4. **Membership:** Verify PayPal links open in a new tab
5. **Contact:** Verify the contact section displays correct info

**Pass Criteria:**
- ✅ All navigation links scroll to correct sections
- ✅ External links (Amazon, Bonfire, PayPal) open in new tabs
- ✅ No broken links or 404 errors on external resources
- ✅ Mobile hamburger menu opens and closes correctly

**Fail Criteria:**
- ❌ Navigation links do not scroll or navigate
- ❌ External links fail to open
- ❌ Mobile menu is non-functional

---

## Notes
- **Production URL:** https://drsjc-studios-gdr.caffeine.xyz/
- **Authentication Completion:** You do NOT need to complete the Internet Identity login process for this smoke test. Simply verify the flow can be initiated.
- **Browser Console:** Keep DevTools open during testing to catch any runtime errors.
- **Network Tab:** Check for failed API calls or resource loading issues.
- **Responsive Testing:** Test on both desktop (≥1024px) and mobile (≤768px) viewports.
- **Production vs. Draft:** Always confirm you are testing the production URL https://drsjc-studios-gdr.caffeine.xyz/, not a draft/local URL.

---

## Quick Reference: Expected Behavior

| Component | Expected State | Test Method |
|-----------|---------------|-------------|
| Landing Page | Fully rendered | Visual inspection |
| Header | Fixed, visible | Scroll page |
| Log In Button | Clickable, responsive | Click interaction |
| Internet Identity | Flow initiates | New window/redirect |
| Backend Data | Loads correctly | Check Contact/Publications |
| Static Assets | All images visible | Scroll full page |
| External Links | Open in new tab | Click each link |
| Console | No errors | DevTools check |

---

## Troubleshooting

### Issue: Page doesn't load at https://drsjc-studios-gdr.caffeine.xyz/
- Check network connectivity
- Verify correct production URL: https://drsjc-studios-gdr.caffeine.xyz/
- Clear browser cache and retry
- Check canister status: `dfx canister --network ic status frontend`

### Issue: "Log In" button not working
- Check browser console for errors
- Verify Internet Identity integration is configured
- Try different browser

### Issue: Styling looks broken
- Verify CSS files loaded (Network tab)
- Check for CORS or asset loading errors
- Test in incognito/private mode

### Issue: Backend data not loading
- Check canister is running: `dfx canister --network ic status backend`
- Verify no cycles exhaustion
- Check browser console for canister call errors

### Issue: Images not loading
- Verify asset paths in Network tab
- Check for URL encoding issues with filenames containing spaces
- Confirm assets were included in the build (`dist/assets/` directory)

---

**Last Updated:** February 26, 2026
**Current Production Version:** 109
**Production URL:** https://drsjc-studios-gdr.caffeine.xyz/
