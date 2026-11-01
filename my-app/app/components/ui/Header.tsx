"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";

import headerData from "@/app/data/header.json";

const { header } = headerData;
const ease = [0.22, 1, 0.36, 1] as const;

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(
    header.navigation.navItems[0]?.href || "#home"
  );

  const reduceMotion = useReducedMotion();

  const { logo, announcement, navigation, cta, mobile, theme, settings } =
    header;

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > settings.scrollThreshold);

      if (!settings.showActiveLink) return;

      const sections = navigation.navItems
        .map((item) => document.querySelector(item.href))
        .filter((section): section is Element => section !== null);

      let currentSection = navigation.navItems[0]?.href || "#home";

      sections.forEach((section) => {
        const top = section.getBoundingClientRect().top;
        if (top <= 160) {
          currentSection = `#${section.id}`;
        }
      });

      setActiveLink(currentSection);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navigation.navItems, settings]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const scrollToHash = useCallback((href: string) => {
    if (!href.startsWith("#")) return false;
    const target = document.querySelector(href);
    if (!target) return false;

    const headerOffset = 76;
    const elementPosition = target.getBoundingClientRect().top + window.scrollY;
    const offsetPosition =
      href === "#home" ? 0 : Math.max(0, elementPosition - headerOffset);

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
    window.history.pushState(null, "", href);
    return true;
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    shouldCloseMenu = false
  ) => {
    if (scrollToHash(href)) {
      e.preventDefault();
      setActiveLink(href);
    }
    if (shouldCloseMenu) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleDocumentHashClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#" || !href.startsWith("#")) return;

      if (scrollToHash(href)) {
        event.preventDefault();
        setActiveLink(href);
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleDocumentHashClick);
    return () => document.removeEventListener("click", handleDocumentHashClick);
  }, [scrollToHash]);

  const headerAnimation = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.6, ease },
    },
  };

  const mobileMenuAnimation = {
    hidden: { opacity: 0, x: reduceMotion ? 0 : "100%" },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: reduceMotion ? 0 : 0.4, ease },
    },
    exit: {
      opacity: 0,
      x: reduceMotion ? 0 : "100%",
      transition: { duration: reduceMotion ? 0 : 0.3, ease },
    },
  };

  return (
    <>
      <motion.header
        variants={headerAnimation}
        initial="hidden"
        animate="visible"
        className="fixed inset-x-0 top-0 z-50"
        style={{
          backgroundColor: isScrolled
            ? theme.scrolledBackground
            : theme.background,
          backdropFilter: "blur(18px)",
          borderBottom: `1px solid ${theme.border}`,
          transition:
            "background-color 0.3s, border-color 0.3s, box-shadow 0.3s",
          boxShadow: isScrolled
            ? "0 12px 32px -12px rgba(30, 58, 138, 0.08)"
            : "none",
        }}
      >

        {/* Main Navigation Bar */}
        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-16">
          <a
            href={navigation.navItems[0]?.href || "#home"}
            onClick={(e) =>
              handleNavClick(e, navigation.navItems[0]?.href || "#home", true)
            }
            aria-label={logo.ariaLabel}
            className="relative z-10 shrink-0"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              priority
              className="h-auto w-36 object-contain sm:w-40"
            />
          </a>

          {/* Desktop Links */}
          <nav
            aria-label={navigation.ariaLabel}
            className="hidden items-center gap-1 xl:flex"
          >
            {navigation.navItems.map((item) => {
              const isActive = activeLink === item.href;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="group relative px-3.5 py-2.5 text-[13.5px] font-semibold tracking-tight transition-colors duration-300"
                  style={{
                    color: isActive ? "#1E3A8A" : theme.muted,
                  }}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-1 left-3.5 h-[2.5px] rounded-full bg-[#EA580C] transition-all duration-300 ${
                      isActive
                        ? "w-[calc(100%-28px)]"
                        : "w-0 group-hover:w-[calc(100%-28px)]"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden xl:block">
            {cta.enabled && (
              <a
                href={cta.btnLink}
                onClick={(e) => handleNavClick(e, cta.btnLink)}
                className="group inline-flex items-center gap-3.5 rounded-full bg-[#1E3A8A] py-2 pl-6 pr-2 text-sm font-bold text-white shadow-lg shadow-blue-900/15 transition-all duration-300 hover:bg-[#EA580C]"
              >
                {cta.btnText}
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EA580C] text-white transition-transform duration-300 group-hover:rotate-45 group-hover:bg-white/20">
                  <ArrowUpRight size={17} />
                </span>
              </a>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? mobile.closeLabel : mobile.menuLabel}
            aria-expanded={menuOpen}
            className="relative z-50 flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-[#0B1120] shadow-sm transition-colors hover:border-[#EA580C] hover:text-[#EA580C] xl:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={21} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={21} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              type="button"
              aria-label={mobile.closeLabel}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm xl:hidden"
            />

            <motion.div
              variants={mobileMenuAnimation}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed right-0 top-0 z-40 flex h-[100dvh] w-full max-w-[400px] flex-col overflow-y-auto border-l border-slate-200 bg-white px-7 pb-8 pt-28 shadow-2xl xl:hidden"
            >
              <div className="mb-6">
                <span className="font-mono text-[11px] font-bold tracking-[0.25em] text-[#EA580C]">
                  {navigation.mobileDrawerTitle}
                </span>
              </div>

              <nav className="flex flex-col">
                {navigation.navItems.map((item, index) => {
                  const isActive = activeLink === item.href;

                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: reduceMotion ? 0 : index * 0.05,
                      }}
                    >
                      <a
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href, true)}
                        className="group flex items-center justify-between border-b border-slate-100 py-4"
                      >
                        <span
                          className={`font-display text-2xl font-bold transition-colors duration-300 ${
                            isActive
                              ? "text-[#EA580C]"
                              : "text-[#0B1120] group-hover:text-[#1E3A8A]"
                          }`}
                        >
                          {item.label}
                        </span>

                        <ArrowUpRight
                          size={20}
                          className="text-slate-400 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#EA580C]"
                        />
                      </a>
                    </motion.div>
                  );
                })}
              </nav>

              {cta.enabled && (
                <a
                  href={cta.btnLink}
                  onClick={(e) => handleNavClick(e, cta.btnLink, true)}
                  className="mt-8 flex items-center justify-between rounded-full bg-[#EA580C] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-orange-600/20 transition-colors hover:bg-[#1E3A8A]"
                >
                  {mobile.ctaText || cta.btnText}
                  <ArrowUpRight size={20} />
                </a>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
