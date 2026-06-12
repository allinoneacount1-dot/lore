'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search, Filter, ArrowUpRight, ArrowDownRight, ExternalLink,
  TrendingUp, TrendingDown, Clock, Star, Plus, Eye,
  ChevronDown, ChevronRight, Activity, Wallet
} from 'lucide-react';

const whaleData = [
  {
    rank: 1, address: '0x7a3b...f29c', name: 'Whale Alpha',
    value: '$152.3M', change24h: '+12.4%', change7d: '+28.7%',
    tokens: 24, lastActive: '2 min ago', risk: 'low',
    followers: 1247, avatar: 'WA'
  },
  {
    rank: 2, address: '0x8b2c...a14d', name: 'Smart Money',
    value: '$89.7M', change24h: '+8.2%', change7d: '+15.3%',
    tokens: 18, lastActive: '15 min ago', risk: 'low',
    followers: 892, avatar: 'SM'
  },
  {
    rank: 3, address: '0x3c9d...d77e', name: 'Institution Beta',
    value: '$234.1M', change24h: '-2.1%', change7d: '+5.8%',
    tokens: 42, lastActive: '1 hr ago', risk: 'medium',
    followers: 2341, avatar: 'IB'
  },
  {
    rank: 4, address: '0x1f4e...e88a', name: 'DeFi Whale',
    value: '$67.2M', change24h: '+15.8%', change7d: '+42.1%',
    tokens: 31, lastActive: '5 min ago', risk: 'high',
    followers: 634, avatar: 'DW'
  },
  {
    rank: 5, address: '0x9d1f...b33c', name: 'Early Adopter',
    value: '$45.9M', change24h: '-5.3%', change7d: '-12.4%',
    tokens: 12, lastActive: '3 hrs ago', risk: 'medium',
    followers: 445, avatar: 'EA'
  },
  {
    rank: 6, address: '0x5g7h...c44d', name: 'NFT Collector',
    value: '$38.4M', change24h: '+3.7%', change7d: '+8.9%',
    tokens: 8, lastActive: '45 min ago', risk: 'low',
    followers: 312, avatar: 'NC'
  },
  {
    rank: 7, address: '0x2i8j...d55e', name: 'Arbitrage Bot',
    value: '$29.1M', change24h: '+22.1%', change7d: '+56.3%',
    tokens: 67, lastActive: '1 min ago', risk: 'high',
    followers: 189, avatar: 'AB'
  },
  {
    rank: 8, address: '0x6k9l...e66f', name: 'VC Fund',
    value: '$187.6M', change24h: '+1.2%', change7d: '+3.4%',
    tokens: 156, lastActive: '2 hrs ago', risk: 'low',
    followers: 3456, avatar: 'VF'
  },
];

const recentMovements = [
  { wallet: '0x7a3...f29c', action: 'Bought', token: '$ETH', amount: '12,400 ETH ($20.8M)', time: '2 min ago', impact: 'high' },
  { wallet: '0x8b2...a14d', action: 'Sold', token: '$BTC', amount: '800 BTC ($50.7M)', time: '8 min ago', impact: 'high' },
  { wallet: '0x1f4...e88a', action: 'Bought', token: '$AI', amount: '2.4M $AI ($4.2M)', time: '12 min ago', impact: 'medium' },
  { wallet: '0x9d1...b33c', action: 'Staked', token: '$SOL', amount: '50,000 SOL ($3.3M)', time: '25 min ago', impact: 'low' },
  { wallet: '0x5g7...c44d', action: 'Bought', token: '$PEPE', amount: '$12.4M', time: '32 min ago', impact: 'medium' },
  { wallet: '0x6k9...e66f', action: 'DCA', token: '$BTC', amount: '200 BTC ($12.7M)', time: '1 hr ago', impact: 'medium' },
];

export default function WhaleRadarPage() {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('value');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-h2 font-display text-white">Whale Radar</h1>
        <p className="text-sm text-[#5A5A72] mt-1">
          Track 12,847 smart money wallets in real-time
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Tracked', value: '12,847', icon: Eye, color: 'text-[#00D2FF]' },
          { label: 'Active (24h)', value: '3,421', icon: Activity, color: 'text-[#00E676]' },
          { label: 'Net Inflow', value: '+$247M', icon: TrendingUp, color: 'text-[#00E676]' },
          { label: 'Net Outflow', value: '-$89M', icon: TrendingDown, color: 'text-[#FF5252]' },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="card-glass rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-[#5A5A72] font-data">{stat.label}</span>
                <Icon size={16} className={stat.color} />
              </div>
              <div className="text-2xl font-display font-bold text-white">{stat.value}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Whale Leaderboard */}
        <div className="lg:col-span-2 card-glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-semibold text-lg text-white">Whale Leaderboard</h2>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                <Filter size={14} className="text-[#5A5A72]" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="bg-transparent text-xs text-white outline-none"
                >
                  <option value="all">All Wallets</option>
                  <option value="low">Low Risk</option>
                  <option value="medium">Medium Risk</option>
                  <option value="high">High Risk</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {whaleData.map((whale) => (
              <motion.div
                key={whale.rank}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: whale.rank * 0.04 }}
                className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group"
              >
                <div className="w-8 text-center">
                  <span className="text-sm font-data text-[#5A5A72]">#{whale.rank}</span>
                </div>

                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6C5CE7]/30 to-[#00D2FF]/30 flex items-center justify-center text-xs font-bold text-white">
                  {whale.avatar}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white group-hover:text-[#6C5CE7] transition-colors">
                      {whale.name}
                    </span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      whale.risk === 'low' ? 'bg-[#00E676]/10 text-[#00E676]' :
                      whale.risk === 'medium' ? 'bg-[#FFD93D]/10 text-[#FFD93D]' :
                      'bg-[#FF5252]/10 text-[#FF5252]'
                    }`}>
                      {whale.risk}
                    </span>
                  </div>
                  <div className="text-[10px] text-[#5A5A72] font-data">{whale.address} • {whale.tokens} tokens</div>
                </div>

                <div className="text-right hidden sm:block">
                  <div className="text-sm text-white font-data">{whale.value}</div>
                  <div className={`text-[10px] font-data ${whale.change24h.startsWith('+') ? 'text-[#00E676]' : 'text-[#FF5252]'}`}>
                    {whale.change24h} (24h)
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-[#5A5A72] font-data">{whale.followers} 👥</span>
                  <ChevronRight size={16} className="text-[#5A5A72] group-hover:text-white transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Movements */}
        <div className="card-glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-semibold text-lg text-white">Recent Movements</h2>
            <span className="text-xs text-[#5A5A72] font-data">Live</span>
          </div>

          <div className="space-y-3">
            {recentMovements.map((movement, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-data text-[#6C5CE7]">{movement.wallet}</span>
                  <span className="text-[10px] text-[#5A5A72] font-data flex items-center gap-1">
                    <Clock size={8} />
                    {movement.time}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                    movement.action === 'Bought' ? 'bg-[#00E676]/10 text-[#00E676]' :
                    movement.action === 'Sold' ? 'bg-[#FF5252]/10 text-[#FF5252]' :
                    'bg-[#42A5F5]/10 text-[#42A5F5]'
                  }`}>
                    {movement.action}
                  </span>
                  <span className="text-xs text-white">{movement.token}</span>
                </div>
                <div className="text-xs text-[#A0A0B8] mt-1">{movement.amount}</div>
              </motion.div>
            ))}
          </div>

          {/* Add Wallet */}
          <button className="w-full mt-4 py-3 rounded-xl border border-dashed border-white/10 text-sm text-[#5A5A72] hover:text-white hover:border-[#6C5CE7]/30 transition-all flex items-center justify-center gap-2">
            <Plus size={16} />
            Track New Wallet
          </button>
        </div>
      </div>
    </motion.div>
  );
}
