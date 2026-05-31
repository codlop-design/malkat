import { getAllCatalogLists } from "@/src/features/products/api/getCatalogList";
import DiscoverSectionClient from "@/src/features/products/components/DiscoverSectionClient";

type DiscoverSectionProps = {
  initialCategory?: string | null;
};

export default async function DiscoverSection({
  initialCategory = null,
}: DiscoverSectionProps = {}) {
  const catalogItems = await getAllCatalogLists();

  return (
    <DiscoverSectionClient
      catalogItems={catalogItems}
      initialCategory={initialCategory}
    />
  );
}
