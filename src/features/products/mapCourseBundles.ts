import type {
  CourseBundle,
  CourseBundleApiItem,
} from "@/src/features/products/types/courseBundle";

function cleanOptionalText(value: string | null): string | undefined {
  const text = value?.trim();
  if (!text || text.toLowerCase() === "null") return undefined;
  return text;
}

export function mapCourseBundle(item: CourseBundleApiItem): CourseBundle {
  return {
    id: String(item.id),
    slug: item.slug,
    title: item.title,
    subtitle: item.subtitle,
    ageGroup: cleanOptionalText(item.age_group),
    imageSrc: item.image,
    coursesCount: item.courses_count,
  };
}
