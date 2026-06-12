'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, ExternalLink, Check, Wallet, ChevronRight } from 'lucide-react';

interface WalletState {
  connected: boolean;
  address: string;
  balance: string;
  chain: string;
}

const MOCK_WALLETS = [
  { name: 'Phantom', icon: '👻', chain: 'Solana' },
  { name: 'MetaMask', icon: '🦊', chain: 'Ethereum' },
  { name: 'WalletConnect', icon: '🔗', chain: 'Multi-chain' },
];

function truncateAddress(addr: string) {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

export function useWallet() {
  const [wallet, setWallet] = useState<WalletState>({
    connected: false,
    address: '',
    balance: '0.00',
    chain: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [copied, setCopied] = useState(false);

  const connect = useCallback(async (walletName: string) => {
    setConnecting(true);
    // Simulate connection delay
    await new Promise((r) => setTimeout(r, 1500));

    // Generate mock address
    const addr = '0x' + Array.from({ length: 40 }, () =>
      '0123456789abcdef'[Math.floor(Math.random() * 16)]
    ).join('');

    const chains: Record<string, string> = {
      Phantom: 'Solana',
      MetaMask: 'Ethereum',
      WalletConnect: 'Ethereum',
    };

    setWallet({
      connected: true,
      address: addr,
      balance: (Math.random() * 10).toFixed(4),
      chain: chains[walletName] || 'Ethereum',
    });
    setConnecting(false);
    setShowModal(false);
  }, []);

  const disconnect = useCallback(() => {
    setWallet({ connected: false, address: '', balance: '0.00', chain: '' });
  }, []);

  const copyAddress = useCallback(() => {
    if (wallet.address) {
      navigator.clipboard.writeText(wallet.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [wallet.address]);

  const openModal = useCallback(() => setShowModal(true), []);

  return { wallet, showModal, setShowModal, openModal, connect, disconnect, connecting, copied, copyAddress };
}

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
            className="relative w-full max-w-md rounded-2xl bg-[#12121A] border border-white/10 p-6 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-semibold text-xl text-white">
                Connect Wallet
              </h3>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/5 text-[#5A5A72] hover:text-white transition-colors"
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
                  className="w-full flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-[#6C5CE7]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <span className="text-2xl">{w.icon}</span>
                  <div className="text-left flex-1">
                    <div className="font-medium text-white">{w.name}</div>
                    <div className="text-xs text-[#5A5A72]">{w.chain}</div>
                  </div>
                  {connecting ? (
                    <div className="w-5 h-5 border-2 border-[#6C5CE7] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <ChevronRight size={18} className="text-[#5A5A72] group-hover:text-[#6C5CE7] transition-colors" />
                  )}
                </button>
              ))}
            </div>

            {/* Footer */}
            <p className="mt-6 text-center text-xs text-[#5A5A72]">
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
          ? 'w-full flex items-center justify-between p-3 rounded-xl border border-[#6C5CE7]/30 bg-[#6C5CE7]/5'
          : 'flex items-center gap-3 px-4 py-2.5 rounded-xl border border-[#6C5CE7]/30 bg-[#6C5CE7]/5 hover:bg-[#6C5CE7]/10 transition-colors'}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#00E676] animate-pulse" />
          <span className="font-data text-sm text-white">
            {truncateAddress(wallet.address)}
          </span>
        </div>
        <span className="font-data text-xs text-[#5A5A72]">{wallet.balance} ETH</span>
      </button>
      {/* Dropdown */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-[#12121A] border border-white/10 shadow-2xl z-50 overflow-hidden"
          >
            <div className="p-3 border-b border-white/5">
              <div className="text-xs text-[#5A5A72] mb-1">Connected ({wallet.chain})</div>
              <div className="font-data text-xs text-white break-all">{wallet.address}</div>
            </div>
            <div className="p-1">
              <button
                onClick={() => { onCopyAddress(); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#A0A0B8] hover:bg-white/5 hover:text-white transition-colors"
              >
                {copied ? <Check size={14} className="text-[#00E676]" /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy Address'}
              </button>
              <button
                onClick={() => window.open(`https://etherscan.io/address/${wallet.address}`, '_blank')}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#A0A0B8] hover:bg-white/5 hover:text-white transition-colors"
              >
                <ExternalLink size={14} />
                View on Explorer
              </button>
              <button
                onClick={() => { onDisconnect(); setShowDropdown(false); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#FF5252] hover:bg-[#FF5252]/10 transition-colors"
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
