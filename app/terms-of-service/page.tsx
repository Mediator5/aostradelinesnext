"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import SectionBadge from "@/components/SectionBadge";
import Footer from "@/components/Footer";

export default function TermsOfServicePage() {
  return (
    <>
      <div className="pt-32 pb-24 md:pb-44 bg-[#FAF8F3] min-h-screen relative overflow-hidden">
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-[#FFFFFF] rounded-full blur-[120px] -z-0" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
            <SectionBadge icon={Lock}>Legal</SectionBadge>
            <h1 className="text-3xl md:text-6xl font-display font-black text-[#1A1A1A] mb-4 md:mb-6 uppercase leading-tight">
              Terms of <span className="luxury-text-gradient">Service</span>
            </h1>
            <div className="w-24 h-1.5 bg-[#C9A84C] rounded-full mb-12" />
            <div className="premium-card !bg-[#FFFFFF] p-6 md:p-12 rounded-2xl md:rounded-[2.5rem] border-[#C9A84C]/20 space-y-6 md:space-y-8 text-[#4A4A4A] leading-relaxed font-medium text-sm md:text-base">
              <p>By purchasing or using AOS Impact services, you agree to the following terms:</p>
              <h3 className="text-[#1A1A1A] text-xl font-bold uppercase">Tradeline Service Agreement</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>You authorize AOS Impact to add you as an authorized user to one or more tradeline accounts.</li>
                <li>Tradelines are provided for a specified duration but may be removed earlier due to actions by the primary account holder or financial institution.</li>
                <li>We do not control credit bureau reporting timelines or outcomes.</li>
              </ul>
              <h3 className="text-[#1A1A1A] text-xl font-bold uppercase">No Guarantee of Results</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Credit score changes are not guaranteed.</li>
                <li>Reporting times vary and are dependent on the policies of the issuing bank and credit bureaus.</li>
              </ul>
              <h3 className="text-[#1A1A1A] text-xl font-bold uppercase">No Refund Policy / Replacement Guarantee</h3>
              <p>All sales are final. We maintain a strict no refund policy.</p>
              <p>If a tradeline fails to post, is removed prematurely, or does not meet the agreed-upon value, AOS Impact will make reasonable efforts to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Replace the tradeline with another of equal value, or</li>
                <li>Reassign you to a comparable tradeline service</li>
              </ul>
              <p>This replacement policy constitutes the sole remedy available to clients.</p>
              <h3 className="text-[#1A1A1A] text-xl font-bold uppercase">Client Responsibilities</h3>
              <p>You agree that:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>All information provided is accurate and truthful</li>
                <li>You are at least 18 years old</li>
                <li>You understand the nature and risks of tradeline services</li>
              </ul>
              <h3 className="text-[#1A1A1A] text-xl font-bold uppercase">Limitation of Liability</h3>
              <p>AOS Impact shall not be held liable for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Credit score changes or lack thereof</li>
                <li>Actions taken by credit bureaus or lenders</li>
                <li>Indirect, incidental, or consequential damages</li>
              </ul>
              <h3 className="text-[#1A1A1A] text-xl font-bold uppercase">Consent &amp; Authorization</h3>
              <p>By submitting your information and purchasing services, you:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Consent to the collection, use, and internal sharing of your personal data</li>
                <li>Authorize AOS Impact to add you as an authorized user on tradeline accounts</li>
                <li>Acknowledge that you have read and agree to this Privacy Policy, Disclaimer, and Terms of Service</li>
              </ul>
              <h3 className="text-[#1A1A1A] text-xl font-bold uppercase">Contact Information</h3>
              <p>For questions or requests regarding your data or services, contact:</p>
              <p>Email: <a href="mailto:tradelines@oasimpactsolutions.com" className="text-[#C9A84C] hover:underline">tradelines@oasimpactsolutions.com</a></p>
              <p>Company: AOS Impact</p>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}
