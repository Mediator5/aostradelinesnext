"use client";

import Script from "next/script";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import SectionBadge from "@/components/SectionBadge";
import Footer from "@/components/Footer";

export default function BecomePartnerPage() {
  return (
    <>
      <div className="pt-32 pb-24 md:pb-44 bg-[#FAF8F3] min-h-screen relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FFFFFF] rounded-full blur-[150px] -z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10 md:mb-16">
            <SectionBadge icon={Star}>Opportunity</SectionBadge>
            <h1 className="text-3xl md:text-6xl font-display font-black text-[#1A1A1A] mb-4 md:mb-6 uppercase leading-tight px-2">
              Become AOS <span className="luxury-text-gradient">Tradeline affiliate</span>
            </h1>
            <div className="max-w-3xl mx-auto px-4">
              <h2 className="text-xl md:text-2xl font-bold text-[#1A1A1A] mb-6 uppercase tracking-tight">Partner With AOS Tradelines</h2>
              <div className="space-y-6 text-sm md:text-lg text-[#4A4A4A] font-medium leading-relaxed">
                <p className="text-[#4A4A4A] opacity-90">
                  AOS Tradelines is actively seeking to partner with credit repair company owners who are looking to deliver faster, more impactful results for their clients.
                </p>
                <p className="text-[#4A4A4A] opacity-80">
                  If you&apos;re ready to add high-quality tradelines to your service offerings and create an additional stream of revenue, we invite you to apply to our affiliate program.
                </p>
                <p className="text-[#4A4A4A] opacity-70 italic">
                  Complete the form below to be considered. Once approved, our team will reach out with next steps.
                </p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 mb-10 md:mb-20">
            {[
              { title: "Flexible income opportunity", desc: "Set your own pace and earn on your terms." },
              { title: "Work with a growing network", desc: "Access premium tools and dedicated support." },
              { title: "Fast onboarding", desc: "Get started in minutes with our streamlined process." }
            ].map((benefit, idx) => (
              <div key={idx} className="premium-card !bg-[#FFFFFF] p-5 md:p-8 rounded-2xl md:rounded-[2.5rem]">
                <h3 className="text-base md:text-xl font-bold text-[#1A1A1A] mb-2 md:mb-4">{benefit.title}</h3>
                <p className="text-[#4A4A4A] opacity-70 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>

          <div className="premium-card !bg-[#FFFFFF] p-4 sm:p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] border border-[#C9A84C]/20 text-center mb-10 md:mb-16">
            <iframe
              src="https://api.leadconnectorhq.com/widget/form/UzKIUq9T0ygCHrTt00G0"
              style={{ width: "100%", height: "100%", minHeight: "600px", border: "none", borderRadius: "8px" }}
              id="inline-UzKIUq9T0ygCHrTt00G0-bp"
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="AOS AFFILIATE FORM"
              data-height="2170"
              data-layout-iframe-id="inline-UzKIUq9T0ygCHrTt00G0"
              data-form-id="UzKIUq9T0ygCHrTt00G0"
              title="AOS AFFILIATE FORM"
              scrolling="no"
            />
            <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="lazyOnload" />
          </div>

          <div className="text-center px-4">
            <button className="w-full sm:w-auto bg-[#C9A84C] text-[#0A0A0A] px-12 py-4 md:py-5 rounded-full font-black text-base md:text-lg uppercase hover:bg-[#C9A84C]-hover transition-all shadow-xl shimmer">
              Apply now
            </button>
            <p className="mt-6 text-[#4A4A4A] opacity-60 font-black uppercase text-xs">
              Apply now and our team will contact you shortly
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
