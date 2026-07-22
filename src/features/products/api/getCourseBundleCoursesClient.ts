import { mapCourseItem } from "@/src/features/products/mapCatalogItems";
import type { CourseBundleCourse } from "@/src/features/products/types/courseBundle";
import type {
  CatalogPagination,
  CourseApiItem,
} from "@/src/features/products/types/catalogApi";
import { apiClient } from "@/src/lib/apiClient";

type CourseBundleCoursesApiResponse = {
  success?: boolean;
  message?: string;
  data?: CourseApiItem[];
  pagination?: CatalogPagination;
};

export async function getCourseBundleCoursesClient(
  slug: string,
): Promise<CourseBundleCourse[]> {
  const { data, status } = await apiClient.get<CourseBundleCoursesApiResponse>(
    `/courses/${slug}`,
    { validateStatus: () => true },
  );

  if (status >= 400 || !data?.success || !Array.isArray(data.data)) {
    return [];
  }

  return data.data.map((item) => ({
    ...mapCourseItem(item),
    category: "courses",
  }));
}
