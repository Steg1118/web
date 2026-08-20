# Cloudflare contact Worker

`worker.js` is the deployed source for `sean-portfolio-contact-api`.

Runtime configuration remains in Cloudflare and must never be committed:

- D1 binding: `DB`
- Secret: `RESEND_API_KEY`
- Text variable: `CONTACT_TO_EMAIL`

The Worker accepts contact submissions only from `https://steg1118.github.io`.
