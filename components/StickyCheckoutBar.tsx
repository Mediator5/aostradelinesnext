"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function StickyCheckoutBar() {
  const { cart } = useCart();
  const pathname = usePathname();
  const cartCount = cart.length;
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  if (pathname === "/checkout") return null;

  return (
    <AnimatePresence>
      {cartCount > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-[60]"
        >
          {/* Mobile Bar */}
          <div className="md:hidden bg-gradient-to-r from-accent to-accent-hover px-4 pt-4 pb-6 select-none shadow-xl bg-black">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="relative shrink-0">
                  <div className="bg-[#FAF8F3] w-11 h-11 rounded-2xl flex items-center justify-center shadow-md">
                    <ShoppingCart size={20} className="text-[#C9A84C]" />
                  </div>
                  <span className="absolute -top-1.5 -right-1.5 bg-[#FFFFFF] text-[#0A0A0A] text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#C9A84C] shadow">
                    {cartCount}
                  </span>
                </div>
                <div>
                  <div className="text-[8px] font-black text-white uppercase leading-none mb-0.5">Total</div>
                  <div className="text-2xl font-display font-black text-[#C9A84C] italic leading-none">${totalPrice.toLocaleString()}</div>
                </div>
              </div>
              <Link
                href="/checkout"
                className="group bg-[#FAF8F3] text-[#C9A84C] px-6 py-4 rounded-2xl font-black text-[11px] uppercase active:scale-95 flex items-center gap-2 shadow-md transition-all border border-[#C9A84C]/20 shrink-0"
              >
                Checkout
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Desktop Bar */}
          <div className="hidden md:block p-8 bg-black">
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-accent via-accent/90 to-accent-hover rounded-full p-3 flex items-center justify-between shadow-xl border border-white/20 select-none">
              <div className="flex items-center gap-8 pl-10">
                <div className="relative">
                  <div className="bg-[#FAF8F3] text-[#C9A84C] w-16 h-16 rounded-full flex items-center justify-center shadow-inner ring-4 ring-black/10">
                    <ShoppingCart size={28} />
                  </div>
                  <span className="absolute -top-1 -right-1 bg-red-600 text-[#1A1A1A] text-xs font-black w-7 h-7 rounded-full flex items-center justify-center shadow-lg border-2 border-[#C9A84C]">
                    {cartCount}
                  </span>
                </div>
                <div>
                  <div className="text-[10px] font-black text-white uppercase mb-0.5">Allocation Portfolio</div>
                  <div className="text-4xl font-display font-black text-[#C9A84C] italic leading-none drop-shadow-sm">${totalPrice.toLocaleString()}</div>
                </div>
              </div>
              <Link
                href="/checkout"
                className="group bg-[#FAF8F3] text-[#C9A84C] px-16 py-7 rounded-full font-black text-[14px] uppercase active:scale-95 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:bg-[#FAF8F3]/90 transition-all flex items-center gap-4 border border-[#C9A84C]/20"
              >
                Verify &amp; Purchase
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
