import type { Metadata } from 'next';
import './globals.css';
import { ToastProvider } from '@/components/Toast';

export const metadata: Metadata = {
  title: 'LORE — The Intelligence Layer for Crypto Markets',
  description: 'See what others can\'t. Trade what others won\'t. AI-powered crypto intelligence, on-chain analytics, whale tracking, and exploit detection.',
  keywords: ['crypto', 'AI', 'blockchain', 'on-chain analytics', 'whale tracking', 'DeFi', 'exploit detection'],
  openGraph: {
    title: 'LORE — The Intelligence Layer for Crypto Markets',
    description: 'See what others can\'t. Trade what others won\'t.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#070708] text-[#F5F5FA] font-body antialiased">
        <ToastProvider>
          <div className="noise-bg" />
          <div className="grid-bg" />
          <div className="scanline" />
          <div className="relative z-10">
            {children}
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}
