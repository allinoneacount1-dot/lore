import { NextResponse } from 'next/server';
import {
  getTrendingCoins,
  getMarketData,
  getTopProtocols,
  getGlobalTVL,
  getWhaleAlerts,
  getAiNarratives,
  getExploitSignals,
} from '@/lib/api/real-data';

export const revalidate = 30; // 30 second cache

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'all';

  try {
    const result: Record<string, unknown> = {};

    if (type === 'trending' || type === 'all') {
      result.trending = await getTrendingCoins().catch(() => []);
    }
    if (type === 'markets' || type === 'all') {
      result.markets = await getMarketData().catch(() => []);
    }
    if (type === 'protocols' || type === 'all') {
      result.protocols = await getTopProtocols().catch(() => []);
      result.globalTvl = await getGlobalTVL().catch(() => null);
    }
    if (type === 'whales' || type === 'all') {
      result.whaleAlerts = await getWhaleAlerts().catch(() => []);
    }
    if (type === 'narratives' || type === 'all') {
      result.narratives = await getAiNarratives().catch(() => []);
    }
    if (type === 'exploits' || type === 'all') {
      result.exploitSignals = await getExploitSignals().catch(() => []);
    }

    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
