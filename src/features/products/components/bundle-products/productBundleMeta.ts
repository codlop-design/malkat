import type { ProductBundleType } from "@/src/features/products/types/bundleProduct";

export const PRODUCT_BUNDLE_META: Record<
  ProductBundleType,
  {
    chip: string;
    sideChip: string;
    action: string;
    header: string;
    empty: string;
    chipClassName: string;
    sideChipClassName: string;
    countClassName: string;
    ageClassName: string;
    actionClassName: string;
    overlayClassName: string;
    countLabel: (count: number) => string;
  }
> = {
  book: {
    chip: "كتب",
    sideChip: "حزمة تعليمية",
    action: "استعراض الكتب",
    header: "كتب الحزمة",
    empty: "لا توجد كتب متاحة داخل هذه الحزمة.",
    chipClassName:
      "border border-[#F0D47A] bg-[#FFF8DA] text-[#674700]",
    sideChipClassName:
      "border border-[#F7D977]/40 bg-[#F8C84E]/22 text-white shadow-[0_8px_20px_rgba(0,0,0,0.18)]",
    countClassName: "bg-[#F7C948] text-[#1F1F1F]",
    ageClassName: "bg-white/18 text-white ring-1 ring-white/18",
    actionClassName: "bg-white text-[#0E7C74]",
    overlayClassName:
      "from-[#0E3F3A] via-[#0E3F3A]/42 to-[#0E3F3A]/4",
    countLabel: (count) => `${count} ${count === 1 ? "كتاب" : "كتب"}`,
  },
  evidence: {
    chip: "أدلة",
    sideChip: "حزمة إجرائية",
    action: "استعراض الأدلة",
    header: "أدلة الحزمة",
    empty: "لا توجد أدلة متاحة داخل هذه الحزمة.",
    chipClassName:
      "border border-[#A8E1DA] bg-[#EAFBF8] text-[#007369]",
    sideChipClassName:
      "border border-[#9BE0D9]/40 bg-[#008075]/24 text-white shadow-[0_8px_20px_rgba(0,0,0,0.18)]",
    countClassName: "bg-[#BDEEE8] text-[#063F3A]",
    ageClassName: "bg-white/18 text-white ring-1 ring-white/18",
    actionClassName: "bg-white text-[#008075]",
    overlayClassName:
      "from-[#0E3F3A] via-[#0E3F3A]/40 to-[#0E3F3A]/4",
    countLabel: (count) => `${count} ${count === 1 ? "دليل" : "أدلة"}`,
  },
  course: {
    chip: "برامج",
    sideChip: "حزمة تعليمية",
    action: "استعراض البرامج",
    header: "برامج الحزمة",
    empty: "لا توجد برامج متاحة داخل هذه الحزمة.",
    chipClassName:
      "border border-[#C8D9FF] bg-[#F1F6FF] text-[#174C8A]",
    sideChipClassName:
      "border border-[#BCD4FF]/40 bg-[#3568A8]/24 text-white shadow-[0_8px_20px_rgba(0,0,0,0.18)]",
    countClassName: "bg-[#DDE9FF] text-[#163D73]",
    ageClassName: "bg-white/18 text-white ring-1 ring-white/18",
    actionClassName: "bg-white text-[#1D5D9B]",
    overlayClassName:
      "from-[#0E3F3A] via-[#0E3F3A]/42 to-[#0E3F3A]/4",
    countLabel: (count) => `${count} ${count === 1 ? "برنامج" : "برامج"}`,
  },
};
