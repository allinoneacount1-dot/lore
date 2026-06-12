'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard, Eye, FileText, Shield, Settings,
  Bell, Search, Menu, X, ChevronDown, Wallet,
  TrendingUp, TrendingDown, Activity, Zap,
  ExternalLink, Copy, Check
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', href: '/dashboard', active: true },
  { icon: Eye, label: 'Whale Radar', href: '/dashboard/whales' },
  { icon: FileText, label: 'Narrative', href: '/dashboard/narrative' },
  { icon: Shield, label: 'Exploits', href: '/dashboard/exploits' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const handleConnect = () => {
    setWalletConnected(true);
    setWalletAddress('0x7a3...f29');
  };

  return (
    <div className="flex h-screen bg-[#070708] text-[#F5F5FA] overflow-hidden">
      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-[260px] bg-[#0D0D12] border-r border-white/5 flex flex-col transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-white/5">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6C5CE7] to-[#00D2FF] flex items-center justify-center font-display font-bold text-sm text-white">
              L
            </div>
            <span className="font-display font-bold text-lg text-white">LORE</span>
          </Link>
          <button className="lg:hidden text-[#5A5A72]" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-6 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  item.active
                    ? 'bg-[#6C5CE7]/10 text-[#6C5CE7] border border-[#6C5CE7]/20'
                    : 'text-[#A0A0B8] hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={18} />
                {item.label}
                {item.label === 'Exploits' && (
                  <span className="ml-auto w-2 h-2 rounded-full bg-[#FF5252] animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Wallet Section */}
        <div className="p-4 border-t border-white/5">
          {walletConnected ? (
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00E676] to-[#00D2FF] flex items-center justify-center">
                <Wallet size={14} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-white font-data">{walletAddress}</div>
                <div className="text-[10px] text-[#00E676] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E676]" />
                  Connected
                </div>
              </div>
              <Copy size={14} className="text-[#5A5A72] cursor-pointer hover:text-white" />
            </div>
          ) : (
            <button
              onClick={handleConnect}
              className="w-full btn-primary text-sm !py-2.5 flex items-center justify-center gap-2"
            >
              <Wallet size={16} />
              Connect Wallet
            </button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 bg-[#0D0D12]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-5 lg:px-8 shrink-0">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-[#A0A0B8]" onClick={() => setSidebarOpen(true)}>
              <Menu size={20} />
            </button>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5 w-80">
              <Search size={16} className="text-[#5A5A72]" />
              <input
                type="text"
                placeholder="Search wallets, protocols, narratives..."
                className="bg-transparent text-sm text-white placeholder-[#5A5A72] outline-none w-full"
              />
              <kbd className="text-[10px] text-[#5A5A72] font-data border border-white/10 rounded px-1.5 py-0.5">⌘K</kbd>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00E676]/10 border border-[#00E676]/20">
              <span className="live-dot" />
              <span className="text-xs text-[#00E676] font-data">LIVE</span>
            </div>
            <button className="relative p-2 rounded-xl hover:bg-white/5 transition-colors">
              <Bell size={18} className="text-[#A0A0B8]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FF5252]" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6C5CE7] to-[#00D2FF] flex items-center justify-center text-xs font-bold text-white">
              L
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-5 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
