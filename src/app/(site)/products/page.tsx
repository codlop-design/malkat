import { getAllCatalogLists } from "@/src/features/products/api/getCatalogList";
import DiscoverSectionClient from "@/src/features/products/components/DiscoverSectionClient";
import PageHeader from "@/src/components/PageHeader";
import StartJourney from "@/src/features/products/components/StartJourney";

export const revalidate = 60;

type PageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function ProductsPage({ searchParams }: PageProps) {
  const { category } = await searchParams;
  const catalogItems = await getAllCatalogLists();

  return (
    <>
      <PageHeader
        title="المنتجات"
        breadcrumbs={[{ label: "الرئيسية", href: "/" }, { label: "المنتجات" }]}
      />

      <DiscoverSectionClient
        catalogItems={catalogItems}
        initialCategory={category}
      />

      <StartJourney />
    </>
  );
}
