'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useToast } from '@/components/Toast';
import { useWalletContext } from '@/components/WalletProvider';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// Dynamic import for Three.js scene (SSR disabled)
const HeroScene = dynamic(() => import('./HeroScene'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-[var(--color-bg-primary)]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(108,92,231,0.15)_0%,transparent_70%)]" />
    </div>
  ),
});

const stats = [
  { value: '$2.4B+', label: 'Intelligence processed' },
  { value: '12,847', label: 'Wallets tracked' },
  { value: '99.2%', label: 'Detection rate' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.5 },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export default function HeroSection() {
  const { showToast } = useToast();
  const { wallet, openModal } = useWalletContext();
  const router = useRouter();

  const handleEnterLore = () => {
    if (wallet?.connected) {
      router.push('/dashboard');
    } else {
      openModal();
      showToast('Connect your wallet to enter the Lore', 'info');
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Three.js Scene — z-index 0 */}
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      {/* Gradient overlay for depth — z-index 1, pointer-events-none so it doesn't block clicks */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[var(--color-bg-primary)]/70 via-[var(--color-bg-primary)]/20 to-[var(--color-bg-primary)] pointer-events-none" />

      {/* Content — z-index 2, above everything */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-[2] max-w-4xl mx-auto px-5 text-center pt-24 pb-12"
      >
        {/* Headline */}
        <motion.h1 variants={item} className="text-h1 font-display text-white leading-[1.1]">
          The Intelligence Layer{' '}
          <span className="text-gradient">for Crypto Markets</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p variants={item} className="mt-6 text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
          Lore reads the blockchain like a living story. Every transaction a sentence.
          Every wallet a character. Every market move a plot twist.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={item} className="mt-10 flex items-center justify-center">
          <button onClick={handleEnterLore} className="btn-primary text-base flex items-center gap-2">
            Enter the Lore
            <ArrowRight size={18} />
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div variants={item} className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-data text-2xl md:text-3xl font-bold text-white">
                {stat.value}
              </div>
              <div className="mt-1 text-xs text-[var(--color-text-muted)] font-data">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={item}
          className="mt-16 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-[var(--color-text-muted)] font-data">SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 rounded-full border border-white/10 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-white/30" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
