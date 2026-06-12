'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const terminalLines = [
  '$ lore scan --chain ethereum --depth full',
  '[LORE] Initializing intelligence engine...',
  '[LORE] Connecting to 14 data sources... ✓',
  '[LORE] Scanning 2.3M data points...',
  '',
  '┌─────────────────────────────────────────────────┐',
  '│ NARRATIVE REPORT — Ethereum Mainnet             │',
  '│ Generated: 2024-06-12 14:32:07 UTC              │',
  '├─────────────────────────────────────────────────┤',
  '│                                                 │',
  '│ ▸ WHALE MOVEMENT DETECTED                       │',
  '│   Wallet: 0x7a3...f29 → Binance Cold Storage    │',
  '│   Amount: 2,400 BTC ($152.3M)                   │',
  '│   Confidence: 97.2%                              │',
  '│   Narrative: Institutional accumulation phase    │',
  '│                                                 │',
  '│ ▸ EXPLOIT SIGNAL: Protocol X                    │',
  '│   Risk Level: CRITICAL                           │',
  '│   Pattern: Flash loan + oracle manipulation      │',
  '│   Est. Exposure: $4.2M                           │',
  '│   Recommendation: IMMEDIATE WITHDRAWAL           │',
  '│                                                 │',
  '│ ▸ SENTIMENT SHIFT: AI Tokens                    │',
  '│   Direction: BULLISH (+340% mentions, 24h)      │',
  '│   Smart Money: 12 wallets accumulating           │',
  '│                                                 │',
  '│ ▸ MARKET STRUCTURE                              │',
  '│   BTC Dominance: 56.3% (↑0.8%)                  │',
  '│   Fear & Greed: 42 (Fear)                        │',
  '│                                                 │',
  '└─────────────────────────────────────────────────┘',
  '',
  '[LORE] Next scan in 30s... █░░░░░░░░░',
];

export default function TerminalPreview() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= terminalLines.length) {
          setTimeout(() => setVisibleLines(0), 2000);
          return prev;
        }
        return prev + 1;
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="terminal" className="py-24 md:py-32 relative">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="font-data text-xs tracking-[0.25em] uppercase text-[#6C5CE7]">
            ◆ Live Terminal
          </span>
          <h2 className="text-h2 font-display text-white mt-4">
            See the <span className="text-gradient">narrative engine</span> in action
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {/* Terminal window */}
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0D0D12] shadow-2xl shadow-black/50">
            {/* Title bar */}
            <div className="flex items-center gap-2 px-5 py-3 bg-[#12121A] border-b border-white/5">
              <div className="w-3 h-3 rounded-full bg-[#FF5252]" />
              <div className="w-3 h-3 rounded-full bg-[#FFD93D]" />
              <div className="w-3 h-3 rounded-full bg-[#00E676]" />
              <span className="ml-3 font-data text-xs text-[#5A5A72]">lore-terminal</span>
            </div>

            {/* Terminal content */}
            <div className="p-6 font-data text-sm leading-relaxed h-[480px] overflow-hidden">
              {terminalLines.slice(0, visibleLines).map((line, i) => (
                <div key={i} className={`${
                  line.startsWith('[LORE]') ? 'text-[#6C5CE7]' :
                  line.startsWith('│ ▸') ? 'text-white font-semibold' :
                  line.startsWith('│   ') ? 'text-[#A0A0B8]' :
                  line.startsWith('│') ? 'text-[#6C5CE7]' :
                  line.startsWith('$') ? 'text-[#00E676]' :
                  'text-[#5A5A72]'
                }`}>
                  {line || '\u00A0'}
                </div>
              ))}
              <span className="inline-block w-2 h-4 bg-[#6C5CE7] animate-pulse" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
