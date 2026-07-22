import type {
  CourseBundle,
  CourseBundleApiItem,
} from "@/src/features/products/types/courseBundle";

export function mapCourseBundle(item: CourseBundleApiItem): CourseBundle {
  return {
    id: String(item.id),
    slug: item.slug,
    title: item.title,
    subtitle: item.subtitle,
    ageGroup: item.age_group,
    imageSrc: item.image,
    coursesCount: item.courses_count,
  };
}
