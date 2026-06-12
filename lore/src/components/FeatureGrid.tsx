'use client';

import { motion } from 'framer-motion';
import {
  Satellite, Brain, FileText, Shield, Eye, PieChart,
  Bell, TrendingUp, Zap, Lock, Database, Globe,
  ChevronRight, Star, Users, Activity, ArrowRight, Check
} from 'lucide-react';

const features = [
  {
    icon: FileText,
    title: 'Narrative Engine',
    description: 'Our AI reads 14 data sources simultaneously — on-chain flows, social sentiment, developer activity, token economics — and weaves them into a coherent narrative. Not just what happened. Why it matters.',
    stat: '2.3M data points/min',
    span: 'col-span-1 md:col-span-7',
    accent: 'violet',
  },
  {
    icon: Shield,
    title: 'Exploit Detection',
    description: 'Detect exploits before they happen. Our models identify suspicious patterns minutes before the average alert.',
    stat: '14 min early warning',
    span: 'col-span-1 md:col-span-5',
    accent: 'red',
  },
  {
    icon: Eye,
    title: 'Whale Radar',
    description: 'Track 12,847 smart money wallets in real-time. Know what they\'re buying before the market moves.',
    stat: '12,847 wallets tracked',
    span: 'col-span-1 md:col-span-5',
    accent: 'cyan',
  },
  {
    icon: TrendingUp,
    title: 'Sentiment Analysis',
    description: 'Aggregate sentiment from Twitter, Discord, Telegram, and on-chain social signals.',
    stat: '94.2% accuracy',
    span: 'col-span-1 md:col-span-4',
    accent: 'blue',
  },
  {
    icon: PieChart,
    title: 'Portfolio Oracle',
    description: 'AI-powered portfolio recommendations based on your risk profile and market conditions.',
    stat: '23% avg. outperformance',
    span: 'col-span-1 md:col-span-4',
    accent: 'gold',
  },
  {
    icon: Bell,
    title: 'Alert System',
    description: 'Custom alerts for whale movements, exploit signals, narrative shifts, and price anomalies.',
    stat: '< 500ms latency',
    span: 'col-span-1 md:col-span-4',
    accent: 'green',
  },
];

const accentColors: Record<string, string> = {
  violet: 'from-[var(--color-primary)]/20 to-[#6C5CE7]/5 border-[var(--color-primary)]/20 text-[var(--color-primary)]',
  red: 'from-[#FF5252]/20 to-[#FF5252]/5 border-[#FF5252]/20 text-[var(--color-negative)]',
  cyan: 'from-[#00D2FF]/20 to-[var(--color-secondary)]/5 border-[#00D2FF]/20 text-[var(--color-secondary)]',
  blue: 'from-[#42A5F5]/20 to-[#42A5F5]/5 border-[#42A5F5]/20 text-[var(--color-info)]',
  gold: 'from-[#FDCB6E]/20 to-[#FDCB6E]/5 border-[#FDCB6E]/20 text-[#FDCB6E]',
  green: 'from-[#00E676]/20 to-[#00E676]/5 border-[var(--color-positive)]/20 text-[var(--color-positive)]',
};

export default function FeatureGrid() {
  return (
    <section id="intelligence" className="py-24 md:py-32 relative">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-20">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="font-data text-xs tracking-[0.25em] uppercase text-[var(--color-primary)]">
            ◆ Intelligence Modules
          </span>
          <h2 className="text-h2 font-display text-white mt-4">
            Every signal.{' '}
            <span className="text-gradient">One narrative.</span>
          </h2>
          <p className="mt-4 text-lg text-[var(--color-text-secondary)] max-w-2xl">
            Six AI-powered modules working in concert. Each one specialist.
            Together, they see what no human analyst can.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            const colors = accentColors[feature.accent] || accentColors.violet;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className={`${feature.span} group relative overflow-hidden rounded-2xl border ${colors.split(' ')[1]} bg-gradient-to-br ${colors.split(' ')[0]} p-6 md:p-8 hover:border-opacity-40 transition-all duration-300`}
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${colors.split(' ')[0]} mb-5`}>
                  <Icon size={24} className={colors.split(' ')[2]} />
                </div>
                <h3 className=" font-display font-semibold text-xl text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-5">
                  {feature.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className={`font-data text-xs ${colors.split(' ')[2]}`}>
                    {feature.stat}
                  </span>
                  <ChevronRight size={16} className="text-[var(--color-text-muted)] group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(108,92,231,0.05)_0%,transparent_70%)]" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
