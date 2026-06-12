// src/hooks/useWallet.ts
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useWallet as useSolanaWallet, useConnection } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';

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
  const solanaWallet = useSolanaWallet();
  const { connection } = useConnection();
  const [evmAddress, setEvmAddress] = useState<string>('');
  const [evmBalance, setEvmBalance] = useState<string>('0');
  const [connecting, setConnecting] = useState(false);
  const [solanaBalance, setSolanaBalance] = useState<string>('0');

  // Fetch SOL balance when Solana wallet connects
  useEffect(() => {
    if (solanaWallet.connected && solanaWallet.publicKey) {
      connection.getBalance(solanaWallet.publicKey).then((bal) => {
        setSolanaBalance((bal / LAMPORTS_PER_SOL).toFixed(4));
      });
    } else {
      setSolanaBalance('0');
    }
  }, [solanaWallet.connected, solanaWallet.publicKey, connection]);

  // Check for saved EVM wallet
  useEffect(() => {
    const saved = localStorage.getItem('lore_evm_wallet');
    if (saved) {
      try {
        const { address, balance } = JSON.parse(saved);
        setEvmAddress(address);
        setEvmBalance(balance || '0');
      } catch {
        localStorage.removeItem('lore_evm_wallet');
      }
    }
  }, []);

  const connectSolana = useCallback(async () => {
    if (!solanaWallet.wallet) {
      // No Solana wallet installed
      window.open('https://phantom.app/download', '_blank');
      return;
    }
    setConnecting(true);
    try {
      await solanaWallet.select(solanaWallet.wallet.adapter.name);
      await solanaWallet.connect();
    } catch (err) {
      console.error('Solana connect failed:', err);
    }
    setConnecting(false);
  }, [solanaWallet]);

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

      // Listen for account/chain changes
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

  const disconnect = useCallback(async () => {
    if (solanaWallet.connected) {
      try {
        await solanaWallet.disconnect();
      } catch {
        // ignore
      }
    }
    if (evmAddress) {
      setEvmAddress('');
      setEvmBalance('0');
      localStorage.removeItem('lore_evm_wallet');
    }
  }, [solanaWallet, evmAddress]);

  // Determine active wallet
  const solanaConnected = solanaWallet.connected && !!solanaWallet.publicKey;
  const evmConnected = !!evmAddress;

  if (solanaConnected) {
    return {
      connected: true,
      address: solanaWallet.publicKey!.toString(),
      balance: solanaBalance,
      chain: 'solana',
      walletName: solanaWallet.wallet?.adapter.name || 'Solana',
      connectSolana,
      connectEvm,
      disconnect,
      connecting,
    };
  }

  if (evmConnected) {
    return {
      connected: true,
      address: evmAddress,
      balance: evmBalance,
      chain: 'ethereum',
      walletName: 'MetaMask',
      connectSolana,
      connectEvm,
      disconnect,
      connecting,
    };
  }

  return {
    connected: false,
    address: '',
    balance: '0',
    chain: '',
    walletName: '',
    connectSolana,
    connectEvm,
    disconnect,
    connecting,
  };
}
