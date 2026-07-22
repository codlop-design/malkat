import { getAllCatalogLists } from "@/src/features/products/api/getCatalogList";
import { getCourseBundles } from "@/src/features/products/api/getCourseBundles";
import DiscoverSectionClient from "@/src/features/products/components/DiscoverSectionClient";
import PageHeader from "@/src/components/PageHeader";
import StartJourney from "@/src/features/products/components/StartJourney";

type PageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function ProductsPage({ searchParams }: PageProps) {
  const { category } = await searchParams;
  const [catalogItems, courseBundles] = await Promise.all([
    getAllCatalogLists(),
    getCourseBundles(),
  ]);

  return (
    <>
      <PageHeader
        title="المنتجات"
        breadcrumbs={[{ label: "الرئيسية", href: "/" }, { label: "المنتجات" }]}
      />

      <DiscoverSectionClient
        catalogItems={catalogItems}
        courseBundles={courseBundles?.items ?? []}
        initialCategory={category}
      />

      <StartJourney />
    </>
  );
}
