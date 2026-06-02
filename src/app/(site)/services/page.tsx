import PageHeader from "@/src/components/PageHeader";
import { ServicesPageContent } from "@/src/features/services";
import { getServicePageContent } from "@/src/features/services/api/getServicePageContent";
import {
  getServicesList,
  ServicesListResult,
} from "@/src/features/services/api/getServicesList";
import { getServiceTypes } from "@/src/features/services/api/getServiceTypes";
import { ServicePageContent } from "@/src/features/services/types/servicePage";
import { ServiceTypeApiItem } from "@/src/features/services/types";

export const revalidate = 60;

type PageProps = {
  searchParams: Promise<{ category?: string; page?: string }>;
};

export default async function ServicesPage({ searchParams }: PageProps) {
  const { category, page } = await searchParams;
  const [types, pageContent, result] = (await Promise.all([
    getServiceTypes(),
    getServicePageContent(),
    getServicesList(category ?? "all", parseInt(page ?? "1")),
  ])) as [ServiceTypeApiItem[], ServicePageContent, ServicesListResult];

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
        pageContent={pageContent}
        result={result}
      />
    </>
  );
}
