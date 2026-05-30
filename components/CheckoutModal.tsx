"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, CheckCircle2, ArrowRight, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CheckoutModal() {
  const { cart, removeFromCart, clearCart, isCheckoutOpen, setIsCheckoutOpen } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);
  const [hasAgreedToTerms, setHasAgreedToTerms] = useState(false);

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setIsCheckoutOpen(false);
      setHasAgreedToTerms(false);
      clearCart();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCheckoutOpen(false)}
            className="absolute inset-0 bg-[#FAF8F3]/80 backdrop-blur-xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="relative w-full max-w-2xl premium-card !bg-[#FFFFFF] rounded-[4rem] shadow-[0_30px_80px_rgba(13,31,45,0.08)] overflow-hidden border-[#C9A84C]/20 ring-1 ring-[#C9A84C]/20"
          >
            <div className="p-8 sm:p-16">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-24 h-24 bg-[#C9A84C]/20 text-[#C9A84C] rounded-full flex items-center justify-center mx-auto mb-10">
                    <CheckCircle2 size={48} />
                  </div>
                  <h2 className="text-3xl lg:text-5xl font-display font-black text-[#1A1A1A] mb-6 uppercase">Order <span className="luxury-text-gradient italic">Confirmed</span></h2>
                  <p className="text-[#4A4A4A] opacity-60 text-lg mb-10 font-medium">
                    Your elite asset allocation has been submitted. Our concierge team will contact you within the hour to finalize your placement.
                  </p>
                  <div className="text-[10px] text-[#C9A84C] font-black uppercase animate-pulse">
                    AUTHENTICATING TRANSACTION...
                  </div>
                </motion.div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-display font-black text-[#1A1A1A] uppercase">Your <span className="luxury-text-gradient italic">Portfolio</span></h2>
                    <button
                      onClick={() => setIsCheckoutOpen(false)}
                      className="w-12 h-12 bg-[#FFFFFF] rounded-2xl flex items-center justify-center text-[#4A4A4A] hover:text-[#C9A84C] hover:bg-[#FFFFFF] transition-all border border-[#C9A84C]/20"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  <div className="space-y-6 mb-12 max-h-[45vh] overflow-y-auto pr-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-center p-6 bg-[#FFFFFF]/[0.03] rounded-3xl border border-[#C9A84C]/20 group hover:bg-[#FFFFFF] transition-all">
                        <div>
                          <div className="font-display font-black text-[#1A1A1A] text-xl mb-1">{item.bank} <span className="text-[#C9A84C]/50 group-hover:text-[#C9A84C] transition-colors">Strategic Asset</span></div>
                          <div className="text-[10px] text-[#4A4A4A] font-black uppercase">
                            {item.age} Years Aged • Limit ${item.limit.toLocaleString()}
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="font-display font-black text-[#C9A84C] text-2xl">${item.price}</div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="w-10 h-10 flex items-center justify-center text-[#4A4A4A] opacity-30 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-10 border-t border-[#C9A84C]/20 space-y-10">
                    <div className="flex justify-between items-end">
                      <div className="text-left">
                        <div className="text-[10px] font-black text-[#4A4A4A] uppercase mb-3">Total Investment</div>
                        <div className="text-5xl font-display font-black text-[#1A1A1A]">${totalPrice.toLocaleString()}</div>
                      </div>
                      <div className="text-right text-[10px] font-black text-[#C9A84C] uppercase">
                        {cart.length} Elite Assets Selected
                      </div>
                    </div>

                    <div
                      className={`p-6 rounded-[2rem] border transition-all duration-500 cursor-pointer group ${hasAgreedToTerms
                        ? "bg-[#C9A84C]/10 border-[#C9A84C]/20"
                        : "bg-[#FFFFFF]/[0.02] border-[#C9A84C]/20 hover:border-[#C9A84C]/20"
                        }`}
                      onClick={() => setHasAgreedToTerms(!hasAgreedToTerms)}
                    >
                      <div className="flex gap-4 items-start">
                        <div className={`mt-1 shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${hasAgreedToTerms
                          ? "bg-[#C9A84C] border-[#C9A84C] text-[#0A0A0A]"
                          : "border-[#C9A84C]/20 group-hover:border-white/20"
                          }`}>
                          {hasAgreedToTerms && <Check size={16} strokeWidth={4} />}
                        </div>
                        <div className="space-y-3">
                          <p className="text-[11px] font-black text-[#1A1A1A] uppercase">Agreement Disclosure</p>
                          <div className="space-y-1">
                            <p className="text-[10px] font-bold text-[#4A4A4A] opacity-60 flex items-center gap-2">
                              <span className="text-[#C9A84C] underline">NO REFUNDS.</span>
                            </p>
                            <p className="text-[10px] font-bold text-[#4A4A4A] opacity-60 flex items-center gap-2">
                              <span className="text-[#C9A84C] underline">AOS Tradelines on guarantee 2 bureau post.</span>
                            </p>
                            <p className="text-[10px] font-bold text-[#4A4A4A] opacity-60 flex items-center gap-2">
                              <span className="text-[#C9A84C] underline">If tradeline does not post you will be added to tradeline of equal value.</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex">
                      <button
                        onClick={handleCheckout}
                        disabled={!hasAgreedToTerms}
                        className="w-full py-6 rounded-3xl font-black text-[15px] uppercase transition-all flex items-center justify-center gap-4 active:scale-95 bg-[#C9A84C] text-[#0A0A0A] hover:bg-[#C9A84C]-hover shadow-xl shimmer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Proceed to Checkout
                        <ArrowRight size={24} />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
