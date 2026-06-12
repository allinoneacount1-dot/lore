'use client';

import { useState, useEffect, useCallback } from 'react';

const API_BASE = '/api/crypto-data';

export interface CryptoData {
  trending?: unknown[];
  markets?: unknown[];
  protocols?: unknown[];
  globalTvl?: { tvl: number; change24h: number } | null;
  whaleAlerts?: unknown[];
  narratives?: unknown[];
  exploitSignals?: unknown[];
  success: boolean;
  error?: string;
}

export function useCryptoData(type: string = 'all', pollInterval = 30000) {
  const [data, setData] = useState<CryptoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}?type=${type}`);
      const json = await res.json();
      setData(json);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch');
      // Keep previous data on error
    } finally {
      setLoading(false);
    }
  }, [type]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, pollInterval);
    return () => clearInterval(interval);
  }, [fetchData, pollInterval]);

  const refresh = useCallback(() => {
    setLoading(true);
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refresh };
}

// Individual hooks for specific data types
export function useTrendingCoins() {
  return useCryptoData('trending');
}

export function useMarketData() {
  return useCryptoData('markets');
}

export function useProtocols() {
  return useCryptoData('protocols');
}

export function useWhaleAlerts() {
  return useCryptoData('whales');
}

export function useNarratives() {
  return useCryptoData('narratives');
}

export function useExploitSignals() {
  return useCryptoData('exploits');
}
