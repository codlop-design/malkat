"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  Calendar,
  GraduationCap,
  Loader2,
  Star,
  UsersRound,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

import AddToCartButton from "@/src/features/cart/components/AddToCartButton";
import { buildCartPayload } from "@/src/features/cart/lib/buildCartPayload";
import { useAuth } from "@/src/features/auth/context/AuthProvider";
import { getCourseBundleCoursesClient } from "@/src/features/products/api/getCourseBundleCoursesClient";
import { getProductSocialClient } from "@/src/features/products/api/getProductSocialClient";
import FavouriteButton from "@/src/features/products/components/FavouriteButton";
import { useFavourites } from "@/src/features/products/context/FavouritesProvider";
import { useProductIsBought } from "@/src/features/products/hooks/useProductIsBought";
import type {
  CourseBundle,
  CourseBundleCourse,
} from "@/src/features/products/types/courseBundle";
import { productDetailHref } from "@/src/features/products/types";

type CourseBundleModalProps = {
  bundle: CourseBundle;
  open: boolean;
  onClose: () => void;
};

export default function CourseBundleModal({
  bundle,
  open,
  onClose,
}: CourseBundleModalProps) {
  const [courses, setCourses] = useState<CourseBundleCourse[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [syncingPurchaseSlugs, setSyncingPurchaseSlugs] = useState<Set<string>>(
    () => new Set(),
  );
  const lastPurchaseSyncKeyRef = useRef("");
  const { isAuthenticated, isAuthReady } = useAuth();
  const { setProductBought } = useFavourites();
  const isLoading = open && !hasLoaded;
  const hasAgeGroup = Boolean(bundle.ageGroup);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, handleClose]);

  useEffect(() => {
    if (!open || hasLoaded) return;

    let active = true;

    getCourseBundleCoursesClient(bundle.slug)
      .then((items) => {
        if (!active) return;
        setCourses(items);
        setHasLoaded(true);
      })
      .catch(() => {
        if (!active) return;
        setCourses([]);
        setHasLoaded(true);
      });

    return () => {
      active = false;
    };
  }, [bundle.slug, hasLoaded, open]);

  useEffect(() => {
    if (!open) {
      lastPurchaseSyncKeyRef.current = "";
      return;
    }

    if (!hasLoaded || !isAuthReady || !isAuthenticated || courses.length === 0) {
      return;
    }

    const syncKey = `${bundle.slug}:${courses.map((course) => course.slug).join("|")}`;
    if (lastPurchaseSyncKeyRef.current === syncKey) return;
    lastPurchaseSyncKeyRef.current = syncKey;

    let active = true;
    const slugs = courses.map((course) => course.slug);

    queueMicrotask(() => {
      if (active) {
        setSyncingPurchaseSlugs(new Set(slugs));
      }
    });

    Promise.all(
      slugs.map(async (slug) => {
        const social = await getProductSocialClient("courses", slug);
        if (social) {
          setProductBought("courses", slug, social.isBought);
        }
        return { slug, isBought: social?.isBought };
      }),
    )
      .then((results) => {
        if (!active) return;

        const purchases = new Map(
          results
            .filter((result) => result.isBought != null)
            .map((result) => [result.slug, result.isBought === true]),
        );

        setCourses((current) =>
          current.map((course) =>
            purchases.has(course.slug)
              ? { ...course, isBought: purchases.get(course.slug) }
              : course,
          ),
        );
      })
      .finally(() => {
        if (!active) return;
        setSyncingPurchaseSlugs(new Set());
      });

    return () => {
      active = false;
    };
  }, [
    bundle.slug,
    courses,
    hasLoaded,
    isAuthReady,
    isAuthenticated,
    open,
    setProductBought,
  ]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-200 bg-black/45 backdrop-blur-[4px]"
            onClick={handleClose}
            aria-label="إغلاق"
          />

          <div className="pointer-events-none fixed inset-0 z-201 flex items-center justify-center p-2 sm:p-5">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={`course-bundle-${bundle.id}`}
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto grid max-h-[94vh] w-full max-w-7xl grid-rows-[220px_auto] overflow-hidden rounded-[24px] bg-white shadow-[0_24px_72px_rgba(0,0,0,0.24)] sm:grid-rows-[260px_auto] lg:max-h-[90vh] lg:grid-cols-[0.9fr_1.5fr] lg:grid-rows-none"
              dir="rtl"
              onClick={(event) => event.stopPropagation()}
            >
              <aside className="relative min-h-0 overflow-hidden bg-[#0E3F3A] text-white">
                <Image
                  src={bundle.imageSrc}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="480px"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#0E3F3A] via-[#0E3F3A]/72 to-[#0E3F3A]/12" />
                <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-7 lg:p-8">
                  <span className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-white/14 px-3 py-1 text-xs font-semibold backdrop-blur lg:mb-4">
                    <GraduationCap className="size-4" strokeWidth={1.8} />
                    حزمة تعليمية
                  </span>
                  <h2
                    id={`course-bundle-${bundle.id}`}
                    className="max-w-sm text-2xl font-black leading-tight sm:text-3xl lg:text-4xl"
                  >
                    {bundle.title}
                  </h2>
                  <p className="mt-2 max-w-sm text-sm leading-7 text-white/82 lg:mt-3">
                    {bundle.subtitle}
                  </p>
                  <div
                    className={`mt-4 grid gap-3 lg:mt-6 ${
                      hasAgeGroup ? "grid-cols-2" : "grid-cols-1"
                    }`}
                  >
                    {hasAgeGroup ? (
                      <Metric
                        icon={
                          <UsersRound className="size-4" strokeWidth={1.8} />
                        }
                        label={bundle.ageGroup ?? ""}
                      />
                    ) : null}
                    <Metric
                      icon={<BookOpen className="size-4" strokeWidth={1.8} />}
                      label={`${bundle.coursesCount} برنامج`}
                    />
                  </div>
                </div>
              </aside>

              <div className="flex min-h-0 min-w-0 flex-col">
                <div className="flex shrink-0 items-center justify-between border-b border-[#ECECEC] px-5 py-4 sm:px-6 lg:px-8">
                  <div>
                    <p className="text-xs font-semibold text-primary">
                      برامج الحزمة
                    </p>
                    <h3 className="mt-1 text-lg font-bold text-black">
                      {bundle.title}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex size-9 items-center justify-center rounded-full bg-[#F5F5F5] text-[#454545] transition-colors hover:bg-[#E9F6F4] hover:text-primary"
                    aria-label="إغلاق"
                  >
                    <X className="size-5" strokeWidth={1.8} />
                  </button>
                </div>

                <div className="min-h-0 bg-[#FAFAFA] p-5 sm:p-6 lg:p-8">
                  {isLoading ? (
                    <div className="flex min-h-[280px] items-center justify-center">
                      <Loader2
                        className="size-8 animate-spin text-primary"
                        strokeWidth={1.8}
                        aria-hidden
                      />
                    </div>
                  ) : courses.length > 0 ? (
                    <div className="-mx-5 overflow-x-auto overflow-y-hidden px-5 pb-3 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 [scrollbar-color:#008075_#E7ECEB] [scrollbar-width:thin] [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary/75 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-[#E7ECEB]">
                      <div className="flex w-max snap-x snap-mandatory items-start gap-5">
                        {courses.map((course) => (
                          <BundleCourseItem
                            key={course.slug}
                            course={course}
                            onNavigate={handleClose}
                            isSyncingPurchase={syncingPurchaseSlugs.has(
                              course.slug,
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="rounded-2xl bg-white p-8 text-center text-sm text-[#717171]">
                      لا توجد برامج متاحة داخل هذه الحزمة.
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

function Metric({
  icon,
  label,
}: {
  icon: ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-2xl bg-white/13 px-3 py-3 text-sm font-semibold backdrop-blur">
      {icon}
      <span className="min-w-0 truncate">{label}</span>
    </div>
  );
}

function BundleCourseItem({
  course,
  onNavigate,
  isSyncingPurchase,
}: {
  course: CourseBundleCourse;
  onNavigate: () => void;
  isSyncingPurchase: boolean;
}) {
  const href = productDetailHref("courses", course.slug);
  const { isAuthenticated, isAuthReady } = useAuth();
  const { isReady, hasPurchase } = useFavourites();
  const purchased = useProductIsBought("courses", course.slug, course.isBought);
  const isResolvingPurchase =
    isSyncingPurchase ||
    isAuthenticated &&
    isAuthReady &&
    (!isReady || !hasPurchase("courses", course.slug));
  const cartPayload = buildCartPayload("courses", {
    slug: course.slug,
    title: course.title,
    description: course.description,
    image: course.imageSrc,
    isFree: course.free,
    isOnline: course.online,
    duration: course.duration,
    sessions: course.sessions,
    instructorName: course.instructorName,
    instructorAvatar: course.instructorAvatar,
  });

  return (
    <article className="relative flex min-h-[410px] w-[250px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_16px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)] sm:w-[268px] lg:w-[280px]">
      <Link
        href={href}
        onClick={onNavigate}
        className="absolute inset-0 z-0 rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        aria-label={course.title}
      />
      <div className="relative z-1 flex h-full flex-col pointer-events-none [&_a]:pointer-events-auto [&_button]:pointer-events-auto">
        <div className="relative aspect-4/3 w-full shrink-0 overflow-hidden">
          <Image
            src={course.imageSrc}
            alt=""
            fill
            className="object-cover"
            sizes="300px"
          />
          <FavouriteButton
            category="courses"
            slug={course.slug}
            syncMode="product"
            className="absolute top-3 inset-s-3 z-10 size-9"
          />
          {isResolvingPurchase ? (
            <button
              type="button"
              disabled
              className="absolute bottom-3 inset-e-3 z-10 flex size-10 items-center justify-center rounded-full bg-primary text-white shadow-md"
              aria-label="جاري التحقق من حالة المنتج"
              aria-busy="true"
            >
              <Loader2 className="size-5 animate-spin" strokeWidth={1.8} />
            </button>
          ) : !purchased ? (
            <AddToCartButton
              payload={cartPayload}
              label="طلب المنتج"
              className="absolute bottom-3 inset-e-3 z-10 size-10"
            />
          ) : null}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-3 p-4 text-right sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              {course.free ? (
                <span className="rounded-full bg-[#E0F5F3] px-2.5 py-0.5 text-xs font-medium text-primary">
                  مجانية
                </span>
              ) : null}
              {course.online ? (
                <span className="rounded-full bg-[#F5EDE4] px-2.5 py-0.5 text-xs text-[#454545]">
                  أونلاين
                </span>
              ) : null}
            </div>
            {course.rating ? (
              <span className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-[#E8F4FC] px-2 py-1 text-sm font-medium text-[#1F1F1F]">
                <Star className="size-4 fill-[#F5B800] text-[#F5B800]" />
                {course.rating}
              </span>
            ) : null}
          </div>

          {course.instructorName ? (
            <div className="flex items-center gap-2">
              {course.instructorAvatar ? (
                <div className="relative size-8 shrink-0 overflow-hidden rounded-full bg-[#F5F5F5]">
                  <Image
                    src={course.instructorAvatar}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="32px"
                  />
                </div>
              ) : null}
              <span className="min-w-0 truncate text-sm text-[#454545]">
                {course.instructorName}
              </span>
            </div>
          ) : null}

          <h4 className="text-base font-bold text-black">{course.title}</h4>
          <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-[#454545]">
            {course.description}
          </p>

          <div className="mt-auto flex flex-wrap justify-end gap-3 pt-1 text-sm text-[#717171]">
            <span className="inline-flex items-center gap-1">
              <Calendar className="size-3.5" strokeWidth={1.6} />
              {course.duration}
            </span>
            {course.sessions ? (
              <span className="inline-flex items-center gap-1">
                <BookOpen className="size-3.5" strokeWidth={1.6} />
                {course.sessions}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
