'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download, FileText, Image, Package, Newspaper, ExternalLink,
  Mail,  ChevronDown, ChevronUp, ArrowRight, CheckCircle,
  Calendar, User, Building2, Phone, Globe
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

const pressKitItems = [
  {
    title: 'Brand Assets',
    description: 'Logo files in SVG, PNG, and WebP formats. Primary, monochrome, and icon-only variants.',
    icon: Image,
    size: '24 MB',
    files: ['logo-primary.svg', 'logo-mono.svg', 'logo-icon.png', 'logo-wordmark.svg'],
  },
  {
    title: 'Brand Guidelines',
    description: 'Complete brand book including color palette, typography, spacing rules, and usage do\'s and don\'ts.',
    icon: FileText,
    size: '8.2 MB',
    files: ['LORE_Brand_Guidelines_v2.pdf'],
  },
  {
    title: 'Screenshots & Media',
    description: 'High-resolution screenshots of the dashboard, terminal, and key features. 4K ready.',
    icon: Package,
    size: '156 MB',
    files: ['dashboard-overview.png', 'terminal-view.png', 'narrative-card.png', 'whale-tracker.png'],
  },
  {
    title: 'Founder Headshots',
    description: 'Professional photography of the founding team. High-res and web-optimized versions included.',
    icon: User,
    size: '42 MB',
    files: ['ceo-headshot.png', 'cto-headshot.png', 'team-photo.jpg'],
  },
];

const pressMentions = [
  {
    outlet: 'TechCoin',
    title: 'LORE Raises $12M Series A to Build the Intelligence Layer for Crypto Markets',
    excerpt: 'The AI-powered on-chain analytics platform has seen 400% growth in active users since its beta launch, processing over 2 billion on-chain signals daily.',
    date: 'May 15, 2026',
    author: 'Sarah Chen',
    url: '#',
    featured: true,
  },
  {
    outlet: 'DeFi Daily',
    title: 'How LORE\'s Narrative Engine Is Changing Crypto Trading Forever',
    excerpt: 'We spent two weeks using LORE\'s AI-generated narratives. The results were startling — here\'s what we found.',
    date: 'May 8, 2026',
    author: 'Marcus Rivera',
    url: '#',
    featured: true,
  },
  {
    outlet: 'The Block Wire',
    title: 'LORE Integrates Real-Time Exploit Detection Across 15 Blockchains',
    excerpt: 'The platform now monitors smart contract vulnerabilities in real-time, alerting users before exploits happen.',
    date: 'April 22, 2026',
    author: 'Elena Volkov',
    url: '#',
    featured: false,
  },
  {
    outlet: 'CoinDesk',
    title: 'AI Meets On-Chain: LORE\'s Approach to Smarter Crypto Intelligence',
    excerpt: 'In a market flooded with data, LORE is betting that AI-curated narratives will be the edge that matters.',
    date: 'April 10, 2026',
    author: 'James Park',
    url: '#',
    featured: false,
  },
  {
    outlet: 'Bankless',
    title: 'Why Smart Money Is Flocking to LORE\'s Whale Tracking Tools',
    excerpt: 'On-chain sleuths and professional traders alike are turning to LORE for its unmatched wallet intelligence.',
    date: 'March 28, 2026',
    author: 'David Kim',
    url: '#',
    featured: false,
  },
  {
    outlet: 'Decrypt',
    title: 'LORE Terminal: A New Command Center for Crypto Traders',
    excerpt: 'The platform\'s terminal interface brings institutional-grade analytics to retail traders for the first time.',
    date: 'March 15, 2026',
    author: 'Priya Sharma',
    url: '#',
    featured: false,
  },
];

const companyFacts = [
  { label: 'Founded', value: '2024' },
  { label: 'Headquarters', value: 'Zurich, Switzerland' },
  { label: 'Employees', value: '45+' },
  { label: 'Funding', value: '$16.5M' },
  { label: 'Chains Monitored', value: '15+' },
  { label: 'Signals Processed', value: '2B+/day' },
];

const boilerplate = `Lore Intelligence (LORE) is the intelligence layer for crypto markets. Powered by advanced AI and real-time on-chain analysis, LORE processes over 2 billion signals daily across 15+ blockchains to deliver actionable intelligence to traders, institutions, and DeFi protocols. The platform combines whale tracking, exploit detection, narrative generation, and smart money monitoring into a unified terminal experience. Founded in 2024 and headquartered in Zurich, Switzerland, LORE is backed by leading crypto-native investors and serves over 10,000 active users worldwide.`;

export default function PressPage() {
  const [expandedKit, setExpandedKit] = useState<number | null>(null);
  const [downloadedKits, setDownloadedKits] = useState<Set<number>>(new Set());

  const handleDownload = (index: number) => {
    setDownloadedKits((prev) => new Set(prev).add(index));
    setTimeout(() => {
      setDownloadedKits((prev) => {
        const next = new Set(prev);
        next.delete(index);
        return next;
      });
    }, 2500);
  };

  return (
    <main className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background gradient orbs */}
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-[var(--color-primary)]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-[var(--color-secondary)]/5 rounded-full blur-[100px] pointer-events-none" />

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative max-w-[1280px] mx-auto px-5 lg:px-20"
        >
          <motion.div variants={item} className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 mb-6">
              <Newspaper size={14} className="text-[var(--color-primary)]" />
              <span className="text-xs font-data text-[var(--color-primary)] tracking-wide">PRESS & MEDIA</span>
            </div>

            <h1 className="text-h1 font-display text-white mb-6">
              LORE in the{' '}
              <span className="text-gradient">Headlines</span>
            </h1>

            <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-8">
              Access our press kit, read recent media coverage, and get in touch with our communications team.
              Everything you need to tell the LORE story.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#press-kit"
                className="btn-primary inline-flex items-center gap-2 text-sm"
              >
                <Download size={16} />
                Download Press Kit
              </a>
              <a
                href="#contact"
                className="btn-secondary inline-flex items-center gap-2 text-sm"
              >
                <Mail size={16} />
                Media Contact
              </a>
            </div>
          </motion.div>

          {/* Company Facts Bar */}
          <motion.div variants={item} className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {companyFacts.map((fact) => (
              <div
                key={fact.label}
                className="card-glass rounded-xl p-4 text-center"
              >
                <div className="text-xl font-display font-bold text-white">{fact.value}</div>
                <div className="text-xs text-[var(--color-text-muted)] font-data mt-1">{fact.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Press Kit Download Section */}
      <section id="press-kit" className="py-20 relative">
        <div className="absolute inset-0 bg-[var(--color-bg-surface)]/50 pointer-events-none" />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="relative max-w-[1280px] mx-auto px-5 lg:px-20"
        >
          <motion.div variants={item} className="text-center mb-14">
            <h2 className="text-h2 font-display text-white mb-4">
              Press Kit & Brand Assets
            </h2>
            <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
              Download everything you need to cover LORE. All assets are provided under our media usage guidelines.
              For custom requests, please reach out to our team.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {pressKitItems.map((kit, index) => {
              const Icon = kit.icon;
              const isExpanded = expandedKit === index;
              const isDownloaded = downloadedKits.has(index);

              return (
                <motion.div
                  key={kit.title}
                  variants={item}
                  className="card-glass rounded-2xl overflow-hidden group"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 flex items-center justify-center">
                          <Icon size={22} className="text-[var(--color-primary)]" />
                        </div>
                        <div>
                          <h3 className="font-display font-semibold text-white group-hover:text-[var(--color-primary)] transition-colors">
                            {kit.title}
                          </h3>
                          <span className="text-xs text-[var(--color-text-muted)] font-data">{kit.size}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDownload(index)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                          isDownloaded
                            ? 'bg-[var(--color-positive)]/10 text-[var(--color-positive)] border border-[var(--color-positive)]/20'
                            : 'bg-[var(--color-primary)] text-white hover:brightness-110'
                        }`}
                      >
                        {isDownloaded ? (
                          <>
                            <CheckCircle size={14} />
                            Downloaded
                          </>
                        ) : (
                          <>
                            <Download size={14} />
                            Download
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4">
                      {kit.description}
                    </p>

                    <button
                      onClick={() => setExpandedKit(isExpanded ? null : index)}
                      className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors"
                    >
                      {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      {isExpanded ? 'Hide' : 'Show'} files ({kit.files.length})
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-3 pt-3 border-t border-white/5 space-y-2">
                            {kit.files.map((file) => (
                              <div
                                key={file}
                                className="flex items-center gap-2 text-xs text-[var(--color-text-muted)] font-data"
                              >
                                <FileText size={12} className="text-[var(--color-text-muted)]/50" />
                                {file}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Recent Press Mentions */}
      <section className="py-20">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-[1280px] mx-auto px-5 lg:px-20"
        >
          <motion.div variants={item} className="text-center mb-14">
            <h2 className="text-h2 font-display text-white mb-4">
              Recent Press Coverage
            </h2>
            <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
              See what the media is saying about LORE. From funding announcements to product deep-dives,
              stay up to date with our latest coverage.
            </p>
          </motion.div>

          {/* Featured Articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {pressMentions
              .filter((p) => p.featured)
              .map((article, index) => (
                <motion.a
                  key={article.title}
                  variants={item}
                  href={article.url}
                  className="card-glass rounded-2xl p-7 group hover:border-[var(--color-primary)]/20 transition-all cursor-pointer block"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-[var(--color-tertiary)]/10 border border-[var(--color-tertiary)]/20 text-[10px] font-data text-[var(--color-tertiary)] tracking-wider uppercase">
                      {article.outlet}
                    </span>
                    <span className="text-[10px] text-[var(--color-text-muted)] font-data flex items-center gap-1">
                      <Calendar size={10} />
                      {article.date}
                    </span>
                  </div>

                  <h3 className="text-lg font-display font-semibold text-white mb-3 group-hover:text-[var(--color-primary)] transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-5 line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[var(--color-text-muted)] font-data">
                      By {article.author}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity">
                      Read article <ExternalLink size={12} />
                    </span>
                  </div>
                </motion.a>
              ))}
          </div>

          {/* Other Articles List */}
          <div className="space-y-4">
            {pressMentions
              .filter((p) => !p.featured)
              .map((article) => (
                <motion.a
                  key={article.title}
                  variants={item}
                  href={article.url}
                  className="card-glass rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 group hover:border-[var(--color-primary)]/20 transition-all cursor-pointer block"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-data text-[var(--color-text-secondary)] tracking-wider uppercase">
                        {article.outlet}
                      </span>
                      <span className="text-[10px] text-[var(--color-text-muted)] font-data">
                        {article.date}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-white group-hover:text-[var(--color-primary)] transition-colors truncate">
                      {article.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="hidden md:block text-xs text-[var(--color-text-muted)] font-data">
                      {article.author}
                    </span>
                    <ArrowRight size={16} className="text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] group-hover:translate-x-1 transition-all" />
                  </div>
                </motion.a>
              ))}
          </div>
        </motion.div>
      </section>

      {/* Company Boilerplate */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[var(--color-bg-surface)]/50 pointer-events-none" />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="relative max-w-[1280px] mx-auto px-5 lg:px-20"
        >
          <motion.div variants={item} className="max-w-3xl mx-auto">
            <div className="card-glass rounded-2xl p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 flex items-center justify-center">
                  <Building2 size={20} className="text-[var(--color-primary)]" />
                </div>
                <h2 className="text-h2 font-display text-white">About LORE</h2>
              </div>

              <p className="text-[var(--color-text-secondary)] leading-relaxed text-sm">
                {boilerplate}
              </p>

              <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Globe size={16} className="text-[var(--color-text-muted)]" />
                  <span className="text-sm text-[var(--color-text-secondary)]">Zurich, Switzerland</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe size={16} className="text-[var(--color-text-muted)]" />
                  <span className="text-sm text-[var(--color-text-secondary)]">loreintelligence.com</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Media Contact */}
      <section id="contact" className="py-20">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-[1280px] mx-auto px-5 lg:px-20"
        >
          <motion.div variants={item}>
            <div className="card-glass rounded-2xl p-8 md:p-12 max-w-2xl mx-auto text-center">
              <div className="w-14 h-14 rounded-2xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 flex items-center justify-center mx-auto mb-6">
                <Mail size={24} className="text-[var(--color-primary)]" />
              </div>

              <h2 className="text-h2 font-display text-white mb-4">
                Media Inquiries
              </h2>

              <p className="text-[var(--color-text-secondary)] leading-relaxed mb-8 max-w-lg mx-auto">
                For interview requests, press inquiries, or custom asset needs, please reach out to our communications team.
                We typically respond within 24 hours.
              </p>

              <div className="space-y-4">
                <a
                  href="mailto:press@loreintelligence.com"
                  className="btn-primary inline-flex items-center gap-2 text-sm"
                >
                  <Mail size={16} />
                  press@loreintelligence.com
                </a>

                <div className="flex items-center justify-center gap-6 pt-4">
                  <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                    <Phone size={14} />
                    <span className="font-data">+41 44 123 4567</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                    <Globe size={14} className="text-[var(--color-text-muted)]" />
                    <span>Zurich, CH</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5">
                <p className="text-xs text-[var(--color-text-muted)] font-data">
                  For urgent inquiries, please mark your email as &quot;URGENT&quot; in the subject line.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
