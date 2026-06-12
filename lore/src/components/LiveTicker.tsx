'use client';

const tickerItems = [
  { text: 'WHALE ALERT: 2,400 BTC moved to Binance ↑', type: 'negative' },
  { text: 'EXPLOIT DETECTED: Protocol X drained $4.2M', type: 'negative' },
  { text: 'SMART MONEY: Wallet 0x7a3... bought 50,000 ETH', type: 'positive' },
  { text: 'NARRATIVE SHIFT: AI tokens gaining momentum', type: 'info' },
  { text: 'GAS: 12 gwei | BTC: $63,442 (+2.3%) | ETH: $1,681 (-0.8%)', type: 'neutral' },
  { text: 'SENTIMENT: Fear & Greed Index at 42 (Fear)', type: 'warning' },
  { text: 'DEPLOY: New AI protocol raised $14M in 3 minutes', type: 'positive' },
  { text: 'FLASH: Ethereum ETF sees $240M inflow today', type: 'positive' },
];

export default function LiveTicker() {
  const items = [...tickerItems, ...tickerItems];

  const getColor = (type: string) => {
    switch (type) {
      case 'positive': return 'text-[#00E676]';
      case 'negative': return 'text-[#FF5252]';
      case 'warning': return 'text-[#FFD93D]';
      case 'info': return 'text-[#42A5F5]';
      default: return 'text-[#A0A0B8]';
    }
  };

  return (
    <div className="w-full h-12 bg-[#0D0D12]/50 border-y border-white/5 overflow-hidden flex items-center">
      <div className="ticker-marquee whitespace-nowrap">
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-6 mx-4">
            <span className={`font-data text-xs ${getColor(item.type)}`}>
              {item.text}
            </span>
            <span className="text-[#5A5A72]">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
