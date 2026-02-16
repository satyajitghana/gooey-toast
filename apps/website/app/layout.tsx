import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Gooey Toast - Beautiful Toast Notifications',
  description: 'Beautiful toast notifications with organic blob morphing animations',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
