import PageHeader from "@/src/components/PageHeader";
import { ServicesPageContent } from "@/src/features/services";
import { getServicePageContent } from "@/src/features/services/api/getServicePageContent";
import { getServiceTypes } from "@/src/features/services/api/getServiceTypes";
import { EMPTY_SERVICE_PAGE_CONTENT } from "@/src/features/services/data/servicePageFallback";

export const revalidate = 60;

type PageProps = {
  searchParams: Promise<{ category?: string; page?: string }>;
};

export default async function ServicesPage({ searchParams }: PageProps) {
  const { category, page } = await searchParams;

  const [types, pageContent] = await Promise.all([
    getServiceTypes(),
    getServicePageContent(),
  ]);

  return (
    <>
      <PageHeader
        title="الخدمات"
        breadcrumbs={[{ label: "الرئيسية", href: "/" }, { label: "الخدمات" }]}
      />
      <ServicesPageContent
        category={category}
        page={page}
        types={types}
        pageContent={pageContent ?? EMPTY_SERVICE_PAGE_CONTENT}
      />
    </>
  );
}
