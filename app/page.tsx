import InquiryForm from '../components/InquiryForm';
import SiteHeader from '../components/SiteHeader';
import './simple.css';

export default function Home() {
  return (
    <main className="landing landing--simple">
      <SiteHeader />
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
