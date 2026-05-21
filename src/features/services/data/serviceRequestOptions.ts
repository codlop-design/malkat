export const SERVICE_REQUEST_STATS = [
  { id: "schools", value: "+250", label: "مدرسة شريكة", icon: "📖" },
  { id: "institutions", value: "+120", label: "مؤسسة داعمة", icon: "📖" },
  { id: "partners", value: "+80", label: "شريك استراتيجي", icon: "📦" },
  { id: "beneficiaries", value: "+3,000", label: "مستفيد", icon: "🧒" },
] as const;

export const SERVICE_TYPE_OPTIONS = [
  { value: "consultations", label: "استشارات تعليمية" },
  { value: "programs", label: "برامج وورش عمل" },
  { value: "workshops", label: "أنشطة تفاعلية" },
  { value: "children", label: "خدمات للأطفال" },
  { value: "schools", label: "خدمات للمدارس" },
];

export const TARGET_GROUP_OPTIONS = [
  { value: "parents", label: "للآباء" },
  { value: "schools", label: "للمدارس" },
  { value: "children", label: "للأطفال" },
  { value: "teachers", label: "للمعلمين" },
];
