'use client';

import { motion } from 'framer-motion';

const metrics = [
  { value: '$2.4B+', label: 'Intelligence processed' },
  { value: '12,847', label: 'Wallets tracked' },
  { value: '99.2%', label: 'Exploit detection rate' },
  { value: '14 min', label: 'Avg. early warning' },
  { value: '2.3M', label: 'Data points / min' },
  { value: '< 500ms', label: 'Alert latency' },
];

const testimonials = [
  {
    quote: 'Lore caught the Protocol X exploit 14 minutes before anyone else. I withdrew my funds in time. This paid for itself 100x over.',
    name: 'Alex Chen',
    role: 'DeFi Portfolio Manager',
    avatar: 'AC',
  },
  {
    quote: 'The narrative engine is unlike anything I\'ve used. It doesn\'t just show me data — it tells me the story behind it.',
    name: 'Sarah Mitchell',
    role: 'Crypto Research Analyst',
    avatar: 'SM',
  },
  {
    quote: 'I track 200+ wallets manually. Lore does it better, faster. It\'s like having a team of analysts working 24/7.',
    name: 'Marcus Johnson',
    role: 'Whale Tracker',
    avatar: 'MJ',
  },
];

export default function MetricsAndTestimonials() {
  return (
    <>
      {/* Metrics Bar */}
      <section className="py-16 bg-[#0D0D12]/50 border-y border-white/5">
        <div className="max-w-[1280px] mx-auto px-5 lg:px-20">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {metrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="text-center"
              >
                <div className="text-gradient font-display text-2xl md:text-3xl font-bold">
                  {metric.value}
                </div>
                <div className="mt-1 text-xs text-[#5A5A72] font-data">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1280px] mx-auto px-5 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="font-data text-xs tracking-[0.25em] uppercase text-[#6C5CE7]">
              ◆ Trusted by Traders
            </span>
            <h2 className="text-h2 font-display text-white mt-4">
              Why <span className="text-gradient">2,847+ traders</span> chose Lore
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-glass rounded-2xl p-6 md:p-8 hover:border-[#6C5CE7]/20 transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-[#FDCB6E] text-sm">★</span>
                  ))}
                </div>
                <p className="text-[#A0A0B8] text-sm leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6C5CE7] to-[#00D2FF] flex items-center justify-center font-display font-bold text-sm text-white">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">{t.name}</div>
                    <div className="text-[#5A5A72] text-xs">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
