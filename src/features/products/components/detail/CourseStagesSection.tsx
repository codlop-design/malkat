"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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
  const { isAuthenticated, isAuthReady } = useAuth();
  const [stages, setStages] = useState<CourseStage[]>(initialStages ?? []);
  const [requiresAuth, setRequiresAuth] = useState(initialStages === null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isAuthReady || !isAuthenticated) return;

    let cancelled = false;

    async function loadStages() {
      setIsLoading(true);
      const nextStages = await getCourseStagesClient(slug);

      if (cancelled) return;

      if (nextStages === null) {
        setRequiresAuth(true);
        setStages([]);
      } else {
        setRequiresAuth(false);
        setStages(nextStages);
      }

      setIsLoading(false);
    }

    void loadStages();

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, isAuthReady, slug]);

  if (isLoading) {
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
      <h2 className="mb-5 text-xl font-bold text-black">مراحل البرنامج</h2>
      <Accordion
        type="multiple"
        defaultValue={[`stage-${stages[0]?.id}`]}
        className="flex flex-col gap-3"
      >
        {stages.map((stage) => (
          <AccordionItem
            key={stage.id}
            value={`stage-${stage.id}`}
            className="overflow-hidden rounded-xl border border-[#E8E8E8] bg-white px-4"
          >
            <AccordionTrigger className="py-4 text-base font-medium text-black hover:no-underline">
              {stage.title}
            </AccordionTrigger>
            <AccordionContent>
              {stage.lessons.length === 0 ? (
                <p className="pb-2 text-sm text-[#717171]">
                  لا توجد دروس في هذه المرحلة بعد.
                </p>
              ) : (
                <ul className="flex flex-col gap-3 pb-2">
                  {stage.lessons.map((lesson, lessonIndex) => {
                    const isUnlocked = !lesson.isLocked;
                    const nextLesson = stage.lessons[lessonIndex + 1];
                    const quizQuery = new URLSearchParams({
                      stage: stage.title,
                      returnTo: productDetailHref("courses", slug),
                    });

                    if (nextLesson) {
                      quizQuery.set("nextLessonId", String(nextLesson.id));
                      if (nextLesson.fileUrl) {
                        quizQuery.set("nextLessonFile", nextLesson.fileUrl);
                      }
                    }

                    const quizHref = `${courseLessonQuizHref(slug, lesson.id)}?${quizQuery.toString()}`;

                    return (
                      <li
                        key={lesson.id}
                        className="flex flex-col gap-4 rounded-xl border border-[#E8E8E8] bg-[#FAFAFA] px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                      >
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
                          {isUnlocked && lesson.fileUrl ? (
                            <Button asChild className="h-10 min-w-30 px-4">
                              <a
                                href={lesson.fileUrl}
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
                              <span className="inline-flex h-10 items-center rounded-xl bg-[#E8F7EF] px-4 text-sm font-medium text-[#22A06B]">
                                اجتزت الاختبار ✓
                              </span>
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
