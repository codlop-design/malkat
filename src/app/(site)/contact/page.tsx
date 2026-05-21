import PageHeader from "@/src/components/PageHeader";
import { ContactPageContent } from "@/src/features/contact";

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="تواصل معنا"
        breadcrumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "تواصل معنا" },
        ]}
      />
      <ContactPageContent />
    </>
  );
}
