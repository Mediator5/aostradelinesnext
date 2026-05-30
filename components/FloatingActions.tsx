"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, ArrowUp } from "lucide-react";

export default function FloatingActions() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="md:hidden fixed bottom-24 right-6 z-[9000] flex flex-col gap-3"
        >
          <a
            href="tel:205-431-5374"
            className="w-12 h-12 bg-[#C9A84C] text-[#0A0A0A] rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(201,168,76,0.3)] hover:bg-[#F0C96A] transition-colors border-2 border-[#FFFFFF]"
            aria-label="Call us"
          >
            <Phone size={22} strokeWidth={2.5} className="mr-0.5" />
          </a>
          <button
            onClick={scrollToTop}
            className="w-12 h-12 bg-[#1E1E1E] text-[#FFFFFF] rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:bg-[#1A1A1A] transition-colors border-2 border-[#C9A84C]/50"
            aria-label="Scroll to top"
          >
            <ArrowUp size={24} strokeWidth={2.5} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
