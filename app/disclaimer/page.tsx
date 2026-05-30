"use client";

import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import SectionBadge from "@/components/SectionBadge";
import Footer from "@/components/Footer";

export default function DisclaimerPage() {
  return (
    <>
      <div className="pt-32 pb-24 md:pb-44 bg-[#FAF8F3] min-h-screen relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#FFFFFF] rounded-full blur-[120px] -z-0" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
            <SectionBadge icon={AlertCircle}>Legal</SectionBadge>
            <h1 className="text-3xl md:text-6xl font-display font-black text-[#1A1A1A] mb-4 md:mb-6 uppercase leading-tight">
              Legal <span className="luxury-text-gradient">Disclaimer</span>
            </h1>
            <div className="w-24 h-1.5 bg-[#C9A84C] rounded-full mb-12" />
            <div className="premium-card !bg-[#FFFFFF] p-6 md:p-12 rounded-2xl md:rounded-[2.5rem] border-[#C9A84C]/20 space-y-6 md:space-y-8 text-[#4A4A4A] leading-relaxed font-medium text-sm md:text-base">
              <p>AOS Impact is not a credit repair organization as defined under the Credit Repair Organizations Act.</p>
              <p>We do not provide legal, tax, or financial advice.</p>
              <p>We do not guarantee any specific credit score increase or outcome.</p>
              <p>Tradelines are a credit enhancement strategy; results vary by individual credit profile and credit bureau reporting practices.</p>
              <p>We are not affiliated with any credit bureaus, including Experian, Equifax, or TransUnion.</p>
              <p>Participation in our services is voluntary and based on your own financial decisions.</p>
              <div className="p-8 bg-[#FFFFFF] border border-[#C9A84C]/20 rounded-2xl">
                <p className="text-[#4A4A4A] opacity-60 text-xs italic">Consult with a qualified financial advisor before making major credit decisions.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}
