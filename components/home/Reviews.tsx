"use client";

import { motion } from "framer-motion";
import { Star, TrendingUp } from "lucide-react";
import SectionBadge from "@/components/SectionBadge";

export default function Reviews() {
  const reviews = [
    {
      name: "Jessica & David",
      rating: 5,
      text: "The couples package was exactly what we needed for our first mortgage. Our joint score improved by over 100 points in 35 days.",
      date: "2 days ago",
      avatar: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=150&h=150&fit=crop",
      points: "+105 Points",
      before: 560,
      after: 665
    },
    {
      name: "Michael R.",
      rating: 5,
      text: "Audited results that actually post. I reached a 695 and finally got my AMEX Gold approval. Professional from start to finish.",
      date: "3 days ago",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      points: "+75 Points",
      before: 620,
      after: 695
    },
    {
      name: "Sarah J.",
      rating: 5,
      text: "The reporting was lightning fast. I've used other services before, but AOS is on another level of efficiency and trust.",
      date: "1 week ago",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      points: "+112 Points",
      before: 580,
      after: 692
    },
    {
      name: "Robert K.",
      rating: 5,
      text: "Absolute game changer for my business credit profile. My utilization dropped from 85% to 12% in one statement cycle.",
      date: "5 days ago",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
      points: "+94 Points",
      before: 605,
      after: 699
    },
    {
      name: "Jennifer L.",
      rating: 5,
      text: "The concierge support guided me through exactly which tradelines I needed. No upselling, just pure strategy and results.",
      date: "2 weeks ago",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
      points: "+88 Points",
      before: 615,
      after: 703
    },
  ];

  const allReviews = [...reviews, ...reviews, ...reviews];

  return (
    <section className="py-20 md:py-32 bg-[#FAF8F3] overflow-hidden" id="reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 md:mb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SectionBadge icon={Star}>The Elite Network</SectionBadge>
          <h2 className="text-[#1A1A1A] text-3xl lg:text-7xl font-display font-black mb-4 md:mb-6 leading-tight uppercase px-2">Success From <span className="luxury-text-gradient italic">Our Clients</span></h2>
          <p className="text-[#4A4A4A] opacity-60 text-sm md:text-xl font-medium px-4">Verified 4.9/5 Rating based on 500+ Luxury Financial Experiences</p>
        </motion.div>
      </div>

      <div className="relative flex overflow-x-hidden touch-pan-y">
        <motion.div
          animate={{ x: [0, -1400] }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="flex gap-6 md:gap-10 whitespace-nowrap py-10"
        >
          {allReviews.map((review, idx) => (
            <div key={idx} className="w-[300px] md:w-[450px] premium-card !bg-[#FFFFFF] p-6 md:p-10 rounded-[2.5rem] md:rounded-[3rem] shrink-0 relative flex flex-col gap-6 md:gap-8 group hover:-translate-y-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl object-cover border-2 border-[#C9A84C]/20 shadow-xl"
                    />
                    <div className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 bg-[#FAF8F3] rounded-full p-1 border border-[#C9A84C]/20 shadow-lg">
                      <Star size={10} className="text-[#C9A84C]" fill="currentColor" />
                    </div>
                  </div>
                  <div>
                    <div className="flex gap-1 text-[#C9A84C] mb-1 md:mb-1.5">
                      {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                    </div>
                    <div className="font-display font-black text-[#1A1A1A] text-lg md:text-xl leading-tight">{review.name}</div>
                  </div>
                </div>
                <div className="bg-[#C9A84C] text-[#0A0A0A] px-4 py-2 rounded-full text-[11px] font-black italic flex items-center gap-2 shadow-lg">
                  <TrendingUp size={14} />
                  {review.points}
                </div>
              </div>

              <p className="text-[#4A4A4A] text-lg leading-relaxed whitespace-normal font-medium">
                &ldquo;{review.text}&rdquo;
              </p>

              <div className="mt-auto pt-8 border-t border-[#C9A84C]/20">
                <div className="flex justify-between items-end mb-6">
                  <div className="text-left">
                    <div className="text-[9px] font-black text-[#4A4A4A] uppercase mb-1 md:mb-2">Initial</div>
                    <div className="text-2xl md:text-3xl font-display font-black text-[#4A4A4A]/60 italic">{review.before}</div>
                  </div>
                  <div className="flex-1 px-4 md:px-8 pb-2 md:pb-3">
                    <div className="h-1.5 w-full bg-[#FFFFFF] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="h-full bg-[#C9A84C] rounded-full"
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[9px] font-black text-[#C9A84C] uppercase mb-1 md:mb-2">Final</div>
                    <div className="text-2xl md:text-3xl font-display font-black text-[#C9A84C] italic">{review.after}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
