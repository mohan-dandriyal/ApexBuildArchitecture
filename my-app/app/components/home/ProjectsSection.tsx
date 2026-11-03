"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { landingData } from "@/app/types/landingData";

export default function ProjectsSection() {
  const { projects } = landingData;
  const [selectedCategory, setSelectedCategory] = useState<string>(
    projects.categories[0]
  );

  const filteredProjects =
    selectedCategory === projects.categories[0]
      ? projects.items
      : projects.items.filter((p) => p.category === selectedCategory);

  return (
    <section
      id={projects.sectionId}
      className="relative overflow-hidden border-t border-slate-200 bg-[#F8FAFC] py-14 lg:py-16"
    >
      <div className="pointer-events-none absolute left-1/3 top-24 h-96 w-96 rounded-full bg-orange-500/10 blur-[150px]" />

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-16">
        {/* Section Header + Category Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="mb-10 flex flex-col justify-between gap-6 border-b border-slate-200 pb-6 lg:flex-row lg:items-end"
        >
          <div>
            <span className="inline-flex items-center gap-2.5 font-mono text-xs font-bold tracking-[0.22em] text-[#EA580C]">
              <span className="h-2 w-2 rounded-full bg-[#1E3A8A]" />
              {projects.eyebrow}
            </span>
            <h2 className="mt-2.5 font-display text-2xl font-[600] sm:font-extrabold leading-[1.15] text-[#0B1120] sm:text-5xl">
              {projects.heading.prefix}{" "}
              <span className="font-serif italic font-normal text-[#EA580C]">
                {projects.heading.accent}
              </span>{" "}
              {projects.heading.suffix}
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex overflow-x-auto gap-2 sm:pb-0 pb-1">
            {projects.categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`cursor-pointer rounded-full px-5 py-2.5 text-xs font-bold tracking-wider transition-all duration-300 ${isActive
                      ? "bg-[#1E3A8A] text-white shadow-md shadow-blue-900/15"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-[#EA580C] hover:text-[#EA580C]"
                    }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Visual Portfolio Grid with Uniform Fade In & Out Effect for All Filters */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredProjects.map((project, index) => (
              <motion.article
                key={`${selectedCategory}-${project.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.04,
                  ease: "easeInOut",
                }}
                className="group relative h-[400px] overflow-hidden rounded-[28px] border border-slate-200 bg-[#0B1120] shadow-md transition-all duration-500 hover:-translate-y-2 hover:border-[#EA580C] hover:shadow-2xl hover:shadow-blue-950/15"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120]/90 via-[#0B1120]/25 to-transparent" />

                {/* Top Floating Badges */}
                <div className="absolute inset-x-5 top-5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-white/95 px-3.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#1E3A8A] shadow-sm backdrop-blur-md">
                      {project.category}
                    </span>
                    {/* <span className="rounded-full bg-[#EA580C] px-3 py-1 font-mono text-[11px] font-bold text-white shadow-sm">
                      {project.budget}
                    </span> */}
                  </div>
                </div>

                {/* Bottom Floating Glassmorphic Info Card */}
                <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/20 bg-white/95 p-5 shadow-xl backdrop-blur-md transition-transform duration-300 group-hover:-translate-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="inline-flex items-center gap-1 font-semibold text-slate-600">
                      <MapPin size={13} className="text-[#EA580C]" />
                      {project.location}
                    </span>.
                    {
                      project.year &&
                      <span className="font-mono text-[11px] font-bold text-[#1E3A8A]">
                        {projects.labels.completedPrefix} {project.year}
                      </span>
                    }
                  </div>

                  <h3 className="mt-1.5 font-display text-xl font-[600] sm:font-extrabold text-[#0B1120] transition-colors group-hover:text-[#1E3A8A]">
                    {project.title}
                  </h3>

                  {
                    (project.duration || project.area) &&
                    <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-2.5 text-xs">
                      <span className="font-mono font-bold text-[#EA580C]">
                        {project.area}
                      </span>
                      <span className="font-mono font-semibold text-slate-500">
                        {project.duration}
                      </span>
                    </div>
                  }

                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
