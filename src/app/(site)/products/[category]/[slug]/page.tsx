import { loadProductDetailPageData } from "@/src/features/products/api/loadProductDetailPageData";
import ProductDetailPageView from "@/src/features/products/components/detail/ProductDetailPageView";

export const revalidate = 60;

type PageProps = {
  params: Promise<{ category: string; slug: string }>;
};

export default async function ProductDetailPage({ params }: PageProps) {
  const { category, slug } = await params;
  const pageData = await loadProductDetailPageData(category, slug);

  console.log(pageData);

  return <ProductDetailPageView {...pageData} />;
}
