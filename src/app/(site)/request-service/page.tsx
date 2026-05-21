import PageHeader from "@/src/components/PageHeader";
import { RequestServicePageContent } from "@/src/features/request-service";

export default function RequestServicePage() {
  return (
    <>
      <PageHeader
        title="طلب خدمة"
        breadcrumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "الخدمات", href: "/services" },
          { label: "طلب خدمة" },
        ]}
      />
      <RequestServicePageContent />
    </>
  );
}
