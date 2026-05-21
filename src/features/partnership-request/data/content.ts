import type { LucideIcon } from "lucide-react";
import { BookOpen, Building2, Package, Smile } from "lucide-react";

export type PartnershipStat = {
  id: string;
  value: string;
  label: string;
  icon: LucideIcon;
};

export const PARTNERSHIP_STATS: PartnershipStat[] = [
  { id: "schools", value: "+250", label: "مدرسة شريكة", icon: BookOpen },
  {
    id: "institutions",
    value: "+120",
    label: "مؤسسة داعمة",
    icon: Building2,
  },
  {
    id: "strategic",
    value: "+80",
    label: "شريك استراتيجي",
    icon: Package,
  },
  { id: "beneficiaries", value: "+3,000", label: "مستفيد", icon: Smile },
];

export type PartnershipBenefit = {
  id: string;
  number: string;
  title: string;
  description: string;
  iconSrc: string;
};

export const PARTNERSHIP_BENEFITS: PartnershipBenefit[] = [
  {
    id: "access",
    number: "01",
    title: "الوصول إلى فئات أكبر",
    description:
      "نوسّع نطاق وصولكم لشرائح تعليمية متنوعة عبر منصتنا وشبكة شركائنا.",
    iconSrc: "/search-folder.svg",
  },
  {
    id: "initiatives",
    number: "02",
    title: "مبادرات مشتركة",
    description:
      "نصمم برامج ومبادرات تعليمية مشتركة تلبي احتياجات مؤسستكم وجمهوركم.",
    iconSrc: "/learn.svg",
  },
  {
    id: "impact",
    number: "03",
    title: "أثر مجتمعي مستدام",
    description:
      "نبني أثراً طويل الأمد يعزز التعلم ويخدم المجتمع والأسرة والطفل.",
    iconSrc: "/cooperative.svg",
  },
  {
    id: "digital",
    number: "04",
    title: "تجربة رقمية متكاملة",
    description:
      "منصة رقمية آمنة وسهلة الاستخدام تدعم رحلة التعلم من البداية للنهاية.",
    iconSrc: "/rocket.svg",
  },
];
