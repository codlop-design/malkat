export const ENTITY_TYPE_OPTIONS = [
  { value: "school", label: "مدرسة" },
  { value: "university", label: "جامعة" },
  { value: "company", label: "شركة" },
  { value: "ngo", label: "منظمة غير ربحية" },
  { value: "government", label: "جهة حكومية" },
  { value: "other", label: "أخرى" },
] as const;

export const PARTNERSHIP_TYPE_OPTIONS = [
  { value: "educational", label: "شراكة تعليمية" },
  { value: "content", label: "توزيع محتوى" },
  { value: "sponsorship", label: "رعاية" },
  { value: "pilot", label: "برنامج تجريبي" },
  { value: "other", label: "أخرى" },
] as const;
