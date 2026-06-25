"use client";

import Link from "next/link";
import Image from "next/image";
import { Check, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import PageHeader from "@/src/components/PageHeader";
import { Button } from "@/src/components/ui/button";
import { useAuth } from "@/src/features/auth/context/AuthProvider";
import {
  getCourseQuizClient,
  submitCourseQuizClient,
  type CourseQuizAnswerPayload,
} from "@/src/features/products/api/getCourseQuizClient";
import QuizResultModal from "@/src/features/products/components/quiz/QuizResultModal";
import type {
  CourseQuiz,
  CourseQuizSnapshot,
  CourseQuizSubmitResult,
} from "@/src/features/products/data/courseStages";
import {
  quizFromSnapshot,
  resultFromSnapshot,
  selectionsFromSnapshot,
} from "@/src/features/products/mapCourseStages";
import { CATEGORY_META } from "@/src/features/products/data/categoryMeta";
import {
  categoryListingHref,
  productDetailHref,
} from "@/src/features/products/types";
import { isExternalLessonHref } from "@/src/features/products/lib/courseLessonStart";

type CourseQuizContentProps = {
  slug: string;
  lessonId: number;
  courseTitle: string;
};

function getAnswerState(
  isSubmitted: boolean,
  isSelected: boolean,
  isCorrect: boolean,
): "default" | "selected" | "correct" | "wrong" {
  if (!isSubmitted) {
    return isSelected ? "selected" : "default";
  }

  if (isCorrect) {
    return "correct";
  }

  if (isSelected) {
    return "wrong";
  }

  return "default";
}

const answerStateClasses: Record<ReturnType<typeof getAnswerState>, string> = {
  default: "border-[#E8E8E8] bg-white",
  selected: "border-primary bg-white ring-1 ring-primary/20",
  correct: "border-[#22A06B] bg-[#E8F7EF] ring-1 ring-[#22A06B]/20",
  wrong: "border-[#E34949] bg-[#FDEDED] ring-1 ring-[#E34949]/20",
};

function shouldShowQuizText(text: string): boolean {
  const trimmed = text.trim();
  return trimmed.length > 0 && trimmed !== "-";
}

const quizImageClassName = "size-[100px] shrink-0 rounded-xl object-cover";

export default function CourseQuizContent({
  slug,
  lessonId,
  courseTitle,
}: CourseQuizContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stageTitle = searchParams.get("stage") ?? "المرحلة الأولى";
  const returnTo =
    searchParams.get("returnTo") ?? productDetailHref("courses", slug);
  const nextLessonTarget = searchParams.get("nextLessonTarget");
  const nextLessonFile = searchParams.get("nextLessonFile");
  const nextLessonId = searchParams.get("nextLessonId");

  const { user, isAuthenticated, isAuthReady } = useAuth();
  const userName = user?.name ?? "بك";

  const quizCacheKey = `${slug}:${lessonId}`;
  const [quizState, setQuizState] = useState<{
    key: string;
    quiz: CourseQuiz | null;
    passedSnapshot: CourseQuizSnapshot | null;
  }>({ key: "", quiz: null, passedSnapshot: null });
  const hasLoadedQuiz = isAuthenticated && quizState.key === quizCacheKey;
  const quiz = hasLoadedQuiz ? quizState.quiz : null;
  const passedSnapshot = hasLoadedQuiz ? quizState.passedSnapshot : null;
  const isQuizLoading = isAuthReady && isAuthenticated && !hasLoadedQuiz;
  const [selections, setSelections] = useState<Record<number, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [result, setResult] = useState<CourseQuizSubmitResult | null>(null);
  const isReadOnly = isSubmitted || isReviewing;

  useEffect(() => {
    if (!isAuthReady || !isAuthenticated) return;
    if (quizState.key === quizCacheKey) return;

    let cancelled = false;

    async function loadQuiz() {
      const loadResult = await getCourseQuizClient(slug, lessonId);

      if (cancelled) return;

      if (!loadResult) {
        setQuizState({ key: quizCacheKey, quiz: null, passedSnapshot: null });
        return;
      }

      if (loadResult.kind === "quiz") {
        setQuizState({
          key: quizCacheKey,
          quiz: loadResult.quiz,
          passedSnapshot: null,
        });
        return;
      }

      setQuizState({
        key: quizCacheKey,
        quiz: null,
        passedSnapshot: loadResult.snapshot,
      });
    }

    void loadQuiz();

    return () => {
      cancelled = true;
    };
  }, [
    isAuthenticated,
    isAuthReady,
    lessonId,
    quizCacheKey,
    quizState.key,
    slug,
  ]);

  const totalQuestions = quiz?.questions.length ?? 0;

  const allAnswered =
    quiz != null &&
    quiz.questions.every((question) => selections[question.id] != null);

  const nextLessonHref = useMemo(() => {
    if (nextLessonTarget) {
      return nextLessonTarget;
    }

    if (nextLessonFile) {
      return nextLessonFile;
    }

    if (nextLessonId) {
      const separator = returnTo.includes("?") ? "&" : "?";
      return `${returnTo}${separator}openLesson=${nextLessonId}`;
    }

    return null;
  }, [nextLessonFile, nextLessonId, nextLessonTarget, returnTo]);

  const breadcrumbs = useMemo(
    () => [
      { label: "الرئيسية", href: "/" },
      { label: "المنتجات", href: "/products" },
      {
        label: CATEGORY_META.courses.label,
        href: categoryListingHref("courses"),
      },
      { label: "تفاصيل البرنامج", href: returnTo },
      { label: stageTitle },
    ],
    [returnTo, stageTitle],
  );

  function applySnapshotReview(snapshot: CourseQuizSnapshot) {
    setQuizState((current) => ({
      ...current,
      quiz: quizFromSnapshot(snapshot),
    }));
    setSelections(selectionsFromSnapshot(snapshot));
    setResult(
      resultFromSnapshot(snapshot, {
        passed: true,
        message: snapshot.message,
      }),
    );
    setIsSubmitted(true);
    setIsReviewing(true);
    setShowResultModal(false);
  }

  function handleReviewAnswers() {
    setShowResultModal(false);
    setIsReviewing(true);
  }

  function handleShowResultSummary() {
    setShowResultModal(true);
  }

  function handleSelectAnswer(questionId: number, answerId: number) {
    if (isReadOnly) return;

    setSelections((current) => ({
      ...current,
      [questionId]: answerId,
    }));
  }

  async function handleSubmit() {
    if (!quiz || !allAnswered || isReadOnly) return;

    const payload: CourseQuizAnswerPayload[] = quiz.questions.map(
      (question) => ({
        question_id: question.id,
        answer_id: selections[question.id],
      }),
    );

    setIsSubmitting(true);
    const submitResult = await submitCourseQuizClient(slug, lessonId, payload);
    setIsSubmitting(false);

    setIsSubmitted(true);

    if (!submitResult) {
      setResult({
        passed: false,
        score: 0,
        correctAnswers: 0,
        totalQuestions,
        passingPercentage: quiz.passingPercentage,
        message: "تعذر إرسال الإجابات. حاول مرة أخرى.",
      });
      setShowResultModal(true);
      return;
    }

    if (submitResult.kind === "snapshot") {
      applySnapshotReview(submitResult.snapshot);
      setShowResultModal(true);
      return;
    }

    setResult({
      ...submitResult.result,
      totalQuestions,
      correctAnswers: Math.min(
        submitResult.result.correctAnswers,
        totalQuestions,
      ),
    });
    setShowResultModal(true);
  }

  function handleGoToNextLesson() {
    if (!nextLessonHref) return;

    if (isExternalLessonHref(nextLessonHref)) {
      window.open(nextLessonHref, "_blank", "noopener,noreferrer");
      return;
    }

    router.push(nextLessonHref);
  }

  function handleRetake() {
    if (passedSnapshot) return;

    setSelections({});
    setIsSubmitted(false);
    setIsReviewing(false);
    setShowResultModal(false);
    setResult(null);
  }

  const passedSnapshotResult = useMemo(
    () =>
      passedSnapshot
        ? resultFromSnapshot(passedSnapshot, { passed: true })
        : null,
    [passedSnapshot],
  );

  return (
    <>
      <PageHeader
        title={CATEGORY_META.courses.label}
        breadcrumbs={breadcrumbs}
      />

      <div className="bg-[#FAFAFA] pb-16 pt-8 md:pt-10">
        <div className="container" dir="rtl">
          <div className="rounded-2xl border border-[#E8E8E8] bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.05)] md:p-8">
            {!isAuthReady || isQuizLoading ? (
              <p className="text-sm text-[#717171]">جاري تحميل الاختبار...</p>
            ) : !isAuthenticated ? (
              <div>
                <p className="text-sm text-[#454545]">
                  يجب تسجيل الدخول للوصول إلى اختبار الدرس.
                </p>
                <Button asChild className="mt-4 h-11 px-6">
                  <Link href="/login">تسجيل الدخول</Link>
                </Button>
              </div>
            ) : passedSnapshot && !isReviewing ? (
              <div className="py-6 text-center">
                <span className="inline-flex rounded-full bg-[#E8F7EF] px-4 py-1.5 text-sm font-medium text-[#22A06B]">
                  اجتزت الاختبار ✓
                </span>
                <h1 className="mt-5 text-xl font-bold text-black md:text-2xl">
                  {passedSnapshot.title}
                </h1>
                <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#454545]">
                  {passedSnapshot.message}
                </p>
                {passedSnapshotResult ? (
                  <p className="mt-3 text-sm text-[#717171]">
                    نتيجتك: {passedSnapshotResult.correctAnswers}/
                    {passedSnapshotResult.totalQuestions} · نسبة النجاح:{" "}
                    {passedSnapshotResult.score}%
                  </p>
                ) : null}
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Button
                    type="button"
                    className="h-11 min-w-48 px-8"
                    onClick={() => applySnapshotReview(passedSnapshot)}
                  >
                    مراجعة النتيجة
                  </Button>
                  {nextLessonHref ? (
                    <Button
                      type="button"
                      variant="outline"
                      className="h-11 min-w-48 px-8"
                      onClick={handleGoToNextLesson}
                    >
                      الانتقال للفصل التالي
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant="outline"
                      className="h-11 min-w-48 px-8"
                      onClick={() => router.push(returnTo)}
                    >
                      العودة إلى البرنامج
                    </Button>
                  )}
                </div>
              </div>
            ) : !quiz || quiz.questions.length === 0 ? (
              <div>
                <p className="text-sm text-[#454545]">
                  تعذر تحميل اختبار هذا الدرس.
                </p>
                <Button asChild variant="outline" className="mt-4 h-11 px-6">
                  <Link href={returnTo}>العودة إلى البرنامج</Link>
                </Button>
              </div>
            ) : (
              <>
                {isReviewing && result ? (
                  <div className="mb-6 flex flex-col gap-3 rounded-xl border border-[#E8E8E8] bg-[#FAFAFA] p-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-[#454545]">
                      نتيجتك: {result.correctAnswers}/{result.totalQuestions} ·
                      نسبة النجاح: {result.score}%
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      className="h-10 px-6"
                      onClick={handleShowResultSummary}
                    >
                      ملخص النتيجة
                    </Button>
                  </div>
                ) : null}

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-[#454545]">
                    يتكون الإختبار التقييمي من {totalQuestions} أسئلة
                  </p>
                  <p className="text-sm text-[#454545]">
                    لتجاوز الاختبار عليك الحصول على {quiz.passingPercentage}%
                    على الأقل
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between gap-4">
                  <span className="rounded-full bg-[#E0F5F3] px-3 py-1 text-xs font-medium text-primary">
                    {totalQuestions} أسئلة
                  </span>
                  <h1 className="text-xl font-bold text-black">{quiz.title}</h1>
                </div>

                <div className="mt-8 flex flex-col gap-6">
                  {quiz.questions.map((question, index) => (
                    <div
                      key={question.id}
                      className="rounded-2xl bg-[#EAF7F6] p-5 md:p-6"
                    >
                      <div className="flex items-center gap-4">
                        {question.image ? (
                          <Image
                            src={question.image}
                            alt={question.text}
                            width={100}
                            height={100}
                            className={quizImageClassName}
                          />
                        ) : null}
                        <div className="flex min-w-0 flex-col gap-3">
                          <p className="shrink-0 text-sm font-medium text-primary">
                            السؤال {index + 1}
                          </p>
                          {shouldShowQuizText(question.text) ? (
                            <p className="text-base font-bold text-black md:text-lg">
                              {question.text}
                            </p>
                          ) : null}
                        </div>
                      </div>

                      <div className="mt-5 flex flex-col gap-3">
                        {question.answers.map((answer) => {
                          const isSelected =
                            selections[question.id] === answer.id;
                          const state = getAnswerState(
                            isReadOnly,
                            isSelected,
                            answer.isCorrect,
                          );

                          return (
                            <label
                              key={answer.id}
                              className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm text-[#454545] transition-colors ${
                                isReadOnly ? "cursor-default" : ""
                              } ${answerStateClasses[state]}`}
                            >
                              <input
                                type="radio"
                                name={`question-${question.id}`}
                                value={answer.id}
                                checked={isSelected}
                                disabled={isReadOnly}
                                onChange={() =>
                                  handleSelectAnswer(question.id, answer.id)
                                }
                                className="size-4 shrink-0 accent-primary disabled:opacity-70"
                              />
                              {answer.image ? (
                                <Image
                                  src={answer.image}
                                  alt=""
                                  width={100}
                                  height={100}
                                  className={quizImageClassName}
                                />
                              ) : null}
                              {shouldShowQuizText(answer.text) ? (
                                <span className="flex-1">{answer.text}</span>
                              ) : (
                                <span className="flex-1" />
                              )}
                              {isReadOnly ? (
                                answer.isCorrect ? (
                                  <Check
                                    className="size-5 shrink-0 text-[#22A06B]"
                                    aria-label="إجابة صحيحة"
                                  />
                                ) : isSelected ? (
                                  <X
                                    className="size-5 shrink-0 text-[#E34949]"
                                    aria-label="إجابة خاطئة"
                                  />
                                ) : null
                              ) : null}
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {!isReadOnly ? (
                  <div className="mt-8 flex justify-end">
                    <Button
                      type="button"
                      className="h-11 min-w-40 px-8"
                      disabled={!allAnswered || isSubmitting}
                      onClick={() => void handleSubmit()}
                    >
                      {isSubmitting ? "جاري الإرسال..." : "إنهاء الاختبار"}
                    </Button>
                  </div>
                ) : null}
              </>
            )}
          </div>
        </div>
      </div>

      {showResultModal && result ? (
        <QuizResultModal
          userName={userName}
          stageTitle={stageTitle}
          result={result}
          nextLessonHref={nextLessonHref}
          onGoToNextLesson={handleGoToNextLesson}
          onReview={handleReviewAnswers}
          onRetake={handleRetake}
          onBack={() => router.push(returnTo)}
          canRetake={!passedSnapshot && !isReviewing}
        />
      ) : null}
    </>
  );
}
