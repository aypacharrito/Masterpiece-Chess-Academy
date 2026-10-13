MASTERPIECE CHESS ACADEMY -- ULTRA-SIMPLE HOMEPAGE UPDATE (OCT 12, 2026)
Repository: https://github.com/aypacharrito/masterpiecechessacademy

Based on the red-X screenshots:
- Homepage: remove small taglines, eyebrow badges, introductory copy, extra decorations, social icons, home-page theme switch, and the Our Academy link in the top header (Academy is still available through the footer).
- Keep the main headline: "Find a community to help your child reach their potential!"
- Remove the entire 3-step Student / Goals / Contact flow. ONE short scrolling form.
- Remove student's age and chess experience.
- Remove the whole Goals section (class type, program choices, learning format, goals and days/times).
- Remove the optional "Any questions for us?" box.
- Keep only: student name, parent/guardian/contact name, email, optional phone, and required contact consent.
- Confirmation only after a successful server response: "Our team will reach out shortly."
- Change the API validation to match the shorter form. No missing-field 400 errors for removed questions.
- Keep the separate Our Academy page, its navigation, social links, color scheme, and design unchanged.
- Keep responsive layout and native light/dark appearance.

FILES IN THIS PATCH (replacement files, not a full repository):
  app/page.tsx
  app/simple.css
  app/layout.tsx
  app/api/inquiry/route.ts
  components/InquiryForm.tsx

TO APPLY (WINDOWS, GITHUB DESKTOP):
1. Extract this ZIP so APPLY-UPDATE.cmd and the 'app' and 'components' folders are together.
2. Double-click APPLY-UPDATE.cmd.
3. Choose your existing local masterpiecechessacademy repository folder from GitHub Desktop.
4. Open GitHub Desktop and review the changes.
5. Commit to main and Push origin to trigger Vercel deployment.
6. Test on mobile and desktop, including a real test inquiry after configuring email sending.

EMAIL SUBMISSIONS: The server still needs RESEND_API_KEY, RESEND_FROM and INQUIRY_TO set in Vercel. Never put an API key in GitHub or this ZIP. Without these Vercel environment variables, an inquiry shows a useful error and NO fake success confirmation.

This ZIP supersedes both previous update packages; do not apply the previous ZIPs after this one.
The GitHub integration currently has read-only access (403 on attempt to update a file), so this ZIP needs to be applied locally and pushed manually using GitHub Desktop. No live deployment is claimed.
