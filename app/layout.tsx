import type { Metadata } from 'next';
import './globals.css';
import './polish.css';
import { academy } from '../lib/content';

export const metadata: Metadata = {
  title: 'Masterpiece Chess Academy | A Community to Grow Through Chess',
  description: 'Find a welcoming chess community to help your child learn, build confidence, and reach their potential.',
  icons: { icon: '/icon.svg' },
  openGraph: {
    title: 'Masterpiece Chess Academy | A Community to Grow Through Chess',
    description: 'Find a community to help your child reach their potential!',
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
          </div>
        </footer>
      </body>
    </html>
  );
}
