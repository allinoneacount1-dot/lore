'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    step: '01',
    title: 'Ingest',
    description: 'We collect data from 14+ sources: on-chain transactions, social media, developer activity, DEX flows, and market microstructure. 2.3M data points per minute.',
    icon: 'ingest',
  },
  {
    step: '02',
    title: 'Interpret',
    description: 'Our AI models — trained on 3 years of crypto market data — identify patterns, anomalies, and narrative shifts. Not just numbers. Context.',
    icon: 'interpret',
  },
  {
    step: '03',
    title: 'Reveal',
    description: 'Complex data becomes a clear, actionable narrative. What happened. Why it matters. What to do next.',
    icon: 'reveal',
  },
];

function StepIcon({ type, className }: { type: string; className?: string }) {
  if (type === 'ingest') {
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 32a8 8 0 100-16 8 8 0 000 16z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M24 24l-8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M10 38l6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M38 38l-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M24 8v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M34.6 13.4l-2.8 2.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M13.4 13.4l2.8 2.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M6 42l8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M42 42l-8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="24" cy="8" r="2" fill="currentColor"/>
      </svg>
    );
  }
  if (type === 'interpret') {
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="20" r="8" stroke="currentColor" strokeWidth="2"/>
        <circle cx="18" cy="18" r="1.5" fill="currentColor"/>
        <circle cx="30" cy="18" r="1.5" fill="currentColor"/>
        <path d="M24 28v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M16 34l8 6 8-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 20H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M40 20h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M14 12l-3-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M34 12l3-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M24 12V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="10" cy="20" r="2" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="38" cy="20" r="2" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="24" cy="40" r="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 20l-2-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M36 20l2-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    );
  }
  if (type === 'reveal') {
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 24s5-12 20-12 20 12 20 12-5 12-20 12S4 24 4 24z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="2"/>
        <circle cx="24" cy="24" r="2" fill="currentColor"/>
        <path d="M42 6L24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="42" cy="6" r="2" fill="currentColor"/>
      </svg>
    );
  }
  return null;
}

export default function HowItWorks() {
  return (
    <section id="narrative" className="py-24 md:py-32 relative">
      {/* Subtle frosted layer */}
      <div className="absolute inset-0 bg-[#070708]/30" />

      <div className="relative max-w-[1280px] mx-auto px-5 lg:px-20">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="font-data text-xs tracking-[0.25em] uppercase text-[var(--color-primary)]">
            ◆ How Lore Works
          </span>
          <h2 className="text-h2 font-display text-white mt-4">
            From noise to <span className="text-gradient">narrative</span>
          </h2>
          <p className="mt-4 text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Three steps. Millions of data points. One clear story.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-24 left-[20%] right-[20%] h-px bg-gradient-to-r from-[var(--color-primary)]/0 via-[var(--color-primary)]/30 to-[var(--color-secondary)]/0" />

          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="relative text-center"
            >
              {/* Step number */}
              <div className="font-data text-[10rem] font-bold leading-none text-white/[0.03] absolute -top-8 left-1/2 -translate-x-1/2 select-none">
                {step.step}
              </div>

              {/* Icon */}
              <div className="relative z-10 inline-flex p-5 rounded-2xl bg-[#070708]/50 backdrop-blur-sm border border-[var(--color-primary)]/20 mb-6">
                <StepIcon type={step.icon} className="w-8 h-8 text-[var(--color-primary)]" />
              </div>

              <h3 className="font-display font-semibold text-2xl text-white mb-4">
                {step.title}
              </h3>
              <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed max-w-sm mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
