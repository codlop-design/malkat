import { getAllCatalogLists } from "@/src/features/products/api/getCatalogList";
import DiscoverSectionClient from "@/src/features/products/components/DiscoverSectionClient";

export default async function DiscoverSection() {
  const catalogItems = await getAllCatalogLists();

  return <DiscoverSectionClient catalogItems={catalogItems} />;
}
