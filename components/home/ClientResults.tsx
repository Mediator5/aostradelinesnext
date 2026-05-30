"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import SectionBadge from "@/components/SectionBadge";

export default function ClientResults() {
  const results = [
    { title: "K. Johnson", desc: "Meticulous Credit Restoration", img: "/1 (1).png" },
    { title: "M. Thompson", desc: "Corporate Approval Optimized", img: "/1 (2).png" },
    { title: "S. Williams", desc: "Aged Asset Integration", img: "/1 (3).png" },
    { title: "D. Miller", desc: "High-Limit Strategy Success", img: "/1 (4).png" },
    { title: "E. Davis", desc: "Lending Odds Transformed", img: "/1 (5).png" },
    { title: "R. Garcia", desc: "Strategic Financial Positioning", img: "/1 (6).png" },
    { title: "A. Sampson", desc: "Elite Funding Success", img: "/1 (7).png" },
    { title: "J. Martinez", desc: "Maximized Portfolio Velocity", img: "/1 (8).png" },
  ];

  const allResults = [...results, ...results];

  return (
    <section className="py-20 md:py-32 bg-[#FAF8F3] overflow-hidden" id="results">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 md:mb-24 text-center">
        <SectionBadge icon={TrendingUp}>Audit Proof</SectionBadge>
        <h2 className="text-[#1A1A1A] text-3xl md:text-7xl font-display font-black mb-4 md:mb-6 uppercase leading-tight px-2">Proof of <span className="luxury-text-gradient">Performance</span></h2>
        <p className="text-[#4A4A4A] opacity-60 text-sm md:text-xl font-medium max-w-2xl mx-auto px-4">Unedited evidence showing the measurable impact of our premium methodology.</p>
      </div>

      <div className="relative flex overflow-x-hidden touch-pan-y">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex gap-6 md:gap-10 whitespace-nowrap px-4"
        >
          {allResults.map((result, idx) => (
            <div
              key={idx}
              className="w-[280px] md:w-[360px] shrink-0 group flex flex-col bg-white rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-[#C9A84C]/20 shadow-[0_15px_40px_-15px_rgba(201,168,76,0.12)] hover:shadow-[0_25px_50px_-12px_rgba(201,168,76,0.2)] transition-all duration-500 hover:-translate-y-2"
            >
              <div className="w-full aspect-[4/5] bg-white flex items-center justify-center p-2 md:p-3 overflow-hidden">
                <img
                  src={result.img}
                  alt={result.title}
                  className="w-full h-full object-contain rounded-2xl transition-transform duration-700 group-hover:scale-[1.03]"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 md:p-8 text-center whitespace-normal bg-white border-t border-slate-100">
                <h3 className="text-xl md:text-2xl font-display font-black text-[#1A1A1A] mb-1.5 transition-colors duration-300 group-hover:text-[#C9A84C]">
                  {result.title}
                </h3>
                <p className="text-[#C9A84C] text-[10px] md:text-[11px] font-black uppercase tracking-widest italic">
                  {result.desc}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
