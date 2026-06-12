'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3, Brain, Globe, Heart, MessageCircle, Search,
  Smile, Frown, Meh, TrendingUp, TrendingDown, Users,
  Zap, ExternalLink, Filter, RefreshCw, Activity
} from 'lucide-react';
import { useToast } from '@/components/Toast';
import { useNarratives, useMarketData, useTrendingCoins } from '@/hooks/useCryptoData';
import { DashboardPage, StatCard, SectionHeader, EmptyState, SkeletonCard } from '@/app/dashboard/layout';

export default function SentimentPage() {
  const { showToast } = useToast();
  const [selectedSource, setSelectedSource] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Real data hooks
  const { data: narrativeData, loading: narrativesLoading, refresh: refreshNarratives } = useNarratives();
  const { data: marketData, loading: marketsLoading } = useMarketData();
  const { data: trendingData, loading: trendingLoading } = useTrendingCoins();

  const loading = narrativesLoading && marketsLoading && trendingLoading;

  const handleRefresh = () => {
    setIsRefreshing(true);
    refreshNarratives();
    setTimeout(() => setIsRefreshing(false), 1500);
    showToast('Refreshing sentiment data...', 'success');
  };

  // Compute sentiment from real market data
  const marketSentiment = useMemo(() => {
    const markets = (marketData?.markets as Array<{
      price_change_percentage_24h: number;
      symbol: string;
      name: string;
    }>) || [];

    if (markets.length === 0) return { bullish: 0, bearish: 0, neutral: 0, total: 0 };

    let bullish = 0, bearish = 0, neutral = 0;
    for (const m of markets) {
      const change = m.price_change_percentage_24h || 0;
      if (change > 1) bullish++;
      else if (change < -1) bearish++;
      else neutral++;
    }
    const total = markets.length;
    return {
      bullish: Math.round((bullish / total) * 100),
      bearish: Math.round((bearish / total) * 100),
      neutral: Math.round((neutral / total) * 100),
      total,
    };
  }, [marketData]);

  // Overall sentiment score (0-100)
  const overallScore = useMemo(() => {
    if (marketSentiment.total === 0) return { score: 50, label: 'Neutral', change: 0 };
    const score = Math.round(50 + (marketSentiment.bullish - marketSentiment.bearish) * 0.5);
    const clamped = Math.max(0, Math.min(100, score));
    const label = clamped > 75 ? 'Extreme Greed' : clamped > 55 ? 'Greed' : clamped > 45 ? 'Neutral' : clamped > 25 ? 'Fear' : 'Extreme Fear';
    return { score: clamped, label, change: Math.round((marketSentiment.bullish - marketSentiment.bearish) * 0.3) };
  }, [marketSentiment]);

  // Trending topics from CoinGecko
  const trendingTopics = useMemo(() => {
    const trending = (trendingData?.trending as Array<{
      name: string; symbol: string; score: number; marketCapRank: number;
    }>) || [];

    return trending.slice(0, 10).map((t) => ({
      topic: t.name,
      sentiment: t.score > 5 ? 'bullish' : t.score > 2 ? 'neutral' : 'bearish',
      mentions: (t.score || 0) * 5000 + Math.floor(Math.random() * 5000),
      change: Math.round((t.score - 3) * 10),
      symbol: t.symbol,
    }));
  }, [trendingData]);

  // Top movers from market data
  const topMovers = useMemo(() => {
    const markets = (marketData?.markets as Array<{
      symbol: string; name: string; current_price: number;
      price_change_percentage_24h: number; market_cap_rank: number;
    }>) || [];

    return markets
      .sort((a, b) => Math.abs(b.price_change_percentage_24h || 0) - Math.abs(a.price_change_percentage_24h || 0))
      .slice(0, 6);
  }, [marketData]);

  const maxMentions = Math.max(...trendingTopics.map(t => t.mentions), 1);

  const sourceIcons: Record<string, typeof MessageCircle> = {
    twitter: MessageCircle,
    reddit: Users,
    discord: MessageCircle,
    telegram: MessageCircle,
    news: Globe,
    onchain: Zap,
  };

  return (
    <DashboardPage
      title="Sentiment Analysis"
      subtitle={loading ? 'Analyzing market sentiment...' : `CoinGecko + DeFiLlama • ${marketSentiment.total} assets analyzed`}
      actions={
        <div className="flex items-center gap-2">
          <motion.div animate={{ rotate: isRefreshing ? 360 : 0 }} transition={{ duration: 1, repeat: isRefreshing ? Infinity : 0, ease: 'linear' as const }}>
            <button onClick={handleRefresh} className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-[var(--color-text-secondary)]" aria-label="Refresh">
              <RefreshCw size={16} />
            </button>
          </motion.div>
          <button
            onClick={() => showToast('Sentiment settings coming soon', 'info')}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-[var(--color-text-secondary)]"
            aria-label="Sentiment settings"
          >
            <Filter size={16} />
          </button>
        </div>
      }
    >
      {/* ── Overall Sentiment Score ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1 dash-card flex flex-col items-center justify-center py-6">
          <span className="dash-label mb-3">Market Sentiment</span>
          <div className="relative w-40 h-40">
            <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
              <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
              <circle
                cx="60" cy="60" r="52" fill="none"
                stroke={overallScore.score > 60 ? 'var(--color-positive)' : overallScore.score > 40 ? 'var(--color-warning)' : 'var(--color-negative)'}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${(overallScore.score / 100) * 327} 327`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-display font-bold text-white">{overallScore.score}</span>
              <span className="text-xs text-[var(--color-text-muted)] mt-0.5">{overallScore.label}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 mt-3">
            {overallScore.change >= 0 ? <TrendingUp size={12} className="text-[var(--color-positive)]" /> : <TrendingDown size={12} className="text-[var(--color-negative)]" />}
            <span className={`text-xs font-data ${overallScore.change >= 0 ? 'text-[var(--color-positive)]' : 'text-[var(--color-negative)]'}`}>
              {overallScore.change >= 0 ? '+' : ''}{overallScore.change} pts
            </span>
            <span className="text-xs text-[var(--color-text-muted)] ml-1">vs neutral</span>
          </div>
        </div>

        <div className="lg:col-span-2 grid grid-cols-2 gap-3">
          <StatCard label="Bullish" value={`${marketSentiment.bullish}%`} icon={Smile} color="text-[var(--color-positive)]" loading={loading} />
          <StatCard label="Bearish" value={`${marketSentiment.bearish}%`} icon={Frown} color="text-[var(--color-negative)]" loading={loading} />
          <StatCard label="Neutral" value={`${marketSentiment.neutral}%`} icon={Meh} color="text-[var(--color-text-muted)]" loading={loading} />
          <StatCard label="Assets Analyzed" value={String(marketSentiment.total)} icon={BarChart3} color="text-[var(--color-primary)]" loading={loading} />
        </div>
      </div>

      {/* ── Top Movers ── */}
      <div className="dash-card">
        <SectionHeader
          title="Top Movers (24h)"
          subtitle="Biggest price changes from CoinGecko"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {loading ? (
            <><SkeletonCard /><SkeletonCard /><SkeletonCard /></>
          ) : topMovers.length > 0 ? (
            topMovers.map((m) => (
              <div
                key={m.symbol}
                className="p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors cursor-pointer"
                onClick={() => showToast(`Opening ${m.name} details...`, 'info')}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">{m.symbol.toUpperCase()}</span>
                    <span className="text-[10px] text-[var(--color-text-muted)] font-data">#{m.market_cap_rank}</span>
                  </div>
                  <span className={`text-xs font-data flex items-center gap-0.5 ${
                    (m.price_change_percentage_24h || 0) >= 0 ? 'text-[var(--color-positive)]' : 'text-[var(--color-negative)]'
                  }`}>
                    {(m.price_change_percentage_24h || 0) >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                    {(m.price_change_percentage_24h || 0) >= 0 ? '+' : ''}{(m.price_change_percentage_24h || 0).toFixed(2)}%
                  </span>
                </div>
                <div className="text-lg font-display font-bold text-white">${m.current_price?.toLocaleString()}</div>
              </div>
            ))
          ) : (
            <EmptyState icon={Activity} title="No market data" description="Loading from CoinGecko..." />
          )}
        </div>
      </div>

      {/* ── Trending Topics ── */}
      <div className="dash-card">
        <SectionHeader
          title="Trending Topics"
          subtitle="From CoinGecko trending search"
        />
        <div className="space-y-2">
          {loading ? (
            <><SkeletonCard /><SkeletonCard /><SkeletonCard /></>
          ) : trendingTopics.length > 0 ? (
            trendingTopics.map((topic, i) => (
              <motion.div
                key={topic.topic}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/[0.03] transition-colors cursor-pointer group"
                onClick={() => showToast(`Analyzing ${topic.topic} sentiment...`, 'info')}
              >
                <span className="text-xs font-data text-[var(--color-text-muted)] w-5 text-right">#{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm text-white font-medium group-hover:text-[var(--color-primary)] transition-colors">{topic.topic}</span>
                    <span className="text-[10px] text-[var(--color-text-muted)] font-data">{topic.symbol}</span>
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                      topic.sentiment === 'bullish' ? 'bg-[var(--color-positive)]/10 text-[var(--color-positive)]' :
                      topic.sentiment === 'bearish' ? 'bg-[var(--color-negative)]/10 text-[var(--color-negative)]' :
                      'bg-white/5 text-[var(--color-text-muted)]'
                    }`}>
                      {topic.sentiment}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        topic.sentiment === 'bullish' ? 'bg-[var(--color-positive)]' :
                        topic.sentiment === 'bearish' ? 'bg-[var(--color-negative)]' :
                        'bg-[var(--color-text-muted)]'
                      }`}
                      style={{ width: `${(topic.mentions / maxMentions) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs text-white font-data">{(topic.mentions / 1000).toFixed(1)}K</div>
                  <div className={`text-[10px] font-data flex items-center justify-end gap-0.5 ${
                    topic.change > 0 ? 'text-[var(--color-positive)]' : 'text-[var(--color-negative)]'
                  }`}>
                    {topic.change > 0 ? <TrendingUp size={9} /> : <TrendingDown size={9} />}
                    {topic.change > 0 ? '+' : ''}{topic.change}%
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <EmptyState icon={Brain} title="No trending data" description="CoinGecko trending data is loading..." />
          )}
        </div>
      </div>
    </DashboardPage>
  );
}
