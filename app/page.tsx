import Link from 'next/link';
import InquiryForm from '../components/InquiryForm';
import './simple.css';

export default function Home() {
  return (
    <main className="landing landing--simple landing--minimal">
      <header className="top-nav top-nav--minimal">
        <Link href="/" className="wordmark" aria-label="Masterpiece Chess Academy homepage">
          <span className="logo-symbol" aria-hidden="true">♞</span>
          <span className="wordmark-text">MASTERPIECE<small>CHESS ACADEMY</small></span>
        </Link>
      </header>
      <div className="hero-grid hero-grid--simple">
        <section className="hero-copy hero-copy--simple" aria-labelledby="hero-heading">
          <h1 id="hero-heading">
            Find a <span className="hero-highlight">community</span> to help your child reach their <span className="hero-highlight">potential!</span>
          </h1>
          <a className="hero-cta" href="#inquiry">Get started <span aria-hidden="true">↗</span></a>
        </section>
        <InquiryForm />
      </div>
    </main>
  );
}
