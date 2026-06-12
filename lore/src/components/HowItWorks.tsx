'use client';

import { motion } from 'framer-motion';
import { Satellite, Brain, FileText } from 'lucide-react';

const steps = [
  {
    icon: Satellite,
    step: '01',
    title: 'Ingest',
    description: 'We collect data from 14+ sources: on-chain transactions, social media, developer activity, DEX flows, and market microstructure. 2.3M data points per minute.',
    visual: 'data-streams',
  },
  {
    icon: Brain,
    step: '02',
    title: 'Interpret',
    description: 'Our AI models — trained on 3 years of crypto market data — identify patterns, anomalies, and narrative shifts. Not just numbers. Context.',
    visual: 'neural-network',
  },
  {
    icon: FileText,
    step: '03',
    title: 'Reveal',
    description: 'Complex data becomes a clear, actionable narrative. What happened. Why it matters. What to do next.',
    visual: 'narrative',
  },
];

export default function HowItWorks() {
  return (
    <section id="narrative" className="py-24 md:py-32 relative">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-20">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="font-data text-xs tracking-[0.25em] uppercase text-[#6C5CE7]">
            ◆ How Lore Works
          </span>
          <h2 className="text-h2 font-display text-white mt-4">
            From noise to <span className="text-gradient">narrative</span>
          </h2>
          <p className="mt-4 text-lg text-[#A0A0B8] max-w-2xl mx-auto">
            Three steps. Millions of data points. One clear story.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-24 left-[20%] right-[20%] h-px bg-gradient-to-r from-[#6C5CE7]/0 via-[#6C5CE7]/30 to-[#00D2FF]/0" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
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
                <div className="relative z-10 inline-flex p-5 rounded-2xl bg-gradient-to-br from-[#6C5CE7]/20 to-[#00D2FF]/10 border border-[#6C5CE7]/20 mb-6">
                  <Icon size={32} className="text-[#6C5CE7]" />
                </div>

                <h3 className="font-display font-semibold text-2xl text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-[#A0A0B8] text-sm leading-relaxed max-w-sm mx-auto">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
