"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Building2,
} from "lucide-react";
import { landingData } from "@/app/types/landingData";

const smoothEase = [0.16, 1, 0.3, 1] as const;

export default function HeroSection() {
  const { hero } = landingData;
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % hero.slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [hero.slides.length]);

  const prevSlide = () => {
    setActiveSlide((prev) =>
      prev === 0 ? hero.slides.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % hero.slides.length);
  };

  const slide = hero.slides[activeSlide];

  return (
    <section
      id={hero.sectionId}
      className="relative flex h-screen min-h-[640px] w-full flex-col justify-between overflow-hidden bg-[#0B1120] pt-28 pb-10 lg:pt-32 lg:pb-14"
    >
      {/* ================= PRELOADED FULL-SCREEN SMOOTH IMAGE SLIDER ================= */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {hero.slides.map((item, idx) => {
          const isActive = idx === activeSlide;
          return (
            <motion.div
              key={item.id}
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1 : 1.06,
              }}
              transition={{
                opacity: { duration: 1.1, ease: smoothEase },
                scale: { duration: 6, ease: "easeOut" },
              }}
              className="absolute inset-0 h-full w-full"
            >
              <Image
                src={item.mainImage}
                alt={`${item.titlePrefix} ${item.titleAccent}`}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
          );
        })}

        {/* Clean gradient overlay for high contrast and readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1120]/85 via-[#0B1120]/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120]/80 via-transparent to-[#0B1120]/30" />
      </div>

      {/* ================= CENTER MINIMAL HERO CONTENT ================= */}
      <div className="relative z-10 mx-auto my-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-16">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.55, ease: smoothEase }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/95 px-4 py-1.5 font-mono text-[11px] font-bold tracking-[0.18em] text-[#1E3A8A] shadow-lg">
                <span className="h-2 w-2 rounded-full bg-[#EA580C]" />
                {slide.tag}
              </span>

              <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-[72px]">
                {slide.titlePrefix}{" "}
                <span className="font-serif italic font-normal text-[#FB923C]">
                  {slide.titleAccent}
                </span>{" "}
                {slide.titleSuffix}
              </h1>

              <p className="mt-4 max-w-xl text-sm font-medium leading-7 text-slate-200 sm:text-base">
                {slide.shortDesc}
              </p>

              {/* Primary & Secondary CTAs (Commented as requested) */}
              {/* <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={hero.primaryCta.href}
                  className="group inline-flex items-center gap-3.5 rounded-full bg-[#EA580C] py-3.5 pl-7 pr-3.5 text-sm font-bold text-white shadow-xl shadow-orange-600/30 transition-all duration-300 hover:bg-[#1E3A8A]"
                >
                  <span>{hero.primaryCta.label}</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight size={17} />
                  </span>
                </a>

                <a
                  href={hero.secondaryCta.href}
                  className="inline-flex items-center gap-2.5 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-md transition-all hover:bg-white hover:text-[#0B1120]"
                >
                  <Building2 size={16} className="text-[#FB923C]" />
                  <span>{hero.secondaryCta.label}</span>
                </a>
              </div> */}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ================= MINIMAL BOTTOM SLIDER CONTROLS ================= */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-16">
        <div className="flex items-center justify-between gap-6 border-t border-white/15 pt-5">
          {/* Minimal Slide Indicators */}
          <div className="flex items-center gap-3">
            {hero.slides.map((item, idx) => {
              const isSelected = idx === activeSlide;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSlide(idx)}
                  aria-label={item.titlePrefix}
                  className="group flex cursor-pointer items-center gap-2.5 py-1"
                >
                  <span
                    className={`relative h-1.5 overflow-hidden rounded-full transition-all duration-500 ${
                      isSelected
                        ? "w-14 bg-white/30"
                        : "w-6 bg-white/25 hover:bg-white/50"
                    }`}
                  >
                    {isSelected && (
                      <motion.span
                        key={`bar-${activeSlide}`}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 6, ease: "linear" }}
                        className="absolute inset-y-0 left-0 rounded-full bg-[#EA580C]"
                      />
                    )}
                  </span>
                  <span
                    className={`hidden font-display text-xs font-bold transition-colors md:inline ${
                      isSelected ? "text-white" : "text-white/50 group-hover:text-white/80"
                    }`}
                  >
                    {item.location}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Prev / Next Slider Arrows */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={prevSlide}
              aria-label={hero.sliderControls.prevAria}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:border-[#EA580C] hover:bg-[#EA580C]"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              aria-label={hero.sliderControls.nextAria}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:border-[#EA580C] hover:bg-[#EA580C]"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
