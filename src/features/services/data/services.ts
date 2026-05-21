import type { ServiceCategoryId } from "@/src/features/services/types";

export type ServiceItem = {
  id: string;
  category: Exclude<ServiceCategoryId, "all">;
  slug: string;
  title: string;
  description: string;
  imageSrc: string;
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
    slug: "cognitive-development-consultation",
    ...BASE,
    title: "استشارة التطور المعرفي",
  },
  {
    id: "svc-2",
    category: "consultations",
    slug: "parental-guidance-session",
    ...BASE,
    title: "جلسة توجيه تربوي",
    description:
      "لقاء مع مختص لتقديم نصائح عملية لدعم تعلّم الطفل في المنزل.",
    tags: ["أونلاين", "للآباء"],
  },
  {
    id: "svc-3",
    category: "consultations",
    slug: "educational-level-assessment",
    ...BASE,
    title: "تقييم المستوى التعليمي",
    description:
      "تقرير مفصّل عن نقاط القوة ومجالات التحسين مع خطة متابعة شهرية.",
    tags: ["مجانية", "للمدارس"],
  },
  {
    id: "svc-4",
    category: "programs",
    slug: "early-reading",
    ...BASE,
    title: "برنامج القراءة المبكرة",
  },
  {
    id: "svc-5",
    category: "programs",
    slug: "interactive-skills",
    ...BASE,
    title: "برنامج المهارات التفاعلية",
  },
  {
    id: "svc-6",
    category: "workshops",
    slug: "art-workshop",
    ...BASE,
    title: "ورشة الإبداع الفني",
  },
  {
    id: "svc-7",
    category: "workshops",
    slug: "science-workshop",
    ...BASE,
    title: "ورشة العلوم الممتعة",
  },
  {
    id: "svc-8",
    category: "initiatives",
    slug: "community-learning",
    ...BASE,
    title: "مبادرة التعلم المجتمعي",
  },
  {
    id: "svc-9",
    category: "initiatives",
    slug: "family-support",
    ...BASE,
    title: "مبادرة دعم الأسر",
  },
];

export function filterServicesByCategory(
  category: ServiceCategoryId,
): ServiceItem[] {
  if (category === "all") return SERVICES;
  return SERVICES.filter((s) => s.category === category);
}
