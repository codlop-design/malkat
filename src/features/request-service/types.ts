export type ServiceRequestSectionItem = {
  image: string;
  title: string;
  content: string;
};

export type ServiceRequestSection = {
  title: string;
  content: string;
  items: ServiceRequestSectionItem[];
};

export type ServiceRequestPageApiData = {
  start: ServiceRequestSection[];
  whyUs: ServiceRequestSection[];
  services: ServiceRequestSection[];
};

export type ServiceRequestLookupOption = {
  id: number;
  title: string;
};

export type ServiceRequestPageContent = {
  start: ServiceRequestSection;
  whyUs: ServiceRequestSection;
  services: ServiceRequestSection;
};

export type ServiceRequestFormOptions = {
  serviceTypes: ServiceRequestLookupOption[];
  targetGroups: ServiceRequestLookupOption[];
};
