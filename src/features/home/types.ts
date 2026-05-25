export interface HomeContentMediaSection {
  title: string;
  description: string;
  image: string;
  type: string;
}

export interface HomeDiscoverItem {
  title: string;
  description: string;
  image: string;
}

export interface HomeDiscoverSection {
  title: string;
  description: string;
  type: string;
  items: HomeDiscoverItem[];
}

export interface HomePartnerItem {
  image: string;
}

export interface HomePartnersSection {
  title: string;
  description: string;
  type: string;
  items: HomePartnerItem[];
}

export interface HomeContentApiData {
  hero_setion: HomeContentMediaSection;
  about_us: HomeContentMediaSection;
  discover: HomeDiscoverSection;
  introductory_video: string | null;
  partners: HomePartnersSection;
}

export interface HomeContentData {
  hero_section: HomeContentMediaSection;
  about_us: HomeContentMediaSection;
  discover: HomeDiscoverSection;
  introductory_video: string | null;
  partners: HomePartnersSection;
}
