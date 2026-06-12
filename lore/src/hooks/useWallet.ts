// src/hooks/useWallet.ts
'use client';

import { useState, useEffect, useCallback } from 'react';

export interface UnifiedWallet {
  connected: boolean;
  address: string;
  balance: string;
  chain: 'solana' | 'ethereum' | '';
  walletName: string;
  connectSolana: () => Promise<void>;
  connectEvm: () => Promise<void>;
  disconnect: () => Promise<void>;
  connecting: boolean;
}

export function useUnifiedWallet(): UnifiedWallet {
  const [evmAddress, setEvmAddress] = useState<string>('');
  const [evmBalance, setEvmBalance] = useState<string>('0');
  const [connecting, setConnecting] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Only read localStorage after mount (client-side only)
  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem('lore_evm_wallet');
      if (saved) {
        const { address, balance } = JSON.parse(saved);
        setEvmAddress(address);
        setEvmBalance(balance || '0');
      }
    } catch {
      // ignore
    }
  }, []);

  const connectEvm = useCallback(async () => {
    // @ts-ignore
    if (typeof window.ethereum === 'undefined') {
      window.open('https://metamask.io/download/', '_blank');
      return;
    }
    setConnecting(true);
    try {
      // @ts-ignore
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const address = accounts[0];
      // @ts-ignore
      const balanceHex = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [address, 'latest'],
      });
      const balance = (parseInt(balanceHex, 16) / 1e18).toFixed(4);

      setEvmAddress(address);
      setEvmBalance(balance);
      localStorage.setItem('lore_evm_wallet', JSON.stringify({ address, balance }));

      // @ts-ignore
      window.ethereum.on('accountsChanged', (accs: string[]) => {
        if (accs.length === 0) {
          setEvmAddress('');
          setEvmBalance('0');
          localStorage.removeItem('lore_evm_wallet');
        } else {
          setEvmAddress(accs[0]);
        }
      });
    } catch (err) {
      console.error('EVM connect failed:', err);
    }
    setConnecting(false);
  }, []);

  const connectSolana = useCallback(async () => {
    // @ts-ignore
    const solana = window.solana || window.phantom?.solana;
    if (!solana) {
      window.open('https://phantom.app/download', '_blank');
      return;
    }
    setConnecting(true);
    try {
      const resp = await solana.connect();
      const address = resp.publicKey.toString();
      setEvmAddress(address);
      setEvmBalance('0');
      localStorage.setItem('lore_evm_wallet', JSON.stringify({ address, balance: '0' }));
    } catch (err) {
      console.error('Solana connect failed:', err);
    }
    setConnecting(false);
  }, []);

  const disconnect = useCallback(async () => {
    setEvmAddress('');
    setEvmBalance('0');
    localStorage.removeItem('lore_evm_wallet');
  }, []);

  return {
    connected: !!evmAddress && mounted,
    address: evmAddress,
    balance: evmBalance,
    chain: evmAddress ? 'ethereum' as const : '',
    walletName: evmAddress ? 'MetaMask' : '',
    connectSolana,
    connectEvm,
    disconnect,
    connecting,
  };
}
