import type { LucideIcon } from "lucide-react";
import { Mail, MapPin, Phone } from "lucide-react";

import type { SiteSettingsContacts } from "@/src/features/contact/types";

export type ContactInfoLine = {
  text: string;
  href?: string;
  icon?: "whatsapp" | "phone";
};

export type ContactInfoCard = {
  id: string;
  title: string;
  icon: LucideIcon;
  lines: ContactInfoLine[];
};

export function buildContactInfoCards(
  contacts?: SiteSettingsContacts,
): ContactInfoCard[] {
  if (!contacts) return [];

  const cards: ContactInfoCard[] = [];

  if (contacts.email) {
    cards.push({
      id: "email",
      title: "البريد الإلكتروني",
      icon: Mail,
      lines: [
        {
          text: contacts.email,
          href: `mailto:${contacts.email}`,
        },
      ],
    });
  }

  if (contacts.full_phone || contacts.whatsapp) {
    const lines: ContactInfoLine[] = [];

    if (contacts.full_phone) {
      lines.push({
        text: contacts.full_phone,
        href: `tel:${contacts.full_phone.replace(/\s/g, "")}`,
        icon: "phone",
      });
    }

    if (contacts.whatsapp) {
      const whatsappDigits = contacts.whatsapp.replace(/\D/g, "");
      lines.push({
        text: contacts.whatsapp,
        href: whatsappDigits ? `https://wa.me/${whatsappDigits}` : undefined,
        icon: "whatsapp",
      });
    }

    cards.push({
      id: "phones",
      title: "أرقام التواصل",
      icon: Phone,
      lines,
    });
  }

  if (contacts.address) {
    cards.push({
      id: "address",
      title: "العنوان",
      icon: MapPin,
      lines: [{ text: contacts.address }],
    });
  }

  return cards;
}
