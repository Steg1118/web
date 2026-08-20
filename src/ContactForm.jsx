import { useState } from 'react';

const initialForm = { name: '', email: '', company: '', message: '', website: '' };
const CONTACT_API_URL = import.meta.env.VITE_CONTACT_API_URL
  || (import.meta.env.DEV
    ? '/api/contact'
    : 'https://sean-portfolio-contact-api.seantegrant.workers.dev/api/contact');

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: 'idle', message: '' });

  function updateField(event) {
    setForm(current => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ type: 'loading', message: 'Sending…' });

    try {
      const response = await fetch(CONTACT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Unable to send your message.');
      setForm(initialForm);
      setStatus({ type: 'success', message: result.emailed ? 'Sent—thank you.' : 'Message received—thank you.' });
    } catch {
      setStatus({ type: 'error', message: 'Could not submit right now. Please try again.' });
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>Name<input name="name" value={form.name} onChange={updateField} autoComplete="name" required maxLength="100" placeholder="Your name" /></label>
        <label>Email<input type="email" name="email" value={form.email} onChange={updateField} autoComplete="email" required maxLength="254" placeholder="you@example.com" /></label>
      </div>
      <label>Message<textarea name="message" value={form.message} onChange={updateField} required minLength="10" maxLength="4000" rows="4" placeholder="What would you like to talk about?" /></label>
      <label className="honeypot" aria-hidden="true">Website<input name="website" value={form.website} onChange={updateField} tabIndex="-1" autoComplete="off" /></label>
      <div className="form-footer">
        <button className="button primary submit-button" type="submit" disabled={status.type === 'loading'}>{status.type === 'loading' ? 'Sending…' : 'Send'} <span>↗</span></button>
        <p className={`form-status ${status.type}`} aria-live="polite">{status.message}</p>
      </div>
      <p className="contact-fineprint">Your message is sent securely through this website.</p>
    </form>
  );
}
