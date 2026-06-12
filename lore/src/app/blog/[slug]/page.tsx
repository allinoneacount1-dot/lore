'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Share2,
  X,
  ExternalLink as LinkedinIcon,
  Link2,
  BookOpen,
  ChevronRight,
  Sparkles,
  Eye,
  Heart,
  MessageCircle,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/* ─── types ─── */
interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  views: number;
  likes: number;
  comments: number;
  coverGradient: string;
  content: string;
}

/* ─── mock data ─── */
const articles: Record<string, BlogArticle> = {
  'ai-whale-tracking-intelligence': {
    slug: 'ai-whale-tracking-intelligence',
    title: 'How AI Tracks Whale Movements Before They Hit the Market',
    excerpt:
      'Our proprietary NLP models parse on-chain flow patterns and social sentiment in real time, surfacing whale accumulation signals up to 47 minutes before major price movements.',
    author: 'Dr. Elena Vasquez',
    authorRole: 'Head of On-Chain Research',
    date: 'Jun 10, 2026',
    readTime: '8 min read',
    category: 'AI & ML',
    tags: ['Whale Tracking', 'On-Chain AI', 'Alpha Generation', 'NLP'],
    views: 12400,
    likes: 342,
    comments: 28,
    coverGradient: 'from-violet-600/30 via-purple-900/20 to-cyan-500/10',
    content: `
## The Invisible Hand on Chain

Every day, thousands of wallets holding nine and ten figures worth of crypto make moves that ripple across markets. For the average trader, these movements are invisible — buried under millions of transactions, scattered across dozens of blockchains, and obscured by layers of DeFi protocols.

At LORE, we built an AI system that sees what others can't.

## How Whale Tracking Works

Whale tracking isn't just about watching large wallets. It's about understanding **intent** — distinguishing between a cold wallet reshuffle, an exchange hot wallet rebalance, and genuine accumulation or distribution.

Our system processes over 2.3 million on-chain events per hour across 14 blockchains. Here's the pipeline:

1. **Signal Detection** — We identify wallets that have historically moved markets. These aren't just the top 100 holders; they're wallets whose past movements correlated with price action at a statistically significant level.

2. **Pattern Recognition** — Using transformer-based models trained on 3 years of labeled on-chain data, we classify wallet behavior into 12 distinct patterns: accumulation, distribution, cross-chain bridging, exchange inflow, exchange outflow, and more.

3. **Sentiment Overlay** — We layer social sentiment from Twitter, Discord, Telegram, and governance forums on top of on-chain signals. When a whale starts accumulating AND social sentiment shifts bullish, the signal strength increases dramatically.

4. **Temporal Analysis** — Timing matters. A whale buying $50M of ETH over 30 days is very different from buying it in 30 minutes. Our models account for velocity, not just volume.

## The 47-Minute Edge

In backtesting against 18 months of historical data across BTC, ETH, and SOL, our whale accumulation signals preceded major price movements by an average of **47 minutes**. For distribution signals, the lead time was even longer — 63 minutes on average.

This isn't magic. It's the result of whales needing time to execute large orders without slippage. They use TWAP strategies, split across DEXs, route through bridges — and every one of those steps leaves a trace.

## Real-World Example: The March 2026 ETH Accumulation

On March 14, 2026, our system flagged unusual accumulation activity across 7 wallets that had been dormant for 6+ months. Over the following 72 hours, these wallets accumulated approximately $340M worth of ETH through a combination of:

- OTC desk transfers (detected via known counterparty addresses)
- DEX swaps across Uniswap V4, Curve, and Balancer
- Cross-chain bridges from Arbitrum and Optimism

Within 96 hours of the initial signal, ETH rallied 18%. Traders who acted on the LORE alert had a significant head start.

## Why This Matters for DeFi

Whale movements aren't just about price prediction. They're about **risk management**. When large holders start moving to exchanges, it often precedes selling pressure. When they move to DeFi protocols, it signals confidence.

For DeFi users specifically, whale tracking helps with:

- **MEV protection** — Knowing when large orders are likely coming allows you to adjust gas strategies
- **Liquidity planning** — Anticipating large withdrawals from lending protocols
- **Governance foresight** — Large token holders moving to wallets often precede governance proposals

## The Future: Predictive On-Chain Intelligence

We're currently training our next-generation models on a dataset that includes not just on-chain data, but also:

- Derivatives funding rates and open interest
- Options flow and implied volatility surfaces
- Cross-asset correlations (tradfi + crypto)
- Macroeconomic event calendars

The goal is to move from **reactive** whale tracking (detecting what's already happening) to **predictive** intelligence (anticipating what will happen next).

The whales aren't going away. But with AI-powered on-chain intelligence, the information asymmetry that once favored them is rapidly dissolving.
    `,
  },
  'defi-security-exploit-detection': {
    slug: 'defi-security-exploit-detection',
    title: "Inside LORE's DeFi Exploit Detection Engine",
    excerpt:
      'A deep-dive into the architecture that monitors 14 chains simultaneously and has prevented over $200M in potential exploit losses.',
    author: 'Marcus Chen',
    authorRole: 'Chief Security Architect',
    date: 'May 20, 2026',
    readTime: '12 min read',
    category: 'Security',
    tags: ['DeFi Security', 'Exploit Detection', 'Smart Contracts', 'Real-Time Monitoring'],
    views: 18700,
    likes: 521,
    comments: 64,
    coverGradient: 'from-red-600/20 via-orange-900/15 to-yellow-500/10',
    content: `
## $200M Saved. Zero False Negatives.

Since launching our exploit detection engine in Q3 2025, LORE has monitored over 4.2 million smart contract interactions across 14 blockchains. In that time, we've detected and alerted on 37 active exploit attempts — with zero false negatives and a false positive rate of just 0.3%.

This is the story of how we built it.

## The Problem: DeFi's Security Gap

DeFi protocols manage hundreds of billions of dollars in TVL. Yet the security infrastructure protecting that capital is, in many cases, alarmingly thin. Most protocols rely on:

- **Static analysis** (one-time audits that become stale)
- **Bug bounties** (reactive, not preventive)
- **Community vigilance** (unreliable and slow)

The result? Over $3.8 billion was lost to DeFi exploits in 2025 alone. Flash loan attacks, oracle manipulations, reentrancy bugs, and governance attacks continue to drain protocols at a staggering pace.

## Architecture Overview

Our exploit detection engine operates on three layers:

### Layer 1: Transaction Monitoring

Every transaction that interacts with a known DeFi protocol is analyzed in real-time. We maintain a mempool-level view across Ethereum, BSC, Arbitrum, Optimana, Solana, and 9 other chains.

Key checks at this layer include:

- **Flash loan detection** — Identifying single-block borrow-and-repay patterns
- **Oracle manipulation signals** — Spotting large swaps that could skew price feeds
- **Access control anomalies** — Detecting when privileged functions are called by unexpected addresses
- **Gas price anomalies** — Unusual gas bidding often indicates MEV or exploit activity

### Layer 2: State Analysis

After a transaction is included in a block, we perform deep state analysis:

- **Balance reconciliation** — Do the post-state balances match expected values given the transaction inputs?
- **Invariant checking** — For AMMs, we verify that constant-product (or constant-sum) invariants hold. For lending protocols, we check collateralization ratios.
- **Approval tracking** — We monitor token approval changes for patterns consistent with phishing or malicious contract upgrades.

### Layer 3: Behavioral Modeling

This is where our AI models shine. We've trained classifiers on a dataset of 12,000+ historical exploits, learning the behavioral patterns that precede attacks:

- **Frontrunning preparation** — Attackers often deploy contracts, fund them, and test with small transactions before the main exploit
- **Multi-protocol orchestration** — Complex exploits often involve interactions across 3-5 protocols in a single transaction
- **Funding patterns** — Exploit contracts are typically funded via Tornatic Cash, cross-chain bridges, or privacy-preserving swaps

## Case Study: The Orion Protocol Save

On February 8, 2026, our engine detected an attempted exploit on Orion Protocol's cross-chain liquidity pool. Here's the timeline:

**T-0:00:00** — Our system flagged a contract deployment with bytecode 94% similar to known exploit contracts.

**T+0:00:12** — The attacker initiated a flash loan of $80M from Aave.

**T+0:00:15** — Our Layer 1 detection fired. Alert sent to Orion's security team and all LORE Terminal users.

**T+0:00:34** — Orion's emergency pause was triggered (they had integrated our webhook API).

**T+0:01:02** — The attacker's exploit transaction was submitted but failed due to the pause.

Total time from first signal to protocol protection: **15 seconds**. Total funds saved: **$80M**.

## The Detection Models

Our core detection model is an ensemble of:

1. **Graph Neural Network (GNN)** — Models the transaction graph to detect unusual fund flows
2. **Transformer-based sequence model** — Analyzes the sequence of contract calls within a transaction
3. **Anomaly detection autoencoder** — Flags transactions that deviate from normal protocol behavior

The ensemble achieves a 99.7% detection rate on known exploit types and a 94.2% detection rate on novel (zero-day) exploit patterns.

## Integration for Protocols

Any DeFi protocol can integrate our exploit detection via:

- **Webhook alerts** — Real-time POST requests when suspicious activity is detected
- **API access** — Query our risk scores for any address or transaction
- **Emergency pause integration** — Direct integration with pauseable contracts for automated response

## Looking Ahead: Proactive Security

The next frontier is **proactive** exploit detection — identifying vulnerable contracts before they're exploited. We're currently building:

- **Formal verification as a service** — Automated mathematical proofs of contract correctness
- **Economic attack simulation** — Agent-based models that try to find attack vectors by simulating rational adversaries
- **Cross-protocol dependency mapping** — Understanding how exploits in one protocol can cascade through the entire DeFi ecosystem

Security in DeFi isn't a feature. It's the foundation. And we're building the tools to make that foundation unbreakable.
    `,
  },
  'cross-chain-liquidity-intelligence': {
    slug: 'cross-chain-liquidity-intelligence',
    title: 'Cross-Chain Liquidity Mapping: The Hidden Order Flow',
    excerpt:
      'Tracking capital as it bridges between Ethereum, Solana, and L2s reveals institutional positioning that single-chain analysis misses entirely.',
    author: 'Sarah Kim',
    authorRole: 'Senior Research Analyst',
    date: 'May 3, 2026',
    readTime: '9 min read',
    category: 'Research',
    tags: ['Cross-Chain', 'Liquidity', 'Institutional Flow', 'Bridge Analytics'],
    views: 9800,
    likes: 267,
    comments: 41,
    coverGradient: 'from-cyan-600/25 via-blue-900/20 to-violet-500/10',
    content: `
## The Multi-Chain Reality

The crypto market is no longer a single-chain world. Ethereum, Solana, Bitcoin L2s, Cosmos appchains, and a growing constellation of Layer 2s each host significant liquidity. Institutional players don't think in chains — they think in **strategies** that span all of them.

If you're only watching Ethereum, you're seeing maybe 40% of the picture.

## Why Cross-Chain Analysis Matters

Consider this scenario: A large fund wants to build a $200M position in DeFi yield strategies. They might:

1. Bridge $50M from Ethereum mainnet to Arbitrum via Stargate
2. Deploy $30M on Solana via Wormhole
3. Keep $70M on Ethereum mainnet for blue-chip positions
4. Allocate $50M to Base via the Optimism bridge

If you're only monitoring Ethereum, you see $70M. If you're monitoring Arbitrum, you see $50M. But the **real story** — a $200M institutional deployment — is only visible when you connect the dots across all chains.

## The Bridge Problem

Cross-chain bridges are the connective tissue of DeFi, and they're also one of the richest data sources available. Every bridge transaction tells a story:

- **Direction** — Which chain is capital flowing to/from?
- **Magnitude** — How much value is moving?
- **Timing** — When did the flow start, and how long does it last?
- **Counterparty** — Is this a known institution, a DAO treasury, or a retail user?

We track 23 major bridges across 14 chains, processing over 500,000 bridge transactions per day.

## Institutional Positioning: A Case Study

In April 2026, our cross-chain liquidity maps revealed a fascinating pattern:

**Week 1:** $120M flowed from Ethereum to Arbitrum via the native bridge. The receiving wallets had historical ties to a known crypto fund.

**Week 2:** $80M flowed from Ethereum to Base. Same fund, different deployment.

**Week 3:** $45M flowed from Solana to Ethereum via Wormhole — the fund was rebalancing back to mainnet.

**Week 4:** The fund's Ethereum wallets began interacting with ETH staking contracts, depositing 15,000 ETH (~$54M).

The single-chain view showed fragmented, unremarkable activity. The cross-chain view revealed a **$245M institutional rotation** from Solana and L2s back into Ethereum staking — a strong signal of a long-term bullish ETH thesis.

## Liquidity Heatmaps

One of our most powerful tools is the **Cross-Chain Liquidity Heatmap** — a real-time visualization of where capital is concentrated and how it's moving.

Key metrics we track:

- **Net bridge flow** — Inflows minus outflows per chain, per token
- **Bridge velocity** — How quickly capital moves through bridges (fast = speculative, slow = strategic)
- **Chain dominance** — Which chains are gaining/losing TVL share
- **Token migration** — Which tokens are being bridged most actively

## The L2 Wars: What the Data Says

Our cross-chain data reveals some striking trends in the Layer 2 landscape:

- **Arbitrum** continues to dominate in DeFi TVL, but growth has plateaued
- **Base** is the fastest-growing L2, driven by consumer apps and memecoins
- **zkSync Era** and **StarkNet** are seeing steady institutional inflows
- **Optimism** (with the Superchain vision) is attracting ecosystem-level capital

The key insight: **institutional capital is flowing to L2s with the strongest ecosystem narratives**, not necessarily the best technology. Narrative drives capital, and capital drives narrative.

## Practical Applications

For traders and analysts, cross-chain liquidity intelligence provides:

1. **Early trend detection** — Capital flows to new chains often precede ecosystem growth
2. **Risk assessment** — Large outflows from a chain can signal declining confidence
3. **Yield optimization** — Identifying which chains have the deepest liquidity for best execution
4. **Narrative confirmation** — Validating or debunking market narratives with hard data

## The Road Ahead

We're expanding our cross-chain coverage to include:

- **Bitcoin L2s** (Stacks, Lightning, emerging rollups)
- **Cosmos IBC flows** — Tracking inter-chain transfers across the Cosmos ecosystem
- **Intent-based bridging** — As the industry moves toward intent-based architectures, we're adapting our models to track solver behavior
- **Cross-chain MEV** — Understanding how MEV opportunities span multiple chains

The future of crypto intelligence is multi-chain. The question isn't whether to analyze cross-chain flows — it's whether you can afford not to.
    `,
  },
};

/* ─── animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

/* ─── render markdown-like content ─── */
function renderContent(content: string) {
  const lines = content.trim().split('\n');
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];
  let listKey = 0;

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${listKey++}`} className="my-4 space-y-2 pl-1">
          {listItems.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-[var(--color-text-secondary)] leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--color-primary)] shrink-0" />
              <span dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
            </li>
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  const formatInline = (text: string): string => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
      .replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 rounded bg-[var(--color-bg-card)] text-[var(--color-secondary)] text-sm font-data">$1</code>');
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line === '') {
      flushList();
      continue;
    }

    if (line.startsWith('## ')) {
      flushList();
      elements.push(
        <h2 key={i} className="text-2xl md:text-3xl font-display font-bold text-white mt-10 mb-4 leading-tight">
          {line.replace('## ', '')}
        </h2>
      );
    } else if (line.startsWith('### ')) {
      flushList();
      elements.push(
        <h3 key={i} className="text-xl font-display font-semibold text-white mt-8 mb-3">
          {line.replace('### ', '')}
        </h3>
      );
    } else if (line.startsWith('- ')) {
      listItems.push(line.replace('- ', ''));
    } else {
      flushList();
      elements.push(
        <p key={i} className="text-[var(--color-text-secondary)] leading-[1.8] mb-4" dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
      );
    }
  }
  flushList();

  return elements;
}

/* ─── page component ─── */
export default function BlogArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const article = articles[slug];

  if (!article) {
    return (
      <main className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-5">
          <h1 className="text-4xl font-display font-bold text-white mb-4">Article Not Found</h1>
          <p className="text-[var(--color-text-secondary)] mb-8">
            The article you're looking for doesn't exist or has been moved.
          </p>
          <Link href="/blog" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft size={16} />
            Back to Blog
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const relatedArticles = Object.values(articles).filter((a) => a.slug !== slug).slice(0, 2);

  return (
    <main className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] overflow-x-hidden">
      <Navbar />

      {/* ═══════════ ARTICLE HERO ═══════════ */}
      <section className="relative pt-28 pb-12 px-5 lg:px-20 overflow-hidden">
        {/* decorative glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[var(--color-primary)]/8 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative max-w-[800px] mx-auto">
          {/* back link */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors mb-8 group"
            >
              <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Link>
          </motion.div>

          {/* category badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-data font-medium bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20 mb-5">
              <Tag size={11} />
              {article.category}
            </span>
          </motion.div>

          {/* title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white leading-tight mb-6"
          >
            {article.title}
          </motion.h1>

          {/* excerpt */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-8"
          >
            {article.excerpt}
          </motion.p>

          {/* meta row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center gap-x-6 gap-y-3 pb-8 border-b border-white/5"
          >
            {/* author */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center text-white text-sm font-bold">
                {article.author.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <p className="text-sm font-medium text-white">{article.author}</p>
                <p className="text-xs text-[var(--color-text-muted)]">{article.authorRole}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-data text-[var(--color-text-muted)]">
              <span className="flex items-center gap-1.5">
                <Calendar size={13} />
                {article.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={13} />
                {article.readTime}
              </span>
              <span className="flex items-center gap-1.5">
                <Eye size={13} />
                {article.views.toLocaleString()}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ COVER IMAGE ═══════════ */}
      <section className="px-5 lg:px-20 pb-12">
        <div className="max-w-[800px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className={`relative h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden bg-gradient-to-br ${article.coverGradient} border border-white/5`}
          >
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1/4 left-1/3 w-40 h-40 rounded-full bg-[var(--color-primary)] blur-[80px]" />
              <div className="absolute bottom-1/4 right-1/4 w-32 h-32 rounded-full bg-[var(--color-secondary)] blur-[60px]" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Sparkles size={40} className="text-[var(--color-primary)]/30 mx-auto mb-3" />
                <p className="text-sm font-data text-[var(--color-text-muted)]">{article.category}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ ARTICLE CONTENT ═══════════ */}
      <section className="px-5 lg:px-20 pb-16">
        <div className="max-w-[800px] mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="article-content"
          >
            {article.content
              .trim()
              .split('\n')
              .map((_, i) => (
                <motion.div key={i} variants={item}>
                  {renderContent(article.content)}
                </motion.div>
              ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════ ENGAGEMENT BAR ═══════════ */}
      <section className="px-5 lg:px-20 pb-12">
        <div className="max-w-[800px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center justify-between gap-4 py-6 border-t border-b border-white/5"
          >
            {/* engagement stats */}
            <div className="flex items-center gap-5">
              <button className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-red-400 transition-colors group">
                <Heart size={18} className="group-hover:scale-110 transition-transform" />
                <span className="font-data">{article.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors group">
                <MessageCircle size={18} className="group-hover:scale-110 transition-transform" />
                <span className="font-data">{article.comments}</span>
              </button>
            </div>

            {/* share buttons */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-data text-[var(--color-text-muted)] mr-1">Share:</span>
              <button className="w-9 h-9 rounded-lg bg-[var(--color-bg-surface)] border border-white/5 flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/30 transition-all">
                <X size={15} />
              </button>
              <button className="w-9 h-9 rounded-lg bg-[var(--color-bg-surface)] border border-white/5 flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/30 transition-all">
                <LinkedinIcon size={15} />
              </button>
              <button className="w-9 h-9 rounded-lg bg-[var(--color-bg-surface)] border border-white/5 flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/30 transition-all">
                <Link2 size={15} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ TAGS ═══════════ */}
      <section className="px-5 lg:px-20 pb-16">
        <div className="max-w-[800px] mx-auto">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-data text-[var(--color-text-muted)] mr-2">Tags:</span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-lg text-xs font-data bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)] border border-white/5 hover:border-[var(--color-primary)]/20 hover:text-[var(--color-primary)] transition-all cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ AUTHOR CARD ═══════════ */}
      <section className="px-5 lg:px-20 pb-16">
        <div className="max-w-[800px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-xl border border-white/5 bg-[var(--color-bg-surface)] p-6 md:p-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center text-white text-lg font-bold shrink-0">
                {article.author.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <h3 className="text-lg font-display font-semibold text-white mb-1">{article.author}</h3>
                <p className="text-sm text-[var(--color-primary)] font-data mb-3">{article.authorRole}</p>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  Researcher and analyst at LORE, focused on building the next generation of AI-powered crypto intelligence tools.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ RELATED ARTICLES ═══════════ */}
      <section className="px-5 lg:px-20 pb-24">
        <div className="max-w-[800px] mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-display font-bold text-white mb-8"
          >
            Related Articles
          </motion.h2>

          <div className="grid sm:grid-cols-2 gap-5">
            {relatedArticles.map((related, i) => (
              <motion.article
                key={related.slug}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                className="group relative rounded-xl border border-white/5 bg-[var(--color-bg-surface)] hover:border-[var(--color-primary)]/20 transition-all hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(108,92,231,0.08)] overflow-hidden"
              >
                {/* card top accent */}
                <div className="h-1 w-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="p-5 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-data font-medium bg-[var(--color-primary)]/8 text-[var(--color-primary)] border border-[var(--color-primary)]/15">
                      <Tag size={11} />
                      {related.category}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-data text-[var(--color-text-muted)]">
                      <Clock size={11} />
                      {related.readTime}
                    </span>
                  </div>

                  <h3 className="text-base font-display font-semibold text-white leading-snug mb-2 group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
                    {related.title}
                  </h3>

                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4 line-clamp-2 flex-1">
                    {related.excerpt}
                  </p>

                  <Link
                    href={`/blog/${related.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-medium text-[var(--color-primary)] hover:gap-2 transition-all mt-auto"
                  >
                    Read article
                    <ChevronRight size={13} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ NEWSLETTE CTA ═══════════ */}
      <section className="px-5 lg:px-20 pb-24">
        <div className="max-w-[800px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl overflow-hidden border border-white/5 bg-[var(--color-bg-surface)]"
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[var(--color-primary)]/10 blur-[80px]" />
              <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-[var(--color-secondary)]/8 blur-[60px]" />
            </div>

            <div className="relative px-8 py-12 md:px-12 md:py-16 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 mb-5">
                <BookOpen size={22} className="text-[var(--color-primary)]" />
              </div>

              <h2 className="text-2xl font-display font-bold text-white mb-3">
                Get more insights like this
              </h2>

              <p className="max-w-md mx-auto text-[var(--color-text-secondary)] leading-relaxed mb-6 text-sm">
                Join 12,000+ crypto natives receiving weekly intelligence briefings and research drops.
              </p>

              <Link
                href="/blog"
                className="btn-primary inline-flex items-center gap-2 text-sm"
              >
                Browse all articles
                <ArrowLeft size={15} className="rotate-180" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
