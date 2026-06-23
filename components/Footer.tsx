"use client";

import Link from "next/link";
import { ShieldCheck, Instagram, Star } from "lucide-react";
import Logo from "@/components/Logo";

function TelegramIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

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
              <div className="w-14 h-14 bg-[#1E1E1E] rounded-2xl flex items-center justify-center text-[#A8A8A8] opacity-60 hover:text-[#C9A84C] hover:bg-[#1E1E1E] transition-all border border-[#C9A84C]/30 cursor-pointer">
                <ShieldCheck size={24} />
              </div>
              <div className="w-14 h-14 bg-[#1E1E1E] rounded-2xl flex items-center justify-center text-[#A8A8A8] opacity-60 hover:text-[#C9A84C] hover:bg-[#1E1E1E] transition-all border border-[#C9A84C]/30 cursor-pointer">
                <Instagram size={24} />
              </div>
              <a
                href="https://t.me/+QblEjn6pENBlYjYx"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-[#1E1E1E] rounded-2xl flex items-center justify-center text-[#A8A8A8] opacity-60 hover:text-[#C9A84C] hover:bg-[#1E1E1E] transition-all border border-[#C9A84C]/30"
              >
                <TelegramIcon size={24} />
              </a>
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

          <div className="bg-[#1E1E1E] p-10 rounded-[2.5rem] border border-[#C9A84C]/30 overflow-hidden">
            <h4 className="text-[#FFFFFF] font-display font-bold text-xl mb-6 uppercase">Support</h4>
            <ul className="space-y-6 text-[#A8A8A8] opacity-60 text-[15px] font-bold">
              <li className="flex items-center gap-4">
                <ShieldCheck size={18} className="text-[#C9A84C]" />
                <span className="uppercase text-[11px] font-black italic">Verified Partner</span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-[10px] uppercase font-black text-[#A8A8A8] opacity-60">Email Us</span>
                <a
                  href="mailto:tradelines@aosimpactsolutions.com"
                  className="text-[#C9A84C] font-black text-[12px] leading-snug hover:underline break-all"
                >
                  tradelines@<br />aosimpactsolutions.com
                </a>
              </li>
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
            <span>Secure Post Encryption</span>
            <span>Audited Performance</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
