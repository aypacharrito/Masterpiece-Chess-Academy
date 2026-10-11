import InquiryForm from '../components/InquiryForm';
import SiteHeader from '../components/SiteHeader';

export default function Home() {
  return (
    <main className="landing">
      <div className="landing-glow landing-glow--one" aria-hidden="true" />
      <div className="landing-glow landing-glow--two" aria-hidden="true" />
      <SiteHeader />
      <div className="hero-grid">
        <section className="hero-copy" aria-labelledby="hero-heading">
          <div className="hero-kicker"><span className="kicker-star" aria-hidden="true">✦</span> A WORLD OF BIG THINKERS</div>
          <h1 id="hero-heading">Little moves.<br/><span className="hero-highlight">Big possibilities<span className="hero-period">.</span></span></h1>
          <p className="hero-description">Chess is more than a game. It&apos;s a superpower for curious minds, creative thinking, and growing confidence.</p>
          <div className="hero-tags" aria-label="What students can learn">
            <span className="hero-tag hero-tag--peach"><span aria-hidden="true">✹</span> Have fun</span>
            <span className="hero-tag hero-tag--lavender"><span aria-hidden="true">♟</span> Think smart</span>
            <span className="hero-tag hero-tag--mint"><span aria-hidden="true">★</span> Grow brave</span>
          </div>
          <div className="chess-illustration" aria-hidden="true">
            <div className="art-spark art-spark--one">✳</div>
            <div className="art-spark art-spark--two">✦</div>
            <div className="art-caption art-caption--top">YOUR NEXT MOVE <span>↗</span></div>
            <div className="art-board">
              {Array.from({ length: 16 }).map((_, i) => <span key={i} className={(Math.floor(i / 4) + i % 4) % 2 === 0 ? 'board-square board-square--light' : 'board-square board-square--dark'} />)}
              <div className="art-knight">♞</div>
              <div className="art-star">✸</div>
            </div>
            <div className="art-caption art-caption--bottom">PLAY • LEARN • SHINE</div>
          </div>
          <div className="hero-lower">The best journeys start with a single move. <span aria-hidden="true">↗</span></div>
        </section>
        <InquiryForm />
      </div>
      <div className="bottom-note"><span>MASTERPIECE CHESS ACADEMY</span><span>SANTA CLARITA, CALIFORNIA <span aria-hidden="true">✦</span></span></div>
    </main>
  );
}
