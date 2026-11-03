"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  MapPin,
  Mail,
  Phone,
  HardHat,
  ShieldCheck,
  Award,
  Clock,
  type LucideIcon,
} from "lucide-react";
import footerData from "@/app/data/footer.json";

const contactIcons: Record<string, LucideIcon> = {
  "map-pin": MapPin,
  mail: Mail,
  phone: Phone,
};

const badgeIcons: Record<string, LucideIcon> = {
  shield: ShieldCheck,
  award: Award,
  hardhat: HardHat,
};

function SocialPlatformIcon({ icon }: { icon: string }) {
  switch (icon) {
    case "linkedin":
      return (
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
    case "instagram":
      return (
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      );
    case "facebook":
      return (
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      );
    case "youtube":
      return (
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
          <path d="m10 15 5-3-5-3v6Z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Footer() {
  const { theme, topSection, mainSection, bottomSection } = footerData.footer;

  return (
    <footer
      id="footer"
      style={{
        backgroundColor: theme.background,
        color: theme.text,
      }}
      className="relative overflow-hidden border-t border-slate-200 py-14 lg:pt-18 pb-6"
    >
      <div className="pointer-events-none absolute inset-0 bg-blueprint-grid opacity-40" />

      {/* ================= ELEVATED ARCHITECTURAL CTA BANNER ================= */}
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[32px] border border-blue-900/20 bg-[#0B1120] px-7 py-10 text-white shadow-2xl sm:px-12 sm:py-14 lg:px-16"
        >
          <Image
            src={topSection.bannerImage}
            alt={topSection.title}
            fill
            sizes="100vw"
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A8A]/95 via-[#0B1120]/90 to-[#0B1120]/75" />

          <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div className="max-w-2xl">
              <span className="mb-3 inline-flex items-center gap-2.5 font-mono text-xs font-bold tracking-[0.22em] text-[#FB923C]">
                <span className="h-2 w-2 rounded-full bg-[#EA580C]" />
                {topSection.eyebrow}
              </span>

              <h2 className="font-display text-2xl font-[600] sm:font-extrabold leading-[1.15] text-white sm:text-5xl">
                {topSection.title}{" "}
                <span className="font-serif italic font-normal text-[#FB923C]">
                  {topSection.titleAccent}
                </span>
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-blue-100 sm:text-base">
                {topSection.description}
              </p>

            </div>

            <div className="flex flex-col items-start gap-4 sm:flex-row lg:flex-col lg:items-end">
              <a
                href={topSection.button.href}
                className="group inline-flex w-fit items-center gap-4 rounded-full bg-[#EA580C] pl-6 pe-2 py-2.5 text-sm font-bold text-white shadow-xl shadow-orange-600/30 transition-all duration-300 hover:bg-white hover:text-[#0B1120]"
              >
                {topSection.button.label}
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight size={17} />
                </span>
              </a>

              {topSection.hotlinePrefix && (
                <a
                  href={topSection.hotlineNumber}
                  className="group lg:w-full flex justify-center items-center gap-2.5 rounded-full border border-slate-200 bg-[#F8FAFC] px-4 py-2.5 text-lg font-bold text-[#0B1120] transition-all duration-300 hover:border-[#EA580C] hover:bg-white hover:text-[#EA580C] shadow-sm"
                >
                  <span className=" duration-300 flex h-7 w-7 items-center justify-center rounded-full bg-[#EA580C]/10 text-[#EA580C] transition-colors group-hover:bg-[#EA580C] group-hover:text-white">
                    <Phone size={13} />
                  </span>

                  <span className="font-mono text-sm tracking-tight">
                    {topSection.hotlineNumber}
                  </span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ================= REFINED 3-COLUMN MAIN FOOTER WITH ALL TAB HEADINGS ================= */}
      <div className="relative mx-auto max-w-[1440px] px-5 pt-14 sm:px-8 lg:px-16">
        <div className="grid gap-10 border-b border-slate-200 pb-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.3fr]">
          {/* TAB 1: BRAND & COMPANY */}
          <div>

            <a
              href={mainSection.navigation.links[0]?.href || "#home"}
              className="inline-block"
            >
              <Image
                src={mainSection.brand.logo}
                alt={mainSection.brand.logoAlt}
                width={180}
                height={54}
                className="h-auto w-45 sm:w-70 object-contain"
              />
            </a>

            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600">
              {mainSection.brand.description}
            </p>

            {/* Social Links Subheading */}
            <h4 className="mb-3 mt-6 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#1E3A8A]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1E3A8A]" />
              {mainSection.brand.socialTitle}
            </h4>

            {/* Social Icons */}
            <div className="flex flex-wrap gap-2.5">
              {mainSection.brand.socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-[#1E3A8A] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#EA580C] hover:bg-[#EA580C] hover:text-white"
                >
                  <SocialPlatformIcon icon={item.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* TAB 2: SITE DIRECTORY */}
          <div>
            <h3 className="mb-5 flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wider text-[#0B1120]">
              <span className="h-2 w-2 rounded-full bg-[#EA580C]" />
              {mainSection.navigation.title}
            </h3>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
              {mainSection.navigation.links.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-[#EA580C]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#EA580C] opacity-40 transition-all group-hover:w-3 group-hover:opacity-100" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* TAB 3: GLOBAL HQ & ESTIMATING */}
          <div>
            <h3 className="mb-5 flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wider text-[#0B1120]">
              <span className="h-2 w-2 rounded-full bg-[#EA580C]" />
              {mainSection.contact.title}
            </h3>

            <p className="mb-3 text-xs leading-5 text-slate-600">
              {mainSection.contact.description}
            </p>


            <div className="space-y-4.5 mt-5">
              {mainSection.contact.items.map((item) => {
                const Icon = contactIcons[item.icon];
                if (!Icon) return null;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="group flex items-start gap-3.5"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#EA580C] shadow-sm transition-colors group-hover:border-[#EA580C] group-hover:bg-[#EA580C] group-hover:text-white">
                      <Icon size={15} />
                    </span>

                    <span className="min-w-0">
                      <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        {item.label}
                      </span>
                      <span className="break-words text-xs font-bold text-[#0B1120] transition-colors group-hover:text-[#EA580C]">
                        {item.value}
                      </span>
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div className="flex flex-col gap-4 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-slate-500">{bottomSection.copyright}</p>


          <a
            href={bottomSection.backToTop.href}
            aria-label={bottomSection.backToTop.label}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-[#0B1120] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#EA580C] hover:bg-[#EA580C] hover:text-white"
          >
            <ArrowUp size={17} />
          </a>
        </div>
      </div>
    </footer>
  );
}
