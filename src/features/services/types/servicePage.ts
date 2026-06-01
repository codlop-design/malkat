export type ServicePageSectionItem = {
  image: string;
  title: string;
  content: string;
};

export type ServicePageSection = {
  title: string;
  content: string;
  items: ServicePageSectionItem[];
  icon?: string | null;
  image?: string | null;
};

export type ServicePageApiData = {
  statistics: ServicePageSection[];
  steps: ServicePageSection[];
  special: ServicePageSection[];
};

export type ServicePageContent = {
  statistics: ServicePageSection;
  steps: ServicePageSection;
  special: ServicePageSection;
};
