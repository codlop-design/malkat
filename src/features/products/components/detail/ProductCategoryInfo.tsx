import ActivityInfo from "@/src/features/products/components/detail/ActivityInfo";
import BookInfo from "@/src/features/products/components/detail/BookInfo";
import CourseInfo from "@/src/features/products/components/detail/CourseInfo";
import GuideInfo from "@/src/features/products/components/detail/GuideInfo";
import ServiceInfo from "@/src/features/products/components/detail/ServiceInfo";
import type { CatalogProduct } from "@/src/features/products/data/catalogAccess";
import type { ProductDetailMeta } from "@/src/features/products/data/productDetail";
import type { CatalogSectionKey } from "@/src/features/products/types";

type ProductCategoryInfoProps = {
  category: CatalogSectionKey;
  data: CatalogProduct["data"];
  detail: ProductDetailMeta;
};

export default function ProductCategoryInfo({
  category,
  data,
  detail,
}: ProductCategoryInfoProps) {
  switch (category) {
    case "books":
      return <BookInfo data={data} detail={detail} />;
    case "courses":
      return <CourseInfo data={data} detail={detail} />;
    case "activities":
      return <ActivityInfo data={data} detail={detail} />;
    case "services":
      return <ServiceInfo data={data} detail={detail} />;
    case "guides":
      return <GuideInfo data={data} detail={detail} />;
    default:
      return null;
  }
}
