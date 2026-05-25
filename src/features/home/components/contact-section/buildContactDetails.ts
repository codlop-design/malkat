import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import type { SiteSettingsContacts } from "@/src/features/settings/types";

import type { ContactDetailItem } from "./types";

export function buildContactDetails(
  contacts?: SiteSettingsContacts,
  mapUrl?: string,
): ContactDetailItem[] {
  if (!contacts) return [];

  const details: ContactDetailItem[] = [];

  if (contacts.email) {
    details.push({
      label: "البريد الإلكتروني",
      value: contacts.email,
      href: `mailto:${contacts.email}`,
      icon: Mail,
      valueDir: "ltr",
    });
  }

  if (contacts.full_phone) {
    details.push({
      label: "الهاتف",
      value: contacts.full_phone,
      href: `tel:${contacts.full_phone.replace(/\s/g, "")}`,
      icon: Phone,
      valueDir: "ltr",
    });
  }

  if (contacts.whatsapp) {
    const whatsappDigits = contacts.whatsapp.replace(/\D/g, "");
    details.push({
      label: "واتساب",
      value: contacts.whatsapp,
      href: whatsappDigits ? `https://wa.me/${whatsappDigits}` : undefined,
      icon: MessageCircle,
      valueDir: "ltr",
    });
  }

  if (contacts.address) {
    details.push({
      label: "الموقع",
      value: contacts.address,
      href: mapUrl,
      icon: MapPin,
      openInNewTab: Boolean(mapUrl),
    });
  }

  return details;
}
