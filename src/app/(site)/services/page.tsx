import PageHeader from "@/src/components/PageHeader";
import { ServicesPageContent } from "@/src/features/services";

export const revalidate = 60;

type PageProps = {
  searchParams: Promise<{ category?: string; page?: string }>;
};

export default async function ServicesPage({ searchParams }: PageProps) {
  const { category, page } = await searchParams;

  return (
    <>
      <PageHeader
        title="الخدمات"
        breadcrumbs={[{ label: "الرئيسية", href: "/" }, { label: "الخدمات" }]}
      />
      <ServicesPageContent category={category} page={page} />
    </>
  );
}
