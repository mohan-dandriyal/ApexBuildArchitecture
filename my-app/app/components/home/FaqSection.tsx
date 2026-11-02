"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Minus,
  PhoneCall,
  Plus,
} from "lucide-react";
import { landingData } from "@/app/types/landingData";

const ease = [0.22, 1, 0.36, 1] as const;

export default function FaqSection() {
  const { faq } = landingData;
  const [openId, setOpenId] = useState<string | null>(faq.items[0]?.id || null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id={faq.sectionId}
      className="relative overflow-hidden border-t border-slate-200 bg-white py-14 lg:py-18"
    >
      <div className="pointer-events-none absolute inset-0 bg-blueprint-grid opacity-55" />

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-16">
        {/* Top Section Header (Matches other sections for clean spacing) */}
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
              {faq.eyebrow}
            </span>

            <h2 className="mt-2.5 font-display text-4xl font-extrabold leading-[1.06] text-[#0B1120] sm:text-5xl">
              {faq.heading.prefix}{" "}
              <span className="font-serif italic font-normal text-[#EA580C]">
                {faq.heading.accent}
              </span>{" "}
              {faq.heading.suffix}
            </h2>
          </div>

          <p className="max-w-sm text-sm font-medium leading-6 text-slate-600">
            {faq.intro}
          </p>
        </motion.div>

        {/* Balanced Equal-Height 2-Column Grid */}
        <div className="grid items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Full-Height Photo-Backed Engineering Consultation Card */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="flex lg:col-span-5"
          >
            <div className="flex w-full flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-[#F8FAFC] p-3.5 shadow-lg">
              <div className="relative min-h-[260px] w-full flex-1 overflow-hidden rounded-2xl">
                <Image
                  src={faq.supportCard.image}
                  alt={faq.supportCard.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120]/90 via-[#0B1120]/25 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-[#EA580C] px-3.5 py-1 font-mono text-[10px] font-bold text-white shadow-sm">
                  {faq.supportCard.badge}
                </span>
                <div className="absolute inset-x-4 bottom-4">
                  <h3 className="font-display text-2xl font-extrabold text-white">
                    {faq.supportCard.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-5 text-slate-200">
                    {faq.supportCard.description}
                  </p>
                </div>
              </div>

              <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                <a
                  href={faq.supportCard.primaryCta.href}
                  className="inline-flex items-center gap-2 rounded-full bg-[#1E3A8A] px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#EA580C]"
                >
                  <span>{faq.supportCard.primaryCta.label}</span>
                  <ArrowUpRight size={14} />
                </a>

                <a
                  href={faq.supportCard.phoneCta.href}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-[#F8FAFC] px-4 py-2.5 text-xs font-bold text-[#0B1120] transition-colors hover:border-[#EA580C] hover:text-[#EA580C]"
                >
                  <PhoneCall size={13} className="text-[#EA580C]" />
                  <span>{faq.supportCard.phoneCta.label}</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Accordion Stack */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="flex flex-col justify-between gap-3 lg:col-span-7"
          >
            {faq.items.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? "border-[#EA580C] bg-white shadow-lg shadow-blue-950/5"
                      : "border-slate-200 bg-[#F8FAFC] hover:border-[#1E3A8A] hover:bg-white"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <div>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#EA580C]">
                        {item.category}
                      </span>
                      <h3 className="mt-0.5 font-display text-lg font-bold text-[#0B1120] sm:text-xl">
                        {item.question}
                      </h3>
                    </div>

                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors ${
                        isOpen
                          ? "border-[#EA580C] bg-[#EA580C] text-white"
                          : "border-slate-300 bg-white text-[#1E3A8A]"
                      }`}
                    >
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease }}
                      >
                        <div className="border-t border-slate-100 px-5 pb-4 pt-3 text-sm leading-6 text-slate-600">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
