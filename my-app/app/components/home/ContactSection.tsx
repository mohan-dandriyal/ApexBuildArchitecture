"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { landingData } from "@/app/types/landingData";

const ease = [0.22, 1, 0.36, 1] as const;

const metricIconMap: Record<string, LucideIcon> = {
  clock: Clock,
  shield: ShieldCheck,
};

const channelIconMap: Record<string, LucideIcon> = {
  "map-pin": MapPin,
  mail: Mail,
  phone: Phone,
};

export default function ContactSection() {
  const { contact } = landingData;
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id={contact.sectionId}
      className="relative overflow-hidden border-t border-slate-200 bg-[#F8FAFC] py-14 lg:py-18"
    >
      <div className="pointer-events-none absolute -left-32 bottom-10 h-96 w-96 rounded-full bg-orange-500/10 blur-[150px]" />

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
              {contact.eyebrow}
            </span>
            <h2 className="mt-2.5 font-display text-4xl font-extrabold leading-[1.06] text-[#0B1120] sm:text-5xl">
              {contact.heading.prefix}{" "}
              <span className="font-serif italic font-normal text-[#EA580C]">
                {contact.heading.accent}
              </span>{" "}
              {contact.heading.suffix}
            </h2>
          </div>

          <p className="max-w-sm text-sm font-medium leading-6 text-slate-600">
            {contact.intro}
          </p>
        </motion.div>

        <div className="grid items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Photo-Backed Regional Studio Cards */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="flex flex-col justify-between gap-4 lg:col-span-5"
          >
            <div className="space-y-3.5">
              <h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#1E3A8A]">
                {contact.officesTitle}
              </h3>

              {contact.offices.map((office) => {
                const ChannelIcon = channelIconMap[office.icon] || MapPin;
                return (
                  <a
                    key={office.city}
                    href={office.href}
                    className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm transition-all duration-300 hover:border-[#EA580C] hover:shadow-md"
                  >
                    <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-xl">
                      <Image
                        src={office.image}
                        alt={office.city}
                        fill
                        sizes="112px"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#EA580C]">
                        <ChannelIcon size={12} className="shrink-0 text-[#EA580C]" />
                        {office.label}
                      </span>

                      <h4 className="mt-1 break-words font-display text-sm font-bold leading-snug text-[#0B1120] transition-colors group-hover:text-[#1E3A8A] sm:text-base">
                        {office.value}
                      </h4>

                      <p className="mt-1 text-xs text-slate-500">
                        {office.subtext}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Direct Guarantees Strip */}
            <div className="grid grid-cols-2 gap-3.5 rounded-2xl border border-blue-900/15 bg-gradient-to-r from-[#1E3A8A] to-[#0B1120] p-5 text-white shadow-lg">
              {contact.directMetrics.map((metric) => {
                const Icon = metricIconMap[metric.icon] || Clock;
                return (
                  <div key={metric.label} className="flex items-start gap-2.5">
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#FB923C]" />
                    <div>
                      <p className="font-display text-sm font-bold text-white">
                        {metric.value}
                      </p>
                      <p className="text-[11px] text-blue-200">
                        {metric.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column: Clean 4-Field Contact Form (Name, Email, Phone, Message) */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="flex lg:col-span-7"
          >
            <div className="flex w-full flex-col justify-between rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-blue-950/5 sm:p-9">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="my-auto py-10 text-center"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-500/15 text-[#EA580C]">
                    <CheckCircle2 size={34} />
                  </div>
                  <span className="mt-4 inline-block font-mono text-xs font-bold tracking-[0.2em] text-[#EA580C]">
                    {contact.form.successState.badge}
                  </span>
                  <h3 className="mt-1.5 font-display text-3xl font-extrabold text-[#0B1120]">
                    {contact.form.successState.title}
                  </h3>
                  <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
                    {contact.form.successState.message}
                  </p>

                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-7 inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#1E3A8A] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#EA580C]"
                  >
                    {contact.form.successState.resetButton}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#EA580C]">
                      {contact.form.badge}
                    </span>
                    <h3 className="mt-1 font-display text-2xl font-extrabold text-[#0B1120] sm:text-3xl">
                      {contact.form.title}
                    </h3>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {contact.form.subtitle}
                    </p>
                  </div>

                  {/* Field 1: Name */}
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-[#0B1120]">
                      {contact.form.fields.nameLabel}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={contact.form.fields.namePlaceholder}
                      className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 py-3 text-sm text-[#0B1120] outline-none transition-colors placeholder:text-slate-400 focus:border-[#EA580C] focus:bg-white"
                    />
                  </div>

                  {/* Fields 2 & 3: Email & Phone */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-[#0B1120]">
                        {contact.form.fields.emailLabel}
                      </label>
                      <input
                        type="email"
                        required
                        placeholder={contact.form.fields.emailPlaceholder}
                        className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 py-3 text-sm text-[#0B1120] outline-none transition-colors placeholder:text-slate-400 focus:border-[#EA580C] focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-[#0B1120]">
                        {contact.form.fields.phoneLabel}
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder={contact.form.fields.phonePlaceholder}
                        className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 py-3 text-sm text-[#0B1120] outline-none transition-colors placeholder:text-slate-400 focus:border-[#EA580C] focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* Field 4: Message */}
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-[#0B1120]">
                      {contact.form.fields.messageLabel}
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder={contact.form.fields.messagePlaceholder}
                      className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 py-3 text-sm text-[#0B1120] outline-none transition-colors placeholder:text-slate-400 focus:border-[#EA580C] focus:bg-white"
                    />
                  </div>

                  <div className="flex flex-col items-start justify-between gap-4 border-t border-slate-200 pt-4 sm:flex-row sm:items-center">
                    <span className="text-xs font-medium text-slate-500">
                      {contact.form.confidentialNote}
                    </span>

                    <button
                      type="submit"
                      className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-[#EA580C] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-600/20 transition-all hover:bg-[#1E3A8A]"
                    >
                      <span>{contact.form.submitButton}</span>
                      <ArrowUpRight
                        size={17}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
