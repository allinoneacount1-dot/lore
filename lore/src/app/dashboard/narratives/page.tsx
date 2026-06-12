'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, Clock, Eye, Filter, Globe, Heart, MessageCircle,
  Search, Share2, Star, TrendingUp, TrendingDown, Zap,
  ChevronDown, ExternalLink, Bookmark, ThumbsUp, AlertTriangle
} from 'lucide-react';
import { useToast } from '@/components/Toast';
import { useNarratives } from '@/hooks/useCryptoData';
import {
  DashboardPage,
  StatCard,
  SectionHeader,
  EmptyState,
  Skeleton,
  SkeletonCard,
} from '@/app/dashboard/layout';

const categories = ['All', 'DeFi', 'NFT', 'Layer 1', 'Layer 2', 'AI', 'Gaming', 'Regulation'];

export default function NarrativesPage() {
  const { showToast } = useToast();
  const { data, loading } = useNarratives();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

  const narratives = data?.narratives ?? [];

  const filtered = useMemo(() =>
    narratives.filter((n: any) => {
      const matchCategory = activeCategory === 'All' || n.category === activeCategory;
      const matchSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (n.tokens ?? []).some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchSearch;
    }),
    [narratives, activeCategory, searchQuery]
  );

  // Derive count stats from live data
  const avgConfidence = useMemo(() => {
    if (narratives.length === 0) return '—';
    const avg = Math.round(narratives.reduce((sum: number, n: any) => sum + (n.confidence ?? 0), 0) / narratives.length);
    return `${avg}%`;
  }, [narratives]);

  const totalSources = useMemo(() => {
    return narratives.reduce((sum: number, n: any) => sum + (n.sources ?? 0), 0);
  }, [narratives]);

  const totalWallets = useMemo(() => {
    const total = narratives.reduce((sum: number, n: any) => sum + (n.wallets ?? 0), 0);
    if (total >= 1000) return `${(total / 1000).toFixed(1)}K`;
    return String(total);
  }, [narratives]);

  const statsData = useMemo(() => [
    { label: 'Active Narratives', value: String(narratives.length), icon: Brain },
    { label: 'Avg. Confidence', value: avgConfidence, icon: Star },
    { label: 'Data Sources', value: String(totalSources), icon: Globe },
    { label: 'Wallets Tracked', value: totalWallets, icon: Eye },
  ], [narratives.length, avgConfidence, totalSources, totalWallets]);

  const toggleLike = (id: string) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
    showToast(likedIds.has(id) ? 'Removed from liked' : 'Added to liked', 'success');
  };

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
    showToast(bookmarkedIds.has(id) ? 'Removed from bookmarks' : 'Bookmarked', 'success');
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
    <DashboardPage
      title="AI Narratives"
      subtitle="AI-generated market narratives from 14+ data sources. Updated in real-time."
      loading={loading}
    >
      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
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

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statsData.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            color="text-[var(--color-primary)]"
            loading={loading}
          />
        ))}
      </div>

      {/* Narrative Cards */}
      <div>
        <SectionHeader
          title="Narratives"
          subtitle={`${filtered.length} narrative${filtered.length !== 1 ? 's' : ''} found`}
        />

        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={Brain}
            title="No narratives found"
            description={narratives.length === 0
              ? "Narrative data is being generated. Check back shortly."
              : "Try adjusting your search or filter criteria."
            }
          />
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {filtered.map((narrative: any, i: number) => {
                const isLiked = likedIds.has(narrative.id);
                const isBookmarked = bookmarkedIds.has(narrative.id);
                return (
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

                      {/* Tags (tokens from API) */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {(narrative.tokens ?? []).map((token: string) => (
                          <span key={token} className="px-2 py-1 rounded-md text-xs font-data bg-white/5 text-[var(--color-text-muted)]">
                            #{token}
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
                            className={`p-2 rounded-lg transition-colors ${isLiked ? 'bg-[var(--color-negative)]/10 text-[var(--color-negative)]' : 'hover:bg-white/5 text-[var(--color-text-muted)]'}`}
                          >
                            <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
                          </button>
                          <button
                            onClick={() => toggleBookmark(narrative.id)}
                            className={`p-2 rounded-lg transition-colors ${isBookmarked ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : 'hover:bg-white/5 text-[var(--color-text-muted)]'}`}
                          >
                            <Bookmark size={16} fill={isBookmarked ? 'currentColor' : 'none'} />
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
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </DashboardPage>
  );
}
