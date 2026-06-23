"use client";

import Link from "next/link";
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
import QuizQuestionFeedback from "@/src/features/products/components/quiz/QuizQuestionFeedback";
import QuizResultCard from "@/src/features/products/components/quiz/QuizResultCard";
import type {
  CourseQuiz,
  CourseQuizSubmitResult,
} from "@/src/features/products/data/courseStages";
import { CATEGORY_META } from "@/src/features/products/data/categoryMeta";
import {
  categoryListingHref,
  courseLessonQuizHref,
  productDetailHref,
} from "@/src/features/products/types";

type CourseQuizContentProps = {
  slug: string;
  lessonId: number;
  courseTitle: string;
};

type QuestionFeedbackState = {
  isCorrect: boolean;
  pendingSubmit: boolean;
};

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
  const nextLessonId = searchParams.get("nextLessonId");
  const nextLessonFile = searchParams.get("nextLessonFile");

  const { user, isAuthenticated, isAuthReady } = useAuth();
  const userName = user?.name ?? "بك";

  const [quiz, setQuiz] = useState<CourseQuiz | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswerId, setSelectedAnswerId] = useState<number | null>(null);
  const [answers, setAnswers] = useState<CourseQuizAnswerPayload[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<CourseQuizSubmitResult | null>(null);
  const [questionFeedback, setQuestionFeedback] =
    useState<QuestionFeedbackState | null>(null);

  useEffect(() => {
    if (!isAuthReady) return;

    if (!isAuthenticated) {
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    async function loadQuiz() {
      setIsLoading(true);
      const nextQuiz = await getCourseQuizClient(slug, lessonId);

      if (cancelled) return;

      setQuiz(nextQuiz);
      setIsLoading(false);
    }

    void loadQuiz();

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, isAuthReady, lessonId, slug]);

  const currentQuestion = quiz?.questions[currentIndex];
  const totalQuestions = quiz?.questions.length ?? 0;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  const nextLessonHref = useMemo(() => {
    if (nextLessonFile) return nextLessonFile;

    if (nextLessonId) {
      return `${courseLessonQuizHref(slug, Number(nextLessonId))}?stage=${encodeURIComponent(stageTitle)}&returnTo=${encodeURIComponent(returnTo)}`;
    }

    return null;
  }, [nextLessonFile, nextLessonId, returnTo, slug, stageTitle]);

  const breadcrumbs = useMemo(
    () => [
      { label: "الرئيسية", href: "/" },
      { label: "المنتجات", href: "/products" },
      { label: CATEGORY_META.courses.label, href: categoryListingHref("courses") },
      { label: "تفاصيل البرنامج", href: returnTo },
      { label: stageTitle },
    ],
    [returnTo, stageTitle],
  );

  async function submitQuiz(nextAnswers: CourseQuizAnswerPayload[]) {
    setIsSubmitting(true);
    const submitResult = await submitCourseQuizClient(slug, lessonId, nextAnswers);
    setIsSubmitting(false);

    if (!submitResult) {
      setResult({
        passed: false,
        score: 0,
        correctAnswers: 0,
        totalQuestions: quiz?.totalQuestions ?? 0,
        passingPercentage: quiz?.passingPercentage ?? 0,
        message: "تعذر إرسال الإجابات. حاول مرة أخرى.",
      });
      return;
    }

    setResult(submitResult);
  }

  function handleCheckAnswer() {
    if (!currentQuestion || selectedAnswerId == null) return;

    const selectedAnswer = currentQuestion.answers.find(
      (answer) => answer.id === selectedAnswerId,
    );

    if (!selectedAnswer) return;

    setQuestionFeedback({
      isCorrect: selectedAnswer.isCorrect,
      pendingSubmit: selectedAnswer.isCorrect && isLastQuestion,
    });
  }

  function handleFeedbackContinue() {
    if (!questionFeedback || !currentQuestion || selectedAnswerId == null) return;

    if (!questionFeedback.isCorrect) {
      setQuestionFeedback(null);
      setSelectedAnswerId(null);
      return;
    }

    const nextAnswers = [
      ...answers.filter((item) => item.question_id !== currentQuestion.id),
      { question_id: currentQuestion.id, answer_id: selectedAnswerId },
    ];
    setAnswers(nextAnswers);
    setQuestionFeedback(null);

    if (questionFeedback.pendingSubmit) {
      void submitQuiz(nextAnswers);
      return;
    }

    setCurrentIndex((index) => index + 1);
    setSelectedAnswerId(null);
  }

  function handleRetake() {
    setResult(null);
    setCurrentIndex(0);
    setSelectedAnswerId(null);
    setAnswers([]);
    setQuestionFeedback(null);
  }

  return (
    <>
      <PageHeader title={CATEGORY_META.courses.label} breadcrumbs={breadcrumbs} />

      <div className="bg-[#FAFAFA] pb-16 pt-8 md:pt-10">
        <div className="container" dir="rtl">
          <div className="rounded-2xl border border-[#E8E8E8] bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.05)] md:p-8">
            {!isAuthReady || isLoading ? (
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
            ) : !quiz || !currentQuestion ? (
              <div>
                <p className="text-sm text-[#454545]">
                  تعذر تحميل اختبار هذا الدرس.
                </p>
                <Button asChild variant="outline" className="mt-4 h-11 px-6">
                  <Link href={returnTo}>العودة إلى البرنامج</Link>
                </Button>
              </div>
            ) : result ? (
              <QuizResultCard
                userName={userName}
                stageTitle={stageTitle}
                result={result}
                nextLessonHref={nextLessonHref}
                onRetake={handleRetake}
                onBack={() => router.push(returnTo)}
              />
            ) : (
              <>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-[#454545]">
                    يتكون الإختبار التقييمي من {quiz.totalQuestions} أسئلة
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

                <div className="mt-6 rounded-2xl bg-[#EAF7F6] p-5 md:p-6">
                  <p className="text-sm font-medium text-primary">
                    السؤال {currentIndex + 1}
                  </p>
                  <p className="mt-3 text-base font-bold text-black md:text-lg">
                    {currentQuestion.text}
                  </p>

                  <div className="mt-5 flex flex-col gap-3">
                    {currentQuestion.answers.map((answer) => {
                      const isSelected = selectedAnswerId === answer.id;

                      return (
                        <label
                          key={answer.id}
                          className={`flex cursor-pointer items-center gap-3 rounded-xl border bg-white px-4 py-3 text-sm text-[#454545] transition-colors ${
                            isSelected
                              ? "border-primary ring-1 ring-primary/20"
                              : "border-[#E8E8E8]"
                          }`}
                        >
                          <input
                            type="radio"
                            name={`question-${currentQuestion.id}`}
                            value={answer.id}
                            checked={isSelected}
                            onChange={() => setSelectedAnswerId(answer.id)}
                            className="size-4 accent-primary"
                          />
                          <span>{answer.text}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-sm font-medium text-[#717171]">
                    {currentIndex + 1}/{totalQuestions}
                  </span>
                  <Button
                    type="button"
                    className="h-11 min-w-36 px-6"
                    disabled={selectedAnswerId == null || isSubmitting}
                    onClick={handleCheckAnswer}
                  >
                    {isSubmitting
                      ? "جاري الإرسال..."
                      : isLastQuestion
                        ? "إنهاء الاختبار"
                        : "تحقق من الإجابة"}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {questionFeedback ? (
        <QuizQuestionFeedback
          userName={userName}
          isCorrect={questionFeedback.isCorrect}
          onContinue={handleFeedbackContinue}
        />
      ) : null}
    </>
  );
}
