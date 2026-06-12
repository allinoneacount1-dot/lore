'use client';

import { motion } from 'framer-motion';
import { Check, ArrowRight, Zap } from 'lucide-react';

const tiers = [
  {
    name: 'SEEKER',
    price: 'Free',
    description: 'Perfect for getting started with crypto intelligence',
    features: [
      'Basic whale alerts',
      '5 wallet tracking',
      'Daily narrative summary',
      'Community access',
      'Basic sentiment data',
    ],
    cta: 'Start Free',
    popular: false,
  },
  {
    name: 'ORACLE',
    price: '$99',
    period: '/mo',
    description: 'For serious traders who need real-time intelligence',
    features: [
      'Everything in Seeker',
      'Unlimited wallet tracking',
      'Real-time exploit detection',
      'Full narrative engine',
      'Portfolio oracle',
      'API access',
      'Priority alerts',
    ],
    cta: 'Become an Oracle',
    popular: true,
  },
  {
    name: 'ARCHITECT',
    price: '$499',
    period: '/mo',
    description: 'For funds and professional trading firms',
    features: [
      'Everything in Oracle',
      'Custom AI models',
      'White-label dashboard',
      'Dedicated support',
      'Custom integrations',
      'SLA guarantee',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 md:py-32 relative">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-data text-xs tracking-[0.25em] uppercase text-[#6C5CE7]">
            ◆ Pricing
          </span>
          <h2 className="text-h2 font-display text-white mt-4">
            Choose your <span className="text-gradient">intelligence level</span>
          </h2>
          <p className="mt-4 text-lg text-[#A0A0B8] max-w-xl mx-auto">
            Start free. Scale when you need more. No hidden fees.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl p-8 ${
                tier.popular
                  ? 'bg-gradient-to-b from-[#6C5CE7]/20 to-[#6C5CE7]/5 border-2 border-[#6C5CE7]/40 scale-105 shadow-[0_0_60px_rgba(108,92,231,0.15)]'
                  : 'card-glass'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#6C5CE7] text-white text-xs font-semibold flex items-center gap-1">
                  <Zap size={12} /> MOST POPULAR
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-display font-semibold text-lg text-white">{tier.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-h2 font-display font-bold text-white">{tier.price}</span>
                  {tier.period && <span className="text-[#5A5A72] text-sm">{tier.period}</span>}
                </div>
                <p className="mt-2 text-sm text-[#A0A0B8]">{tier.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-[#A0A0B8]">
                    <Check size={16} className={tier.popular ? 'text-[#6C5CE7]' : 'text-[#00E676]'} />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                  tier.popular
                    ? 'btn-primary'
                    : 'border border-white/20 text-white hover:bg-white/5'
                }`}
              >
                {tier.cta}
                {tier.popular && <ArrowRight size={16} className="inline ml-2" />}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
