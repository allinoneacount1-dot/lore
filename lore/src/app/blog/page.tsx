'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Search,
  ArrowRight,
  Clock,
  Calendar,
  Tag,
  TrendingUp,
  BookOpen,
  Mail,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/* ─── mock data ─── */
const categories = ['All', 'AI & ML', 'On-Chain', 'DeFi', 'Security', 'Research'];

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'How AI Detects Whale Movements Before They Happen',
    excerpt:
      'Our proprietary NLP models parse on-chain flow patterns and social sentiment in real time, surfacing whale accumulation signals up to 47 minutes before major price movements.',
    date: 'Jun 10, 2026',
    category: 'AI & ML',
    readTime: '8 min read',
    featured: true,
  },
  {
    id: 2,
    title: 'The Future of On-Chain Intelligence',
    excerpt:
      'Why every serious trader will rely on AI-driven on-chain analytics by 2027 — and how LORE is building that future today.',
    date: 'Jun 5, 2026',
    category: 'On-Chain',
    readTime: '6 min read',
  },
  {
    id: 3,
    title: 'MEV Protection: A Complete Guide for DeFi Users',
    excerpt:
      'Maximal Extractable Value is the silent tax on every swap. Learn how LORE Terminal shields your transactions from frontrunning and sandwich attacks.',
    date: 'May 28, 2026',
    category: 'DeFi',
    readTime: '10 min read',
  },
  {
    id: 4,
    title: 'Inside LORE\'s Exploit Detection Engine',
    excerpt:
      'A deep-dive into the architecture that monitors 14 chains simultaneously and has prevented over $200M in potential exploit losses.',
    date: 'May 20, 2026',
    category: 'Security',
    readTime: '12 min read',
  },
  {
    id: 5,
    title: 'Narrative Scoring: Quantifying Crypto Hype with LLMs',
    excerpt:
      'We trained a custom large-language model on 3 years of crypto discourse. Here\'s how it turns narrative momentum into actionable alpha.',
    date: 'May 12, 2026',
    category: 'AI & ML',
    readTime: '7 min read',
  },
  {
    id: 6,
    title: 'Cross-Chain Liquidity Mapping: The Hidden Order Flow',
    excerpt:
      'Tracking capital as it bridges between Ethereum, Solana, and L2s reveals institutional positioning that single-chain analysis misses entirely.',
    date: 'May 3, 2026',
    category: 'Research',
    readTime: '9 min read',
  },
];

/* ─── animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const featuredAnim = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

/* ─── page component ─── */
export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = blogPosts.filter((post) => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch =
      searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featured = blogPosts.find((p) => p.featured);
  const gridPosts = filtered.filter((p) => !p.featured);

  return (
    <main className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] overflow-x-hidden">
      <Navbar />

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative pt-32 pb-20 px-5 lg:px-20 overflow-hidden">
        {/* decorative glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--color-primary)]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-[1280px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5 text-[var(--color-primary)] text-sm font-data mb-6"
          >
            <BookOpen size={14} />
            LORE Blog
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-h1 font-display mb-6"
          >
            Insights from the{' '}
            <span className="text-gradient">Intelligence Layer</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg text-[var(--color-text-secondary)] leading-relaxed mb-10"
          >
            Research, analysis, and behind-the-scenes from the team building AI-powered crypto intelligence.
          </motion.p>

          {/* search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative max-w-lg mx-auto"
          >
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
            />
            <input
              type="text"
              placeholder="Search articles…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-[var(--color-bg-surface)] border border-white/10 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)]/50 focus:ring-1 focus:ring-[var(--color-primary)]/20 transition-all"
            />
          </motion.div>
        </div>
      </section>

      {/* ═══════════ FEATURED POST ═══════════ */}
      {featured && (
        <section className="px-5 lg:px-20 pb-16">
          <div className="max-w-[1280px] mx-auto">
            <motion.div
              variants={featuredAnim}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="relative group rounded-2xl overflow-hidden border border-white/5 bg-[var(--color-bg-surface)] hover:border-[var(--color-primary)]/20 transition-colors"
            >
              {/* gradient accent */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/5 via-transparent to-[var(--color-secondary)]/5 pointer-events-none" />

              <div className="relative grid md:grid-cols-2 gap-0">
                {/* left – image placeholder */}
                <div className="relative h-64 md:h-auto min-h-[280px] bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-secondary)]/10 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-[var(--color-primary)] blur-[60px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full bg-[var(--color-secondary)] blur-[40px]" />
                  </div>
                  <Sparkles size={48} className="text-[var(--color-primary)]/40" />
                </div>

                {/* right – content */}
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-data font-medium bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20">
                      <TrendingUp size={12} />
                      Featured
                    </span>
                    <span className="text-xs font-data text-[var(--color-text-muted)]">
                      {featured.category}
                    </span>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-display font-bold text-white leading-tight mb-4 group-hover:text-[var(--color-primary)] transition-colors">
                    {featured.title}
                  </h2>

                  <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                    {featured.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs font-data text-[var(--color-text-muted)]">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={13} />
                        {featured.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={13} />
                        {featured.readTime}
                      </span>
                    </div>

                    <Link
                      href="#"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-primary)] hover:gap-2.5 transition-all"
                    >
                      Read article
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ═══════════ CATEGORY FILTER ═══════════ */}
      <section className="px-5 lg:px-20 pb-10">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-[var(--color-primary)] text-white shadow-[0_0_20px_rgba(108,92,231,0.25)]'
                    : 'bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)] border border-white/5 hover:border-white/10 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ BLOG GRID ═══════════ */}
      <section className="px-5 lg:px-20 pb-24">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gridPosts.map((post, i) => (
              <motion.article
                key={post.id}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                className="group relative rounded-xl border border-white/5 bg-[var(--color-bg-surface)] hover:border-[var(--color-primary)]/20 transition-all hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(108,92,231,0.08)] overflow-hidden"
              >
                {/* card top accent */}
                <div className="h-1 w-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="p-6 flex flex-col h-full">
                  {/* category + read time */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-data font-medium bg-[var(--color-primary)]/8 text-[var(--color-primary)] border border-[var(--color-primary)]/15">
                      <Tag size={11} />
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-data text-[var(--color-text-muted)]">
                      <Clock size={11} />
                      {post.readTime}
                    </span>
                  </div>

                  {/* title */}
                  <h3 className="text-lg font-display font-semibold text-white leading-snug mb-3 group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* excerpt */}
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6 line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>

                  {/* footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="flex items-center gap-1.5 text-xs font-data text-[var(--color-text-muted)]">
                      <Calendar size={12} />
                      {post.date}
                    </span>

                    <Link
                      href="#"
                      className="inline-flex items-center gap-1 text-xs font-medium text-[var(--color-primary)] hover:gap-2 transition-all"
                    >
                      Read more
                      <ChevronRight size={13} />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* empty state */}
          {gridPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[var(--color-text-muted)] text-lg">No articles match your filters.</p>
              <button
                onClick={() => {
                  setActiveCategory('All');
                  setSearchQuery('');
                }}
                className="mt-4 text-sm text-[var(--color-primary)] hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════ NEWSLETTER ═══════════ */}
      <section className="px-5 lg:px-20 pb-24">
        <div className="max-w-[1280px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl overflow-hidden border border-white/5 bg-[var(--color-bg-surface)]"
          >
            {/* background glow */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[var(--color-primary)]/10 blur-[80px]" />
              <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-[var(--color-secondary)]/8 blur-[60px]" />
            </div>

            <div className="relative px-8 py-14 md:px-16 md:py-20 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 mb-6">
                <Mail size={24} className="text-[var(--color-primary)]" />
              </div>

              <h2 className="text-h2 font-display mb-4">
                Stay ahead of the <span className="text-gradient">curve</span>
              </h2>

              <p className="max-w-lg mx-auto text-[var(--color-text-secondary)] leading-relaxed mb-8">
                Get weekly intelligence briefings, research drops, and exclusive analysis delivered straight to your inbox. No spam, ever.
              </p>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
              >
                <div className="relative w-full">
                  <Mail
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
                  />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--color-bg-card)] border border-white/10 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)]/50 focus:ring-1 focus:ring-[var(--color-primary)]/20 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="shrink-0 btn-primary flex items-center gap-2 text-sm"
                >
                  Subscribe
                  <ArrowRight size={15} />
                </button>
              </form>

              <p className="mt-4 text-xs text-[var(--color-text-muted)] font-data">
                Join 12,000+ crypto natives. Unsubscribe anytime.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
