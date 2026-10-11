# V3 Responsive and Theme QA

## Changes
- Instagram and Facebook remain in the header only.
- The mobile header keeps the Academy link and rearranges below 420px.
- The desktop two-column landing stacks before the two columns collide (1120px and below).
- Tablet cards use two columns; phone cards use one.
- The native light/dark theme toggle preserves the choice in localStorage and falls back to OS preference.
- Dark colors include form inputs, options, labels, cards, gallery, contact and legal copy.
- iOS Safari form inputs use >=16px font-size to avoid auto-zoom.

## Completed offline checks
- All TS/TSX transpile without syntax diagnostics (not a full typecheck).
- Both CSS files parse successfully with PostCSS.
- Theme state is used for styling only; the same React form and server API run on all viewports.

## Required live QA on Vercel
- At 320, 375, 390, 430, 600, 768, 1024, 1120 and 1440px widths: check horizontal scroll, header, form width, card grids and footer.
- Toggle both themes on home, Academy, Privacy and Terms pages; refresh and confirm persistence.
- Try all three form steps on phone and desktop; test Back, Next, required fields and consent.
- Submit a *test* inquiry after configuring Resend variables and checking inbox/delivery logs.
- Check browser Dark Reader extensions separately because they can override the website's own colors.
- Verify photos and all links, especially external social links, on a physical phone.

## Known limitation
Full Next.js production build and interactive headless Chromium screenshots were not completed in this offline environment. npm registry access is unavailable, and Chromium did not complete its headless startup. Do not consider the project fully browser-tested until live QA above passes.
