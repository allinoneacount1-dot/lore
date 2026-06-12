'use client';

import Link from 'next/link';

const footerLinks = {
  Product: ['Intelligence', 'Narrative', 'Terminal', 'Pricing', 'API'],
  Company: ['About', 'Blog', 'Careers', 'Press', 'Contact'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Security', 'Bug Bounty'],
};

export default function Footer() {
  return (
    <footer className="bg-[#070708] border-t border-white/5 py-16">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6C5CE7] to-[#00D2FF] flex items-center justify-center font-display font-bold text-sm text-white">
                L
              </div>
              <span className="font-display font-bold text-xl text-white">LORE</span>
            </div>
            <p className="text-sm text-[#5A5A72] leading-relaxed mb-6">
              The Intelligence Layer for Crypto Markets.
              See what others can&apos;t. Trade what others won&apos;t.
            </p>
            <div className="flex gap-4">
              {['Twitter', 'Discord', 'Telegram'].map((social) => (
                <Link
                  key={social}
                  href="#"
                  className="text-xs text-[#5A5A72] hover:text-[#6C5CE7] transition-colors"
                >
                  {social}
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="md:col-span-2">
              <h4 className="font-data text-xs tracking-widest uppercase text-[#5A5A72] mb-4">
                {title}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-[#A0A0B8] hover:text-white transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#5A5A72] font-data">
            © 2026 Lore Intelligence. All rights reserved.
          </p>
          <p className="text-xs text-[#5A5A72] font-data">
            Built on Solana ◆ Ethereum ◆ BSC
          </p>
        </div>
      </div>
    </footer>
  );
}
