import type { ActivityCardProps } from "@/src/features/products/components/cards/ActivityCard";
import type { BookCardProps } from "@/src/features/products/components/cards/BookCard";
import type { CourseCardProps } from "@/src/features/products/components/cards/CourseCard";
import type { GuideCardProps } from "@/src/features/products/components/cards/GuideCard";
import type { ServiceCardProps } from "@/src/features/products/components/cards/ServiceCard";
import type { CatalogListItem } from "@/src/features/products/data/catalogRegistry";
import type { CatalogSectionKey } from "@/src/features/products/types";
import type {
  ActivityApiItem,
  BookApiItem,
  CatalogApiItem,
  CourseApiItem,
  EvidenceApiItem,
  ServiceApiItem,
} from "@/src/features/products/types/catalogApi";
import {
  parseApiBoolean,
  resolveCatalogSocialFields,
} from "@/src/features/products/utils/catalogSocial";

function cleanOptionalText(value: string | null | undefined): string | undefined {
  const text = value?.trim();
  if (!text || text.toLowerCase() === "null") return undefined;
  return text;
}

function cleanText(value: string | null | undefined, fallback = ""): string {
  return cleanOptionalText(value) ?? fallback;
}

function isFreePrice(price: string | number | null | undefined): boolean {
  const text = cleanText(String(price ?? "")).toLowerCase();
  return text === "free" || text === "مجاني" || text.includes("مجاني");
}

function resolveDirectJoin(
  directJoin: boolean | number | string | null | undefined,
  legacyIsFree: boolean | number | string | null | undefined,
  price: string | number | null | undefined,
): boolean {
  if (directJoin != null) return parseApiBoolean(directJoin);
  if (legacyIsFree != null) return parseApiBoolean(legacyIsFree);
  return isFreePrice(price);
}

function formatLessonsCount(count: number): string | undefined {
  if (count <= 0) return undefined;
  return `${count} درس`;
}

function formatStagesCount(
  count: number | string | null | undefined,
): string | undefined {
  const text = cleanOptionalText(String(count ?? ""));
  if (!text) return undefined;

  const numeric = Number(text);
  if (!Number.isNaN(numeric)) {
    return numeric > 0 ? `${numeric} مرحلة` : undefined;
  }

  return text;
}

function isOnlineSession(sessionType: string | null | undefined): boolean {
  const text = cleanText(sessionType).toLowerCase();
  return (
    text.includes("online") ||
    text.includes("أونلاين") ||
    text.includes("عن بعد") ||
    text.includes("عن بُعد")
  );
}

export function mapBookItem(item: BookApiItem): BookCardProps {
  return {
    id: String(item.id),
    slug: item.slug,
    title: item.title,
    description: item.overview,
    author: item.contributor?.name ?? "",
    authorAvatar: item.contributor?.image ?? "",
    imageSrc: item.image,
    free: resolveDirectJoin(item.direct_join, item.is_free, item.price),
    ageRange: item.age_group ?? undefined,
    level: item.difficulty ?? undefined,
    ...resolveCatalogSocialFields(item),
  };
}

export function mapCourseItem(item: CourseApiItem): CourseCardProps {
  const sessionType = cleanOptionalText(item.session_type);

  return {
    id: String(item.id),
    slug: item.slug,
    title: item.title,
    description: item.overview,
    imageSrc: item.image,
    instructorName: item.contributor?.name ?? "",
    instructorAvatar: item.contributor?.image ?? "",
    duration: item.period,
    sessions:
      formatStagesCount(item.stages_count) ??
      formatLessonsCount(item.lessons_count),
    free: resolveDirectJoin(item.direct_join, item.is_free, item.price),
    online: isOnlineSession(item.session_type),
    sessionType,
    ageRange: cleanOptionalText(item.age_group),
    domain: cleanOptionalText(item.domain),
    ...resolveCatalogSocialFields(item),
  };
}

export function mapServiceItem(item: ServiceApiItem): ServiceCardProps {
  const tags = [
    resolveDirectJoin(item.direct_join, item.is_free, item.price)
      ? "مجانية"
      : `${item.price} ر.س`,
    item.session_type,
  ];

  return {
    id: String(item.id),
    slug: item.slug,
    title: item.title,
    description: item.overview,
    imageSrc: item.image,
    tags,
    ...resolveCatalogSocialFields(item),
  };
}

export function mapActivityItem(item: ActivityApiItem): ActivityCardProps {
  return {
    id: String(item.id),
    slug: item.slug,
    title: item.title,
    description: item.overview,
    imageSrc: item.image,
    ageRange: item.age_group,
    activityType: item.participant_type,
    contributorName: item.contributor?.name ?? "",
    contributorAvatar: item.contributor?.image ?? "",
    ...resolveCatalogSocialFields(item),
  };
}

export function mapEvidenceItem(item: EvidenceApiItem): GuideCardProps {
  return {
    id: String(item.id),
    slug: item.slug,
    title: item.title,
    description: item.overview,
    imageSrc: item.image,
    pages: `${item.page_count} صفحة`,
    tags: [
      resolveDirectJoin(item.direct_join, item.is_free, item.price)
        ? "مجاني"
        : item.price,
    ],
    contributorName: item.contributor?.name ?? "",
    contributorAvatar: item.contributor?.image ?? "",
    ...resolveCatalogSocialFields(item),
  };
}

export function mapCatalogItems(
  category: CatalogSectionKey,
  items: CatalogApiItem[],
): CatalogListItem[] {
  switch (category) {
    case "books":
      return (items as BookApiItem[]).map(mapBookItem);
    case "courses":
      return (items as CourseApiItem[]).map(mapCourseItem);
    case "services":
      return (items as ServiceApiItem[]).map(mapServiceItem);
    case "activities":
      return (items as ActivityApiItem[]).map(mapActivityItem);
    case "guides":
      return (items as EvidenceApiItem[]).map(mapEvidenceItem);
    default:
      return [];
  }
}
