"use client";

import Link from "next/link";
import { Calculator, ArrowRight } from "lucide-react";

export default function CalculatorPreview() {
  return (
    <section className="py-20 md:py-32 bg-[#FAF8F3] relative overflow-hidden" id="calculator">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FFFFFF] rounded-full blur-[150px] -z-0" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="w-16 h-16 md:w-24 md:h-24 bg-[#FFFFFF] rounded-2xl md:rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 md:mb-10 text-[#C9A84C] border border-[#C9A84C]/20 backdrop-blur-3xl animate-pulse">
          <Calculator size={48} />
        </div>
        <h2 className="text-3xl md:text-7xl text-[#1A1A1A] mb-5 md:mb-8 font-display font-black leading-tight uppercase">Eliminate <br /><span className="luxury-text-gradient italic font-normal">Ambiguity?</span></h2>
        <p className="text-sm md:text-xl text-[#4A4A4A] opacity-60 mb-8 md:mb-14 leading-relaxed max-w-2xl mx-auto font-medium px-4">
          Strategic asset acquisition requires precision. Utilize our proprietary calculator to simulate the exact impact on your utilization profile.
        </p>
        <Link
          href="/calculator"
          className="w-full sm:w-auto bg-[#C9A84C] text-[#0A0A0A] px-10 md:px-14 py-5 md:py-6 rounded-full font-black text-[13px] uppercase hover:bg-[#C9A84C]-hover transition-all shadow-xl inline-flex items-center justify-center gap-4 group active:scale-95"
        >
          Initialize Calculator
          <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
