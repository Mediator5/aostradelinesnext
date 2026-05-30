"use client";

import { ShoppingCart, X } from "lucide-react";
import { Tradeline } from "@/types";

export default function TradelineCard({
  tradeline: t,
  isInCart,
  addToCart,
  removeFromCart
}: {
  tradeline: Tradeline;
  isInCart: boolean;
  addToCart: (t: Tradeline) => void;
  removeFromCart: (id: string | number) => void;
}) {
  const isSoldOut = t.spotsAvailable === 0;

  return (
    <div className="bg-[#FFFFFF] rounded-2xl overflow-hidden flex flex-col mb-4 border border-[#C9A84C]/20 shadow-sm transition-all hover:shadow-md">
      {/* Header */}
      <div className="bg-[#FFFFFF]/50 px-5 py-3.5 flex justify-between items-center border-b border-[#C9A84C]/20">
        <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Tradeline ID:</span>
        <span className="text-sm font-black text-slate-900">{t.id}</span>
      </div>

      {/* Details Rows */}
      <div className="flex flex-col">
        <div className="px-5 py-3.5 flex justify-between items-start border-b border-[#C9A84C]/20">
          <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest mt-0.5">Bank</span>
          <div className="text-right">
            <div className="text-slate-900 font-bold text-sm leading-tight">{t.bank}</div>
            <div className="text-[10px] text-slate-400 font-medium mt-0.5">{t.bankSubtext || "No Age Reports"}</div>
          </div>
        </div>

        <div className="px-5 py-3.5 flex justify-between items-center border-b border-[#C9A84C]/20">
          <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Limit</span>
          <span className="text-slate-900 font-bold text-sm">${t.limit.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
        </div>

        <div className="px-5 py-3.5 flex justify-between items-center border-b border-[#C9A84C]/20">
          <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Age</span>
          <span className="text-slate-600 font-bold text-sm uppercase">{t.age > 0 ? `${t.age} Years` : 'N/A'}</span>
        </div>

        <div className="px-5 py-3.5 flex justify-between items-center border-b border-[#C9A84C]/20">
          <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Purchase Deadline</span>
          <span className="text-slate-600 font-bold text-sm uppercase">{t.purchaseDeadline}</span>
        </div>

        <div className="px-5 py-3.5 flex justify-between items-center border-b border-[#C9A84C]/20">
          <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Reporting Date</span>
          <span className="text-slate-600 font-bold text-sm uppercase">{t.reportingDate}</span>
        </div>

        <div className="px-5 py-3.5 flex justify-between items-center">
          <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Price</span>
          <span className="text-slate-900 font-black text-sm">${t.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
        </div>
      </div>

      {/* Action Button Section */}
      <div className="px-5 pb-5 pt-3">
        {isSoldOut && !isInCart ? (
          <button
            disabled
            className="w-full h-[52px] bg-red-400 text-[#1A1A1A] rounded-xl text-[12px] font-black uppercase tracking-widest cursor-not-allowed flex items-center justify-center"
          >
            Sold Out
          </button>
        ) : (
          <button
            onClick={() => isInCart ? removeFromCart(t.id) : addToCart(t)}
            className={`w-full h-[52px] rounded-xl text-[12px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${isInCart
              ? "bg-slate-100 text-slate-600 hover:bg-red-50"
              : "bg-[#C9A84C] text-[#0A0A0A] hover:bg-[#C9A84C]-hover"
              }`}
          >
            {isInCart ? (
              <>
                <X size={14} strokeWidth={3} />
                Remove Asset
              </>
            ) : (
              <>
                <ShoppingCart size={14} strokeWidth={3} />
                Add to cart
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
