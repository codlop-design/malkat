import PageHeader from "@/src/components/PageHeader";
import { PartnershipPageContent } from "@/src/features/partnership-request";

export default function RequestPartnershipPage() {
  return (
    <>
      <PageHeader
        title="طلب شراكة"
        breadcrumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "من نحن", href: "/about" },
          { label: "طلب شراكة" },
        ]}
      />
      <PartnershipPageContent />
    </>
  );
}
