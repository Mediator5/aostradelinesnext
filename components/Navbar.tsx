"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown, Menu, X, MessageSquare, FileText, Users, Rocket,
  ArrowRight, ShoppingCart, Phone
} from "lucide-react";
import Logo from "@/components/Logo";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { cart } = useCart();
  const cartCount = cart.length;

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTradelinesDropdownOpen, setIsTradelinesDropdownOpen] = useState(false);
  const [isMobileTradelinesOpen, setIsMobileTradelinesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsTradelinesDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isHome = pathname === "/";
  const tradelinePages = ["/consultation", "/inventory", "/signup", "/partners", "/become-partner", "/about-tradelines"];
  const isTradelinePage = tradelinePages.includes(pathname);

  const navItems = [
    { name: "Calculator", href: "/calculator" },
    { name: "About Tradelines", href: "/about-tradelines" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${isScrolled || !isHome || isMobileMenuOpen ? "bg-[#000000] py-3 border-b border-[#C9A84C]/30" : "bg-[#000000] md:bg-transparent py-4 md:py-6 border-b border-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Mobile Navbar Row */}
        <div className="md:hidden flex items-center justify-between w-full h-[60px] relative z-[1001]">
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity shrink-0">
            <Logo variant="dark" className="h-[34px] max-h-[40px]" />
          </Link>
          <button
            className="flex items-center justify-center text-[#FFFFFF] w-10 h-10 bg-[#1E1E1E] rounded-xl border border-[#C9A84C]/30 hover:bg-[#1E1E1E] transition-all active:scale-95"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Desktop Navbar Layout */}
        <div className="hidden md:flex items-center justify-between w-full relative h-10 lg:h-12">
          <div className="flex items-center shrink-0 relative z-[1001]">
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity h-full">
              <Logo variant="dark" className="h-12 lg:h-14 w-auto" />
            </Link>
          </div>

          <div className="flex items-center justify-center flex-1 gap-8 lg:gap-12 absolute inset-0 pointer-events-none">
            <div className="flex items-center gap-8 lg:gap-12 pointer-events-auto">
              <Link
                href="/"
                className={`text-[13px] font-black uppercase tracking-[0.05em] transition-all duration-300 relative group ${isHome ? "text-[#C9A84C]" : "text-[#FFFFFF] hover:text-[#C9A84C]"}`}
              >
                Home
                <span className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#C9A84C] rounded-full transition-all duration-300 ${isHome ? "w-6" : "group-hover:w-3"}`} />
              </Link>

              {/* TRADELINES Dropdown */}
              <div ref={dropdownRef} className="relative group">
                <button
                  onClick={() => setIsTradelinesDropdownOpen(!isTradelinesDropdownOpen)}
                  className={`text-[13px] font-black uppercase tracking-[0.1em] transition-all duration-300 flex items-center gap-2 ${isTradelinePage ? "text-[#C9A84C]" : "text-[#FFFFFF] hover:text-[#C9A84C]"}`}
                >
                  TRADELINES
                  <ChevronDown size={14} className={`transition-transform duration-500 ${isTradelinesDropdownOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {isTradelinesDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.98 }}
                      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                      className="absolute top-full left-0 mt-6 w-[340px] bg-[#0A0A0A]/95 backdrop-blur-3xl border border-[#C9A84C]/30 rounded-[2.5rem] shadow-[0_30px_80px_rgba(13,31,45,0.08)] overflow-hidden ring-1 ring-white/5"
                    >
                      <div className="flex flex-col p-4">
                        <div className="mb-2 pb-4 border-b border-[#C9A84C]/30">
                          <Link
                            href="/inventory"
                            onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); setIsTradelinesDropdownOpen(false); }}
                            className={`w-full p-5 rounded-2xl text-[14px] font-black uppercase tracking-wider flex items-center justify-between group/btn ${pathname === "/inventory" ? "bg-[#C9A84C] text-[#0A0A0A]" : "bg-[#C9A84C]/10 text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0A0A0A]"} transition-all duration-500 shimmer`}
                          >
                            Get Your Tradeline Now
                            <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                        {[
                          { href: "/consultation", name: "Tradeline Consultation", icon: MessageSquare, desc: "Expert strategy for your credit" },
                          { href: "/signup", name: "Tradeline Sign Up Form", icon: FileText, desc: "Quick and secure enrollment" },
                          { href: "/partners", name: "AOS Affiliates", icon: Users, desc: "Access our exclusive network" },
                          { href: "/become-partner", name: "Become AOS Tradeline affiliate", icon: Rocket, desc: "Grow your business with AOS" }
                        ].map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); setIsTradelinesDropdownOpen(false); }}
                            className={`flex items-center gap-5 p-4 rounded-[1.5rem] transition-all duration-300 group/item ${pathname === item.href ? "bg-[#1E1E1E] text-[#C9A84C]" : "text-[#A8A8A8] hover:bg-[#1E1E1E] hover:text-[#FFFFFF]"}`}
                          >
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500 ${pathname === item.href ? "bg-[#C9A84C] text-[#0A0A0A]" : "bg-[#1E1E1E] text-[#A8A8A8] opacity-60 group-hover/item:bg-[#C9A84C]/20 group-hover/item:text-[#C9A84C]"}`}>
                              <item.icon size={22} />
                            </div>
                            <div className="text-left">
                              <div className="text-[15px] font-bold leading-none mb-1.5 text-[#FFFFFF]">{item.name}</div>
                              <div className="text-[11px] text-[#FFFFFF] font-black leading-tight group-hover/item:opacity-80 transition-opacity">{item.desc}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[13px] font-black uppercase tracking-[0.05em] transition-all duration-300 relative group ${pathname === item.href ? "text-[#C9A84C]" : "text-[#FFFFFF] hover:text-[#C9A84C]"}`}
                >
                  {item.name}
                  <span className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#C9A84C] rounded-full transition-all duration-300 ${pathname === item.href ? "w-6" : "group-hover:w-3"}`} />
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Right CTAs */}
          <div className="hidden md:flex items-center gap-6 shrink-0 relative z-[1001]">
            {cartCount > 0 && (
              <Link
                href="/checkout"
                className="relative p-2.5 transition-all text-[#FFFFFF] hover:text-[#C9A84C] bg-[#1E1E1E] rounded-full border border-[#C9A84C]/30"
              >
                <ShoppingCart size={20} />
                <span className="absolute -top-1 -right-1 bg-[#C9A84C] text-[#0A0A0A] text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              </Link>
            )}
            <a
              href="tel:+18001234567"
              className="bg-[#C9A84C] text-[#0A0A0A] px-8 py-3 rounded-full text-[13px] font-black uppercase hover:bg-[#C9A84C]-hover hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center gap-2 group shimmer"
            >
              <Phone size={14} className="group-hover:rotate-12 transition-transform" />
              (800) 123-4567
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-0 z-[60] bg-[#000000] backdrop-blur-2xl flex flex-col h-screen"
          >
            <div className="flex flex-col h-full overflow-y-auto">
              <div className="flex flex-col pt-24">
                <Link
                  href="/"
                  onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); setIsMobileMenuOpen(false); }}
                  className={`flex items-center justify-between h-16 px-8 transition-all relative group ${isHome ? "text-[#C9A84C]" : "text-[#FFFFFF] hover:text-[#C9A84C]"}`}
                >
                  <span className="text-[16px] font-black uppercase tracking-[0.05em]">Home</span>
                  <span className={`absolute bottom-4 left-8 w-0 h-0.5 bg-[#C9A84C] rounded-full transition-all duration-300 ${isHome ? "w-6" : ""}`} />
                </Link>

                {/* Mobile Tradeline Services Accordion */}
                <div className="flex flex-col border-b border-[#C9A84C]/30">
                  <button
                    onClick={() => setIsMobileTradelinesOpen(!isMobileTradelinesOpen)}
                    className={`flex items-center justify-between h-16 px-8 transition-all relative ${isTradelinePage ? "text-[#C9A84C]" : "text-[#A8A8A8]"}`}
                  >
                    <span className="text-[16px] font-black uppercase tracking-[0.1em]">TRADELINES</span>
                    <div className="flex items-center gap-3">
                      <span className={`w-0 h-0.5 bg-[#C9A84C] rounded-full transition-all duration-300 ${isTradelinePage ? "w-6" : ""}`} />
                      <ChevronDown size={20} className={`transition-transform duration-300 ${isMobileTradelinesOpen ? "rotate-180" : ""}`} />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isMobileTradelinesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-[#141414]/[0.02]"
                      >
                        <div className="flex flex-col py-2">
                          {[
                            { href: "/consultation", name: "Tradeline Consultation", icon: MessageSquare, desc: "Expert strategy for your credit" },
                            { href: "/signup", name: "Tradeline Sign Up Form", icon: FileText, desc: "Quick and secure enrollment" },
                            { href: "/partners", name: "AOS Affiliates", icon: Users, desc: "Access our exclusive network" },
                            { href: "/become-partner", name: "Become AOS Tradeline affiliate", icon: Rocket, desc: "Grow your business with AOS" }
                          ].map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => { setIsMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                              className={`flex items-start gap-4 py-4 px-10 transition-all ${pathname === item.href ? "bg-[#1E1E1E] text-[#C9A84C]" : "text-[#FFFFFF] hover:text-[#C9A84C]"}`}
                            >
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${pathname === item.href ? "bg-[#C9A84C]/20 text-[#C9A84C]" : "bg-[#1E1E1E] text-[#A8A8A8]/50"}`}>
                                <item.icon size={18} />
                              </div>
                              <div className="text-left">
                                <div className="text-[15px] font-black uppercase tracking-wider mb-1 leading-none text-[#FFFFFF]">{item.name}</div>
                                <div className="text-[11px] text-[#FFFFFF] font-black leading-tight">{item.desc}</div>
                              </div>
                            </Link>
                          ))}
                          <Link
                            href="/inventory"
                            onClick={() => { setIsMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                            className="flex items-center justify-between h-14 px-10 mx-6 my-2 rounded-2xl text-[16px] font-black uppercase tracking-wider bg-[#C9A84C] text-[#0A0A0A] shimmer"
                          >
                            Get Your Tradeline Now
                            <ArrowRight size={18} />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => { setIsMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className={`flex items-center justify-between h-16 px-8 transition-all relative group ${pathname === item.href ? "text-[#C9A84C]" : "text-[#FFFFFF] hover:text-[#C9A84C]"}`}
                  >
                    <span className="text-[14px] font-black uppercase tracking-[0.05em]">{item.name}</span>
                    <span className={`absolute bottom-4 left-8 w-0 h-0.5 bg-[#C9A84C] rounded-full transition-all duration-300 ${pathname === item.href ? "w-6" : ""}`} />
                  </Link>
                ))}
              </div>

              {/* Mobile CTA */}
              <div className="mt-auto p-6">
                <a
                  href="tel:+18001234567"
                  className="w-full bg-[#C9A84C] text-[#0A0A0A] h-14 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
                >
                  <Phone size={18} />
                  (800) 123-4567
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
