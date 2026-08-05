import type { BookCardProps } from "@/src/features/products/components/cards/BookCard";
import type { CourseCardProps } from "@/src/features/products/components/cards/CourseCard";
import type { GuideCardProps } from "@/src/features/products/components/cards/GuideCard";
import type { CatalogPagination } from "@/src/features/products/types/catalogApi";

export type ProductBundleType = "book" | "evidence" | "course";

export type ProductBundleApiItem = {
  id: string | number;
  slug: string;
  title: string;
  subtitle: string | null;
  age_group: string | null;
  image: string;
  product_type: ProductBundleType;
};

export type ProductBundleApiProduct = {
  id: string | number;
  slug: string;
  title: string;
  overview?: string | null;
  image: string;
  age_group?: string | null;
  difficulty?: string | null;
  price?: string | number | null;
  direct_join?: boolean | null;
  is_free?: boolean | null;
  page_count?: number | null;
  evidence_count?: string | null;
  execution_time?: string | null;
  education_type?: string | null;
  session_type?: string | null;
  period?: string | null;
  lessons_count?: number | null;
  stages_count?: string | null;
  contributor?: {
    name?: string | null;
    image?: string | null;
  } | null;
  is_bought?: boolean;
  is_favourite?: boolean;
  is_rated?: boolean;
  rate?: {
    avg_rate?: number | null;
    count?: number | null;
  } | null;
  product_type?: ProductBundleType;
};

export type ProductBundleDetailsApiItem = ProductBundleApiItem & {
  products: ProductBundleApiProduct[];
};

export type ProductBundle = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  ageGroup?: string;
  imageSrc: string;
  productType: ProductBundleType;
  productsCount?: number;
};

export type ProductBundleProduct =
  | (BookCardProps & { category: "books" })
  | (GuideCardProps & { category: "guides" })
  | (CourseCardProps & { category: "courses" });

export type ProductBundleDetails = ProductBundle & {
  products: ProductBundleProduct[];
};

export type ProductBundleListResult = {
  items: ProductBundleDetails[];
  pagination: CatalogPagination;
};
