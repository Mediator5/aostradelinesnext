"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronDown } from "lucide-react";
import SectionBadge from "@/components/SectionBadge";

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How fast will the tradeline appear on my profile?",
      a: "Reporting typically occurs within 7-10 days after the statement date of the specific account. Most clients observe a significant profile update within one statement cycle (approximately 30-45 days)."
    },
    {
      q: "Are these tradelines legal and secure?",
      a: "Absolutely. We strictly adhere to all relevant financial regulations. The process of adding authorized users is a documented and legal practice used to strengthen credit history. Your data is handled with bank-level encryption."
    },
    {
      q: "How many points will my score increase?",
      a: "While we cannot guarantee a specific point increase due to the complexity of credit algorithms, our clients typically see substantial improvements depending on their starting profile and the limit/age of the selected tradeline."
    },
    {
      q: "What is the difference between Age and Limit?",
      a: "Age represents the number of years the account has been active (contributing to 'Length of Credit History'), while Limit increases your total available credit (reducing 'Inquiry Utilization'). Both are critical for high-tier approvals."
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-[#FAF8F3]" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-24">
          <SectionBadge icon={CheckCircle2}>Intelligence</SectionBadge>
          <h2 className="text-[#1A1A1A] text-3xl md:text-6xl font-display font-black mb-3 md:mb-6 uppercase leading-tight px-2">Asset <span className="text-[#C9A84C]">Insights</span></h2>
          <p className="text-[#4A4A4A] opacity-60 text-sm md:text-xl font-medium px-4">Answering your questions with professional clarity.</p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`premium-card !bg-[#FFFFFF] rounded-2xl md:rounded-[2rem] border-[#C9A84C]/20 transition-all duration-500 cursor-pointer overflow-hidden ${isOpen ? "border-[#C9A84C]/20 bg-[#FFFFFF] shadow-lg" : "hover:border-[#C9A84C]/20"}`}
                onClick={() => setActiveIndex(isOpen ? null : idx)}
              >
                <div className="p-5 sm:p-8 md:p-10">
                  <div className="flex justify-between items-center gap-4">
                    <h3 className="text-base md:text-2xl font-display font-bold text-[#1A1A1A] flex items-start gap-3">
                      <span className="text-[#C9A84C] font-black italic">Q.</span>
                      {faq.q}
                    </h3>
                    <div className={`text-[#C9A84C] shrink-0 transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`}>
                      <ChevronDown size={28} />
                    </div>
                  </div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: "auto", opacity: 1, marginTop: 32 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                      >
                        <p className="text-[#4A4A4A] opacity-70 text-sm md:text-lg leading-relaxed font-medium pl-6 md:pl-8 border-l-2 border-[#C9A84C]/20">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
