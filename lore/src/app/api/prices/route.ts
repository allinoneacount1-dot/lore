import { NextResponse } from 'next/server';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

export async function GET() {
  try {
    const res = await fetch(
      `${COINGECKO_API}/simple/price?ids=bitcoin,ethereum,solana,binancecoin,arbitrum,chainlink,uniswap&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true&include_market_cap=true`,
      { next: { revalidate: 30 } } // Cache 30 seconds
    );

    if (!res.ok) {
      return NextResponse.json({ error: 'CoinGecko API error' }, { status: 500 });
    }

    const data = await res.json();

    return NextResponse.json({
      BTC: {
        price: data.bitcoin?.usd || 0,
        change24h: data.bitcoin?.usd_24h_change || 0,
        volume24h: data.bitcoin?.usd_24h_vol || 0,
        marketCap: data.bitcoin?.usd_market_cap || 0,
      },
      ETH: {
        price: data.ethereum?.usd || 0,
        change24h: data.ethereum?.usd_24h_change || 0,
        volume24h: data.ethereum?.usd_24h_vol || 0,
        marketCap: data.ethereum?.usd_market_cap || 0,
      },
      SOL: {
        price: data.solana?.usd || 0,
        change24h: data.solana?.usd_24h_change || 0,
        volume24h: data.solana?.usd_24h_vol || 0,
        marketCap: data.solana?.usd_market_cap || 0,
      },
      BNB: {
        price: data.binancecoin?.usd || 0,
        change24h: data.binancecoin?.usd_24h_change || 0,
        volume24h: data.binancecoin?.usd_24h_vol || 0,
        marketCap: data.binancecoin?.usd_market_cap || 0,
      },
      ARB: {
        price: data.arbitrum?.usd || 0,
        change24h: data.arbitrum?.usd_24h_change || 0,
        volume24h: data.arbitrum?.usd_24h_vol || 0,
        marketCap: data.arbitrum?.usd_market_cap || 0,
      },
      LINK: {
        price: data.chainlink?.usd || 0,
        change24h: data.chainlink?.usd_24h_change || 0,
        volume24h: data.chainlink?.usd_24h_vol || 0,
        marketCap: data.chainlink?.usd_market_cap || 0,
      },
      UNI: {
        price: data.uniswap?.usd || 0,
        change24h: data.uniswap?.usd_24h_change || 0,
        volume24h: data.uniswap?.usd_24h_vol || 0,
        marketCap: data.uniswap?.usd_market_cap || 0,
      },
      timestamp: Date.now(),
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
