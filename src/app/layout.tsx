import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'IMEC 2026 — International Mineral Exploration Conference',
  description:
    'IMEC 2026 — Uluslararası Maden Arama Konferansı, 4-6 Kasım 2026, Ankara, Türkiye.',
  icons: { icon: '/logo.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
