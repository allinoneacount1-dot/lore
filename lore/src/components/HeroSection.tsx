'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

const stats = [
  { value: '$2.4B+', label: 'Intelligence processed' },
  { value: '12,847', label: 'Wallets tracked' },
  { value: '99.2%', label: 'Detection rate' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#070708] via-[#0D0D2B] to-[#1A0A2E]" />
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(108,92,231,0.12)_0%,transparent_70%)]" />
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,210,255,0.08)_0%,transparent_70%)]" />
      </div>

      {/* Floating particles (simple div-based) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#6C5CE7]/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-4xl mx-auto px-5 text-center"
      >
        {/* Badge */}
        <motion.div variants={item} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#6C5CE7]/30 bg-[#6C5CE7]/5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#6C5CE7]" />
          <span className="font-data text-xs tracking-widest text-[#6C5CE7]">NOW IN PRIVATE BETA</span>
        </motion.div>

        {/* Headline */}
        <motion.h1 variants={item} className="text-hero font-display text-white leading-[1.05]">
          The Intelligence Layer{' '}
          <span className="text-gradient">for Crypto Markets</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p variants={item} className="mt-6 text-lg md:text-xl text-[#A0A0B8] max-w-2xl mx-auto leading-relaxed">
          Lore reads the blockchain like a living story. Every transaction a sentence.
          Every wallet a character. Every market move a plot twist.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={item} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="btn-primary text-base flex items-center gap-2 w-full sm:w-auto justify-center">
            Enter the Lore
            <ArrowRight size={18} />
          </button>
          <button className="btn-secondary flex items-center gap-2 w-full sm:w-auto justify-center">
            <Play size={16} />
            Watch Demo
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div variants={item} className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-data text-2xl md:text-3xl font-bold text-white">
                {stat.value}
              </div>
              <div className="mt-1 text-xs text-[#5A5A72] font-data">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={item}
          className="mt-16 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-[#5A5A72] font-data">SCROLL</span>
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
