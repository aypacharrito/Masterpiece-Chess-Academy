# Masterpiece Chess Academy — Playful Luxury Website (v3)

A mobile-first, modern chess academy website built with Next.js App Router, TypeScript, and a Resend-ready enrollment form. It replaces the storefront-style landing page with a welcoming, three-step inquiry experience.

## What changed in v3

- **Recognizable Instagram and Facebook logos** in the **top navigation only**, with accessible names and links to the academy's existing accounts. No social icon packages or third-party icon CDNs required.
- **Playful premium identity:** rich midnight navy, buttery yellow, lavender, peach and mint, custom chessboard illustration, elevated cards, and Fraunces + DM Sans typography.
- **Phone-first design:** the questionnaire follows a compact headline rather than a tall illustration, touch-friendly controls, two-column selection tiles, flexible typography and cards that fit narrow displays. At narrow widths the header reorganizes to keep the Academy link, social icons, and theme control reachable without horizontal overflow.
- **Tap-to-select questionnaire:** illustrated experience, program and format choices, clear 3-step indicator and friendly completion screen.
- `/academy` inherits the new design with program cards, photos, coaches, contact information and an enrollment call-to-action.
- A matching chess favicon and consistent branded header on the Privacy and Terms pages.

- **Accessible native dark mode** with a persistent header toggle, legible dark form fields and choices, and theme-aware Academy, legal and contact sections.
- **Responsive layout polish** at 340, 420, 600, 820, 1024 and 1120px: tablet hero stacks before collision; phone header and CTAs use separate, purpose-built layouts.
- **Footer decluttered:** social links appear only in the header.

## Folder map

| Path | Purpose |
| --- | --- |
| `app/page.tsx` | Landing page: short intro + enrollment form |
| `components/InquiryForm.tsx` | Three-step mobile-friendly interactive inquiry |
| `components/SiteHeader.tsx` | Shared header and navigation |
| `components/SocialLinks.tsx` | Linked inline SVG social logos |
| `app/academy/page.tsx` | Programs, gallery and coach biographies |
| `app/api/inquiry/route.ts` | Server-side Resend email delivery |
| `app/globals.css` | Brand styles and responsive media queries |
| `lib/content.ts` | Contact details, social URLs and original photo references |
| `public/icon.svg` | App icon |
| `docs/source-inventory.md` | Public site reference list and limitations |

## Run locally

Prerequisites: Node.js 20+ and npm. From the root of this folder:

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Enable inquiry emails with Resend

1. Verify an email-sending domain in Resend and set its required DNS records.
2. Create a Resend API key and set `RESEND_API_KEY` in `.env.local`.
3. Set `RESEND_FROM` using your verified domain, e.g. `Masterpiece Chess Academy <enrollment@verified-domain.com>`.
4. Set `INQUIRY_TO` to the confirmed academy recipient. The starter `.env.example` suggests `coachtda@yahoo.com`; **confirm with the owner**.
5. Add those variables in Vercel, redeploy and submit a test inquiry. This prototype uses email delivery, not a database.

The API validates inputs, escapes HTML in outgoing emails, checks for a honeypot field, and returns a clear message when Resend is unconfigured. **Rate limiting / bot detection** is still recommended before launching publicly.

## Deploy

Create a new GitHub repository, push this folder to your repository root, then import the repository into Vercel. Set Resend variables under the Vercel project settings and redeploy. No Shopify storefront or Google Form embed is used in the new landing page.

## Owner approval / pre-launch checks

- The original welcome page contains a third-party form, but its exact questions could not be extracted. These are **proposed, not verified identical** questions. Compare with the original Google Form, then adjust the front-end and `app/api/inquiry/route.ts` together.
- The academy page currently references five discovered **remote Shopify CDN image URLs**; photos are *not* included as local image files. The existing site may have more. Get the owner's asset permission and move approved images into `/public` before production. HEIC image links can fail in some browsers.
- Confirm the academy address, teachers, social URLs and public email in `lib/content.ts`.
- Privacy Policy and Terms of Service are **drafts requiring owner/legal review** before going live, especially as inquiries involve minors.
- Confirm enrollment language and whether a free trial is currently available.
- Test on a real phone and check deliverability, keyboard behavior, form validation and links before going live.

## Validation in this workspace

All `.ts` and `.tsx` source files were parsed for syntax errors using TypeScript (none found). A complete Next.js build and actual phone-browser interaction test were **not** possible in this environment because npm dependencies were unavailable from the registry. Run `npm install && npm run build` and test the UI locally before deployment.

## V3 quality assurance

Test both themes on phones, tablets and desktops, especially at 320px, 375px, 390px, 430px, 768px, 1024px and 1440px. Dark Reader/browser extensions may override native colors; turn off injected recoloring to verify the site's own dark theme. Form API still requires Resend environment variables before real email submission works.
