'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight, ArrowDownRight, Briefcase, DollarSign,
  Eye, Plus, RefreshCw, Settings, Star, TrendingUp, Wallet,
  ExternalLink, ChevronRight, PieChart as PieChartIcon, Brain
} from 'lucide-react';
import { useToast } from '@/components/Toast';
import { useMarketData } from '@/hooks/useCryptoData';
import { DashboardPage, StatCard, SectionHeader, EmptyState, SkeletonCard } from '@/app/dashboard/layout';

const COIN_IDS = 'bitcoin,ethereum,solana,arbitrum,chainlink,uniswap';

export default function PortfolioPage() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'holdings' | 'recommendations'>('holdings');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Real data hook
  const { data: marketData, loading, refresh } = useMarketData();

  const handleRefresh = () => {
    setIsRefreshing(true);
    refresh();
    setTimeout(() => setIsRefreshing(false), 1500);
    showToast('Refreshing portfolio prices...', 'success');
  };

  // Transform real market data into portfolio format
  const portfolioData = useMemo(() => {
    const markets = (marketData?.markets as Array<{
      symbol: string; name: string; image: string;
      current_price: number; price_change_percentage_24h: number;
      price_change_percentage_7d_in_currency?: number;
      market_cap: number; market_cap_rank: number;
    }>) || [];

    if (markets.length === 0) return [];

    // Simulate holdings based on real prices
    const holdings = [
      { symbol: 'BTC', amount: 1.245 },
      { symbol: 'ETH', amount: 12.8 },
      { symbol: 'SOL', amount: 245.0 },
      { symbol: 'ARB', amount: 8500.0 },
      { symbol: 'LINK', amount: 420.0 },
      { symbol: 'UNI', amount: 380.0 },
    ];

    const totalValue = markets.reduce((sum, m) => {
      const holding = holdings.find(h => h.symbol === m.symbol.toUpperCase());
      return sum + (holding ? holding.amount * m.current_price : 0);
    }, 0);

    return markets.map((m) => {
      const holding = holdings.find(h => h.symbol === m.symbol.toUpperCase());
      const value = holding ? holding.amount * m.current_price : 0;
      return {
        symbol: m.symbol.toUpperCase(),
        name: m.name,
        image: m.image,
        amount: holding?.amount || 0,
        value,
        change: m.price_change_percentage_24h || 0,
        change7d: m.price_change_percentage_7d_in_currency || 0,
        allocation: totalValue > 0 ? (value / totalValue) * 100 : 0,
        marketCap: m.market_cap,
        marketCapRank: m.market_cap_rank,
      };
    }).filter(p => p.amount > 0);
  }, [marketData]);

  // AI Recommendations based on real data
  const aiRecommendations = useMemo(() => {
    const markets = (marketData?.markets as Array<{
      symbol: string; name: string;
      price_change_percentage_24h: number;
      price_change_percentage_7d_in_currency?: number;
    }>) || [];

    if (markets.length === 0) return [];

    const recs: Array<{ action: 'BUY' | 'SELL' | 'HOLD'; token: string; reason: string; confidence: number; timeframe: string }> = [];

    // Best performer = BUY signal
    const best = [...markets].sort((a, b) => (b.price_change_percentage_24h || 0) - (a.price_change_percentage_24h || 0))[0];
    if (best && best.price_change_percentage_24h > 2) {
      recs.push({
        action: 'BUY',
        token: best.symbol.toUpperCase(),
        reason: `Strong momentum: +${best.price_change_percentage_24h.toFixed(1)}% in 24h. ${best.price_change_percentage_7d_in_currency && best.price_change_percentage_7d_in_currency > 0 ? 'Weekly trend also positive at +' + best.price_change_percentage_7d_in_currency.toFixed(1) + '%.' : 'Daily momentum is strong.'} Market cap rank #${markets.findIndex(m => m.symbol === best.symbol) + 1}.`,
        confidence: Math.min(90, 60 + best.price_change_percentage_24h * 3),
        timeframe: '7-14 days',
      });
    }

    // Worst performer = SELL signal
    const worst = [...markets].sort((a, b) => (a.price_change_percentage_24h || 0) - (b.price_change_percentage_24h || 0))[0];
    if (worst && worst.price_change_percentage_24h < -5) {
      recs.push({
        action: 'SELL',
        token: worst.symbol.toUpperCase(),
        reason: `Down ${worst.price_change_percentage_24h.toFixed(1)}% in 24h. ${worst.price_change_percentage_7d_in_currency && worst.price_change_percentage_7d_in_currency < 0 ? 'Weekly trend also negative at ' + worst.price_change_percentage_7d_in_currency.toFixed(1) + '%.' : 'Weekly trend is positive, may be temporary dip.'} Consider taking profits or setting stop-loss.`,
        confidence: Math.min(85, 60 + Math.abs(worst.price_change_percentage_24h) * 2),
        timeframe: '7-14 days',
      });
    } else if (worst && worst.price_change_percentage_24h < -2) {
      recs.push({
        action: 'HOLD',
        token: worst.symbol.toUpperCase(),
        reason: `Down ${worst.price_change_percentage_24h.toFixed(1)}% in 24h. ${worst.price_change_percentage_7d_in_currency && worst.price_change_percentage_7d_in_currency < 0 ? 'Weekly trend also negative at ' + worst.price_change_percentage_7d_in_currency.toFixed(1) + '%.' : 'Weekly trend is positive, may be temporary dip.'} Consider DCA strategy.`,
        confidence: Math.min(85, 60 + Math.abs(worst.price_change_percentage_24h) * 2),
        timeframe: '14-30 days',
      });
    }

    // Stable performer = HOLD
    const stable = markets.find(m => Math.abs(m.price_change_percentage_24h || 0) < 1 && (m.price_change_percentage_7d_in_currency || 0) > 0);
    if (stable) {
      recs.push({
        action: 'HOLD',
        token: stable.symbol.toUpperCase(),
        reason: `Stable price action: ${(stable.price_change_percentage_24h || 0).toFixed(1)}% 24h, but weekly trend is +${(stable.price_change_percentage_7d_in_currency || 0).toFixed(1)}%. Accumulation phase detected.`,
        confidence: 75,
        timeframe: '30-60 days',
      });
    }

    return recs;
  }, [marketData]);

  const totalValue = portfolioData.reduce((sum, p) => sum + p.value, 0);
  const totalChange = portfolioData.reduce((sum, p) => sum + (p.value * p.change / 100), 0);
  const totalChangePercent = totalValue > 0 ? (totalChange / totalValue) * 100 : 0;
  const bestPerformer = portfolioData.length > 0
    ? portfolioData.reduce((best, p) => p.change > best.change ? p : best, portfolioData[0])
    : null;

  const pageActions = (
    <div className="flex items-center gap-2">
      <motion.div animate={{ rotate: isRefreshing ? 360 : 0 }} transition={{ duration: 1, repeat: isRefreshing ? Infinity : 0, ease: 'linear' as const }}>
        <button onClick={handleRefresh} className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-[var(--color-text-secondary)]" aria-label="Refresh">
          <RefreshCw size={16} />
        </button>
      </motion.div>
      <button onClick={() => showToast('Add asset modal coming soon', 'info')} className="btn-primary text-sm !px-4 !py-2.5 !rounded-lg flex items-center gap-2">
        <Plus size={14} /> Add Asset
      </button>
    </div>
  );

  return (
    <DashboardPage
      title="Portfolio"
      subtitle={loading ? 'Loading live prices from CoinGecko...' : `Real-time prices • ${portfolioData.length} assets tracked`}
      actions={pageActions}
    >
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {loading ? (
          <><SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard /></>
        ) : (
          <>
            <StatCard
              label="Total Value"
              value={`$${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              icon={DollarSign}
            />
            <StatCard
              label="24h Change"
              value={`${totalChangePercent >= 0 ? '+' : ''}${totalChangePercent.toFixed(2)}%`}
              icon={totalChangePercent >= 0 ? TrendingUp : ArrowDownRight}
              color={totalChangePercent >= 0 ? 'text-[var(--color-positive)]' : 'text-[var(--color-negative)]'}
            />
            <StatCard
              label="Assets"
              value={portfolioData.length.toString()}
              icon={Briefcase}
            />
            <StatCard
              label="Best Performer"
              value={bestPerformer ? `${bestPerformer.symbol} (+${bestPerformer.change.toFixed(2)}%)` : '—'}
              icon={Star}
              color="text-[var(--color-positive)]"
            />
          </>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('holdings')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'holdings' ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/30' : 'bg-white/5 text-[var(--color-text-secondary)] border border-white/10'
          }`}
        >
          Holdings
        </button>
        <button
          onClick={() => setActiveTab('recommendations')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'recommendations' ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/30' : 'bg-white/5 text-[var(--color-text-secondary)] border border-white/10'
          }`}
        >
          AI Recommendations
        </button>
      </div>

      {activeTab === 'holdings' ? (
        <div className="card-glass rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-6 py-4 text-xs text-[var(--color-text-muted)] font-data">Asset</th>
                  <th className="text-right px-6 py-4 text-xs text-[var(--color-text-muted)] font-data">Amount</th>
                  <th className="text-right px-6 py-4 text-xs text-[var(--color-text-muted)] font-data">Price</th>
                  <th className="text-right px-6 py-4 text-xs text-[var(--color-text-muted)] font-data">Value</th>
                  <th className="text-right px-6 py-4 text-xs text-[var(--color-text-muted)] font-data">24h</th>
                  <th className="text-right px-6 py-4 text-xs text-[var(--color-text-muted)] font-data">Allocation</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <tr key={i} className="border-b border-white/5">
                      <td colSpan={6} className="px-6 py-4"><div className="h-8 rounded bg-white/5 animate-pulse" /></td>
                    </tr>
                  ))
                ) : portfolioData.length > 0 ? (
                  portfolioData.map((asset, i) => (
                    <motion.tr
                      key={asset.symbol}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={asset.image || ''}
                            alt={asset.symbol}
                            className="w-8 h-8 rounded-full"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                          />
                          <div>
                            <div className="text-sm font-medium text-white">{asset.symbol}</div>
                            <div className="text-xs text-[var(--color-text-muted)]">{asset.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right font-data text-sm text-white">{asset.amount.toLocaleString()}</td>
                      <td className="px-6 py-4 text-right font-data text-sm text-white">${asset.value / asset.amount > 1 ? (asset.value / asset.amount).toLocaleString(undefined, { maximumFractionDigits: 2 }) : (asset.value / asset.amount).toFixed(6)}</td>
                      <td className="px-6 py-4 text-right font-data text-sm text-white">${asset.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                      <td className="px-6 py-4 text-right">
                        <span className={`font-data text-sm flex items-center justify-end gap-1 ${asset.change >= 0 ? 'text-[var(--color-positive)]' : 'text-[var(--color-negative)]'}`}>
                          {asset.change >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                          {asset.change >= 0 ? '+' : ''}{asset.change.toFixed(2)}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-16 h-1.5 rounded-full bg-white/10 overflow-hidden">
                            <div className="h-full rounded-full bg-[var(--color-primary)]" style={{ width: `${Math.min(asset.allocation, 100)}%` }} />
                          </div>
                          <span className="font-data text-xs text-[var(--color-text-muted)]">{asset.allocation.toFixed(1)}%</span>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12">
                      <EmptyState icon={Briefcase} title="No portfolio data" description="Loading from CoinGecko..." />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {loading ? (
            <><SkeletonCard /><SkeletonCard /></>
          ) : aiRecommendations.length > 0 ? (
            aiRecommendations.map((rec, i) => (
              <motion.div
                key={rec.token + rec.action}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="card-glass rounded-2xl p-6"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                      rec.action === 'BUY' ? 'bg-[var(--color-positive)]/10 text-[var(--color-positive)]' :
                      rec.action === 'SELL' ? 'bg-[var(--color-negative)]/10 text-[var(--color-negative)]' :
                      'bg-[var(--color-info)]/10 text-[var(--color-info)]'
                    }`}>
                      {rec.action} {rec.token}
                    </span>
                    <span className="font-data text-xs text-[var(--color-text-muted)]">{rec.confidence}% confidence</span>
                    <span className="font-data text-xs text-[var(--color-text-muted)]">ETA: {rec.timeframe}</span>
                  </div>
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4">{rec.reason}</p>
                <div className="flex gap-3">
                  <button onClick={() => showToast(`${rec.action} order for ${rec.token} coming soon`, 'info')} className="btn-primary text-sm !px-4 !py-2 !rounded-lg">
                    Execute {rec.action}
                  </button>
                  <button onClick={() => showToast('Opening detailed analysis...', 'info')} className="btn-secondary text-sm !px-4 !py-2 !rounded-lg">
                    View Analysis
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <EmptyState icon={Brain} title="No recommendations" description="Analyzing market data for AI recommendations..." />
          )}
        </div>
      )}
    </DashboardPage>
  );
}
