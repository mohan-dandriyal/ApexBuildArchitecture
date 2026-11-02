"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { landingData } from "@/app/types/landingData";

const ease = [0.22, 1, 0.36, 1] as const;

export default function WhyChooseUsSection() {
  const { whyChooseUs } = landingData;
  const [activeReasonIdx, setActiveReasonIdx] = useState(0);
  const activeReason = whyChooseUs.reasons[activeReasonIdx];

  return (
    <section
      id={whyChooseUs.sectionId}
      className="relative overflow-hidden border-t border-slate-200 bg-white py-14 lg:py-16"
    >
      <div className="pointer-events-none absolute inset-0 bg-blueprint-grid opacity-50" />

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-10 flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 lg:flex-row lg:items-end"
        >
          <div>
            <span className="inline-flex items-center gap-2.5 font-mono text-xs font-bold tracking-[0.22em] text-[#EA580C]">
              <span className="h-2 w-2 rounded-full bg-[#1E3A8A]" />
              {whyChooseUs.eyebrow}
            </span>
            <h2 className="mt-2.5 font-display text-4xl font-extrabold leading-[1.06] text-[#0B1120] sm:text-5xl">
              {whyChooseUs.heading.prefix}{" "}
              <span className="font-serif italic font-normal text-[#EA580C]">
                {whyChooseUs.heading.accent}
              </span>{" "}
              {whyChooseUs.heading.suffix}
            </h2>
          </div>

          <p className="max-w-sm text-sm font-medium leading-6 text-slate-600">
            {whyChooseUs.intro}
          </p>
        </motion.div>

        {/* Interactive Split Showcase: Left Selector Stack + Right Large Visual Card */}
        <div className="grid items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left: 4 Interactive Differentiator Cards */}
          <div className="flex flex-col justify-between gap-3.5 lg:col-span-6">
            {whyChooseUs.reasons.map((reason, idx) => {
              const isSelected = idx === activeReasonIdx;
              return (
                <button
                  key={reason.id}
                  type="button"
                  onClick={() => setActiveReasonIdx(idx)}
                  onMouseEnter={() => setActiveReasonIdx(idx)}
                  className={`group flex w-full cursor-pointer items-center justify-between gap-4 rounded-2xl border p-4 text-left transition-all duration-300 sm:p-5 ${
                    isSelected
                      ? "border-[#EA580C] bg-[#1E3A8A] text-white shadow-xl shadow-blue-950/10"
                      : "border-slate-200 bg-[#F8FAFC] text-[#0B1120] hover:border-[#1E3A8A]/40 hover:bg-white"
                  }`}
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl">
                      <Image
                        src={reason.image}
                        alt={reason.title}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <span
                        className={`inline-flex items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-wider ${
                          isSelected ? "text-[#FB923C]" : "text-[#EA580C]"
                        }`}
                      >
                        <CheckCircle2 size={11} />
                        {whyChooseUs.verifiedLabel}
                      </span>
                      <h3 className="mt-0.5 truncate font-display text-lg font-bold">
                        {reason.title}
                      </h3>
                      <p
                        className={`mt-0.5 line-clamp-1 text-xs ${
                          isSelected ? "text-blue-100" : "text-slate-500"
                        }`}
                      >
                        {reason.description}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <span
                      className={`block font-display text-2xl font-extrabold sm:text-3xl ${
                        isSelected ? "text-[#FB923C]" : "text-[#1E3A8A]"
                      }`}
                    >
                      {reason.stat}
                    </span>
                    <span
                      className={`block font-mono text-[9px] font-bold uppercase ${
                        isSelected ? "text-blue-200" : "text-slate-400"
                      }`}
                    >
                      {reason.statLabel}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Large Animated Architectural Photo & Metric Spotlight */}
          <div className="flex lg:col-span-6">
            <div className="flex w-full flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-[#F8FAFC] p-3.5 shadow-2xl shadow-blue-950/10">
              <div className="relative min-h-[360px] w-full flex-1 overflow-hidden rounded-2xl sm:min-h-[400px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeReason.id}
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5, ease }}
                    className="relative h-full w-full"
                  >
                    <Image
                      src={activeReason.image}
                      alt={activeReason.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120]/90 via-[#0B1120]/30 to-transparent" />
                  </motion.div>
                </AnimatePresence>

                {/* Top Verified Pill */}
                <div className="absolute left-5 top-5">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-bold text-[#1E3A8A] shadow-md">
                    <CheckCircle2 size={14} className="text-[#EA580C]" />
                    {whyChooseUs.verifiedLabel}
                  </span>
                </div>

                {/* Bottom Big Stat & Description Overlay */}
                <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/20 bg-white/95 p-5 shadow-xl backdrop-blur-md">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-200 pb-3">
                    <h3 className="font-display text-2xl font-extrabold text-[#0B1120]">
                      {activeReason.title}
                    </h3>
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-4xl font-extrabold text-[#EA580C]">
                        {activeReason.stat}
                      </span>
                      <span className="font-mono text-[10px] font-bold uppercase text-[#1E3A8A]">
                        {activeReason.statLabel}
                      </span>
                    </div>
                  </div>
                  <p className="mt-3 text-xs font-medium leading-5 text-slate-600 sm:text-sm">
                    {activeReason.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
