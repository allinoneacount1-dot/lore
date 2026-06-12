'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, ExternalLink, Check, Wallet, ChevronRight } from 'lucide-react';

import type { WalletState } from './WalletProvider';

const MOCK_WALLETS = [
  { name: 'Phantom', chain: 'Solana', type: 'phantom' as const },
  { name: 'MetaMask', chain: 'Ethereum', type: 'metamask' as const },
  { name: 'WalletConnect', chain: 'Multi-chain', type: 'walletconnect' as const },
];

function WalletLogo({ type, className }: { type: string; className?: string }) {
  if (type === 'phantom') {
    return (
      <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="64" cy="64" r="64" fill="#AB9FF2"/>
        <path d="M110.584 64.914H99.142C99.142 41.648 80.173 22.817 56.738 22.817C33.634 22.817 14.86 41.192 14.377 64.084C13.872 87.725 33.371 107.183 57.08 107.183H58.482C79.596 107.183 104.022 90.757 109.455 70.082C110.55 66.002 107.636 64.914 103.524 64.914H110.584ZM35.042 66.528C35.042 70.825 31.523 74.383 27.273 74.383C23.023 74.383 19.504 70.825 19.504 66.528V58.352C19.504 54.055 23.023 50.497 27.273 50.497C31.523 50.497 35.042 54.055 35.042 58.352V66.528ZM55.472 66.528C55.472 70.825 51.953 74.383 47.703 74.383C43.453 74.383 39.934 70.825 39.934 66.528V58.352C39.934 54.055 43.453 50.497 47.703 50.497C51.953 50.497 55.472 54.055 55.472 58.352V66.528Z" fill="white"/>
      </svg>
    );
  }
  if (type === 'metamask') {
    return (
      <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="64" cy="64" r="64" fill="#F6851B"/>
        <path d="M102.8 47.2L69.7 59.3L74.5 48.1L102.8 47.2Z" fill="#E2761B" stroke="#E2761B" strokeWidth="0.5"/>
        <path d="M25.2 47.2L58.1 59.5L53.5 48.1L25.2 47.2Z" fill="#E4761B" stroke="#E4761B" strokeWidth="0.5"/>
        <path d="M92.7 85.3L84.9 97.3L101.5 101.5L106.3 85.5L92.7 85.3Z" fill="#E4761B" stroke="#E4761B" strokeWidth="0.5"/>
        <path d="M21.8 85.5L26.5 101.5L43.1 97.3L35.3 85.3L21.8 85.5Z" fill="#E4761B" stroke="#E4761B" strokeWidth="0.5"/>
        <path d="M42.3 68.5L38 74.9L54.2 75.6L53.6 57.5L42.3 68.5Z" fill="#E4761B" stroke="#E4761B" strokeWidth="0.5"/>
        <path d="M85.7 68.5L74.3 57.3L74.2 75.6L90.5 74.9L85.7 68.5Z" fill="#E4761B" stroke="#E4761B" strokeWidth="0.5"/>
        <path d="M43.1 97.3L53.5 91.5L44.4 85.8L34.1 85.5L43.1 97.3Z" fill="#E4761B" stroke="#E4761B" strokeWidth="0.5"/>
        <path d="M74.5 91.5L84.9 97.3L93.9 85.5L83.6 85.8L74.5 91.5Z" fill="#E4761B" stroke="#E4761B" strokeWidth="0.5"/>
        <path d="M84.9 97.3L74.5 91.5L75.2 98.8L75 101.3L84.9 97.3Z" fill="#D7C1B3" stroke="#D7C1B3" strokeWidth="0.5"/>
        <path d="M43.1 97.3L53 101.3L52.9 98.8L53.5 91.5L43.1 97.3Z" fill="#D7C1B3" stroke="#D7C1B3" strokeWidth="0.5"/>
        <path d="M53.6 81.2L38.8 76.8L49.2 72.1L53.6 81.2Z" fill="#233447" stroke="#233447" strokeWidth="0.5"/>
        <path d="M74.4 81.2L78.8 72.1L89.2 76.8L74.4 81.2Z" fill="#233447" stroke="#233447" strokeWidth="0.5"/>
        <path d="M43.1 97.3L34.1 85.5L28.2 92.9L27.6 98.6L43.1 97.3Z" fill="#CD6116" stroke="#CD6116" strokeWidth="0.5"/>
        <path d="M93.9 85.5L84.9 97.3L100.4 98.6L99.8 92.9L93.9 85.5Z" fill="#CD6116" stroke="#CD6116" strokeWidth="0.5"/>
        <path d="M92.7 85.5L92.4 74.9L85.7 68.5L74.4 81.2L83.7 85.8L93.5 85.5H92.7Z" fill="#CD6116" stroke="#CD6116" strokeWidth="0.5"/>
        <path d="M34.1 85.5H33.4L42.5 85.8L51.7 81.2L42.3 68.5L35.6 74.9L34.1 85.5Z" fill="#CD6116" stroke="#CD6116" strokeWidth="0.5"/>
      </svg>
    );
  }
  if (type === 'walletconnect') {
    return (
      <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="64" cy="64" r="64" fill="#3B99FC"/>
        <path d="M42.3 52.8C52.5 42.6 69.1 42.6 79.3 52.8L80.5 54C81.1 54.6 81.1 55.6 80.5 56.2L76.4 60.3C76.1 60.6 75.6 60.6 75.3 60.3L73.7 58.7C66.6 51.6 55 51.6 47.9 58.7L46.2 60.4C45.9 60.7 45.4 60.7 45.1 60.4L41 56.3C40.4 55.7 40.4 54.7 41 54.1L42.3 52.8ZM96.1 66.6L99.8 70.3C100.4 70.9 100.4 71.9 99.8 72.5L74.8 97.5C74.2 98.1 73.2 98.1 72.6 97.5L54.7 79.6C54.5 79.4 54.2 79.4 54 79.6L36.1 97.5C35.5 98.1 34.5 98.1 33.9 97.5L8.9 72.5C8.3 71.9 8.3 70.9 8.9 70.3L12.6 66.6C13.2 66 14.2 66 14.8 66.6L32.7 84.5C32.9 84.7 33.2 84.7 33.4 84.5L51.3 66.6C51.9 66 52.9 66 53.5 66.6L57.2 70.3C57.8 70.9 57.8 71.9 57.2 72.5L55.6 74.1C55.3 74.4 55.3 74.9 55.6 75.2L72.6 92.2C73.2 92.8 74.2 92.8 74.8 92.2L96.1 70.9C96.7 70.3 97.7 70.3 98.3 70.9L96.1 66.6Z" fill="white"/>
      </svg>
    );
  }
  return null;
}

function truncateAddress(addr: string) {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

// WalletModal and WalletButton below use WalletState from WalletProvider context.
// The old useWallet hook has been replaced by WalletProvider for unified state.

export function WalletModal({
  show,
  onClose,
  onConnect,
  connecting,
}: {
  show: boolean;
  onClose: () => void;
  onConnect: (name: string) => void;
  connecting: boolean;
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl bg-[var(--color-bg-card)] border border-white/10 p-6 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-semibold text-xl text-white">
                Connect Wallet
              </h3>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/5 text-[var(--color-text-muted)] hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Wallet Options */}
            <div className="space-y-3">
              {MOCK_WALLETS.map((w) => (
                <button
                  key={w.name}
                  onClick={() => onConnect(w.name)}
                  disabled={connecting}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-[var(--color-primary)]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <WalletLogo type={w.type} className="w-8 h-8 rounded-lg" />
                  <div className="text-left flex-1">
                    <div className="font-medium text-white">{w.name}</div>
                    <div className="text-xs text-[var(--color-text-muted)]">{w.chain}</div>
                  </div>
                  {connecting ? (
                    <div className="w-5 h-5 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <ChevronRight size={18} className="text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] transition-colors" />
                  )}
                </button>
              ))}
            </div>

            {/* Footer */}
            <p className="mt-6 text-center text-xs text-[var(--color-text-muted)]">
              By connecting, you agree to our Terms of Service and Privacy Policy
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function WalletButton({
  wallet,
  onOpenModal,
  onDisconnect,
  onCopyAddress,
  copied,
  variant = 'default',
}: {
  wallet: WalletState;
  onOpenModal: () => void;
  onDisconnect: () => void;
  onCopyAddress: () => void;
  copied: boolean;
  variant?: 'default' | 'dashboard' | 'mobile';
}) {
  const [showDropdown, setShowDropdown] = useState(false);

  if (!wallet.connected) {
    return (
      <button
        onClick={onOpenModal}
        className={variant === 'mobile'
          ? 'btn-primary w-full text-sm'
          : 'btn-primary text-sm !px-5 !py-2.5 !rounded-lg'}
      >
        <Wallet size={14} className="inline mr-2" />
        Connect Wallet
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className={variant === 'mobile'
          ? 'w-full flex items-center justify-between p-3 rounded-xl border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5'
          : 'flex items-center gap-3 px-4 py-2.5 rounded-xl border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5 hover:bg-[var(--color-primary)]/10 transition-colors'}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[var(--color-positive)] animate-pulse" />
          <span className="font-data text-sm text-white">
            {truncateAddress(wallet.address)}
          </span>
        </div>
        <span className="font-data text-xs text-[var(--color-text-muted)]">{wallet.balance} ETH</span>
      </button>
      {/* Dropdown */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-[var(--color-bg-card)] border border-white/10 shadow-2xl z-50 overflow-hidden"
          >
            <div className="p-3 border-b border-white/5">
              <div className="text-xs text-[var(--color-text-muted)] mb-1">Connected ({wallet.chain})</div>
              <div className="font-data text-xs text-white break-all">{wallet.address}</div>
            </div>
            <div className="p-1">
              <button
                onClick={() => { onCopyAddress(); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[var(--color-text-secondary)] hover:bg-white/5 hover:text-white transition-colors"
              >
                {copied ? <Check size={14} className="text-[var(--color-positive)]" /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy Address'}
              </button>
              <button
                onClick={() => window.open(`https://etherscan.io/address/${wallet.address}`, '_blank')}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[var(--color-text-secondary)] hover:bg-white/5 hover:text-white transition-colors"
              >
                <ExternalLink size={14} />
                View on Explorer
              </button>
              <button
                onClick={() => { onDisconnect(); setShowDropdown(false); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[var(--color-negative)] hover:bg-[var(--color-negative)]/10 transition-colors"
              >
                <X size={14} />
                Disconnect
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
