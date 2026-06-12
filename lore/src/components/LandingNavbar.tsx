// src/components/LandingNavbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { LoreLogo } from './LoreLogo';
import dynamic from 'next/dynamic';

// Dynamically import wallet button with SSR disabled
const WalletButton = dynamic(() => import('./WalletConnect').then(m => ({ default: m.WalletButton })), {
  ssr: false,
  loading: () => (
    <button className="btn-primary text-sm !px-5 !py-2.5 !rounded-lg">
      <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
    </button>
  ),
});

const navLinks = [
  { label: 'Intelligence', href: '#intelligence' },
  { label: 'Narrative', href: '#narrative' },
  { label: 'Terminal', href: '#terminal' },
  { label: 'Pricing', href: '/pricing' },
];

export default function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ${
          scrolled
            ? 'bg-[#070708]/80 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-5 lg:px-20 h-full flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <LoreLogo className="w-8 h-8" />
            <span className="font-display font-bold text-xl text-white">LORE</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="live-dot" />
              <span className="font-data text-xs text-[var(--color-text-muted)]">LIVE</span>
            </div>
            <Link
              href="/auth/login"
              className="text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors font-medium"
            >
              Sign In
            </Link>
            {mounted && <WalletButton />}
          </div>

          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#070708]/95 backdrop-blur-xl pt-20"
          >
            <div className="flex flex-col items-center gap-8 pt-12">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-2xl font-display font-semibold text-white hover:text-[var(--color-primary)] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/auth/login"
                onClick={() => setMobileOpen(false)}
                className="btn-secondary text-sm"
              >
                Sign In
              </Link>
              {mounted && <WalletButton />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
