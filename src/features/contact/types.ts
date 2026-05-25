import type {
  SiteSettingsContacts,
  SiteSettingsSocialMedia,
} from "@/src/features/settings/types";

export interface ContactType {
  key: string;
  label: string;
}

export interface ContactPageFaq {
  question: string;
  answer: string;
}

export interface ContactPageData {
  contacts: SiteSettingsContacts;
  social_media: SiteSettingsSocialMedia;
  faqs: ContactPageFaq[];
}

export type { SiteSettingsContacts, SiteSettingsSocialMedia };
