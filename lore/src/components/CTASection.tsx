'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Transparent gradient — 3D shows through */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#070708]/50 via-[#0D0D2B]/40 to-[#1A0A2E]/50" />
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(108,92,231,0.12)_0%,transparent_70%)]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-3xl mx-auto px-5 text-center"
      >
        <h2 className="text-h1 font-display text-white">
          The market has a story.
        </h2>
        <p className="mt-4 text-h3 font-display text-gradient-gold">
          Are you listening?
        </p>
        <p className="mt-6 text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto">
          Join 2,847+ traders who see what others can&apos;t.
        </p>
        <button className="mt-10 btn-primary text-lg !px-12 !py-5 inline-flex items-center gap-3">
          Enter the Lore
          <ArrowRight size={20} />
        </button>
        <p className="mt-4 text-xs text-[var(--color-text-muted)] font-data">
          No credit card required. Start in 30 seconds.
        </p>
      </motion.div>
    </section>
  );
}
