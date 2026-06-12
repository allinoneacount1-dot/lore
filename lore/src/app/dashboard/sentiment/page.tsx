'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3, Brain, Globe, Heart, MessageCircle, Search,
  Smile, Frown, Meh, TrendingUp, TrendingDown, Users,
  Zap, ExternalLink, Filter
} from 'lucide-react';

const overallSentiment = { score: 42, label: 'Fear', change: -5 };

const sentimentBreakdown = [
  { source: 'Twitter', bullish: 28, neutral: 35, bearish: 37, volume: '2.4M posts', icon: '𝕏' },
  { source: 'Reddit', bullish: 34, neutral: 41, bearish: 25, volume: '89K posts', icon: '🤖' },
  { source: 'Discord', bullish: 45, neutral: 30, bearish: 25, volume: '156K msgs', icon: '💬' },
  { source: 'Telegram', bullish: 38, neutral: 32, bearish: 30, volume: '320K msgs', icon: '✈️' },
  { source: 'News', bullish: 22, neutral: 43, bearish: 35, volume: '1.2K articles', icon: '📰' },
  { source: 'On-Chain', bullish: 48, neutral: 28, bearish: 24, volume: '4.7M txns', icon: '⛓️' },
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

export default function SentimentPage() {
  const [activeSource, setActiveSource] = useState('All');

  const getSentimentColor = (s: string) => {
    if (s === 'bullish') return 'text-[#00E676]';
    if (s === 'bearish') return 'text-[#FF5252]';
    return 'text-[#42A5F5]';
  };

  const getSentimentBg = (s: string) => {
    if (s === 'bullish') return 'bg-[#00E676]';
    if (s === 'bearish') return 'bg-[#FF5252]';
    return 'bg-[#5A5A72]';
  };

  const getSentimentIcon = (score: number) => {
    if (score >= 75) return <Smile size={24} className="text-[#00E676]" />;
    if (score >= 50) return <Meh size={24} className="text-[#FFD93D]" />;
    if (score >= 25) return <Frown size={24} className="text-[#FF9F43]" />;
    return <Frown size={24} className="text-[#FF5252]" />;
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-h2 font-display text-white">Sentiment Analysis</h1>
        <p className="mt-2 text-[#A0A0B8]">
          Real-time social sentiment from 6 sources. AI-powered mood detection.
        </p>
      </div>

      {/* Overall Sentiment */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-1 card-glass rounded-2xl p-6 flex flex-col items-center justify-center text-center">
          {getSentimentIcon(overallSentiment.score)}
          <div className="text-4xl font-display font-bold text-white mt-3">{overallSentiment.score}</div>
          <div className="text-sm text-[#A0A0B8] mt-1">Fear & Greed Index</div>
          <div className={`mt-2 px-3 py-1 rounded-full text-xs font-medium ${
            overallSentiment.score >= 50 ? 'bg-[#00E676]/10 text-[#00E676]' : 'bg-[#FF5252]/10 text-[#FF5252]'
          }`}>
            {overallSentiment.label}
          </div>
          <div className="mt-2 flex items-center gap-1 text-xs text-[#FF5252]">
            <TrendingDown size={12} />
            {overallSentiment.change}% (24h)
          </div>
        </div>

        <div className="md:col-span-2 card-glass rounded-2xl p-6">
          <h3 className="font-display font-semibold text-white mb-4">Sentiment by Source</h3>
          <div className="space-y-4">
            {sentimentBreakdown.map((source) => (
              <div key={source.source} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-sm">
                  {source.icon}
                </div>
                <div className="w-20 text-sm text-white font-medium">{source.source}</div>
                <div className="flex-1 flex h-3 rounded-full overflow-hidden bg-white/5">
                  <div className="bg-[#00E676] transition-all" style={{ width: `${source.bullish}%` }} />
                  <div className="bg-[#5A5A72] transition-all" style={{ width: `${source.neutral}%` }} />
                  <div className="bg-[#FF5252] transition-all" style={{ width: `${source.bearish}%` }} />
                </div>
                <div className="w-24 text-right">
                  <span className="text-xs text-[#5A5A72] font-data">{source.volume}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-6 mt-4 pt-4 border-t border-white/5">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#00E676]" /><span className="text-xs text-[#5A5A72]">Bullish</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#5A5A72]" /><span className="text-xs text-[#5A5A72]">Neutral</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#FF5252]" /><span className="text-xs text-[#5A5A72]">Bearish</span></div>
          </div>
        </div>
      </div>

      {/* Trending Topics */}
      <div className="card-glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display font-semibold text-white">Trending Topics</h3>
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-[#5A5A72]" />
            <select className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:outline-none">
              <option value="24h" className="bg-[#12121A]">Last 24h</option>
              <option value="7d" className="bg-[#12121A]">Last 7 days</option>
              <option value="30d" className="bg-[#12121A]">Last 30 days</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {trendingTopics.map((topic, i) => (
            <motion.div
              key={topic.topic}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#6C5CE7]/20 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${getSentimentBg(topic.sentiment)}`} />
                <div>
                  <div className="text-sm font-medium text-white">{topic.topic}</div>
                  <div className="text-xs text-[#5A5A72] font-data">{topic.mentions.toLocaleString()} mentions</div>
                </div>
              </div>
              <div className={`flex items-center gap-1 text-xs font-data ${topic.change >= 0 ? 'text-[#00E676]' : 'text-[#FF5252]'}`}>
                {topic.change >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {topic.change >= 0 ? '+' : ''}{topic.change}%
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
