export type PartnershipSectionItem = {
  image: string;
  title: string;
  content: string;
};

export type PartnershipSection = {
  title: string;
  content: string;
  items: PartnershipSectionItem[];
};

export type PartnershipPageApiData = {
  start: PartnershipSection[];
  whyUs: PartnershipSection[];
};

export type PartnershipPageData = {
  start: PartnershipSection;
  whyUs: PartnershipSection;
};
