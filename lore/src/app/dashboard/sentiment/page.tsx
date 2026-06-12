'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3, Brain, Globe, Heart, MessageCircle, Search,
  Smile, Frown, Meh, TrendingUp, TrendingDown, Users,
  Zap, ExternalLink, Filter
} from 'lucide-react';
import { useToast } from '@/components/Toast';
import { DashboardPage, StatCard, SectionHeader, EmptyState } from '@/app/dashboard/layout';

const overallSentiment = { score: 42, label: 'Fear', change: -5 };

const sentimentBreakdown = [
  { source: 'Twitter', bullish: 28, neutral: 35, bearish: 37, volume: '2.4M posts', type: 'twitter' as const },
  { source: 'Reddit', bullish: 34, neutral: 41, bearish: 25, volume: '89K posts', type: 'reddit' as const },
  { source: 'Discord', bullish: 45, neutral: 30, bearish: 25, volume: '156K msgs', type: 'discord' as const },
  { source: 'Telegram', bullish: 38, neutral: 32, bearish: 30, volume: '320K msgs', type: 'telegram' as const },
  { source: 'News', bullish: 22, neutral: 43, bearish: 35, volume: '1.2K articles', type: 'news' as const },
  { source: 'On-Chain', bullish: 48, neutral: 28, bearish: 24, volume: '4.7M txns', type: 'onchain' as const },
];

const trendingTopics = [
  { topic: 'Bitcoin ETF', sentiment: 'bullish', mentions: 45200, change: 12 },
  { topic: 'Ethereum Upgrade', sentiment: 'bullish', mentions: 32100, change: 8 },
  { topic: 'AI Tokens', sentiment: 'bullish', mentions: 28400, change: 34 },
  { topic: 'Regulation', sentiment: 'bearish', mentions: 21800, change: -15 },
  { topic: 'Solana', sentiment: 'bullish', mentions: 18900, change: 22 },
  { topic: 'DeFi Exploits', sentiment: 'bearish', mentions: 15600, change: -8 },
  { topic: 'NFT Market', sentiment: 'neutral', mentions: 12300, change: 3 },
  { topic: 'Layer 2', sentiment: 'bullish', mentions: 11800, change: 18 },
];

const sourceIcons: Record<string, typeof MessageCircle> = {
  twitter: MessageCircle,
  reddit: Users,
  discord: MessageCircle,
  telegram: MessageCircle,
  news: Globe,
  onchain: Zap,
};

export default function SentimentPage() {
  const { showToast } = useToast();
  const [selectedSource, setSelectedSource] = useState('all');

  const maxMentions = Math.max(...trendingTopics.map(t => t.mentions));

  return (
    <DashboardPage
      title="Sentiment Analysis"
      subtitle="Real-time social sentiment from 6 data sources"
      actions={
        <button
          onClick={() => showToast('Sentiment settings coming soon', 'info')}
          className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-[var(--color-text-secondary)]"
          aria-label="Sentiment settings"
        >
          <Filter size={16} />
        </button>
      }
    >
      {/* ── Overall Sentiment Score ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1 dash-card flex flex-col items-center justify-center py-6">
          <span className="dash-label mb-3">Fear & Greed Index</span>
          <div className="relative w-40 h-40">
            <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
              <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
              <circle
                cx="60" cy="60" r="52" fill="none"
                stroke={overallSentiment.score > 60 ? 'var(--color-positive)' : overallSentiment.score > 40 ? 'var(--color-warning)' : 'var(--color-negative)'}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${(overallSentiment.score / 100) * 327} 327`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-display font-bold text-white">{overallSentiment.score}</span>
              <span className="text-xs text-[var(--color-text-muted)] mt-0.5">{overallSentiment.label}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 mt-3">
            <TrendingDown size={12} className="text-[var(--color-negative)]" />
            <span className="text-xs text-[var(--color-negative)] font-data">{overallSentiment.change} pts</span>
            <span className="text-xs text-[var(--color-text-muted)] ml-1">vs yesterday</span>
          </div>
        </div>

        <div className="lg:col-span-2 grid grid-cols-2 gap-3">
          <StatCard label="Bullish %" value="34%" icon={Smile} color="text-[var(--color-positive)]" />
          <StatCard label="Bearish %" value="29%" icon={Frown} color="text-[var(--color-negative)]" />
          <StatCard label="Neutral %" value="37%" icon={Meh} color="text-[var(--color-text-muted)]" />
          <StatCard label="Data Points" value="7.2M" icon={BarChart3} color="text-[var(--color-primary)]" />
        </div>
      </div>

      {/* ── Source Breakdown ── */}
      <div className="dash-card">
        <SectionHeader
          title="Sentiment by Source"
          subtitle="Breakdown across platforms"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {sentimentBreakdown.map((source) => {
            const Icon = sourceIcons[source.type] || Globe;
            const total = source.bullish + source.neutral + source.bearish;
            return (
              <div
                key={source.source}
                className="p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors cursor-pointer"
                onClick={() => showToast(`Opening ${source.source} sentiment details...`, 'info')}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Icon size={14} className="text-[var(--color-primary)]" />
                    <span className="text-sm font-medium text-white">{source.source}</span>
                  </div>
                  <span className="text-[10px] text-[var(--color-text-muted)] font-data">{source.volume}</span>
                </div>
                <div className="flex h-2 rounded-full overflow-hidden bg-white/5">
                  <div className="bg-[var(--color-positive)]" style={{ width: `${(source.bullish / total) * 100}%` }} />
                  <div className="bg-[var(--color-text-muted)]" style={{ width: `${(source.neutral / total) * 100}%` }} />
                  <div className="bg-[var(--color-negative)]" style={{ width: `${(source.bearish / total) * 100}%` }} />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[10px] text-[var(--color-positive)] font-data">{source.bullish}%</span>
                  <span className="text-[10px] text-[var(--color-text-muted)] font-data">{source.neutral}%</span>
                  <span className="text-[10px] text-[var(--color-negative)] font-data">{source.bearish}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Trending Topics ── */}
      <div className="dash-card">
        <SectionHeader
          title="Trending Topics"
          subtitle="By mention volume (24h)"
        />
        <div className="space-y-2">
          {trendingTopics.map((topic, i) => (
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
          ))}
        </div>
      </div>
    </DashboardPage>
  );
}
