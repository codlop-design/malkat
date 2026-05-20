import DiscoverSection from "@/src/components/products/DiscoverSection";
import PageHeader from "@/src/components/ui/PageHeader";

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        title="المنتجات"
        breadcrumbs={[{ label: "الرئيسية", href: "/" }, { label: "المنتجات" }]}
      />
      
      <DiscoverSection />
    </>
  );
}
