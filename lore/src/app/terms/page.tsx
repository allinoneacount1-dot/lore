'use client';

import { motion } from 'framer-motion';
import { Shield, FileText, Scale, Mail } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const sections = [
  {
    number: '1',
    title: 'Acceptance of Terms',
    content:
      'By accessing or using LORE ("the Service"), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you must immediately discontinue use of the Service. These Terms constitute a legally binding agreement between you and Lore Intelligence ("LORE," "we," "us," or "our"). We reserve the right to modify these Terms at any time. Continued use of the Service following any changes constitutes your acceptance of the revised Terms.',
  },
  {
    number: '2',
    title: 'Description of Service',
    content:
      'LORE is an intelligence platform for cryptocurrency markets. The Service provides real-time market data, on-chain analytics, whale tracking, exploit detection, narrative scoring, and related intelligence feeds. The Service may include both free and premium tiers, each with distinct features and limitations as described on our platform. We reserve the right to modify, suspend, or discontinue any aspect of the Service at any time without prior notice.',
  },
  {
    number: '3',
    title: 'User Accounts',
    content:
      'To access certain features of the Service, you may be required to connect a compatible cryptocurrency wallet. You are solely responsible for maintaining the security of your wallet credentials and any activity that occurs through your connected wallet. You agree to provide accurate and complete information when interacting with the Service. We reserve the right to suspend or terminate accounts that violate these Terms or that we reasonably believe have been compromised.',
  },
  {
    number: '4',
    title: 'Acceptable Use',
    content:
      'You agree not to: (a) use the Service for any unlawful purpose or in violation of any applicable laws or regulations; (b) attempt to gain unauthorized access to any portion of the Service, other accounts, or computer systems; (c) use automated tools, bots, or scrapers to access the Service beyond what is permitted by our API terms; (d) reverse engineer, decompile, or disassemble any part of the Service; (e) resell, redistribute, or commercially exploit the Service without our prior written consent; (f) transmit any malicious code, viruses, or harmful content through the Service.',
  },
  {
    number: '5',
    title: 'Intellectual Property',
    content:
      'All content, features, and functionality of the Service — including but not limited to text, graphics, logos, icons, images, data compilations, software, and the compilation thereof — are the exclusive property of Lore Intelligence or its licensors and are protected by international copyright, trademark, and other intellectual property laws. The LORE name, logo, and all related names, logos, product and service names, designs, and slogans are trademarks of Lore Intelligence. You may not use such marks without our prior written permission.',
  },
  {
    number: '6',
    title: 'Data & Privacy',
    content:
      'Your use of the Service is also governed by our Privacy Policy, which is incorporated into these Terms by reference. By using the Service, you consent to the collection, processing, and use of your data as described in the Privacy Policy. We collect wallet addresses, usage data, and interaction patterns to provide and improve the Service. We do not sell personal data to third parties. For detailed information about our data practices, please refer to our full Privacy Policy.',
  },
  {
    number: '7',
    title: 'Disclaimers',
    content:
      'THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, LORE DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF HARMFUL COMPONENTS. THE INTELLIGENCE AND DATA PROVIDED THROUGH THE SERVICE ARE FOR INFORMATIONAL PURPOSES ONLY AND DO NOT CONSTITUTE FINANCIAL, INVESTMENT, LEGAL, OR OTHER PROFESSIONAL ADVICE.',
  },
  {
    number: '8',
    title: 'Limitation of Liability',
    content:
      'TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL LORE, ITS DIRECTORS, OFFICERS, EMPLOYEES, AGENTS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR USE, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL THEORY, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. OUR TOTAL AGGREGATE LIABILITY FOR ALL CLAIMS ARISING OUT OF OR RELATING TO THESE TERMS OR THE SERVICE SHALL NOT EXCEED THE AMOUNT YOU HAVE PAID TO LORE IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM, OR ONE HUNDRED US DOLLARS (USD $100), WHICHEVER IS GREATER.',
  },
  {
    number: '9',
    title: 'Termination',
    content:
      'We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason, including but not limited to a breach of these Terms. Upon termination, your right to use the Service will immediately cease. All provisions of these Terms that by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability. You may terminate your use of the Service at any time by disconnecting your wallet and ceasing all use of the platform.',
  },
  {
    number: '10',
    title: 'Governing Law',
    content:
      'These Terms shall be governed by and construed in accordance with the laws applicable in the jurisdiction in which Lore Intelligence operates, without regard to its conflict of law provisions. Any disputes arising out of or relating to these Terms or the Service shall be resolved through binding arbitration in accordance with the rules of the applicable arbitration body, unless otherwise required by law. You agree to waive any right to participate in a class action lawsuit or class-wide arbitration.',
  },
  {
    number: '11',
    title: 'Contact',
    content:
      'If you have any questions, concerns, or requests regarding these Terms of Service, please contact us at legal@loreintelligence.com. For general inquiries, reach out to hello@loreintelligence.com. You may also contact us through our official Discord server or via Twitter/X at @lore_intel.',
  },
];

function Section({
  number,
  title,
  content,
  index,
}: {
  number: string;
  title: string;
  content: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group"
    >
      <div className="p-8 rounded-2xl bg-[var(--color-bg-surface)]/50 border border-white/5 hover:border-[var(--color-primary)]/20 transition-all duration-300">
        <div className="flex items-start gap-5">
          <div className="shrink-0 w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 flex items-center justify-center group-hover:bg-[var(--color-primary)]/20 transition-colors">
            <span className="text-sm font-data font-semibold text-[var(--color-primary)]">
              {number}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-display font-semibold text-[var(--color-text-primary)] mb-3">
              {title}
            </h2>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              {content}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#070708] text-[#F5F5FA] overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070708] via-[#0D0D2B] to-[#070708]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(108,92,231,0.12)_0%,transparent_70%)]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-3xl mx-auto px-5 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 mb-6">
            <Shield size={14} className="text-[var(--color-primary)]" />
            <span className="text-xs font-data text-[var(--color-primary)] uppercase tracking-wider">
              Legal
            </span>
          </div>
          <h1 className="text-h1 font-display text-white">Terms of Service</h1>
          <p className="mt-4 text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto">
            Please read these terms carefully before using the LORE platform.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5">
            <FileText size={14} className="text-[var(--color-text-muted)]" />
            <span className="text-sm font-data text-[var(--color-text-muted)]">
              Last updated: June 12, 2026
            </span>
          </div>
        </motion.div>
      </section>

      {/* Divider accent */}
      <div className="max-w-[1280px] mx-auto px-5 lg:px-20">
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-primary)]/30 to-transparent" />
      </div>

      {/* Terms Sections */}
      <section className="py-20 relative">
        <div className="max-w-3xl mx-auto px-5 lg:px-20">
          <div className="space-y-6">
            {sections.map((section, i) => (
              <Section
                key={section.number}
                number={section.number}
                title={section.title}
                content={section.content}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Divider accent */}
      <div className="max-w-[1280px] mx-auto px-5 lg:px-20">
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-primary)]/30 to-transparent" />
      </div>

      {/* Summary / Contact CTA */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0D0D2B]/50 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-2xl mx-auto px-5 text-center"
        >
          <div className="p-8 rounded-2xl bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-secondary)]/10 border border-[var(--color-primary)]/20">
            <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 flex items-center justify-center mx-auto mb-5">
              <Scale size={22} className="text-[var(--color-primary)]" />
            </div>
            <h2 className="text-2xl font-display font-semibold text-white mb-3">
              Questions About These Terms?
            </h2>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">
              If you have any questions or concerns about these Terms of Service,
              our legal team is here to help. Reach out anytime and we&apos;ll get
              back to you promptly.
            </p>
            <a
              href="mailto:legal@loreintelligence.com"
              className="btn-primary inline-flex items-center gap-2"
            >
              <Mail size={16} />
              Contact Legal Team
            </a>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
