"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Star,
} from "lucide-react";
import { landingData } from "@/app/types/landingData";

const ease = [0.22, 1, 0.36, 1] as const;

export default function TestimonialsSection() {
  const { testimonials } = landingData;
  const [activeIndex, setActiveIndex] = useState(0);

  const prevSlide = () => {
    setActiveIndex((prev) =>
      prev === 0 ? testimonials.items.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.items.length);
  };

  const activeTestimonial = testimonials.items[activeIndex];

  return (
    <section
      id={testimonials.sectionId}
      className="relative overflow-hidden border-t border-slate-200 bg-[#F8FAFC] py-14 lg:py-16"
    >
      <div className="pointer-events-none absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-orange-500/10 blur-[140px]" />

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
              {testimonials.eyebrow}
            </span>
            <h2 className="mt-2.5 font-display text-4xl font-extrabold leading-[1.06] text-[#0B1120] sm:text-5xl">
              {testimonials.heading.prefix}{" "}
              <span className="font-serif italic font-normal text-[#EA580C]">
                {testimonials.heading.accent}
              </span>{" "}
              {testimonials.heading.suffix}
            </h2>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={prevSlide}
              aria-label={testimonials.labels.prevAria}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-slate-300 bg-white text-[#0B1120] shadow-sm transition-all hover:border-[#EA580C] hover:bg-[#EA580C] hover:text-white"
            >
              <ChevronLeft size={19} />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label={testimonials.labels.nextAria}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-slate-300 bg-white text-[#0B1120] shadow-sm transition-all hover:border-[#EA580C] hover:bg-[#EA580C] hover:text-white"
            >
              <ChevronRight size={19} />
            </button>
          </div>
        </motion.div>

        {/* Visual Split Spotlight Card: Project Photo + Client Review */}
        <div className=" overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-xl shadow-blue-950/5 sm:p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease }}
              className="grid items-center gap-6 lg:grid-cols-12"
            >
              {/* Left: Commissioned Landmark Photo */}
              <div className="relative h-64 w-full overflow-hidden rounded-2xl sm:h-72 lg:col-span-5">
                <Image
                  src={activeTestimonial.projectImage}
                  alt={activeTestimonial.projectDelivered}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120]/85 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1E3A8A] px-3 py-1 font-bold">
                    <ShieldCheck size={13} className="text-[#FB923C]" />
                    {activeTestimonial.projectDelivered}
                  </span>
                  <span className="rounded-full bg-[#EA580C] px-3 py-1 font-mono font-bold">
                    {activeTestimonial.projectValue}
                  </span>
                </div>
              </div>

              {/* Right: Concise Executive Quote & Avatar */}
              <div className="p-2 sm:p-4 lg:col-span-7">
                <div className="flex items-center gap-1 text-[#EA580C]">
                  {Array.from({ length: activeTestimonial.rating }).map(
                    (_, i) => (
                      <Star key={i} size={17} fill="currentColor" />
                    )
                  )}
                </div>

                <blockquote className="mt-4 font-display text-2xl font-bold leading-snug text-[#0B1120] sm:text-3xl">
                  &ldquo;{activeTestimonial.quote}&rdquo;
                </blockquote>

                <div className="mt-6 flex items-center gap-4 border-t border-slate-100 pt-5">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-[#EA580C]">
                    <Image
                      src={activeTestimonial.avatar}
                      alt={activeTestimonial.author}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#0B1120]">
                      {activeTestimonial.author}
                    </h3>
                    <p className="text-xs font-bold text-[#1E3A8A]">
                      {activeTestimonial.role} &bull;{" "}
                      <span className="text-[#EA580C]">
                        {activeTestimonial.company}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
