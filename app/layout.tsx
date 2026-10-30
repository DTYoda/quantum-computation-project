import type { Metadata } from 'next';
import { Navigation } from '@/components/navigation';
import './globals.css';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: site.title,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">{site.interface.skipToContent}</a>
        <header>
          <div className="site-title">{site.title}</div>
          <Navigation />
        </header>
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
