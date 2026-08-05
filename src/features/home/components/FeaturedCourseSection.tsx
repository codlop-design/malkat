"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  CalendarDays,
  GraduationCap,
  MonitorPlay,
  Star,
  UserRound,
} from "lucide-react";

import { Button } from "@/src/components/ui/button";
import AddToCartButton from "@/src/features/cart/components/AddToCartButton";
import { buildCartPayload } from "@/src/features/cart/lib/buildCartPayload";
import { productDetailHref } from "@/src/features/products/types";
import { parseApiBoolean } from "@/src/features/products/utils/catalogSocial";
import {
  fadeUp,
  motionViewport,
  staggerContainer,
} from "@/src/lib/motion";
import type { HomeHomepageCourse } from "../types";

type FeaturedCourseSectionProps = {
  course?: HomeHomepageCourse | null;
};

function isFreePrice(price?: string | null) {
  const normalized = price?.trim().toLowerCase();
  return !normalized || normalized === "free" || normalized === "مجاني";
}

function resolveDirectJoin(
  directJoin?: boolean | number | string | null,
  legacyIsFree?: boolean | number | string | null,
  price?: string | null,
) {
  if (directJoin != null) return parseApiBoolean(directJoin);
  if (legacyIsFree != null) return parseApiBoolean(legacyIsFree);
  return isFreePrice(price);
}

function isOnlineSession(sessionType?: string | null) {
  const normalized = sessionType?.trim().toLowerCase();
  return Boolean(
    normalized &&
      (normalized.includes("online") ||
        normalized.includes("أونلاين") ||
        normalized.includes("عن بُعد") ||
        normalized.includes("عن بعد")),
  );
}

function compactText(value?: string | number | null) {
  if (value == null) return undefined;
  const text = String(value).trim();
  return text || undefined;
}

export default function FeaturedCourseSection({
  course,
}: FeaturedCourseSectionProps) {
  if (!course?.show_on_homepage) {
    return null;
  }

  const href = productDetailHref("courses", course.slug);
  const description = compactText(course.domain) ?? compactText(course.overview) ?? "";
  const priceIsFree = resolveDirectJoin(
    course.direct_join,
    course.is_free,
    course.price,
  );
  const sessionIsOnline = isOnlineSession(course.session_type);
  const lessonsLabel =
    course.lessons_count != null ? `${course.lessons_count} دروس` : undefined;
  const rating = Number(course.rate?.avg_rate ?? 0);
  const ratingCount = Number(course.rate?.count ?? 0);
  const cartPayload = buildCartPayload("courses", {
    slug: course.slug,
    title: course.title,
    description,
    image: course.image,
    isFree: priceIsFree,
    isOnline: sessionIsOnline,
    duration: compactText(course.period),
    sessions: lessonsLabel,
    instructorName: compactText(course.contributor?.name),
    instructorAvatar: compactText(course.contributor?.image),
  });

  return (
    <section className="bg-white py-12">
      <div className="container">
        <motion.article
          className="overflow-hidden rounded-2xl border border-[#E8E8E8] bg-white p-5 shadow-[0_8px_32px_rgba(0,0,0,0.06)] md:p-7 lg:grid lg:grid-cols-[1.12fr_0.88fr] lg:gap-9"
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          variants={staggerContainer(0.1, 0.08)}
        >
          <motion.div
            variants={fadeUp}
            className="flex min-w-0 flex-col justify-center text-right"
          >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#E8F6F4] px-4 py-1.5 text-sm font-medium text-primary">
                <GraduationCap className="size-4" strokeWidth={1.8} />
                برنامج مختار
              </span>
              {rating > 0 ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#FFF7DF] px-3 py-1.5 text-sm font-medium text-black">
                  <Star
                    className="size-4 fill-[#F5B800] text-[#F5B800]"
                    strokeWidth={1.7}
                  />
                  {rating}
                  {ratingCount > 0 ? (
                    <span className="text-xs text-[#717171]">
                      ({ratingCount})
                    </span>
                  ) : null}
                </span>
              ) : null}
            </div>

            <h2 className="text-2xl font-bold leading-snug text-black md:text-3xl">
              {course.title}
            </h2>

            {description ? (
              <p className="mt-4 text-base leading-[1.85] text-[#454545] md:text-lg">
                {description}
              </p>
            ) : null}

            <div className="mt-5 flex flex-wrap gap-2">
              {compactText(course.age_group) ? (
                <span className="rounded-full bg-[#F5EDE4] px-3 py-1 text-sm text-[#454545]">
                  {course.age_group}
                </span>
              ) : null}
              <span className="rounded-full bg-[#E0F5F3] px-3 py-1 text-sm font-medium text-primary">
                {priceIsFree ? "مجانية" : course.price}
              </span>
              {compactText(course.session_type) ? (
                <span className="rounded-full bg-[#F5EDE4] px-3 py-1 text-sm text-[#454545]">
                  {course.session_type}
                </span>
              ) : null}
            </div>

            <div className="mt-6 grid gap-3 text-sm text-[#454545] sm:grid-cols-2 lg:grid-cols-3">
              {compactText(course.period) ? (
                <span className="inline-flex items-center gap-2">
                  <CalendarDays
                    className="size-5 text-primary"
                    strokeWidth={1.75}
                  />
                  {course.period}
                </span>
              ) : null}
              {lessonsLabel ? (
                <span className="inline-flex items-center gap-2">
                  <BookOpen
                    className="size-5 text-primary"
                    strokeWidth={1.75}
                  />
                  {lessonsLabel}
                </span>
              ) : null}
              {compactText(course.session_type) ? (
                <span className="inline-flex items-center gap-2">
                  <MonitorPlay
                    className="size-5 text-primary"
                    strokeWidth={1.75}
                  />
                  {course.session_type}
                </span>
              ) : null}
            </div>

            {course.contributor ? (
              <div className="mt-6 flex items-center gap-3 rounded-2xl bg-[#FAFAFA] p-4">
                <div className="relative size-12 shrink-0 overflow-hidden rounded-full bg-white">
                  {course.contributor.image ? (
                    <Image
                      src={course.contributor.image}
                      alt=""
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  ) : (
                    <UserRound
                      className="m-3 size-6 text-primary"
                      strokeWidth={1.75}
                    />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-black">
                    {course.contributor.name}
                  </p>
                  {course.contributor.job_title ? (
                    <p className="mt-1 text-sm text-[#717171]">
                      {course.contributor.job_title}
                    </p>
                  ) : null}
                </div>
              </div>
            ) : null}

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <Button
                asChild
                className="h-12 rounded-xl bg-primary text-base text-white hover:bg-primary/90"
              >
                <Link href={href}>عرض البرنامج</Link>
              </Button>
              {!course.is_bought ? (
                <AddToCartButton
                  payload={cartPayload}
                  label="طلب المنتج"
                  variant="button"
                  className="h-12 rounded-xl text-base"
                />
              ) : null}
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="relative mt-8 aspect-4/3 overflow-hidden rounded-2xl bg-[#E8F6F4] lg:mt-0"
          >
            <Link href={href} aria-label={course.title}>
              <Image
                src={course.image}
                alt={course.title}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </Link>
          </motion.div>
        </motion.article>
      </div>
    </section>
  );
}
