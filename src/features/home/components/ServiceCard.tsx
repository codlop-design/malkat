import Image from "next/image";
import type { HomeDiscoverItem } from "../types";

type ServiceCardProps = HomeDiscoverItem & {
  featured?: boolean;
};

export default function ServiceCard({
  title,
  description,
  image,
  featured = false,
}: ServiceCardProps) {
  return (
    <article
      className={`flex h-full flex-col items-center gap-4 rounded-3xl px-5 py-8 text-center transition-colors ${
        featured ? "bg-primary text-white" : "bg-[#E8F6F4] text-[#1F1F1F]"
      }`}
    >
      <div className="flex size-14 items-center justify-center rounded-full bg-white">
        <Image
          src={image}
          alt=""
          width={28}
          height={28}
          className="size-7 object-contain"
          aria-hidden
        />
      </div>

      <div className="flex flex-col gap-2">
        <h3
          className={`text-lg font-bold leading-snug ${
            featured ? "text-white" : "text-black"
          }`}
        >
          {title}
        </h3>
        <p
          className={`text-sm leading-relaxed ${
            featured ? "text-white/90" : "text-[#454545]"
          }`}
        >
          {description}
        </p>
      </div>
    </article>
  );
}
