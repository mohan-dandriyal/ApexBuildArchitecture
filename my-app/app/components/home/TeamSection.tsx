"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Award } from "lucide-react";
import { landingData } from "@/app/data/landingData";

const ease = [0.22, 1, 0.36, 1] as const;

export default function TeamSection() {
  const { team } = landingData;

  return (
    <section
      id={team.sectionId}
      className="relative overflow-hidden border-t border-slate-200 bg-white py-14 lg:py-16"
    >
      <div className="pointer-events-none absolute inset-0 bg-blueprint-grid opacity-55" />

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
              {team.eyebrow}
            </span>
            <h2 className="mt-2.5 font-display text-4xl font-extrabold leading-[1.06] text-[#0B1120] sm:text-5xl">
              {team.heading.prefix}{" "}
              <span className="font-serif italic font-normal text-[#EA580C]">
                {team.heading.accent}
              </span>{" "}
              {team.heading.suffix}
            </h2>
          </div>

          <p className="max-w-sm text-sm font-medium leading-6 text-slate-600">
            {team.intro}
          </p>
        </motion.div>

        {/* Clean Portrait-Dominant Team Grid (No Mail/Share Buttons, No Experience Badge) */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.members.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08, ease }}
              className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-[#F8FAFC] p-3 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#EA580C] hover:bg-white hover:shadow-2xl hover:shadow-blue-950/10"
            >
              {/* Tall Portrait Card */}
              <div className="relative h-76 w-full overflow-hidden rounded-2xl">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120]/85 via-transparent to-transparent" />

                <div className="absolute inset-x-4 bottom-3.5">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#FB923C]">
                    {member.role}
                  </p>
                  <h3 className="mt-0.5 font-display text-xl font-bold text-white">
                    {member.name}
                  </h3>
                </div>
              </div>

              {/* Concise Footer */}
              <div className="p-3.5">
                <p className="flex items-center gap-1.5 text-xs font-bold text-[#1E3A8A]">
                  <Award size={14} className="text-[#EA580C]" />
                  {member.credentials}
                </p>
                <p className="mt-2 text-xs leading-5 text-slate-600">
                  {member.bio}
                </p>
                <div className="mt-3.5 border-t border-slate-200 pt-2.5">
                  <span className="font-mono text-[10px] font-bold uppercase text-slate-400">
                    {team.focusLabel}:{" "}
                  </span>
                  <span className="text-xs font-bold text-[#0B1120]">
                    {member.specialty}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Compact Careers Strip */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15, ease }}
          className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-[#F8FAFC] px-6 py-4 sm:flex-row sm:items-center"
        >
          <p className="text-sm text-slate-600">
            <strong className="font-display font-bold text-[#0B1120]">
              {team.careersBanner.highlight}
            </strong>{" "}
            {team.careersBanner.text}
          </p>
          <a
            href={team.careersBanner.ctaHref}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#1E3A8A] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#EA580C]"
          >
            <span>{team.careersBanner.ctaLabel}</span>
            <ArrowUpRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
