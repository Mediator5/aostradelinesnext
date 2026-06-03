"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Filter, ArrowUpDown, ShieldCheck, ShoppingCart, Check, X, ChevronRight
} from "lucide-react";
import SectionBadge from "@/components/SectionBadge";
import TradelineCard from "@/components/TradelineCard";
import CheckoutModal from "@/components/CheckoutModal";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { Tradeline } from "@/types";

export default function InventoryPage() {
  const { cart, addToCart, removeFromCart, isCheckoutOpen, setIsCheckoutOpen } = useCart();

  const [tradelines, setTradelines] = useState<Tradeline[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState({
    bank: "", minLimit: 0, maxPrice: 50000, minAge: 0, purchaseDeadline: "", reportingDate: ""
  });
  const [sortConfig, setSortConfig] = useState<{ key: keyof Tradeline; direction: "asc" | "desc" } | null>(null);
  const [currentPageInventory, setCurrentPageInventory] = useState(1);
  const itemsPerPage = 50;

  useEffect(() => {
    const fetchTradelines = async () => {
      try {
        const response = await fetch("/api/tradelines");
        const data = await response.json();
        if (!Array.isArray(data)) { setTradelines([]); return; }
        const mappedData: Tradeline[] = data
          .map((item: any) => {
            const t: any = {};
            Object.keys(item).forEach(k => { t[k.trim()] = typeof item[k] === "string" ? item[k].trim() : item[k]; });
            return t;
          })
          .filter((item: any) => item.Status === "Active" || item.Status === "Sold Out")
          .map((item: any, index: number) => ({
            id: item.ID || index + 1,
            bank: item["Bank Name"] || "Unknown Bank",
            bankSubtext: item["Bank Subtext"] || "",
            cardType: item["Card Type"] || "Seasoned Account",
            limit: Number(String(item["Credit Limit"]).replace(/[^0-9.-]+/g, "")) || 0,
            age: Number(item["Age (Years)"]) || 0,
            purchaseDeadline: item["Purchase Deadline"] || "N/A",
            reportingDate: item["Reporting Date"] || item["Statement Date"] || "N/A",
            price: Number(String(item["Price"]).replace(/[^0-9.-]+/g, "")) || 0,
            spotsAvailable: Number(item["Spots Available"]) || 0,
            status: item["Status"] || "Active",
          }));
        setTradelines(mappedData);
      } catch (error) {
        console.error("Error fetching tradelines:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTradelines();
  }, []);

  useEffect(() => { setCurrentPageInventory(1); }, [filters, searchQuery, sortConfig]);

  const handleSort = (key: keyof Tradeline) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  const filteredTradelines = tradelines
    .filter(t => {
      const matchesSearch = t.bank.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesBank = !filters.bank || t.bank === filters.bank;
      const matchesLimit = t.limit >= filters.minLimit;
      const matchesPrice = t.price <= filters.maxPrice;
      const matchesAge = t.age >= filters.minAge;
      const matchesDeadline = !filters.purchaseDeadline || t.purchaseDeadline === filters.purchaseDeadline;
      const matchesReporting = !filters.reportingDate || t.reportingDate === filters.reportingDate;
      return matchesSearch && matchesBank && matchesLimit && matchesPrice && matchesAge && matchesDeadline && matchesReporting;
    })
    .sort((a, b) => {
      if (!sortConfig) return 0;
      const { key, direction } = sortConfig;
      const aVal = a[key] ?? "";
      const bVal = b[key] ?? "";
      if (aVal < bVal) return direction === "asc" ? -1 : 1;
      if (aVal > bVal) return direction === "asc" ? 1 : -1;
      return 0;
    });

  const totalPages = Math.ceil(filteredTradelines.length / itemsPerPage);
  const paginatedTradelines = filteredTradelines.slice(
    (currentPageInventory - 1) * itemsPerPage,
    currentPageInventory * itemsPerPage
  );

  const banks = Array.from(new Set(tradelines.map(t => t.bank))).filter(Boolean);
  const purchaseDeadlines = Array.from(new Set(tradelines.map(t => t.purchaseDeadline))).filter(Boolean);
  const reportingDates = Array.from(new Set(tradelines.map(t => t.reportingDate))).filter(Boolean);

  return (
    <>
      <div className="pt-32 pb-24 md:pb-44 bg-[#FAF8F3] min-h-screen relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#FFFFFF] rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 -z-0" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#FFFFFF] rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 -z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="mb-5 md:mb-5 flex flex-col items-center text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
              <SectionBadge icon={Search}>Verified Assets</SectionBadge>
              <h1 className="text-3xl md:text-7xl lg:text-8xl text-[#1A1A1A] mb-4 md:mb-6 font-display font-black leading-[1.05] uppercase">Elite <span className="luxury-text-gradient italic">Selection</span></h1>
              <p className="hidden md:block text-xl text-[#4A4A4A] opacity-60 leading-relaxed font-medium max-w-3xl mx-auto">
                Unlock premier financial potential with our curated selection of high-limit, aged tradelines. Audited for immediate excellence.
              </p>
            </motion.div>
          </div>
          <div className="mb-5 md:mb-5 flex flex-col items-center text-center">
            <h3 className="text-2xl md:text-3xl lg:text-5xl text-[#1A1A1A] mb-0 md:mb-0 font-display font-black leading-[1.05] uppercase">Step 1</h3>
          </div>
          

          {/* Filters */}
          <div className="mb-10 premium-card !bg-[#FFFFFF] p-4 sm:p-8 rounded-[2rem] md:rounded-[2.5rem] border-[#C9A84C]/20 shadow-xl relative z-20 overflow-hidden">
            <div className="hidden md:flex items-center gap-2.5 mb-5">
              <Filter size={16} className="text-[#C9A84C]" />
              <h3 className="text-[#1A1A1A] font-black uppercase tracking-widest text-[11px]">Filter Options</h3>
              <button
                onClick={() => { setFilters({ bank: "", minLimit: 0, maxPrice: 50000, minAge: 0, purchaseDeadline: "", reportingDate: "" }); setSearchQuery(""); }}
                className="ml-auto text-[#4A4A4A]/50 hover:text-[#1A1A1A]/70 text-[10px] uppercase font-black transition-colors tracking-widest"
              >
                Clear All
              </button>
            </div>

            {/* Mobile Control Bar */}
            <div className="md:hidden flex flex-col gap-4">
              <div className="relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C9A84C]" />
                <input
                  type="text"
                  placeholder="Search bank or institution..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#FFFFFF] border border-[#C9A84C]/20 rounded-2xl py-4 pl-14 pr-4 text-sm font-bold text-[#1A1A1A] outline-none focus:border-[#C9A84C] transition-all"
                />
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl border transition-all text-[11px] font-black uppercase tracking-wider ${showMobileFilters ? "bg-[#FFFFFF] text-[#1A1A1A] border-[#FFFFFF]" : "bg-[#FFFFFF] text-[#4A4A4A] border-[#C9A84C]/20"}`}
                >
                  <Filter size={14} />
                  {showMobileFilters ? "Close Filters" : "Refine Search"}
                  {Object.values(filters).filter(v => v !== "" && v !== 0 && v !== 50000).length > 0 && (
                    <span className="w-5 h-5 bg-[#C9A84C] text-[#0A0A0A] rounded-full flex items-center justify-center text-[9px]">{Object.values(filters).filter(v => v !== "" && v !== 0 && v !== 50000).length}</span>
                  )}
                </button>
                <button
                  onClick={() => { setFilters({ bank: "", minLimit: 0, maxPrice: 50000, minAge: 0, purchaseDeadline: "", reportingDate: "" }); setSearchQuery(""); }}
                  className="w-12 h-12 flex items-center justify-center bg-[#FFFFFF] text-[#4A4A4A]/50 rounded-2xl border border-[#C9A84C]/20"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <AnimatePresence>
              {(showMobileFilters || true) && (
                <motion.div
                  initial={false}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className={`grid grid-cols-1 md:grid-cols-5 gap-3 md:gap-5 ${showMobileFilters ? "mt-6 flex flex-col md:grid" : "hidden md:grid"} overflow-hidden`}
                >
                  <div className="space-y-1.5">
                    <span className="md:hidden text-[9px] font-black text-[#4A4A4A] opacity-40 uppercase ml-1">Bank</span>
                    <select value={filters.bank} onChange={e => setFilters({ ...filters, bank: e.target.value })} className="w-full bg-[#FAF8F3]/40 border border-[#C9A84C]/20 text-[#1A1A1A] text-xs font-bold uppercase rounded-2xl px-5 py-4 outline-none focus:border-[#C9A84C] appearance-none cursor-pointer">
                      <option value="">All Banks</option>
                      {banks.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <span className="md:hidden text-[9px] font-black text-[#4A4A4A] opacity-40 uppercase ml-1">Minimum Age</span>
                    <select value={filters.minAge} onChange={e => setFilters({ ...filters, minAge: Number(e.target.value) })} className="w-full bg-[#FAF8F3]/40 border border-[#C9A84C]/20 text-[#1A1A1A] text-xs font-bold uppercase rounded-2xl px-5 py-4 outline-none focus:border-[#C9A84C] appearance-none cursor-pointer">
                      <option value="0">Any Age</option>
                      <option value="1">1+ Years</option>
                      <option value="3">3+ Years</option>
                      <option value="5">5+ Years</option>
                      <option value="10">10+ Years</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <span className="md:hidden text-[9px] font-black text-[#4A4A4A] opacity-40 uppercase ml-1">Minimum Limit</span>
                    <select value={filters.minLimit} onChange={e => setFilters({ ...filters, minLimit: Number(e.target.value) })} className="w-full bg-[#FAF8F3]/40 border border-[#C9A84C]/20 text-[#1A1A1A] text-xs font-bold uppercase rounded-2xl px-5 py-4 outline-none focus:border-[#C9A84C] appearance-none cursor-pointer">
                      <option value="0">Any Limit</option>
                      <option value="5000">$5,000+</option>
                      <option value="10000">$10,000+</option>
                      <option value="20000">$20,000+</option>
                      <option value="30000">$30,000+</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <span className="md:hidden text-[9px] font-black text-[#4A4A4A] opacity-40 uppercase ml-1">Deadline</span>
                    <select value={filters.purchaseDeadline} onChange={e => setFilters({ ...filters, purchaseDeadline: e.target.value })} className="w-full bg-[#FAF8F3]/40 border border-[#C9A84C]/20 text-[#1A1A1A] text-xs font-bold uppercase rounded-2xl px-5 py-4 outline-none focus:border-[#C9A84C] appearance-none cursor-pointer">
                      <option value="">Any Deadline</option>
                      {purchaseDeadlines.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <span className="md:hidden text-[9px] font-black text-[#4A4A4A] opacity-40 uppercase ml-1">Reporting Window</span>
                    <select value={filters.reportingDate} onChange={e => setFilters({ ...filters, reportingDate: e.target.value })} className="w-full bg-[#FAF8F3]/40 border border-[#C9A84C]/20 text-[#1A1A1A] text-xs font-bold uppercase rounded-2xl px-5 py-4 outline-none focus:border-[#C9A84C] appearance-none cursor-pointer">
                      <option value="">Any Report Date</option>
                      {reportingDates.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Table & Cards */}
          <div className="space-y-6">
            {/* Card View for Mobile */}
            <div className="md:hidden">
              {isLoading ? (
                <div className="py-32 text-center premium-card !bg-[#FFFFFF] border-[#C9A84C]/20">
                  <div className="flex flex-col items-center gap-6">
                    <div className="w-16 h-16 border-4 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
                    <p className="text-[#4A4A4A] opacity-60 font-black uppercase">Authenticating Assets...</p>
                  </div>
                </div>
              ) : paginatedTradelines.length > 0 ? (
                paginatedTradelines.map((t) => (
                  <TradelineCard
                    key={t.id}
                    tradeline={t}
                    isInCart={!!cart.find(item => item.id === t.id)}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                  />
                ))
              ) : (
                <div className="py-32 text-center text-[#4A4A4A] opacity-40 premium-card !bg-[#FFFFFF] border-[#C9A84C]/20 uppercase font-black">
                  No assets found matching your criteria.
                </div>
              )}
            </div>

            {/* Table View for Desktop */}
            <div className="hidden md:block premium-card !bg-[#FFFFFF] rounded-[3.5rem] overflow-hidden border-[#C9A84C]/20 shadow-[0_30px_80px_rgba(13,31,45,0.08)] ring-1 ring-[#C9A84C]/10 relative">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#FFFFFF] rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FFFFFF] rounded-full blur-[80px] pointer-events-none" />
              <div className="overflow-x-auto min-h-[400px] relative z-10">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#1A1A1A] border-b border-[#C9A84C]">
                      {[
                        { label: "Asset Institution", key: "bank" },
                        { label: "Credit Limit", key: "limit" },
                        { label: "Archival Age", key: "age" },
                        { label: "Reporting Window", key: "reportingDate" },
                        { label: "Price", key: "price" }
                      ].map((col) => (
                        <th
                          key={col.key}
                          onClick={() => handleSort(col.key as keyof Tradeline)}
                          className="px-6 py-8 text-[11px] font-black text-[#C9A84C] uppercase cursor-pointer transition-colors group"
                        >
                          <div className="flex items-center gap-2">
                            {col.label}
                            <ArrowUpDown size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#C9A84C]" />
                          </div>
                        </th>
                      ))}
                      <th className="px-8 py-10"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {isLoading ? (
                      <tr>
                        <td colSpan={6} className="px-10 py-32 text-center">
                          <div className="flex flex-col items-center gap-6">
                            <div className="w-20 h-20 border-4 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
                            <p className="text-[#4A4A4A] opacity-60 font-black uppercase">Authenticating Assets...</p>
                          </div>
                        </td>
                      </tr>
                    ) : paginatedTradelines.length > 0 ? (
                      paginatedTradelines.map((t) => {
                        const isInCart = cart.find(item => item.id === t.id);
                        const isSoldOut = t.spotsAvailable === 0;
                        return (
                          <motion.tr layout key={t.id} className="hover:bg-[#FFFFFF]/[0.04] transition-all duration-300 group border-l-2 border-transparent hover:border-[#C9A84C]">
                            <td className="px-6 py-8">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-[#FFFFFF] border border-[#C9A84C]/20 flex items-center justify-center text-[#C9A84C] group-hover:bg-[#C9A84C] group-hover:text-[#0A0A0A] transition-all">
                                  <ShieldCheck size={16} />
                                </div>
                                <div>
                                  <div className="font-bold text-[#1A1A1A] text-lg leading-tight">{t.bank}</div>
                                  <div className="text-[10px] text-[#C9A84C] uppercase font-black italic mt-1 opacity-60 group-hover:opacity-100 transition-opacity">Premium Asset</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-8 font-display font-black text-2xl text-[#1A1A1A] italic group-hover:text-[#C9A84C] transition-colors">${t.limit.toLocaleString()}</td>
                            <td className="px-6 py-8 text-[#4A4A4A] font-medium text-lg">{t.age} Years</td>
                            <td className="px-6 py-8 text-[#4A4A4A] opacity-60 font-medium">{t.reportingDate}</td>
                            <td className="px-6 py-8 font-display font-black text-[#1A1A1A] text-2xl group-hover:text-[#C9A84C] transition-all duration-300">
                              <div className="inline-flex items-center gap-2">
                                ${t.price}
                                <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                            </td>
                            <td className="px-6 py-6 text-right">
                              <button
                                onClick={() => isInCart ? removeFromCart(t.id) : addToCart(t)}
                                disabled={isSoldOut && !isInCart}
                                className={`w-52 h-14 rounded-2xl text-[11px] font-black uppercase transition-all flex items-center justify-center gap-3 ml-auto shadow-lg relative overflow-hidden group/btn ${isInCart
                                  ? "bg-[#FFFFFF] text-[#1A1A1A] border border-white/20 hover:bg-red-500/20 hover:border-red-500/40"
                                  : isSoldOut
                                    ? "bg-[#FFFFFF] text-[#4A4A4A] opacity-30 cursor-not-allowed border border-[#C9A84C]/20"
                                    : "bg-[#FFFFFF] text-[#1A1A1A] border border-[#C9A84C]/20 hover:bg-[#C9A84C] hover:text-[#0A0A0A] hover:border-[#C9A84C] shimmer"
                                  }`}
                              >
                                {isInCart ? (
                                  <><Check size={16} strokeWidth={4} />REMOVE</>
                                ) : isSoldOut ? (
                                  <><ShoppingCart size={16} strokeWidth={4} className="opacity-0" />Sold Out</>
                                ) : (
                                  <><ShoppingCart size={16} strokeWidth={4} className="group-hover/btn:translate-x-1 transition-transform" />Purchase now</>
                                )}
                              </button>
                            </td>
                          </motion.tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={7} className="px-10 py-32 text-center text-[#4A4A4A] opacity-40 font-black uppercase">
                          No assets matching your elite criteria found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 pb-4">
                <div className="text-[11px] font-black text-[#4A4A4A] opacity-50 uppercase tracking-widest order-2 sm:order-1">
                  Showing {(currentPageInventory - 1) * itemsPerPage + 1} to {Math.min(currentPageInventory * itemsPerPage, filteredTradelines.length)} of {filteredTradelines.length} Assets
                </div>
                <div className="flex items-center gap-2 order-1 sm:order-2">
                  <button
                    onClick={() => { setCurrentPageInventory(prev => Math.max(prev - 1, 1)); window.scrollTo({ top: 400, behavior: "smooth" }); }}
                    disabled={currentPageInventory === 1}
                    className="w-12 h-12 flex items-center justify-center bg-[#FFFFFF] border border-[#C9A84C]/20 rounded-2xl text-[#1A1A1A] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#C9A84C] transition-all"
                  >
                    <ChevronRight size={20} className="rotate-180" />
                  </button>
                  <div className="flex items-center gap-1.5 px-4">
                    {[...Array(totalPages)].map((_, i) => {
                      const pageNum = i + 1;
                      if (pageNum === 1 || pageNum === totalPages || (pageNum >= currentPageInventory - 1 && pageNum <= currentPageInventory + 1)) {
                        return (
                          <button
                            key={pageNum}
                            onClick={() => { setCurrentPageInventory(pageNum); window.scrollTo({ top: 400, behavior: "smooth" }); }}
                            className={`w-10 h-10 rounded-xl text-xs font-black transition-all ${currentPageInventory === pageNum ? "bg-[#C9A84C] text-[#0A0A0A] shadow-lg" : "bg-[#FFFFFF] text-[#4A4A4A] border border-[#C9A84C]/20 hover:border-[#C9A84C]"}`}
                          >
                            {pageNum}
                          </button>
                        );
                      } else if (pageNum === currentPageInventory - 2 || pageNum === currentPageInventory + 2) {
                        return <span key={pageNum} className="text-[#4A4A4A] opacity-30 px-1">...</span>;
                      }
                      return null;
                    })}
                  </div>
                  <button
                    onClick={() => { setCurrentPageInventory(prev => Math.min(prev + 1, totalPages)); window.scrollTo({ top: 400, behavior: "smooth" }); }}
                    disabled={currentPageInventory === totalPages}
                    className="w-12 h-12 flex items-center justify-center bg-[#FFFFFF] border border-[#C9A84C]/20 rounded-2xl text-[#1A1A1A] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#C9A84C] transition-all"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <CheckoutModal />
      <Footer />
    </>
  );
}
