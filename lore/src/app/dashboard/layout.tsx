// src/app/dashboard/layout.tsx
'use client';

import { useState, useEffect, type ReactNode } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell, LayoutDashboard, Menu, Radio, Search,
  Settings, Shield, Wallet, X,
  FileText, Smile, Briefcase, ChevronLeft, ChevronRight,
} from 'lucide-react';
import { WalletButton } from '@/components/WalletConnect';
import { useToast } from '@/components/Toast';
import { LoreLogo } from '@/components/LoreLogo';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const sidebarLinks = [
  { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
  { icon: Radio, label: 'Whale Radar', href: '/dashboard/whales' },
  { icon: FileText, label: 'Narratives', href: '/dashboard/narratives' },
  { icon: Shield, label: 'Exploit Detection', href: '/dashboard/exploits' },
  { icon: Smile, label: 'Sentiment', href: '/dashboard/sentiment' },
  { icon: Briefcase, label: 'Portfolio', href: '/dashboard/portfolio' },
];

/* ─── Dashboard Page Helpers ─── */
export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`skeleton ${className}`} />;
}

export function SkeletonCard() {
  return (
    <div className="dash-card space-y-3">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-7 w-32" />
      <Skeleton className="h-3 w-16" />
    </div>
  );
}

export function StatCard({
  label,
  value,
  change,
  icon: Icon,
  color = 'text-[var(--color-primary)]',
  loading = false,
}: {
  label: string;
  value: string;
  change?: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  color?: string;
  loading?: boolean;
}) {
  return (
    <div className="dash-card hover-lift">
      <div className="flex items-center justify-between mb-2">
        <span className="dash-label">{label}</span>
        {Icon && <Icon size={14} className={color} />}
      </div>
      {loading ? (
        <Skeleton className="h-7 w-28" />
      ) : (
        <>
          <div className="dash-value">{value}</div>
          {change && (
            <div className={`dash-sub mt-1 ${change.startsWith('+') ? 'price-up' : change.startsWith('-') ? 'price-down' : ''}`}>
              {change}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export function SectionHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h2 className="font-display font-semibold text-lg text-white">{title}</h2>
        {subtitle && <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function EmptyState({
  icon: Icon = Search,
  title = 'No data found',
  description = 'Try adjusting your filters or search query.',
}: {
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  title?: string;
  description?: string;
}) {
  return (
    <div className="text-center py-16">
      <Icon size={40} className="mx-auto text-[var(--color-text-muted)] mb-3" />
      <h3 className="font-display font-semibold text-white mb-1">{title}</h3>
      <p className="text-sm text-[var(--color-text-muted)]">{description}</p>
    </div>
  );
}

export function DashboardPage({
  children,
  title,
  subtitle,
  actions,
  loading = false,
}: {
  children: ReactNode;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  loading?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          {loading ? (
            <Skeleton className="h-8 w-48 mb-2" />
          ) : (
            <h1 className="text-h2 font-display text-white">{title}</h1>
          )}
          {subtitle && !loading && (
            <p className="text-sm text-[var(--color-text-muted)] mt-1">{subtitle}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
      {children}
    </motion.div>
  );
}

/* ─── Main Layout ─── */
export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { showToast } = useToast();

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] flex">
      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarCollapsed ? 72 : 260 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        className="hidden lg:flex flex-col bg-[var(--color-bg-surface)] border-r border-white/5 relative flex-shrink-0"
      >
        <div className="p-5 flex items-center justify-between border-b border-white/5 overflow-hidden">
          <Link href="/" className="flex items-center gap-2.5 min-w-0">
            <LoreLogo className="w-8 h-8 flex-shrink-0" />
            {!sidebarCollapsed && (
              <span className="font-display font-bold text-xl text-white whitespace-nowrap">LORE</span>
            )}
          </Link>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 rounded-lg hover:bg-white/5 text-[var(--color-text-muted)] hover:text-white transition-colors flex-shrink-0"
            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto" aria-label="Dashboard navigation">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.label}
                href={link.href}
                title={sidebarCollapsed ? link.label : undefined}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all ${
                  false
                    ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20'
                    : 'text-[var(--color-text-secondary)] hover:bg-white/5 hover:text-white border border-transparent'
                } ${sidebarCollapsed ? 'justify-center px-2' : ''}`}
              >
                <Icon size={18} className="flex-shrink-0" />
                {!sidebarCollapsed && <span className="whitespace-nowrap">{link.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          {sidebarCollapsed ? (
            <div className="w-full p-2.5 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center">
              <Wallet size={18} />
            </div>
          ) : (
            <WalletButton />
          )}
        </div>
      </motion.aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-50"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              className="absolute left-0 top-0 bottom-0 w-72 bg-[var(--color-bg-surface)] border-r border-white/5"
            >
              <div className="flex items-center justify-between p-5 border-b border-white/5">
                <Link href="/" className="flex items-center gap-2">
                  <LoreLogo className="w-8 h-8" />
                  <span className="font-display font-bold text-lg text-white">LORE</span>
                </Link>
                <button onClick={() => setSidebarOpen(false)} className="text-[var(--color-text-muted)] hover:text-white p-1" aria-label="Close menu">
                  <X size={20} />
                </button>
              </div>
              <nav className="px-3 py-4 space-y-1" aria-label="Dashboard navigation">
                {sidebarLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setSidebarOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[var(--color-text-secondary)] hover:bg-white/5 hover:text-white border border-transparent transition-all"
                    >
                      <Icon size={18} />
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/5">
                <WalletButton />
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-4 lg:px-8 flex-shrink-0 bg-[var(--color-bg-surface)]/50 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-[var(--color-text-secondary)] hover:text-white p-2 rounded-lg hover:bg-white/5" aria-label="Open menu">
              <Menu size={20} />
            </button>
            <div className="relative hidden sm:block">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
              <input
                type="text"
                placeholder="Search wallets, tokens, narratives..."
                className="w-64 lg:w-80 pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)]/50 focus:ring-1 focus:ring-[var(--color-primary)]/20 transition-all"
                aria-label="Search"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-positive)]/5 border border-[var(--color-positive)]/20">
              <div className="live-dot" />
              <span className="font-data text-xs text-[var(--color-positive)]">LIVE</span>
            </div>
            <button onClick={() => showToast('Notifications: 3 unread alerts', 'info')} className="relative p-2.5 rounded-xl hover:bg-white/5 transition-colors text-[var(--color-text-secondary)] hover:text-white" aria-label="Notifications">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--color-negative)]" />
            </button>
            <button onClick={() => showToast('Settings panel coming soon', 'info')} className="p-2.5 rounded-xl hover:bg-white/5 transition-colors text-[var(--color-text-secondary)] hover:text-white" aria-label="Settings">
              <Settings size={18} />
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
}
