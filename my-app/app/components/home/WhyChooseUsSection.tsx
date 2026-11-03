"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { landingData } from "@/app/types/landingData";

const ease = [0.22, 1, 0.36, 1] as const;

export default function WhyChooseUsSection() {
  const { whyChooseUs } = landingData;

  return (
    <section
      id={whyChooseUs.sectionId}
      className="relative overflow-hidden border-t border-slate-200 bg-white py-14 lg:py-14"
    >
      <div className="pointer-events-none absolute inset-0 bg-blueprint-grid opacity-35" />

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-16">
        {/* ================= HEADER: TITLE ON LEFT, DESCRIPTION ON RIGHT ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-10 flex flex-col justify-between gap-6 border-b border-slate-200/80 pb-8 lg:flex-row lg:items-center"
        >
          <div className="lg:max-w-md">
            {"eyebrow" in whyChooseUs && whyChooseUs.eyebrow && (
              <span className="inline-flex items-center gap-2.5 font-mono text-[9px] sm:text-xs font-bold tracking-[0.22em] text-[#EA580C]">
                <span className="h-2 w-2 rounded-full bg-[#1E3A8A]" />
                {whyChooseUs.eyebrow}
              </span>
            )}
            <h2 className="mt-2.5 font-display text-2xl font-[600] sm:font-extrabold leading-[1.15] tracking-tight text-[#0B1120] sm:text-5xl lg:text-[54px] lg:leading-[1.08]">
              {whyChooseUs.title}
            </h2>
          </div>

          <div className="lg:max-w-xl">
            <p className="text-sm font-medium leading-relaxed text-slate-600 sm:text-base">
              {whyChooseUs.description}
            </p>
          </div>
        </motion.div>

        {/* ================= 3-COLUMN ARCHITECTURAL SHOWCASE WITH CURVED LINE ================= */}
        <div className="relative mt-4">
         

          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
            {/* LEFT COLUMN: 2 Features Stacked */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease }}
              className="space-y-10 lg:col-span-4 lg:space-y-16"
            >
              {whyChooseUs.leftFeatures.map((item) => (
                <div key={item.id} className="group">
                  <h3 className="font-display tsm:text-2xl sm:font-extrabold text-xl font-[600] text-[#0B1120] transition-colors group-hover:text-[#1E3A8A]">
                    {item.title}
                  </h3>
                  <h4 className="mt-1 font-display text-xs font-bold uppercase tracking-wider text-[#EA580C]">
                    {item.subtitle}
                  </h4>
                  <p className="mt-2.5 text-xs font-medium leading-6 text-slate-600 sm:text-sm">
                    {item.description}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* CENTER COLUMN: Arched / Curved Architectural Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
              className="lg:flex justify-center hidden lg:col-span-4"
            >
              <div className="relative h-[440px] w-full max-w-[340px] overflow-hidden rounded-t-[190px] rounded-b-[20px] border-4 border-white shadow-2xl shadow-slate-900/15 sm:h-[490px]">
                {/* Soft warm gradient backdrop like reference image */}
                <div className="absolute inset-0 bg-gradient-to-t from-orange-50 via-rose-50/40 to-amber-50/30" />

                <Image
                  src={whyChooseUs.centerImage}
                  alt={whyChooseUs.title}
                  fill
                  sizes="(max-width: 1024px) 70vw, 30vw"
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120]/30 via-transparent to-transparent" />
              </div>
            </motion.div>

            {/* RIGHT COLUMN: 2 Features Stacked */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease }}
              className="space-y-10 lg:col-span-4 lg:space-y-16"
            >
              {whyChooseUs.rightFeatures.map((item) => (
                <div key={item.id} className="group">
                  <h3 className="font-display sm:text-2xl sm:font-extrabold text-xl font-[600] text-[#0B1120] transition-colors group-hover:text-[#1E3A8A]">
                    {item.title}
                  </h3>
                  <h4 className="mt-1 font-display text-xs font-bold uppercase tracking-wider text-[#EA580C]">
                    {item.subtitle}
                  </h4>
                  <p className="mt-2.5 text-xs font-medium leading-6 text-slate-600 sm:text-sm">
                    {item.description}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
