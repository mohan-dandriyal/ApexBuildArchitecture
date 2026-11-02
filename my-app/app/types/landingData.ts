import landingJson from "@/app/data/landing.json";

export const landingData = landingJson;

export type HeroData = typeof landingJson.hero;
export type AboutData = typeof landingJson.about;
export type ServicesData = typeof landingJson.services;
export type WhyChooseUsData = typeof landingJson.whyChooseUs;
export type ProjectsData = typeof landingJson.projects;
export type ProjectItem = (typeof landingJson.projects.items)[number];
export type TeamData = typeof landingJson.team;
export type TestimonialsData = typeof landingJson.testimonials;
export type FaqData = typeof landingJson.faq;
export type ContactData = typeof landingJson.contact;
