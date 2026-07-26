import { getAllCatalogLists } from "@/src/features/products/api/getCatalogList";
import { getCourseBundles } from "@/src/features/products/api/getCourseBundles";
import DiscoverSectionClient from "@/src/features/products/components/DiscoverSectionClient";

type DiscoverSectionProps = {
  initialCategory?: string | null;
};

export default async function DiscoverSection({
  initialCategory = null,
}: DiscoverSectionProps = {}) {
  const [catalogItems, courseBundles] = await Promise.all([
    getAllCatalogLists(),
    getCourseBundles(),
  ]);

  return (
    <DiscoverSectionClient
      catalogItems={catalogItems}
      courseBundles={courseBundles?.items ?? []}
      courseBundlesTotal={courseBundles?.pagination.total}
      initialCategory={initialCategory}
    />
  );
}
