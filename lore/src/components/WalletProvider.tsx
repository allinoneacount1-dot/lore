'use client';

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';

interface WalletState {
  connected: boolean;
  address: string;
  balance: string;
  chain: string;
  walletType: string;
}

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
      } catch {
        localStorage.removeItem('lore_wallet');
      }
    }
  }, []);

  const connect = useCallback(async (walletType: string) => {
    setConnecting(true);

    try {
      if (walletType === 'phantom') {
        // @ts-ignore
        const provider = window.solana || window.phantom?.solana;
        if (provider?.isPhantom) {
          const resp = await provider.connect();
          const address = resp.publicKey.toString();
          const balance = '0.00'; // Would need to fetch from RPC

          const newWallet: WalletState = {
            connected: true,
            address,
            balance,
            chain: 'Solana',
            walletType: 'phantom',
          };
          setWallet(newWallet);
          localStorage.setItem('lore_wallet', JSON.stringify(newWallet));
        } else {
          // Phantom not installed — fall back to mock
          await mockConnect(walletType);
        }
      } else if (walletType === 'metamask') {
        // @ts-ignore
        if (typeof window.ethereum !== 'undefined') {
          // @ts-ignore
          const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
          });
          const address = accounts[0];
          // @ts-ignore
          const balance = await window.ethereum.request({
            method: 'eth_getBalance',
            params: [address, 'latest'],
          });
          const ethBalance = (parseInt(balance, 16) / 1e18).toFixed(4);

          const newWallet: WalletState = {
            connected: true,
            address,
            balance: ethBalance,
            chain: 'Ethereum',
            walletType: 'metamask',
          };
          setWallet(newWallet);
          localStorage.setItem('lore_wallet', JSON.stringify(newWallet));
        } else {
          await mockConnect(walletType);
        }
      } else {
        // WalletConnect or fallback
        await mockConnect(walletType);
      }
    } catch (err) {
      console.error('Wallet connection failed:', err);
      // Fall back to mock
      await mockConnect(walletType);
    }

    setConnecting(false);
    setShowModal(false);
  }, []);

  const mockConnect = async (walletType: string) => {
    // Simulate connection delay
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
    // Try to disconnect from actual wallet too
    try {
      // @ts-ignore
      if (window.solana?.isPhantom) {
        // @ts-ignore
        window.solana.disconnect();
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
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}
