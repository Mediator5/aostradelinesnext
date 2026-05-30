"use client";

import { useState } from "react";
import Link from "next/link";
import { Calculator, Activity, Zap, Lock, ArrowRight } from "lucide-react";
import SectionBadge from "@/components/SectionBadge";
import Footer from "@/components/Footer";

export default function CalculatorPage() {
  const [currentLimit, setCurrentLimit] = useState<number>(0);
  const [currentBalance, setCurrentBalance] = useState<number>(0);
  const [currentAge, setCurrentAge] = useState<number>(0);
  const [numAccounts, setNumAccounts] = useState<number>(1);
  const [simLimit, setSimLimit] = useState<number>(0);
  const [simAge, setSimAge] = useState<number>(0);

  const currentUtil = currentLimit > 0 ? (currentBalance / currentLimit) * 100 : 0;
  const newLimit = currentLimit + simLimit;
  const newUtil = newLimit > 0 ? (currentBalance / newLimit) * 100 : 0;
  const newAvgAge = numAccounts > 0 ? (currentAge + simAge) / (numAccounts + (simLimit > 0 ? 1 : 0)) : 0;

  const getStatus = (util: number) => {
    if (util > 30) return { label: "High", color: "text-red-500", bg: "bg-red-500/10" };
    if (util <= 10) return { label: "Excellent", color: "text-green-500", bg: "bg-green-500/10" };
    return { label: "Good", color: "text-[#C9A84C]", bg: "bg-[#C9A84C]/10" };
  };

  const status = getStatus(newUtil);

  return (
    <>
      <div className="pt-28 md:pt-32 pb-20 md:pb-44 bg-[#FAF8F3] min-h-screen relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FFFFFF] rounded-full blur-[120px] -z-0" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FFFFFF] rounded-full blur-[100px] -z-0" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10 md:mb-16">
            <SectionBadge icon={Calculator}>Impact Calculator</SectionBadge>
            <h1 className="text-3xl md:text-6xl font-display font-black text-[#1A1A1A] mb-4 md:mb-6 uppercase leading-tight">
              See Your <span className="luxury-text-gradient">Results</span>
            </h1>
            <p className="text-sm md:text-lg text-[#4A4A4A] opacity-70 max-w-2xl mx-auto font-medium leading-relaxed px-2">
              Calculate how a new tradeline will lower your utilization and improve your profile.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left: Inputs */}
            <div className="space-y-6">
              <div className="premium-card !bg-[#FFFFFF] p-5 sm:p-8 rounded-2xl md:rounded-[2.5rem] border-[#C9A84C]/20">
                <h2 className="text-base md:text-xl font-display font-bold text-[#1A1A1A] mb-5 md:mb-8 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#C9A84C]/10 flex items-center justify-center text-[#C9A84C]">
                    <Activity size={18} />
                  </div>
                  Your Current Credit
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black text-[#4A4A4A] uppercase mb-2 ml-1">Total Credit Limit ($)</label>
                    <input type="number" placeholder="e.g. 5000" className="w-full bg-[#FFFFFF] border border-[#C9A84C]/20 rounded-2xl px-6 py-4 text-[#1A1A1A] font-bold focus:outline-none focus:border-[#C9A84C] transition-all" value={currentLimit || ""} onChange={(e) => setCurrentLimit(Number(e.target.value))} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-[#4A4A4A] uppercase mb-2 ml-1">Total Balance ($)</label>
                    <input type="number" placeholder="e.g. 2500" className="w-full bg-[#FFFFFF] border border-[#C9A84C]/20 rounded-2xl px-6 py-4 text-[#1A1A1A] font-bold focus:outline-none focus:border-[#C9A84C] transition-all" value={currentBalance || ""} onChange={(e) => setCurrentBalance(Number(e.target.value))} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-[#4A4A4A] uppercase mb-2 ml-1">Total Age (Years)</label>
                      <input type="number" placeholder="e.g. 5" className="w-full bg-[#FFFFFF] border border-[#C9A84C]/20 rounded-2xl px-6 py-4 text-[#1A1A1A] font-bold focus:outline-none focus:border-[#C9A84C] transition-all" value={currentAge || ""} onChange={(e) => setCurrentAge(Number(e.target.value))} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-[#4A4A4A] uppercase mb-2 ml-1">Number of Cards</label>
                      <input type="number" placeholder="e.g. 2" className="w-full bg-[#FFFFFF] border border-[#C9A84C]/20 rounded-2xl px-6 py-4 text-[#1A1A1A] font-bold focus:outline-none focus:border-[#C9A84C] transition-all" value={numAccounts || ""} onChange={(e) => setNumAccounts(Number(e.target.value))} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="premium-card !bg-[#FFFFFF] p-5 sm:p-8 rounded-2xl md:rounded-[2.5rem] border-[#C9A84C]/20 bg-[#C9A84C]/[0.02]">
                <h2 className="text-base md:text-xl font-display font-bold text-[#1A1A1A] mb-5 md:mb-8 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#C9A84C] text-[#0A0A0A] flex items-center justify-center">
                    <Zap size={18} />
                  </div>
                  Simulate New Tradeline
                </h2>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-[#C9A84C] uppercase mb-2 ml-1">New Limit ($)</label>
                    <input type="number" placeholder="e.g. 15000" className="w-full bg-[#FFFFFF] border border-[#C9A84C]/20 rounded-2xl px-6 py-4 text-[#1A1A1A] font-bold focus:outline-none focus:border-[#C9A84C] transition-all" value={simLimit || ""} onChange={(e) => setSimLimit(Number(e.target.value))} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-[#C9A84C] uppercase mb-2 ml-1">Account Age (Years)</label>
                    <input type="number" placeholder="e.g. 10" className="w-full bg-[#FFFFFF] border border-[#C9A84C]/20 rounded-2xl px-6 py-4 text-[#1A1A1A] font-bold focus:outline-none focus:border-[#C9A84C] transition-all" value={simAge || ""} onChange={(e) => setSimAge(Number(e.target.value))} />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Results */}
            <div className="lg:sticky lg:top-32 space-y-6">
              <div className="premium-card !bg-[#FFFFFF] p-6 sm:p-10 rounded-2xl md:rounded-[3rem] border-[#C9A84C]/20 relative overflow-hidden flex flex-col items-center text-center">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFFFFF] rounded-full blur-[50px]" />
                <div className={`px-3.5 py-1 rounded-full ${status.bg} ${status.color} text-[10px] font-black uppercase tracking-widest mb-5`}>
                  Utilization Status: {status.label}
                </div>
                <div className="mb-6">
                  <div className="text-[10px] font-black text-[#4A4A4A] opacity-60 uppercase tracking-widest mb-2">Projected Utilization</div>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className={`text-7xl font-display font-black italic ${status.color}`}>{newUtil.toFixed(1)}</span>
                    <span className="text-3xl font-display font-black text-[#4A4A4A] opacity-40 italic">%</span>
                  </div>
                  <div className="text-[11px] font-bold text-[#4A4A4A] opacity-60 mt-2">
                    Reduced from <span className="line-through">{currentUtil.toFixed(1)}%</span>
                  </div>
                </div>
                <div className="w-full h-px bg-[#FFFFFF]/8 mb-6" />
                <div className="grid grid-cols-2 gap-8 w-full">
                  <div className="text-center">
                    <div className="text-[10px] font-black text-[#4A4A4A]/50 uppercase tracking-widest mb-1.5">New Total Limit</div>
                    <div className="text-2xl font-display font-black text-[#1A1A1A] italic">${newLimit.toLocaleString()}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[10px] font-black text-[#4A4A4A]/50 uppercase tracking-widest mb-1.5">New Avg. Age</div>
                    <div className="text-2xl font-display font-black text-[#1A1A1A] italic">{newAvgAge.toFixed(1)} <span className="text-sm">Yrs</span></div>
                  </div>
                </div>
                <div className="mt-8 w-full">
                  <Link href="/inventory" className="w-full bg-[#C9A84C] text-[#0A0A0A] py-5 rounded-2xl font-black text-[12px] uppercase hover:bg-[#C9A84C]-hover transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95 shimmer">
                    View Suitable Tradelines
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 text-[10px] font-black text-[#4A4A4A] opacity-40 uppercase tracking-widest mt-2">
                <div className="w-8 h-px bg-[#FFFFFF]" />
                <div className="flex items-center gap-2">
                  <Lock size={12} />
                  Secure Simulation
                </div>
                <div className="w-8 h-px bg-[#FFFFFF]" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
