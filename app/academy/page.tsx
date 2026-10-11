import Link from 'next/link';
import { academy, coaches, gallery, programs } from '../../lib/content';
import SiteHeader from '../../components/SiteHeader';

const programIcons = ['♛', '♞', '✦', '♜'];
export default function Academy() {
  return (
    <main className="interior">
      <SiteHeader interior />
      <section className="interior-hero">
        <div className="interior-hero-copy">
          <span className="eyebrow">A PLACE TO LEARN, PLAY &amp; GROW <span aria-hidden="true">✳</span></span>
          <h1>Serious about chess. <em>Big on fun.</em></h1>
          <p>Masterpiece Chess Academy helps students build strong minds, make bold moves, and find a lifelong love of the game.</p>
          <Link className="main-button inline-button" href="/">Find your class <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="interior-hero-piece" aria-hidden="true">♞ <span>✦</span></div>
      </section>
      <section className="academy-section">
        <span className="eyebrow eyebrow--dark">HOW WE PLAY</span>
        <h2>There&apos;s a place for <em>every kind of player.</em></h2>
        <div className="program-grid">
          {programs.map((p, i) => <article key={p.title} className={`program-card program-card--${i + 1}`}>
            <span className="program-icon" aria-hidden="true">{programIcons[i]}</span>
            <h3>{p.title}</h3><p>{p.description}</p>
          </article>)}
        </div>
      </section>
      <section className="academy-section gallery-section">
        <span className="eyebrow eyebrow--dark">LIFE AT THE ACADEMY</span>
        <h2>Good moves. <em>Great memories.</em></h2>
        <div className="photo-grid">{gallery.map((im, i) => <div className="photo" key={im.src}>
          {/* Original photos remain linked to the academy CDN pending owner approval to host local copies. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={im.src} alt={im.alt} loading="lazy" /><span>{String(i + 1).padStart(2,'0')}</span>
        </div>)}</div>
        <p className="source-note">Gallery images currently reference the academy&apos;s existing public website. Confirm image rights and migrate approved photos before launch. Some HEIC images may not display in every browser.</p>
      </section>
      <section className="academy-section">
        <span className="eyebrow eyebrow--dark">MEET YOUR TEAM</span>
        <h2>People who love <em>every move.</em></h2>
        <div className="coaches-grid">{coaches.map((c, i) => <article key={c.name} className="coach-card">
          <div className="coach-icon" aria-hidden="true">{['♚','♜','♞'][i]}</div>
          <h3>{c.name}</h3><strong>{c.role}</strong><p>{c.bio}</p>
        </article>)}</div>
      </section>
      <section className="academy-section contact-strip">
        <div><span className="eyebrow eyebrow--dark">READY TO PLAY?</span><h2>Your next move <em>starts here.</em></h2>
          <p>{academy.address}</p><p><a href={'tel:' + academy.phone.replace(/[^\d+]/g, '')}>{academy.phone}</a> · <a href={'mailto:' + academy.email}>{academy.email}</a></p>
        </div>
        <Link href="/" className="main-button inline-button">Get started <span aria-hidden="true">↗</span></Link>
      </section>
    </main>
  );
}
