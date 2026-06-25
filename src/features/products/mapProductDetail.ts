import type { CatalogProduct } from "@/src/features/products/data/catalogAccess";
import type {
  ProductAccordionItem,
  ProductDetailMeta,
  ProductChapter,
} from "@/src/features/products/data/productDetail";
import {
  buildDetailRatingMeta,
  resolveCoursePurchaseFields,
  resolveDetailSocialFields,
} from "@/src/features/products/utils/catalogSocial";
import {
  mapActivityItem,
  mapBookItem,
  mapCourseItem,
  mapEvidenceItem,
  mapServiceItem,
} from "@/src/features/products/mapCatalogItems";
import { parseWhatLearn } from "@/src/features/products/mapCourseStages";
import type { CatalogSectionKey } from "@/src/features/products/types";
import type {
  ActivityDetailsApi,
  BookDetailsApi,
  CatalogRate,
  CourseDetailsApi,
  EvidenceDetailsApi,
  ProductDetailsApiPayload,
  ServiceDetailsApi,
} from "@/src/features/products/types/catalogApi";

export type ProductDetailView = {
  product: CatalogProduct;
  detail: ProductDetailMeta;
};

function buildRatingMeta(
  rate?: CatalogRate | null,
  legacyRating?: number | null,
): Pick<
  ProductDetailMeta,
  | "reviewCount"
  | "averageRating"
  | "ratingLabel"
  | "ratingDistribution"
  | "reviews"
> {
  return buildDetailRatingMeta(rate, legacyRating);
}

function languageLabel(code: string): string {
  if (code === "ar") return "العربية";
  return code;
}

function mapContentItems(items: unknown[]): ProductChapter[] | undefined {
  if (!Array.isArray(items) || items.length === 0) return undefined;

  return items.map((item, index) => {
    if (typeof item === "string") {
      return { number: index + 1, title: item };
    }

    const record = item as {
      title?: string;
      name?: string;
      lessons?: string[];
      meta?: string;
    };

    return {
      number: index + 1,
      title: record.title ?? record.name ?? `القسم ${index + 1}`,
      meta: record.meta,
      lessons: record.lessons,
    };
  });
}

function mapFeatures(items: unknown[]): string[] | undefined {
  if (!Array.isArray(items) || items.length === 0) return undefined;
  return items.map((item) =>
    typeof item === "string"
      ? item
      : String((item as { title?: string }).title ?? item),
  );
}

function mapBookDetail(slug: string, raw: BookDetailsApi): ProductDetailView {
  const product: CatalogProduct = {
    category: "books",
    data: mapBookItem({
      id: raw.id,
      slug: raw.slug ?? slug,
      title: raw.title,
      overview: raw.overview,
      image: raw.image,
      age_group: raw.age_group,
      difficulty: raw.difficulty,
      price: raw.price,
      contributor: raw.contributor,
      is_favourite: raw.is_favourite,
      is_rated: raw.is_rated,
      rate: raw.rate,
    }),
  };

  const detail: ProductDetailMeta = {
    longDescription: raw.description || raw.overview,
    contributor: raw.contributor,
    accordions: [
      { title: "الوصف التفصيلي", content: raw.description || raw.overview },
      { title: "أهداف الكتاب", content: raw.goals },
    ],
    chapters: mapContentItems(raw.contents),
    bookMeta: {
      pageCount: raw.page_count,
      fileType: raw.file_type,
      language: raw.language,
    },
    ...buildRatingMeta(raw.rate),
    ...resolveDetailSocialFields(raw),
  };

  return { product, detail };
}

function mapCourseDetail(
  slug: string,
  raw: CourseDetailsApi,
): ProductDetailView {
  const product: CatalogProduct = {
    category: "courses",
    data: mapCourseItem({
      id: 0,
      slug,
      title: raw.title,
      overview: raw.overview,
      image: raw.image,
      session_type: raw.session_type,
      price: raw.price,
      period: raw.period,
      lessons_count: raw.lessons_count,
      contributor: {
        name: raw.contributor.name,
        image: raw.contributor.image,
      },
      is_favourite: raw.is_favourite,
      is_rated: raw.is_rated,
      rate: raw.rate,
    }),
  };

  const learningPoints = parseWhatLearn(raw.what_learn);

  const faqAccordions = (raw.faqs ?? [])
    .map((faq) => ({
      title: faq.title ?? faq.question ?? "",
      content: faq.content ?? faq.answer ?? "",
    }))
    .filter((faq) => faq.title && faq.content);

  const detail: ProductDetailMeta = {
    longDescription: raw.overview,
    contributor: {
      name: raw.contributor.name,
      image: raw.contributor.image,
    },
    accordions:
      faqAccordions.length > 0
        ? faqAccordions
        : [
            {
              title: "متطلبات الدورة",
              content: raw.overview,
            },
          ],
    curriculum: mapContentItems(raw.content ?? []),
    learningPoints,
    courseFeatures: mapFeatures(raw.features ?? []),
    courseMeta: {
      hoursCount: raw.hours_count,
      lessonsCount: raw.lessons_count,
      studentsRegistered: raw.students_registered,
      practiceProjects: raw.practice_projects,
      instructorBio: raw.contributor.overview ?? "",
      jobTitle: raw.contributor.job_title ?? "",
    },
    ...resolveCoursePurchaseFields(raw),
    ...buildRatingMeta(raw.rate, raw.rating),
    ...resolveDetailSocialFields(raw),
  };

  return { product, detail };
}

function mapServiceDetail(raw: ServiceDetailsApi): ProductDetailView {
  const base = mapServiceItem({
    id: raw.id,
    slug: raw.slug,
    image: raw.image,
    title: raw.title,
    overview: raw.overview,
    session_type: raw.session_type,
    price: raw.price,
    is_free: raw.is_free,
    rate_average: raw.rate_average,
    is_favourite: raw.is_favourite,
    is_rated: raw.is_rated,
    rate: raw.rate,
  });

  const product: CatalogProduct = {
    category: "services",
    data: {
      ...base,
      tags: [...(base.tags ?? []), raw.age_group, raw.difficulty].filter(
        Boolean,
      ),
    },
  };

  const detail: ProductDetailMeta = {
    longDescription: raw.description || raw.overview,
    contributor: {
      name: raw.contributor.name,
      image: raw.contributor.image,
    },
    accordions: [
      {
        title: "ماذا تشمل الخدمة؟",
        content: raw.description || raw.overview,
      },
    ],
    sessionMeta: {
      duration: raw.session_duration,
      sessionType: raw.session_type,
      target: raw.target,
      isFree: raw.is_free,
    },
    ...buildRatingMeta(raw.rate, raw.rate_average),
    ...resolveDetailSocialFields(raw),
  };

  return { product, detail };
}

function mapActivityDetail(raw: ActivityDetailsApi): ProductDetailView {
  const product: CatalogProduct = {
    category: "activities",
    data: mapActivityItem({
      id: raw.id,
      slug: raw.slug,
      image: raw.image,
      title: raw.title,
      overview: raw.overview,
      age_group: raw.age_group,
      participant_type: raw.participant_type,
      rate_average: raw.rate_average,
      is_favourite: raw.is_favourite,
      is_rated: raw.is_rated,
      rate: raw.rate,
    }),
  };

  const detail: ProductDetailMeta = {
    longDescription: raw.overview || raw.description,
    contributor: {
      name: raw.contributor.name,
      image: raw.contributor.image,
    },
    accordions: [
      {
        title: "ماذا سيتعلم الطفل؟",
        content: raw.description || raw.overview,
      },
    ],
    sessionMeta: {
      duration: raw.session_duration,
      sessionType: raw.session_type,
      target: raw.target,
      isFree: raw.is_free,
    },
    ...buildRatingMeta(raw.rate, raw.rate_average),
    ...resolveDetailSocialFields(raw),
  };

  return { product, detail };
}

function buildGuideAccordions(raw: EvidenceDetailsApi): ProductAccordionItem[] {
  return [
    {
      title: "ماذا يقدم هذا الدليل؟",
      content: raw.description || raw.overview,
    },
    {
      title: "لمن هذا الدليل؟",
      content: raw.for_whom,
    },
    {
      title: "الفئة المستهدفة",
      content: raw.target,
    },
  ].filter((item) => Boolean(item.content?.trim()));
}

function mapEvidenceDetail(raw: EvidenceDetailsApi): ProductDetailView {
  const priceLabel = raw.is_free ? "مجاني" : raw.price_label;

  const product: CatalogProduct = {
    category: "guides",
    data: mapEvidenceItem({
      id: raw.id,
      slug: raw.slug,
      title: raw.title,
      overview: raw.overview,
      image: raw.image,
      price: priceLabel,
      page_count: raw.page_count,
      contributor: raw.contributor,
      is_favourite: raw.is_favourite,
      is_rated: raw.is_rated,
      rate: raw.rate,
    }),
  };

  const detail: ProductDetailMeta = {
    longDescription: raw.description || raw.overview,
    contributor: {
      name: raw.contributor.name,
      image: raw.contributor.image,
      jobTitle: raw.contributor.job_title ?? "",
      bio: raw.contributor.overview ?? "",
    },
    accordions: buildGuideAccordions(raw),
    guideMeta: {
      forWhom: raw.for_whom,
      target: raw.target,
      pageCount: raw.page_count,
    },
    ...buildRatingMeta(raw.rate, raw.rate_average),
    ...resolveDetailSocialFields(raw),
  };

  return { product, detail };
}

export function mapProductDetailResponse(
  category: CatalogSectionKey,
  slug: string,
  payload: ProductDetailsApiPayload,
): ProductDetailView | null {
  switch (category) {
    case "books":
      return "book_details" in payload
        ? mapBookDetail(slug, payload.book_details)
        : null;
    case "courses":
      return "course_details" in payload
        ? mapCourseDetail(slug, payload.course_details)
        : null;
    case "services":
      return "service_details" in payload
        ? mapServiceDetail(payload.service_details)
        : null;
    case "activities":
      return "activity_details" in payload
        ? mapActivityDetail(payload.activity_details)
        : null;
    case "guides":
      return "evidence_details" in payload
        ? mapEvidenceDetail(payload.evidence_details)
        : null;
    default:
      return null;
  }
}
