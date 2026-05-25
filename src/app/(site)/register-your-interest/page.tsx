import PageHeader from "@/src/components/PageHeader";
import { getRegisterInterestFormOptions } from "@/src/features/register-interest/api/getRegisterInterestFormOptions";
import { RegisterInterestPageContent } from "@/src/features/register-interest";

export default async function RegisterYourInterestPage() {
  const formOptions = await getRegisterInterestFormOptions();

  return (
    <>
      <PageHeader
        title="سجل إهتمامك"
        breadcrumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "سجل الإهتمام" },
        ]}
      />
      <RegisterInterestPageContent {...formOptions} />
    </>
  );
}
