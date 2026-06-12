'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, Clock, Eye, Filter, Globe, Heart, MessageCircle,
  Search, Share2, Star, TrendingUp, TrendingDown, Zap,
  ChevronDown, ExternalLink, Bookmark, ThumbsUp, AlertTriangle
} from 'lucide-react';
import { useToast } from '@/components/Toast';

const categories = ['All', 'DeFi', 'NFT', 'Layer 1', 'Layer 2', 'AI', 'Gaming', 'Regulation'];

const narratives = [
  {
    id: 1,
    title: 'Institutional Bitcoin Accumulation Enters Phase 3',
    summary: 'On-chain data reveals a coordinated accumulation pattern among 12 wallets linked to institutional entities. Historical correlation suggests a 78% probability of significant price movement within 14 days.',
    category: 'Layer 1',
    sentiment: 'bullish',
    confidence: 94,
    timeframe: '14 days',
    sources: 14,
    wallets: 12,
    timestamp: '2 hours ago',
    tags: ['Bitcoin', 'Institutional', 'Accumulation'],
    liked: false,
    bookmarked: true,
  },
  {
    id: 2,
    title: 'DeFi Exploit Pattern Detected: Oracle Manipulation Imminent',
    summary: 'Our AI has identified a pattern matching 3 previous exploits. A flash loan attack targeting Protocol X is highly probable within the next 6 hours. Estimated exposure: $4.2M.',
    category: 'DeFi',
    sentiment: 'bearish',
    confidence: 87,
    timeframe: '6 hours',
    sources: 8,
    wallets: 3,
    timestamp: '45 minutes ago',
    tags: ['DeFi', 'Exploit', 'Oracle', 'Flash Loan'],
    liked: true,
    bookmarked: false,
  },
  {
    id: 3,
    title: 'AI Token Narrative Reaches Critical Mass',
    summary: 'Social sentiment for AI-related tokens has surged 340% in 24 hours. Smart money wallets are accumulating 7 key tokens. Historical pattern suggests 2-5x potential within 30 days.',
    category: 'AI',
    sentiment: 'bullish',
    confidence: 76,
    timeframe: '30 days',
    sources: 11,
    wallets: 23,
    timestamp: '1 hour ago',
    tags: ['AI', 'Sentiment', 'Smart Money'],
    liked: false,
    bookmarked: false,
  },
  {
    id: 4,
    title: 'Layer 2 Activity Surge Signals Altseason Rotation',
    summary: 'L2 transaction volume has increased 180% week-over-week. Capital rotation from L1 to L2 is accelerating. Key beneficiaries: Arbitrum, Optimism, and Base ecosystems.',
    category: 'Layer 2',
    sentiment: 'bullish',
    confidence: 82,
    timeframe: '7 days',
    sources: 9,
    wallets: 45,
    timestamp: '3 hours ago',
    tags: ['Layer 2', 'Altseason', 'Arbitrum', 'Optimism'],
    liked: false,
    bookmarked: true,
  },
  {
    id: 5,
    title: 'Regulatory Pressure Building on Stablecoin Issuers',
    summary: 'Three regulatory bodies have issued coordinated statements. Stablecoin issuers face new compliance requirements. USDC and USDT flows show early signs of de-risking.',
    category: 'Regulation',
    sentiment: 'bearish',
    confidence: 71,
    timeframe: '90 days',
    sources: 6,
    wallets: 8,
    timestamp: '5 hours ago',
    tags: ['Regulation', 'Stablecoins', 'Compliance'],
    liked: false,
    bookmarked: false,
  },
  {
    id: 6,
    title: 'NFT Floor Prices Forming Macro Bottom',
    summary: 'Blue-chip NFT floor prices have stabilized after 18 months of decline. Whale accumulation detected across 5 major collections. Historical pattern suggests early-stage recovery.',
    category: 'NFT',
    sentiment: 'bullish',
    confidence: 68,
    timeframe: '60 days',
    sources: 7,
    wallets: 15,
    timestamp: '4 hours ago',
    tags: ['NFT', 'Bottom', 'Whale Accumulation'],
    liked: false,
    bookmarked: false,
  },
];

export default function NarrativesPage() {
  const { showToast } = useToast();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [narrativeList, setNarrativeList] = useState(narratives);

  const filtered = narrativeList.filter((n) => {
    const matchCategory = activeCategory === 'All' || n.category === activeCategory;
    const matchSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCategory && matchSearch;
  });

  const toggleLike = (id: number) => {
    setNarrativeList((prev) =>
      prev.map((n) => (n.id === id ? { ...n, liked: !n.liked } : n))
    );
    const n = narrativeList.find((x) => x.id === id);
    showToast(n?.liked ? 'Removed from liked' : 'Added to liked', 'success');
  };

  const toggleBookmark = (id: number) => {
    setNarrativeList((prev) =>
      prev.map((n) => (n.id === id ? { ...n, bookmarked: !n.bookmarked } : n))
    );
    const n = narrativeList.find((x) => x.id === id);
    showToast(n?.bookmarked ? 'Removed from bookmarks' : 'Bookmarked', 'success');
  };

  const getSentimentColor = (s: string) => {
    if (s === 'bullish') return 'text-[var(--color-positive)] bg-[var(--color-positive)]/10 border-[var(--color-positive)]/20';
    if (s === 'bearish') return 'text-[var(--color-negative)] bg-[var(--color-negative)]/10 border-[#FF5252]/20';
    return 'text-[var(--color-info)] bg-[var(--color-info)]/10 border-[#42A5F5]/20';
  };

  const getSentimentIcon = (s: string) => {
    if (s === 'bullish') return <TrendingUp size={14} />;
    if (s === 'bearish') return <TrendingDown size={14} />;
    return <Zap size={14} />;
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-h2 font-display text-white">Narratives</h1>
        <p className="mt-2 text-[var(--color-text-secondary)]">
          AI-generated market narratives from 14+ data sources. Updated in real-time.
        </p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
          <input
            type="text"
            placeholder="Search narratives, tags, categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)]/50 focus:ring-1 focus:ring-[var(--color-primary)]/20 transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-[var(--color-text-muted)]" />
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/30'
                    : 'bg-white/5 text-[var(--color-text-secondary)] border border-white/10 hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Active Narratives', value: '24', icon: Brain },
          { label: 'Avg. Confidence', value: '79%', icon: Star },
          { label: 'Data Sources', value: '14', icon: Globe },
          { label: 'Wallets Tracked', value: '12.8K', icon: Eye },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="card-glass rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon size={14} className="text-[var(--color-primary)]" />
                <span className="text-xs text-[var(--color-text-muted)] font-data">{stat.label}</span>
              </div>
              <div className="text-2xl font-display font-bold text-white">{stat.value}</div>
            </div>
          );
        })}
      </div>

      {/* Narrative Cards */}
      <div className="space-y-4">
        <AnimatePresence>
          {filtered.map((narrative, i) => (
            <motion.div
              key={narrative.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: i * 0.05 }}
              className="card-glass rounded-2xl overflow-hidden hover:border-[var(--color-primary)]/20 transition-all"
            >
              <div className="p-6">
                {/* Top Row */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${getSentimentColor(narrative.sentiment)}`}>
                        {getSentimentIcon(narrative.sentiment)}
                        {narrative.sentiment.charAt(0).toUpperCase() + narrative.sentiment.slice(1)}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/5 text-[var(--color-text-secondary)] border border-white/10">
                        {narrative.category}
                      </span>
                      <span className="font-data text-xs text-[var(--color-text-muted)] flex items-center gap-1">
                        <Clock size={12} />
                        {narrative.timestamp}
                      </span>
                    </div>
                    <h3 className="font-display font-semibold text-lg text-white mb-2">
                      {narrative.title}
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      {narrative.summary}
                    </p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {narrative.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 rounded-md text-xs font-data bg-white/5 text-[var(--color-text-muted)]">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Bottom Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <div className="w-16 h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${narrative.confidence >= 80 ? 'bg-[var(--color-positive)]' : narrative.confidence >= 60 ? 'bg-[var(--color-warning)]' : 'bg-[var(--color-negative)]'}`}
                          style={{ width: `${narrative.confidence}%` }}
                        />
                      </div>
                      <span className="font-data text-xs text-[var(--color-text-muted)]">{narrative.confidence}% confidence</span>
                    </div>
                    <span className="font-data text-xs text-[var(--color-text-muted)]">{narrative.sources} sources</span>
                    <span className="font-data text-xs text-[var(--color-text-muted)]">{narrative.wallets} wallets</span>
                    <span className="font-data text-xs text-[var(--color-text-muted)]">ETA: {narrative.timeframe}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleLike(narrative.id)}
                      className={`p-2 rounded-lg transition-colors ${narrative.liked ? 'bg-[var(--color-negative)]/10 text-[var(--color-negative)]' : 'hover:bg-white/5 text-[var(--color-text-muted)]'}`}
                    >
                      <Heart size={16} fill={narrative.liked ? 'currentColor' : 'none'} />
                    </button>
                    <button
                      onClick={() => toggleBookmark(narrative.id)}
                      className={`p-2 rounded-lg transition-colors ${narrative.bookmarked ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : 'hover:bg-white/5 text-[var(--color-text-muted)]'}`}
                    >
                      <Bookmark size={16} fill={narrative.bookmarked ? 'currentColor' : 'none'} />
                    </button>
                    <button
                      onClick={() => showToast('Shared to clipboard!', 'success')}
                      className="p-2 rounded-lg hover:bg-white/5 text-[var(--color-text-muted)] transition-colors"
                    >
                      <Share2 size={16} />
                    </button>
                    <button
                      onClick={() => setExpandedId(expandedId === narrative.id ? null : narrative.id)}
                      className="p-2 rounded-lg hover:bg-white/5 text-[var(--color-text-muted)] transition-colors"
                    >
                      <ChevronDown size={16} className={`transition-transform ${expandedId === narrative.id ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              <AnimatePresence>
                {expandedId === narrative.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-white/5 overflow-hidden"
                  >
                    <div className="p-6 bg-white/[0.02]">
                      <h4 className="font-display font-semibold text-sm text-white mb-3">Key Insights</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                          <div className="text-xs text-[var(--color-text-muted)] mb-1">Pattern Match</div>
                          <div className="text-sm text-white">Matches 3 previous institutional accumulation cycles with 94% similarity</div>
                        </div>
                        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                          <div className="text-xs text-[var(--color-text-muted)] mb-1">Risk Assessment</div>
                          <div className="text-sm text-white">Low risk of false positive. Multiple independent sources confirm the pattern.</div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button onClick={() => showToast('Opening full analysis...', 'info')} className="btn-primary text-sm !px-4 !py-2 !rounded-lg">
                          View Full Analysis
                        </button>
                        <button
                          onClick={() => showToast('Opening block explorer...', 'info')}
                          className="btn-secondary text-sm !px-4 !py-2 !rounded-lg flex items-center gap-2"
                        >
                          <ExternalLink size={14} />
                          View on Explorer
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <Brain size={48} className="mx-auto text-[var(--color-text-muted)] mb-4" />
          <h3 className="font-display font-semibold text-lg text-white mb-2">No narratives found</h3>
          <p className="text-sm text-[var(--color-text-muted)]">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
}
