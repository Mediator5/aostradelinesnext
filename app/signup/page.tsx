"use client";

import Script from "next/script";
import { motion } from "framer-motion";
import { CheckCircle2, Activity, Users, TrendingUp, Lock, AlertCircle } from "lucide-react";
import SectionBadge from "@/components/SectionBadge";
import Footer from "@/components/Footer";

export default function SignUpPage() {
  return (
    <>
      <div className="pt-32 pb-24 md:pb-44 bg-[#FAF8F3] min-h-screen relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#FFFFFF] rounded-full blur-[120px] -z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10 md:mb-16">
            <SectionBadge icon={CheckCircle2}>Enrolment</SectionBadge>
            <h1 className="text-3xl md:text-6xl font-display font-black text-[#1A1A1A] mb-4 md:mb-6 uppercase leading-tight px-2">
              Secure Your <span className="luxury-text-gradient">Tradeline Today</span>
            </h1>
            <p className="text-sm md:text-lg text-[#4A4A4A] opacity-70 max-w-2xl mx-auto font-medium leading-relaxed px-4">
              Start improving your credit profile with our trusted tradeline services.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 mb-10 md:mb-20 relative">
            <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-px bg-[#C9A84C]/20 -z-0" />
            {[
              { step: "Step 1", title: "Submit your information", icon: <Activity size={20} /> },
              { step: "Step 2", title: "We match you with a tradeline", icon: <Users size={20} /> },
              { step: "Step 3", title: "Tradeline is added to your credit profile", icon: <TrendingUp size={20} /> }
            ].map((step, idx) => (
              <div key={idx} className="premium-card !bg-[#FFFFFF] p-4 sm:p-8 rounded-2xl md:rounded-[2.5rem] flex sm:flex-col items-center gap-3 sm:gap-0 relative z-10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#C9A84C]/10 text-[#C9A84C] rounded-xl flex items-center justify-center shrink-0 sm:mx-auto">
                  {step.icon}
                </div>
                <div className="text-left sm:text-center sm:mt-3">
                  <div className="text-[10px] font-black text-[#C9A84C] uppercase mb-1 sm:mb-3">{step.step}</div>
                  <h3 className="text-sm font-semibold text-[#1A1A1A] leading-snug">{step.title}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="premium-card !bg-[#FFFFFF] p-4 sm:p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] border border-[#C9A84C]/20 text-center mb-8 md:mb-16">
            <iframe
              src="https://api.leadconnectorhq.com/widget/form/c11Vcv7Z8m6IUFwvxAwL"
              style={{ width: "100%", height: "100%", minHeight: "600px", border: "none", borderRadius: "8px" }}
              id="inline-c11Vcv7Z8m6IUFwvxAwL"
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="TRADELINE SIGN UP FORM"
              data-layout-iframe-id="inline-c11Vcv7Z8m6IUFwvxAwL"
              data-form-id="c11Vcv7Z8m6IUFwvxAwL"
              title="TRADELINE SIGN UP FORM"
              scrolling="no"
            />
            <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="lazyOnload" />
          </div>

          <div className="max-w-2xl mx-auto space-y-3">
            <div className="flex items-start gap-3 p-4 sm:p-5 bg-[#FFFFFF] rounded-2xl border border-[#C9A84C]/20">
              <Lock size={20} className="text-[#C9A84C]" />
              <p className="text-[11px] text-[#4A4A4A] opacity-60 font-medium leading-relaxed">Your information is encrypted and handled securely. We never sell your data.</p>
            </div>
            <div className="flex items-start gap-3 p-4 sm:p-5 bg-red-500/5 rounded-2xl border border-red-500/20">
              <AlertCircle size={20} className="text-red-500" />
              <p className="text-[#4A4A4A] text-xs text-red-500/80 font-black uppercase">Notice: All sales are final. No refunds.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
