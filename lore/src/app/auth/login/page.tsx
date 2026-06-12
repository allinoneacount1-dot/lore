// src/app/auth/login/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lock, Loader2 } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { useWalletContext } from '@/components/WalletProvider';
import { LoreLogo } from '@/components/LoreLogo';

const walletOptions = [
  { id: 'phantom', name: 'Phantom', chain: 'Solana', icon: '👻' },
  { id: 'metamask', name: 'MetaMask', chain: 'Ethereum', icon: '🦊' },
  { id: 'walletconnect', name: 'WalletConnect', chain: 'Multi-chain', icon: '🔗' },
];

export default function LoginPage() {
  const { user, loading: authLoading, signInWithGoogle } = useAuth();
  const { wallet, connect, connecting } = useWalletContext();
  const router = useRouter();
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect if already logged in
  useEffect(() => {
    if (user || wallet.connected) {
      router.push('/dashboard');
    }
  }, [user, wallet.connected, router]);

  const handleWalletConnect = async (walletId: string) => {
    setSelectedWallet(walletId);
    await connect(walletId);
    setSelectedWallet(null);
  };

  if (!mounted || authLoading) {
    return (
      <div className="min-h-screen bg-[#070708] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[var(--color-primary)]/30 border-t-[var(--color-primary)] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070708] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-3 mb-10">
          <LoreLogo className="w-10 h-10" />
          <span className="font-display font-bold text-2xl text-white">LORE</span>
        </Link>

        {/* Card */}
        <div className="bg-[#111111] border border-white/5 rounded-2xl p-8">
          <h1 className="text-2xl font-display font-bold text-white text-center mb-2">Welcome back</h1>
          <p className="text-sm text-[var(--color-text-muted)] text-center mb-8">
            Sign in to access your dashboard
          </p>

          {/* Google Sign In */}
          <button
            onClick={signInWithGoogle}
            className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl bg-white/[0.05] border border-white/10 text-white font-medium hover:bg-white/[0.08] hover:border-white/20 transition-all group"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-[var(--color-text-muted)] font-data">OR</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Wallet Options */}
          <div className="space-y-3">
            {walletOptions.map((w) => (
              <button
                key={w.id}
                onClick={() => handleWalletConnect(w.id)}
                disabled={connecting}
                className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/5 text-white font-medium hover:bg-white/[0.06] hover:border-white/10 transition-all disabled:opacity-50"
              >
                <span className="text-lg">{w.icon}</span>
                <div className="flex-1 text-left">
                  <div className="text-sm">{w.name}</div>
                  <div className="text-[10px] text-[var(--color-text-muted)]">{w.chain}</div>
                </div>
                {connecting && selectedWallet === w.id ? (
                  <Loader2 size={16} className="animate-spin text-[var(--color-primary)]" />
                ) : (
                  <Lock size={14} className="text-[var(--color-text-muted)]" />
                )}
              </button>
            ))}
          </div>

          {/* Features */}
          <div className="mt-8 pt-6 border-t border-white/5">
            <p className="text-xs text-[var(--color-text-muted)] text-center mb-4">What you get:</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                'Real-time whale tracking',
                'AI market narratives',
                'Exploit detection',
                'Portfolio analytics',
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs text-[var(--color-text-muted)] text-center mt-6">
          Don't have an account?{' '}
          <Link href="/auth/signup" className="text-[var(--color-primary)] hover:underline">
            Sign up free
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
