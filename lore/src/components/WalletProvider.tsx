// src/components/WalletProvider.tsx
'use client';

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';

interface WalletState {
  connected: boolean;
  address: string;
  balance: string;
  chain: string;
  walletType: string;
}

export type { WalletState };

interface WalletContextType {
  wallet: WalletState;
  connect: (walletType: string) => Promise<void>;
  disconnect: () => void;
  connecting: boolean;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  openModal: () => void;
  copied: boolean;
  copyAddress: () => void;
  refreshBalance: () => Promise<void>;
}

const defaultWallet: WalletState = {
  connected: false,
  address: '',
  balance: '0.00',
  chain: '',
  walletType: '',
};

const WalletContext = createContext<WalletContextType>({
  wallet: defaultWallet,
  connect: async () => {},
  disconnect: () => {},
  connecting: false,
  showModal: false,
  setShowModal: () => {},
  openModal: () => {},
  copied: false,
  copyAddress: () => {},
  refreshBalance: async () => {},
});

export function useWalletContext() {
  return useContext(WalletContext);
}

export function WalletProvider({ children }: { children: ReactNode }) {
  const [wallet, setWallet] = useState<WalletState>(defaultWallet);
  const [connecting, setConnecting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Check for existing wallet connection on mount
  useEffect(() => {
    const savedWallet = localStorage.getItem('lore_wallet');
    if (savedWallet) {
      try {
        const parsed = JSON.parse(savedWallet);
        setWallet(parsed);
        // Reconnect to wallet silently if possible
        // @ts-ignore
        if (window.solana?.isPhantom && parsed.walletType === 'Phantom') {
          // @ts-ignore
          window.solana.connect({ onlyIfTrusted: true }).then((resp: { publicKey: { toString: () => string } }) => {
            setWallet(prev => ({ ...prev, connected: true, address: resp.publicKey.toString() }));
          }).catch(() => {});
        }
      } catch {
        localStorage.removeItem('lore_wallet');
      }
    }
  }, []);

  const fetchSolanaBalance = async (address: string): Promise<string> => {
    try {
      const HELIUS_KEY = 'c4f2eedf-0b2c-481c-9835-128e0032510c';
      const rpcUrl = `https://mainnet.helius-rpc.com/?api-key=${HELIUS_KEY}`;
      const res = await fetch(rpcUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'getBalance',
          params: [address],
        }),
      });
      const data = await res.json();
      if (data.result?.value) {
        return (data.result.value / 1e9).toFixed(4);
      }
      return '0.0000';
    } catch {
      return '0.0000';
    }
  };

  const fetchEthBalance = async (address: string): Promise<string> => {
    try {
      // @ts-ignore
      if (typeof window.ethereum !== 'undefined') {
        // @ts-ignore
        const balance = await window.ethereum.request({
          method: 'eth_getBalance',
          params: [address, 'latest'],
        });
        return (parseInt(balance, 16) / 1e18).toFixed(4);
      }
      return '0.0000';
    } catch {
      return '0.0000';
    }
  };

  const refreshBalance = useCallback(async () => {
    if (!wallet.connected || !wallet.address) return;

    try {
      if (wallet.walletType === 'Phantom' || wallet.chain === 'Solana') {
        const bal = await fetchSolanaBalance(wallet.address);
        setWallet(prev => ({ ...prev, balance: bal }));
      } else {
        const bal = await fetchEthBalance(wallet.address);
        setWallet(prev => ({ ...prev, balance: bal }));
      }
    } catch {
      // Keep existing balance on error
    }
  }, [wallet.connected, wallet.address, wallet.walletType, wallet.chain]);

  const connect = useCallback(async (walletType: string) => {
    setConnecting(true);

    try {
      if (walletType === 'phantom') {
        // @ts-ignore
        const provider = window.solana || window.phantom?.solana;
        if (provider?.isPhantom) {
          const resp = await provider.connect();
          const address = resp.publicKey.toString();
          // Fetch real SOL balance
          const balance = await fetchSolanaBalance(address);

          const newWallet: WalletState = {
            connected: true,
            address,
            balance,
            chain: 'Solana',
            walletType: 'Phantom',
          };
          setWallet(newWallet);
          localStorage.setItem('lore_wallet', JSON.stringify(newWallet));
        } else {
          // Phantom not installed — open download page
          window.open('https://phantom.app/download', '_blank');
          setConnecting(false);
          return;
        }
      } else if (walletType === 'metamask') {
        // @ts-ignore
        if (typeof window.ethereum !== 'undefined') {
          // @ts-ignore
          const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
          });
          const address = accounts[0];
          // Fetch real ETH balance
          const balance = await fetchEthBalance(address);

          const newWallet: WalletState = {
            connected: true,
            address,
            balance,
            chain: 'Ethereum',
            walletType: 'MetaMask',
          };
          setWallet(newWallet);
          localStorage.setItem('lore_wallet', JSON.stringify(newWallet));
        } else {
          // MetaMask not installed
          window.open('https://metamask.io/download/', '_blank');
          setConnecting(false);
          return;
        }
      } else if (walletType === 'walletconnect') {
        // WalletConnect v2 — use mock for now (requires @walletconnect/web3-provider)
        await mockConnect(walletType);
      } else {
        await mockConnect(walletType);
      }
    } catch (err) {
      console.error('Wallet connection failed:', err);
    }

    setConnecting(false);
    setShowModal(false);
  }, []);

  const mockConnect = async (walletType: string) => {
    await new Promise((r) => setTimeout(r, 1500));

    const addr = '0x' + Array.from({ length: 40 }, () =>
      '0123456789abcdef'[Math.floor(Math.random() * 16)]
    ).join('');

    const chains: Record<string, string> = {
      phantom: 'Solana',
      metamask: 'Ethereum',
      walletconnect: 'Ethereum',
    };

    const walletNames: Record<string, string> = {
      phantom: 'Phantom',
      metamask: 'MetaMask',
      walletconnect: 'WalletConnect',
    };

    const newWallet: WalletState = {
      connected: true,
      address: addr,
      balance: (Math.random() * 10).toFixed(4),
      chain: chains[walletType] || 'Ethereum',
      walletType: walletNames[walletType] || walletType,
    };
    setWallet(newWallet);
    localStorage.setItem('lore_wallet', JSON.stringify(newWallet));
  };

  const disconnect = useCallback(() => {
    setWallet(defaultWallet);
    localStorage.removeItem('lore_wallet');
    try {
      // @ts-ignore
      if (window.solana?.isPhantom) {
        // @ts-ignore
        window.solana.disconnect().catch(() => {});
      }
    } catch {
      // Ignore
    }
  }, []);

  const copyAddress = useCallback(() => {
    if (wallet.address) {
      navigator.clipboard.writeText(wallet.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [wallet.address]);

  const openModal = useCallback(() => setShowModal(true), []);

  return (
    <WalletContext.Provider
      value={{
        wallet,
        connect,
        disconnect,
        connecting,
        showModal,
        setShowModal,
        openModal,
        copied,
        copyAddress,
        refreshBalance,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}
