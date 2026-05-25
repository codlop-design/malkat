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

function isFreePrice(price: string): boolean {
  return price === "مجاني" || price.includes("مجاني");
}

function mapBookItem(item: BookApiItem): BookCardProps {
  return {
    id: String(item.id),
    slug: item.slug,
    title: item.title,
    description: item.overview,
    author: item.contributor.name,
    imageSrc: item.image,
    free: isFreePrice(item.price),
    ageRange: item.age_group,
    level: item.difficulty,
  };
}

function mapCourseItem(item: CourseApiItem): CourseCardProps {
  const sessions =
    item.lessons_count > 0
      ? `${item.lessons_count} دروس`
      : item.period;

  return {
    id: String(item.id),
    slug: item.slug,
    title: item.title,
    description: item.overview,
    imageSrc: item.image,
    instructorName: item.contributor.name,
    instructorAvatar: item.contributor.image,
    duration: item.period,
    sessions,
    free: isFreePrice(item.price),
    online: item.session_type.includes("أونلاين"),
  };
}

function mapServiceItem(item: ServiceApiItem): ServiceCardProps {
  const tags = [
    item.is_free ? "مجانية" : `${item.price} ر.س`,
    item.session_type,
  ];

  return {
    id: String(item.id),
    slug: item.slug,
    title: item.title,
    description: item.overview,
    imageSrc: item.image,
    tags,
    rating: item.rate_average > 0 ? item.rate_average : undefined,
  };
}

function mapActivityItem(item: ActivityApiItem): ActivityCardProps {
  return {
    id: String(item.id),
    slug: item.slug,
    title: item.title,
    description: item.overview,
    imageSrc: item.image,
    ageRange: item.age_group,
    activityType: item.participant_type,
    rating: item.rate_average > 0 ? item.rate_average : undefined,
  };
}

function mapEvidenceItem(item: EvidenceApiItem): GuideCardProps {
  return {
    id: String(item.id),
    slug: item.slug,
    title: item.title,
    description: item.overview,
    imageSrc: item.image,
    pages: `${item.page_count} صفحة`,
    tags: [isFreePrice(item.price) ? "مجاني" : item.price],
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
