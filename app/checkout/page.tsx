"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Lock, ShoppingCart, CreditCard, Trash2, ShieldCheck, ArrowRight,
  AlertCircle, Copy, Check, Info, ChevronDown, Upload, X
} from "lucide-react";
import SectionBadge from "@/components/SectionBadge";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

const PAYMENT_OPTIONS = [
  { label: "Zelle", value: "(954) 552-0026", note: "AOS Impact Solutions", icon: "Z" },
  { label: "Apple Pay", value: "(954) 552-0026", note: null, icon: "A" },
  { label: "Cash App", value: "$AOS700Boost", note: null, icon: "$" },
  { label: "Venmo", value: "@asampson5", note: null, icon: "V" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, removeFromCart } = useCart();
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [copied, setCopied] = useState<string | null>(null);
  const [showBureaus, setShowBureaus] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "",
    referredBy: "", paymentMethod: "", agreed: false,
  });

  const orderDetails = cart.map(item => {
    const limitStr = item.limit >= 1000 ? `$${(item.limit / 1000).toFixed(0)}k` : `$${item.limit}`;
    return `${item.bank} — $${item.price} — ${limitStr} limit`;
  }).join("\n");

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setProofFile(e.target.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Prepare payload then fire with keepalive so browser doesn't cancel on redirect
    let proofFileBase64 = null;
    let proofFileName = null;
    if (proofFile) {
      // Compress images before encoding to stay under Vercel's 4.5MB limit
      if (proofFile.type.startsWith("image/")) {
        const bitmap = await createImageBitmap(proofFile);
        const canvas = document.createElement("canvas");
        const scale = Math.min(1, 1200 / Math.max(bitmap.width, bitmap.height));
        canvas.width = bitmap.width * scale;
        canvas.height = bitmap.height * scale;
        canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
        proofFileBase64 = canvas.toDataURL("image/jpeg", 0.7).split(",")[1];
        proofFileName = proofFile.name.replace(/\.[^.]+$/, ".jpg");
      } else {
        const buffer = await proofFile.arrayBuffer();
        proofFileBase64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));
        proofFileName = proofFile.name;
      }
    }

    try {
      await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, orderDetails, proofFileBase64, proofFileName }),
      });
    } catch (err) {
      console.error("Email send failed:", err);
    }

    window.location.href = "https://funnel.aosimpactsolutions.com/widget/form/c11Vcv7Z8m6IUFwvxAwL";
  };

  useEffect(() => {
    if (!cart.length) router.push("/inventory");
  }, [cart, router]);

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
              Review your order, send payment, then submit your details below.
            </p>
          </motion.div>

          <div className="mb-5 md:mb-5 flex flex-col items-center text-center">
            <h3 className="text-2xl md:text-3xl lg:text-5xl text-[#1A1A1A] mb-0 md:mb-0 font-display font-black leading-[1.05] uppercase">STEP 2: SUBMIT YOUR PAYMENT</h3>
          </div>

          <div className="grid gap-5">

            {/* ── 1. Order Summary ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
              className="premium-card !bg-[#FFFFFF] rounded-[2.5rem] border border-[#C9A84C]/20 overflow-hidden"
            >
              <div className="px-6 sm:px-10 pt-8 pb-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-display font-black text-[#1A1A1A] uppercase flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center">
                      <ShoppingCart size={16} className="text-[#C9A84C]" />
                    </div>
                    Order Summary
                  </h2>
                  {cart.length > 0 && (
                    <span className="bg-[#C9A84C]/10 border border-[#C9A84C]/20 text-[#C9A84C] text-[11px] font-black uppercase px-4 py-1.5 rounded-full">
                      {cart.length} {cart.length === 1 ? "item" : "items"}
                    </span>
                  )}
                </div>

                <AnimatePresence>
                  {cart.map((item) => (
                    <motion.div
                      key={item.id} layout
                      initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20, height: 0 }}
                      className="group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 sm:p-5 bg-[#FAF8F3] hover:bg-[#F5F2EA] border border-[#C9A84C]/15 hover:border-[#C9A84C]/30 rounded-2xl transition-all mb-3"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="w-11 h-11 rounded-xl bg-[#FFFFFF] border border-[#C9A84C]/20 flex items-center justify-center shrink-0">
                          <CreditCard size={18} className="text-[#C9A84C]" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-[#1A1A1A] font-bold text-base truncate">{item.bank}</div>
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
                          className="w-9 h-9 flex items-center justify-center rounded-xl text-[#4A4A4A] opacity-30 hover:text-red-400 hover:opacity-100 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                <div className="pt-3 flex justify-between items-center border-t border-[#C9A84C]/10 mt-2">
                  <div className="text-[#4A4A4A] opacity-50 font-black uppercase text-[10px] tracking-widest">Total Investment</div>
                  <div className="text-[#1A1A1A] font-display font-black text-3xl">${totalPrice.toLocaleString()}</div>
                </div>
                <div className="flex justify-end pt-2">
                  <Link href="/inventory" className="text-[#C9A84C]/60 hover:text-[#C9A84C] text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 transition-colors">
                    <ArrowRight size={12} className="rotate-180" />
                    Add more tradelines
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* ── 2. Important Notices ── */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-4">

              {/* Accuracy Required */}
              <div className="flex items-start gap-4 p-5 bg-red-500/5 border border-red-500/20 rounded-2xl">
                <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-500 font-black uppercase text-[11px] tracking-wider mb-1.5">Accuracy Required</p>
                  <p className="text-[#4A4A4A] text-sm leading-relaxed">
                    Make sure the information you submit is accurate and correct as reported on your credit report. Any non-posting tradelines due to inaccurate or incomplete information will{" "}
                    <span className="font-black text-[#1A1A1A]">not be refunded nor replaced.</span>
                  </p>
                </div>
              </div>

              {/* Refund Policy */}
              <div className="premium-card !bg-[#FFFFFF] p-5 rounded-2xl border border-[#C9A84C]/20">
                <p className="text-black text-sm leading-relaxed">
                  <span className="font-black text-[#1A1A1A]">Refund Policy:</span> No refunds — only exchanges.
                </p>
                <p className="text-black text-sm leading-relaxed mt-2 ">
                  Tradelines will post for 60 days. All sales are final. Tradelines usually take anywhere from{" "}
                  <span className="font-bold text-[#1A1A1A]">2–14 days</span> after the purchase date to report.
                </p>
                <p className="text-black text-sm mt-2  italic">Please remove all fraud alerts and holds on your credit report before submitting.</p>
              </div>

              {/* Purchase Date */}
              <div className="bg-[#1A1A1A] rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <Info size={18} className="text-[#C9A84C] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-black uppercase text-[11px] tracking-wider mb-2">Important</p>
                    <p className="text-white/70 text-sm leading-relaxed">
                      Each tradeline has a listed{" "}
                      <span className="text-[#C9A84C] font-black">Purchase Date</span> — this is the latest date you must purchase to ensure it reports within the same month.
                    </p>
                    <p className="text-[#C9A84C]/80 text-sm mt-2 font-medium italic">
                      Purchases made after that date may not report until the following month.
                    </p>
                  </div>
                </div>
              </div>

              {/* 3 Bureaus accordion */}
              <div className="premium-card !bg-[#FFFFFF] rounded-2xl border border-[#C9A84C]/20 overflow-hidden">
                <button
                  onClick={() => setShowBureaus(!showBureaus)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-black text-[#1A1A1A] text-sm">Why we can't guarantee all 3 bureaus?</span>
                  <ChevronDown size={16} className={`text-[#C9A84C] transition-transform ${showBureaus ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {showBureaus && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 space-y-3 border-t border-[#C9A84C]/10 pt-4">
                        <p className="text-[#4A4A4A] text-sm leading-relaxed opacity-70">
                          Tradelines post based on the information you provide matching what's on your credit file.
                        </p>
                        <p className="text-[#4A4A4A] text-sm leading-relaxed opacity-70">
                          When a tradeline successfully reports, it means the information matched correctly. If a tradeline appears on only 1 or 2 bureaus but not all three,{" "}
                          <span className="font-bold text-[#1A1A1A] opacity-100">the issue typically lies with the information on your credit report — not the tradeline itself.</span>
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* ── 3. Payment Options ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="premium-card !bg-[#FFFFFF] p-6 sm:p-10 rounded-[2.5rem] border border-[#C9A84C]/20"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-9 h-9 rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center">
                  <CreditCard size={16} className="text-[#C9A84C]" />
                </div>
                <h2 className="text-xl font-display font-black text-[#1A1A1A] uppercase">Payment Options</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PAYMENT_OPTIONS.map((opt) => (
                  <div key={opt.label} className="group bg-[#FAF8F3] border border-[#C9A84C]/20 hover:border-[#C9A84C]/50 rounded-2xl p-5 transition-all">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-xl bg-[#1A1A1A] text-[#C9A84C] flex items-center justify-center font-black text-sm shrink-0">
                        {opt.icon}
                      </div>
                      <span className="font-black text-[#1A1A1A] uppercase text-[11px] tracking-widest">{opt.label}</span>
                    </div>
                    {opt.note && (
                      <p className="text-[#C9A84C] text-[10px] font-black uppercase tracking-wider mb-2">{opt.note}</p>
                    )}
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-[#1A1A1A] text-sm truncate">{opt.value}</span>
                      <button
                        onClick={() => copyToClipboard(opt.value, opt.label)}
                        className="w-8 h-8 flex items-center justify-center rounded-xl bg-[#FFFFFF] border border-[#C9A84C]/20 hover:bg-[#C9A84C] hover:border-[#C9A84C] hover:text-[#0A0A0A] text-[#4A4A4A] transition-all shrink-0"
                        title="Copy to clipboard"
                      >
                        {copied === opt.label
                          ? <Check size={14} strokeWidth={3} />
                          : <Copy size={14} />
                        }
                      </button>
                    </div>
                    {copied === opt.label && (
                      <p className="text-[#C9A84C] text-[10px] font-black uppercase mt-2 tracking-wider">Copied!</p>
                    )}
                  </div>
                ))}
              </div>

              <p className="mt-6 text-[#4A4A4A] opacity-50 text-[11px] font-black uppercase text-center tracking-wider">
                Upload your proof of payment in the form below
              </p>
            </motion.div>

            {/* ── 4. Order Form ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="premium-card !bg-[#FFFFFF] rounded-[2.5rem] border border-[#C9A84C]/20 overflow-hidden"
            >
              <div className="px-6 sm:px-10 pt-8 pb-2 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center">
                  <Lock size={16} className="text-[#C9A84C]" />
                </div>
                <div>
                  <div className="text-xl font-display font-black text-[#1A1A1A] uppercase">Your Details</div>
                  <div className="text-[10px] font-black text-[#4A4A4A] opacity-40 uppercase tracking-widest mt-0.5">Secure encrypted submission</div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="px-6 sm:px-10 py-8 space-y-5">

                {/* Name row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-[#4A4A4A] uppercase tracking-widest">Full Name *</label>
                    <input
                      required
                      value={form.fullName}
                      onChange={e => setForm({ ...form, fullName: e.target.value })}
                      placeholder="Full name"
                      className="w-full bg-[#FAF8F3] border border-[#C9A84C]/20 focus:border-[#C9A84C] rounded-2xl px-5 py-4 text-sm font-medium text-[#1A1A1A] outline-none transition-all placeholder:text-[#4A4A4A]/30"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-[#4A4A4A] uppercase tracking-widest">Email Address *</label>
                    <input
                      required type="email"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="Email"
                      className="w-full bg-[#FAF8F3] border border-[#C9A84C]/20 focus:border-[#C9A84C] rounded-2xl px-5 py-4 text-sm font-medium text-[#1A1A1A] outline-none transition-all placeholder:text-[#4A4A4A]/30"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[#4A4A4A] uppercase tracking-widest">Phone Number *</label>
                  <input
                    required type="tel"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-[#FAF8F3] border border-[#C9A84C]/20 focus:border-[#C9A84C] rounded-2xl px-5 py-4 text-sm font-medium text-[#1A1A1A] outline-none transition-all placeholder:text-[#4A4A4A]/30"
                  />
                </div>

                {/* Payment Method */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[#4A4A4A] uppercase tracking-widest">Payment Method Used *</label>
                  <select
                    required
                    value={form.paymentMethod}
                    onChange={e => setForm({ ...form, paymentMethod: e.target.value })}
                    className="w-full bg-[#FAF8F3] border border-[#C9A84C]/20 focus:border-[#C9A84C] rounded-2xl px-5 py-4 text-sm font-medium text-[#1A1A1A] outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="">Select payment method</option>
                    <option value="zelle">Zelle</option>
                    <option value="apple-pay">Apple Pay</option>
                    <option value="cash-app">Cash App</option>
                    <option value="venmo">Venmo</option>
                  </select>
                </div>

                {/* Referred By */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[#4A4A4A] uppercase tracking-widest">Referred By <span className="opacity-40 normal-case font-medium">(optional)</span></label>
                  <input
                    value={form.referredBy}
                    onChange={e => setForm({ ...form, referredBy: e.target.value })}
                    placeholder="If referred by anyone, please put their name here"
                    className="w-full bg-[#FAF8F3] border border-[#C9A84C]/20 focus:border-[#C9A84C] rounded-2xl px-5 py-4 text-sm font-medium text-[#1A1A1A] outline-none transition-all placeholder:text-[#4A4A4A]/30"
                  />
                </div>

                {/* Order Details (read-only) */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[#4A4A4A] uppercase tracking-widest">Order Details</label>
                  <textarea
                    readOnly
                    value={orderDetails}
                    rows={cart.length + 1}
                    className="w-full bg-[#FAF8F3] border border-[#C9A84C]/20 rounded-2xl px-5 py-4 text-sm font-medium text-[#1A1A1A] outline-none resize-none opacity-70"
                  />
                </div>

                {/* Payment Proof Upload */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[#4A4A4A] uppercase tracking-widest">Payment Proof *</label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative w-full border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                      proofFile
                        ? "border-[#C9A84C]/60 bg-[#C9A84C]/5"
                        : "border-[#C9A84C]/20 bg-[#FAF8F3] hover:border-[#C9A84C]/50 hover:bg-[#C9A84C]/5"
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*,.pdf"
                      className="hidden"
                      onChange={handleFile}
                      required={!proofFile}
                    />
                    {proofFile ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/10 flex items-center justify-center">
                          <Check size={18} className="text-[#C9A84C]" strokeWidth={3} />
                        </div>
                        <div className="text-left">
                          <p className="text-[#1A1A1A] font-bold text-sm truncate max-w-[200px]">{proofFile.name}</p>
                          <p className="text-[#4A4A4A] opacity-50 text-[10px] uppercase font-black">File attached</p>
                        </div>
                        <button
                          type="button"
                          onClick={e => { e.stopPropagation(); setProofFile(null); }}
                          className="ml-auto w-8 h-8 flex items-center justify-center rounded-xl hover:bg-red-500/10 text-[#4A4A4A] hover:text-red-500 transition-all"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="w-12 h-12 rounded-2xl bg-[#C9A84C]/10 flex items-center justify-center mx-auto mb-3">
                          <Upload size={20} className="text-[#C9A84C]" />
                        </div>
                        <p className="text-[#1A1A1A] font-black text-sm mb-1">Click to upload payment screenshot</p>
                        <p className="text-[#4A4A4A] opacity-40 text-[11px] uppercase font-black">PDF, PNG, JPG, GIF up to 10MB</p>
                      </>
                    )}
                  </div>
                </div>

                {/* Agreement */}
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div
                    onClick={() => setForm({ ...form, agreed: !form.agreed })}
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                      form.agreed ? "bg-[#C9A84C] border-[#C9A84C]" : "border-[#C9A84C]/30 bg-[#FAF8F3] group-hover:border-[#C9A84C]/60"
                    }`}
                  >
                    {form.agreed && <Check size={12} strokeWidth={4} className="text-[#0A0A0A]" />}
                  </div>
                  <span className="text-sm text-[#4A4A4A] leading-relaxed">
                    I agree to the{" "}
                    <span className="text-[#C9A84C] font-bold">No Refund / Exchange Only</span> policy and confirm all information provided is accurate.
                  </span>
                </label>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={!form.agreed || submitting}
                  className="w-full h-16 bg-[#C9A84C] text-[#0A0A0A] rounded-2xl font-black text-[13px] uppercase tracking-widest shimmer hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-xl"
                >
                  {submitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-[#0A0A0A] border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={18} strokeWidth={2.5} />
                      Complete Purchase
                    </>
                  )}
                </button>

              </form>
            </motion.div>

            {/* Trust notice */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="space-y-4 pb-4">
              <div className="flex items-center justify-center gap-2.5 text-[#1A1A1A]/25 font-black uppercase text-[10px] tracking-[0.15em]">
                <ShieldCheck size={14} className="text-[#C9A84C] animate-pulse" />
                Your payment and personal information are secure
              </div>
              <div className="p-5 bg-red-500/5 border border-red-500/10 rounded-2xl text-center">
                <p className="text-red-500/70 font-black uppercase text-[11px] tracking-wider">All sales are final. No refunds.</p>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
