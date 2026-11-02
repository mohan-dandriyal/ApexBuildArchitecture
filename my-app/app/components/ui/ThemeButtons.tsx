"use client";
import { useCallback } from "react";


export const PrimaryThemeButton = ({ text, href, className, Icon }: {
    text: string;
    href?: string;
    className?: string;
    Icon?: React.ComponentType<{ size?: number }>
}) => {
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

    return (
        <a
            href={href}
            onClick={(e) => scrollToHash(href || "") && e.preventDefault()}
            className={`group inline-flex items-center capitalize gap-3.5 rounded-full bg-[#1E3A8A] py-2.5 pl-6 pr-2 text-sm font-bold text-white shadow-lg shadow-blue-900/15 transition-all duration-300 hover:bg-[#EA580C] ${className}`}
        >
            {text}

            <span className="flex h-7 w-7  items-center justify-center rounded-full bg-[#EA580C] text-white transition-transform duration-300 group-hover:rotate-45 group-hover:bg-white/20">
                {Icon && <Icon size={17} />}
            </span>
        </a>
    );
}