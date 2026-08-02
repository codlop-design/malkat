export interface AboutUsSection {
  image: string;
  icon: string;
  title: string;
  content: string;
}

export interface VisionMessage {
  icon: string;
  title: string;
  content: string;
  items: string[];
}

export interface AboutValueItem {
  icon: string;
  title: string;
  content: string;
}

export interface AboutValuesBlock {
  icon: string;
  title: string;
  content: string;
  items: AboutValueItem[];
}

export interface AboutPartnersBlock {
  title: string;
  sub_title: string;
  content: string;
}

export interface ImpactItem {
  icon: string | null;
  count: number;
  title: string;
  content: string | null;
}

export interface ImpactBlock {
  icon: string | null;
  title: string;
  content: string;
  items: ImpactItem[];
}

export interface AboutPageData {
  aboutus_sections: AboutUsSection[];
  vision_messages: VisionMessage[];
  values: AboutValuesBlock[];
  impacts: ImpactBlock[];
  partners: AboutPartnersBlock;
}
