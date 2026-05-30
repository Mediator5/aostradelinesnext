"use client";

import { motion } from "framer-motion";
import { Users, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import SectionBadge from "@/components/SectionBadge";

export default function AboutUs() {
  return (
    <section className="py-20 md:py-32 bg-[#FAF8F3]" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-20 items-center">
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="aspect-[4/5] bg-[#FAF8F3] rounded-[4rem] overflow-hidden border-[12px] border-[#C9A84C]/20 shadow-[0_30px_80px_rgba(13,31,45,0.08)] relative z-10 group"
            >
              <img
                src="/company.png"
                alt="AOS Tradelines"
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-10 left-10 right-10 z-20">
                <div className="bg-[#FAF8F3]/80 backdrop-blur-2xl border border-[#C9A84C]/20 p-8 rounded-3xl shadow-xl transition-all duration-500 group-hover:-translate-y-2">
                  <div className="text-[#1A1A1A] font-display font-black text-3xl mb-1">AOS Tradelines</div>
                  <div className="text-[#C9A84C] text-xs font-black uppercase opacity-80">Premium Tradelines</div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
            </motion.div>
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#C9A84C]/20 rounded-full blur-[100px] -z-0" />
            <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-[#C9A84C]/10 rounded-full blur-[80px] -z-0" />
          </div>
          <div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <SectionBadge icon={Users}>The Visionary</SectionBadge>
              <h2 className="text-[#1A1A1A] text-3xl lg:text-7xl font-display font-black mb-5 md:mb-8 leading-tight uppercase">Expertise You Can <span className="luxury-text-gradient">Trust</span></h2>
              <p className="text-sm md:text-xl text-[#4A4A4A] mb-6 md:mb-8 leading-relaxed font-medium">
                AOS Tradelines is committed to becoming the most trusted and results-driven tradeline company, setting the standard for accuracy, transparency, and strategic credit building. Our vision is to bridge the gap between where our clients are and where they deserve to be—empowering them with stronger credit profiles, greater financial opportunities, and the confidence to achieve long-term success.
              </p>

              <div className="flex items-center justify-between p-8 md:p-12 bg-[#FFFFFF] rounded-2xl md:rounded-[3.5rem] border border-[#C9A84C]/20 shadow-xl mb-10 md:mb-16 relative overflow-hidden group/stats">
                <div className="flex-1 text-center relative z-10">
                  <div className="text-4xl md:text-5xl font-display font-black text-[#C9A84C] mb-2 tracking-tighter">10+</div>
                  <div className="text-[10px] md:text-[11px] text-[#C9A84C] font-black uppercase tracking-[0.15em] opacity-80">Years of Mastery</div>
                </div>
                <div className="w-px h-12 bg-slate-100 relative z-10" />
                <div className="flex-1 text-center relative z-10">
                  <div className="text-4xl md:text-5xl font-display font-black text-[#C9A84C] mb-2 tracking-tighter">25k+</div>
                  <div className="text-[10px] md:text-[11px] text-[#C9A84C] font-black uppercase tracking-[0.15em] opacity-80">Proven Successes</div>
                </div>
              </div>

              <div className="flex gap-5 md:gap-6">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="w-14 h-14 md:w-16 md:h-16 bg-[#FFFFFF] rounded-2xl flex items-center justify-center text-[#4A4A4A] hover:bg-[#C9A84C] hover:text-[#0A0A0A] transition-all duration-500 hover:scale-110 border border-[#C9A84C]/20 shadow-sm hover:shadow-lg">
                    <Icon size={24} />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
