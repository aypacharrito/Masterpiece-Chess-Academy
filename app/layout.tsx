import type { Metadata } from 'next';
import './globals.css';
import './polish.css';
import { academy } from '../lib/content';

export const metadata: Metadata = {
  title: 'Masterpiece Chess Academy | Big Thinkers Start Here',
  description: 'Fun, confidence-building chess lessons for kids and aspiring champions. Tell us about your student and explore Masterpiece Chess Academy.',
  icons: { icon: '/icon.svg' },
  openGraph: {
    title: 'Masterpiece Chess Academy | Big Thinkers Start Here',
    description: 'Little moves. Big possibilities. Explore chess lessons for curious young minds.',
    type: 'website',
  },
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var saved=localStorage.getItem('masterpiece-theme');var dark=saved==='dark'||(!saved&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.dataset.theme=dark?'dark':'light';}catch(e){document.documentElement.dataset.theme='light';}})();` }} />
      </head>
      <body>
        {children}
        <footer className="site-footer">
          <div className="footer-upper">
            <div className="footer-brand-block">
              <a href="/" className="footer-brand"><span aria-hidden="true">♞</span> MASTERPIECE <small>CHESS ACADEMY</small></a>
              <p>Little moves. Big possibilities.</p>
            </div>
            <div className="footer-right">
              <div className="footer-links" aria-label="Footer navigation">
                <a href="/academy">Our Academy</a>
                <a href="/privacy">Privacy Policy</a>
                <a href="/terms">Terms of Service</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} {academy.name}</span>
            <span>Made for curious minds <span aria-hidden="true">✦</span></span>
          </div>
        </footer>
      </body>
    </html>
  );
}
