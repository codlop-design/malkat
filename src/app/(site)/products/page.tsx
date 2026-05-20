import { Suspense } from "react";
import { DiscoverSection } from "@/src/features/products";
import PageHeader from "@/src/components/ui/PageHeader";
import StartJourney from "@/src/features/products/components/StartJourney";

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        title="المنتجات"
        breadcrumbs={[{ label: "الرئيسية", href: "/" }, { label: "المنتجات" }]}
      />

      <Suspense fallback={<div className="min-h-[480px]" aria-hidden />}>
        <DiscoverSection />
      </Suspense>

      <StartJourney />
    </>
  );
}
