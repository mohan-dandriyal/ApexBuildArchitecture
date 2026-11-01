

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSocialLink extends FooterLink {
  platform: string;
  icon: string;
}

export interface FooterContactItem {
  label: string;
  value: string;
  href: string;
}

export interface FooterData {
  footer: {
    logo: {
      src: string;
      alt: string;
      width: number;
      height: number;
    };
    about: {
      title: string;
      titleAccent: string;
      description: string;
    };
    cta: {
      title: string;
      titleAccent: string;
      description: string;
      buttonText: string;
      buttonLink: string;
    };
    quickLinks: {
      title: string;
      links: FooterLink[];
    };
    programs: {
      title: string;
      links: FooterLink[];
    };
    contact: {
      title: string;
      address: FooterContactItem;
      email: FooterContactItem;
      phone: FooterContactItem;
    };
    social: {
      title: string;
      links: FooterSocialLink[];
    };
    newsletter: {
      title: string;
      description: string;
      placeholder: string;
      buttonText: string;
    };
    bottomBar: {
      copyright: string;
      credit: string;
      links: FooterLink[];
    };
  };
}
