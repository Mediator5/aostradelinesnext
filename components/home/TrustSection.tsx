"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, Users, Lock, ArrowRight } from "lucide-react";
import SectionBadge from "@/components/SectionBadge";

export default function TrustSection() {
  const cards = [
    {
      icon: <ShieldCheck size={32} />,
      title: "Verified Tradelines",
      desc: "Our tradelines are sourced from exclusive accounts with perfect payment histories and low utilization."
    },
    {
      icon: <Zap size={32} />,
      title: "Rapid Posting",
      desc: "Experience the fastest posting times in the industry, typically within the next statement cycle."
    },
    {
      icon: <Users size={32} />,
      title: "Expert Consulting",
      desc: "Our dedicated specialists help you select the exact tradelines your unique profile needs for maximum impact."
    },
    {
      icon: <Lock size={32} />,
      title: "Bank-Level Security",
      desc: "Your data is encrypted and handled with the highest level of confidentiality and professional integrity."
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-[#FAF8F3] relative overflow-hidden" id="trust">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[20rem] font-black text-[#1A1A1A]/[0.02] select-none pointer-events-none uppercase hidden lg:block">
        PREMIUM
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-24">
          <SectionBadge icon={Zap}>The Standard</SectionBadge>
          <h2 className="text-[#1A1A1A] text-3xl md:text-6xl font-display font-black mb-4 md:mb-6 leading-tight uppercase px-2">Why High-Net-Worth <br className="hidden sm:block" /><span className="luxury-text-gradient italic">Individuals Choose AOS</span></h2>
          <div className="w-16 md:w-24 h-1.5 bg-[#C9A84C] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative premium-card !bg-[#FFFFFF] p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] flex flex-col h-full hover:-translate-y-2"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-[#C9A84C] flex items-center justify-center mb-5 md:mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500">
                <div className="text-[#0A0A0A] scale-90 md:scale-100">
                  {card.icon}
                </div>
              </div>
              <h3 className="text-lg md:text-2xl font-display font-bold text-[#1A1A1A] mb-3 md:mb-4 group-hover:text-[#C9A84C] transition-colors duration-300">{card.title}</h3>
              <p className="text-[#1A1A1A] leading-relaxed font-bold text-base md:text-[17px]">
                {card.desc}
              </p>
              <div className="mt-8 pt-6 border-t border-[#C9A84C]/20 flex items-center text-[#C9A84C] text-xs font-black uppercase opacity-0 transform -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                Learn Excellence <ArrowRight size={14} className="ml-2" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
