'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, ArrowUpRight, ArrowDownRight, ExternalLink,
  TrendingUp, TrendingDown, Clock, Star, Plus, Eye,
  ChevronDown, ChevronRight, Activity, Wallet, Filter
} from 'lucide-react';
import { useToast } from '@/components/Toast';
import { DashboardPage, StatCard, SectionHeader, EmptyState } from '@/app/dashboard/layout';

const whaleData = [
  { rank: 1, address: '0x7a3b...f29c', name: 'Whale Alpha', value: '$152.3M', change24h: '+12.4%', change7d: '+28.7%', tokens: 24, lastActive: '2 min ago', risk: 'low' as const, followers: 1247, avatar: 'WA', pnl: '+$16.8M' },
  { rank: 2, address: '0x8b2c...a14d', name: 'Smart Money', value: '$89.7M', change24h: '+8.2%', change7d: '+15.3%', tokens: 18, lastActive: '15 min ago', risk: 'low' as const, followers: 892, avatar: 'SM', pnl: '+$6.8M' },
  { rank: 3, address: '0x3c9d...d77e', name: 'Institution Beta', value: '$234.1M', change24h: '-2.1%', change7d: '+5.8%', tokens: 42, lastActive: '1 hr ago', risk: 'medium' as const, followers: 2341, avatar: 'IB', pnl: '-$4.9M' },
  { rank: 4, address: '0x1f4e...e88a', name: 'DeFi Whale', value: '$67.2M', change24h: '+15.8%', change7d: '+42.1%', tokens: 31, lastActive: '5 min ago', risk: 'high' as const, followers: 634, avatar: 'DW', pnl: '+$9.0M' },
  { rank: 5, address: '0x9d1f...b33c', name: 'Early Adopter', value: '$45.9M', change24h: '-5.3%', change7d: '-12.4%', tokens: 12, lastActive: '3 hrs ago', risk: 'medium' as const, followers: 445, avatar: 'EA', pnl: '-$2.6M' },
  { rank: 6, address: '0x5g7h...c44d', name: 'NFT Collector', value: '$38.4M', change24h: '+3.7%', change7d: '+8.9%', tokens: 8, lastActive: '45 min ago', risk: 'low' as const, followers: 312, avatar: 'NC', pnl: '+$1.4M' },
  { rank: 7, address: '0x2i8j...d55e', name: 'Arbitrage Bot', value: '$29.1M', change24h: '+22.1%', change7d: '+56.3%', tokens: 67, lastActive: '1 min ago', risk: 'high' as const, followers: 189, avatar: 'AB', pnl: '+$5.2M' },
  { rank: 8, address: '0x6k9l...e66f', name: 'VC Fund', value: '$187.6M', change24h: '+1.2%', change7d: '+3.4%', tokens: 156, lastActive: '2 hrs ago', risk: 'low' as const, followers: 3456, avatar: 'VF', pnl: '+$2.2M' },
];

const recentMovements = [
  { wallet: '0x7a3...f29c', action: 'Bought', token: '$ETH', amount: '12,400 ETH ($20.8M)', time: '2 min ago', impact: 'high' as const, icon: ArrowUpRight, color: 'text-[var(--color-positive)]' },
  { wallet: '0x8b2...a14d', action: 'Sold', token: '$BTC', amount: '800 BTC ($50.7M)', time: '8 min ago', impact: 'high' as const, icon: ArrowDownRight, color: 'text-[var(--color-negative)]' },
  { wallet: '0x1f4...e88a', action: 'Bought', token: '$AI', amount: '2.4M $AI ($4.2M)', time: '12 min ago', impact: 'medium' as const, icon: ArrowUpRight, color: 'text-[var(--color-positive)]' },
  { wallet: '0x9d1...b33c', action: 'Staked', token: '$SOL', amount: '50,000 SOL ($8.3M)', time: '25 min ago', impact: 'low' as const, icon: Activity, color: 'text-[var(--color-info)]' },
  { wallet: '0x5g7...c44d', action: 'Bought', token: '$PEPE', amount: '$12.4M', time: '32 min ago', impact: 'medium' as const, icon: ArrowUpRight, color: 'text-[var(--color-positive)]' },
  { wallet: '0x6k9...e66f', action: 'DCA', token: '$BTC', amount: '200 BTC ($12.7M)', time: '1 hr ago', impact: 'medium' as const, icon: Activity, color: 'text-[var(--color-info)]' },
];

const riskColors = { low: 'text-[var(--color-positive)]', medium: 'text-[var(--color-warning)]', high: 'text-[var(--color-negative)]' };
const impactColors = { high: 'bg-[var(--color-negative)]', medium: 'bg-[var(--color-warning)]', low: 'bg-[var(--color-info)]' };

export default function WhaleRadarPage() {
  const { showToast } = useToast();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 8;

  const filtered = useMemo(() => {
    return whaleData.filter((w) => {
      const matchRisk = filter === 'all' || w.risk === filter;
      const matchSearch = !search || w.name.toLowerCase().includes(search.toLowerCase()) || w.address.includes(search);
      return matchRisk && matchSearch;
    });
  }, [filter, search]);

  const totalValue = whaleData.reduce((s, w) => s + parseFloat(w.value.replace(/[$,M]/g, '')), 0);

  return (
    <DashboardPage
      title="Whale Radar"
      subtitle="Track 12,847 smart money wallets in real-time"
      actions={
        <button onClick={() => showToast('Track wallet modal coming soon', 'info')} className="btn-primary text-sm !px-4 !py-2.5 !rounded-lg flex items-center gap-2">
          <Plus size={14} /> Track Wallet
        </button>
      }
    >
      {/* ── Stats ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Total Tracked" value="12,847" icon={Eye} color="text-[var(--color-secondary)]" />
        <StatCard label="Active (24h)" value="3,421" icon={Activity} color="text-[var(--color-positive)]" />
        <StatCard label="Total Value" value={`$${totalValue.toFixed(0)}M`} icon={Wallet} color="text-[var(--color-primary)]" />
        <StatCard label="Net Inflow" value="+$247M" icon={TrendingUp} color="text-[var(--color-positive)]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* ── Leaderboard Table ── */}
        <div className="lg:col-span-2 dash-card">
          <SectionHeader
            title="Whale Leaderboard"
            subtitle="By portfolio value"
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
                  <option value="all">All Risk</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            }
          />

          {/* Table Header */}
          <div className="grid grid-cols-12 gap-2 px-3 py-2 border-b border-white/5 text-[10px] font-data text-[var(--color-text-muted)] uppercase tracking-wider">
            <div className="col-span-1">#</div>
            <div className="col-span-3">Wallet</div>
            <div className="col-span-2 text-right">Value</div>
            <div className="col-span-2 text-right">24h / 7d</div>
            <div className="col-span-2 text-right">P&L</div>
            <div className="col-span-1 text-center">Risk</div>
            <div className="col-span-1 text-right">Activity</div>
          </div>

          {/* Table Rows */}
          <AnimatePresence>
            {filtered.slice(0, page * perPage).map((whale, i) => (
              <motion.div
                key={whale.rank}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className="grid grid-cols-12 gap-2 px-3 py-2.5 border-b border-white/[0.03] hover:bg-white/[0.03] transition-colors cursor-pointer group items-center"
                onClick={() => showToast(`Opening ${whale.name} profile...`, 'info')}
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
                  <div className="text-[10px] text-[var(--color-text-muted)] font-data">{whale.tokens} tokens</div>
                </div>
                <div className="col-span-2 text-right">
                  <span className={`text-xs font-data ${whale.change24h.startsWith('+') ? 'text-[var(--color-positive)]' : 'text-[var(--color-negative)]'}`}>{whale.change24h}</span>
                  <span className="text-[10px] text-[var(--color-text-muted)] font-data ml-1">/ {whale.change7d}</span>
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
            ))}
          </AnimatePresence>

          {filtered.length === page * perPage && (
            <button
              onClick={() => setPage(p => p + 1)}
              className="w-full py-2 text-xs text-[var(--color-primary)] hover:bg-white/[0.03] transition-colors font-data"
            >
              Load more ({filtered.length - page * perPage} remaining)
            </button>
          )}

          {filtered.length === 0 && (
            <EmptyState icon={Eye} title="No wallets found" description="Try adjusting your search or filter." />
          )}
        </div>

        {/* ── Recent Movements ── */}
        <div className="dash-card">
          <SectionHeader
            title="Recent Movements"
            subtitle="Live feed"
            action={<div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-[var(--color-positive)] animate-pulse" /><span className="text-[10px] text-[var(--color-text-muted)] font-data">LIVE</span></div>}
          />
          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {recentMovements.map((m, i) => {
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
            })}
          </div>
        </div>
      </div>
    </DashboardPage>
  );
}
