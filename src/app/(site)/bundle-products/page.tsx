import PageHeader from "@/src/components/PageHeader";
import { getBundleProducts } from "@/src/features/products/api/getBundleProducts";
import BundleProductsPageContent from "@/src/features/products/components/bundle-products/BundleProductsPageContent";
import StartJourney from "@/src/features/products/components/StartJourney";

export default async function BundleProductsPage() {
  const bundleProducts = await getBundleProducts();

  return (
    <>
      <PageHeader
        title="المنتجات"
        breadcrumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "المنتجات" },
        ]}
      />

      <BundleProductsPageContent bundles={bundleProducts?.items ?? []} />

      <StartJourney />
    </>
  );
}
