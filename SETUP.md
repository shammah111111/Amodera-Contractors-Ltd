# Amodera Contractors Ltd - Website Setup Guide

## Overview
This is a website with a Node.js backend for email handling through Resend.

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Edit `.env` and add your Resend API key:
```
RESEND_API_KEY=re_xxxxxxxxxxxx
RECIPIENT_EMAIL=amoderacontractorsltd@gmail.com
PORT=3000
```

### 3. Get Your Resend API Key
- Go to [resend.com](https://resend.com)
- Sign up for a free account
- Navigate to **API Keys** in your dashboard
- Copy your API key and paste it in `.env`
- Note: on Resend's free tier, the `from` address must be a domain you've verified in Resend, or you can use their shared test domain (`onboarding@resend.dev` / `website@resend.dev`) while testing.

### 4. Run the Server
```bash
npm start
```

The site will be available at `http://localhost:3000`

### 5. Development Mode (with auto-reload)
```bash
npm run dev
```

## Features

### Contact Form
- Visitors fill out the contact form on the **Contact** page
- Form data is sent to `/api/contact` on your own server
- You receive an email via Resend with the inquiry
- The form still works even without JavaScript, since `action="/api/contact"` is set directly on the `<form>` tag as a fallback

### Email Functionality
- **To you**: Detailed inquiry with visitor contact info, sent from `server.js` via the Resend API

### Static Pages
- **Home** - Hero section and service overview
- **About** - Company mission, vision, values
- **Services** - Detailed service offerings
- **Contact** - Contact form and company info

## Project Structure
```
/
├── index.html              # Homepage
├── about.html              # About page
├── services.html           # Services page
├── contact.html            # Contact page with form
├── server.js               # Node.js Express server with Resend
├── package.json            # Dependencies
├── .env.example             # Environment template
├── README.md               # This file
├── tests/server.test.js    # Backend tests
└── assets/
    ├── css/styles.css      # Shared styling
    ├── js/main.js          # Client-side JavaScript
    └── images/             # Local images
```

## Deployment

### Option 1: Vercel (Recommended)
1. Push code to GitHub
2. Connect repo to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy with one click

### Option 2: Netlify
1. Push code to GitHub
2. Connect repo to [Netlify](https://netlify.com)
3. Set build command: `npm install && node server.js`
4. Add environment variables

### Option 3: Self-hosted (VPS, DigitalOcean, etc.)
1. SSH into your server
2. Clone the repository
3. Install Node.js
4. Run `npm install` and create `.env`
5. Use PM2 to keep the server running:
```bash
npm install -g pm2
pm2 start server.js --name "amodera-website"
pm2 startup
pm2 save
```

## Troubleshooting

### Contact form not sending emails
- Check that `RESEND_API_KEY` is set in `.env`
- Verify API key is valid in Resend dashboard
- Check browser console for errors (F12)
- Check server logs for error messages
- Make sure the `from` address in `server.js` uses a domain verified in Resend (or the shared test domain while developing)

### Port already in use
Change the `PORT` variable in `.env` or run:
```bash
lsof -i :3000
kill -9 <PID>
```

### CSS/Images not loading
Make sure you're running the server from the project root directory

## Support
For issues or questions:
- Email: amoderacontractorsltd@gmail.com
- Phone: +256 757 601 714

## License
MIT
