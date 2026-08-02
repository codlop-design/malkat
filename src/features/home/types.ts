import type {
  AboutValuesBlock,
  ImpactBlock,
} from "@/src/features/about/types";

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

export interface HomeHomepageCourse {
  id: number;
  slug: string;
  title: string;
  overview: string | null;
  age_group: string | null;
  stages_count: number | null;
  domain: string | null;
  is_bought: boolean;
  image: string;
  session_type: string | null;
  price: string | null;
  period: string | null;
  show_on_homepage: boolean;
  lessons_count: number | null;
  practice_projects: number | null;
  rate: {
    avg_rate: number | null;
    count: number | null;
  } | null;
  is_favourite: boolean;
  is_rated: boolean;
  contributor: {
    name: string;
    image: string | null;
    type_label: string | null;
    overview: string | null;
    job_title: string | null;
  } | null;
}

export interface HomeContentApiData {
  hero_setion: HomeContentMediaSection;
  about_us: HomeContentMediaSection;
  discover: HomeDiscoverSection;
  introductory_video: string | null;
  homepage_course?: HomeHomepageCourse | null;
  partners: HomePartnersSection;
  values?: AboutValuesBlock[];
  impacts?: ImpactBlock[];
}

export interface HomeContentData {
  hero_section: HomeContentMediaSection;
  about_us: HomeContentMediaSection;
  discover: HomeDiscoverSection;
  introductory_video: string | null;
  homepage_course?: HomeHomepageCourse | null;
  partners: HomePartnersSection;
  values?: AboutValuesBlock[];
  impacts?: ImpactBlock[];
}
