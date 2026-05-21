import PageHeader from "@/src/components/PageHeader";
import { RegisterInterestPageContent } from "@/src/features/register-interest";

export default function RegisterYourInterestPage() {
  return (
    <>
      <PageHeader
        title="سجل إهتمامك"
        breadcrumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "سجل الإهتمام" },
        ]}
      />
      <RegisterInterestPageContent />
    </>
  );
}
