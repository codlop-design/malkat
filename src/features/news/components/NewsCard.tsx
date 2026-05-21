import Image from "next/image";

import ReadMoreLink from "@/src/features/news/components/ReadMoreLink";
import type { NewsArticle } from "@/src/features/news/types";

type NewsCardProps = {
  article: NewsArticle;
};

export default function NewsCard({ article }: NewsCardProps) {
  const { slug, title, excerpt, date, imageSrc } = article;

  return (
    <article
      className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_20px_rgba(0,0,0,0.06)]"
      dir="rtl"
    >
      <div className="relative aspect-4/3 w-full">
        <Image
          src={imageSrc}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 text-right">
        <time className="text-xs text-[#717171] md:text-sm">{date}</time>
        <h3 className="mt-2 line-clamp-2 text-base font-bold leading-snug text-black md:text-lg">
          {title}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-[#717171]">
          {excerpt}
        </p>
        <div className="mt-5 flex justify-center">
          <ReadMoreLink href={`/news/all/${slug}`} variant="pill" />
        </div>
      </div>
    </article>
  );
}
