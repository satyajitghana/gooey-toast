import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Changelog - gooey-ui',
  description: 'What\'s new in gooey-ui.',
};

export default function ChangelogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
