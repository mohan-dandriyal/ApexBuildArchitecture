import type { Metadata } from "next";
import {
  Outfit,
  Plus_Jakarta_Sans,
  Instrument_Serif,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";

import Footer from "@/app/components/ui/Footer";
import Header from "@/app/components/ui/Header";
import headerData from "@/app/data/header.json";

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: `${headerData.header.brand.name} | ${headerData.header.brand.tagline}`,
  description: headerData.header.announcement.text,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${jakarta.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} scroll-smooth h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F8FAFC] text-[#0B1120] selection:bg-[#EA580C] selection:text-white">
        {/* ======== Header ========= */}
        <Header />

        {/* ============ body ========== */}
        <main className="flex-1">{children}</main>

        {/* ====== footer ======= */}
        <Footer />
      </body>
    </html>
  );
}
