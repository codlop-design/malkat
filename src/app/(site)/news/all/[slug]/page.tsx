import { notFound } from "next/navigation";

import PageHeader from "@/src/components/PageHeader";
import NewsArticleSection from "@/src/features/news/components/NewsArticleSection";
import { getAllNewsSlugs, getNewsBySlug } from "@/src/features/news/data/news";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllNewsSlugs().map((slug) => ({ slug }));
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getNewsBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <PageHeader
        title={article.title}
        breadcrumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "الأخبار", href: "/news" },
          { label: "الكل", href: "/news/all" },
          { label: article.title },
        ]}
      />
      <NewsArticleSection article={article} />
    </>
  );
}
