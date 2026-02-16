import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import 'gooey-ui/styles.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'gooey-ui - Morphing toast notifications for React',
  description:
    'Morphing toast notifications for React. Organic blob animations, promise tracking, and full customization out of the box.',
  openGraph: {
    title: 'gooey-ui',
    description: 'Morphing toast notifications for React.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'gooey-ui',
    description: 'Morphing toast notifications for React.',
  },
  icons: {
    icon: [
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
