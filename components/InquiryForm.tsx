'use client';

import { useRef, useState, type FormEvent } from 'react';
import { ArrowRight, Check, LoaderCircle } from 'lucide-react';
import { academy } from '../lib/content';

type Inquiry = {
  studentName: string;
  guardianName: string;
  email: string;
  phone: string;
  consent: boolean;
  website: string;
};

const initial: Inquiry = {
  studentName: '', guardianName: '', email: '', phone: '', consent: false, website: '',
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
      if (!response.ok || data.error) throw new Error(data.error || 'Could not send your inquiry. Please try again.');
      setDone(true);
      cardRef.current?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'center',
      });
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  if (done) return (
    <section className="form-card form-card--simple simple-success" id="inquiry" aria-live="polite" ref={cardRef}>
      <div className="simple-success-icon" aria-hidden="true"><Check size={30} /></div>
      <h2>Thank you!</h2>
      <p className="simple-success-message">Our team will reach out shortly.</p>
      <button className="main-button" type="button" onClick={() => { setForm(initial); setError(''); setDone(false); }}>
        Send another inquiry <ArrowRight size={17} aria-hidden="true" />
      </button>
    </section>
  );

  return (
    <section className="form-card form-card--simple" id="inquiry" aria-label="Chess academy inquiry form" ref={cardRef}>
      <form className="simple-form" onSubmit={submit}>
        <div className="simple-fields">
          <label className="field-label simple-span-full"><span className="simple-label-text">Student&apos;s name <em>*</em></span>
            <input value={form.studentName} onChange={event => change('studentName', event.target.value)} maxLength={120} placeholder="Student's full name" autoComplete="off" required />
          </label>
          <label className="field-label simple-span-full"><span className="simple-label-text">Parent / guardian or contact name <em>*</em></span>
            <input value={form.guardianName} onChange={event => change('guardianName', event.target.value)} maxLength={120} autoComplete="name" placeholder="Your full name" required />
          </label>
          <label className="field-label"><span className="simple-label-text">Email address <em>*</em></span>
            <input value={form.email} onChange={event => change('email', event.target.value)} maxLength={254} type="email" inputMode="email" autoComplete="email" placeholder="you@example.com" required />
          </label>
          <label className="field-label"><span className="simple-label-text">Phone number <span className="optional">Optional</span></span>
            <input value={form.phone} onChange={event => change('phone', event.target.value)} maxLength={50} type="tel" inputMode="tel" autoComplete="tel" placeholder="(818) 555-0123" />
          </label>
        </div>
        <label className="consent simple-consent">
          <input type="checkbox" checked={form.consent} onChange={event => change('consent', event.target.checked)} required />
          <span>I agree to be contacted about my inquiry and have read the <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>. <em>*</em></span>
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
