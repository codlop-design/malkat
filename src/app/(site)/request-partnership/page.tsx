import PageHeader from "@/src/components/PageHeader";
import { getPartnershipPageContent } from "@/src/features/partnership-request/api/getPartnershipPageContent";
import { PartnershipPageContent } from "@/src/features/partnership-request";
import type { PartnershipPageData } from "@/src/features/partnership-request/types";
import { getOrganizationTypes } from "@/src/features/register-interest/api/getOrganizationTypes";
import { getPartnershipTypes } from "@/src/features/register-interest/api/getPartnershipTypes";

const EMPTY_PAGE_CONTENT: PartnershipPageData = {
  start: {
    title: "لنصنع أثراً تعليمياً أكبر معاً",
    content: "",
    items: [],
  },
  whyUs: {
    title: "لماذا الشراكة معنا؟",
    content: "",
    items: [],
  },
};

export default async function RequestPartnershipPage() {
  const [pageContent, organizationTypes, partnershipTypes] = await Promise.all([
    getPartnershipPageContent(),
    getOrganizationTypes(),
    getPartnershipTypes(),
  ]);

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
      <PartnershipPageContent
        content={pageContent ?? EMPTY_PAGE_CONTENT}
        organizationTypes={organizationTypes}
        partnershipTypes={partnershipTypes}
      />
    </>
  );
}
