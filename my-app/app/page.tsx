import HeroSection from "@/app/components/home/HeroSection";
import AboutSection from "@/app/components/home/AboutSection";
import ServicesSection from "@/app/components/home/ServicesSection";
import WhyChooseUsSection from "@/app/components/home/WhyChooseUsSection";
import ProjectsSection from "@/app/components/home/ProjectsSection";
import TeamSection from "@/app/components/home/TeamSection";
import TestimonialsSection from "@/app/components/home/TestimonialsSection";
import FaqSection from "@/app/components/home/FaqSection";
import ContactSection from "@/app/components/home/ContactSection";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      {/* 01. Home / Hero Section */}
      <HeroSection />

      {/* 02. About Us */}
      <AboutSection />

      {/* 03. Our Services */}
      <ServicesSection />

      {/* 04. Why Choose Us */}
      <WhyChooseUsSection />

      {/* 05. Our Projects / Portfolio */}
      <ProjectsSection />

      {/* 07. Our Team */}
      <TeamSection />

      {/* 08. Testimonials */}
      <TestimonialsSection />

      {/* 09. FAQ */}
      <FaqSection />

      {/* 10. Contact Us (11. Footer is rendered in RootLayout) */}
      <ContactSection />
    </div>
  );
}
