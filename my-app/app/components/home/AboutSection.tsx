"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Award, CheckCircle2 } from "lucide-react";
import { landingData } from "@/app/data/landingData";

const ease = [0.22, 1, 0.36, 1] as const;

export default function AboutSection() {
  const { about } = landingData;
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const [activePillar, setActivePillar] = useState(0);

  const currentPhoto = about.gallery[selectedPhoto];

  return (
    <section
      id={about.sectionId}
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
              {about.eyebrow}
            </span>
            <h2 className="mt-2.5 font-display text-4xl font-extrabold leading-[1.06] text-[#0B1120] sm:text-5xl">
              {about.heading.prefix}{" "}
              <span className="font-serif italic font-normal text-[#EA580C]">
                {about.heading.accent}
              </span>{" "}
              {about.heading.suffix}
            </h2>
          </div>

          <p className="max-w-sm text-sm font-medium leading-6 text-slate-600">
            {about.intro}
          </p>
        </motion.div>

        {/* Balanced 2-Column Showcase */}
        <div className="grid items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Interactive Architectural Gallery Showcase */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="flex flex-col lg:col-span-6"
          >
            <div className="flex flex-1 flex-col justify-between overflow-hidden rounded-[28px] border border-slate-200 bg-[#F8FAFC] p-3.5 shadow-xl shadow-blue-950/5">
              {/* Primary Large Photo */}
              <div className="relative min-h-[340px] w-full flex-1 overflow-hidden rounded-2xl sm:min-h-[390px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPhoto.src}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5, ease }}
                    className="relative h-full w-full"
                  >
                    <Image
                      src={currentPhoto.src}
                      alt={currentPhoto.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120]/85 via-transparent to-transparent" />
                  </motion.div>
                </AnimatePresence>

                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-[#1E3A8A] shadow-md backdrop-blur-md">
                  {currentPhoto.caption}
                </span>

                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl border border-white/20 bg-[#0B1120]/85 px-5 py-3.5 text-white backdrop-blur-md">
                  <div className="flex items-center gap-4">
                    <span className="font-display text-3xl font-extrabold text-[#FB923C] sm:text-4xl">
                      {about.experienceBadge.value}
                    </span>
                    <div>
                      <p className="font-display text-sm font-bold text-white">
                        {about.experienceBadge.label}
                      </p>
                      <p className="text-xs text-slate-300">
                        {about.experienceBadge.subtext}
                      </p>
                    </div>
                  </div>
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EA580C] text-white">
                    <Award size={20} />
                  </span>
                </div>
              </div>

              {/* 4-Photo Thumbnail Switcher Strip */}
              <div className="mt-3 grid grid-cols-4 gap-2.5">
                {about.gallery.map((img, idx) => {
                  const isActive = idx === selectedPhoto;
                  return (
                    <button
                      key={img.caption}
                      type="button"
                      onClick={() => setSelectedPhoto(idx)}
                      className={`group relative h-20 cursor-pointer overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                        isActive
                          ? "border-[#EA580C] ring-2 ring-[#EA580C]/20"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="140px"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Visual Pillar Stack & Founder Strip */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="flex flex-col justify-between gap-3.5 lg:col-span-6"
          >
            {about.pillars.map((pillar, idx) => {
              const isSelected = idx === activePillar;
              const primaryMetric = pillar.metrics[0];

              return (
                <div
                  key={pillar.id}
                  onClick={() => setActivePillar(idx)}
                  className={`group cursor-pointer overflow-hidden rounded-3xl border p-4 transition-all duration-300 ${
                    isSelected
                      ? "border-[#EA580C] bg-white shadow-lg shadow-blue-950/5"
                      : "border-slate-200 bg-[#F8FAFC] hover:border-[#1E3A8A]/40 hover:bg-white"
                  }`}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="relative h-24 w-full shrink-0 overflow-hidden rounded-2xl sm:w-32">
                      <Image
                        src={pillar.image}
                        alt={pillar.title}
                        fill
                        sizes="130px"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <span className="absolute left-2 top-2 rounded-md bg-[#1E3A8A] px-2 py-0.5 font-mono text-[10px] font-bold text-white">
                        {primaryMetric.value}%
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#EA580C]">
                          {pillar.label}
                        </span>
                        <span className="font-mono text-xs font-bold text-[#1E3A8A]">
                          {primaryMetric.label}
                        </span>
                      </div>

                      <h3 className="mt-1 font-display text-lg font-bold text-[#0B1120]">
                        {pillar.title}
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-slate-600">
                        {pillar.description}
                      </p>

                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {pillar.highlights.map((chip) => (
                          <span
                            key={chip}
                            className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-[#F8FAFC] px-2.5 py-0.5 text-[11px] font-semibold text-[#0B1120]"
                          >
                            <CheckCircle2
                              size={11}
                              className="text-[#EA580C]"
                            />
                            {chip}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Bottom Founder & CTA Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-[#F8FAFC] px-5 py-3.5">
              <div className="flex items-center gap-3.5">
                <div className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-[#EA580C]">
                  <Image
                    src={about.founder.avatar}
                    alt={about.founder.name}
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-display text-sm font-bold text-[#0B1120]">
                    {about.founder.name}
                  </p>
                  <p className="text-xs font-medium text-slate-500">
                    {about.founder.role}
                  </p>
                </div>
              </div>

              <a
                href={about.cta.href}
                className="group inline-flex items-center gap-2.5 rounded-full bg-[#1E3A8A] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-[#EA580C]"
              >
                <span>{about.cta.label}</span>
                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
