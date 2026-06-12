// src/app/page.tsx
export default function Home() {
  return (
    <main className="relative min-h-screen text-[#F5F5FA] overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#070708]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-[1280px] mx-auto px-5 lg:px-20 h-full flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <span className="font-display font-bold text-xl text-white">LORE</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            <a href="#intelligence" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Intelligence</a>
            <a href="#narrative" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Narrative</a>
            <a href="#terminal" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Terminal</a>
            <a href="/pricing" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Pricing</a>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="font-mono text-xs text-gray-500">LIVE</span>
            </div>
            <a href="/auth/login" className="text-sm text-gray-400 hover:text-white transition-colors font-medium">Sign In</a>
            <a href="/auth/login" className="px-5 py-2.5 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium hover:bg-violet-500/20 transition-colors">
              Connect Wallet
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center pt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-[#070708]/60 via-transparent to-[#070708]/80 pointer-events-none" />
        <div className="relative z-[2] max-w-4xl mx-auto px-5 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1]">
            The Intelligence Layer{' '}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">for Crypto Markets</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Lore reads the blockchain like a living story. Every transaction a sentence.
            Every wallet a character. Every market move a plot twist.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <a href="/auth/login" className="px-8 py-4 rounded-xl bg-violet-500 text-white font-medium flex items-center gap-2 hover:bg-violet-600 transition-colors">
              Enter the Lore
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
          </div>
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-12">
            <div className="text-center">
              <div className="font-mono text-2xl md:text-3xl font-bold text-white">$2.4B+</div>
              <div className="mt-1 text-xs text-gray-500 font-mono">Intelligence processed</div>
            </div>
            <div className="text-center">
              <div className="font-mono text-2xl md:text-3xl font-bold text-white">12,847</div>
              <div className="mt-1 text-xs text-gray-500 font-mono">Wallets tracked</div>
            </div>
            <div className="text-center">
              <div className="font-mono text-2xl md:text-3xl font-bold text-white">99.2%</div>
              <div className="mt-1 text-xs text-gray-500 font-mono">Detection rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Ticker */}
      <div className="w-full h-12 bg-[#111111]/50 border-y border-white/5 overflow-hidden flex items-center">
        <div className="animate-marquee whitespace-nowrap">
          <span className="inline-flex items-center gap-6 mx-4">
            <span className="font-mono text-xs text-red-400">WHALE ALERT: 2,400 BTC moved to Binance ↑</span>
            <span className="text-gray-600">◆</span>
          </span>
          <span className="inline-flex items-center gap-6 mx-4">
            <span className="font-mono text-xs text-green-400">SMART MONEY: Wallet 0x7a3... bought 50,000 ETH</span>
            <span className="text-gray-600">◆</span>
          </span>
          <span className="inline-flex items-center gap-6 mx-4">
            <span className="font-mono text-xs text-cyan-400">NARRATIVE SHIFT: AI tokens gaining momentum</span>
            <span className="text-gray-600">◆</span>
          </span>
          <span className="inline-flex items-center gap-6 mx-4">
            <span className="font-mono text-xs text-gray-400">GAS: 12 gwei | BTC: $63,442 (+2.3%) | ETH: $1,681 (-0.8%)</span>
            <span className="text-gray-600">◆</span>
          </span>
        </div>
      </div>

      {/* Features */}
      <section id="intelligence" className="py-24 md:py-32 relative bg-[#070708]/40">
        <div className="max-w-[1280px] mx-auto px-5 lg:px-20">
          <div className="mb-16">
            <span className="font-mono text-xs tracking-[0.25em] uppercase text-violet-400">◆ Intelligence Modules</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">
              Every signal. <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">One narrative.</span>
            </h2>
            <p className="mt-4 text-lg text-gray-400 max-w-2xl">
              Six AI-powered modules working in concert. Each one specialist. Together, they see what no human analyst can.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'Narrative Engine', desc: 'Our AI reads 14 data sources simultaneously — on-chain flows, social sentiment, developer activity, token economics.', stat: '2.3M data points/min', color: 'violet' },
              { title: 'Exploit Detection', desc: 'Detect exploits before they happen. Our models identify suspicious patterns minutes before the average alert.', stat: '14 min early warning', color: 'red' },
              { title: 'Whale Radar', desc: 'Track 12,847 smart money wallets in real-time. Know what they\'re buying before the market moves.', stat: '12,847 wallets tracked', color: 'cyan' },
              { title: 'Sentiment Analysis', desc: 'Aggregate sentiment from Twitter, Discord, Telegram, and on-chain social signals.', stat: '94.2% accuracy', color: 'blue' },
            ].map((f) => (
              <div key={f.title} className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                <h3 className="font-semibold text-xl text-white mb-3">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{f.desc}</p>
                <span className="font-mono text-xs text-violet-400">{f.stat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="narrative" className="py-24 md:py-32 relative bg-[#070708]/30">
        <div className="max-w-[1280px] mx-auto px-5 lg:px-20">
          <div className="mb-16 text-center">
            <span className="font-mono text-xs tracking-[0.25em] uppercase text-violet-400">◆ How Lore Works</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">
              From noise to <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">narrative</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Ingest', desc: 'We collect data from 14+ sources: on-chain transactions, social media, developer activity, DEX flows. 2.3M data points per minute.' },
              { step: '02', title: 'Interpret', desc: 'Our AI models — trained on 3 years of crypto market data — identify patterns, anomalies, and narrative shifts.' },
              { step: '03', title: 'Reveal', desc: 'Complex data becomes a clear, actionable narrative. What happened. Why it matters. What to do next.' },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="font-mono text-8xl font-bold text-white/[0.03] mb-4">{s.step}</div>
                <h3 className="font-semibold text-2xl text-white mb-4">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Terminal */}
      <section id="terminal" className="py-24 md:py-32 relative bg-[#070708]/20">
        <div className="max-w-[1280px] mx-auto px-5 lg:px-20">
          <div className="text-center mb-12">
            <span className="font-mono text-xs tracking-[0.25em] uppercase text-violet-400">◆ Live Terminal</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">
              See the <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">narrative engine</span> in action
            </h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#070708]/70 backdrop-blur-md">
              <div className="flex items-center gap-2 px-5 py-3 bg-[#070708]/80 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-3 font-mono text-xs text-gray-500">lore-terminal</span>
              </div>
              <div className="p-6 font-mono text-sm leading-relaxed h-[300px] overflow-hidden text-gray-400">
                <div className="text-green-400">$ lore scan --chain ethereum --depth full</div>
                <div className="text-violet-400">[LORE] Initializing intelligence engine...</div>
                <div className="text-violet-400">[LORE] Connecting to 14 data sources... ✓</div>
                <div className="text-violet-400">[LORE] Scanning 2.3M data points...</div>
                <div className="text-white mt-4">┌─────────────────────────────────────────────────┐</div>
                <div className="text-white">│ NARRATIVE REPORT — Ethereum Mainnet             │</div>
                <div className="text-violet-400">│ ▸ WHALE MOVEMENT: 2,400 BTC → Binance ($152.3M)│</div>
                <div className="text-gray-500">│   Confidence: 97.2% | Institutional accumulation</div>
                <div className="text-violet-400">│ ▸ EXPLOIT SIGNAL: Protocol X | CRITICAL         │</div>
                <div className="text-gray-500">│   Flash loan + oracle manipulation | $4.2M      </div>
                <div className="text-cyan-400">│ ▸ SENTIMENT: AI Tokens +340% mentions (24h)    │</div>
                <div className="text-white">└─────────────────────────────────────────────────┘</div>
                <div className="inline-block w-2 h-4 bg-violet-400 animate-pulse mt-2" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#070708]/50 via-[#0D0D2B]/40 to-[#1A0A2E]/50" />
        <div className="relative z-10 max-w-3xl mx-auto px-5 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white">The market has a story.</h2>
          <p className="mt-4 text-2xl font-semibold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">Are you listening?</p>
          <p className="mt-6 text-lg text-gray-400 max-w-xl mx-auto">Join 2,847+ traders who see what others can't.</p>
          <a href="/auth/login" className="mt-10 inline-flex items-center gap-3 px-12 py-5 rounded-xl bg-violet-500 text-white text-lg font-medium hover:bg-violet-600 transition-colors">
            Enter the Lore
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
          <p className="mt-4 text-xs text-gray-500 font-mono">No credit card required. Start in 30 seconds.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#070708]/80 border-t border-white/5 py-16">
        <div className="max-w-[1280px] mx-auto px-5 lg:px-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-xl text-white">LORE</span>
            </div>
            <p className="text-xs text-gray-500 font-mono">© 2026 Lore Intelligence. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
