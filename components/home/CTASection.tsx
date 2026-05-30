"use client";

import Link from "next/link";
import { Zap } from "lucide-react";
import SectionBadge from "@/components/SectionBadge";

export default function CTASection() {
  return (
    <section className="py-20 md:py-32 bg-[#FAF8F3] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#FFFFFF] rounded-full blur-[120px] -rotate-12" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="premium-card !bg-[#FFFFFF] rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-16 lg:p-24 text-center relative overflow-hidden ring-2 ring-[#C9A84C]/10">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#FFFFFF] rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FFFFFF] rounded-full blur-[80px]" />

          <div className="relative z-10 max-w-5xl mx-auto">
            <SectionBadge icon={Zap}>Final Call</SectionBadge>
            <h2 className="text-3xl md:text-5xl lg:text-8xl font-display font-black text-[#1A1A1A] mb-6 md:mb-10 leading-tight uppercase">Secure Your <br /><span className="luxury-text-gradient italic">Legacy</span></h2>
            <p className="text-[#4A4A4A] opacity-70 text-lg md:text-xl lg:text-2xl mb-10 md:mb-14 leading-relaxed font-medium">
              Join the thousands who have transformed their financial standing with AOS. Your elite future begins today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-8 justify-center items-center">
              <Link
                href="/inventory"
                className="w-full sm:w-auto h-[54px] md:h-[64px] flex items-center justify-center bg-[#C9A84C] text-[#0A0A0A] px-6 md:px-14 rounded-full font-black text-[15px] md:text-xl uppercase hover:bg-[#C9A84C]-hover transition-all shadow-xl group active:scale-95 shimmer whitespace-nowrap"
              >
                Access Tradelines
              </Link>
              <Link
                href="/calculator"
                className="w-full sm:w-auto h-[54px] md:h-[64px] flex items-center justify-center bg-[#FFFFFF] text-[#1A1A1A] border border-[#C9A84C]/20 px-6 md:px-14 rounded-full font-black text-[15px] md:text-xl uppercase hover:bg-[#FFFFFF] transition-all backdrop-blur-xl group active:scale-95 whitespace-nowrap"
              >
                Launch Calculator
              </Link>
            </div>

            <div className="mt-12 md:mt-16 flex flex-col md:flex-row items-center justify-center gap-4 text-[10px] font-black text-[#4A4A4A] uppercase text-center">
              <div className="hidden md:flex items-center gap-4">
                <span className="w-12 h-px bg-[#FFFFFF]" />
              </div>
              <span>Limited Monthly Allocations Available</span>
              <div className="hidden md:flex items-center gap-4">
                <span className="w-12 h-px bg-[#FFFFFF]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
