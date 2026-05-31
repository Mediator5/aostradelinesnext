"use client";

import { motion } from "framer-motion";
import { Phone, TrendingUp, Zap, Lock, ShieldCheck } from "lucide-react";
import SectionBadge from "@/components/SectionBadge";
import Footer from "@/components/Footer";

export default function ConsultationPage() {
  return (
    <>
      <div className="pt-32 pb-24 md:pb-44 bg-[#FAF8F3] min-h-screen relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FFFFFF] rounded-full blur-[120px] -z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10 md:mb-16">
            <SectionBadge icon={Phone}>Consultation</SectionBadge>
            <h1 className="text-3xl md:text-6xl font-display font-black text-[#1A1A1A] mb-4 md:mb-6 uppercase leading-tight px-2">
              Book Your <span className="luxury-text-gradient">Tradeline Consultation</span>
            </h1>
            <p className="text-sm md:text-lg text-[#4A4A4A] opacity-70 max-w-2xl mx-auto font-medium leading-relaxed px-4">
              Speak with our team to find the best tradeline strategy for your credit profile. To get accurate recommendations, Experian login access must be provided before your consultation and any tradeline placement.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 mb-10 md:mb-20">
            {[
              { title: "Personalized strategy", icon: <TrendingUp size={24} /> },
              { title: "Fast process", icon: <Zap size={24} /> },
              { title: "Secure & confidential", icon: <Lock size={24} /> }
            ].map((benefit, idx) => (
              <div key={idx} className="premium-card !bg-[#FFFFFF] p-5 md:p-8 rounded-2xl md:rounded-[2.5rem] text-center flex sm:flex-col items-center gap-4 sm:gap-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#C9A84C]/10 text-[#C9A84C] rounded-xl flex items-center justify-center shrink-0 sm:mx-auto sm:mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-base md:text-xl font-bold text-[#1A1A1A] text-left sm:text-center">{benefit.title}</h3>
              </div>
            ))}
          </div>

          <div className="premium-card !bg-[#FFFFFF] p-4 sm:p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] border border-[#C9A84C]/20 text-center mb-10 md:mb-16 h-[3000px] ">
            <iframe
              src="https://api.leadconnectorhq.com/widget/form/Hv5qB0smDoTY8TpSTDIl"
              style={{ width: "100%", height: "100%", minHeight: "800px", border: "none", borderRadius: "8px" }}
              id="inline-Hv5qB0smDoTY8TpSTDIl"
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="TRADELINE CONSULTATION FORM"
              data-layout-iframe-id="inline-Hv5qB0smDoTY8TpSTDIl"
              data-form-id="Hv5qB0smDoTY8TpSTDIl"
              title="TRADELINE CONSULTATION FORM"
              scrolling="no"
            />
          </div>

          <div className="flex items-center justify-center gap-2.5 pt-2 text-[#4A4A4A]/50 font-black uppercase text-[10px] tracking-widest">
            <ShieldCheck size={14} className="text-[#C9A84C]" />
            Your information is 100% secure and confidential
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
