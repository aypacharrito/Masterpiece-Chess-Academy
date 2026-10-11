'use client';

import { useRef, useState, type FormEvent } from 'react';
import { ArrowRight, ArrowLeft, Check, LoaderCircle, Sparkles } from 'lucide-react';

const steps = [
  { title: 'The student', short: 'Student', symbol: '♟' },
  { title: 'The fun stuff', short: 'Goals', symbol: '✦' },
  { title: 'Say hello', short: 'Contact', symbol: '♡' },
] as const;

type Inquiry = {
  studentName: string; age: string; experience: string; program: string;
  goals: string; preferredFormat: string; availability: string;
  guardianName: string; email: string; phone: string; notes: string;
  consent: boolean; website: string;
};
const initial: Inquiry = {
  studentName: '', age: '', experience: '', program: '', goals: '',
  preferredFormat: '', availability: '', guardianName: '', email: '',
  phone: '', notes: '', consent: false, website: '',
};
const experienceOptions = [
  { value: 'Brand new to chess', title: 'Just starting', emoji: '🌱' },
  { value: 'Beginner', title: 'Know the basics', emoji: '♙' },
  { value: 'Intermediate', title: 'Play pretty well', emoji: '♘' },
  { value: 'Advanced / tournament player', title: 'Tournament ready', emoji: '🏆' },
];
const programOptions = [
  { value: 'Free trial class', title: 'Try a class', emoji: '✨' },
  { value: 'Private lessons', title: 'Private lessons', emoji: '♛' },
  { value: 'Group classes', title: 'Group classes', emoji: '👋' },
  { value: 'Afterschool chess', title: 'After-school', emoji: '🎒' },
  { value: 'Chess camp / tournament', title: 'Camps & events', emoji: '🏅' },
  { value: 'Not sure yet', title: 'Help me choose', emoji: '💡' },
];
const formats = ['In person', 'Online', 'Open to either'];

export default function InquiryForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Inquiry>(initial);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const cardRef = useRef<HTMLElement>(null);

  const change = (key: keyof Inquiry, value: string | boolean) => {
    setForm(f => ({ ...f, [key]: value }));
    if (error) setError('');
  };
  const validStep = () => step === 0
    ? Boolean(form.studentName.trim() && form.age && form.experience)
    : step === 1
      ? Boolean(form.program && form.preferredFormat)
      : Boolean(form.guardianName.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) && form.consent);

  const scrollToCard = () => {
    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 820px)').matches) {
      cardRef.current?.scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    }
  };

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    if (!validStep()) { setError('Please fill out the required details to continue.'); return; }
    if (step < 2) { setStep(s => s + 1); scrollToCard(); return; }
    if (busy) return;
    setBusy(true);
    try {
      const r = await fetch('/api/inquiry', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      });
      const data: {error?: string} = await r.json();
      if (!r.ok) throw new Error(data.error || 'We could not send your request.');
      setDone(true);
      scrollToCard();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.');
    } finally { setBusy(false); }
  }

  if (done) return (
    <section className="form-card success" aria-live="polite" ref={cardRef}>
      <div className="success-confetti" aria-hidden="true">✦ ♟ ✳</div>
      <div className="success-icon"><Check size={36}/></div>
      <span className="eyebrow">YOU DID IT!</span>
      <h2>That was a <em>great first move!</em></h2>
      <p>Your inquiry was sent to the academy. They can reach you using the details you provided. We can&apos;t wait for your chess journey to begin.</p>
      <button type="button" className="main-button" onClick={() => {setForm(initial); setStep(0); setDone(false);}}>
        Start another inquiry <ArrowRight size={18}/>
      </button>
    </section>
  );

  return (
    <section className="form-card" id="inquiry" aria-label="Chess program inquiry form" ref={cardRef}>
      <div className="form-topline"><span className="enroll-status"><span className="status-dot"/> ENROLLMENT INQUIRY</span><span className="form-decoration" aria-hidden="true">✦</span></div>
      <div className="form-heading">
        <h2>Let&apos;s make your <em>first move!</em></h2>
        <p>Tell us a little about your chess superstar. It only takes a minute.</p>
      </div>
      <div className="form-progress" aria-label={`Step ${step + 1} of 3: ${steps[step].title}`}>
        {steps.map((item, index) => <div className={`progress-step ${index === step ? 'progress-step--active' : ''} ${index < step ? 'progress-step--complete' : ''}`} key={item.short}>
          <span className="progress-dot">{index < step ? <Check size={13}/> : <span aria-hidden="true">{index + 1}</span>}</span>
          <span>{item.short}</span>
        </div>)}
      </div>
      <form onSubmit={submit} noValidate>
        {step === 0 && <div className="fields" key="student">
          <div className="step-intro"><span className="step-symbol" aria-hidden="true">♟</span><h3>Who&apos;s our future grandmaster?</h3></div>
          <label className="field-label">Student&apos;s name <em>*</em>
            <input autoComplete="off" maxLength={120} value={form.studentName} onChange={e => change('studentName', e.target.value)} placeholder="Your chess superstar's name" required/>
          </label>
          <label className="field-label">Student&apos;s age <em>*</em>
            <select value={form.age} onChange={e => change('age', e.target.value)} required>
              <option value="">Choose an age group</option>
              <option>Under 6</option><option>6–8</option><option>9–12</option><option>13–17</option><option>18+</option>
            </select>
          </label>
          <fieldset className="field-group">
            <legend>Chess experience <em>*</em></legend>
            <div className="choice-grid choice-grid--experience">
              {experienceOptions.map(option => <button key={option.value} type="button" className={`choice-tile ${form.experience === option.value ? 'choice-tile--selected' : ''}`} onClick={() => change('experience', option.value)} aria-pressed={form.experience === option.value}>
                <span className="tile-emoji" aria-hidden="true">{option.emoji}</span><span>{option.title}</span><span className="tile-check" aria-hidden="true"><Check size={12}/></span>
              </button>)}
            </div>
          </fieldset>
        </div>}
        {step === 1 && <div className="fields" key="goals">
          <div className="step-intro"><span className="step-symbol step-symbol--orange" aria-hidden="true">✦</span><h3>What sounds like fun?</h3></div>
          <fieldset className="field-group">
            <legend>What are you interested in? <em>*</em></legend>
            <div className="choice-grid choice-grid--programs">
              {programOptions.map(option => <button key={option.value} type="button" className={`choice-tile ${form.program === option.value ? 'choice-tile--selected' : ''}`} onClick={() => change('program', option.value)} aria-pressed={form.program === option.value}>
                <span className="tile-emoji" aria-hidden="true">{option.emoji}</span><span>{option.title}</span><span className="tile-check" aria-hidden="true"><Check size={12}/></span>
              </button>)}
            </div>
          </fieldset>
          <fieldset className="field-group">
            <legend>How would you like to learn? <em>*</em></legend>
            <div className="pill-options">
              {formats.map(format => <button key={format} type="button" className={`pill-option ${form.preferredFormat === format ? 'pill-option--selected' : ''}`} aria-pressed={form.preferredFormat === format} onClick={() => change('preferredFormat', format)}>{format}</button>)}
            </div>
          </fieldset>
          <label className="field-label">Anything you&apos;re excited to learn? <span className="optional">Optional</span>
            <textarea rows={2} maxLength={2000} value={form.goals} onChange={e => change('goals', e.target.value)} placeholder="Confidence, new skills, tournaments..." />
          </label>
          <label className="field-label">Preferred days / times <span className="optional">Optional</span>
            <input maxLength={300} value={form.availability} onChange={e => change('availability', e.target.value)} placeholder="e.g. Weekday afternoons" />
          </label>
        </div>}
        {step === 2 && <div className="fields" key="contact">
          <div className="step-intro"><span className="step-symbol step-symbol--pink" aria-hidden="true">♡</span><h3>Where can we say hello?</h3></div>
          <label className="field-label">Parent / guardian or contact name <em>*</em>
            <input autoComplete="name" maxLength={120} value={form.guardianName} onChange={e => change('guardianName', e.target.value)} placeholder="Your full name" required />
          </label>
          <label className="field-label">Email address <em>*</em>
            <input autoComplete="email" type="email" maxLength={254} inputMode="email" value={form.email} onChange={e => change('email', e.target.value)} placeholder="you@example.com" required />
          </label>
          <label className="field-label">Phone number <span className="optional">Optional</span>
            <input autoComplete="tel" type="tel" inputMode="tel" maxLength={50} value={form.phone} onChange={e => change('phone', e.target.value)} placeholder="(818) 555-0123" />
          </label>
          <label className="field-label">Any questions for us? <span className="optional">Optional</span>
            <textarea rows={2} maxLength={2000} value={form.notes} onChange={e => change('notes', e.target.value)} placeholder="Anything else we should know?" />
          </label>
          <label className="consent"><input type="checkbox" checked={form.consent} onChange={e => change('consent', e.target.checked)}/><span>I agree to be contacted about my inquiry and have read the <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>. <em>*</em></span></label>
          <input className="honeypot" tabIndex={-1} autoComplete="off" value={form.website} onChange={e => change('website', e.target.value)} aria-hidden="true" name="website" />
        </div>}
        {error && <p role="alert" className="form-error">{error}</p>}
        <div className="form-actions">
          {step > 0 ? <button type="button" className="back-button" disabled={busy} onClick={() => {setError(''); setStep(s => s - 1); scrollToCard();}}><ArrowLeft size={18}/> Back</button> : <span className="privacy-note"><Sparkles size={15}/> A fun first step, no commitment.</span>}
          <button className="main-button" disabled={busy} type="submit">
            {busy ? <LoaderCircle className="spin" size={19}/> : <>{step === 2 ? 'Send my inquiry' : 'Next step'} <ArrowRight size={18}/></>}
          </button>
        </div>
      </form>
    </section>
  );
}
