export interface SiteSettingsLocation {
  latitude: string;
  longitude: string;
  map_url: string;
}

export interface SiteSettingsMeta {
  title: string;
  description: string;
  keywords: string;
  favicon: string;
}

export interface SiteSettingsContacts {
  email: string;
  full_phone: string;
  whatsapp: string;
  address: string;
}

export interface SiteSettingsSocialMedia {
  facebook: string;
  x: string;
  instagram: string;
  tiktok: string;
}

export interface SiteSettings {
  title: string;
  logo: string;
  description: string;
  privacy_policy: string;
  terms_and_conditions: string;
  location: SiteSettingsLocation;
  meta: SiteSettingsMeta;
  contacts: SiteSettingsContacts;
  social_media: SiteSettingsSocialMedia;
}
