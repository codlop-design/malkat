import { notFound } from "next/navigation";

import PageHeader from "@/src/components/PageHeader";
import { getAllNewsSlugs } from "@/src/features/news/api/getNewsList";
import { getNewsBySlug } from "@/src/features/news/api/getNewsBySlug";
import NewsArticleSection from "@/src/features/news/components/NewsArticleSection";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllNewsSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const news = await getNewsBySlug(slug);

  if (!news) {
    notFound();
  }

  const { article, detail } = news;

  return (
    <>
      <PageHeader
        title={detail.title}
        breadcrumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "الأخبار", href: "/news" },
          { label: "الكل", href: "/news/all" },
          { label: detail.title },
        ]}
      />
      <NewsArticleSection article={article} detail={detail} />
    </>
  );
}
