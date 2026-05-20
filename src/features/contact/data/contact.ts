import type { LucideIcon } from "lucide-react";
import { Mail, MapPin, Phone } from "lucide-react";

export type ContactInfoItem = {
  id: string;
  title: string;
  icon: LucideIcon;
  lines: { text: string; href?: string; icon?: "phone" | "whatsapp" }[];
};

export const CONTACT_INFO: ContactInfoItem[] = [
  {
    id: "address",
    title: "العنوان",
    icon: MapPin,
    lines: [
      {
        text: "شارع عبدالله بن سهيل الحارثي، المنطقة الشرقية، الدمام",
      },
    ],
  },
  {
    id: "email",
    title: "البريد الإلكتروني",
    icon: Mail,
    lines: [
      {
        text: "examplemor123@gmail.com",
        href: "mailto:examplemor123@gmail.com",
      },
    ],
  },
  {
    id: "phones",
    title: "أرقام التواصل",
    icon: Phone,
    lines: [
      { text: "+966 50 123 4567", href: "tel:+966501234567", icon: "whatsapp" },
      { text: "+966 13 123 4567", href: "tel:+966131234567", icon: "phone" },
    ],
  },
];

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "interest",
    question: "كيف يمكنني تسجيل الاهتمام؟",
    answer:
      "يمكنك تعبئة نموذج التواصل واختيار «استفسار»، أو الضغط على «سجل اهتمامك» من الصفحة الرئيسية. سيتواصل معك فريقنا خلال يومي عمل.",
  },
  {
    id: "free",
    question: "هل الخدمات مجانية؟",
    answer:
      "نوفر محتوى ودورات مجانية بالإضافة إلى خدمات مدفوعة. يمكنك تصفّح قسم المنتجات لمعرفة ما هو متاح مجاناً.",
  },
  {
    id: "partnership",
    question: "كيف أطلب شراكة؟",
    answer:
      "اختر «اقتراح» في نموذج التواصل واذكر تفاصيل مؤسستك أو فكرتك. سنراجع طلبك ونعود إليك عبر البريد أو الجوال.",
  },
];

export type SocialLink = {
  id: string;
  label: string;
  href: string;
};

export const SOCIAL_LINKS: SocialLink[] = [
  { id: "tiktok", label: "TikTok", href: "#" },
  { id: "x", label: "X", href: "#" },
  { id: "instagram", label: "Instagram", href: "#" },
  { id: "snapchat", label: "Snapchat", href: "#" },
];
