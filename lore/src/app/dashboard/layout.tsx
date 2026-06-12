'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3, Bell, Globe, LayoutDashboard, Menu, Radio,
  Search, Settings, Shield, TrendingUp, Wallet, X,
  FileText, Smile, Briefcase
} from 'lucide-react';
import { useWallet, WalletModal, WalletButton } from '@/components/WalletConnect';

const sidebarLinks = [
  { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
  { icon: Radio, label: 'Whale Radar', href: '/dashboard/whales' },
  { icon: FileText, label: 'Narratives', href: '/dashboard/narratives' },
  { icon: Shield, label: 'Exploit Detection', href: '/dashboard/exploits' },
  { icon: Smile, label: 'Sentiment', href: '/dashboard/sentiment' },
  { icon: Briefcase, label: 'Portfolio', href: '/dashboard/portfolio' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { wallet, showModal, setShowModal, connect, disconnect, connecting, copied, copyAddress } = useWallet();

  return (
    <div className="min-h-screen bg-[#070708] flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#0D0D12] border-r border-white/5">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6C5CE7] to-[#00D2FF] flex items-center justify-center font-display font-bold text-sm text-white">
              L
            </div>
            <span className="font-display font-bold text-xl text-white">LORE</span>
          </Link>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#6C5CE7]/10 text-[#6C5CE7] border border-[#6C5CE7]/20'
                    : 'text-[#A0A0B8] hover:bg-white/5 hover:text-white border border-transparent'
                }`}
              >
                <Icon size={18} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <WalletButton
            wallet={wallet}
            onOpenModal={() => setShowModal(true)}
            onDisconnect={disconnect}
            onCopyAddress={copyAddress}
            copied={copied}
            variant="dashboard"
          />
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-50"
          >
            <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              className="absolute left-0 top-0 bottom-0 w-72 bg-[#0D0D12] border-r border-white/5"
            >
              <div className="flex items-center justify-between p-5">
                <Link href="/" className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6C5CE7] to-[#00D2FF] flex items-center justify-center font-display font-bold text-sm text-white">L</div>
                  <span className="font-display font-bold text-lg text-white">LORE</span>
                </Link>
                <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-[#5A5A72] hover:text-white p-1">
                  <X size={20} />
                </button>
              </div>
              <nav className="px-3 space-y-1">
                {sidebarLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-[#6C5CE7]/10 text-[#6C5CE7] border border-[#6C5CE7]/20'
                          : 'text-[#A0A0B8] hover:bg-white/5 hover:text-white border border-transparent'
                      }`}
                    >
                      <Icon size={18} />
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/5">
                <WalletButton
                  wallet={wallet}
                  onOpenModal={() => { setShowModal(true); setSidebarOpen(false); }}
                  onDisconnect={disconnect}
                  onCopyAddress={copyAddress}
                  copied={copied}
                  variant="mobile"
                />
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-[#A0A0B8] hover:text-white p-2 rounded-lg hover:bg-white/5">
              <Menu size={20} />
            </button>
            <div className="relative hidden sm:block">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5A5A72]" />
              <input
                type="text"
                placeholder="Search wallets, tokens, narratives..."
                className="w-64 lg:w-80 pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-[#5A5A72] focus:outline-none focus:border-[#6C5CE7]/50 focus:ring-1 focus:ring-[#6C5CE7]/20 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00E676]/5 border border-[#00E676]/20">
              <div className="live-dot" />
              <span className="font-data text-xs text-[#00E676]">LIVE</span>
            </div>
            <button className="relative p-2.5 rounded-xl hover:bg-white/5 transition-colors text-[#A0A0B8] hover:text-white">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FF5252]" />
            </button>
            <button className="p-2.5 rounded-xl hover:bg-white/5 transition-colors text-[#A0A0B8] hover:text-white">
              <Settings size={18} />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>

      {/* Wallet Modal */}
      <WalletModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConnect={connect}
        connecting={connecting}
      />
    </div>
  );
}
