"use client";

import { BookOpen, Layers3, Sparkles, UsersRound } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import CourseBundleModal from "@/src/features/products/components/course-bundles/CourseBundleModal";
import type { CourseBundle } from "@/src/features/products/types/courseBundle";

type CourseBundleCardProps = {
  bundle: CourseBundle;
  compact?: boolean;
};

export default function CourseBundleCard({
  bundle,
  compact = false,
}: CourseBundleCardProps) {
  const [open, setOpen] = useState(false);
  const hasCourses = bundle.coursesCount > 0;
  const hasAgeGroup = Boolean(bundle.ageGroup);

  function handleOpen() {
    if (!hasCourses) return;
    setOpen(true);
  }

  return (
    <>
      <article
        className={`relative flex h-full min-h-[360px] flex-col overflow-hidden rounded-2xl bg-[#0E3F3A] text-white shadow-[0_18px_42px_rgba(0,128,117,0.18)] transition duration-300 ${
          hasCourses
            ? "hover:-translate-y-1"
            : "cursor-not-allowed opacity-55 grayscale"
        }`}
      >
        <button
          type="button"
          onClick={handleOpen}
          disabled={!hasCourses}
          className={`absolute inset-0 z-10 rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
            hasCourses ? "cursor-pointer" : "cursor-not-allowed"
          }`}
          aria-label={bundle.title}
          aria-disabled={!hasCourses}
        />

        <div className="relative h-48 shrink-0 overflow-hidden">
          <Image
            src={bundle.imageSrc}
            alt=""
            fill
            className="object-cover"
            sizes={compact ? "420px" : "280px"}
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#0E3F3A] via-[#0E3F3A]/40 to-transparent" />
          <div className="absolute top-4 inset-s-4 inline-flex items-center gap-1.5 rounded-full bg-white/92 px-3 py-1 text-xs font-semibold text-[#0E3F3A] shadow-sm">
            <Layers3 className="size-3.5" strokeWidth={1.8} />
            حزمة برامج
          </div>
        </div>

        <div className="relative flex flex-1 flex-col p-5 text-right">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {hasAgeGroup ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/12 px-3 py-1 text-xs font-medium text-white">
                <UsersRound className="size-3.5" strokeWidth={1.8} />
                {bundle.ageGroup}
              </span>
            ) : null}
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                hasCourses
                  ? "bg-[#F7C948] text-[#1F1F1F]"
                  : "bg-white/14 text-white/78"
              }`}
            >
              <BookOpen className="size-3.5" strokeWidth={1.8} />
              {bundle.coursesCount} برنامج
            </span>
          </div>

          <h3 className="text-xl font-bold leading-snug">{bundle.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/78">
            {bundle.subtitle}
          </p>

          <div className="mt-auto pt-5">
            <span
              className={`pointer-events-none inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-bold shadow-[0_10px_24px_rgba(0,0,0,0.16)] ${
                hasCourses
                  ? "bg-white text-primary"
                  : "bg-white/45 text-[#454545]"
              }`}
            >
              <Sparkles className="size-4" strokeWidth={1.9} />
              استعراض البرامج
            </span>
          </div>
        </div>
      </article>

      <CourseBundleModal
        bundle={bundle}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
