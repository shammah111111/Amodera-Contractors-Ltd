# Amodera Contractors Ltd — Website

A modern, responsive website for Amodera Contractors Ltd, built with semantic HTML, shared CSS, lightweight JavaScript, and a small Node/Express backend for the contact form.

## What's in this update

- Fixed broken/empty markup left over from the first build (empty hero stat, empty footer column, broken logo tagline tags, missing favicon).
- Replaced emoji icons with a consistent custom SVG icon set in the brand colors.
- New **Projects** page (`projects.html`) — ready to hold real project photos and case studies.
- Added a WhatsApp click-to-chat button (bottom-right on every page) — big win for a Uganda-based business.
- Added `robots.txt`, `sitemap.xml`, Open Graph/Twitter share image, and structured data (JSON-LD) for better Google/social previews.
- Optimized the logo (background removed, file size cut by more than half) and generated proper favicons.
- Fixed a CSS bug that was silently collapsing the Services page into a single column.
- Accessibility: skip-to-content link, visible focus states, reduced-motion support (already partly in place, now consistent).

## Structure

- `index.html` — Homepage
- `about.html` — Company overview and values
- `services.html` — Service offerings
- `projects.html` — Project types / portfolio (**add real photos here when ready**)
- `contact.html` — Contact details and enquiry form
- `assets/css/styles.css` — Shared styling
- `assets/js/main.js` — Mobile navigation, scroll effects, form handling
- `assets/images/` — Logo, favicons, and social share image
- `server.js` — Express server + Resend email integration for the contact form

## Run locally

```bash
npm install
cp .env.example .env   # then add your real Resend API key
npm start
```

Site runs at `http://localhost:3000`.

## Before going live — a short checklist

1. **Domain**: replace `https://www.amoderacontractors.com/` in the `<link rel="canonical">`, Open Graph tags, `sitemap.xml`, and `robots.txt` with your real domain once you register/host one.
2. **Real project photos**: `projects.html` currently uses icon cards as placeholders — swap in real job-site photos and short write-ups as soon as you can. This is the single biggest trust-builder for new clients.
3. **Testimonials**: the CSS/JS already support a rotating testimonial section (see `.testimonial-card` in `styles.css`) — add 2–3 real client quotes when you have them and I can wire it back onto the homepage.
4. **Resend API key**: set `RESEND_API_KEY` in your hosting provider's environment variables so the contact form can send you email.

## Deployment

Any static/Node host works (Vercel, Netlify, Render, a VPS with PM2). See `SETUP.md` for step-by-step instructions.

## Support

- Email: amoderacontractorsltd@gmail.com
- Phone: +256 757 601 714

## License

MIT
