import Link from 'next/link';
import SocialLinks from './SocialLinks';

export default function SiteHeader({ interior = false }: { interior?: boolean }) {
  return (
    <header className={`top-nav ${interior ? 'top-nav--interior' : ''}`}>
      <Link href="/" className="wordmark" aria-label="Masterpiece Chess Academy homepage">
        <span className="logo-symbol" aria-hidden="true">♞</span>
        <span className="wordmark-text">MASTERPIECE<small>CHESS ACADEMY</small></span>
      </Link>
      <nav className="top-nav-actions" aria-label="Main navigation">
        <Link className="nav-link" href={interior ? '/' : '/academy'}>
          {interior ? 'Enroll now' : 'Our academy'} <span aria-hidden="true">↗</span>
        </Link>
        <span className="nav-divider" aria-hidden="true" />
        <SocialLinks />
      </nav>
    </header>
  );
}
