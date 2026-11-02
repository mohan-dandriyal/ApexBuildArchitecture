"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Award, ChevronDown, ChevronUp } from "lucide-react";
import { landingData } from "@/app/types/landingData";

const ease = [0.22, 1, 0.36, 1] as const;

export default function TeamSection() {
  const { team } = landingData;
  const [showAll, setShowAll] = useState(false);

  // First 4 members are permanently rendered and never reloaded/re-animated
  const initialMembers = team.members.slice(0, 4);
  // Extra members that load smoothly ONLY when "Show More" is clicked
  const extraMembers = team.members.slice(4);

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

        {/* Team Grid: Initial 4 stay permanently fixed; Only extra members animate in/out */}
        <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
          {/* First 4 Members: permanently rendered without reloading */}
          {initialMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08, ease }}
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

              {/* Concise Credentials & Bio */}
              <div className="p-3.5">
                <p className="flex items-center gap-1.5 text-xs font-bold text-[#1E3A8A]">
                  <Award size={14} className="text-[#EA580C]" />
                  {member.credentials}
                </p>
                <p className="mt-2 text-xs leading-5 text-slate-600 line-clamp-2">
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

          {/* New Members Only: Smooth Fade & Slide In without affecting first 4 */}
          <AnimatePresence>
            {showAll &&
              extraMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.96 }}
                  transition={{ duration: 0.4, delay: index * 0.08, ease }}
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

                  {/* Concise Credentials & Bio */}
                  <div className="p-3.5">
                    <p className="flex items-center gap-1.5 text-xs font-bold text-[#1E3A8A]">
                      <Award size={14} className="text-[#EA580C]" />
                      {member.credentials}
                    </p>
                    <p className="mt-2 text-xs leading-5 text-slate-600 line-clamp-2">
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
          </AnimatePresence>
        </div>

        {/* Show More / Show Less Toggle Button */}
        {team.members.length > 4 && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="group inline-flex items-center gap-2.5 rounded-full border border-slate-300 bg-[#f8fafc] duration-300 pl-6 pr-2 py-2.5 text-sm font-bold capitalize tracking-wider text-[#0b1120]/90 shadow-md transition-all cursor-pointer hover:border-[#EA580C] hover:bg-white hover:text-[#EA580C]"
            >
              <span>{showAll ? team.showLessLabel : team.showMoreLabel}</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EA580C]/30 text-[#EA580C] transition-colors group-hover:bg-[#EA580C] group-hover:text-white">
                {showAll ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
