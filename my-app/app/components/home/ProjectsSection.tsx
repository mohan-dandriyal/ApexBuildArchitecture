"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  MapPin,
  Maximize2,
  X,
} from "lucide-react";
import { landingData, type ProjectItem } from "@/app/data/landingData";

const ease = [0.22, 1, 0.36, 1] as const;

export default function ProjectsSection() {
  const { projects } = landingData;
  const [selectedCategory, setSelectedCategory] = useState<string>(
    projects.categories[0]
  );
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-10 flex flex-col justify-between gap-6 border-b border-slate-200 pb-6 lg:flex-row lg:items-end"
        >
          <div>
            <span className="inline-flex items-center gap-2.5 font-mono text-xs font-bold tracking-[0.22em] text-[#EA580C]">
              <span className="h-2 w-2 rounded-full bg-[#1E3A8A]" />
              {projects.eyebrow}
            </span>
            <h2 className="mt-2.5 font-display text-4xl font-extrabold leading-[1.06] text-[#0B1120] sm:text-5xl">
              {projects.heading.prefix}{" "}
              <span className="font-serif italic font-normal text-[#EA580C]">
                {projects.heading.accent}
              </span>{" "}
              {projects.heading.suffix}
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {projects.categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`cursor-pointer rounded-full px-5 py-2.5 text-xs font-bold tracking-wider transition-all duration-300 ${
                    isActive
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

        {/* Full-Bleed Visual Portfolio Grid */}
        <motion.div
          layout
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.article
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 10 }}
                transition={{ duration: 0.45, ease }}
                onClick={() => setActiveProject(project)}
                className="group relative h-[400px] cursor-pointer overflow-hidden rounded-[28px] border border-slate-200 bg-[#0B1120] shadow-md transition-all duration-500 hover:-translate-y-2 hover:border-[#EA580C] hover:shadow-2xl hover:shadow-blue-950/15"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120]/90 via-[#0B1120]/20 to-transparent" />

                {/* Top Floating Badges */}
                <div className="absolute inset-x-5 top-5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-white/95 px-3.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#1E3A8A] shadow-sm backdrop-blur-md">
                      {project.category}
                    </span>
                    <span className="rounded-full bg-[#EA580C] px-3 py-1 font-mono text-[11px] font-bold text-white shadow-sm">
                      {project.budget}
                    </span>
                  </div>

                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/90 text-[#0B1120] shadow-md backdrop-blur-md transition-all duration-300 group-hover:bg-[#EA580C] group-hover:text-white">
                    <Maximize2 size={15} />
                  </span>
                </div>

                {/* Bottom Floating Glassmorphic Info Card */}
                <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/20 bg-white/95 p-5 shadow-xl backdrop-blur-md transition-transform duration-300 group-hover:-translate-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="inline-flex items-center gap-1 font-semibold text-slate-600">
                      <MapPin size={13} className="text-[#EA580C]" />
                      {project.location}
                    </span>
                    <span className="font-mono text-[11px] font-bold text-[#1E3A8A]">
                      {projects.labels.completedPrefix} {project.year}
                    </span>
                  </div>

                  <h3 className="mt-1.5 font-display text-xl font-extrabold text-[#0B1120] transition-colors group-hover:text-[#1E3A8A]">
                    {project.title}
                  </h3>

                  <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-2.5 text-xs">
                    <span className="font-mono font-bold text-[#EA580C]">
                      {project.area}
                    </span>
                    <span className="font-mono font-semibold text-slate-500">
                      {project.duration}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Interactive Multi-Image Gallery Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/65 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.35, ease }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl sm:p-6"
            >
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="relative h-64 overflow-hidden rounded-2xl sm:col-span-2 sm:h-72">
                  <Image
                    src={activeProject.image}
                    alt={activeProject.title}
                    fill
                    sizes="(max-width: 800px) 100vw, 550px"
                    className="object-cover"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-[#EA580C] px-3.5 py-1 text-xs font-bold text-white">
                    {activeProject.category}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-1">
                  {activeProject.gallery.map((photo, idx) => (
                    <div
                      key={idx}
                      className="relative h-32 overflow-hidden rounded-2xl sm:h-[138px]"
                    >
                      <Image
                        src={photo}
                        alt={activeProject.title}
                        fill
                        sizes="260px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveProject(null)}
                aria-label={projects.labels.closeModalAria}
                className="absolute right-6 top-6 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/95 text-[#0B1120] shadow-lg transition-colors hover:bg-[#EA580C] hover:text-white"
              >
                <X size={18} />
              </button>

              <div className="mt-6">
                <h3 className="font-display text-2xl font-extrabold text-[#0B1120] sm:text-3xl">
                  {activeProject.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {activeProject.summary}
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3 rounded-2xl border border-slate-200 bg-[#F8FAFC] p-4 sm:grid-cols-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400">
                      {projects.labels.locationLabel}
                    </span>
                    <p className="mt-0.5 text-xs font-bold text-[#0B1120]">
                      {activeProject.location}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400">
                      {projects.labels.contractValueLabel}
                    </span>
                    <p className="mt-0.5 font-mono text-xs font-bold text-[#EA580C]">
                      {activeProject.budget}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400">
                      {projects.labels.totalAreaLabel}
                    </span>
                    <p className="mt-0.5 font-mono text-xs font-bold text-[#1E3A8A]">
                      {activeProject.area}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400">
                      {projects.labels.clientLabel}
                    </span>
                    <p className="mt-0.5 text-xs font-bold text-[#0B1120]">
                      {activeProject.client}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {activeProject.highlights.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#0B1120]"
                    >
                      <CheckCircle2 size={14} className="text-[#EA580C]" />
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-5">
                  <span className="text-xs font-medium text-slate-500">
                    {projects.labels.modalFooterPrompt}
                  </span>
                  <a
                    href={projects.labels.modalCtaHref}
                    onClick={() => setActiveProject(null)}
                    className="inline-flex items-center gap-2 rounded-full bg-[#1E3A8A] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#EA580C]"
                  >
                    <span>{projects.labels.modalCtaLabel}</span>
                    <ArrowUpRight size={15} />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
