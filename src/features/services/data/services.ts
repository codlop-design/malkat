import type { ServiceCategoryId } from "@/src/features/services/types";

export type ServiceItem = {
  id: string;
  category: Exclude<ServiceCategoryId, "all">;
  title: string;
  description: string;
  imageSrc: string;
  href: string;
  tags: string[];
};

export type ServiceStat = {
  id: string;
  value: string;
  label: string;
  icon: string;
};

export const SERVICE_STATS: ServiceStat[] = [
  {
    id: "consultations",
    value: "+350",
    label: "الاستشارات التعليمية",
    icon: "📖",
  },
  { id: "programs", value: "+350", label: "البرامج التفاعلية", icon: "📖" },
  { id: "workshops", value: "5", label: "ورش العمل", icon: "🗂️" },
  {
    id: "initiatives",
    value: "3 - 12",
    label: "المبادرات المجتمعية",
    icon: "🧒",
  },
];

const IMG =
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80";

const BASE = {
  title: "إستشارة التطور المعرفي",
  description:
    "خدمة مخصصة لتقييم وتوجيه مهارات الطفل المعرفية باستخدام تقنيات حديثة",
  imageSrc: IMG,
  tags: ["أونلاين", "مجانية"],
};

export const SERVICES: ServiceItem[] = [
  {
    id: "svc-1",
    category: "consultations",
    ...BASE,
    href: "/services/cognitive-consultation",
  },
  {
    id: "svc-2",
    category: "consultations",
    ...BASE,
    href: "/services/learning-assessment",
  },
  {
    id: "svc-3",
    category: "programs",
    ...BASE,
    title: "برنامج المهارات التفاعلية",
    href: "/services/interactive-skills",
  },
  {
    id: "svc-4",
    category: "programs",
    ...BASE,
    title: "برنامج القراءة المبكرة",
    href: "/services/early-reading",
  },
  {
    id: "svc-5",
    category: "workshops",
    ...BASE,
    title: "ورشة الإبداع الفني",
    href: "/services/art-workshop",
  },
  {
    id: "svc-6",
    category: "workshops",
    ...BASE,
    title: "ورشة العلوم الممتعة",
    href: "/services/science-workshop",
  },
  {
    id: "svc-7",
    category: "initiatives",
    ...BASE,
    title: "مبادرة التعلم المجتمعي",
    href: "/services/community-learning",
  },
  {
    id: "svc-8",
    category: "initiatives",
    ...BASE,
    title: "مبادرة دعم الأسر",
    href: "/services/family-support",
  },
];

/** مؤقت: يعرض كل الخدمات حتى ربط التصفية بالـ API */
export function filterServicesByCategory(
  _category: ServiceCategoryId,
): ServiceItem[] {
  return SERVICES;
}
