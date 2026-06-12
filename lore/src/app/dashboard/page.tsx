'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp, TrendingDown, Eye, Shield, Activity, Zap,
  ArrowUpRight, ArrowDownRight, Clock, AlertTriangle, CheckCircle,
  ExternalLink, RefreshCw, Plus
} from 'lucide-react';
import { useToast } from '@/components/Toast';
import { DashboardPage, StatCard, SectionHeader, EmptyState, SkeletonCard } from '@/app/dashboard/layout';

/* ─── Mock Data ─── */
const marketStats = [
  { label: 'BTC', value: '$63,442', change: '+2.34%', positive: true },
  { label: 'ETH', value: '$1,681', change: '-0.82%', positive: false },
  { label: 'SOL', value: '$165.78', change: '+3.60%', positive: true },
  { label: 'F&G', value: '42', change: 'Fear', positive: false },
];

const liveAlerts = [
  { type: 'whale', icon: Eye, title: 'Whale Movement', description: '0x7a3...f29 moved 2,400 BTC ($152.3M) to Binance', time: '2 min ago', severity: 'high' as const, id: 1 },
  { type: 'exploit', icon: Shield, title: 'Exploit Signal', description: 'Protocol X shows flash loan manipulation pattern', time: '5 min ago', severity: 'critical' as const, id: 2 },
  { type: 'narrative', icon: Activity, title: 'Narrative Shift', description: 'AI tokens gaining momentum (+340% mentions)', time: '12 min ago', severity: 'medium' as const, id: 3 },
  { type: 'whale', icon: Eye, title: 'Smart Money', description: '12 wallets accumulating $AI tokens', time: '18 min ago', severity: 'medium' as const, id: 4 },
  { type: 'exploit', icon: Shield, title: 'Risk Resolved', description: 'Protocol Y vulnerability patched', time: '32 min ago', severity: 'low' as const, id: 5 },
];

const topWallets = [
  { address: '0x7a3...f29', label: 'Whale Alpha', value: '$152.3M', change: '+12.4%', positive: true },
  { address: '0x8b2...a14', label: 'Smart Money', value: '$89.7M', change: '+8.2%', positive: true },
  { address: '0x3c9...d77', label: 'Institution', value: '$234.1M', change: '-2.1%', positive: false },
  { address: '0x1f4...e88', label: 'DeFi Whale', value: '$67.2M', change: '+15.8%', positive: true },
  { address: '0x9d1...b33', label: 'Early Adopter', value: '$45.9M', change: '-5.3%', positive: false },
];

const narratives = [
  { title: 'AI Token Accumulation Phase', summary: 'Smart money wallets quietly accumulated AI-related tokens. 12 wallets added $4.2M in 24h.', confidence: 87, sentiment: 'bullish' as const, tokens: ['$AI', '$AGIX', '$FET'] },
  { title: 'DeFi Exploit Risk Elevated', summary: '3 protocols showing vulnerability patterns similar to last week\'s $4.2M exploit.', confidence: 94, sentiment: 'bearish' as const, tokens: ['$PROT-X', '$LEND-Y'] },
  { title: 'Institutional BTC Accumulation', summary: 'On-chain data shows institutional wallets adding BTC. Pattern preceded 23% rally in Q1.', confidence: 76, sentiment: 'bullish' as const, tokens: ['$BTC', '$WBTC'] },
];

const quickActions = [
  { icon: Eye, label: 'Track Wallet', desc: 'Add wallet to radar', color: 'text-[var(--color-secondary)]', action: 'track' },
  { icon: Shield, label: 'Scan Protocol', desc: 'Check for exploits', color: 'text-[var(--color-negative)]', action: 'scan' },
  { icon: Activity, label: 'New Narrative', desc: 'Generate AI report', color: 'text-[var(--color-warning)]', action: 'narrative' },
  { icon: Zap, label: 'Set Alert', desc: 'Custom notification', color: 'text-[var(--color-primary)]', action: 'alert' },
];

const severityColors = {
  critical: { border: 'border-[var(--color-negative)]/30', bg: 'bg-[var(--color-negative)]/5', dot: 'bg-[var(--color-negative)]' },
  high: { border: 'border-[var(--color-warning)]/30', bg: 'bg-[var(--color-warning)]/5', dot: 'bg-[var(--color-warning)]' },
  medium: { border: 'border-[var(--color-info)]/30', bg: 'bg-[var(--color-info)]/5', dot: 'bg-[var(--color-info)]' },
  low: { border: 'border-[var(--color-positive)]/30', bg: 'bg-[var(--color-positive)]/5', dot: 'bg-[var(--color-positive)]' },
};

export default function OverviewPage() {
  const { showToast } = useToast();
  const [currentTime, setCurrentTime] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const update = () => setCurrentTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    update();
    const interval = setInterval(update, 1000);
    // Simulate initial data load
    const timer = setTimeout(() => setLoading(false), 600);
    return () => { clearInterval(interval); clearTimeout(timer); };
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
    showToast('Dashboard refreshed', 'success');
  };

  return (
    <DashboardPage
      title="Market Overview"
      subtitle={loading ? 'Loading...' : `Real-time intelligence • Last scan: ${currentTime || '—'}`}
      loading={loading}
      actions={
        <div className="flex items-center gap-2">
          <motion.div animate={{ rotate: isRefreshing ? 360 : 0 }} transition={{ duration: 1, repeat: isRefreshing ? Infinity : 0, ease: 'linear' }}>
            <button onClick={handleRefresh} className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-[var(--color-text-secondary)]" aria-label="Refresh dashboard">
              <RefreshCw size={16} />
            </button>
          </motion.div>
        </div>
      }
    >
      {/* ── Market Ticker Strip ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {marketStats.map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="dash-card hover-lift"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="dash-label">{stat.label}</span>
              {stat.positive ? <TrendingUp size={12} className="text-[var(--color-positive)]" /> : <TrendingDown size={12} className="text-[var(--color-negative)]" />}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="dash-value text-xl">{stat.value}</span>
              <span className={`font-data text-xs ${stat.positive ? 'text-[var(--color-positive)]' : 'text-[var(--color-negative)]'}`}>
                {stat.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Main Grid: Alerts + Wallets ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Live Intelligence Feed */}
        <div className="lg:col-span-2 dash-card">
          <SectionHeader
            title="Live Intelligence Feed"
            subtitle={`${liveAlerts.length} active alerts`}
            action={<button onClick={() => showToast('Opening full feed...', 'info')} className="text-xs text-[var(--color-primary)] hover:underline font-data">View all →</button>}
          />
          <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1 custom-scrollbar">
            <AnimatePresence>
              {liveAlerts.map((alert, i) => {
                const Icon = alert.icon;
                const colors = severityColors[alert.severity];
                return (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    transition={{ delay: i * 0.06 }}
                    className={`flex items-start gap-3 p-3 rounded-lg border ${colors.border} ${colors.bg} cursor-pointer hover:bg-white/[0.04] transition-all group`}
                    onClick={() => showToast(`${alert.title}: ${alert.description.slice(0, 50)}...`, 'info')}
                  >
                    <div className={`p-1.5 rounded-md bg-white/5 mt-0.5`}>
                      <Icon size={14} className={colors.dot.replace('bg-', 'text-')} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium text-white group-hover:text-[var(--color-primary)] transition-colors">{alert.title}</span>
                        <span className="text-[10px] text-[var(--color-text-muted)] font-data whitespace-nowrap flex items-center gap-1">
                          <Clock size={9} /> {alert.time}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--color-text-secondary)] mt-0.5 line-clamp-1">{alert.description}</p>
                    </div>
                    <div className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${colors.dot}`} />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Top Wallets */}
        <div className="dash-card">
          <SectionHeader
            title="Top Wallets"
            subtitle="By tracked value"
            action={<button onClick={() => showToast('Opening Whale Radar...', 'info')} className="text-xs text-[var(--color-primary)] hover:underline font-data">View all →</button>}
          />
          <div className="space-y-1">
            {topWallets.map((wallet, i) => (
              <div key={wallet.address} className="flex items-center justify-between p-2.5 rounded-lg hover:bg-white/[0.03] transition-colors cursor-pointer group" onClick={() => showToast(`Opening ${wallet.label}...`, 'info')}>
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] font-data text-[var(--color-text-muted)] w-4 text-center">{i + 1}</span>
                  <div>
                    <div className="text-sm text-white font-medium group-hover:text-[var(--color-primary)] transition-colors">{wallet.label}</div>
                    <div className="text-[10px] text-[var(--color-text-muted)] font-data">{wallet.address}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-white font-data">{wallet.value}</div>
                  <div className={`text-[10px] font-data ${wallet.positive ? 'text-[var(--color-positive)]' : 'text-[var(--color-negative)]'}`}>{wallet.change}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── AI Narratives ── */}
      <div className="dash-card">
        <SectionHeader
          title="AI-Generated Narratives"
          subtitle="From 14 data sources • Updated in real-time"
          action={<button onClick={() => showToast('Opening Narratives...', 'info')} className="text-xs text-[var(--color-primary)] hover:underline font-data">View all →</button>}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {narratives.map((n, i) => (
            <motion.div
              key={n.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="p-4 rounded-lg bg-white/[0.02] border border-white/5 hover:border-[var(--color-primary)]/20 transition-all cursor-pointer group hover-lift"
              onClick={() => showToast(`Opening narrative: ${n.title}...`, 'info')}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-data px-2 py-0.5 rounded-full ${
                  n.sentiment === 'bullish'
                    ? 'bg-[var(--color-positive)]/10 text-[var(--color-positive)] border border-[var(--color-positive)]/20'
                    : 'bg-[var(--color-negative)]/10 text-[var(--color-negative)] border border-[var(--color-negative)]/20'
                }`}>
                  {n.sentiment === 'bullish' ? '↑ BULLISH' : '↓ BEARISH'}
                </span>
                <span className="text-[10px] text-[var(--color-text-muted)] font-data">{n.confidence}% conf.</span>
              </div>
              <h3 className="text-sm font-semibold text-white mb-1.5 group-hover:text-[var(--color-primary)] transition-colors">{n.title}</h3>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed line-clamp-2 mb-3">{n.summary}</p>
              <div className="flex flex-wrap gap-1">
                {n.tokens.map((t) => (
                  <span key={t} className="text-[10px] font-data px-1.5 py-0.5 rounded bg-white/5 text-[var(--color-text-secondary)]">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Quick Actions ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {quickActions.map((a) => {
          const Icon = a.icon;
          return (
            <button
              key={a.label}
              onClick={() => showToast(`${a.label} coming soon`, 'info')}
              className="dash-card hover-lift text-left group"
            >
              <Icon size={18} className={`${a.color} mb-2`} />
              <div className="text-sm font-medium text-white group-hover:text-[var(--color-primary)] transition-colors">{a.label}</div>
              <div className="text-[10px] text-[var(--color-text-muted)] mt-0.5">{a.desc}</div>
            </button>
          );
        })}
      </div>
    </DashboardPage>
  );
}
