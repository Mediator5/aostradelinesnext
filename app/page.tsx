"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/home/Hero";
import TrustSection from "@/components/home/TrustSection";
import HowItWorks from "@/components/home/HowItWorks";
import Comparison from "@/components/home/Comparison";
import FeaturedTradelines from "@/components/home/FeaturedTradelines";
import CalculatorPreview from "@/components/home/CalculatorPreview";
import WhyTradelines from "@/components/home/WhyTradelines";
import AboutUs from "@/components/home/AboutUs";
import Reviews from "@/components/home/Reviews";
import ClientResults from "@/components/home/ClientResults";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";
import Footer from "@/components/Footer";
import { Tradeline } from "@/types";

export default function HomePage() {
  const [tradelines, setTradelines] = useState<Tradeline[]>([]);

  useEffect(() => {
    const fetchTradelines = async () => {
      try {
        const response = await fetch("/api/tradelines");
        const data = await response.json();
        if (!Array.isArray(data)) return;
        const mappedData: Tradeline[] = data
          .map((item: any) => {
            const trimmedItem: any = {};
            Object.keys(item).forEach(key => {
              trimmedItem[key.trim()] = typeof item[key] === "string" ? item[key].trim() : item[key];
            });
            return trimmedItem;
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
      }
    };
    fetchTradelines();
  }, []);

  return (
    <main>
      <Hero />
      <div className="w-full h-[1px] bg-[#C9A84C]/30" />
      <AboutUs />
      <HowItWorks />
      <FeaturedTradelines tradelines={tradelines} />
      <Comparison />
      <ClientResults />
      <Reviews />
      <TrustSection />
      <CalculatorPreview />
      <WhyTradelines />
      <CTASection />
      <FAQSection />
      <Footer />
    </main>
  );
}
