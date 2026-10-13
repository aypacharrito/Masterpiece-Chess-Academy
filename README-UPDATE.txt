MASTERPIECE CHESS ACADEMY — CLEAN, NO-SUBTITLES UPDATE
Repository: https://github.com/aypacharrito/masterpiecechessacademy

Changes requested in the owner's messages:
1. Less clutter on the homepage (no upper eyebrow, paragraph subtitle, stacked badges, illustration or three-step progress bar).
2. Headline: "Find a community to help your child reach their potential!"
3. All inquiry questions on ONE scrolling form (not three pages/steps).
4. After a successful API submission: "Our team will reach out shortly."
5. Removed the extra form eyebrow, instruction subtitle, numbered section headings, and small footer taglines. Form labels remain for clarity.
6. Mobile and desktop layout improvements, including dark-theme styles.
7. Our Academy colors, content, and page design are not modified.

Files changed:
- app/page.tsx
- app/simple.css (new)
- app/layout.tsx
- components/InquiryForm.tsx

HOW TO APPLY USING GITHUB DESKTOP
1. Extract this ZIP into a folder.
2. Double-click APPLY-UPDATE.cmd.
3. Select the LOCAL repository folder for masterpiecechessacademy (the one you cloned in GitHub Desktop).
4. The script copies only the four files above; it leaves other repo files untouched.
5. Open GitHub Desktop, review the changed files and click "Commit to main" and "Push origin".
6. Vercel should rebuild from the pushed main branch. Check its deployment status.
7. After deployment, TEST form submission. The server requires RESEND_API_KEY, RESEND_FROM and INQUIRY_TO in Vercel, or submissions will show a contact error (no fake success message).

IMPORTANT: We could read GitHub but were unable to push directly (GitHub API 403 Resource not accessible by integration). This package is a local update; it has not yet been deployed.
This ZIP replaces the earlier One-Page-Fix ZIP; use only this newer package.
