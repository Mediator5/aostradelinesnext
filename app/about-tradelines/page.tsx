"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Info, Clock, CreditCard, CheckCircle2, TrendingUp, FileText, Zap,
  ShieldCheck, Check, AlertCircle, ChevronDown, ArrowRight
} from "lucide-react";
import SectionBadge from "@/components/SectionBadge";
import Footer from "@/components/Footer";

export default function AboutTradelinesPage() {
  const benefits = [
    { icon: <Clock size={24} />, title: "Build Credit History", desc: "Add seasoned accounts to increase your overall credit age and lengthen your average account history." },
    { icon: <CreditCard size={24} />, title: "Lower Credit Utilization", desc: "Increase your available credit to help reduce your utilization ratio and improve your score." },
    { icon: <CheckCircle2 size={24} />, title: "Add Positive Payment History", desc: "Strengthen your profile with 100% on-time payment records from established cardholders." },
    { icon: <TrendingUp size={24} />, title: "Increase Approval Odds", desc: "Position yourself for better approvals and stronger funding opportunities with lenders." },
  ];

  const faqs = [
    { q: "Will I receive a credit card?", a: "No. You are added as an authorized user, but the physical card is sent only to the primary cardholder. You benefit from the account history without receiving the card." },
    { q: "Who are the cardholders?", a: "Our tradelines come from real individuals with excellent credit profiles, long-standing accounts, and proven positive payment history — typically 780+ credit scores." },
    { q: "Do tradelines report to all bureaus?", a: "Our tradelines are set up to report to Equifax, TransUnion, and Experian. We guarantee posting to a minimum of two (2) bureaus. All three is common but not guaranteed." },
    { q: "Are tradelines legal?", a: "Yes. Authorized user tradelines are fully legal and supported under the Fair Credit Reporting Act (FCRA)." },
    { q: "How fast are results?", a: "Tradelines typically post within 2 weeks after the statement date. We recommend checking your report after 30 days. Some clients have seen 25–100+ point increases depending on their starting profile." },
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <div className="pt-28 pb-24 md:pb-44 bg-[#FAF8F3] min-h-screen relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FFFFFF] rounded-full blur-[140px] -z-0 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#FFFFFF] rounded-full blur-[120px] -z-0 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-14 md:mb-20">
            <SectionBadge icon={Info}>Authorized User Tradelines</SectionBadge>
            <h1 className="text-3xl md:text-7xl font-display font-black text-[#1A1A1A] uppercase leading-tight mb-6">
              About <span className="luxury-text-gradient italic">Tradelines</span>
            </h1>
            <p className="text-[#4A4A4A] text-lg md:text-xl max-w-3xl mx-auto leading-relaxed opacity-80">
              At <span className="font-black text-[#1A1A1A]">AOS Tradelines</span> we specialize in Authorized User Tradelines — a powerful, legal strategy designed to help strengthen your credit profile quickly.
            </p>
          </motion.div>

          {/* What Are Tradelines */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 md:mb-14">
            <div className="premium-card !bg-[#FFFFFF] rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 border-[#C9A84C]/20">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[#FFFFFF] flex items-center justify-center text-[#C9A84C] shrink-0"><FileText size={24} /></div>
                <h2 className="text-2xl md:text-3xl font-display font-black text-[#1A1A1A] uppercase">What Are Tradelines?</h2>
              </div>
              <p className="text-[#4A4A4A] text-base md:text-lg leading-relaxed mb-8 opacity-80">Tradelines are credit accounts that appear on your credit report. There are two types:</p>
              <div className="grid md:grid-cols-2 gap-5">
                <div className="bg-[#FFFFFF] border border-[#C9A84C]/15 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-xl bg-[#C9A84C] flex items-center justify-center"><Check size={16} className="text-[#0A0A0A]" strokeWidth={3} /></div>
                    <span className="font-black text-[#1A1A1A] uppercase text-sm tracking-wide">Authorized User Tradelines</span>
                  </div>
                  <p className="text-[#4A4A4A] text-sm leading-relaxed opacity-80">You&apos;re added to an existing credit card account. This is our specialty — and the fastest path to results.</p>
                </div>
                <div className="bg-[#FFFFFF] border border-slate-200 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-200 flex items-center justify-center"><CreditCard size={16} className="text-[#4A4A4A]" /></div>
                    <span className="font-black text-[#4A4A4A] uppercase text-sm tracking-wide">Primary Tradelines</span>
                  </div>
                  <p className="text-[#4A4A4A] text-sm leading-relaxed opacity-80">Accounts you open and manage yourself. These take longer to build history.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* How They Work */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 md:mb-14">
            <div className="premium-card !bg-[#FFFFFF] rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 border-[#C9A84C]/20">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[#FFFFFF] flex items-center justify-center text-[#C9A84C] shrink-0"><Zap size={24} /></div>
                <h2 className="text-2xl md:text-3xl font-display font-black text-[#1A1A1A] uppercase">How Authorized User Tradelines Work</h2>
              </div>
              <p className="text-[#4A4A4A] text-base md:text-lg leading-relaxed mb-6 opacity-80">When you&apos;re added as an authorized user:</p>
              <ul className="space-y-4">
                {[
                  "The account's history, credit limit, and payment record may appear on your credit report",
                  "This can help improve your credit profile in a short period of time",
                  "This process is commonly known as \"piggybacking\" on a strong credit account",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-[#C9A84C] flex items-center justify-center shrink-0 mt-0.5"><Check size={13} className="text-[#0A0A0A]" strokeWidth={3} /></div>
                    <span className="text-[#4A4A4A] text-base leading-relaxed opacity-80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Our Guarantee */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 md:mb-14">
            <div className="premium-card !bg-[#FFFFFF] rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 border-[#C9A84C]/20 ring-2 ring-[#C9A84C]/10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[#C9A84C] flex items-center justify-center text-[#0A0A0A] shrink-0"><ShieldCheck size={24} /></div>
                <h2 className="text-2xl md:text-3xl font-display font-black text-[#1A1A1A] uppercase">Our Tradeline Guarantee</h2>
              </div>
              <p className="text-[#4A4A4A] text-base md:text-lg leading-relaxed mb-6 opacity-80">Every tradeline we provide includes:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["5% or less utilization", "Zero late payments", "Strong, established history", "High-quality cardholders (typically 780+ credit scores)"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-[#FFFFFF] border border-[#C9A84C]/15 rounded-2xl px-5 py-4">
                    <Check size={16} className="text-[#C9A84C] shrink-0" strokeWidth={3} />
                    <span className="text-[#1A1A1A] font-bold text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Key Benefits */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 md:mb-14">
            <h2 className="text-3xl md:text-4xl font-display font-black text-[#1A1A1A] uppercase mb-8 text-center">Key <span className="luxury-text-gradient italic">Benefits</span></h2>
            <div className="grid md:grid-cols-2 gap-5">
              {benefits.map((b, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="premium-card !bg-[#FFFFFF] rounded-2xl md:rounded-3xl p-6 md:p-8 flex gap-5 items-start group hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-[#FFFFFF] border border-[#C9A84C]/15 flex items-center justify-center text-[#C9A84C] shrink-0 group-hover:bg-[#C9A84C] group-hover:text-[#0A0A0A] transition-all duration-300">{b.icon}</div>
                  <div>
                    <h3 className="text-lg font-black text-[#1A1A1A] uppercase mb-2 group-hover:text-[#C9A84C] transition-colors">{b.title}</h3>
                    <p className="text-[#4A4A4A] text-sm leading-relaxed opacity-75">{b.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Posting Guarantee & Policy */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 md:mb-14">
            <div className="premium-card !bg-[#FFFFFF] rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 border-[#C9A84C]/20">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[#FFFFFF] flex items-center justify-center text-[#C9A84C] shrink-0"><AlertCircle size={24} /></div>
                <h2 className="text-2xl md:text-3xl font-display font-black text-[#1A1A1A] uppercase">Posting Guarantee &amp; Policy</h2>
              </div>
              <div className="space-y-5 text-[#4A4A4A] text-base leading-relaxed opacity-80 mb-8">
                <p>We only guarantee that your tradeline will post to a minimum of <span className="font-black text-[#1A1A1A]">two (2) credit bureaus</span>. Posting to all three is common, but not guaranteed.</p>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-black text-amber-800 uppercase text-sm mb-1">No Refund Policy</div>
                    <p className="text-[#4A4A4A] text-amber-700 text-sm leading-relaxed">All tradeline purchases are final. <span className="font-black">NO REFUNDS</span> will be issued under any circumstances. If a tradeline does not post to at least two credit bureaus, we will replace it with a tradeline of equal value.</p>
                  </div>
                </div>
              </div>
              <h3 className="font-black text-[#1A1A1A] uppercase text-base mb-4">Important Guidelines</h3>
              <ul className="space-y-3 mb-8">
                {[
                  "Remove all credit freezes and blocks before being added (this can prevent posting)",
                  "Allow 7–14 business days after the report date for posting",
                  "A consultation is recommended if you're unsure which tradeline fits your profile",
                  "CPNs are illegal — we do not work with CPNs",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/20 flex items-center justify-center shrink-0 mt-0.5"><Check size={11} className="text-[#C9A84C]" strokeWidth={3} /></div>
                    <span className="text-base text-[#1A1A1A] font-bold">{item}</span>
                  </li>
                ))}
              </ul>
              <h3 className="font-black text-[#1A1A1A] uppercase text-base mb-4">Tradeline Terms</h3>
              <div className="grid md:grid-cols-2 gap-5">
                <div className="bg-[#FFFFFF] border border-slate-200 rounded-2xl p-5">
                  <div className="font-black text-[#1A1A1A] text-base uppercase mb-2">Partner Tradelines</div>
                  <ul className="text-[#1A1A1A] text-base space-y-1.5 font-bold">
                    <li>• 60–90 day terms</li>
                    <li>• After removal, account may remain as a positive closed account</li>
                  </ul>
                </div>
                <div className="bg-[#FFFFFF] border border-slate-200 rounded-2xl p-5">
                  <div className="font-black text-[#1A1A1A] text-base uppercase mb-2">Personal Clients</div>
                  <ul className="text-[#1A1A1A] text-base space-y-1.5 font-bold">
                    <li>• May include onboarding fee</li>
                    <li>• Monthly maintenance (auto-billed)</li>
                    <li>• Valid ID and SSN verification required</li>
                    <li>• Experian account must be reviewed before placement</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* FAQ */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14 md:mb-20">
            <h2 className="text-3xl md:text-4xl font-display font-black text-[#1A1A1A] uppercase mb-8 text-center">Common <span className="luxury-text-gradient italic">Questions</span></h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  className="premium-card !bg-[#FFFFFF] rounded-2xl md:rounded-3xl overflow-hidden border-[#C9A84C]/20">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-6 md:p-8 text-left">
                    <span className="font-black text-[#1A1A1A] text-base md:text-lg">{faq.q}</span>
                    <ChevronDown size={22} className={`text-[#C9A84C] shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }} className="overflow-hidden">
                        <p className="px-6 md:px-8 pb-6 md:pb-8 text-[#1A1A1A] text-lg leading-relaxed border-l-4 border-[#C9A84C]/20 ml-6 md:ml-8 font-bold">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-[#FFFFFF] rounded-[2.5rem] md:rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A84C]/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="relative z-10">
              <div className="w-16 h-16 bg-[#C9A84C]/15 rounded-2xl flex items-center justify-center text-[#C9A84C] mx-auto mb-6"><ShieldCheck size={32} /></div>
              <h2 className="text-[#1A1A1A] text-3xl md:text-5xl font-display font-black uppercase mb-4 leading-tight">Ready to <span className="luxury-text-gradient italic">Get Started?</span></h2>
              <p className="text-[#4A4A4A] text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed opacity-60">Browse our curated inventory of verified, high-limit tradelines and start building a stronger credit profile today.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/inventory" className="btn-primary px-10 py-5 text-lg">
                  Browse Tradelines <ArrowRight size={18} />
                </Link>
                <Link href="/consultation" className="bg-[#FFFFFF]/10 border border-white/20 text-[#1A1A1A] px-10 py-5 rounded-full font-black uppercase text-base hover:bg-[#FFFFFF]/20 transition-all flex items-center justify-center gap-2">
                  Book a Consultation
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}
