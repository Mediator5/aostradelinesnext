import { ReactNode } from "react";

const SectionBadge = ({ children, icon: Icon }: { children: ReactNode, icon?: any }) => (
  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/20 text-[#C9A84C] text-[10px] font-black uppercase tracking-widest mb-5 md:mb-7">
    {Icon && <Icon size={14} className="animate-pulse" />}
    {children}
  </div>
);

export default SectionBadge;
