"use client";

import { motion } from "framer-motion";
import { TrendingUp, CheckCircle2, CreditCard, Clock, Zap } from "lucide-react";
import SectionBadge from "@/components/SectionBadge";

export default function WhyTradelines() {
  const benefits = [
    {
      title: "Lower Your Credit Utilization Fast",
      desc: "We add high-limit tradelines to your profile, helping reduce your overall utilization—one of the biggest factors in your credit score.",
      icon: <TrendingUp className="text-[#C9A84C]" />
    },
    {
      title: "Perfect Payment History Added",
      desc: "Every tradeline we provide comes with 100% on-time payment history, helping strengthen your profile and build lender trust.",
      icon: <CheckCircle2 className="text-[#C9A84C]" />
    },
    {
      title: "Get Approved for More",
      desc: "A stronger credit profile increases your chances of approvals for credit cards, cars, and funding—with better limits and lower rates.",
      icon: <CreditCard className="text-[#C9A84C]" />
    },
    {
      title: "Boost Your Credit Age",
      desc: "We add seasoned tradelines with years of history, helping improve your average account age—another key factor in your score.",
      icon: <Clock className="text-[#C9A84C]" />
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-24">
          <SectionBadge icon={Zap}>Why Choose AOS</SectionBadge>
          <h2 className="text-[#1A1A1A] text-3xl md:text-7xl font-display font-black mb-4 md:mb-8 uppercase leading-tight px-2">What We <span className="luxury-text-gradient italic font-normal">Deliver</span></h2>
          <p className="text-[#4A4A4A] opacity-60 text-sm md:text-xl font-medium max-w-2xl mx-auto leading-relaxed px-4">Real results backed by verified, high-quality tradelines built for your credit goals.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-5 md:gap-10">
          {benefits.map((b, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative premium-card !bg-[#FFFFFF] p-5 md:p-12 rounded-2xl md:rounded-[3.5rem] flex flex-row gap-5 md:gap-8 items-start hover:-translate-y-2 border-[#C9A84C]/20"
            >
              <div className="relative z-10 w-14 h-14 md:w-20 md:h-20 bg-[#FFFFFF] rounded-2xl md:rounded-[2rem] flex items-center justify-center shrink-0 group-hover:bg-[#C9A84C] group-hover:shadow-xl transition-all duration-500 border border-[#C9A84C]/20 group-hover:border-[#C9A84C]">
                <div className="text-[#C9A84C] group-hover:text-[#0A0A0A] transition-colors duration-500 scale-125">
                  {b.icon}
                </div>
              </div>
              <div className="relative z-10">
                <h3 className="text-lg md:text-2xl font-display font-black text-[#1A1A1A] mb-2 md:mb-4 group-hover:text-[#C9A84C] transition-colors duration-300 uppercase">
                  {b.title}
                </h3>
                <p className="text-[#4A4A4A] opacity-70 leading-relaxed font-medium text-sm md:text-lg">{b.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
