# Sean Grant Portfolio

Career portfolio built with React and Vite, with a small Node contact API backed by SQLite.

## Local development

```bash
npm run dev
```

The Vite development server includes the contact API. Submissions are stored locally in `data/contacts.db`.

To send email during local testing, copy `.env.example` to a git-ignored `.env`, add your real Resend key, and restart the development server. The Cloudflare Worker secret is not available to localhost automatically.

## Production

```bash
npm run build
npm start
```

The production server serves the compiled site and `POST /api/contact`. It requires a Node-capable host with persistent disk storage; GitHub Pages can only host the static UI and cannot run SQLite or email delivery.

To send contact notifications to `seantegrant@gmail.com`, configure:

```text
RESEND_API_KEY=your_resend_api_key
CONTACT_FROM_EMAIL=Sean Grant Portfolio <onboarding@resend.dev>
CONTACT_TO_EMAIL=the_email_used_for_your_resend_account
```

Every valid submission is stored in SQLite before notification delivery is attempted. Without `RESEND_API_KEY`, submissions remain stored with a `not_configured` notification status; the website never opens the visitor's email application.
