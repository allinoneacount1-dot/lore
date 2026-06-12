'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Shield,
  Database,
  Lock,
  Cookie,
  Share2,
  UserCheck,
  Clock,
  Baby,
  FileEdit,
  Mail,
  ChevronRight,
  Eye,
  Server,
  Trash2,
  Download,
  AlertCircle,
  CheckCircle,
  Globe,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/* ── animation variants ─────────────────────────────────── */

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

/* ── table of contents ──────────────────────────────────── */

const tocSections = [
  { id: 'information-collect', label: '1. Information We Collect', icon: Database },
  { id: 'how-we-use', label: '2. How We Use Data', icon: Eye },
  { id: 'storage-security', label: '3. Data Storage & Security', icon: Server },
  { id: 'cookies', label: '4. Cookies', icon: Cookie },
  { id: 'third-party', label: '5. Third-Party Sharing', icon: Share2 },
  { id: 'your-rights', label: '6. Your Rights (GDPR)', icon: UserCheck },
  { id: 'data-retention', label: '7. Data Retention', icon: Clock },
  { id: 'children-privacy', label: "8. Children's Privacy", icon: Baby },
  { id: 'changes', label: '9. Changes to Policy', icon: FileEdit },
  { id: 'contact', label: '10. Contact', icon: Mail },
];

/* ── data ───────────────────────────────────────────────── */

const dataCollected = [
  {
    category: 'Wallet & Account Data',
    icon: Shield,
    items: [
      'Wallet address(es) connected to the platform',
      'Account email address (if provided)',
      'User preferences and notification settings',
      'Subscription and billing information',
    ],
  },
  {
    category: 'On-Chain Data',
    icon: Database,
    items: [
      'Public blockchain transaction history',
      'Token holdings and DeFi positions',
      'Smart contract interactions',
      'Wallet labeling and watchlist data',
    ],
  },
  {
    category: 'Usage & Analytics',
    icon: Eye,
    items: [
      'Pages visited and features used within LORE',
      'Session duration and frequency of access',
      'Search queries and filter preferences',
      'Click patterns and interface interactions',
    ],
  },
  {
    category: 'Technical Data',
    icon: Server,
    items: [
      'Browser type, version, and operating system',
      'Device type and screen resolution',
      'IP address (anonymized where possible)',
      'Referring URL and exit pages',
    ],
  },
];

const thirdPartyServices = [
  {
    name: 'Google Analytics',
    purpose: 'Usage analytics and performance monitoring',
    dataShared: 'Anonymized IP, page views, session data',
    policyUrl: '#',
  },
  {
    name: 'Intercom',
    purpose: 'Customer support and in-app messaging',
    dataShared: 'Email, conversation history, user ID',
    policyUrl: '#',
  },
  {
    name: 'Stripe',
    purpose: 'Payment processing and subscription management',
    dataShared: 'Billing details, transaction records',
    policyUrl: '#',
  },
  {
    name: 'Alchemy / Infura',
    purpose: 'Blockchain node infrastructure',
    dataShared: 'RPC requests (wallet addresses, contract calls)',
    policyUrl: '#',
  },
  {
    name: 'Vercel',
    purpose: 'Hosting and edge infrastructure',
    dataShared: 'Aggregated usage logs, performance data',
    policyUrl: '#',
  },
];

const gdprRights = [
  {
    title: 'Right of Access',
    description: 'You have the right to request a copy of all personal data we hold about you, free of charge.',
    icon: Eye,
  },
  {
    title: 'Right to Rectification',
    description: 'You can request correction of inaccurate or incomplete personal data at any time.',
    icon: FileEdit,
  },
  {
    title: 'Right to Erasure',
    description: 'You may request deletion of your personal data, subject to legal retention requirements.',
    icon: Trash2,
  },
  {
    title: 'Right to Data Portability',
    description: 'You can request your data in a structured, machine-readable format for transfer to another service.',
    icon: Download,
  },
  {
    title: 'Right to Restrict Processing',
    description: 'You may request that we limit how we use your data in certain circumstances.',
    icon: AlertCircle,
  },
  {
    title: 'Right to Object',
    description: 'You can object to processing of your data for direct marketing or legitimate interest purposes.',
    icon: Shield,
  },
];

/* ── page ───────────────────────────────────────────────── */

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] overflow-x-hidden">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg-primary)] via-[#0D0D2B] to-[#1A0A2E]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(108,92,231,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,210,255,0.05)_0%,transparent_70%)] pointer-events-none" />

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="relative z-10 max-w-3xl mx-auto px-5 text-center"
        >
          {/* Breadcrumb */}
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-2 mb-8">
            <Link href="/" className="text-sm font-data text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">
              Home
            </Link>
            <span className="text-[var(--color-text-muted)]">/</span>
            <span className="text-sm font-data text-[var(--color-text-secondary)]">Privacy Policy</span>
          </motion.div>

          <motion.div variants={fadeUp}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 mb-6">
              <Shield size={14} className="text-[var(--color-primary)]" />
              <span className="text-xs font-data text-[var(--color-primary)] tracking-wide">LEGAL</span>
            </div>
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-h1 font-display text-white leading-tight">
            Privacy{' '}
            <span className="text-gradient">Policy</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl mx-auto">
            Your privacy matters to us. This policy explains what data we collect, how we use it,
            and the rights you have — clearly and without legalese.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-6 flex items-center justify-center gap-2">
            <Clock size={14} className="text-[var(--color-text-muted)]" />
            <span className="text-sm font-data text-[var(--color-text-muted)]">Last updated: June 12, 2026</span>
          </motion.div>
        </motion.div>
      </section>

      {/* ── TABLE OF CONTENTS ─────────────────────────────── */}
      <section className="py-12 relative">
        <div className="absolute inset-0 bg-[var(--color-bg-surface)]/60 pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative max-w-[1280px] mx-auto px-5 lg:px-20"
        >
          <div className="card-glass rounded-2xl p-6 md:p-8">
            <h2 className="font-display font-semibold text-white text-lg mb-5 flex items-center gap-2">
              <FileEdit size={20} className="text-[var(--color-primary)]" />
              Table of Contents
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {tocSections.map((section, index) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition-all group"
                >
                  <span className="w-6 h-6 rounded-md bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 flex items-center justify-center shrink-0 text-xs font-data text-[var(--color-primary)] group-hover:bg-[var(--color-primary)]/20 transition-colors">
                    {index + 1}
                  </span>
                  {section.label.replace(/^\d+\.\s*/, '')}
                  <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-[var(--color-primary)]" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── SECTION 1: INFORMATION WE COLLECT ──────────────── */}
      <section id="information-collect" className="py-20 relative">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-[1280px] mx-auto px-5 lg:px-20"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 flex items-center justify-center shrink-0">
              <Database size={22} className="text-[var(--color-primary)]" />
            </div>
            <div>
              <span className="font-data text-xs tracking-widest uppercase text-[var(--color-primary)]">Section 1</span>
              <h2 className="text-h2 font-display text-white">Information We Collect</h2>
            </div>
          </motion.div>

          <motion.p variants={fadeUp} className="text-[var(--color-text-secondary)] leading-relaxed mb-10 max-w-3xl">
            We collect information to provide, improve, and secure our services. The data we gather falls into four main categories.
            We are committed to collecting only what is necessary and being transparent about what we use.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {dataCollected.map((group) => {
              const Icon = group.icon;
              return (
                <motion.div
                  key={group.category}
                  variants={fadeUp}
                  className="card-glass rounded-2xl p-6"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 flex items-center justify-center">
                      <Icon size={18} className="text-[var(--color-primary)]" />
                    </div>
                    <h3 className="font-display font-semibold text-white">{group.category}</h3>
                  </div>
                  <ul className="space-y-3">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-[var(--color-text-secondary)]">
                        <CheckCircle size={14} className="text-[var(--color-primary)]/60 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>

          <motion.div variants={fadeUp} className="mt-8 card-glass rounded-xl p-5 border-l-4 border-l-[var(--color-secondary)]">
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              <strong className="text-white">Note on on-chain data:</strong> Blockchain data is inherently public.
              We do not control data that exists on public blockchains. Our policy covers how we process,
              store, and display that data within our platform.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ── SECTION 2: HOW WE USE DATA ─────────────────────── */}
      <section id="how-we-use" className="py-20 relative">
        <div className="absolute inset-0 bg-[var(--color-bg-surface)]/50 pointer-events-none" />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="relative max-w-[1280px] mx-auto px-5 lg:px-20"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-xl bg-[var(--color-secondary)]/10 border border-[var(--color-secondary)]/20 flex items-center justify-center shrink-0">
              <Eye size={22} className="text-[var(--color-secondary)]" />
            </div>
            <div>
              <span className="font-data text-xs tracking-widest uppercase text-[var(--color-secondary)]">Section 2</span>
              <h2 className="text-h2 font-display text-white">How We Use Data</h2>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Service Delivery',
                description:
                  'To provide our core features including on-chain analytics, whale tracking, narrative generation, and exploit detection. This includes processing your wallet addresses to display relevant intelligence.',
              },
              {
                title: 'Platform Improvement',
                description:
                  'To understand how users interact with LORE, identify pain points, and prioritize feature development. We analyze aggregated usage patterns to improve the user experience.',
              },
              {
                title: 'Security & Fraud Prevention',
                description:
                  'To detect, prevent, and address fraud, abuse, and security threats. This includes monitoring for unusual access patterns and protecting our infrastructure.',
              },
              {
                title: 'Communication',
                description:
                  'To send service-related notifications, security alerts, product updates, and — with your consent — marketing communications. You can opt out of marketing emails at any time.',
              },
              {
                title: 'Legal Compliance',
                description:
                  'To comply with applicable laws, regulations, and legal processes. This includes responding to lawful requests from public authorities and maintaining records as required.',
              },
              {
                title: 'Research & Development',
                description:
                  'To train and improve our AI models for narrative generation and market intelligence. We use anonymized and aggregated data only — never personal data linked to your identity.',
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="card-glass rounded-2xl p-6 group hover:border-[var(--color-primary)]/20 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <CheckCircle size={18} className="text-[var(--color-secondary)]/70 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-display font-semibold text-white mb-2 group-hover:text-[var(--color-secondary)] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── SECTION 3: DATA STORAGE & SECURITY ─────────────── */}
      <section id="storage-security" className="py-20 relative">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-[1280px] mx-auto px-5 lg:px-20"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-xl bg-[var(--color-positive)]/10 border border-[var(--color-positive)]/20 flex items-center justify-center shrink-0">
              <Server size={22} className="text-[var(--color-positive)]" />
            </div>
            <div>
              <span className="font-data text-xs tracking-widest uppercase text-[var(--color-positive)]">Section 3</span>
              <h2 className="text-h2 font-display text-white">Data Storage & Security</h2>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="card-glass rounded-2xl p-8 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h3 className="font-display font-semibold text-white text-lg mb-4 flex items-center gap-2">
                  <Lock size={18} className="text-[var(--color-positive)]" />
                  Security Measures
                </h3>
                <ul className="space-y-3">
                  {[
                    'AES-256 encryption for data at rest',
                    'TLS 1.3 encryption for data in transit',
                    'Regular security audits and penetration testing',
                    'Multi-factor authentication for internal access',
                    'Role-based access control (RBAC)',
                    'Automated vulnerability scanning',
                    'SOC 2 Type II compliance (in progress)',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-[var(--color-text-secondary)]">
                      <CheckCircle size={14} className="text-[var(--color-positive)]/70 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-display font-semibold text-white text-lg mb-4 flex items-center gap-2">
                  <Server size={18} className="text-[var(--color-secondary)]" />
                  Infrastructure
                </h3>
                <ul className="space-y-3">
                  {[
                    'Hosted on AWS with data centers in Frankfurt (EU)',
                    'Daily automated backups with 30-day retention',
                    '99.9% uptime SLA',
                    'Geographic redundancy for critical systems',
                    'Docker-based containerized deployment',
                    'Infrastructure as code (IaC) with version control',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-[var(--color-text-secondary)]">
                      <CheckCircle size={14} className="text-[var(--color-secondary)]/70 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5">
              <div className="flex items-start gap-3">
                <AlertCircle size={18} className="text-[var(--color-warning)] mt-0.5 shrink-0" />
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  <strong className="text-white">No system is 100% secure.</strong> While we implement industry-leading
                  security practices, we cannot guarantee absolute security. In the event of a data breach that affects
                  your personal data, we will notify you within 72 hours in accordance with applicable regulations.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── SECTION 4: COOKIES ────────────────────────────── */}
      <section id="cookies" className="py-20 relative">
        <div className="absolute inset-0 bg-[var(--color-bg-surface)]/50 pointer-events-none" />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="relative max-w-[1280px] mx-auto px-5 lg:px-20"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-xl bg-[var(--color-tertiary)]/10 border border-[var(--color-tertiary)]/20 flex items-center justify-center shrink-0">
              <Cookie size={22} className="text-[var(--color-tertiary)]" />
            </div>
            <div>
              <span className="font-data text-xs tracking-widest uppercase text-[var(--color-tertiary)]">Section 4</span>
              <h2 className="text-h2 font-display text-white">Cookies</h2>
            </div>
          </motion.div>

          <motion.p variants={fadeUp} className="text-[var(--color-text-secondary)] leading-relaxed mb-8 max-w-3xl">
            LORE uses cookies and similar tracking technologies to enhance your experience, analyze usage, and deliver
            personalized content. Here&apos;s how we use them:
          </motion.p>

          <div className="space-y-4">
            {[
              {
                category: 'Essential Cookies',
                required: true,
                description:
                  'Required for core platform functionality including authentication, session management, and security. These cannot be disabled without affecting your ability to use LORE.',
                examples: ['auth_session', 'csrf_token', 'wallet_connection'],
              },
              {
                category: 'Analytics Cookies',
                required: false,
                description:
                  'Help us understand how visitors use LORE by collecting anonymized data on page views, session duration, and feature usage. Used to improve the platform.',
                examples: ['_ga', '_gid', '_gat'],
              },
              {
                category: 'Functional Cookies',
                required: false,
                description:
                  'Remember your preferences and settings such as theme, language, and notification preferences to provide a personalized experience.',
                examples: ['lore_prefs', 'theme', 'last_visited'],
              },
              {
                category: 'Marketing Cookies',
                required: false,
                description:
                  'Used to track visitors across websites to display relevant advertisements. These are only placed with your explicit consent.',
                examples: ['_fbp', 'ads_prefs'],
              },
            ].map((cookie) => (
              <motion.div
                key={cookie.category}
                variants={fadeUp}
                className="card-glass rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Cookie size={18} className="text-[var(--color-tertiary)]" />
                    <h3 className="font-display font-semibold text-white">{cookie.category}</h3>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-data tracking-wider uppercase ${
                      cookie.required
                        ? 'bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] border border-[var(--color-secondary)]/20'
                        : 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20'
                    }`}
                  >
                    {cookie.required ? 'Required' : 'Optional'}
                  </span>
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-3">
                  {cookie.description}
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-[var(--color-text-muted)] font-data">Examples:</span>
                  {cookie.examples.map((example) => (
                    <code
                      key={example}
                      className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-data text-[var(--color-text-secondary)] border border-white/5"
                    >
                      {example}
                    </code>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── SECTION 5: THIRD-PARTY SHARING ─────────────────── */}
      <section id="third-party" className="py-20 relative">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-[1280px] mx-auto px-5 lg:px-20"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-xl bg-[var(--color-negative)]/10 border border-[var(--color-negative)]/20 flex items-center justify-center shrink-0">
              <Share2 size={22} className="text-[var(--color-negative)]" />
            </div>
            <div>
              <span className="font-data text-xs tracking-widest uppercase text-[var(--color-negative)]">Section 5</span>
              <h2 className="text-h2 font-display text-white">Third-Party Sharing</h2>
            </div>
          </motion.div>

          <motion.p variants={fadeUp} className="text-[var(--color-text-secondary)] leading-relaxed mb-8 max-w-3xl">
            We do not sell your personal data. We share information with third parties only when necessary
            to operate our platform, comply with legal obligations, or with your explicit consent.
          </motion.p>

          <div className="space-y-4">
            {thirdPartyServices.map((service) => (
              <motion.div
                key={service.name}
                variants={fadeUp}
                className="card-glass rounded-xl p-6 group hover:border-[var(--color-primary)]/20 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-display font-semibold text-white mb-1">{service.name}</h3>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-2">{service.purpose}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[var(--color-text-muted)] font-data">Data shared:</span>
                      <span className="text-xs font-data text-[var(--text-secondary)] px-2 py-0.5 rounded bg-white/5 border border-white/5">
                        {service.dataShared}
                      </span>
                    </div>
                  </div>
                  <a
                    href={service.policyUrl}
                    className="text-xs text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors font-data shrink-0"
                  >
                    Privacy Policy →
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} className="mt-8 card-glass rounded-xl p-5 border-l-4 border-l-[var(--color-warning)]">
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              <strong className="text-white">Legal disclosure:</strong> We may disclose your information if required
              by law, regulation, or legal process, or to protect the rights, property, or safety of LORE,
              our users, or the public.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ── SECTION 6: YOUR RIGHTS (GDPR) ──────────────────── */}
      <section id="your-rights" className="py-20 relative">
        <div className="absolute inset-0 bg-[var(--color-bg-surface)]/50 pointer-events-none" />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="relative max-w-[1280px] mx-auto px-5 lg:px-20"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-xl bg-[var(--color-info)]/10 border border-[var(--color-info)]/20 flex items-center justify-center shrink-0">
              <UserCheck size={22} className="text-[var(--color-info)]" />
            </div>
            <div>
              <span className="font-data text-xs tracking-widest uppercase text-[var(--color-info)]">Section 6</span>
              <h2 className="text-h2 font-display text-white">Your Rights Under GDPR</h2>
            </div>
          </motion.div>

          <motion.p variants={fadeUp} className="text-[var(--color-text-secondary)] leading-relaxed mb-8 max-w-3xl">
            If you are located in the European Economic Area (EA) or United Kingdom, you have specific rights
            under the General Data Protection Regulation (GDPR) and UK GDPR:
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {gdprRights.map((right) => {
              const Icon = right.icon;
              return (
                <motion.div
                  key={right.title}
                  variants={fadeUp}
                  className="card-glass rounded-2xl p-6 group hover:border-[var(--color-info)]/20 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-info)]/10 border border-[var(--color-info)]/20 flex items-center justify-center mb-4">
                    <Icon size={18} className="text-[var(--color-info)]" />
                  </div>
                  <h3 className="font-display font-semibold text-white mb-2 group-hover:text-[var(--color-info)] transition-colors">
                    {right.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {right.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <motion.div variants={fadeUp} className="mt-8 card-glass rounded-xl p-6">
            <h3 className="font-display font-semibold text-white mb-3">How to Exercise Your Rights</h3>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4">
              To exercise any of these rights, contact us at{' '}
              <a href="mailto:privacy@loreintelligence.com" className="text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors">
                privacy@loreintelligence.com
              </a>{' '}
              or use the contact form below. We will respond to your request within 30 days.
            </p>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              If you believe your data protection rights have been violated, you have the right to lodge a complaint
              with your local Data Protection Authority (DPA) or the lead supervisory authority in Switzerland.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ── SECTION 7: DATA RETENTION ──────────────────────── */}
      <section id="data-retention" className="py-20 relative">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-[1280px] mx-auto px-5 lg:px-20"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 flex items-center justify-center shrink-0">
              <Clock size={22} className="text-[var(--color-primary)]" />
            </div>
            <div>
              <span className="font-data text-xs tracking-widest uppercase text-[var(--color-primary)]">Section 7</span>
              <h2 className="text-h2 font-display text-white">Data Retention</h2>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="card-glass rounded-2xl p-8 md:p-10">
            <p className="text-[var(--color-text-secondary)] leading-relaxed mb-8">
              We retain personal data only for as long as necessary to fulfill the purposes outlined in this policy,
              unless a longer retention period is required by law.
            </p>

            <div className="space-y-5">
              {[
                { type: 'Account data', duration: 'Until account deletion + 30-day grace period', icon: UserCheck },
                { type: 'Transaction records', duration: '7 years (legal requirement for financial data)', icon: FileEdit },
                { type: 'On-chain analytics data', duration: 'Indefinitely (public blockchain data)', icon: Database },
                { type: 'Marketing preferences', duration: 'Until you withdraw consent', icon: Mail },
                { type: 'Support conversations', duration: '3 years from last interaction', icon: AlertCircle },
                { type: 'Server access logs', duration: '90 days', icon: Server },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.type} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                    <div className="flex items-center gap-3">
                      <Icon size={16} className="text-[var(--color-text-muted)]" />
                      <span className="text-sm text-[var(--color-text-secondary)]">{item.type}</span>
                    </div>
                    <span className="text-sm font-data text-[var(--color-text-muted)]">{item.duration}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── SECTION 8: CHILDREN'S PRIVACY ──────────────────── */}
      <section id="children-privacy" className="py-20 relative">
        <div className="absolute inset-0 bg-[var(--color-bg-surface)]/50 pointer-events-none" />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="relative max-w-[1280px] mx-auto px-5 lg:px-20"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-xl bg-[var(--color-tertiary)]/10 border border-[var(--color-tertiary)]/20 flex items-center justify-center shrink-0">
              <Baby size={22} className="text-[var(--color-tertiary)]" />
            </div>
            <div>
              <span className="font-data text-xs tracking-widest uppercase text-[var(--color-tertiary)]">Section 8</span>
              <h2 className="text-h2 font-display text-white">Children&apos;s Privacy</h2>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="max-w-3xl">
            <div className="card-glass rounded-2xl p-8">
              <p className="text-[var(--color-text-secondary)] leading-relaxed mb-5">
                LORE is not intended for children under the age of 16. We do not knowingly collect personal
                information from children under 16. If you are a parent or guardian and believe your child
                has provided us with personal data, please contact us immediately.
              </p>
              <p className="text-[var(--color-text-secondary)] leading-relaxed mb-5">
                If we become aware that we have collected personal data from a child under 16 without verification
                of parental consent, we will take steps to delete that information from our servers promptly.
              </p>
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[var(--color-warning)]/5 border border-[var(--color-warning)]/20">
                <AlertCircle size={18} className="text-[var(--color-warning)] shrink-0" />
                <p className="text-sm text-[var(--color-text-secondary)]">
                  <strong className="text-white">Age verification:</strong> By using LORE, you confirm that you
                  are at least 16 years old or have obtained parental consent.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── SECTION 9: CHANGES TO POLICY ───────────────────── */}
      <section id="changes" className="py-20 relative">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-[1280px] mx-auto px-5 lg:px-20"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-xl bg-[var(--color-secondary)]/10 border border-[var(--color-secondary)]/20 flex items-center justify-center shrink-0">
              <FileEdit size={22} className="text-[var(--color-secondary)]" />
            </div>
            <div>
              <span className="font-data text-xs tracking-widest uppercase text-[var(--color-secondary)]">Section 9</span>
              <h2 className="text-h2 font-display text-white">Changes to This Policy</h2>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="max-w-3xl">
            <div className="card-glass rounded-2xl p-8">
              <p className="text-[var(--color-text-secondary)] leading-relaxed mb-5">
                We may update this Privacy Policy from time to time to reflect changes in our practices,
                technologies, or legal requirements. When we make material changes, we will:
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  'Update the "Last Updated" date at the top of this page',
                  'Display a prominent notice on our platform for at least 30 days',
                  'Send a notification to registered users via email (for material changes)',
                  'Where required, obtain renewed consent for new processing activities',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-[var(--color-text-secondary)]">
                    <CheckCircle size={14} className="text-[var(--color-secondary)]/70 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                We encourage you to review this Privacy Policy periodically. Your continued use of LORE
                after changes constitutes your acknowledgment of the updated policy.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── SECTION 10: CONTACT ────────────────────────────── */}
      <section id="contact" className="py-20 relative">
        <div className="absolute inset-0 bg-[var(--color-bg-surface)]/50 pointer-events-none" />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="relative max-w-[1280px] mx-auto px-5 lg:px-20"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-xl bg-[var(--color-positive)]/10 border border-[var(--color-positive)]/20 flex items-center justify-center shrink-0">
              <Mail size={22} className="text-[var(--color-positive)]" />
            </div>
            <div>
              <span className="font-data text-xs tracking-widest uppercase text-[var(--color-positive)]">Section 10</span>
              <h2 className="text-h2 font-display text-white">Contact Us</h2>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="max-w-2xl mx-auto">
            <div className="card-glass rounded-2xl p-8 md:p-12 text-center">
              <div className="w-14 h-14 rounded-2xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 flex items-center justify-center mx-auto mb-6">
                <Mail size={24} className="text-[var(--color-primary)]" />
              </div>

              <h3 className="font-display font-semibold text-white text-xl mb-4">
                Questions About Privacy?
              </h3>

              <p className="text-[var(--color-text-secondary)] leading-relaxed mb-8 max-w-lg mx-auto">
                If you have any questions about this Privacy Policy, wish to exercise your data rights,
                or have concerns about how we handle your data, please reach out through any of the following channels:
              </p>

              <div className="space-y-4">
                <a
                  href="mailto:privacy@loreintelligence.com"
                  className="btn-primary inline-flex items-center gap-2 text-sm"
                >
                  <Mail size={16} />
                  privacy@loreintelligence.com
                </a>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 max-w-lg mx-auto">
                  <div className="card-glass rounded-xl p-4 text-center">
                    <Globe size={18} className="text-[var(--color-text-muted)] mx-auto mb-2" />
                    <span className="text-xs text-[var(--color-text-muted)] block mb-1">Mailing Address</span>
                    <span className="text-sm text-[var(--color-text-secondary)]">
                      Lore Intelligence AG<br />
                      Bahnhofstrasse 42<br />
                      8001 Zurich, Switzerland
                    </span>
                  </div>

                  <div className="card-glass rounded-xl p-4 text-center">
                    <Clock size={18} className="text-[var(--color-text-muted)] mx-auto mb-2" />
                    <span className="text-xs text-[var(--color-text-muted)] block mb-1">Response Time</span>
                    <span className="text-sm text-[var(--color-text-secondary)]">
                      We aim to respond<br />
                      within 30 days
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5">
                <p className="text-xs text-[var(--color-text-muted)] font-data">
                  Data Protection Officer: Marco Keller
                </p>
                <p className="text-xs text-[var(--color-text-muted)] font-data mt-1">
                  For GDPR-related inquiries, you may also contact your local Data Protection Authority.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <Footer />
    </main>
  );
}
