"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { landingData } from "@/app/types/landingData";

const ease = [0.22, 1, 0.36, 1] as const;

export default function ServicesSection() {
  const { services } = landingData;

  return (
    <section
      id={services.sectionId}
      className="relative overflow-hidden border-t border-slate-200 bg-[#F8FAFC] py-14 lg:py-16"
    >
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[480px] w-[480px] rounded-full bg-blue-900/5 blur-[140px]" />

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
              {services.eyebrow}
            </span>
            <h2 className="mt-2.5 font-display text-4xl font-extrabold leading-[1.06] text-[#0B1120] sm:text-5xl">
              {services.heading.prefix}{" "}
              <span className="font-serif italic font-normal text-[#EA580C]">
                {services.heading.accent}
              </span>{" "}
              {services.heading.suffix}
            </h2>
          </div>

          <p className="max-w-sm text-sm font-medium leading-6 text-slate-600">
            {services.intro}
          </p>
        </motion.div>

        {/* Image-Dominant Services Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.items.map((service, index) => (
            <motion.article
              key={service.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: index * 0.07, ease }}
              className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#EA580C] hover:shadow-2xl hover:shadow-blue-950/10"
            >
              {/* Tall Image Showcase */}
              <div className="relative h-60 w-full overflow-hidden rounded-2xl">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120]/85 via-[#0B1120]/20 to-transparent" />

                {/* Top Metric Pill */}
                <div className="absolute right-4 top-4">
                  <span className="rounded-full border border-white/25 bg-white/95 px-3.5 py-1 font-mono text-[11px] font-bold text-[#1E3A8A] shadow-sm backdrop-blur-md">
                    {service.metric}
                  </span>
                </div>

                {/* Title Overlay on Image */}
                <div className="absolute inset-x-4 bottom-4">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#FB923C]">
                    {service.subtitle}
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-bold text-white">
                    {service.title}
                  </h3>
                </div>
              </div>

              {/* Compact Visual Body */}
              <div className="flex flex-1 flex-col justify-between p-4">
                <div>
                  <p className="text-xs leading-5 text-slate-600">
                    {service.description}
                  </p>

                  {/* Compact Deliverable Chips */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {service.deliverables.map((chip) => (
                      <span
                        key={chip}
                        className="rounded-lg border border-slate-200 bg-[#F8FAFC] px-2.5 py-1 font-mono text-[11px] font-semibold text-[#1E3A8A]"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 border-t border-slate-100 pt-3.5">
                  <a
                    href={services.cardCtaHref}
                    className="inline-flex w-full items-center justify-between text-xs font-bold uppercase tracking-wider text-[#0B1120] transition-colors group-hover:text-[#EA580C]"
                  >
                    <span>{services.cardCtaLabel}</span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-[#1E3A8A] transition-all duration-300 group-hover:bg-[#EA580C] group-hover:text-white">
                      <ArrowUpRight size={15} />
                    </span>
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
