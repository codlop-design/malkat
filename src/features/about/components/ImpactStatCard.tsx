"use client";

import Image from "next/image";
import {
  Clock,
  GraduationCap,
  User,
  Users,
  type LucideIcon,
} from "lucide-react";
import CountUp from "react-countup";

import type { ImpactItem } from "@/src/features/about/types";

const FALLBACK_ICONS: LucideIcon[] = [GraduationCap, User, Clock, Users];

type ImpactStatCardProps = ImpactItem & {
  index: number;
};

export default function ImpactStatCard({
  icon,
  count,
  title,
  content,
  index,
}: ImpactStatCardProps) {
  const FallbackIcon = FALLBACK_ICONS[index % FALLBACK_ICONS.length] ?? User;

  return (
    <article className="flex h-full flex-col items-center rounded-2xl bg-[#E0F7FA] px-5 py-8 text-center md:rounded-3xl md:px-6 md:py-10">
      <div className="mb-5 flex size-14 items-center justify-center rounded-full bg-primary">
        {icon ? (
          <Image
            src={icon}
            alt=""
            width={28}
            height={28}
            className="size-7 object-contain"
            aria-hidden
          />
        ) : (
          <FallbackIcon
            className="size-7 text-white"
            strokeWidth={1.75}
            aria-hidden
          />
        )}
      </div>

      <p className="text-3xl font-bold text-black md:text-4xl">
        <CountUp
          end={count}
          prefix="+"
          duration={2.5}
          separator=","
          enableScrollSpy
          scrollSpyOnce
        />
      </p>
      <h3 className="mt-2 text-lg font-bold text-black">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[#666666] md:text-base">
        {content}
      </p>
    </article>
  );
}
