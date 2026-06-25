"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import { Button } from "@/src/components/ui/button";
import { useAuth } from "@/src/features/auth/context/AuthProvider";
import { getCourseStagesClient } from "@/src/features/products/api/getCourseStagesClient";
import type { CourseStage } from "@/src/features/products/data/courseStages";
import {
  buildNextLessonHref,
  getLessonContentMode,
  getLessonStartMode,
} from "@/src/features/products/lib/courseLessonStart";
import {
  courseLessonDescriptionHref,
  courseLessonQuizHref,
  productDetailHref,
} from "@/src/features/products/types";

type CourseStagesSectionProps = {
  slug: string;
  initialStages: CourseStage[] | null;
};

export default function CourseStagesSection({
  slug,
  initialStages,
}: CourseStagesSectionProps) {
  const searchParams = useSearchParams();
  const openLessonParam = searchParams.get("openLesson");
  const parsedOpenLessonId = useMemo(() => {
    if (!openLessonParam) return null;
    const id = Number(openLessonParam);
    return Number.isNaN(id) ? null : id;
  }, [openLessonParam]);

  const { isAuthenticated, isAuthReady } = useAuth();
  const [stages, setStages] = useState<CourseStage[]>(initialStages ?? []);
  const [requiresAuth, setRequiresAuth] = useState(initialStages === null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [manualOpenStages, setManualOpenStages] = useState<
    string[] | undefined
  >(undefined);

  const apiOpenStages = useMemo(
    () =>
      stages
        .filter((stage) => stage.isActive)
        .map((stage) => `stage-${stage.id}`),
    [stages],
  );

  const openLessonStage = useMemo(() => {
    if (parsedOpenLessonId == null || stages.length === 0) return null;

    const stage = stages.find((item) =>
      item.lessons.some((lesson) => lesson.id === parsedOpenLessonId),
    );

    return stage ? `stage-${stage.id}` : null;
  }, [parsedOpenLessonId, stages]);

  const defaultOpenStages =
    manualOpenStages !== undefined ? manualOpenStages : apiOpenStages;

  const openStages = useMemo(() => {
    if (parsedOpenLessonId != null && openLessonStage) {
      return [...new Set([...defaultOpenStages, openLessonStage])];
    }

    return defaultOpenStages;
  }, [defaultOpenStages, openLessonStage, parsedOpenLessonId]);

  const openedLessonFileRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isAuthReady || !isAuthenticated) return;

    let cancelled = false;

    async function loadStages() {
      setIsRefreshing(true);
      const nextStages = await getCourseStagesClient(slug);

      if (cancelled) return;

      if (nextStages === null) {
        setRequiresAuth(true);
        setStages([]);
      } else if (nextStages.length > 0) {
        setRequiresAuth(false);
        setStages(nextStages);
        setManualOpenStages(undefined);
      }

      setIsRefreshing(false);
    }

    void loadStages();

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, isAuthReady, slug]);

  useEffect(() => {
    if (parsedOpenLessonId == null || stages.length === 0) return;
    if (openedLessonFileRef.current === parsedOpenLessonId) return;

    const lesson = stages
      .flatMap((stage) => stage.lessons)
      .find((item) => item.id === parsedOpenLessonId);

    if (!lesson?.fileUrl || getLessonContentMode(lesson) !== "file") return;

    openedLessonFileRef.current = parsedOpenLessonId;
    window.open(lesson.fileUrl, "_blank", "noopener,noreferrer");
  }, [parsedOpenLessonId, stages]);

  if (!isAuthReady) {
    return (
      <section className="mt-10">
        <h2 className="mb-5 text-xl font-bold text-black">مراحل البرنامج</h2>
        <p className="text-sm text-[#717171]">جاري تحميل مراحل البرنامج...</p>
      </section>
    );
  }

  if (requiresAuth) {
    return (
      <section className="mt-10 rounded-2xl border border-[#E8E8E8] bg-white p-6 md:p-8">
        <h2 className="mb-3 text-xl font-bold text-black">مراحل البرنامج</h2>
        <p className="text-sm leading-relaxed text-[#454545]">
          سجّل الدخول لعرض مراحل البرنامج والدروس والاختبارات.
        </p>
        <Button asChild className="mt-4 h-11 px-6">
          <Link href="/login">تسجيل الدخول</Link>
        </Button>
      </section>
    );
  }

  if (stages.length === 0) {
    return null;
  }

  return (
    <section className="mt-10">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-black">مراحل البرنامج</h2>
        {isRefreshing ? (
          <span className="text-xs text-[#717171]">جاري التحديث...</span>
        ) : null}
      </div>

      <Accordion
        type="multiple"
        value={openStages}
        onValueChange={setManualOpenStages}
        className="flex flex-col gap-3"
      >
        {stages.map((stage, stageIndex) => (
          <AccordionItem
            key={stage.id}
            value={`stage-${stage.id}`}
            className="rounded-xl border border-[#E8E8E8] bg-white px-4"
          >
            <AccordionTrigger className="py-4 text-base font-medium text-black hover:no-underline">
              {stage.title}
            </AccordionTrigger>
            <AccordionContent allowDynamicHeight>
              {stage.lessons.length === 0 ? (
                <p className="pb-2 text-sm text-[#717171]">
                  لا توجد دروس في هذه المرحلة بعد.
                </p>
              ) : (
                <ul className="flex flex-col gap-3 pb-2">
                  {stage.lessons.map((lesson, lessonIndex) => {
                    const isUnlocked = !lesson.isLocked;
                    const startMode = getLessonStartMode(lesson);
                    const nextLesson =
                      stage.lessons[lessonIndex + 1] ??
                      stages[stageIndex + 1]?.lessons[0];
                    const returnTo = productDetailHref("courses", slug);
                    const quizQuery = new URLSearchParams({
                      stage: stage.title,
                      returnTo,
                    });

                    if (nextLesson) {
                      quizQuery.set(
                        "nextLessonTarget",
                        buildNextLessonHref(slug, returnTo, nextLesson),
                      );
                    }

                    const lessonQuery = new URLSearchParams({
                      stage: stage.title,
                      returnTo,
                    });

                    if (lesson.subtitle) {
                      lessonQuery.set("subtitle", lesson.subtitle);
                    }

                    const descriptionHref = `${courseLessonDescriptionHref(slug, lesson.id)}?${lessonQuery.toString()}`;
                    const quizHref = `${courseLessonQuizHref(slug, lesson.id)}?${quizQuery.toString()}`;
                    const reviewQuery = new URLSearchParams(quizQuery);
                    reviewQuery.set("review", "1");
                    const reviewQuizHref = `${courseLessonQuizHref(slug, lesson.id)}?${reviewQuery.toString()}`;

                    return (
                      <li
                        key={lesson.id}
                        className="rounded-xl border border-[#E8E8E8] bg-[#FAFAFA] px-4 py-4"
                      >
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex min-w-0 flex-1 items-start gap-4">
                            <span
                              className={`flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                                isUnlocked
                                  ? "bg-primary text-white"
                                  : "bg-[#E0F5F3] text-primary/50"
                              }`}
                            >
                              {lesson.number}
                            </span>
                            <div className="min-w-0">
                              <p
                                className={`text-sm font-bold ${
                                  isUnlocked ? "text-black" : "text-[#717171]"
                                }`}
                              >
                                {lesson.title}
                              </p>
                              {lesson.subtitle ? (
                                <p className="mt-1 text-xs text-[#717171]">
                                  {lesson.subtitle}
                                </p>
                              ) : null}
                            </div>
                          </div>

                          <div className="flex w-full shrink-0 flex-wrap items-center gap-2 sm:w-auto sm:justify-end">
                            {startMode === "text" ? (
                              <Button asChild className="h-10 min-w-30 px-4">
                                <Link href={descriptionHref}>بدء التعلم</Link>
                              </Button>
                            ) : startMode === "file" ? (
                              <Button asChild className="h-10 min-w-30 px-4">
                                <a
                                  href={lesson.fileUrl!}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  بدء التعلم
                                </a>
                              </Button>
                            ) : (
                              <Button
                                type="button"
                                disabled
                                className="h-10 min-w-30 px-4"
                              >
                                بدء التعلم
                              </Button>
                            )}

                            {lesson.hasQuiz && isUnlocked ? (
                              lesson.isPassed ? (
                                <>
                                  <span className="inline-flex h-10 items-center rounded-xl bg-[#E8F7EF] px-4 text-sm font-medium text-[#22A06B]">
                                    اجتزت الاختبار ✓
                                  </span>
                                  <Button
                                    asChild
                                    variant="outline"
                                    className="h-10 min-w-30 border-primary px-4 text-primary hover:bg-[#E0F5F3]"
                                  >
                                    <Link href={reviewQuizHref}>
                                      مراجعة الاختبار
                                    </Link>
                                  </Button>
                                </>
                              ) : (
                                <Button
                                  asChild
                                  variant="outline"
                                  className="h-10 min-w-30 border-primary px-4 text-primary hover:bg-[#E0F5F3]"
                                >
                                  <Link href={quizHref}>الإختبار</Link>
                                </Button>
                              )
                            ) : lesson.hasQuiz ? (
                              <Button
                                type="button"
                                variant="outline"
                                disabled
                                className="h-10 min-w-30 border-primary/30 px-4 text-primary/40"
                              >
                                الإختبار
                              </Button>
                            ) : null}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
