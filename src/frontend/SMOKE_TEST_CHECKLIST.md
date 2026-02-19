# Smoke Test Checklist

This document outlines the manual browser smoke-check steps to verify the deployed draft build is functioning correctly.

## Prerequisites
- Access to the deployed draft URL
- Modern web browser (Chrome, Firefox, Safari, or Edge)

## Test Steps

### 1. Landing Page Render
**Objective:** Verify the landing page loads without errors and displays core UI elements.

**Steps:**
1. Navigate to the deployed draft URL
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
**Objective:** Verify the Internet Identity login flow can be initiated (no need to complete login).

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

## Notes
- **Authentication Completion:** You do NOT need to complete the Internet Identity login process for this smoke test. Simply verify the flow can be initiated.
- **Browser Console:** Keep DevTools open during testing to catch any runtime errors.
- **Network Tab:** Check for failed API calls or resource loading issues.
- **Responsive Testing:** Test on both desktop (≥1024px) and mobile (≤768px) viewports.

---

## Quick Reference: Expected Behavior

| Component | Expected State | Test Method |
|-----------|---------------|-------------|
| Landing Page | Fully rendered | Visual inspection |
| Header | Fixed, visible | Scroll page |
| Log In Button | Clickable, responsive | Click interaction |
| Internet Identity | Flow initiates | New window/redirect |
| Console | No errors | DevTools check |

---

## Troubleshooting

### Issue: Page doesn't load
- Check network connectivity
- Verify correct deployment URL
- Clear browser cache and retry

### Issue: "Log In" button not working
- Check browser console for errors
- Verify Internet Identity integration is configured
- Try different browser

### Issue: Styling looks broken
- Verify CSS files loaded (Network tab)
- Check for CORS or asset loading errors
- Test in incognito/private mode

---

**Last Updated:** February 17, 2026
