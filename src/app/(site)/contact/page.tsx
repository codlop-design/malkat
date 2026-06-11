import PageHeader from "@/src/components/PageHeader";
import { getContactPageContent } from "@/src/features/contact/api/getContactPageContent";
import { getContactTypes } from "@/src/features/contact/api/getContactTypes";
import { ContactPageContent } from "@/src/features/contact";
import { getOrganizationTypes } from "@/src/features/register-interest/api/getOrganizationTypes";

export default async function ContactPage() {
  const [contactData, contactTypes, organizationTypes] = await Promise.all([
    getContactPageContent(),
    getContactTypes(),
    getOrganizationTypes(),
  ]);

  return (
    <>
      <PageHeader
        title="تواصل معنا"
        breadcrumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "تواصل معنا" },
        ]}
      />
      <ContactPageContent
        data={contactData}
        contactTypes={contactTypes}
        organizationTypes={organizationTypes}
      />
    </>
  );
}
