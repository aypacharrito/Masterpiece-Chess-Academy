# Masterpiece Chess Academy — premium website rebuild

Next.js App Router + TypeScript landing page and Resend-ready enrollment inquiry form.

## Pages
- `/`: dedicated premium questionnaire / lead-capture page, with a minimal navigation and social/policy footer.
- `/academy`: academy programs, coaches, five original gallery photo references, and contact details.
- `/privacy` and `/terms`: clearly marked review-required draft legal copy.

## Local setup
```bash
npm install
cp .env.example .env.local
npm run dev
```
Visit `http://localhost:3000`.

## Configure Resend (required to enable submissions)
1. Verify a domain you control under Resend Domains and configure DNS records.
2. Set `RESEND_API_KEY` and `RESEND_FROM` to a sender from that verified domain.
3. Set `INQUIRY_TO` to the owner's confirmed recipient email. Default suggested recipient: `coachtda@yahoo.com` — verify before launch.
4. Add same environment variables to Vercel, then redeploy. No keys go in client code.
5. Test the full submission flow and verify inbox/spam delivery. Inquiries are not stored in a database.

## Important pre-launch checks
- The welcome page appears to use a third-party embedded form; its precise questions were **not** accessible through public HTML indexing. The implemented questions are a thoughtfully designed proposed intake, **not claimed to be an exact transcription**. Compare with the original Google Form and update `components/InquiryForm.tsx` + `app/api/inquiry/route.ts` accordingly.
- Five original photographs were located from public welcome-page image links. They're **remote CDN references**, not downloaded image assets; the original site may contain more images. Confirm ownership and migrate approved assets into `/public/images` before production. HEIC links may fail in browsers; convert approved originals to WebP/JPG.
- Instagram and Facebook URLs have been identified from the old welcome page; test that they still work.
- Privacy and Terms are placeholder drafts and require client/legal sign-off.
- Confirm the academy's current physical address, programs, coaches, public contact email, and schedule.
- For public launch, add real rate limiting / bot protection to the API route (the hidden honeypot alone isn't sufficient).
- No Shopify checkout or payment processing is implemented; existing products/payments remain on the original site until intentionally migrated.

## Origin / content inventory
See `docs/source-inventory.md` for sourced pages, contacts, and images.

## Deploy to Vercel
Create an empty GitHub repository, push this directory to it, import the repo in Vercel, and set the three environment variables listed above. This project is not connected to the owner's GitHub or Resend accounts by default.
