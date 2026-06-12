'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight, ArrowDownRight, Briefcase, DollarSign,
  Eye, Plus, RefreshCw, Settings, Star, TrendingUp, Wallet,
  ExternalLink, ChevronRight, PieChart as PieChartIcon
} from 'lucide-react';
import { useToast } from '@/components/Toast';

const COIN_LOGOS: Record<string, string> = {
  BTC: 'https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png',
  ETH: 'https://coin-images.coingecko.com/coins/images/279/small/ethereum.png',
  SOL: 'https://coin-images.coingecko.com/coins/images/4128/small/solana.png',
  ARB: 'https://coin-images.coingecko.com/coins/images/16547/small/photo_2023-03-29_21.47.00.jpeg',
  LINK: 'https://coin-images.coingecko.com/coins/images/877/small/chainlink-new-logo.png',
  UNI: 'https://coin-images.coingecko.com/coins/images/12504/small/uni.jpg',
};

const portfolioData = [
  { symbol: 'BTC', name: 'Bitcoin', amount: 1.245, value: 78912.45, change: 2.34, allocation: 42.1 },
  { symbol: 'ETH', name: 'Ethereum', amount: 12.8, value: 21504.00, change: -0.87, allocation: 28.3 },
  { symbol: 'SOL', name: 'Solana', amount: 245.0, value: 16118.75, change: 5.12, allocation: 15.2 },
  { symbol: 'ARB', name: 'Arbitrum', amount: 8500.0, value: 6800.00, change: 8.45, allocation: 8.1 },
  { symbol: 'LINK', name: 'Chainlink', amount: 420.0, value: 3360.00, change: -1.23, allocation: 3.8 },
  { symbol: 'UNI', name: 'Uniswap', amount: 380.0, value: 2280.00, change: 3.67, allocation: 2.5 },
];

const aiRecommendations = [
  { action: 'BUY', token: 'SOL', reason: 'Strong on-chain accumulation detected. 12 smart wallets adding positions.', confidence: 87, timeframe: '7-14 days' },
  { action: 'HOLD', token: 'BTC', reason: 'Institutional accumulation phase. Price consolidation expected before next move.', confidence: 92, timeframe: '14-30 days' },
  { action: 'SELL', token: 'ARB', reason: 'Token unlock in 72 hours. Historical pattern shows 15-20% decline post-unlock.', confidence: 78, timeframe: '3-7 days' },
];

export default function PortfolioPage() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'holdings' | 'recommendations'>('holdings');

  const totalValue = portfolioData.reduce((sum, p) => sum + p.value, 0);
  const totalChange = portfolioData.reduce((sum, p) => sum + (p.value * p.change / 100), 0);
  const totalChangePercent = (totalChange / totalValue) * 100;

  const stats = [
    { label: 'Total Value', value: `$${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, icon: DollarSign },
    { label: '24h Change', value: `${totalChangePercent >= 0 ? '+' : ''}${totalChangePercent.toFixed(2)}%`, icon: totalChangePercent >= 0 ? TrendingUp : ArrowDownRight, color: totalChangePercent >= 0 ? 'text-[var(--color-positive)]' : 'text-[var(--color-negative)]' },
    { label: 'Assets', value: portfolioData.length.toString(), icon: Briefcase },
    { label: 'Best Performer', value: 'SOL (+5.12%)', icon: Star, color: 'text-[var(--color-positive)]' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-h2 font-display text-white">Portfolio</h1>
          <p className="mt-2 text-[var(--color-text-secondary)]">Track your assets and get AI-powered recommendations.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => showToast('Refreshing portfolio...', 'info')} className="btn-secondary text-sm !px-4 !py-2.5 !rounded-lg flex items-center gap-2">
            <RefreshCw size={14} /> Refresh
          </button>
          <button onClick={() => showToast('Add asset modal coming soon', 'info')} className="btn-primary text-sm !px-4 !py-2.5 !rounded-lg flex items-center gap-2">
            <Plus size={14} /> Add Asset
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="card-glass rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon size={14} className={stat.color || 'text-[var(--color-primary)]'} />
                <span className="text-xs text-[var(--color-text-muted)] font-data">{stat.label}</span>
              </div>
              <div className={`text-2xl font-display font-bold ${stat.color || 'text-white'}`}>{stat.value}</div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
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
                  <th className="text-right px-6 py-4 text-xs text-[var(--color-text-muted)] font-data">Value</th>
                  <th className="text-right px-6 py-4 text-xs text-[var(--color-text-muted)] font-data">24h</th>
                  <th className="text-right px-6 py-4 text-xs text-[var(--color-text-muted)] font-data">Allocation</th>
                  <th className="text-right px-6 py-4 text-xs text-[var(--color-text-muted)] font-data">Action</th>
                </tr>
              </thead>
              <tbody>
                {portfolioData.map((asset, i) => (
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
                          src={COIN_LOGOS[asset.symbol] || ''}
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
                    <td className="px-6 py-4 text-right font-data text-sm text-white">${asset.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                    <td className="px-6 py-4 text-right">
                      <span className={`font-data text-sm flex items-center justify-end gap-1 ${asset.change >= 0 ? 'text-[var(--color-positive)]' : 'text-[var(--color-negative)]'}`}>
                        {asset.change >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                        {asset.change >= 0 ? '+' : ''}{asset.change}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <div className="h-full rounded-full bg-[var(--color-primary)]" style={{ width: `${asset.allocation}%` }} />
                        </div>
                        <span className="font-data text-xs text-[var(--color-text-muted)]">{asset.allocation}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => showToast(`Opening ${asset.symbol} details...`, 'info')} className="p-2 rounded-lg hover:bg-white/5 text-[var(--color-text-muted)] transition-colors">
                        <ChevronRight size={16} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {aiRecommendations.map((rec, i) => (
            <motion.div
              key={rec.token}
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
          ))}
        </div>
      )}
    </div>
  );
}
