'use client';

import { useRef, useState, type FormEvent } from 'react';
import { ArrowRight, Check, LoaderCircle } from 'lucide-react';
import { academy } from '../lib/content';

type Inquiry = {
  studentName: string;
  age: string;
  experience: string;
  program: string;
  goals: string;
  preferredFormat: string;
  availability: string;
  guardianName: string;
  email: string;
  phone: string;
  notes: string;
  consent: boolean;
  website: string;
};

const initial: Inquiry = {
  studentName: '', age: '', experience: '', program: '', goals: '',
  preferredFormat: '', availability: '', guardianName: '', email: '',
  phone: '', notes: '', consent: false, website: '',
};

export default function InquiryForm() {
  const [form, setForm] = useState<Inquiry>(initial);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const cardRef = useRef<HTMLElement>(null);

  function change<K extends keyof Inquiry>(key: K, value: Inquiry[K]) {
    setForm(previous => ({ ...previous, [key]: value }));
    if (error) setError('');
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setError('');
    setBusy(true);
    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data: { error?: string } = await response.json();
      if (!response.ok) throw new Error(data.error || 'We could not send your inquiry. Please try again.');
      setDone(true);
      cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <section className="form-card form-card--simple simple-success" id="inquiry" aria-live="polite" ref={cardRef}>
        <div className="simple-success-icon"><Check size={30} aria-hidden="true" /></div>
        <h2>Thanks for reaching out!</h2>
        <p className="simple-success-message">Our team will reach out shortly.</p>
        <button className="main-button" type="button" onClick={() => { setForm(initial); setError(''); setDone(false); }}>
          Send another inquiry <ArrowRight size={17} aria-hidden="true" />
        </button>
      </section>
    );
  }

  return (
    <section className="form-card form-card--simple" id="inquiry" aria-labelledby="inquiry-title" ref={cardRef}>
      <div className="simple-form-heading">
        <h2 id="inquiry-title">Let&apos;s get started.</h2>
      </div>
      <form className="simple-form" onSubmit={submit}>
        <div className="simple-fields">
          <label className="field-label simple-span-full">Student&apos;s name <em>*</em>
            <input value={form.studentName} onChange={event => change('studentName', event.target.value)} maxLength={120} placeholder="Student's full name" autoComplete="off" required />
          </label>
          <label className="field-label">Age <em>*</em>
            <select value={form.age} onChange={event => change('age', event.target.value)} required>
              <option value="">Select age</option>
              <option>Under 6</option><option>6–8</option><option>9–12</option><option>13–17</option><option>18+</option>
            </select>
          </label>
          <label className="field-label">Chess experience <em>*</em>
            <select value={form.experience} onChange={event => change('experience', event.target.value)} required>
              <option value="">Select level</option>
              <option value="Brand new to chess">Just starting</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced / tournament player">Advanced / tournament</option>
            </select>
          </label>
          <label className="field-label">Interested in <em>*</em>
            <select value={form.program} onChange={event => change('program', event.target.value)} required>
              <option value="">Choose a program</option>
              <option>Free trial class</option>
              <option>Private lessons</option>
              <option>Group classes</option>
              <option>Afterschool chess</option>
              <option>Chess camp / tournament</option>
              <option>Not sure yet</option>
            </select>
          </label>
          <label className="field-label">Learning format <em>*</em>
            <select value={form.preferredFormat} onChange={event => change('preferredFormat', event.target.value)} required>
              <option value="">Choose a format</option>
              <option>In person</option><option>Online</option><option>Open to either</option>
            </select>
          </label>
        </div>

        <div className="simple-divider" role="separator" aria-label="Contact information" />
        <div className="simple-fields">
          <label className="field-label simple-span-full">Parent / guardian or contact name <em>*</em>
            <input value={form.guardianName} onChange={event => change('guardianName', event.target.value)} maxLength={120} autoComplete="name" placeholder="Your full name" required />
          </label>
          <label className="field-label">Email address <em>*</em>
            <input value={form.email} onChange={event => change('email', event.target.value)} maxLength={254} type="email" inputMode="email" autoComplete="email" placeholder="you@example.com" required />
          </label>
          <label className="field-label">Phone <span className="optional">Optional</span>
            <input value={form.phone} onChange={event => change('phone', event.target.value)} maxLength={50} type="tel" inputMode="tel" autoComplete="tel" placeholder="(818) 555-0123" />
          </label>
          <label className="field-label simple-span-full">Anything else we should know? <span className="optional">Optional</span>
            <textarea rows={2} maxLength={2000} value={form.notes} onChange={event => change('notes', event.target.value)} placeholder="Questions, goals, or best time to reach you" />
          </label>
        </div>
        <label className="consent simple-consent">
          <input type="checkbox" checked={form.consent} onChange={event => change('consent', event.target.checked)} required />
          <span>I agree to be contacted about this inquiry and have read the <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>. <em>*</em></span>
        </label>
        <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={form.website} onChange={event => change('website', event.target.value)} />
        {error && <p className="form-error" role="alert">{error} {error.toLowerCase().includes('email delivery') || error.toLowerCase().includes('not configured') ? <a href={'tel:' + academy.phone.replace(/[^\d+]/g, '')}>Call {academy.phone}</a> : null}</p>}
        <button className="main-button simple-submit" type="submit" disabled={busy}>
          {busy ? <><LoaderCircle className="spin" size={18} aria-hidden="true" /> Sending...</> : <>Send inquiry <ArrowRight size={18} aria-hidden="true" /></>}
        </button>
      </form>
    </section>
  );
}
