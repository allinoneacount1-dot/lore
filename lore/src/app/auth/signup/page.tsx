// src/app/auth/signup/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { WalletButton } from '@/components/WalletConnect';
import { useAuth } from '@/components/AuthProvider';
import { useUnifiedWallet } from '@/hooks/useWallet';
import { LoreLogo } from '@/components/LoreLogo';

export default function SignUpPage() {
  const { user, loading: authLoading, signInWithGoogle } = useAuth();
  const wallet = useUnifiedWallet();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (user || wallet.connected) {
      router.push('/dashboard');
    }
  }, [user, wallet.connected, router]);

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
        <Link href="/" className="flex items-center justify-center gap-3 mb-10">
          <LoreLogo className="w-10 h-10" />
          <span className="font-display font-bold text-2xl text-white">LORE</span>
        </Link>

        <div className="bg-[#111111] border border-white/5 rounded-2xl p-8">
          <h1 className="text-2xl font-display font-bold text-white text-center mb-2">Create your account</h1>
          <p className="text-sm text-[var(--color-text-muted)] text-center mb-8">
            Start tracking whales and detecting exploits
          </p>

          {/* Google Sign Up */}
          <button
            onClick={signInWithGoogle}
            className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl bg-white/[0.05] border border-white/10 text-white font-medium hover:bg-white/[0.08] hover:border-white/20 transition-all"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign up with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-[var(--color-text-muted)] font-data">OR</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Wallet Connect */}
          <WalletButton />
        </div>

        <p className="text-xs text-[var(--color-text-muted)] text-center mt-6">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-[var(--color-primary)] hover:underline">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
