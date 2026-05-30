"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star, Lock, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-[60px] md:pt-44 pb-20 overflow-hidden bg-[#000000]">
      {/* Background Effects */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#1E1E1E]/50 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Mobile-only logo */}
            <div className="md:hidden flex justify-center mt-8 mb-5">
              <Logo className="h-16 w-auto" />
            </div>

            <h1 className="text-[28px] leading-[1.25] font-bold md:text-7xl lg:text-8xl font-display md:font-black md:leading-[1.05] mb-[18px] md:mb-8 text-[#FFFFFF] uppercase max-w-[280px] mx-auto md:max-w-none">
              Credit Solutions That Make an <span className="luxury-text-gradient">Impact</span>
            </h1>

            {/* Mobile paragraph */}
            <p className="md:hidden text-[15px] opacity-80 text-[#FFFFFF] mb-6 max-w-[280px] mx-auto leading-relaxed px-2">
              Boost your credit profile fast with aged, high-limit tradelines.
            </p>

            {/* Desktop paragraph */}
            <p className="hidden md:block text-xl md:text-2xl text-[#FFFFFF] mb-12 max-w-2xl mx-auto leading-relaxed font-bold">
              Secure lower interest rates, higher approval odds, and a stronger financial future in just one statement cycle.
            </p>

            <div className="flex flex-col sm:flex-row gap-[14px] md:gap-6 justify-center items-center mt-5 md:mt-0">
              <Link
                href="/inventory"
                className="w-full sm:w-auto h-[54px] md:min-h-[56px] bg-[#C9A84C] text-[#0A0A0A] px-12 rounded-full font-black text-base md:text-lg uppercase hover:bg-[#C9A84C]-hover transition-all shadow-xl flex items-center justify-center gap-3 group active:scale-95 shimmer"
              >
                View Tradelines
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/calculator"
                className="w-full sm:w-auto h-[54px] md:min-h-[56px] bg-[#1E1E1E] text-[#FFFFFF] border border-[#C9A84C]/30 px-12 rounded-full font-black text-base md:text-lg uppercase hover:bg-[#1E1E1E] transition-all backdrop-blur-xl flex items-center justify-center gap-3 group active:scale-95"
              >
                Calculator Tool
                <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] group-hover:scale-150 transition-transform" />
              </Link>
            </div>

            {/* Trust Signals — desktop only */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="hidden md:flex mt-20 pt-10 border-t border-[#C9A84C]/30 flex-wrap justify-center gap-20 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
            >
              <div className="flex items-center gap-2">
                <div className="flex text-[#C9A84C]">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <span className="text-[#A8A8A8] text-xs font-black uppercase">5,000+ Happy Clients</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock size={16} className="text-[#C9A84C]" />
                <span className="text-[#A8A8A8] text-xs font-black uppercase">Secure Bank-Level Posting</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#C9A84C]" />
                <span className="text-[#A8A8A8] text-xs font-black uppercase">Verified Accounts Only</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
