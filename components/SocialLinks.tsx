import { academy } from '../lib/content';

type SocialLinksProps = { placement?: 'header' | 'footer' };

/** Inline brand marks keep both links recognizable without a third-party icon CDN. */
export default function SocialLinks({ placement = 'header' }: SocialLinksProps) {
  return (
    <div className={`social-links social-links--${placement}`} aria-label="Follow Masterpiece Chess Academy">
      <a href={academy.instagram} target="_blank" rel="noopener noreferrer" aria-label="Masterpiece Chess Academy on Instagram" title="Instagram" className="social-icon social-icon--instagram">
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2.6" y="2.6" width="18.8" height="18.8" rx="5.5" stroke="currentColor" strokeWidth="2.3" />
          <circle cx="12" cy="12" r="4.25" stroke="currentColor" strokeWidth="2.3" />
          <circle cx="17.55" cy="6.55" r="1.3" fill="currentColor" />
        </svg>
      </a>
      <a href={academy.facebook} target="_blank" rel="noopener noreferrer" aria-label="Masterpiece Chess Academy on Facebook" title="Facebook" className="social-icon social-icon--facebook">
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.98H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.25.2 2.25.2v2.47H15.2c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.9h-2.33v6.98A10 10 0 0 0 22 12Z" />
        </svg>
      </a>
    </div>
  );
}
