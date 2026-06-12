'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Sparkles, Zap, Crown, ArrowRight, HelpCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useUnifiedWallet } from '@/hooks/useWallet';
import { useToast } from '@/components/Toast';
import { useRouter } from 'next/navigation';

/* ── Pricing Data ── */
const plans = [
  {
    id: 'seeker',
    name: 'Seeker',
    icon: Zap,
    description: 'For traders starting their intelligence journey.',
    monthlyPrice: 0,
    yearlyPrice: 0,
    color: 'var(--color-text-secondary)',
    borderColor: 'border-white/10',
    bgColor: 'bg-white/[0.02]',
    popular: false,
    features: [
      { text: 'Narrative Engine — Basic', included: true },
      { text: '3 Wallets tracked', included: true },
      { text: 'Daily market reports', included: true },
      { text: 'Community Discord access', included: true },
      { text: 'Basic sentiment analysis', included: true },
      { text: 'Whale Radar — 5 wallets', included: false },
      { text: 'Exploit Detection', included: false },
      { text: 'Real-time alerts', included: false },
      { text: 'API access', included: false },
      { text: 'Priority support', included: false },
    ],
    cta: 'Start Free',
  },
  {
    id: 'oracle',
    name: 'Oracle',
    icon: Sparkles,
    description: 'For serious traders who want the full picture.',
    monthlyPrice: 49,
    yearlyPrice: 39,
    color: 'var(--color-primary)',
    borderColor: 'border-[var(--color-primary)]/30',
    bgColor: 'bg-[var(--color-primary)]/[0.03]',
    popular: true,
    features: [
      { text: 'Narrative Engine — Full', included: true },
      { text: '50 Wallets tracked', included: true },
      { text: 'Real-time market reports', included: true },
      { text: 'Private Discord + Alpha calls', included: true },
      { text: 'Advanced sentiment analysis', included: true },
      { text: 'Whale Radar — 50 wallets', included: true },
      { text: 'Exploit Detection — Basic', included: true },
      { text: 'Real-time alerts (500ms)', included: true },
      { text: 'API access (10K calls/day)', included: true },
      { text: 'Priority support', included: false },
    ],
    cta: 'Start Free Trial',
  },
  {
    id: 'architect',
    name: 'Architect',
    icon: Crown,
    description: 'For institutions and professional trading desks.',
    monthlyPrice: 199,
    yearlyPrice: 159,
    color: '#FDCB6E',
    borderColor: 'border-[#FDCB6E]/30',
    bgColor: 'bg-[#FDCB6E]/[0.03]',
    popular: false,
    features: [
      { text: 'Narrative Engine — Unlimited', included: true },
      { text: 'Unlimited wallet tracking', included: true },
      { text: 'Streaming intelligence feed', included: true },
      { text: 'Direct line to Lore team', included: true },
      { text: 'Full sentiment + on-chain', included: true },
      { text: 'Whale Radar — Unlimited', included: true },
      { text: 'Exploit Detection — Pro', included: true },
      { text: 'Real-time alerts (100ms)', included: true },
      { text: 'API access (Unlimited)', included: true },
      { text: 'Dedicated account manager', included: true },
    ],
    cta: 'Contact Sales',
  },
];

const faqs = [
  {
    q: 'Can I switch plans anytime?',
    a: 'Yes. Upgrade or downgrade instantly. We prorate the difference — no penalties, no hassle.',
  },
  {
    q: 'What happens if I exceed my API limit?',
    a: 'We will never silently cut you off. You will get a heads-up at 80%, and can top up or upgrade with one click.',
  },
  {
    q: 'Is there a free trial for paid plans?',
    a: 'Oracle and Architect both come with a 7-day free trial. No credit card required. Full access from day one.',
  },
  {
    q: 'Do you offer refunds?',
    a: 'If Lore does not deliver on its promises, we will refund your last month — no questions asked. Contact support within 30 days.',
  },
  {
    q: 'How does wallet tracking work?',
    a: 'You add wallet addresses (yours or others). Lore monitors them in real-time and alerts you on significant movements, narrative shifts, and exploit signals.',
  },
  {
    q: 'Which chains do you support?',
    a: 'Ethereum, Solana, BSC, Arbitron, Base, Polygon, and Avalanche. More chains added monthly based on community demand.',
  },
];

/* ── Comparison Table ── */
const comparisonRows = [
  { feature: 'Narrative Engine', seeker: 'Basic', oracle: 'Full', architect: 'Unlimited' },
  { feature: 'Wallets Tracked', seeker: '3', oracle: '50', architect: 'Unlimited' },
  { feature: 'Whale Radar', seeker: '—', oracle: '50 wallets', architect: 'Unlimited' },
  { feature: 'Exploit Detection', seeker: '—', oracle: 'Basic', architect: 'Pro (100ms)' },
  { feature: 'Real-time Alerts', seeker: 'Daily digest', oracle: '500ms latency', architect: '100ms latency' },
  { feature: 'API Access', seeker: '—', oracle: '10K/day', architect: 'Unlimited' },
  { feature: 'Discord', seeker: 'Community', oracle: 'Private + Alpha calls', architect: 'Direct line' },
  { feature: 'Account Manager', seeker: '—', oracle: '—', architect: '✓ Dedicated' },
];

/* ── Main Component ── */
export default function PricingPage() {
  const [annual, setAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const wallet = useUnifiedWallet();
  const { showToast } = useToast();
  const router = useRouter();

  const handleStartSeeker = () => {
    if (wallet.connected) {
      router.push('/dashboard');
    } else {
      showToast('Connect your wallet to get started', 'info');
    }
  };

  const handleStartTrial = () => {
    if (wallet.connected) {
      showToast('7-day free trial activated! 🎉', 'success');
      router.push('/dashboard');
    } else {
      showToast('Connect your wallet to start your free trial', 'info');
    }
  };

  const handleContactSales = () => {
    showToast('Our team will reach out within 24 hours', 'success');
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-[#070708]" />
      <div className="fixed inset-0 bg-gradient-to-b from-[#070708] via-[#0D0D2B]/30 to-[#070708]" />

      <div className="relative z-10">
        {/* Navbar */}
        <Navbar />

        {/* ── Hero ── */}
        <section className="pt-28 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-data text-xs tracking-[0.25em] uppercase text-[var(--color-primary)]">
              ◆ Pricing
            </span>
            <h1 className="text-h1 font-display text-white mt-4 max-w-3xl mx-auto leading-[1.1]">
              Intelligence has a price.{' '}
              <span className="text-gradient">Ignorance costs more.</span>
            </h1>
            <p className="mt-6 text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              From free to full-suite. Every plan includes our core AI engine.
              Upgrade when you are ready to see more.
            </p>
          </motion.div>

          {/* Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-10 inline-flex items-center gap-4 p-1 rounded-full bg-white/5 border border-white/10"
          >
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                !annual ? 'bg-[var(--color-primary)] text-white' : 'text-[var(--color-text-secondary)] hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                annual ? 'bg-[var(--color-primary)] text-white' : 'text-[var(--color-text-secondary)] hover:text-white'
              }`}
            >
              Annual
              <span className="text-xs bg-[#FDCB6E]/20 text-[#FDCB6E] px-2 py-0.5 rounded-full font-data">
                -20%
              </span>
            </button>
          </motion.div>
        </section>

        {/* ── Plans ── */}
        <section className="pb-24">
          <div className="max-w-[1280px] mx-auto px-5 lg:px-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan, i) => {
                const Icon = plan.icon;
                const price = annual ? plan.yearlyPrice : plan.monthlyPrice;

                const handlePlanCTA = () => {
                  if (plan.id === 'seeker') handleStartSeeker();
                  else if (plan.id === 'oracle') handleStartTrial();
                  else handleContactSales();
                };

                return (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i, duration: 0.5 }}
                    className={`relative rounded-2xl border ${plan.borderColor} ${plan.bgColor} backdrop-blur-sm p-8 flex flex-col ${
                      plan.popular ? 'ring-1 ring-[var(--color-primary)]/20 shadow-[0_0_40px_rgba(108,92,231,0.1)]' : ''
                    }`}
                  >
                    {/* Popular badge */}
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[var(--color-primary)] text-white text-xs font-data tracking-wider uppercase">
                        Most Popular
                      </div>
                    )}

                    {/* Header */}
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                          <Icon size={20} style={{ color: plan.color }} />
                        </div>
                        <h3 className="font-display font-semibold text-xl text-white">{plan.name}</h3>
                      </div>
                      <p className="text-sm text-[var(--color-text-secondary)]">{plan.description}</p>
                    </div>

                    {/* Price */}
                    <div className="mb-8">
                      <div className="flex items-baseline gap-1">
                        <span className="text-5xl font-display font-bold text-white">
                          ${price}
                        </span>
                        {price > 0 && (
                          <span className="text-sm text-[var(--color-text-muted)] font-data">/mo</span>
                        )}
                      </div>
                      {annual && plan.monthlyPrice > 0 && (
                        <p className="text-xs text-[var(--color-text-muted)] font-data mt-1">
                          Billed annually (${price * 12}/yr)
                        </p>
                      )}
                      {price === 0 && (
                        <p className="text-xs text-[var(--color-text-muted)] font-data mt-1">
                          Free forever
                        </p>
                      )}
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 mb-8 flex-1">
                      {plan.features.map((f) => (
                        <li key={f.text} className="flex items-start gap-3">
                          {f.included ? (
                            <Check size={16} className="text-[var(--color-positive)] mt-0.5 shrink-0" />
                          ) : (
                            <X size={16} className="text-[var(--color-text-muted)] mt-0.5 shrink-0" />
                          )}
                          <span className={`text-sm ${f.included ? 'text-[var(--color-text-secondary)]' : 'text-[var(--color-text-muted)]'}`}>
                            {f.text}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <button
                      onClick={handlePlanCTA}
                      className={`w-full py-3.5 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                        plan.popular
                          ? 'btn-primary'
                          : price === 0
                          ? 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                          : 'bg-white/[0.07] border border-white/10 text-white hover:bg-white/10'
                      }`}
                    >
                      {plan.cta}
                      <ArrowRight size={16} />
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Comparison Table ── */}
        <section className="py-24 border-t border-white/5">
          <div className="max-w-[1280px] mx-auto px-5 lg:px-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="font-data text-xs tracking-[0.25em] uppercase text-[var(--color-primary)]">
                ◆ Compare Plans
              </span>
              <h2 className="text-h2 font-display text-white mt-4">
                See the full breakdown
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="overflow-x-auto"
            >
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-4 font-data text-xs tracking-wider uppercase text-[var(--color-text-muted)]">
                      Feature
                    </th>
                    <th className="text-center py-4 px-4 font-data text-xs tracking-wider uppercase text-[var(--color-text-secondary)]">
                      Seeker
                    </th>
                    <th className="text-center py-4 px-4 font-data text-xs tracking-wider uppercase text-[var(--color-primary)]">
                      Oracle
                    </th>
                    <th className="text-center py-4 px-4 font-data text-xs tracking-wider uppercase text-[#FDCB6E]">
                      Architect
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={row.feature} className={`border-b border-white/5 ${i % 2 === 0 ? 'bg-white/[0.01]' : ''}`}>
                      <td className="py-4 px-4 text-[var(--color-text-secondary)] font-medium">
                        {row.feature}
                      </td>
                      <td className="py-4 px-4 text-center text-[var(--color-text-muted)] font-data">
                        {row.seeker}
                      </td>
                      <td className="py-4 px-4 text-center text-[var(--color-text-secondary)] font-data">
                        {row.oracle}
                      </td>
                      <td className="py-4 px-4 text-center text-[var(--color-text-secondary)] font-data">
                        {row.architect}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-24 border-t border-white/5">
          <div className="max-w-3xl mx-auto px-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="font-data text-xs tracking-[0.25em] uppercase text-[var(--color-primary)]">
                ◆ FAQ
              </span>
              <h2 className="text-h2 font-display text-white mt-4">
                Questions? <span className="text-gradient">Answered.</span>
              </h2>
            </motion.div>

            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-xl border border-white/5 bg-white/[0.02] overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="text-sm font-medium text-white pr-4">{faq.q}</span>
                    <HelpCircle
                      size={18}
                      className={`shrink-0 text-[var(--color-text-muted)] transition-transform duration-300 ${
                        openFaq === i ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section className="py-24 border-t border-white/5">
          <div className="max-w-3xl mx-auto px-5 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-h2 font-display text-white">
                Ready to see what others can&apos;t?
              </h2>
              <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
                Start free. Upgrade when you are ready. No credit card required.
              </p>
              <button
                onClick={handleStartSeeker}
                className="mt-8 btn-primary text-base inline-flex items-center gap-2"
              >
                Start with Seeker — Free
                <ArrowRight size={18} />
              </button>
            </motion.div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="border-t border-white/5 py-12">
          <div className="max-w-[1280px] mx-auto px-5 lg:px-20 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[var(--color-text-muted)] font-data">
              © 2026 Lore Intelligence. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <div className="live-dot" style={{ width: 6, height: 6 }} />
              <span className="text-xs font-data text-[var(--color-positive)]">All systems operational</span>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
