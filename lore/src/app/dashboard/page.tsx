'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp, TrendingDown, Eye, Shield, Activity, Zap,
  ArrowUpRight, ArrowDownRight, Clock, ExternalLink,
  AlertTriangle, CheckCircle, XCircle, Info
} from 'lucide-react';
import { useToast } from '@/components/Toast';

// Mock data
const marketStats = [
  { label: 'BTC Price', value: '$63,442', change: '+2.34%', positive: true },
  { label: 'ETH Price', value: '$1,681', change: '-0.82%', positive: false },
  { label: 'SOL Price', value: '$65.78', change: '+3.60%', positive: true },
  { label: 'Fear & Greed', value: '42', change: 'Fear', positive: false },
];

const liveAlerts = [
  {
    type: 'whale',
    icon: Eye,
    title: 'Whale Movement',
    description: '0x7a3...f29 moved 2,400 BTC ($152.3M) to Binance',
    time: '2 min ago',
    severity: 'high',
  },
  {
    type: 'exploit',
    icon: Shield,
    title: 'Exploit Signal',
    description: 'Protocol X shows flash loan manipulation pattern',
    time: '5 min ago',
    severity: 'critical',
  },
  {
    type: 'narrative',
    icon: Activity,
    title: 'Narrative Shift',
    description: 'AI tokens gaining momentum (+340% mentions)',
    time: '12 min ago',
    severity: 'medium',
  },
  {
    type: 'whale',
    icon: Eye,
    title: 'Smart Money',
    description: '12 wallets accumulating $AI tokens',
    time: '18 min ago',
    severity: 'medium',
  },
  {
    type: 'exploit',
    icon: Shield,
    title: 'Risk Resolved',
    description: 'Protocol Y vulnerability patched',
    time: '32 min ago',
    severity: 'low',
  },
];

const topWallets = [
  { address: '0x7a3...f29', label: 'Whale Alpha', value: '$152.3M', change: '+12.4%', positive: true },
  { address: '0x8b2...a14', label: 'Smart Money', value: '$89.7M', change: '+8.2%', positive: true },
  { address: '0x3c9...d77', label: 'Institution', value: '$234.1M', change: '-2.1%', positive: false },
  { address: '0x1f4...e88', label: 'DeFi Whale', value: '$67.2M', change: '+15.8%', positive: true },
  { address: '0x9d1...b33', label: 'Early Adopter', value: '$45.9M', change: '-5.3%', positive: false },
];

const narratives = [
  {
    title: 'AI Token Accumulation Phase',
    summary: 'Smart money wallets are quietly accumulating AI-related tokens. 12 wallets added $4.2M in positions over 24h. Historical pattern suggests 60-80% upside within 2 weeks.',
    confidence: 87,
    sentiment: 'bullish',
    tokens: ['$AI', '$AGIX', '$FET', '$OCEAN'],
  },
  {
    title: 'DeFi Exploit Risk Elevated',
    summary: '3 protocols showing similar vulnerability patterns to last week\'s $4.2M exploit. Recommend immediate position review.',
    confidence: 94,
    sentiment: 'bearish',
    tokens: ['$PROT-X', '$LEND-Y', '$POOL-Z'],
  },
  {
    title: 'Institutional Bitcoin Accumulation',
    summary: 'On-chain data shows institutional wallets adding BTC at current levels. Similar pattern preceded 23% rally in Q1.',
    confidence: 76,
    sentiment: 'bullish',
    tokens: ['$BTC', '$WBTC'],
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function OverviewPage() {
  const { showToast } = useToast();
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const update = () => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Header */}
      <motion.div variants={item} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-h2 font-display text-white">Overview</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">
            Real-time intelligence dashboard • Last scan: {currentTime || '—'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--color-positive)]/10 border border-[var(--color-positive)]/20">
            <span className="live-dot" />
            <span className="text-xs text-[var(--color-positive)] font-data">LIVE</span>
          </div>
          <select className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white outline-none">
            <option>Last 24h</option>
            <option>Last 7d</option>
            <option>Last 30d</option>
          </select>
        </div>
      </motion.div>

      {/* Market Stats */}
      <motion.div variants={item} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {marketStats.map((stat) => (
          <div key={stat.label} className="card-glass rounded-2xl p-5">
            <div className="text-xs text-[var(--color-text-muted)] font-data mb-2">{stat.label}</div>
            <div className="text-2xl font-display font-bold text-white">{stat.value}</div>
            <div className={`flex items-center gap-1 mt-1 text-xs font-data ${
              stat.positive ? 'text-[var(--color-positive)]' : 'text-[var(--color-negative)]'
            }`}>
              {stat.positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
              {stat.change}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Alerts Feed */}
        <motion.div variants={item} className="lg:col-span-2 card-glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-semibold text-lg text-white flex items-center gap-2">
              <Zap size={18} className="text-[var(--color-primary)]" />
              Live Intelligence Feed
            </h2>
            <span className="text-xs text-[var(--color-text-muted)] font-data">5 new alerts</span>
          </div>

          <div className="space-y-3">
            {liveAlerts.map((alert, i) => {
              const Icon = alert.icon;
              const severityColors: Record<string, string> = {
                critical: 'border-[#FF5252]/30 bg-[var(--color-negative)]/5',
                high: 'border-[#FFD93D]/30 bg-[var(--color-warning)]/5',
                medium: 'border-[#42A5F5]/30 bg-[#42A5F5]/5',
                low: 'border-[#00E676]/30 bg-[var(--color-positive)]/5',
              };
              const iconColors: Record<string, string> = {
                critical: 'text-[var(--color-negative)]',
                high: 'text-[var(--color-warning)]',
                medium: 'text-[var(--color-info)]',
                low: 'text-[var(--color-positive)]',
              };

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className={`flex items-start gap-4 p-4 rounded-xl border ${severityColors[alert.severity]} hover:bg-white/5 transition-colors cursor-pointer`}
                >
                  <div className={`p-2 rounded-lg bg-white/5 ${iconColors[alert.severity]}`}>
                    <Icon size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white">{alert.title}</span>
                      <span className="text-[10px] text-[var(--color-text-muted)] font-data flex items-center gap-1">
                        <Clock size={10} />
                        {alert.time}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--color-text-secondary)] mt-1 line-clamp-2">{alert.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Top Wallets */}
        <motion.div variants={item} className="card-glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-semibold text-lg text-white flex items-center gap-2">
              <Eye size={18} className="text-[var(--color-secondary)]" />
              Top Wallets
            </h2>
            <button onClick={() => showToast('Opening Whale Radar...', 'info')} className="text-xs text-[var(--color-primary)] hover:underline">View all</button>
          </div>

          <div className="space-y-3">
            {topWallets.map((wallet, i) => (
              <div key={wallet.address} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-primary)]/30 to-[var(--color-secondary)]/30 flex items-center justify-center text-xs font-data text-white">
                    {i + 1}
                  </div>
                  <div>
                    <div className="text-sm text-white font-medium">{wallet.label}</div>
                    <div className="text-[10px] text-[var(--color-text-muted)] font-data">{wallet.address}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-white font-data">{wallet.value}</div>
                  <div className={`text-[10px] font-data ${wallet.positive ? 'text-[var(--color-positive)]' : 'text-[var(--color-negative)]'}`}>
                    {wallet.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* AI Narratives */}
      <motion.div variants={item} className="card-glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-semibold text-lg text-white flex items-center gap-2">
            <Activity size={18} className="text-[var(--color-tertiary)]" />
            AI-Generated Narratives
          </h2>
          <button onClick={() => showToast('Opening Narratives page...', 'info')} className="text-xs text-[var(--color-primary)] hover:underline">View all narratives</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {narratives.map((narrative, i) => (
            <div key={i} className="p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[var(--color-primary)]/20 transition-all cursor-pointer group">
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[10px] font-data px-2 py-0.5 rounded-full ${
                  narrative.sentiment === 'bullish'
                    ? 'bg-[var(--color-positive)]/10 text-[var(--color-positive)] border border-[var(--color-positive)]/20'
                    : 'bg-[var(--color-negative)]/10 text-[var(--color-negative)] border border-[#FF5252]/20'
                }`}>
                  {narrative.sentiment === 'bullish' ? '↑ BULLISH' : '↓ BEARISH'}
                </span>
                <span className="text-[10px] text-[var(--color-text-muted)] font-data">{narrative.confidence}% confidence</span>
              </div>
              <h3 className="text-sm font-semibold text-white mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                {narrative.title}
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed line-clamp-3 mb-3">
                {narrative.summary}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {narrative.tokens.map((token) => (
                  <span key={token} className="text-[10px] font-data px-2 py-0.5 rounded-full bg-white/5 text-[var(--color-text-secondary)]">
                    {token}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Eye, label: 'Track Wallet', desc: 'Add wallet to radar', color: 'text-[var(--color-secondary)]' },
          { icon: Shield, label: 'Scan Protocol', desc: 'Check for exploits', color: 'text-[var(--color-negative)]' },
          { icon: Activity, label: 'New Narrative', desc: 'Generate AI report', color: 'text-[var(--color-tertiary)]' },
          { icon: Zap, label: 'Set Alert', desc: 'Custom notification', color: 'text-[var(--color-primary)]' },
        ].map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              className="card-glass rounded-2xl p-5 text-left hover:border-[var(--color-primary)]/20 transition-all group"
            >
              <Icon size={20} className={`${action.color} mb-3`} />
              <div className="text-sm font-medium text-white group-hover:text-[var(--color-primary)] transition-colors">
                {action.label}
              </div>
              <div className="text-[10px] text-[var(--color-text-muted)] mt-1">{action.desc}</div>
            </button>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
