'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Shield,
  Zap,
  Eye,
  Users,
  Target,
  Brain,
  Globe,
  Lock,
  TrendingUp,
  BarChart3,
  Activity,
  Layers,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/* ── animation variants ─────────────────────────────────── */

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

/* ── data ───────────────────────────────────────────────── */

const team = [
  {
    name: 'Alex Voss',
    role: 'Founder & CEO',
    bio: 'Ex-Goldman Sachs quant. 12 years in algorithmic trading. Built three DeFi protocols before LORE.',
    avatar: 'AV',
    color: 'from-[#6C5CE7] to-[#00D2FF]',
  },
  {
    name: 'Maya Chen',
    role: 'CTO',
    bio: 'Former lead engineer at Chainlink. Distributed systems PhD from MIT. Obsessed with real-time data pipelines.',
    avatar: 'MC',
    color: 'from-[#00D2FF] to-[#00E676]',
  },
  {
    name: 'Kai Nakamura',
    role: 'Head of AI Research',
    bio: 'Published 23 papers on transformer architectures for time-series. Previously at DeepMind.',
    avatar: 'KN',
    color: 'from-[#FDCB6E] to-[#FF9F43]',
  },
  {
    name: 'Sofia Reyes',
    role: 'Head of Product',
    bio: 'Designed analytics dashboards used by 500K+ traders. Ex-Coinbase, ex-a16z portfolio.',
    avatar: 'SR',
    color: 'from-[#FF5252] to-[#FDCB6E]',
  },
  {
    name: 'Dmitri Volkov',
    role: 'Head of Security',
    bio: 'White-hat hacker. Discovered critical vulnerabilities in 4 major DeFi protocols. Bug bounty legend.',
    avatar: 'DV',
    color: 'from-[#42A5F5] to-[#6C5CE7]',
  },
  {
    name: 'Lena Park',
    role: 'Head of Growth',
    bio: 'Scaled three crypto products from 0 to 1M users. Community architect. Narrative design expert.',
    avatar: 'LP',
    color: 'from-[#00E676] to-[#00D2FF]',
  },
];

const values = [
  {
    icon: Eye,
    title: 'Radical Transparency',
    description:
      'We believe information asymmetry is the root of every bad trade. LORE exists to level the playing field — giving every trader access to the same intelligence that was once reserved for insiders.',
  },
  {
    icon: Brain,
    title: 'AI-First Intelligence',
    description:
      'We don\'t just aggregate data — we interpret it. Our models read on-chain activity, social sentiment, and market microstructure to surface narratives before they go mainstream.',
  },
  {
    icon: Shield,
    title: 'Security by Design',
    description:
      'Every signal LORE produces is cryptographically verified. We track exploits in real-time and alert users before they interact with compromised contracts.',
  },
  {
    icon: Globe,
    title: 'Open Ecosystem',
    description:
      'LORE is built on public blockchains. Our API is open. Our methodology is documented. We grow when the ecosystem grows — no walled gardens.',
  },
];

const stats = [
  { icon: BarChart3, value: '$2.4B+', label: 'Intelligence Processed', color: 'text-[var(--color-primary)]' },
  { icon: Users, value: '12,847', label: 'Wallets Tracked', color: 'text-[var(--color-secondary)]' },
  { icon: Activity, value: '99.2%', label: 'Detection Rate', color: 'text-[var(--color-positive)]' },
  { icon: TrendingUp, value: '2,847+', label: 'Active Traders', color: 'text-[var(--color-tertiary)]' },
  { icon: Layers, value: '14', label: 'Chains Monitored', color: 'text-[var(--color-info)]' },
  { icon: Lock, value: '0', label: 'Security Breaches', color: 'text-[var(--color-positive)]' },
];

const milestones = [
  { year: '2023', event: 'LORE founded in Zurich. Seed round led by a16z Crypto.' },
  { year: '2024', event: 'Public beta launch. 500+ wallets tracked. First exploit detected 47 minutes before public disclosure.' },
  { year: '2025', event: 'Series A ($28M). Expanded to 12 chains. AI Narrative Engine v2 shipped.' },
  { year: '2026', event: '2,847+ active traders. Real-time whale tracking. Terminal v1.0 released.' },
];

/* ── page ───────────────────────────────────────────────── */

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#070708] text-[#F5F5FA] overflow-x-hidden">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070708] via-[#0D0D2B] to-[#1A0A2E]" />
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(108,92,231,0.1)_0%,transparent_70%)]" />
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,210,255,0.06)_0%,transparent_70%)]" />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-[var(--color-primary)]/20"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              animate={{ y: [0, -30, 0], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 2 }}
            />
          ))}
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="relative z-10 max-w-4xl mx-auto px-5 text-center"
        >
          {/* Breadcrumb */}
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-2 mb-8">
            <Link href="/" className="text-sm font-data text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">
              Home
            </Link>
            <span className="text-[var(--color-text-muted)]">/</span>
            <span className="text-sm font-data text-[var(--color-text-secondary)]">About</span>
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-h1 font-display text-white leading-tight">
            We&apos;re building the{' '}
            <span className="text-gradient">nervous system</span>{' '}
            for crypto markets
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
            LORE reads the blockchain like a living story. Every transaction a sentence.
            Every wallet a character. Every market move a plot twist.
            We exist to make sure you&apos;re always reading ahead.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex items-center justify-center gap-3">
            <Target className="w-5 h-5 text-[var(--color-primary)]" />
            <span className="font-data text-sm text-[var(--color-text-muted)]">
              Founded 2023 · Zurich, Switzerland · Remote-first
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* ── MISSION ───────────────────────────────────────── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A0A2E] to-[#070708]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-5xl mx-auto px-5"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Left — text */}
            <div>
              <span className="font-data text-xs tracking-widest uppercase text-[var(--color-primary)]">
                Our Mission
              </span>
              <h2 className="mt-4 text-h2 font-display text-white">
                Information asymmetry is the last unfair advantage
              </h2>
              <p className="mt-6 text-[var(--color-text-secondary)] leading-relaxed">
                In traditional markets, insiders have always had better information. Crypto was supposed to change that.
                But the reality is: on-chain data is noisy, fragmented, and overwhelming. The edge still belongs to those
                who can process it fastest.
              </p>
              <p className="mt-4 text-[var(--color-text-secondary)] leading-relaxed">
                LORE changes this. We aggregate, interpret, and deliver actionable intelligence from 14+ blockchains in
                real-time. Our AI doesn&apos;t just show you data — it tells you what it means, why it matters, and what
                happens next.
              </p>
              <p className="mt-4 text-[var(--color-text-secondary)] leading-relaxed">
                We believe every trader, regardless of size, deserves the same quality of intelligence.
                That&apos;s not a tagline. It&apos;s an architectural decision.
              </p>
            </div>

            {/* Right — visual card */}
            <div className="relative">
              <div className="card-glass rounded-2xl p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-[var(--color-primary)]" />
                  </div>
                  <span className="font-display font-semibold text-white text-lg">Why LORE Exists</span>
                </div>

                <div className="space-y-5">
                  {[
                    { label: 'Data processed daily', value: '847M+ transactions', pct: 92 },
                    { label: 'Signal accuracy', value: '99.2% detection rate', pct: 99 },
                    { label: 'Time advantage', value: 'Avg 34 min head start', pct: 78 },
                    { label: 'User satisfaction', value: '4.9 / 5.0 rating', pct: 98 },
                  ].map((row) => (
                    <div key={row.label}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm text-[var(--color-text-secondary)]">{row.label}</span>
                        <span className="font-data text-xs text-[var(--color-text-muted)]">{row.value}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${row.pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                          className="h-full rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative glow */}
              <div className="absolute -inset-4 bg-[radial-gradient(ellipse_at_center,rgba(108,92,231,0.06)_0%,transparent_70%)] -z-10 rounded-3xl" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── STATS ─────────────────────────────────────────── */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[var(--color-bg-surface)]" />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative z-10 max-w-[1280px] mx-auto px-5"
        >
          <motion.div variants={fadeUp} className="text-center mb-14">
            <span className="font-data text-xs tracking-widest uppercase text-[var(--color-secondary)]">
              By the Numbers
            </span>
            <h2 className="mt-4 text-h2 font-display text-white">LORE in real-time</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                className="card-glass rounded-xl p-6 text-center group hover:border-[var(--color-primary)]/20 transition-colors"
              >
                <stat.icon className={`w-6 h-6 mx-auto mb-3 ${stat.color}`} />
                <div className="font-data text-2xl font-bold text-white">{stat.value}</div>
                <div className="mt-1.5 text-xs text-[var(--color-text-muted)] font-data leading-tight">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── TEAM ──────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#070708] via-[#0D0D2B] to-[#070708]" />

        <div className="relative z-10 max-w-[1280px] mx-auto px-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="font-data text-xs tracking-widest uppercase text-[var(--color-tertiary)]">
              The Team
            </span>
            <h2 className="mt-4 text-h2 font-display text-white">
              Minds behind the machine
            </h2>
            <p className="mt-4 text-[var(--color-text-secondary)] max-w-xl mx-auto">
              A team of quants, engineers, researchers, and designers united by one belief:
              intelligence should be a public good.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {team.map((member) => (
              <motion.div
                key={member.name}
                variants={fadeUp}
                className="card-glass rounded-2xl p-7 group hover:border-[var(--color-primary)]/20 transition-all duration-300"
              >
                {/* Avatar */}
                <div className="flex items-center gap-4 mb-5">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${member.color} flex items-center justify-center shrink-0`}
                  >
                    <span className="font-display font-bold text-white text-lg">{member.avatar}</span>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-white text-lg leading-tight">
                      {member.name}
                    </h3>
                    <p className="text-sm text-[var(--color-text-muted)] font-data">{member.role}</p>
                  </div>
                </div>

                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── VALUES ────────────────────────────────────────── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[var(--color-bg-surface)]" />

        <div className="relative z-10 max-w-[1280px] mx-auto px-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="font-data text-xs tracking-widest uppercase text-[var(--color-positive)]">
              Our Values
            </span>
            <h2 className="mt-4 text-h2 font-display text-white">
              Principles that shape every line of code
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {values.map((value) => (
              <motion.div
                key={value.title}
                variants={fadeUp}
                className="card-glass rounded-2xl p-8 group hover:border-[var(--color-primary)]/20 transition-all duration-300"
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0 group-hover:bg-[var(--color-primary)]/15 transition-colors">
                    <value.icon className="w-6 h-6 text-[var(--color-primary)]" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-white text-lg mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TIMELINE ──────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#070708] via-[#0D0D2B] to-[#1A0A2E]" />

        <div className="relative z-10 max-w-3xl mx-auto px-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="font-data text-xs tracking-widest uppercase text-[var(--color-primary)]">
              Our Journey
            </span>
            <h2 className="mt-4 text-h2 font-display text-white">From idea to infrastructure</h2>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-primary)] opacity-30" />

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-10"
            >
              {milestones.map((m, i) => (
                <motion.div key={m.year} variants={fadeUp} className="flex gap-6 items-start">
                  {/* Dot */}
                  <div className="relative z-10 w-10 h-10 rounded-full bg-[var(--color-bg-surface)] border-2 border-[var(--color-primary)]/40 flex items-center justify-center shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-primary)]" />
                  </div>

                  {/* Content */}
                  <div className="card-glass rounded-xl p-5 flex-1">
                    <span className="font-data text-sm font-bold text-[var(--color-primary)]">{m.year}</span>
                    <p className="mt-1.5 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      {m.event}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A0A2E] to-[#070708]" />
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(108,92,231,0.12)_0%,transparent_70%)]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-2xl mx-auto px-5 text-center"
        >
          <h2 className="text-h2 font-display text-white">
            Ready to see what others can&apos;t?
          </h2>
          <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
            Join 2,847+ traders who read the market before it reads itself.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="btn-primary text-base inline-flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              Enter the Lore
              <Zap size={18} />
            </Link>
            <Link
              href="/pricing"
              className="btn-secondary text-base inline-flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              View Pricing
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
