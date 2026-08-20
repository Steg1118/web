import { existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { loadEnvFile } from 'node:process';
import { DatabaseSync } from 'node:sqlite';

if (existsSync('.env')) loadEnvFile('.env');

const databasePath = resolve(process.env.CONTACT_DB_PATH || 'data/contacts.db');
mkdirSync(dirname(databasePath), { recursive: true });
const database = new DatabaseSync(databasePath);

database.exec(`
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    message TEXT NOT NULL,
    notification_status TEXT NOT NULL DEFAULT 'pending',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`);

const insertContact = database.prepare(`
  INSERT INTO contacts (name, email, company, message, notification_status)
  VALUES (?, ?, ?, ?, ?)
`);
const updateNotification = database.prepare('UPDATE contacts SET notification_status = ? WHERE id = ?');
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value, maxLength) {
  return String(value || '').trim().slice(0, maxLength);
}

async function sendNotification(contact) {
  if (!process.env.RESEND_API_KEY) return false;
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || 'Sean Grant Portfolio <onboarding@resend.dev>',
      to: ['seantegrant@gmail.com'],
      reply_to: contact.email,
      subject: `Portfolio inquiry from ${contact.name}`,
      text: `Name: ${contact.name}\nEmail: ${contact.email}\nCompany: ${contact.company || 'Not provided'}\n\n${contact.message}`,
    }),
  });
  if (!response.ok) throw new Error(`Email provider returned ${response.status}`);
  return true;
}

export async function processContact(payload = {}) {
  if (payload.website) return { ok: true, emailed: false };
  const contact = {
    name: clean(payload.name, 100),
    email: clean(payload.email, 254).toLowerCase(),
    company: clean(payload.company, 120),
    message: clean(payload.message, 4000),
  };
  if (contact.name.length < 2) throw new Error('Please enter your name.');
  if (!emailPattern.test(contact.email)) throw new Error('Please enter a valid email address.');
  if (contact.message.length < 10) throw new Error('Please include a message of at least 10 characters.');

  const result = insertContact.run(contact.name, contact.email, contact.company || null, contact.message, 'pending');
  let emailed = false;
  try {
    emailed = await sendNotification(contact);
    updateNotification.run(emailed ? 'sent' : 'not_configured', result.lastInsertRowid);
  } catch (error) {
    updateNotification.run('failed', result.lastInsertRowid);
    console.error('Contact notification failed:', error.message);
  }
  return { ok: true, emailed };
}

export async function handleContactRequest(request, response) {
  let body = '';
  request.on('data', chunk => {
    body += chunk;
    if (body.length > 12_000) request.destroy();
  });
  request.on('end', async () => {
    try {
      const result = await processContact(JSON.parse(body || '{}'));
      response.writeHead(201, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(result));
    } catch (error) {
      response.writeHead(400, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ ok: false, error: error.message || 'Invalid request.' }));
    }
  });
}
