"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { landingData } from "@/app/types/landingData";
import { PrimaryThemeButton } from "../ui/ThemeButtons";

const ease = [0.22, 1, 0.36, 1] as const;

function parseStatValue(val: string) {
  const match = val.match(/^([^0-9.]*)([0-9.]+)(.*)$/);
  if (!match) return { prefix: "", target: 0, suffix: val, decimals: 0 };
  const prefix = match[1] || "";
  const numStr = match[2];
  const suffix = match[3] || "";
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  const target = parseFloat(numStr) || 0;
  return { prefix, target, suffix, decimals };
}

function StatCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const { prefix, target, suffix, decimals } = parseStatValue(value);
  const [displayNumber, setDisplayNumber] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;
    const duration = 2000; // 2 seconds animation

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic progress
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = easeProgress * target;

      setDisplayNumber(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateCount);
      } else {
        setDisplayNumber(target);
      }
    };

    animationFrameId = requestAnimationFrame(animateCount);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {displayNumber.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function AboutSection() {
  const { about } = landingData;

  return (
    <section
      id={about.sectionId}
      className="relative overflow-hidden border-t border-slate-200 bg-white py-14 lg:py-18"
    >
      <div className="pointer-events-none absolute inset-0 bg-blueprint-grid opacity-40" />

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-16">
        {/* ================= MAIN 2-COLUMN ABOUT COMPOSITION ================= */}
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ================= LEFT COLUMN: OVERLAPPING IMAGE COMPOSITION ================= */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="relative lg:col-span-6"
          >
            <div className="relative mx-auto sm:max-w-[540px] sm:pb-14 sm:pr-10 lg:mx-0">
              {/* Main Primary Large Photo */}
              <div className="relative aspect-[4/3]  sm:w-[84%] overflow-hidden rounded-[30px] sm:rounded-[36px] shadow-xl shadow-slate-900/10 sm:h-[500px]">
                <Image
                  src={about.primaryImage.src}
                  alt={about.primaryImage.alt}
                  fill
                  sizes="(max-width: 1024px) 80vw, 40vw"
                  className="object-cover"
                />
              </div>

              {/* Floating Experience Badge (Pinned on Top-Right of Main Photo) */}
              <div className="absolute right-2 top-6 z-20 hidden sm:flex flex-col items-center justify-center rounded-2xl bg-[#0F2942] px-5 py-4 text-white shadow-xl shadow-blue-950/20 sm:right-6 sm:top-10">
                <span className="font-display text-3xl font-extrabold text-[#FB923C] sm:text-4xl leading-none">
                  {about.experienceBadge.value}
                </span>
                <span className="mt-1 font-mono text-[10px] font-bold uppercase tracking-wider text-center text-blue-100 sm:text-[11px] leading-tight">
                  {about.experienceBadge.label}
                  <br />
                  {about.experienceBadge.subtext}
                </span>
              </div>

              {/* Overlapping Secondary Photo (Pinned on Bottom-Right) */}
              <div className="absolute -bottom-2 right-0 z-10 aspect-[4/3] w-[58%] sm:w-[54%] overflow-hidden rounded-[26px] sm:rounded-[32px] border-4 border-white shadow-2xl shadow-slate-900/15 sm:bottom-0 sm:right-2 sm:h-[350px] sm:block hidden">
                <Image
                  src={about.secondaryImage.src}
                  alt={about.secondaryImage.alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* ================= RIGHT COLUMN: EDITORIAL DETAILS & CHECKLIST ================= */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="flex flex-col justify-center lg:col-span-6"
          >
            {/* Category / Eyebrow */}
            <span className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#EA580C]">
              <span className="h-2 w-2 rounded-full bg-[#1E3A8A]" />
              {about.eyebrow}
            </span>

            {/* Section Main Title */}
            <h2 className="mt-3 font-display text-3xl font-extrabold leading-[1.12] text-[#0B1120] sm:text-4xl lg:text-[46px]">
              {about.heading.prefix}{" "}
              <span className="font-serif italic font-normal text-[#EA580C]">
                {about.heading.accent}
              </span>{" "}
              {about.heading.suffix}
            </h2>

            {/* Narrative Story / Intro */}
            <p className="mt-4 text-sm font-medium leading-7 text-slate-600 sm:text-base">
              {about.story}
            </p>

            {/* Services Checklist Heading */}
            <h3 className="mt-6 font-display text-sm font-bold uppercase tracking-wider text-[#0B1120]">
              {about.specialServicesTitle}
            </h3>

            {/* 2-Column Checklist */}
            <div className="mt-3.5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {about.checklist.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-2.5 text-xs font-semibold text-[slate-700] sm:text-[13px]"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#EA580C]/30 text-[#EA580C]">
                    <CheckCircle2 size={14} className="stroke-[2.5]" />
                  </span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

            {/* Primary Action Button */}
            <div className="mt-8">
              {
                about.cta.label && (
                  <PrimaryThemeButton
                    text={about.cta.label}
                    href={about.cta.href}
                    Icon={ArrowUpRight}
                    className="" />
                )
              }
            </div>
          </motion.div>
        </div>

        {/* ================= INTEGRATED ABOUT US ANIMATED COUNTER SECTION ================= */}
        {about.stats && about.stats.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease }}
            className="mt-14 border-t border-slate-200/80 pt-10"
          >
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 sm:gap-6">
              {about.stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`group relative overflow-hidden p-6 text-center transition-all duration-300 hover:-translate-y-1 border-slate-200/90 hover:bg-white hover:shadow-blue-950/5 ${i < 3 ? "lg:border-r" : ""
                    }`}
                >
                  <span className="block font-display text-3xl font-extrabold text-[#1E3A8A] transition-colors group-hover:text-[#EA580C] sm:text-4xl lg:text-5xl">
                    <StatCounter value={stat.value} />
                  </span>
                  <h4 className="mt-2 font-display text-sm font-bold text-[#0B1120] sm:text-base">
                    {stat.label}
                  </h4>
                  <p className="mt-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    {stat.sub}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
