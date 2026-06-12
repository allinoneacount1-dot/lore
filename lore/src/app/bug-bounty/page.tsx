'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Shield,
  Bug,
  DollarSign,
  Target,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Send,
  Trophy,
  ChevronDown,
  ChevronUp,
  Eye,
  Lock,
  Zap,
  Globe,
  FileText,
  Users,
  ArrowRight,
  ExternalLink,
  Award,
  Clock,
  MessageSquare,
} from 'lucide-react';

/* ─── Data ─── */

const severityLevels = [
  {
    severity: 'Critical',
    icon: Zap,
    color: 'var(--color-negative)',
    bg: 'rgba(255,82,82,0.1)',
    border: 'rgba(255,82,82,0.2)',
    reward: '$10,000 – $50,000',
    examples: [
      'Remote code execution on production servers',
      'Unauthorized access to user funds or wallets',
      'SQL injection / database compromise',
      'Authentication bypass affecting all users',
    ],
  },
  {
    severity: 'High',
    icon: AlertTriangle,
    color: 'var(--color-warning)',
    bg: 'rgba(255,217,61,0.1)',
    border: 'rgba(255,217,61,0.2)',
    reward: '$5,000 – $10,000',
    examples: [
      'Privilege escalation (user → admin)',
      'Sensitive data exposure (PII, API keys)',
      'Stored XSS in core application flows',
      'Bypass of security controls (2FA, rate limits)',
    ],
  },
  {
    severity: 'Medium',
    icon: Eye,
    color: 'var(--color-secondary)',
    bg: 'rgba(0,210,255,0.1)',
    border: 'rgba(0,210,255,0.2)',
    reward: '$1,000 – $5,000',
    examples: [
      'Reflected XSS in non-critical endpoints',
      'CSRF on state-changing operations',
      'IDOR leading to limited data access',
      'Insecure direct object references',
    ],
  },
  {
    severity: 'Low',
    icon: Bug,
    color: 'var(--color-text-muted)',
    bg: 'rgba(90,90,114,0.1)',
    border: 'rgba(90,90,114,0.2)',
    reward: '$500 – $1,000',
    examples: [
      'Missing security headers',
      'Verbose error messages with stack traces',
      'Clickjacking on non-sensitive pages',
      'Minor information disclosure',
    ],
  },
];

const inScopeAssets = [
  { name: 'lore.ai (main web app)', type: 'Web' },
  { name: 'api.lore.ai (REST & GraphQL)', type: 'API' },
  { name: 'app.lore.ai (dashboard)', type: 'Web' },
  { name: 'docs.lore.ai (documentation)', type: 'Web' },
  { name: 'LORE smart contracts (Solana/Ethereum)', type: 'Smart Contract' },
  { name: 'LORE token contract', type: 'Smart Contract' },
  { name: 'LORE staking & governance contracts', type: 'Smart Contract' },
  { name: 'LORE mobile application (iOS/Android)', type: 'Mobile' },
];

const outOfScopeAssets = [
  'Third-party services (Discord, Twitter, etc.)',
  'Social engineering attacks against LORE staff',
  'Physical attacks on data centers',
  'Denial of Service (DoS/DDoS) attacks',
  'Spam or abuse of the support ticket system',
  'Vulnerabilities in third-party libraries (report upstream)',
  'Issues already reported by another researcher (duplicate)',
  'Testing on production without prior approval',
];

const submissionSteps = [
  {
    step: 1,
    icon: Target,
    title: 'Identify a Vulnerability',
    description:
      'Discover a security vulnerability within our in-scope assets. Ensure it has not been previously reported.',
  },
  {
    step: 2,
    icon: FileText,
    title: 'Prepare Your Report',
    description:
      'Document the vulnerability with clear steps to reproduce, proof-of-concept, and potential impact assessment.',
  },
  {
    step: 3,
    icon: Send,
    title: 'Submit via Secure Channel',
    description:
      'Send your report to security@lore.ai with PGP encryption. Include all relevant details and attachments.',
  },
  {
    step: 4,
    icon: Clock,
    title: 'Triage & Response',
    description:
      'Our security team will acknowledge within 24 hours and provide a detailed response within 72 hours.',
  },
  {
    step: 5,
    icon: Award,
    title: 'Reward & Recognition',
    description:
      'Once validated, you\'ll receive your bounty reward and be added to our Hall of Fame (if desired).',
  },
];

const rules = [
  'Good faith participation — do not exploit vulnerabilities beyond what is necessary to demonstrate impact.',
  'Do not access, modify, or delete data belonging to other users.',
  'Do not publicly disclose vulnerabilities before they are resolved and you have written permission.',
  'Do not perform any action that could degrade service availability (DoS, resource exhaustion).',
  'Testing must be conducted only on in-scope assets listed above.',
  'Automated scanning tools require prior written approval from the security team.',
  'Multiple vulnerabilities stemming from the same root cause will be treated as a single report.',
  'LORE reserves the right to modify bounty amounts based on actual impact and report quality.',
  'All bounty payments are subject to applicable laws and KYC/AML requirements.',
  'Reports must be submitted in English with sufficient detail for reproduction.',
];

const hallOfFame = [
  {
    name: '0xCipher',
    avatar: 'C',
    findings: 12,
    totalEarned: '$87,500',
    rank: 'Platinum',
    color: 'var(--color-secondary)',
  },
  {
    name: 'NullPointer',
    avatar: 'N',
    findings: 8,
    totalEarned: '$52,000',
    rank: 'Gold',
    color: 'var(--color-tertiary)',
  },
  {
    name: 'ByteBreaker',
    avatar: 'B',
    findings: 6,
    totalEarned: '$34,000',
    rank: 'Gold',
    color: 'var(--color-tertiary)',
  },
  {
    name: 'ShadowAudit',
    avatar: 'S',
    findings: 4,
    totalEarned: '$21,500',
    rank: 'Silver',
    color: 'var(--color-text-secondary)',
  },
  {
    name: 'ChainSentinel',
    avatar: 'CS',
    findings: 3,
    totalEarned: '$15,000',
    rank: 'Silver',
    color: 'var(--color-text-secondary)',
  },
  {
    name: 'VulnHunter',
    avatar: 'V',
    findings: 2,
    totalEarned: '$8,000',
    rank: 'Bronze',
    color: 'var(--color-primary)',
  },
];

const faqs = [
  {
    q: 'How are bounty amounts determined?',
    a: 'Bounty amounts are based on the severity of the vulnerability, its potential impact on users and the platform, and the quality of the report. Critical vulnerabilities affecting user funds receive the highest rewards.',
  },
  {
    q: 'Can I test on the mainnet contracts?',
    a: 'Yes, but only for read-only analysis. Any state-changing transactions that could affect real user funds require prior coordination with our team. We provide a dedicated testnet environment for destructive testing.',
  },
  {
    q: 'What happens if someone reports the same vulnerability first?',
    a: 'The first complete, valid report receives the bounty. We encourage prompt submission. If you discover a duplicate, we may still offer a smaller finder\'s fee for independent discovery.',
  },
  {
    q: 'How long does it take to receive payment?',
    a: 'After a vulnerability is validated and resolved, payments are processed within 14 business days. We support payment in USDC, USDT, or equivalent stablecoins.',
  },
  {
    q: 'Do I need to provide KYC information?',
    a: 'For bounties above $1,000, we require basic KYC verification to comply with applicable regulations. This is handled securely through our compliance partner.',
  },
  {
    q: 'Can I remain anonymous?',
    a: 'Yes, you can participate under a pseudonym. However, for payment processing above certain thresholds, we may need to verify your identity confidentially through our legal counsel.',
  },
  {
    q: 'What if I accidentally access user data during testing?',
    a: 'If you access data beyond what is necessary to demonstrate the vulnerability, stop immediately and report it. Good faith accidental access will not result in penalties, but deliberate exploitation will disqualify you.',
  },
];

/* ─── Animation variants ─── */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

/* ─── Section wrapper ─── */

function Section({
  id,
  children,
  className = '',
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      id={id}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className={`py-20 lg:py-28 ${className}`}
    >
      <div className="max-w-[1280px] mx-auto px-5 lg:px-20">{children}</div>
    </motion.section>
  );
}

function SectionTitle({ badge, title, subtitle }: { badge?: string; title: string; subtitle?: string }) {
  return (
    <motion.div variants={itemVariants} className="text-center mb-16">
      {badge && (
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-data tracking-widest uppercase bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20 mb-6">
          <Shield size={12} />
          {badge}
        </span>
      )}
      <h2 className="text-h2 font-display text-white mb-4">{title}</h2>
      {subtitle && <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">{subtitle}</p>}
    </motion.div>
  );
}

/* ─── FAQ Item ─── */

function FAQItem({ faq, index }: { faq: { q: string; a: string }; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      variants={itemVariants}
      className="border border-white/5 rounded-2xl overflow-hidden bg-[var(--color-bg-surface)] hover:border-white/10 transition-colors"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <span className="font-display font-semibold text-white pr-4">{faq.q}</span>
        {open ? (
          <ChevronUp size={20} className="text-[var(--color-primary)] shrink-0" />
        ) : (
          <ChevronDown size={20} className="text-[var(--color-text-muted)] shrink-0" />
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-[var(--color-text-secondary)] leading-relaxed border-t border-white/5 pt-4">
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Main Page ─── */

export default function BugBountyPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] overflow-x-hidden">
      <Navbar />

      {/* ─── Hero ─── */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 relative">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[var(--color-primary)]/5 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-[1280px] mx-auto px-5 lg:px-20 text-center relative z-10"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-data tracking-widest uppercase bg-[var(--color-negative)]/10 text-[var(--color-negative)] border border-[var(--color-negative)]/20">
              <Bug size={12} />
              Responsible Disclosure
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-h1 font-display text-white mb-6"
          >
            Bug Bounty{' '}
            <span className="text-gradient">Program</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Help us keep LORE secure. We reward researchers who responsibly disclose
            vulnerabilities in our platform, smart contracts, and infrastructure.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-[var(--color-bg-surface)] border border-white/10">
              <DollarSign size={20} className="text-[var(--color-positive)]" />
              <span className="font-data text-sm text-[var(--color-text-secondary)]">Reward Range</span>
              <span className="font-display font-bold text-white text-lg">$500 – $50,000</span>
            </div>
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-[var(--color-bg-surface)] border border-white/10">
              <Users size={20} className="text-[var(--color-secondary)]" />
              <span className="font-data text-sm text-[var(--color-text-secondary)]">Researchers</span>
              <span className="font-display font-bold text-white text-lg">120+</span>
            </div>
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-[var(--color-bg-surface)] border border-white/10">
              <Trophy size={20} className="text-[var(--color-tertiary)]" />
              <span className="font-data text-sm text-[var(--color-text-secondary)]">Paid Out</span>
              <span className="font-display font-bold text-white text-lg">$2.4M+</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── Scope ─── */}
      <Section id="scope">
        <SectionTitle
          badge="Scope"
          title="What's In & Out of Scope"
          subtitle="Focus your efforts on the assets below. Testing outside these boundaries may disqualify your submission."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* In Scope */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-[var(--color-positive)]/20 bg-[var(--color-bg-surface)] p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[var(--color-positive)]/10 flex items-center justify-center">
                <CheckCircle size={20} className="text-[var(--color-positive)]" />
              </div>
              <h3 className="font-display font-semibold text-white text-lg">In Scope</h3>
            </div>
            <div className="space-y-3">
              {inScopeAssets.map((asset) => (
                <div
                  key={asset.name}
                  className="flex items-center justify-between p-3 rounded-xl bg-[var(--color-bg-card)] border border-white/5"
                >
                  <span className="text-sm text-[var(--color-text-primary)]">{asset.name}</span>
                  <span className="text-xs font-data px-2 py-0.5 rounded-full bg-[var(--color-positive)]/10 text-[var(--color-positive)] border border-[var(--color-positive)]/20">
                    {asset.type}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Out of Scope */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-[var(--color-negative)]/20 bg-[var(--color-bg-surface)] p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[var(--color-negative)]/10 flex items-center justify-center">
                <XCircle size={20} className="text-[var(--color-negative)]" />
              </div>
              <h3 className="font-display font-semibold text-white text-lg">Out of Scope</h3>
            </div>
            <div className="space-y-3">
              {outOfScopeAssets.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 p-3 rounded-xl bg-[var(--color-bg-card)] border border-white/5"
                >
                  <XCircle size={14} className="text-[var(--color-negative)] mt-0.5 shrink-0" />
                  <span className="text-sm text-[var(--color-text-secondary)]">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ─── Severity Levels ─── */}
      <Section id="severity">
        <SectionTitle
          badge="Severity"
          title="Reward Tiers"
          subtitle="Bounties are awarded based on the severity and impact of the discovered vulnerability."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {severityLevels.map((level) => {
            const Icon = level.icon;
            return (
              <motion.div
                key={level.severity}
                variants={itemVariants}
                className="rounded-2xl border bg-[var(--color-bg-surface)] p-8 hover:border-opacity-40 transition-all"
                style={{ borderColor: level.border }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: level.bg }}
                    >
                      <Icon size={20} style={{ color: level.color }} />
                    </div>
                    <h3 className="font-display font-semibold text-white text-lg">{level.severity}</h3>
                  </div>
                  <span
                    className="font-data font-bold text-lg"
                    style={{ color: level.color }}
                  >
                    {level.reward}
                  </span>
                </div>
                <ul className="space-y-2.5">
                  {level.examples.map((ex) => (
                    <li key={ex} className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
                      <ArrowRight size={12} className="mt-1 shrink-0" style={{ color: level.color }} />
                      {ex}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* ─── How to Submit ─── */}
      <Section id="submit">
        <SectionTitle
          badge="Submission"
          title="How to Report a Vulnerability"
          subtitle="Follow these steps to submit your finding and receive your reward."
        />

        <div className="relative">
          {/* Vertical line connector */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-tertiary)] hidden md:block" />

          <div className="space-y-8">
            {submissionSteps.map((step) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  variants={itemVariants}
                  className="flex gap-6 items-start"
                >
                  <div className="relative z-10 w-12 h-12 rounded-2xl bg-[var(--color-bg-surface)] border border-[var(--color-primary)]/30 flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-[var(--color-primary)]" />
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-data text-[var(--color-primary)]">STEP {step.step}</span>
                      <h3 className="font-display font-semibold text-white text-lg">{step.title}</h3>
                    </div>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div variants={itemVariants} className="mt-12 text-center">
          <a
            href="mailto:security@lore.ai"
            className="btn-primary inline-flex items-center gap-2"
          >
            <Send size={16} />
            Submit a Vulnerability
          </a>
          <p className="text-xs text-[var(--color-text-muted)] mt-3 font-data">
            Or email security@lore.ai directly
          </p>
        </motion.div>
      </Section>

      {/* ─── Rules of Engagement ─── */}
      <Section id="rules">
        <SectionTitle
          badge="Rules"
          title="Rules of Engagement"
          subtitle="By participating in our bug bounty program, you agree to the following rules."
        />

        <motion.div variants={itemVariants} className="rounded-2xl border border-white/5 bg-[var(--color-bg-surface)] p-8 lg:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rules.map((rule, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-[var(--color-bg-card)] border border-white/5">
                <span className="text-xs font-data text-[var(--color-primary)] mt-0.5 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{rule}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* ─── Hall of Fame ─── */}
      <Section id="hall-of-fame">
        <SectionTitle
          badge="Hall of Fame"
          title="Top Researchers"
          subtitle="Recognizing the security researchers who have helped make LORE more secure."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hallOfFame.map((researcher) => (
            <motion.div
              key={researcher.name}
              variants={itemVariants}
              className="rounded-2xl border border-white/5 bg-[var(--color-bg-surface)] p-6 hover:border-white/10 transition-all group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-display font-bold text-lg"
                  style={{ backgroundColor: `${researcher.color}15`, color: researcher.color }}
                >
                  {researcher.avatar}
                </div>
                <div>
                  <h4 className="font-display font-semibold text-white group-hover:text-[var(--color-primary)] transition-colors">
                    {researcher.name}
                  </h4>
                  <span
                    className="text-xs font-data px-2 py-0.5 rounded-full border"
                    style={{
                      color: researcher.color,
                      borderColor: `${researcher.color}30`,
                      backgroundColor: `${researcher.color}10`,
                    }}
                  >
                    {researcher.rank}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                  <Bug size={14} />
                  <span>{researcher.findings} findings</span>
                </div>
                <div className="flex items-center gap-2 text-[var(--color-positive)] font-data font-semibold">
                  <DollarSign size={14} />
                  <span>{researcher.totalEarned}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ─── FAQ ─── */}
      <Section id="faq">
        <SectionTitle
          badge="FAQ"
          title="Frequently Asked Questions"
          subtitle="Common questions about our bug bounty program."
        />

        <motion.div variants={itemVariants} className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </motion.div>
      </Section>

      {/* ─── Final CTA ─── */}
      <section className="py-20 lg:py-28 relative">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[var(--color-primary)]/5 rounded-full blur-[100px] pointer-events-none" />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-[1280px] mx-auto px-5 lg:px-20 text-center relative z-10"
        >
          <motion.div
            variants={itemVariants}
            className="rounded-3xl border border-white/10 bg-[var(--color-bg-surface)] p-12 lg:p-16 card-glass"
          >
            <Lock size={40} className="text-[var(--color-primary)] mx-auto mb-6" />
            <h2 className="text-h2 font-display text-white mb-4">
              Found a Vulnerability?
            </h2>
            <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto mb-8 leading-relaxed">
              We appreciate your help in keeping LORE secure. Submit your finding today
              and join our community of security researchers.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:security@lore.ai"
                className="btn-primary inline-flex items-center gap-2"
              >
                <Send size={16} />
                Submit Report
              </a>
              <Link
                href="/docs/security"
                className="btn-secondary inline-flex items-center gap-2"
              >
                <ExternalLink size={16} />
                Security Docs
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
