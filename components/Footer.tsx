"use client";

import Link from "next/link";
import { ShieldCheck, Lock, Instagram, Twitter, Star } from "lucide-react";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#C9A84C]/20 pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-20 mb-16 md:mb-24">
          <div className="space-y-10">
            <Logo variant="dark" className="h-10 md:h-12" />
            <p className="text-[#FFFFFF] text-lg leading-relaxed font-bold">
              Architecting elite credit profiles through verified, high-tier financial assets. Elevate your standing.
            </p>
            <div className="flex gap-6">
              {[ShieldCheck, Lock, Instagram, Twitter].map((Icon, i) => (
                <div key={i} className="w-14 h-14 bg-[#1E1E1E] rounded-2xl flex items-center justify-center text-[#A8A8A8] opacity-60 hover:text-[#C9A84C] hover:bg-[#1E1E1E] transition-all border border-[#C9A84C]/30 cursor-pointer">
                  <Icon size={24} />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[#FFFFFF] font-display font-bold text-xl mb-10 uppercase">Navigation</h4>
            <ul className="space-y-6 text-[#FFFFFF] text-[15px] font-black uppercase">
              <li><Link href="/inventory" onClick={() => window.scrollTo(0, 0)} className="hover:text-[#C9A84C] transition-colors">Elite Tradelines</Link></li>
              <li><Link href="/calculator" onClick={() => window.scrollTo(0, 0)} className="hover:text-[#C9A84C] transition-colors">Calculator</Link></li>
              <li><Link href="/#faq" className="hover:text-[#C9A84C] transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#FFFFFF] font-display font-bold text-xl mb-10 uppercase">Legal &amp; Terms</h4>
            <ul className="space-y-6 text-[#FFFFFF] text-[15px] font-black uppercase">
              <li><Link href="/privacy-policy" onClick={() => window.scrollTo(0, 0)} className="hover:text-[#C9A84C] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" onClick={() => window.scrollTo(0, 0)} className="hover:text-[#C9A84C] transition-colors">Terms of Service</Link></li>
              <li><Link href="/disclaimer" onClick={() => window.scrollTo(0, 0)} className="hover:text-[#C9A84C] transition-colors">Disclaimer</Link></li>
            </ul>
          </div>

          <div className="bg-[#1E1E1E] p-10 rounded-[2.5rem] border border-[#C9A84C]/30">
            <h4 className="text-[#FFFFFF] font-display font-bold text-xl mb-6 uppercase">Support</h4>
            <ul className="space-y-6 text-[#A8A8A8] opacity-60 text-[15px] font-bold">
              <li className="flex items-center gap-4">
                <ShieldCheck size={18} className="text-[#C9A84C]" />
                <span className="uppercase text-[11px] font-black italic">Verified Partner</span>
              </li>
              <li className="text-[#FFFFFF] font-black text-lg">1-800-AOS-LINE</li>
              <li className="pt-4">
                <div className="flex text-[#C9A84C] gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <div className="text-[10px] uppercase font-black mt-2 text-[#A8A8A8] opacity-40">Elite Service Rating</div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 md:pt-16 border-t border-[#C9A84C]/30 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8 text-[10px] md:text-[11px] font-black text-[#A8A8A8] opacity-40 uppercase text-center">
          <p>© 2026 AOS TRADELINES EXCELLENCE. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-12">
            <span className="flex items-center gap-2">
              <Lock size={12} className="text-[#C9A84C]" />
              Secure Post Encryption
            </span>
            <span>Audited Performance</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
