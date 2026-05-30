"use client";

import { ArrowUpDown, Check, X } from "lucide-react";
import SectionBadge from "@/components/SectionBadge";

export default function Comparison() {
  const comparisons = [
    { feature: "Verified Seasoned Accounts", aos: true, others: false },
    { feature: "Rapid Statement Cycle Posting", aos: true, others: "Unreliable" },
    { feature: "Zero Hidden Transaction Fees", aos: true, others: false },
    { feature: "24/7 Dedicated Concierge Support", aos: true, others: false },
    { feature: "Bank-Level Data Encryption", aos: true, others: "Minimal" },
    { feature: "Real-Time Tradeline Management", aos: true, others: false }
  ];

  return (
    <section className="py-20 md:py-32 bg-[#FAF8F3]" id="comparison">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-24">
          <SectionBadge icon={ArrowUpDown}>The Advantage</SectionBadge>
          <h2 className="text-[#1A1A1A] text-3xl md:text-6xl font-display font-black mb-4 md:mb-6 uppercase leading-tight px-2">The <span className="text-[#C9A84C] underline decoration-accent/20 underline-offset-8">AOS Difference</span></h2>
          <p className="text-[#4A4A4A]/70 text-base md:text-xl font-medium px-4">Why we lead where others merely follow.</p>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block premium-card !bg-[#FFFFFF] rounded-[3rem] overflow-hidden max-w-5xl mx-auto border-[#C9A84C]/20 border-t-8 border-t-accent shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#1A1A1A] border-b border-[#C9A84C]">
                  <th className="px-10 py-10 text-left text-xs font-black text-[#C9A84C] opacity-60 uppercase">Comparison</th>
                  <th className="px-10 py-10 text-center text-[11px] font-black text-[#C9A84C] uppercase bg-[#FFFFFF]">AOS Tradelines</th>
                  <th className="px-10 py-10 text-center text-xs font-black text-[#C9A84C] opacity-60 uppercase">Standard Providers</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {comparisons.map((row, idx) => (
                  <tr key={idx} className="bg-[#FFFFFF] even:bg-[#FFFFFF] hover:opacity-80 transition-opacity group">
                    <td className="px-10 py-8 text-[17px] font-black text-[#1A1A1A] transition-colors">{row.feature}</td>
                    <td className="px-10 py-8 text-center">
                      {row.aos === true ? (
                        <div className="w-10 h-10 bg-[#C9A84C] rounded-full flex items-center justify-center mx-auto text-[#0A0A0A] shadow-md">
                          <Check size={20} strokeWidth={4} />
                        </div>
                      ) : (
                        <span className="text-[#C9A84C] font-black italic text-sm">{row.aos}</span>
                      )}
                    </td>
                    <td className="px-10 py-8 text-center">
                      {row.others === true ? (
                        <div className="w-10 h-10 bg-[#FFFFFF] rounded-full flex items-center justify-center mx-auto text-[#4A4A4A]/50">
                          <Check size={20} strokeWidth={4} />
                        </div>
                      ) : row.others === false ? (
                        <div className="w-10 h-10 bg-[#FFFFFF] rounded-full flex items-center justify-center mx-auto text-[#4A4A4A] opacity-30">
                          <X size={20} strokeWidth={4} />
                        </div>
                      ) : (
                        <span className="text-[#4A4A4A] font-bold italic text-sm uppercase">{row.others}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {comparisons.map((row, idx) => (
            <div key={idx} className="premium-card !bg-[#FFFFFF] p-4 md:p-6 rounded-2xl md:rounded-[2rem] border-[#C9A84C]/20">
              <div className="text-sm md:text-lg font-bold text-[#1A1A1A] mb-3 md:mb-6 pr-2 leading-snug">{row.feature}</div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#FFFFFF] p-3 md:p-4 rounded-xl md:rounded-2xl border border-[#C9A84C]/20 flex flex-col items-center gap-1.5 md:gap-2">
                  <div className="text-[9px] font-black text-[#C9A84C] uppercase">AOS Tradelines</div>
                  {row.aos === true ? (
                    <Check size={20} className="text-[#C9A84C]" />
                  ) : (
                    <span className="text-[#C9A84C] font-black text-xs">{row.aos}</span>
                  )}
                </div>
                <div className="bg-[#FFFFFF] p-3 md:p-4 rounded-xl md:rounded-2xl border border-[#C9A84C]/20 flex flex-col items-center gap-1.5 md:gap-2">
                  <div className="text-[9px] font-black text-[#4A4A4A] opacity-60 uppercase">Standard Providers</div>
                  {row.others === true ? (
                    <Check size={20} className="text-[#4A4A4A] opacity-60" />
                  ) : row.others === false ? (
                    <X size={20} className="text-[#4A4A4A] opacity-40" />
                  ) : (
                    <span className="text-[#4A4A4A] opacity-60 font-black text-xs">{row.others}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
