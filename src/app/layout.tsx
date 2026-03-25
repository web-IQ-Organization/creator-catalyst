// deliverables/creator_catalyst/app/src/app/layout.tsx

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // Assuming a global CSS file for Tailwind

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Creator Catalyst',
  description: 'Turn Your SaaS Into a Creator-Led Growth Machine',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-zinc-950 text-white`}>
        {children}
      </body>
    </html>
  );
}
