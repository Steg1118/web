const ALLOWED_ORIGIN = 'https://steg1118.github.io';

function clean(value, maxLength) {
  return String(value || '').trim().slice(0, maxLength);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
    Vary: 'Origin',
  };
}

function json(data, status, origin) {
  return new Response(JSON.stringify(data), {
    status,
    headers: corsHeaders(origin),
  });
}

function emailHtml(contact, contactId, receivedAt) {
  const message = escapeHtml(contact.message).replaceAll('\n', '<br>');

  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:24px;background:#f3f6fa;color:#132033;font-family:Arial,sans-serif">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
      <tr><td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background:#ffffff;border:1px solid #dce4ee;border-radius:12px;overflow:hidden">
          <tr><td style="padding:24px 28px;background:#07101f;color:#ffffff">
            <div style="font-size:12px;font-weight:700;letter-spacing:1.5px;color:#65ddff;text-transform:uppercase">Sean Grant Portfolio</div>
            <h1 style="margin:8px 0 0;font-size:24px;line-height:1.25">New portfolio inquiry</h1>
          </td></tr>
          <tr><td style="padding:26px 28px">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:24px">
              <tr><td style="padding:0 0 6px;color:#64748b;font-size:12px;font-weight:700;text-transform:uppercase">Name</td></tr>
              <tr><td style="padding:0 0 18px;font-size:18px;font-weight:700">${escapeHtml(contact.name)}</td></tr>
              <tr><td style="padding:0 0 6px;color:#64748b;font-size:12px;font-weight:700;text-transform:uppercase">Reply email</td></tr>
              <tr><td style="padding:0 0 18px"><a href="mailto:${escapeHtml(contact.email)}" style="color:#126c87;font-weight:700">${escapeHtml(contact.email)}</a></td></tr>
              <tr><td style="padding:0 0 6px;color:#64748b;font-size:12px;font-weight:700;text-transform:uppercase">Received</td></tr>
              <tr><td style="font-size:14px;color:#475569">${escapeHtml(receivedAt)}</td></tr>
            </table>
            <div style="padding:20px;border-left:4px solid #35c8ef;background:#f5fbfd;border-radius:4px">
              <div style="margin-bottom:10px;color:#526174;font-size:12px;font-weight:700;text-transform:uppercase">Message</div>
              <div style="font-size:16px;line-height:1.65">${message}</div>
            </div>
          </td></tr>
          <tr><td style="padding:16px 28px;border-top:1px solid #e5eaf0;color:#7b8798;font-size:12px">Contact #${contactId} · Reply directly to respond to ${escapeHtml(contact.name)}.</td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';

    if (origin !== ALLOWED_ORIGIN) {
      return new Response('Forbidden', { status: 403 });
    }

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (request.method !== 'POST' || new URL(request.url).pathname !== '/api/contact') {
      return json({ ok: false, error: 'Not found.' }, 404, origin);
    }

    try {
      const payload = await request.json();
      if (payload.website) return json({ ok: true, emailed: false, saved: false }, 200, origin);

      const contact = {
        name: clean(payload.name, 100),
        email: clean(payload.email, 254).toLowerCase(),
        company: clean(payload.company, 120),
        message: clean(payload.message, 4000),
      };
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (contact.name.length < 2) return json({ ok: false, error: 'Please enter your name.' }, 400, origin);
      if (!emailPattern.test(contact.email)) return json({ ok: false, error: 'Please enter a valid email address.' }, 400, origin);
      if (contact.message.length < 10) return json({ ok: false, error: 'Please include a message of at least 10 characters.' }, 400, origin);

      const insert = await env.DB.prepare(`
        INSERT INTO contacts (name, email, company, message, notification_status)
        VALUES (?, ?, ?, ?, 'pending')
      `).bind(contact.name, contact.email, contact.company || null, contact.message).run();
      const contactId = insert.meta.last_row_id;
      const receivedAt = new Date().toLocaleString('en-US', {
        timeZone: 'America/Los_Angeles',
        dateStyle: 'medium',
        timeStyle: 'short',
      });

      try {
        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Sean Grant Portfolio <onboarding@resend.dev>',
            to: [env.CONTACT_TO_EMAIL],
            reply_to: contact.email,
            subject: `Portfolio inquiry #${contactId} · ${contact.name}`,
            text: `NEW PORTFOLIO INQUIRY\n\nName: ${contact.name}\nReply email: ${contact.email}\nReceived: ${receivedAt}\nContact ID: ${contactId}\n\nMESSAGE\n${contact.message}`,
            html: emailHtml(contact, contactId, receivedAt),
          }),
        });

        if (!emailResponse.ok) {
          const resendError = await emailResponse.text();
          throw new Error(`Resend ${emailResponse.status}: ${resendError}`);
        }

        await env.DB.prepare(`
          UPDATE contacts SET notification_status = 'sent' WHERE id = ?
        `).bind(contactId).run();

        return json({ ok: true, emailed: true, saved: true }, 201, origin);
      } catch (emailError) {
        console.error(`Resend delivery failed: ${emailError.message}`);
        await env.DB.prepare(`
          UPDATE contacts SET notification_status = 'failed' WHERE id = ?
        `).bind(contactId).run();
        return json({ ok: true, emailed: false, saved: true }, 201, origin);
      }
    } catch (error) {
      console.error(`Contact API failed: ${error.message}`);
      return json({ ok: false, error: 'Unable to submit your message.' }, 500, origin);
    }
  },
};
