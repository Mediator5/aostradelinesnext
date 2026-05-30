"use client";

import { motion } from "framer-motion";
import { Search, CheckCircle2, Lock, TrendingUp, ArrowRight } from "lucide-react";
import SectionBadge from "@/components/SectionBadge";

export default function HowItWorks() {
  const steps = [
    { title: "Browse Elite Tradelines", desc: "Select from our curated inventory of aged, high-limit accounts.", icon: <Search size={28} /> },
    { title: "Select Your Strategy", desc: "Determine which accounts best optimize your unique profile.", icon: <CheckCircle2 size={28} /> },
    { title: "Secure Acquisition", desc: "Complete our verified enrollment process with bank-level encryption.", icon: <Lock size={28} /> },
    { title: "Observe Results", desc: "Watch your credit profile transform within one statement cycle.", icon: <TrendingUp size={28} /> }
  ];

  return (
    <section className="py-20 md:py-32 bg-[#FAF8F3] overflow-hidden" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-24">
          <SectionBadge icon={ArrowRight}>The Methodology</SectionBadge>
          <h2 className="text-[#1A1A1A] text-3xl md:text-6xl font-display font-black mb-4 md:mb-6 uppercase leading-tight px-2">How It <span className="luxury-text-gradient">Truly Works</span></h2>
          <p className="text-[#4A4A4A]/70 text-base md:text-xl max-w-2xl mx-auto font-medium px-4">A streamlined 4-step process designed for rapid financial advancement.</p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-[4.5rem] left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent z-0" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-12 relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className="relative">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className="relative group text-center bg-[#FFFFFF] md:bg-transparent p-8 md:p-0 rounded-[2.5rem] md:rounded-none border border-[#C9A84C]/20 md:border-none shadow-sm md:shadow-none"
                >
                  <div className="relative mb-6 md:mb-8">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-[#FAF8F3] md:bg-[#FFFFFF] border border-[#C9A84C]/20 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto text-[#C9A84C] group-hover:bg-[#C9A84C] group-hover:text-[#0A0A0A] group-hover:scale-110 group-hover:shadow-[0_20px_40px_rgba(201,168,76,0.2)] transition-all duration-500 relative z-10">
                      {step.icon}
                      <div className="absolute -top-2 -right-2 md:-top-3 md:-right-3 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#FFFFFF] md:bg-[#FAF8F3] border-2 border-[#C9A84C] text-[#C9A84C] text-xs md:text-sm font-black flex items-center justify-center shadow-md group-hover:bg-[#FFFFFF] group-hover:border-white transition-colors duration-500">
                        {idx + 1}
                      </div>
                    </div>
                  </div>
                  <div className="px-2 md:px-0">
                    <h3 className="text-xl md:text-2xl font-display font-bold text-[#1A1A1A] mb-3 md:mb-4 group-hover:text-[#C9A84C] transition-colors duration-300 uppercase tracking-tight">{step.title}</h3>
                    <p className="text-[#4A4A4A] leading-relaxed font-medium text-[15px] md:text-base">{step.desc}</p>
                  </div>
                </motion.div>
                {idx !== steps.length - 1 && (
                  <div className="md:hidden absolute -bottom-4 left-1/2 -translate-x-1/2 w-px h-4 bg-[#C9A84C]/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
