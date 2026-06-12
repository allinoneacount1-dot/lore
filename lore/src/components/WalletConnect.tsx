// src/components/WalletConnect.tsx
'use client';

import { useState } from 'react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, ExternalLink, Check, Wallet, ChevronDown, Loader2 } from 'lucide-react';
import { useUnifiedWallet } from '@/hooks/useWallet';

function truncateAddress(addr: string) {
  if (addr.length <= 12) return addr;
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

function getChainExplorer(address: string, chain: string) {
  if (chain === 'solana') return `https://solscan.io/account/${address}`;
  return `https://etherscan.io/address/${address}`;
}

// ─── Wallet Connect Modal ───
export function WalletConnectModal() {
  const [show, setShow] = useState(false);
  const { connectSolana, connectEvm, connecting } = useUnifiedWallet();
  const { setVisible } = useWalletModal();

  const handleSolanaConnect = async () => {
    setShow(false);
    // Use Solana wallet modal
    setVisible(true);
  };

  const handleEvmConnect = async () => {
    setShow(false);
    await connectEvm();
  };

  return (
    <>
      <button
        onClick={() => setShow(true)}
        className="btn-primary text-sm !px-5 !py-2.5 !rounded-lg"
      >
        <Wallet size={14} className="inline mr-2" />
        Connect Wallet
      </button>

      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={() => setShow(false)}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm rounded-2xl bg-[#111111] border border-white/10 p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display font-semibold text-xl text-white">Connect Wallet</h3>
                <button
                  onClick={() => setShow(false)}
                  className="p-2 rounded-lg hover:bg-white/5 text-[var(--color-text-muted)] hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-3">
                {/* Phantom / Solana */}
                <button
                  onClick={handleSolanaConnect}
                  disabled={connecting}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-purple-500/30 transition-all disabled:opacity-50 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-lg">
                    👻
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-medium text-white">Phantom</div>
                    <div className="text-xs text-[var(--color-text-muted)]">Solana</div>
                  </div>
                  {connecting ? (
                    <Loader2 size={18} className="animate-spin text-purple-400" />
                  ) : (
                    <span className="text-xs text-purple-400 group-hover:text-purple-300">→</span>
                  )}
                </button>

                {/* Solflare */}
                <button
                  onClick={handleSolanaConnect}
                  disabled={connecting}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-orange-500/30 transition-all disabled:opacity-50 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center text-lg">
                    🔥
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-medium text-white">Solflare</div>
                    <div className="text-xs text-[var(--color-text-muted)]">Solana</div>
                  </div>
                  {connecting ? (
                    <Loader2 size={18} className="animate-spin text-orange-400" />
                  ) : (
                    <span className="text-xs text-orange-400 group-hover:text-orange-300">→</span>
                  )}
                </button>

                {/* MetaMask / EVM */}
                <button
                  onClick={handleEvmConnect}
                  disabled={connecting}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-amber-500/30 transition-all disabled:opacity-50 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-lg">
                    🦊
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-medium text-white">MetaMask</div>
                    <div className="text-xs text-[var(--color-text-muted)]">Ethereum & EVMs</div>
                  </div>
                  {connecting ? (
                    <Loader2 size={18} className="animate-spin text-amber-400" />
                  ) : (
                    <span className="text-xs text-amber-400 group-hover:text-amber-300">→</span>
                  )}
                </button>
              </div>

              <p className="mt-6 text-center text-xs text-[var(--color-text-muted)]">
                By connecting, you agree to our Terms of Service
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Connected Wallet Button ───
export function WalletButton() {
  const wallet = useUnifiedWallet();
  const [showDropdown, setShowDropdown] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!wallet.connected) {
    return <WalletConnectModal />;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(wallet.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5 hover:bg-[var(--color-primary)]/10 transition-colors"
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[var(--color-positive)] animate-pulse" />
          <span className="font-data text-sm text-white">
            {truncateAddress(wallet.address)}
          </span>
        </div>
        <span className="font-data text-xs text-[var(--color-text-muted)]">
          {wallet.balance} {wallet.chain === 'solana' ? 'SOL' : 'ETH'}
        </span>
        <ChevronDown size={14} className={`text-[var(--color-text-muted)] transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute right-0 top-full mt-2 w-64 rounded-xl bg-[#111111] border border-white/10 shadow-2xl z-50 overflow-hidden"
          >
            <div className="p-3 border-b border-white/5">
              <div className="text-xs text-[var(--color-text-muted)] mb-1">
                Connected via {wallet.walletName}
              </div>
              <div className="font-data text-xs text-white break-all">{wallet.address}</div>
              <div className="font-data text-xs text-[var(--color-positive)] mt-1">
                {wallet.balance} {wallet.chain === 'solana' ? 'SOL' : 'ETH'}
              </div>
            </div>
            <div className="p-1">
              <button
                onClick={handleCopy}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[var(--color-text-secondary)] hover:bg-white/5 hover:text-white transition-colors"
              >
                {copied ? <Check size={14} className="text-[var(--color-positive)]" /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy Address'}
              </button>
              <button
                onClick={() => window.open(getChainExplorer(wallet.address, wallet.chain), '_blank')}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[var(--color-text-secondary)] hover:bg-white/5 hover:text-white transition-colors"
              >
                <ExternalLink size={14} />
                View on Explorer
              </button>
              <button
                onClick={() => { wallet.disconnect(); setShowDropdown(false); }}
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
