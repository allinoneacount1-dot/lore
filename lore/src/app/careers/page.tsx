'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Brain,
  Blocks,
  Code2,
  Palette,
  Server,
  Users,
  Rocket,
  Heart,
  Zap,
  Globe,
  GraduationCap,
  ShieldCheck,
  Clock,
  Building2,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from 'lucide-react';

/* ──– Data ──────────────────────────────────────────────── */

const jobs = [
  {
    title: 'Senior ML Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description:
      'Design and deploy machine-learning models that power LOREs real-time market intelligence. You will work on NLP pipelines, on-chain signal detection, and predictive analytics at scale.',
    requirements: [
      '5+ years of experience in ML/DL frameworks (PyTorch, TensorFlow)',
      'Strong background in NLP and time-series analysis',
      'Experience with model serving and MLOps (Kubernetes, Ray, or similar)',
      'Familiarity with blockchain data structures is a plus',
    ],
    icon: Brain,
  },
  {
    title: 'Blockchain Data Analyst',
    department: 'Data',
    location: 'Remote',
    type: 'Full-time',
    description:
      'Extract, transform, and interpret on-chain data to surface actionable trading signals. You will build dashboards, data pipelines, and analytical frameworks that drive product decisions.',
    requirements: [
      '3+ years in data analytics or data engineering',
      'Proficiency in SQL, Python, and modern data-stack tools (dbt, Airflow)',
      'Deep understanding of DeFi protocols and on-chain metrics',
      'Experience with Dune, Flipside, or similar analytics platforms',
    ],
    icon: Blocks,
  },
  {
    title: 'Full-Stack Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description:
      'Build and maintain LOREs web platform, dashboard, and API services. You will deliver performant, accessible interfaces and robust back-end systems used by thousands of traders.',
    requirements: [
      '4+ years of full-stack development (Next.js, Node.js, TypeScript)',
      'Experience with PostgreSQL, Redis, and REST or GraphQL APIs',
      'Familiarity with Web3 libraries (viem, wagmi, ethers)',
      'Passion for clean architecture and developer experience',
    ],
    icon: Code2,
  },
  {
    title: 'Product Designer',
    department: 'Design',
    location: 'Remote',
    type: 'Full-time',
    description:
      'Own the end-to-end design of LOREs product experiences. From research and wireframes to high-fidelity prototypes, you will shape how traders interact with complex data.',
    requirements: [
      '4+ years of product design experience (SaaS or fintech preferred)',
      'Expert-level proficiency in Figma and design systems',
      'Strong portfolio demonstrating data-dense UI/UX work',
      'Understanding of accessibility standards and responsive design',
    ],
    icon: Palette,
  },
  {
    title: 'DevOps Engineer',
    department: 'Infrastructure',
    location: 'Remote',
    type: 'Full-time',
    description:
      'Architect and operate the cloud infrastructure that keeps LORE running 24/7. You will manage CI/CD pipelines, monitoring, and scaling strategies for high-throughput data services.',
    requirements: [
      '4+ years in DevOps or site reliability engineering',
      'Deep experience with AWS or GCP, Terraform, and Kubernetes',
      'Strong scripting skills (Bash, Python, Go)',
      'Familiarity with observability stacks (Grafana, Prometheus, Datadog)',
    ],
    icon: Server,
  },
  {
    title: 'Community Manager',
    department: 'Growth',
    location: 'Remote',
    type: 'Full-time',
    description:
      'Grow and nurture the LORE community across Discord, Telegram, and social channels. You will moderate discussions, organise events, gather feedback, and be the voice of our users.',
    requirements: [
      '3+ years managing crypto or Web3 communities',
      'Excellent written communication skills in English',
      'Experience with community analytics and growth strategies',
      'Comfortable working across time zones and events schedules',
    ],
    icon: Users,
  },
];

const benefits = [
  {
    icon: Rocket,
    title: 'Equity & Token Allocation',
    description:
      'Competitive compensation with meaningful token grants so you share in the upside of what we build together.',
  },
  {
    icon: Heart,
    title: 'Health & Wellness',
    description:
      'Premium medical, dental, and vision coverage for you and your dependents, plus a mental-health stipend.',
  },
  {
    icon: Zap,
    title: 'Flexible Schedule',
    description:
      'Work when you are most productive. We care about output, not hours logged.',
  },
  {
    icon: Globe,
    title: 'Remote-First',
    description:
      'Work from anywhere in the world. We provide a home-office stipend and co-working membership.',
  },
  {
    icon: GraduationCap,
    title: 'Learning Budget',
    description:
      'Annual budget for conferences, courses, books, and certifications to keep your skills sharp.',
  },
  {
    icon: ShieldCheck,
    title: 'Generous PTO',
    description:
      'Unlimited paid time off with a minimum 20-day annual recommendation to ensure real rest.',
  },
];

/* ──– Variants ─────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ──– Components ───────────────────────────────────────── */

function JobCard({ job, index }: { job: (typeof jobs)[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const Icon = job.icon;

  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="card-glass rounded-2xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-6 md:p-8 flex items-start gap-5 group cursor-pointer"
      >
        <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 flex items-center justify-center shrink-0 group-hover:bg-[var(--color-primary)]/20 transition-colors">
          <Icon className="w-6 h-6 text-[var(--color-primary)]" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-display font-semibold text-lg md:text-xl text-white mb-1">
            {job.title}
          </h3>
          <div className="flex flex-wrap gap-3 mt-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-data text-[var(--color-text-muted)]">
              <Building2 className="w-3.5 h-3.5" />
              {job.department}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-data text-[var(--color-text-muted)]">
              {job.location}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-data text-[var(--color-text-muted)]">
              <Clock className="w-3.5 h-3.5" />
              {job.type}
            </span>
          </div>
        </div>

        <div className="shrink-0 mt-1">
          {open ? (
            <ChevronUp className="w-5 h-5 text-[var(--color-text-muted)]" />
          ) : (
            <ChevronDown className="w-5 h-5 text-[var(--color-text-muted)]" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="overflow-hidden"
          >
            <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-white/5 pt-5">
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-5">
                {job.description}
              </p>
              <h4 className="font-data text-xs tracking-widest uppercase text-[var(--color-text-muted)] mb-3">
                Requirements
              </h4>
              <ul className="space-y-2 mb-6">
                {job.requirements.map((req) => (
                  <li
                    key={req}
                    className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] mt-1.5 shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
              <Link
                href="#apply"
                className="btn-primary inline-flex items-center gap-2 text-sm"
              >
                Apply for this role
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ──– Page ─────────────────────────────────────────────── */

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] overflow-x-hidden">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[var(--color-primary)]/8 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-[1280px] mx-auto px-5 lg:px-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-[var(--color-primary)]" />
            <span className="text-xs font-data text-[var(--color-primary)]">
              We are hiring across 6 roles
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-h1 font-display mb-6"
          >
            Build the Future of{' '}
            <span className="text-gradient">Crypto Intelligence</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg text-[var(--color-text-secondary)] leading-relaxed mb-10"
          >
            Join a world-class team of engineers, designers, and analysts on a mission to
            make on-chain intelligence accessible to everyone. Remote-first. Token-incentivised.
            Impact from day one.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="#positions" className="btn-primary inline-flex items-center gap-2">
              View Open Positions
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="#benefits" className="btn-secondary inline-flex items-center gap-2">
              Why LORE?
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Culture strip ────────────────────────────────── */}
      <section className="py-16 border-y border-white/5 bg-[var(--color-bg-surface)]">
        <div className="max-w-[1280px] mx-auto px-5 lg:px-20">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { value: '40+', label: 'Team Members' },
              { value: '12+', label: 'Countries' },
              { value: '$42M', label: 'Total Funding' },
              { value: '99.9%', label: 'Uptime SLA' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                custom={i}
                className="text-center"
              >
                <div className="font-display font-bold text-3xl md:text-4xl text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-[var(--color-text-muted)] font-data">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Open Positions ───────────────────────────────── */}
      <section id="positions" className="py-20 md:py-28">
        <div className="max-w-[1280px] mx-auto px-5 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-h2 font-display mb-4">
              Open <span className="text-gradient">Positions</span>
            </h2>
            <p className="max-w-xl mx-auto text-[var(--color-text-secondary)]">
              We are looking for exceptional people who are passionate about crypto, data, and
              building products that matter.
            </p>
          </motion.div>

          <div className="grid gap-4">
            {jobs.map((job, i) => (
              <JobCard key={job.title} job={job} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits ─────────────────────────────────────── */}
      <section
        id="benefits"
        className="py-20 md:py-28 bg-[var(--color-bg-surface)] border-y border-white/5"
      >
        <div className="max-w-[1280px] mx-auto px-5 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-h2 font-display mb-4">
              Why <span className="text-gradient">LORE</span>?
            </h2>
            <p className="max-w-xl mx-auto text-[var(--color-text-secondary)]">
              We invest in our people because they are the product. Here is what you get when
              you join the team.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  variants={fadeUp}
                  custom={i}
                  className="card-glass rounded-2xl p-6 md:p-8 group hover:border-[var(--color-primary)]/20 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 flex items-center justify-center mb-5 group-hover:bg-[var(--color-primary)]/20 transition-colors">
                    <Icon className="w-6 h-6 text-[var(--color-primary)]" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Application CTA ─────────────────────────────── */}
      <section id="apply" className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary)]/5 to-transparent pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-[720px] mx-auto px-5 lg:px-20 text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 flex items-center justify-center mx-auto mb-8">
            <Rocket className="w-8 h-8 text-[var(--color-primary)]" />
          </div>

          <h2 className="text-h2 font-display mb-4">
            Ready to <span className="text-gradient">Join Us</span>?
          </h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed mb-10">
            Do not see a role that fits? We are always looking for talented people. Send us
            your resume and tell us what you would like to build at LORE.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:careers@loreintelligence.com"
              className="btn-primary inline-flex items-center gap-2"
            >
              Send Your Application
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link href="/" className="btn-secondary inline-flex items-center gap-2">
              Back to Home
            </Link>
          </div>

          <p className="mt-8 text-xs text-[var(--color-text-muted)] font-data">
            LORE is an equal-opportunity employer. We celebrate diversity and are committed
            to creating an inclusive environment for all employees.
          </p>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
