"use client";

import { motion } from "framer-motion";
import { Users, Lock } from "lucide-react";
import GHLForm from "@/components/GHLForm";
import SectionBadge from "@/components/SectionBadge";
import Footer from "@/components/Footer";

export default function PartnersPage() {
  return (
    <>
      <div className="pt-32 pb-24 md:pb-44 bg-[#FAF8F3] min-h-screen relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#FFFFFF] rounded-full blur-[120px] -z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10 md:mb-16">
            <SectionBadge icon={Users}>Partnership</SectionBadge>
            <h1 className="text-3xl md:text-6xl font-display font-black text-[#1A1A1A] mb-4 md:mb-6 uppercase leading-tight px-2">
              AOS <span className="luxury-text-gradient">Affiliates</span>
            </h1>
            <p className="text-sm md:text-lg text-[#4A4A4A] opacity-70 max-w-2xl mx-auto font-medium leading-relaxed px-4">
              Join our network of tradeline partners and expand your reach in the financial services industry.
            </p>
          </motion.div>

          <div className="premium-card !bg-[#FFFFFF] p-4 sm:p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] border border-[#C9A84C]/20 text-center mb-10 md:mb-16">
            <GHLForm
              src="https://api.leadconnectorhq.com/widget/form/UzKIUq9T0ygCHrTt00G0"
              id="inline-UzKIUq9T0ygCHrTt00G0"
              formName="AOS AFFILIATE FORM"
              formId="UzKIUq9T0ygCHrTt00G0"
            />
          </div>

          <div className="flex items-center justify-center gap-3 text-[#4A4A4A] opacity-60 font-black uppercase text-xs">
            <Lock size={16} className="text-[#C9A84C]" />
            All submitted information is kept secure and confidential
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
