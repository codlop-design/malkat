import PageHeader from "@/src/components/PageHeader";
import { PartnershipPageContent } from "@/src/features/partnership-request";
import { getOrganizationTypes } from "@/src/features/register-interest/api/getOrganizationTypes";
import { getPartnershipTypes } from "@/src/features/register-interest/api/getPartnershipTypes";

export default async function RequestPartnershipPage() {
  const [organizationTypes, partnershipTypes] = await Promise.all([
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
        organizationTypes={organizationTypes}
        partnershipTypes={partnershipTypes}
      />
    </>
  );
}
