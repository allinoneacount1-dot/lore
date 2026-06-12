'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Shield,
  Lock,
  Eye,
  Bug,
  KeyRound,
  Snowflake,
  Activity,
  FileCheck,
  BadgeCheck,
  Scale,
  AlertTriangle,
  Clock,
  CheckCircle2,
  ArrowRight,
  Mail,
  Fingerprint,
  UserCheck,
  MonitorSmartphone,
  RefreshCw,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/* ── animation variants ─────────────────────────────────── */

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
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

const securityMeasures = [
  {
    icon: Lock,
    title: 'End-to-End Encryption',
    description:
      'All data in transit and at rest is encrypted using AES-256. API keys and wallet credentials are stored in hardware security modules (HSMs) with zero-knowledge architecture.',
    color: 'text-[var(--color-primary)]',
    bg: 'bg-[var(--color-primary)]/10',
    border: 'border-[var(--color-primary)]/20',
  },
  {
    icon: FileCheck,
    title: 'Continuous Security Audits',
    description:
      'Quarterly penetration tests by independent firms (Trail of Bits, OpenZeppelin). Smart contracts formally verified. Full audit reports published to our transparency portal.',
    color: 'text-[var(--color-secondary)]',
    bg: 'bg-[var(--color-secondary)]/10',
    border: 'border-[var(--color-secondary)]/20',
  },
  {
    icon: Bug,
    title: 'Bug Bounty Program',
    description:
      '$500,000+ active bug bounty on Immunefi. Critical vulnerabilities pay up to $250,000. We believe in rewarding the white-hat community that keeps us sharp.',
    color: 'text-[var(--color-tertiary)]',
    bg: 'bg-[var(--color-tertiary)]/10',
    border: 'border-[var(--color-tertiary)]/20',
  },
  {
    icon: KeyRound,
    title: 'Two-Factor Authentication',
    description:
      'Mandatory 2FA for all dashboard access via TOTP or hardware keys (WebAuthn/FIDO2). Session tokens rotate every 15 minutes. IP-based anomaly detection active.',
    color: 'text-[var(--color-positive)]',
    bg: 'bg-[var(--color-positive)]/10',
    border: 'border-[var(--color-positive)]/20',
  },
  {
    icon: Snowflake,
    title: 'Cold Storage Custody',
    description:
      '95% of treasury assets held in multi-sig cold wallets across geographically distributed signers. No single point of failure. Withdrawal time-locks for amounts >$100K.',
    color: 'text-[var(--color-info)]',
    bg: 'bg-[var(--color-info)]/10',
    border: 'border-[var(--color-info)]/20',
  },
  {
    icon: Activity,
    title: 'Real-Time Monitoring',
    description:
      '24/7 SOC with automated threat detection. On-chain anomaly alerts, DDOS mitigation, and infrastructure health monitoring. Mean time to detection: under 30 seconds.',
    color: 'text-[#FF5252]',
    bg: 'bg-[#FF5252]/10',
    border: 'border-[#FF5252]/20',
  },
];

const certifications = [
  {
    icon: BadgeCheck,
    title: 'SOC 2 Type II',
    description: 'Independently audited controls for security, availability, and confidentiality. Annual recertification.',
    status: 'Certified',
  },
  {
    icon: Shield,
    title: 'ISO 27001',
    description: 'Information security management system (ISMS) certified. Covers people, processes, and technology.',
    status: 'Certified',
  },
  {
    icon: Scale,
    title: 'GDPR Compliant',
    description: 'Full compliance with EU data protection regulations. Data minimization, right to erasure, and DPO appointed.',
    status: 'Compliant',
  },
];

const incidentPhases = [
  {
    icon: Eye,
    title: 'Detection',
    description: 'Automated monitoring systems detect anomalies in real-time. Alerts triaged within 60 seconds.',
    time: '< 1 min',
  },
  {
    icon: AlertTriangle,
    title: 'Assessment',
    description: 'Security team evaluates severity, scope, and potential impact. Incident classification assigned.',
    time: '< 15 min',
  },
  {
    icon: Shield,
    title: 'Containment',
    description: 'Affected systems isolated. Threat neutralized. User funds protected at all costs.',
    time: '< 1 hour',
  },
  {
    icon: RefreshCw,
    title: 'Recovery',
    description: 'Systems restored from verified clean state. Additional safeguards deployed to prevent recurrence.',
    time: '< 4 hours',
  },
  {
    icon: FileCheck,
    title: 'Post-Mortem',
    description: 'Full root cause analysis published transparently. Lessons learned integrated into our security posture.',
    time: '48 hours',
  },
];

const userBestPractices = [
  {
    icon: Fingerprint,
    title: 'Enable 2FA',
    description: 'Use a hardware security key or authenticator app. Never rely on SMS-based verification.',
  },
  {
    icon: KeyRound,
    title: 'Protect Your API Keys',
    description: 'Store keys in environment variables or a secrets manager. Never commit them to repositories.',
  },
  {
    icon: UserCheck,
    title: 'Verify Wallet Connections',
    description: 'Always check the URL before connecting your wallet. Bookmark loreintelligence.com to avoid phishing.',
  },
  {
    icon: MonitorSmartphone,
    title: 'Monitor Active Sessions',
    description: 'Review your active sessions regularly. Revoke any you don\'t recognize immediately.',
  },
];

/* ── page ───────────────────────────────────────────────── */

export default function SecurityPage() {
  return (
    <main className="min-h-screen bg-[#070708] text-[#F5F5FA] overflow-x-hidden">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070708] via-[#0D0D2B] to-[#1A0A2E]" />
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(108,92,231,0.08)_0%,transparent_70%)]" />
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,210,255,0.05)_0%,transparent_70%)]" />
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
            <span className="text-sm font-data text-[var(--color-text-secondary)]">Security</span>
          </motion.div>

          {/* Shield icon */}
          <motion.div variants={fadeUp} className="mb-6 flex justify-center">
            <div className="w-16 h-16 rounded-2xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 flex items-center justify-center">
              <Shield className="w-8 h-8 text-[var(--color-primary)]" />
            </div>
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-h1 font-display text-white leading-tight">
            Security is our{' '}
            <span className="text-gradient">foundation</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
            We protect over $2.4B in tracked assets and the data of 2,847+ active traders.
            Security isn&apos;t a feature — it&apos;s the architecture everything else is built on.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex items-center justify-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[var(--color-positive)]" />
              <span className="font-data text-sm text-[var(--color-text-secondary)]">0 breaches since inception</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="live-dot" />
              <span className="font-data text-sm text-[var(--color-text-secondary)]">All systems operational</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── SECURITY MEASURES ─────────────────────────────── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[var(--color-bg-surface)]" />

        <div className="relative z-10 max-w-[1280px] mx-auto px-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="font-data text-xs tracking-widest uppercase text-[var(--color-primary)]">
              Our Defenses
            </span>
            <h2 className="mt-4 text-h2 font-display text-white">
              Six layers of protection
            </h2>
            <p className="mt-4 text-[var(--color-text-secondary)] max-w-xl mx-auto">
              Defense in depth — every layer designed to stop a different class of threat.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {securityMeasures.map((measure) => (
              <motion.div
                key={measure.title}
                variants={fadeUp}
                className="card-glass rounded-2xl p-7 group hover:border-[var(--color-primary)]/20 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl ${measure.bg} border ${measure.border} flex items-center justify-center mb-5 group-hover:scale-105 transition-transform`}>
                  <measure.icon className={`w-6 h-6 ${measure.color}`} />
                </div>
                <h3 className="font-display font-semibold text-white text-lg mb-2">
                  {measure.title}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {measure.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#070708] via-[#0D0D2B] to-[#070708]" />

        <div className="relative z-10 max-w-[1280px] mx-auto px-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="font-data text-xs tracking-widest uppercase text-[var(--color-secondary)]">
              Compliance
            </span>
            <h2 className="mt-4 text-h2 font-display text-white">
              Certified & compliant
            </h2>
            <p className="mt-4 text-[var(--color-text-secondary)] max-w-xl mx-auto">
              We don&apos;t just claim security — we prove it through independent verification.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {certifications.map((cert) => (
              <motion.div
                key={cert.title}
                variants={scaleIn}
                className="card-glass rounded-2xl p-8 text-center group hover:border-[var(--color-secondary)]/20 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-[var(--color-secondary)]/10 border border-[var(--color-secondary)]/20 flex items-center justify-center mx-auto mb-5 group-hover:scale-105 transition-transform">
                  <cert.icon className="w-7 h-7 text-[var(--color-secondary)]" />
                </div>
                <h3 className="font-display font-semibold text-white text-lg mb-2">
                  {cert.title}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4">
                  {cert.description}
                </p>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-positive)]/10 border border-[var(--color-positive)]/20">
                  <CheckCircle2 size={12} className="text-[var(--color-positive)]" />
                  <span className="text-xs font-data text-[var(--color-positive)]">{cert.status}</span>
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── INCIDENT RESPONSE ─────────────────────────────── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[var(--color-bg-surface)]" />

        <div className="relative z-10 max-w-4xl mx-auto px-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="font-data text-xs tracking-widest uppercase text-[var(--color-tertiary)]">
              Incident Response
            </span>
            <h2 className="mt-4 text-h2 font-display text-white">
              When seconds matter
            </h2>
            <p className="mt-4 text-[var(--color-text-secondary)] max-w-xl mx-auto">
              Our incident response playbook is battle-tested and continuously refined.
              Here&apos;s exactly what happens when a threat is detected.
            </p>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[23px] top-2 bottom-2 w-px bg-gradient-to-b from-[var(--color-primary)] via-[var(--color-tertiary)] to-[var(--color-positive)] opacity-30" />

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-8"
            >
              {incidentPhases.map((phase, i) => (
                <motion.div key={phase.title} variants={fadeUp} className="flex gap-6 items-start">
                  {/* Dot */}
                  <div className="relative z-10 w-12 h-12 rounded-full bg-[var(--color-bg-surface)] border-2 border-[var(--color-primary)]/40 flex items-center justify-center shrink-0">
                    <phase.icon className="w-5 h-5 text-[var(--color-primary)]" />
                  </div>

                  {/* Content */}
                  <div className="card-glass rounded-xl p-5 flex-1 group hover:border-[var(--color-primary)]/20 transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-display font-semibold text-white">{phase.title}</h3>
                      <span className="font-data text-xs text-[var(--color-tertiary)] bg-[var(--color-tertiary)]/10 px-2.5 py-1 rounded-full">
                        {phase.time}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      {phase.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── USER BEST PRACTICES ───────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#070708] via-[#0D0D2B] to-[#070708]" />

        <div className="relative z-10 max-w-[1280px] mx-auto px-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="font-data text-xs tracking-widest uppercase text-[var(--color-positive)]">
              For Our Users
            </span>
            <h2 className="mt-4 text-h2 font-display text-white">
              Security best practices
            </h2>
            <p className="mt-4 text-[var(--color-text-secondary)] max-w-xl mx-auto">
              Security is a partnership. Here&apos;s how you can help keep your account safe.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {userBestPractices.map((practice) => (
              <motion.div
                key={practice.title}
                variants={fadeUp}
                className="card-glass rounded-2xl p-7 group hover:border-[var(--color-positive)]/20 transition-all duration-300"
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-positive)]/10 border border-[var(--color-positive)]/20 flex items-center justify-center shrink-0 group-hover:bg-[var(--color-positive)]/15 transition-colors">
                    <practice.icon className="w-6 h-6 text-[var(--color-positive)]" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-white text-lg mb-2">
                      {practice.title}
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      {practice.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT SECURITY ──────────────────────────────── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[var(--color-bg-surface)]" />
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(108,92,231,0.08)_0%,transparent_70%)]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-2xl mx-auto px-5 text-center"
        >
          <div className="w-14 h-14 rounded-2xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 flex items-center justify-center mx-auto mb-6">
            <Mail className="w-7 h-7 text-[var(--color-primary)]" />
          </div>

          <h2 className="text-h2 font-display text-white">
            Found a vulnerability?
          </h2>
          <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
            We take every report seriously. If you&apos;ve discovered a security issue,
            please disclose it responsibly and we&apos;ll respond within 4 hours.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:security@loreintelligence.com"
              className="btn-primary text-base inline-flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <Mail size={18} />
              security@loreintelligence.com
            </a>
            <Link
              href="/"
              className="btn-secondary text-base inline-flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              Bug Bounty Program
              <ArrowRight size={18} />
            </Link>
          </div>

          <p className="mt-6 text-xs text-[var(--color-text-muted)] font-data">
            PGP Key available upon request · Response SLA: 4 hours for critical issues
          </p>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
