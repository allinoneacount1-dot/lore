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

function SocialLogo({ type, className }: { type: string; className?: string }) {
  switch (type) {
    case 'twitter':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      );
    case 'reddit':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
        </svg>
      );
    case 'discord':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/>
        </svg>
      );
    case 'telegram':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      );
    case 'news':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
          <path d="M18 14h-8"/>
          <path d="M15 18h-5"/>
          <path d="M10 6h8v4h-8V6Z"/>
        </svg>
      );
    case 'onchain':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2"/>
          <path d="M9 8h6l-3 8-3-8z"/>
        </svg>
      );
    default:
      return null;
  }
}

function FearGreedGauge({ score }: { score: number }) {
  // Map score 0-100 to angle -90 to 90 degrees
  const angle = -90 + (score / 100) * 180;
  const getColor = (s: number) => {
    if (s >= 75) return '#00E676';
    if (s >= 55) return '#69F0AE';
    if (s >= 45) return '#FFD93D';
    if (s >= 25) return '#FF9F43';
    return '#FF5252';
  };
  const getLabel = (s: number) => {
    if (s >= 75) return 'Extreme Greed';
    if (s >= 55) return 'Greed';
    if (s >= 45) return 'Neutral';
    if (s >= 25) return 'Fear';
    return 'Extreme Fear';
  };
  const color = getColor(score);
  const label = getLabel(score);

  return (
    <div className="relative flex flex-col items-center">
      {/* Gauge background */}
      <svg viewBox="0 0 200 120" className="w-full max-w-[260px]">
        {/* Background arc segments */}
        <path d="M 20 100 A 80 80 0 0 1 56 36" fill="none" stroke="#FF5252" strokeWidth="12" strokeLinecap="round" opacity="0.3"/>
        <path d="M 56 36 A 80 80 0 0 1 100 20" fill="none" stroke="#FF9F43" strokeWidth="12" strokeLinecap="round" opacity="0.3"/>
        <path d="M 100 20 A 80 80 0 0 1 144 36" fill="none" stroke="#FFD93D" strokeWidth="12" strokeLinecap="round" opacity="0.3"/>
        <path d="M 144 36 A 80 80 0 0 1 180 100" fill="none" stroke="#00E676" strokeWidth="12" strokeLinecap="round" opacity="0.3"/>

        {/* Colored active arc */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth="12"
          strokeLinecap="round"
        />

        {/* Needle */}
        <g transform={`rotate(${angle}, 100, 100)`}>
          <line x1="100" y1="100" x2="100" y2="35" stroke={color} strokeWidth="3" strokeLinecap="round"/>
          <circle cx="100" cy="100" r="6" fill={color}/>
          <circle cx="100" cy="100" r="3" fill="#0D0D12"/>
        </g>

        {/* Gradient definition */}
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF5252"/>
            <stop offset="25%" stopColor="#FF9F43"/>
            <stop offset="50%" stopColor="#FFD93D"/>
            <stop offset="75%" stopColor="#69F0AE"/>
            <stop offset="100%" stopColor="#00E676"/>
          </linearGradient>
        </defs>

        {/* Labels */}
        <text x="15" y="115" fill="#5A5A72" fontSize="9" fontFamily="monospace">0</text>
        <text x="175" y="115" fill="#5A5A72" fontSize="9" fontFamily="monospace">100</text>
      </svg>

      {/* Score display */}
      <div className="text-center -mt-2">
        <div className="text-5xl font-display font-bold" style={{ color }}>{score}</div>
        <div className="text-sm font-medium mt-1" style={{ color }}>{label}</div>
        <div className="flex items-center justify-center gap-1 mt-2 text-xs text-[var(--color-negative)]">
          <TrendingDown size={12} />
          <span>{overallSentiment.change}% (24h)</span>
        </div>
      </div>
    </div>
  );
}

export default function SentimentPage() {
  const [activeSource, setActiveSource] = useState('All');

  const getSentimentColor = (s: string) => {
    if (s === 'bullish') return 'text-[var(--color-positive)]';
    if (s === 'bearish') return 'text-[var(--color-negative)]';
    return 'text-[var(--color-info)]';
  };

  const getSentimentBg = (s: string) => {
    if (s === 'bullish') return 'bg-[var(--color-positive)]';
    if (s === 'bearish') return 'bg-[var(--color-negative)]';
    return 'bg-[#5A5A72]';
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-h2 font-display text-white">Sentiment Analysis</h1>
        <p className="mt-2 text-[var(--color-text-secondary)]">
          Real-time social sentiment from 6 sources. AI-powered mood detection.
        </p>
      </div>

      {/* Overall Sentiment + Source Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Fear & Greed Gauge */}
        <div className="md:col-span-1 card-glass rounded-2xl p-6 flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 mb-4 self-start">
            <Brain size={16} className="text-[var(--color-primary)]"/>
            <span className="text-xs font-data text-[var(--color-text-muted)] uppercase tracking-wider">Fear & Greed Index</span>
          </div>
          <FearGreedGauge score={overallSentiment.score} />
          <div className="w-full grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-white/5">
            <div className="text-center">
              <div className="text-xs text-[var(--color-text-muted)]">Yesterday</div>
              <div className="text-sm font-data text-[#FF9F43]">47</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-[var(--color-text-muted)]">Last Week</div>
              <div className="text-sm font-data text-[var(--color-positive)]">61</div>
            </div>
          </div>
        </div>

        {/* Sentiment by Source */}
        <div className="md:col-span-2 card-glass rounded-2xl p-6">
          <h3 className="font-display font-semibold text-white mb-4">Sentiment by Source</h3>
          <div className="space-y-4">
            {sentimentBreakdown.map((source) => (
              <div key={source.source} className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  source.type === 'twitter' ? 'bg-white/10 text-white' :
                  source.type === 'reddit' ? 'bg-[#FF4500]/10 text-[#FF4500]' :
                  source.type === 'discord' ? 'bg-[#5865F2]/10 text-[#5865F2]' :
                  source.type === 'telegram' ? 'bg-[#26A5E4]/10 text-[#26A5E4]' :
                  source.type === 'news' ? 'bg-[var(--color-warning)]/10 text-[var(--color-warning)]' :
                  'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                }`}>
                  <SocialLogo type={source.type} className="w-4 h-4" />
                </div>
                <div className="w-20 text-sm text-white font-medium">{source.source}</div>
                <div className="flex-1 flex h-3 rounded-full overflow-hidden bg-white/5">
                  <div className="bg-[var(--color-positive)] transition-all" style={{ width: `${source.bullish}%` }}/>
                  <div className="bg-[#5A5A72] transition-all" style={{ width: `${source.neutral}%` }}/>
                  <div className="bg-[var(--color-negative)] transition-all" style={{ width: `${source.bearish}%` }}/>
                </div>
                <div className="w-24 text-right">
                  <span className="text-xs text-[var(--color-text-muted)] font-data">{source.volume}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-6 mt-4 pt-4 border-t border-white/5">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[var(--color-positive)]"/><span className="text-xs text-[var(--color-text-muted)]">Bullish</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#5A5A72]"/><span className="text-xs text-[var(--color-text-muted)]">Neutral</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[var(--color-negative)]"/><span className="text-xs text-[var(--color-text-muted)]">Bearish</span></div>
          </div>
        </div>
      </div>

      {/* Trending Topics */}
      <div className="card-glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display font-semibold text-white">Trending Topics</h3>
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-[var(--color-text-muted)]"/>
            <select className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:outline-none">
              <option value="24h" className="bg-[var(--color-bg-card)]">Last 24h</option>
              <option value="7d" className="bg-[var(--color-bg-card)]">Last 7 days</option>
              <option value="30d" className="bg-[var(--color-bg-card)]">Last 30 days</option>
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
              className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[var(--color-primary)]/20 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${getSentimentBg(topic.sentiment)}`}/>
                <div>
                  <div className="text-sm font-medium text-white">{topic.topic}</div>
                  <div className="text-xs text-[var(--color-text-muted)] font-data">{topic.mentions.toLocaleString()} mentions</div>
                </div>
              </div>
              <div className={`flex items-center gap-1 text-xs font-data ${topic.change >= 0 ? 'text-[var(--color-positive)]' : 'text-[var(--color-negative)]'}`}>
                {topic.change >= 0 ? <TrendingUp size={12}/> : <TrendingDown size={12}/>}
                {topic.change >= 0 ? '+' : ''}{topic.change}%
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
