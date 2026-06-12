'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp, TrendingDown, Eye, Shield, Activity, Zap,
  ArrowUpRight, ArrowDownRight, Clock, AlertTriangle, CheckCircle,
  ExternalLink, RefreshCw, Plus
} from 'lucide-react';
import { useToast } from '@/components/Toast';
import { useMarketData, useWhaleAlerts, useNarratives } from '@/hooks/useCryptoData';
import { DashboardPage, StatCard, SectionHeader, EmptyState, SkeletonCard } from '@/app/dashboard/layout';

const severityColors = {
  critical: { border: 'border-[var(--color-negative)]/30', bg: 'bg-[var(--color-negative)]/5', dot: 'bg-[var(--color-negative)]' },
  high: { border: 'border-[var(--color-warning)]/30', bg: 'bg-[var(--color-warning)]/5', dot: 'bg-[var(--color-warning)]' },
  medium: { border: 'border-[var(--color-info)]/30', bg: 'bg-[var(--color-info)]/5', dot: 'bg-[var(--color-info)]' },
  low: { border: 'border-[var(--color-positive)]/30', bg: 'bg-[var(--color-positive)]/5', dot: 'bg-[var(--color-positive)]' },
};

const quickActions = [
  { icon: Eye, label: 'Track Wallet', desc: 'Add wallet to radar', color: 'text-[var(--color-secondary)]', action: 'track' },
  { icon: Shield, label: 'Scan Protocol', desc: 'Check for exploits', color: 'text-[var(--color-negative)]', action: 'scan' },
  { icon: Activity, label: 'New Narrative', desc: 'Generate AI report', color: 'text-[var(--color-warning)]', action: 'narrative' },
  { icon: Zap, label: 'Set Alert', desc: 'Custom notification', color: 'text-[var(--color-primary)]', action: 'alert' },
];

export default function OverviewPage() {
  const { showToast } = useToast();
  const [currentTime, setCurrentTime] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Real data hooks
  const { data: marketData, loading: marketsLoading, refresh: refreshMarkets } = useMarketData();
  const { data: whaleData, loading: whalesLoading, refresh: refreshWhales } = useWhaleAlerts();
  const { data: narrativeData, loading: narrativesLoading, refresh: refreshNarratives } = useNarratives();

  const loading = marketsLoading && whalesLoading && narrativesLoading;

  useEffect(() => {
    const update = () => setCurrentTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    refreshMarkets();
    refreshWhales();
    refreshNarratives();
    setTimeout(() => setIsRefreshing(false), 1500);
    showToast('Dashboard refreshed with live data', 'success');
  };

  // Transform real market data for display
  const marketStats = useMemo(() => {
    const markets = marketData?.markets as Array<{
      symbol: string; current_price: number; price_change_percentage_24h: number;
    }> | undefined;

    if (!markets || markets.length < 3) return [];

    const btc = markets.find(m => m.symbol === 'btc');
    const eth = markets.find(m => m.symbol === 'eth');
    const sol = markets.find(m => m.symbol === 'sol');

    return [
      { label: 'BTC', value: btc ? `$${btc.current_price.toLocaleString()}` : '—', change: btc ? `${btc.price_change_percentage_24h > 0 ? '+' : ''}${btc.price_change_percentage_24h.toFixed(2)}%` : '—', positive: (btc?.price_change_percentage_24h || 0) > 0 },
      { label: 'ETH', value: eth ? `$${eth.current_price.toLocaleString()}` : '—', change: eth ? `${eth.price_change_percentage_24h > 0 ? '+' : ''}${eth.price_change_percentage_24h.toFixed(2)}%` : '—', positive: (eth?.price_change_percentage_24h || 0) > 0 },
      { label: 'SOL', value: sol ? `$${sol.current_price.toLocaleString()}` : '—', change: sol ? `${sol.price_change_percentage_24h > 0 ? '+' : ''}${sol.price_change_percentage_24h.toFixed(2)}%` : '—', positive: (sol?.price_change_percentage_24h || 0) > 0 },
      { label: 'F&G', value: '—', change: 'Loading...', positive: false },
    ];
  }, [marketData]);

  // Transform real whale alerts
  const liveAlerts = useMemo(() => {
    const alerts = whaleData?.whaleAlerts as Array<{
      id: string; type: string; token: string; symbol: string;
      amountUsd: number; time: string; impact: 'high' | 'medium' | 'low';
    }> | undefined;

    if (!alerts) return [];

    const iconMap: Record<string, typeof Eye> = {
      whale_buy: ArrowUpRight, whale_sell: ArrowDownRight, smart_money: Eye,
    };
    const titleMap: Record<string, string> = {
      whale_buy: 'Whale Buy', whale_sell: 'Whale Sell', smart_money: 'Smart Money',
    };

    return alerts.slice(0, 8).map((a) => ({
      id: a.id,
      icon: iconMap[a.type] || Eye,
      title: titleMap[a.type] || 'Whale Alert',
      description: `${a.symbol} — $${(a.amountUsd / 1e6).toFixed(1)}M ${a.type === 'whale_buy' ? 'bought' : 'sold'}`,
      time: a.time,
      severity: a.impact,
    }));
  }, [whaleData]);

  // Transform real narratives
  const narratives = useMemo(() => {
    const narrs = narrativeData?.narratives as Array<{
      id: string; title: string; summary: string; sentiment: 'bullish' | 'bearish' | 'neutral';
      confidence: number; tokens: string[];
    }> | undefined;

    if (!narrs) return [];

    return narrs.slice(0, 6);
  }, [narrativeData]);

  return (
    <DashboardPage
      title="Market Overview"
      subtitle={marketsLoading ? 'Loading live data...' : `Real-time intelligence • Last scan: ${currentTime || '—'}`}
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
      {/* ── Market Ticker Strip (REAL DATA) ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {marketsLoading ? (
          <><SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard /></>
        ) : (
          marketStats.map((stat) => (
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
          ))
        )}
      </div>

      {/* ── Main Grid: Alerts + Narratives ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Live Whale Alerts (REAL DATA) */}
        <div className="lg:col-span-2 dash-card">
          <SectionHeader
            title="Live Whale Alerts"
            subtitle={whalesLoading ? 'Connecting to data sources...' : `${liveAlerts.length} recent alerts`}
            action={<button onClick={() => showToast('Opening Whale Radar...', 'info')} className="text-xs text-[var(--color-primary)] hover:underline font-data">View all →</button>}
          />
          <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1 custom-scrollbar">
            <AnimatePresence>
              {whalesLoading ? (
                <><SkeletonCard /><SkeletonCard /><SkeletonCard /></>
              ) : liveAlerts.length > 0 ? (
                liveAlerts.map((alert, i) => {
                  const Icon = alert.icon;
                  const colors = severityColors[alert.severity];
                  return (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className={`flex items-start gap-3 p-3 rounded-lg border ${colors.border} ${colors.bg} cursor-pointer hover:bg-white/[0.04] transition-all group`}
                      onClick={() => showToast(alert.description, 'info')}
                    >
                      <div className="p-1.5 rounded-md bg-white/5 mt-0.5">
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
                })
              ) : (
                <EmptyState icon={Eye} title="No whale alerts" description="Connecting to real-time data sources..." />
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* AI Narratives Summary (REAL DATA) */}
        <div className="dash-card">
          <SectionHeader
            title="AI Narratives"
            subtitle={narrativesLoading ? 'Analyzing...' : `${narratives.length} active narratives`}
            action={<button onClick={() => showToast('Opening Narratives...', 'info')} className="text-xs text-[var(--color-primary)] hover:underline font-data">View all →</button>}
          />
          <div className="space-y-2 max-h-[420px] overflow-y-auto">
            {narrativesLoading ? (
              <><SkeletonCard /><SkeletonCard /></>
            ) : narratives.length > 0 ? (
              narratives.slice(0, 4).map((n) => (
                <div key={n.id} className="p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors cursor-pointer" onClick={() => showToast(`Opening: ${n.title}`, 'info')}>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[10px] font-data px-1.5 py-0.5 rounded ${
                      n.sentiment === 'bullish' ? 'bg-[var(--color-positive)]/10 text-[var(--color-positive)]' :
                      n.sentiment === 'bearish' ? 'bg-[var(--color-negative)]/10 text-[var(--color-negative)]' :
                      'bg-white/5 text-[var(--color-text-muted)]'
                    }`}>{n.sentiment === 'bullish' ? '↑ BULL' : n.sentiment === 'bearish' ? '↓ BEAR' : '— NEUTRAL'}</span>
                    <span className="text-[10px] text-[var(--color-text-muted)] font-data">{n.confidence}%</span>
                  </div>
                  <p className="text-xs font-medium text-white line-clamp-2">{n.title}</p>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {n.tokens?.map((t) => (
                      <span key={t} className="text-[10px] font-data px-1 py-0.5 rounded bg-white/5 text-[var(--color-text-secondary)]">{t}</span>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-[var(--color-text-muted)] text-center py-8">Loading narratives...</p>
            )}
          </div>
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
