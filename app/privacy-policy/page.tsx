"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import SectionBadge from "@/components/SectionBadge";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <>
      <div className="pt-32 pb-24 md:pb-44 bg-[#FAF8F3] min-h-screen relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#FFFFFF] rounded-full blur-[120px] -z-0" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
            <SectionBadge icon={ShieldCheck}>Legal</SectionBadge>
            <h1 className="text-3xl md:text-6xl font-display font-black text-[#1A1A1A] mb-4 md:mb-6 uppercase leading-tight">
              Privacy <span className="luxury-text-gradient">Policy</span>
            </h1>
            <div className="w-24 h-1.5 bg-[#C9A84C] rounded-full mb-12" />
            <div className="premium-card !bg-[#FFFFFF] p-6 md:p-12 rounded-2xl md:rounded-[2.5rem] border-[#C9A84C]/20 space-y-6 md:space-y-8 text-[#4A4A4A] leading-relaxed font-medium text-sm md:text-base">
              <p>AOS Impact (&quot;Company,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to safeguarding your personal information. By using our services, you agree to the collection and use of your information as outlined below.</p>
              <h3 className="text-[#1A1A1A] text-xl font-bold uppercase">Information We Collect</h3>
              <p>To provide tradeline services, we may collect:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Full legal name</li>
                <li>Date of birth</li>
                <li>Social Security Number (SSN) or ITIN</li>
                <li>Current and previous addresses</li>
                <li>Phone number and email address</li>
                <li>Government-issued identification</li>
              </ul>
              <h3 className="text-[#1A1A1A] text-xl font-bold uppercase">Use of Information</h3>
              <p>Your information is used strictly for operational purposes, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Adding you as an authorized user to tradeline accounts</li>
                <li>Identity verification</li>
                <li>Communication regarding your order or account</li>
                <li>Processing payments</li>
                <li>Compliance with applicable laws and regulations</li>
              </ul>
              <h3 className="text-[#1A1A1A] text-xl font-bold uppercase">Information Sharing &amp; Authorization</h3>
              <p>By submitting your information, you expressly authorize AOS Impact to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Share your information with internal team members, contractors, and affiliated partners for the purpose of tradeline placement</li>
                <li>Provide required information to credit account holders, financial institutions, and third-party partners to facilitate your addition as an authorized user</li>
              </ul>
              <p>We do not sell your personal information to third parties.</p>
              <h3 className="text-[#1A1A1A] text-xl font-bold uppercase">Data Security</h3>
              <p>We implement commercially reasonable safeguards to protect your information. However, no electronic transmission or storage system can be guaranteed to be completely secure.</p>
              <h3 className="text-[#1A1A1A] text-xl font-bold uppercase">Data Retention</h3>
              <p>We retain personal information only as long as necessary to fulfill service obligations and comply with legal requirements.</p>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}
