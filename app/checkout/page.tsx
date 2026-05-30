"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, ShoppingCart, CreditCard, Trash2, ShieldCheck, ArrowRight } from "lucide-react";
import SectionBadge from "@/components/SectionBadge";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, removeFromCart } = useCart();
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
  const [selectedTradelines, setSelectedTradelines] = useState<string>("");

  useEffect(() => {
    let combined = "";

    // 1. Try to build from cart first
    if (cart && cart.length > 0) {
      combined = cart.map(item => {
        const limitStr = item.limit >= 1000 ? `${item.limit / 1000}k` : `${item.limit}`;
        const name = item.bank.trim();
        return `${name} - $${item.price} - ${limitStr} limit`;
      }).join('\n');
    }

    // 2. Fallback to URL parameters
    if (!combined) {
      const searchParams = new URLSearchParams(window.location.search);
      combined = searchParams.get("selected_tradelines") || searchParams.get("tradeline") || "";
    }

    // 3. Fallback to localStorage
    if (!combined) {
      combined = localStorage.getItem("checkout_selected_tradelines") || localStorage.getItem("checkout_tradeline") || "";
    }

    // Fallback: If no tradelines selected, redirect to inventory
    if (!combined) {
      router.push("/inventory");
      return;
    }

    // Sanitize
    if (combined.length > 1000) combined = combined.slice(0, 1000);
    combined = combined
      .replace(/[<>]/g, "")
      .replace(/[^a-zA-Z0-9\s\-\$\.\,\n]/g, "");

    localStorage.setItem("checkout_selected_tradelines", combined);
    setSelectedTradelines(combined);

    const currentParams = new URLSearchParams(window.location.search);
    if (currentParams.get("selected_tradelines") !== combined) {
      const newUrl = `${window.location.pathname}?selected_tradelines=${encodeURIComponent(combined)}`;
      window.history.replaceState({}, "", newUrl);
    }
  }, [cart, router]);

  const iframeSrc = `https://api.leadconnectorhq.com/widget/form/c11Vcv7Z8m6IUFwvxAwL?selected_tradelines=${encodeURIComponent(selectedTradelines)}`;

  return (
    <>
      <div className="pt-32 pb-24 md:pb-44 bg-[#FAF8F3] min-h-screen relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#FFFFFF] rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 -z-0" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#FFFFFF] rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 -z-0" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Hero */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10 md:mb-16">
            <SectionBadge icon={Lock}>Secure Checkout</SectionBadge>
            <h1 className="text-3xl md:text-7xl font-display font-black text-[#1A1A1A] mb-4 md:mb-6 uppercase leading-tight">
              Complete Your <span className="luxury-text-gradient">Tradeline Order</span>
            </h1>
            <p className="text-sm md:text-lg text-[#4A4A4A] opacity-70 max-w-2xl mx-auto font-medium leading-relaxed">
              Secure checkout – finalize your tradeline selection
            </p>
          </motion.div>

          <div className="grid gap-8">
            {/* Unified Card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="premium-card !bg-[#FFFFFF] rounded-[2.5rem] md:rounded-[3rem] border border-[#C9A84C]/20 overflow-hidden"
            >
              {/* Order Summary Header */}
              <div className="px-6 sm:px-10 md:px-14 pt-8 sm:pt-10 md:pt-12 pb-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl md:text-2xl font-display font-black text-[#1A1A1A] uppercase flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center">
                      <ShoppingCart size={18} className="text-[#C9A84C]" />
                    </div>
                    Order Summary
                  </h2>
                  {cart.length > 0 && (
                    <span className="bg-[#C9A84C]/10 border border-[#C9A84C]/20 text-[#C9A84C] text-[11px] font-black uppercase px-4 py-1.5 rounded-full">
                      {cart.length} {cart.length === 1 ? "item" : "items"}
                    </span>
                  )}
                </div>

                {/* Cart Items */}
                {cart.length > 0 ? (
                  <div className="space-y-3">
                    <AnimatePresence>
                      {cart.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0, padding: 0 }}
                          transition={{ duration: 0.25 }}
                          className="group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 sm:p-5 bg-[#FAF8F3] hover:bg-[#F5F2EA] border border-[#C9A84C]/15 hover:border-[#C9A84C]/30 rounded-2xl transition-all duration-300"
                        >
                          <div className="flex items-center gap-4 min-w-0">
                            <div className="w-11 h-11 rounded-xl bg-[#FFFFFF] border border-[#C9A84C]/20 flex items-center justify-center shrink-0 shadow-sm">
                              <CreditCard size={18} className="text-[#C9A84C]" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-[#1A1A1A] font-bold text-base leading-tight truncate">{item.bank}</div>
                              <div className="text-[#4A4A4A] opacity-60 text-[10px] uppercase font-black mt-1 flex flex-wrap gap-x-2">
                                <span>{item.age} Yrs</span>
                                <span className="opacity-40">•</span>
                                <span>${item.limit.toLocaleString()} Limit</span>
                                {item.reportingDate && item.reportingDate !== "N/A" && (
                                  <><span className="opacity-40">•</span><span>Reports {item.reportingDate}</span></>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                            <div className="text-[#C9A84C] font-display font-black text-xl">${item.price.toLocaleString()}</div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              title="Remove item"
                              className="w-9 h-9 flex items-center justify-center rounded-xl text-[#4A4A4A] opacity-30 hover:text-red-400 hover:opacity-100 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all duration-200 active:scale-90"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {/* Total row */}
                    <div className="pt-4 flex justify-between items-center">
                      <div className="text-[#4A4A4A] opacity-50 font-black uppercase text-[10px] tracking-widest">Total Investment</div>
                      <div className="text-[#1A1A1A] font-display font-black text-3xl">${totalPrice.toLocaleString()}</div>
                    </div>

                    <div className="flex justify-end pt-1">
                      <Link
                        href="/inventory"
                        className="text-[#C9A84C]/60 hover:text-[#C9A84C] text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                      >
                        <ArrowRight size={12} className="rotate-180" />
                        Add more tradelines
                      </Link>
                    </div>
                  </div>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-10 text-center">
                    <div className="w-16 h-16 bg-[#FAF8F3] rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <ShoppingCart size={28} className="text-[#4A4A4A] opacity-40" />
                    </div>
                    <p className="text-[#4A4A4A]/50 font-black uppercase tracking-widest text-sm mb-6">Your order is empty</p>
                    <Link
                      href="/inventory"
                      className="bg-[#C9A84C] text-[#0A0A0A] px-10 py-4 rounded-full font-black text-[13px] uppercase hover:bg-[#C9A84C]-hover transition-all shimmer"
                    >
                      Browse Tradelines
                    </Link>
                  </motion.div>
                )}
              </div>

              {/* Gold Divider */}
              <div className="mx-6 sm:mx-10 md:mx-14 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />

              {/* Form Label */}
              <div className="px-6 sm:px-10 md:px-14 pt-8 pb-2 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center">
                  <Lock size={16} className="text-[#C9A84C]" />
                </div>
                <div>
                  <div className="text-xl md:text-2xl font-display font-black text-[#1A1A1A] uppercase">Your Details</div>
                  <div className="text-[10px] font-black text-[#4A4A4A] opacity-40 uppercase tracking-widest mt-0.5">Secure encrypted submission</div>
                </div>
              </div>

              {/* GHL Form iframe */}
              <div className="px-0 sm:px-0 pb-0 overflow-hidden">
                <iframe
                  src={iframeSrc}
                  className="-mt-[220px]"
                  style={{ width: "100%", minHeight: "1050px", border: "none", display: "block" }}
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
                  // scrolling="no"
                />
              </div>
            </motion.div>

            {/* Trust + Notice */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-center gap-2.5 text-[#1A1A1A]/25 font-black uppercase text-[10px] tracking-[0.15em]">
                <ShieldCheck size={14} className="text-[#C9A84C] animate-pulse" />
                Your payment and personal information are secure
              </div>

              <div className="p-5 bg-red-500/5 border border-red-500/10 rounded-2xl text-center">
                <p className="text-red-500/70 font-black uppercase text-[11px] tracking-wider">
                  All sales are final. No refunds.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
