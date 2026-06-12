'use client';

import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send, Clock, Globe, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/components/Toast';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@loreintelligence.com',
    href: 'mailto:hello@loreintelligence.com',
    description: 'General inquiries & partnerships',
  },
  {
    icon: MessageSquare,
    label: 'Discord',
    value: 'discord.gg/lore',
    href: '#',
    description: 'Join our community server',
  },
  {
    icon: ExternalLink,
    label: 'Twitter / X',
    value: '@lore_intel',
    href: '#',
    description: 'Follow for updates & alerts',
  },
  {
    icon: Send,
    label: 'Telegram',
    value: '@lore_intelligence',
    href: '#',
    description: 'Direct messaging & announcements',
  },
];

const faqs = [
  {
    question: 'How do I get started with LORE?',
    answer:
      'Connect your wallet to the LORE dashboard and select your preferred intelligence feeds. You can start with our free tier and upgrade anytime for advanced features like whale tracking and exploit detection.',
  },
  {
    question: 'What chains does LORE support?',
    answer:
      'LORE currently supports Solana, Ethereum, BSC, Arbitrum, Base, and Polygon. We are continuously adding new chains based on community demand and market activity.',
  },
  {
    question: 'Is there a free tier available?',
    answer:
      'Yes! Our free tier includes basic market sentiment, limited whale alerts, and access to the public Discord community. Premium tiers unlock real-time exploit detection, narrative scoring, and API access.',
  },
  {
    question: 'How does the exploit detection work?',
    answer:
      'Our AI models continuously scan on-chain transactions, liquidity changes, and contract interactions across supported chains. When suspicious patterns are detected, alerts are pushed to your dashboard and connected channels within seconds.',
  },
  {
    question: 'Can I integrate LORE data into my own tools?',
    answer:
      'Absolutely. Our REST and WebSocket APIs provide real-time access to all intelligence feeds. Documentation is available at docs.loreintelligence.com, and our team can assist with custom integrations.',
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-white/5 rounded-xl overflow-hidden bg-[var(--color-bg-surface)]/50 hover:border-white/10 transition-colors">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left"
      >
        <span className="text-[var(--color-text-primary)] font-medium pr-4">{question}</span>
        {open ? (
          <ChevronUp size={18} className="text-[var(--color-text-muted)] shrink-0" />
        ) : (
          <ChevronDown size={18} className="text-[var(--color-text-muted)] shrink-0" />
        )}
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        className="overflow-hidden"
      >
        <p className="px-6 pb-5 text-sm text-[var(--color-text-secondary)] leading-relaxed">
          {answer}
        </p>
      </motion.div>
    </div>
  );
}

export default function ContactPage() {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    return newErrors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitting(false);
    showToast('Message sent successfully! We\'ll get back to you soon.', 'success');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

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
            <Mail size={14} className="text-[var(--color-primary)]" />
            <span className="text-xs font-data text-[var(--color-primary)] uppercase tracking-wider">Get in Touch</span>
          </div>
          <h1 className="text-h1 font-display text-white">
            Contact Us
          </h1>
          <p className="mt-4 text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto">
            Have a question, partnership idea, or need support? We&apos;d love to hear from you.
          </p>
        </motion.div>
      </section>

      {/* Contact Info Cards */}
      <section className="pb-20 relative">
        <div className="max-w-[1280px] mx-auto px-5 lg:px-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 rounded-2xl bg-[var(--color-bg-surface)]/50 border border-white/5 hover:border-[var(--color-primary)]/30 hover:bg-[var(--color-bg-surface)] transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 flex items-center justify-center mb-4 group-hover:bg-[var(--color-primary)]/20 transition-colors">
                  <item.icon size={18} className="text-[var(--color-primary)]" />
                </div>
                <h3 className="text-sm font-medium text-[var(--color-text-primary)] mb-1">{item.label}</h3>
                <p className="text-sm text-[var(--color-primary)] font-data mb-2">{item.value}</p>
                <p className="text-xs text-[var(--color-text-muted)]">{item.description}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="pb-20 relative">
        <div className="max-w-[1280px] mx-auto px-5 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <h2 className="text-2xl font-display font-semibold text-white mb-2">Send us a message</h2>
              <p className="text-sm text-[var(--color-text-muted)] mb-8">
                Fill out the form below and we&apos;ll respond within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-xs font-data uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="Your name"
                      className={`w-full px-4 py-3 rounded-xl bg-[var(--color-bg-surface)] border text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 transition-all ${
                        errors.name ? 'border-[var(--color-negative)]/50' : 'border-white/5'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-[var(--color-negative)]">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-data uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="you@example.com"
                      className={`w-full px-4 py-3 rounded-xl bg-[var(--color-bg-surface)] border text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 transition-all ${
                        errors.email ? 'border-[var(--color-negative)]/50' : 'border-white/5'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-[var(--color-negative)]">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-xs font-data uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                    placeholder="How can we help?"
                    className={`w-full px-4 py-3 rounded-xl bg-[var(--color-bg-surface)] border text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 transition-all ${
                      errors.subject ? 'border-[var(--color-negative)]/50' : 'border-white/5'
                    }`}
                  />
                  {errors.subject && (
                    <p className="mt-1.5 text-xs text-[var(--color-negative)]">{errors.subject}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-data uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder="Tell us more about your inquiry..."
                    className={`w-full px-4 py-3 rounded-xl bg-[var(--color-bg-surface)] border text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 transition-all resize-none ${
                      errors.message ? 'border-[var(--color-negative)]/50' : 'border-white/5'
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-[var(--color-negative)]">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Side Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="p-6 rounded-2xl bg-[var(--color-bg-surface)]/50 border border-white/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-positive)]/10 border border-[var(--color-positive)]/20 flex items-center justify-center">
                    <Clock size={18} className="text-[var(--color-positive)]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-[var(--color-text-primary)]">Response Time</h3>
                    <p className="text-xs text-[var(--color-text-muted)]">We aim to respond fast</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[var(--color-text-secondary)]">General inquiries</span>
                    <span className="text-sm font-data text-[var(--color-positive)]">~24 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[var(--color-text-secondary)]">Support tickets</span>
                    <span className="text-sm font-data text-[var(--color-positive)]">~4 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[var(--color-text-secondary)]">Partnership requests</span>
                    <span className="text-sm font-data text-[var(--color-positive)]">~48 hours</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[var(--color-bg-surface)]/50 border border-white/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-secondary)]/10 border border-[var(--color-secondary)]/20 flex items-center justify-center">
                    <Globe size={18} className="text-[var(--color-secondary)]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-[var(--color-text-primary)]">Location</h3>
                    <p className="text-xs text-[var(--color-text-muted)]">Fully remote team</p>
                  </div>
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  LORE is a globally distributed team spanning multiple time zones. We operate 24/7 to ensure continuous intelligence coverage.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-secondary)]/10 border border-[var(--color-primary)]/20">
                <h3 className="text-sm font-medium text-white mb-2">Need enterprise support?</h3>
                <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                  Get dedicated account management, SLA guarantees, and custom intelligence feeds for your organization.
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 text-sm text-[var(--color-primary)] hover:text-white transition-colors"
                >
                  Request enterprise demo
                  <ExternalLink size={14} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="pb-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0D0D2B]/50 to-transparent" />
        <div className="relative z-10 max-w-3xl mx-auto px-5 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-h2 font-display text-white">Frequently Asked Questions</h2>
            <p className="mt-3 text-[var(--color-text-secondary)]">
              Quick answers to common questions about LORE.
            </p>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <FAQItem question={faq.question} answer={faq.answer} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
