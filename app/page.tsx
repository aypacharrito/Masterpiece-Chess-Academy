import InquiryForm from '../components/InquiryForm';
import SiteHeader from '../components/SiteHeader';
import './simple.css';

export default function Home() {
  return (
    <main className="landing landing--simple">
      <SiteHeader />
      <div className="hero-grid hero-grid--simple">
        <section className="hero-copy hero-copy--simple" aria-labelledby="hero-heading">
          <span className="hero-eyebrow">MASTERPIECE CHESS ACADEMY</span>
          <h1 id="hero-heading">
            Find a <span className="hero-highlight">community</span> to help your child reach their <span className="hero-highlight">potential!</span>
          </h1>
          <p className="hero-description">
            A welcoming place to learn chess, build confidence, and make friends.
          </p>
          <a className="hero-cta" href="#inquiry">Get started <span aria-hidden="true">↗</span></a>
        </section>
        <InquiryForm />
      </div>
    </main>
  );
}
