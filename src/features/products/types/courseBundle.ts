import type { CourseCardProps } from "@/src/features/products/components/cards/CourseCard";
import type { CatalogPagination } from "@/src/features/products/types/catalogApi";

export type CourseBundleApiItem = {
  id: string | number;
  slug: string;
  title: string;
  subtitle: string;
  age_group: string | null;
  image: string;
  courses_count: number;
};

export type CourseBundle = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  ageGroup?: string;
  imageSrc: string;
  coursesCount: number;
};

export type CourseBundleListResult = {
  items: CourseBundle[];
  pagination: CatalogPagination;
};

export type CourseBundleCourse = CourseCardProps;
