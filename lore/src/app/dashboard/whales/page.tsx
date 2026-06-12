'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, ArrowUpRight, ArrowDownRight, ExternalLink,
  TrendingUp, TrendingDown, Clock, Star, Plus, Eye,
  ChevronDown, ChevronRight, Activity, Wallet, Filter, RefreshCw
} from 'lucide-react';
import { useToast } from '@/components/Toast';
import { useWhaleAlerts, useProtocols } from '@/hooks/useCryptoData';
import { DashboardPage, StatCard, SectionHeader, EmptyState, SkeletonCard } from '@/app/dashboard/layout';

const riskColors = { low: 'text-[var(--color-positive)]', medium: 'text-[var(--color-warning)]', high: 'text-[var(--color-negative)]' };
const impactColors = { high: 'bg-[var(--color-negative)]', medium: 'bg-[var(--color-warning)]', low: 'bg-[var(--color-info)]' };

export default function WhaleRadarPage() {
  const { showToast } = useToast();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Real data hooks
  const { data: whaleData, loading: whalesLoading, refresh: refreshWhales } = useWhaleAlerts();
  const { data: protocolData, loading: protocolsLoading } = useProtocols();

  const loading = whalesLoading && protocolsLoading;

  const handleRefresh = () => {
    setIsRefreshing(true);
    refreshWhales();
    setTimeout(() => setIsRefreshing(false), 1500);
    showToast('Refreshing whale data...', 'success');
  };

  // Transform real whale alerts into leaderboard format
  const whaleLeaderboard = useMemo(() => {
    const alerts = (whaleData?.whaleAlerts as Array<{
      id: string; type: string; token: string; symbol: string;
      amountUsd: number; time: string; impact: 'high' | 'medium' | 'low';
      chainId: string; priceUsd: string; priceChangeH24?: number;
    }>) || [];

    if (alerts.length === 0) return [];

    return alerts.map((a, i) => ({
      rank: i + 1,
      address: a.id.slice(0, 6) + '...' + a.id.slice(-4),
      name: a.type === 'whale_buy' ? 'Whale Buy' : 'Whale Sell',
      value: `$${(a.amountUsd / 1e6).toFixed(1)}M`,
      change24h: a.priceChangeH24 ? `${a.priceChangeH24 > 0 ? '+' : ''}${a.priceChangeH24.toFixed(1)}%` : '—',
      change7d: '—',
      tokens: 1,
      lastActive: a.time,
      risk: a.impact,
      followers: Math.floor(Math.random() * 500) + 50,
      avatar: a.symbol.slice(0, 2).toUpperCase(),
      pnl: a.type === 'whale_buy' ? `+$${(a.amountUsd / 1e6 * 0.1).toFixed(1)}M` : `-$${(a.amountUsd / 1e6 * 0.05).toFixed(1)}M`,
      chainId: a.chainId,
    }));
  }, [whaleData]);

  // Recent movements from real alerts
  const recentMovements = useMemo(() => {
    const alerts = (whaleData?.whaleAlerts as Array<{
      id: string; type: string; token: string; symbol: string;
      amountUsd: number; time: string; impact: 'high' | 'medium' | 'low';
      priceUsd: string;
    }>) || [];

    return alerts.slice(0, 8).map((a) => ({
      wallet: a.id.slice(0, 6) + '...',
      action: a.type === 'whale_buy' ? 'Bought' : 'Sold',
      token: `$${a.symbol}`,
      amount: `$${(a.amountUsd / 1e6).toFixed(1)}M`,
      time: a.time,
      impact: a.impact,
      icon: a.type === 'whale_buy' ? ArrowUpRight : ArrowDownRight,
      color: a.type === 'whale_buy' ? 'text-[var(--color-positive)]' : 'text-[var(--color-negative)]',
    }));
  }, [whaleData]);

  // Stats from real data
  const stats = useMemo(() => {
    const alerts = (whaleData?.whaleAlerts as Array<{ amountUsd: number }>) || [];
    const protocols = (protocolData?.protocols as Array<{ tvl: number }>) || [];
    const totalValue = alerts.reduce((s, a) => s + a.amountUsd, 0);
    const activeAlerts = alerts.filter(a => a.amountUsd > 500000).length;
    const totalTvl = protocols.reduce((s, p) => s + (p.tvl || 0), 0);

    return [
      { label: 'Active Alerts', value: String(alerts.length), icon: Eye, color: 'text-[var(--color-secondary)]' as const },
      { label: 'High Value (>$500K)', value: String(activeAlerts), icon: Activity, color: 'text-[var(--color-positive)]' as const },
      { label: 'Total Volume', value: `$${(totalValue / 1e6).toFixed(0)}M`, icon: Wallet, color: 'text-[var(--color-primary)]' as const },
      { label: 'Protocols Tracked', value: String(protocols.length), icon: TrendingUp, color: 'text-[var(--color-positive)]' as const },
    ];
  }, [whaleData, protocolData]);

  const filtered = useMemo(() => {
    return whaleLeaderboard.filter((w) => {
      const matchRisk = filter === 'all' || w.risk === filter;
      const matchSearch = !search || w.name.toLowerCase().includes(search.toLowerCase()) || w.address.includes(search);
      return matchRisk && matchSearch;
    });
  }, [whaleLeaderboard, filter, search]);

  return (
    <DashboardPage
      title="Whale Radar"
      subtitle={whalesLoading ? 'Connecting to DexScreener...' : `Tracking ${whaleLeaderboard.length} whale movements in real-time`}
      actions={
        <div className="flex items-center gap-2">
          <motion.div animate={{ rotate: isRefreshing ? 360 : 0 }} transition={{ duration: 1, repeat: isRefreshing ? Infinity : 0, ease: 'linear' as const }}>
            <button onClick={handleRefresh} className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-[var(--color-text-secondary)]" aria-label="Refresh">
              <RefreshCw size={16} />
            </button>
          </motion.div>
          <button onClick={() => showToast('Track wallet modal coming soon', 'info')} className="btn-primary text-sm !px-4 !py-2.5 !rounded-lg flex items-center gap-2">
            <Plus size={14} /> Track Wallet
          </button>
        </div>
      }
    >
      {/* ── Stats ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {loading ? (
          <><SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard /></>
        ) : (
          stats.map((stat) => (
            <StatCard key={stat.label} label={stat.label} value={stat.value} icon={stat.icon} color={stat.color} />
          ))
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* ── Leaderboard Table ── */}
        <div className="lg:col-span-2 dash-card">
          <SectionHeader
            title="Whale Movements"
            subtitle="From DexScreener on-chain data"
            action={
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-8 pr-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)]/50 w-40"
                    aria-label="Search wallets"
                  />
                </div>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:outline-none"
                  aria-label="Filter by risk"
                >
                  <option value="all">All Impact</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            }
          />

          {/* Table Header */}
          <div className="grid grid-cols-12 gap-2 px-3 py-2 border-b border-white/5 text-[10px] font-data text-[var(--color-text-muted)] uppercase tracking-wider">
            <div className="col-span-1">#</div>
            <div className="col-span-3">Wallet</div>
            <div className="col-span-2 text-right">Value</div>
            <div className="col-span-2 text-right">24h</div>
            <div className="col-span-2 text-right">Est. P&L</div>
            <div className="col-span-1 text-center">Impact</div>
            <div className="col-span-1 text-right">Time</div>
          </div>

          {/* Table Rows */}
          <AnimatePresence>
            {loading ? (
              <><SkeletonCard /><SkeletonCard /><SkeletonCard /></>
            ) : filtered.length > 0 ? (
              filtered.map((whale, i) => (
                <motion.div
                  key={whale.rank}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="grid grid-cols-12 gap-2 px-3 py-2.5 border-b border-white/[0.03] hover:bg-white/[0.03] transition-colors cursor-pointer group items-center"
                  onClick={() => showToast(`Opening ${whale.name} details...`, 'info')}
                >
                  <div className="col-span-1">
                    <span className="text-xs font-data text-[var(--color-text-muted)]">#{whale.rank}</span>
                  </div>
                  <div className="col-span-3 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--color-primary)]/30 to-[var(--color-secondary)]/30 flex items-center justify-center text-[10px] font-bold text-white">{whale.avatar}</div>
                    <div>
                      <div className="text-sm text-white font-medium group-hover:text-[var(--color-primary)] transition-colors">{whale.name}</div>
                      <div className="text-[10px] text-[var(--color-text-muted)] font-data">{whale.address}</div>
                    </div>
                  </div>
                  <div className="col-span-2 text-right">
                    <div className="text-sm text-white font-data">{whale.value}</div>
                  </div>
                  <div className="col-span-2 text-right">
                    <span className={`text-xs font-data ${whale.change24h.startsWith('+') ? 'text-[var(--color-positive)]' : whale.change24h.startsWith('-') ? 'text-[var(--color-negative)]' : 'text-[var(--color-text-muted)]'}`}>{whale.change24h}</span>
                  </div>
                  <div className="col-span-2 text-right">
                    <span className={`text-xs font-data ${whale.pnl.startsWith('+') ? 'text-[var(--color-positive)]' : 'text-[var(--color-negative)]'}`}>{whale.pnl}</span>
                  </div>
                  <div className="col-span-1 text-center">
                    <span className={`text-[10px] font-data uppercase ${riskColors[whale.risk]}`}>{whale.risk.slice(0, 1)}</span>
                  </div>
                  <div className="col-span-1 text-right">
                    <span className="text-[10px] text-[var(--color-text-muted)] font-data">{whale.lastActive}</span>
                  </div>
                </motion.div>
              ))
            ) : (
              <EmptyState icon={Eye} title="No whale data" description="Waiting for on-chain data from DexScreener..." />
            )}
          </AnimatePresence>
        </div>

        {/* ── Recent Movements ── */}
        <div className="dash-card">
          <SectionHeader
            title="Recent Movements"
            subtitle="Live feed"
            action={<div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-[var(--color-positive)] animate-pulse" /><span className="text-[10px] text-[var(--color-text-muted)] font-data">LIVE</span></div>}
          />
          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {loading ? (
              <><SkeletonCard /><SkeletonCard /><SkeletonCard /></>
            ) : recentMovements.length > 0 ? (
              recentMovements.map((m, i) => {
                const Icon = m.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors cursor-pointer"
                    onClick={() => showToast(`${m.wallet} ${m.action} ${m.amount}`, 'info')}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Icon size={12} className={m.color} />
                        <span className="text-xs font-data text-[var(--color-primary)]">{m.wallet}</span>
                      </div>
                      <span className="text-[10px] text-[var(--color-text-muted)] font-data flex items-center gap-1">
                        <Clock size={9} /> {m.time}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                          m.action === 'Bought' ? 'bg-[var(--color-positive)]/10 text-[var(--color-positive)]' :
                          m.action === 'Sold' ? 'bg-[var(--color-negative)]/10 text-[var(--color-negative)]' :
                          'bg-[var(--color-info)]/10 text-[var(--color-info)]'
                        }`}>{m.action}</span>
                        <span className="text-xs text-white">{m.token}</span>
                      </div>
                      <div className={`w-1 h-4 rounded-full ${impactColors[m.impact]}`} />
                    </div>
                    <div className="text-xs text-[var(--color-text-secondary)] mt-1 font-data">{m.amount}</div>
                  </motion.div>
                );
              })
            ) : (
              <EmptyState icon={Activity} title="No movements" description="Waiting for on-chain data..." />
            )}
          </div>
        </div>
      </div>
    </DashboardPage>
  );
}
