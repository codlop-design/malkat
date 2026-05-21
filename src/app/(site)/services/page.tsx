import PageHeader from "@/src/components/PageHeader";
import { ServicesPageContent } from "@/src/features/services";

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="الخدمات"
        breadcrumbs={[{ label: "الرئيسية", href: "/" }, { label: "الخدمات" }]}
      />
      <ServicesPageContent />
    </>
  );
}
