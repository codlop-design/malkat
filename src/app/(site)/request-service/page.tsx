import PageHeader from "@/src/components/PageHeader";
import { getServiceRequestFormOptions } from "@/src/features/request-service/api/getServiceRequestFormOptions";
import { getServiceRequestPageContent } from "@/src/features/request-service/api/getServiceRequestPageContent";
import { RequestServicePageContent } from "@/src/features/request-service";
import type { ServiceRequestPageContent } from "@/src/features/request-service/types";

const EMPTY_PAGE_CONTENT: ServiceRequestPageContent = {
  start: { title: "ابدأ طلب خدمتك التعليمية", content: "", items: [] },
  whyUs: { title: "لماذا تختار خدماتنا؟", content: "", items: [] },
  services: { title: "خدماتنا التعليمية", content: "", items: [] },
};

export default async function RequestServicePage() {
  const [pageContent, formOptions] = await Promise.all([
    getServiceRequestPageContent(),
    getServiceRequestFormOptions(),
  ]);

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
      <RequestServicePageContent
        content={pageContent ?? EMPTY_PAGE_CONTENT}
        formOptions={formOptions}
      />
    </>
  );
}
