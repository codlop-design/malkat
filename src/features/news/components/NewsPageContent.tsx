import { getNewsMain } from "@/src/features/news/api/getNewsMain";
import FeaturedNews from "@/src/features/news/components/FeaturedNews";
import LatestNewsSection from "@/src/features/news/components/LatestNewsSection";

export default async function NewsPageContent() {
  const newsMain = await getNewsMain();

  return (
    <>
      <FeaturedNews article={newsMain?.featured ?? null} />
      <LatestNewsSection articles={newsMain?.latest ?? []} />
    </>
  );
}
