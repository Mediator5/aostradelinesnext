"use client";

import Link from "next/link";
import { ShieldCheck, Star, ShoppingCart, ChevronRight, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import SectionBadge from "@/components/SectionBadge";
import TradelineCard from "@/components/TradelineCard";
import { Tradeline } from "@/types";

export default function FeaturedTradelines({ tradelines: allTradelines }: { tradelines: Tradeline[] }) {
  const { cart, addToCart, removeFromCart } = useCart();
  const tradelines = allTradelines.slice(0, 6);

  return (
    <section className="py-20 md:py-32 bg-[#FAF8F3] relative overflow-hidden" id="tradelines">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FFFFFF] rounded-full blur-[120px] -z-0" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FFFFFF] rounded-full blur-[100px] -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center gap-6 md:gap-10 mb-12 md:mb-20 text-center">
          <div className="max-w-5xl mx-auto">
            <SectionBadge icon={Star}>Elite Selection</SectionBadge>
            <h2 className="text-3xl md:text-7xl lg:text-8xl text-[#1A1A1A] font-display font-black leading-tight md:leading-[1.05] mb-4 md:mb-8 uppercase">Hand-Selected <span className="luxury-text-gradient italic">Premium Assets</span></h2>
            <p className="text-sm md:text-xl text-[#1A1A1A] max-w-3xl mx-auto leading-relaxed font-bold px-2">
              Architect your profile with our curated selection of verified, high-limit aged tradelines. Audited for maximum impact.
            </p>
          </div>
          {cart.length > 0 && (
            <Link
              href="/checkout"
              className="bg-[#C9A84C] text-[#0A0A0A] px-10 py-5 rounded-full font-black text-[13px] uppercase hover:bg-[#C9A84C]-hover transition-all flex items-center gap-3 shadow-xl"
            >
              <ShoppingCart size={20} />
              Proceed to Checkout ({cart.length})
            </Link>
          )}
        </div>

        <div className="mb-20">
          {/* Card View for Mobile */}
          <div className="md:hidden space-y-4">
            {tradelines.length > 0 ? (
              tradelines.map((t) => (
                <TradelineCard
                  key={t.id}
                  tradeline={t}
                  isInCart={!!cart.find(item => item.id === t.id)}
                  addToCart={addToCart}
                  removeFromCart={removeFromCart}
                />
              ))
            ) : (
              <div className="py-20 text-center text-[#4A4A4A] opacity-40 italic font-medium uppercase">
                AUTHENTICATING LATEST ASSETS...
              </div>
            )}
          </div>

          {/* Table View for Desktop */}
          <div className="hidden md:block overflow-x-auto rounded-[3.5rem] border border-[#C9A84C]/20 shadow-[0_30px_80px_rgba(13,31,45,0.08)] bg-[#FFFFFF]/[0.02] backdrop-blur-3xl overflow-hidden ring-1 ring-[#C9A84C]/10 relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFFFFF] rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#FFFFFF] rounded-full blur-[80px] pointer-events-none" />
            <table className="w-full text-left border-collapse relative z-10">
              <thead>
                <tr className="bg-[#1A1A1A] border-b border-[#C9A84C]">
                  <th className="px-6 py-10 text-[11px] font-black text-[#C9A84C] uppercase lg:px-8 text-left">Asset Class</th>
                  <th className="px-6 py-10 text-[11px] font-black text-[#C9A84C] uppercase lg:px-8 text-left">Credit Limit</th>
                  <th className="px-6 py-10 text-[11px] font-black text-[#C9A84C] uppercase lg:px-8 text-left">History</th>
                  <th className="px-6 py-10 text-[11px] font-black text-[#C9A84C] uppercase lg:px-8 text-left">Reporting Window</th>
                  <th className="px-6 py-10 text-[11px] font-black text-[#C9A84C] uppercase lg:px-8 text-left">Investment</th>
                  <th className="px-6 py-10 lg:px-8"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {tradelines.length > 0 ? (
                  tradelines.map((t, idx) => {
                    const isInCart = cart.find(item => item.id === t.id);
                    const isSoldOut = t.spotsAvailable === 0;
                    return (
                      <tr key={idx} className="bg-[#FFFFFF] even:bg-[#FAF8F3] hover:opacity-80 transition-all duration-300 group border-l-2 border-transparent hover:border-[#C9A84C]">
                        <td className="px-6 py-8 lg:px-8">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#FFFFFF] border border-[#C9A84C]/20 flex items-center justify-center text-[#C9A84C] group-hover:bg-[#C9A84C] group-hover:text-[#0A0A0A] transition-all">
                              <ShieldCheck size={16} />
                            </div>
                            <div>
                              <div className="font-bold text-[#1A1A1A] text-lg leading-tight">{t.bank}</div>
                              <div className="text-[10px] text-[#C9A84C] uppercase font-black italic mt-1 opacity-60 group-hover:opacity-100 transition-opacity">Premium Asset</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-8 font-display font-black text-2xl text-[#1A1A1A] italic group-hover:text-[#C9A84C] transition-colors lg:px-8">${t.limit.toLocaleString()}</td>
                        <td className="px-6 py-8 text-[#4A4A4A] font-medium lg:px-8">{t.age} Years Aged</td>
                        <td className="px-6 py-8 text-[#4A4A4A] opacity-60 lg:px-8">{t.reportingDate}</td>
                        <td className="px-6 py-8 font-display font-black text-[#1A1A1A] text-2xl group-hover:text-[#C9A84C] transition-all duration-300 lg:px-8">
                          <div className="inline-flex items-center gap-2">
                            ${t.price}
                            <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </td>
                        <td className="px-6 py-8 text-right lg:px-8">
                          <button
                            onClick={() => isInCart ? removeFromCart(t.id) : addToCart(t)}
                            disabled={isSoldOut && !isInCart}
                            className={`w-52 h-14 rounded-2xl text-[11px] font-black uppercase transition-all flex items-center justify-center gap-3 ml-auto shadow-lg relative overflow-hidden group/btn ${isInCart
                              ? "bg-[#FFFFFF] text-[#1A1A1A] border border-white/20 hover:bg-red-500/20"
                              : isSoldOut
                                ? "bg-[#FFFFFF] text-[#4A4A4A] opacity-30 cursor-not-allowed border border-[#C9A84C]/20"
                                : "bg-[#FFFFFF] text-[#1A1A1A] border border-[#C9A84C]/20 hover:bg-[#C9A84C] hover:text-[#0A0A0A] hover:border-[#C9A84C] shimmer"
                              }`}
                          >
                            {isInCart ? (
                              <><Check size={16} strokeWidth={4} />SECURED</>
                            ) : isSoldOut ? (
                              <><ShoppingCart size={16} strokeWidth={4} className="opacity-0" />Sold Out</>
                            ) : (
                              <><ShoppingCart size={16} strokeWidth={4} className="group-hover/btn:translate-x-1 transition-transform" />Purchase now</>
                            )}
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="px-10 py-32 text-center text-[#4A4A4A] opacity-40 italic font-medium">
                      AUTHENTICATING LATEST ASSETS...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center px-4 mt-8">
          <Link
            href="/inventory"
            className="w-full sm:w-auto bg-[#FFFFFF] hover:bg-[#FFFFFF] text-[#1A1A1A] px-10 md:px-14 py-5 md:py-6 rounded-full font-black text-[13px] uppercase transition-all inline-flex items-center justify-center gap-4 border border-[#C9A84C]/20 shadow-xl active:scale-95"
          >
            Explore All Tradelines
            <ChevronRight size={20} className="text-[#C9A84C]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
