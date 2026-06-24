import { Download } from "lucide-react";

import { Button } from "@/src/components/ui/button";
import type { CourseQuizSubmitResult } from "@/src/features/products/data/courseStages";
import { isExternalLessonHref } from "@/src/features/products/lib/courseLessonStart";

type QuizResultModalProps = {
  userName: string;
  stageTitle: string;
  result: CourseQuizSubmitResult;
  nextLessonHref?: string | null;
  onRetake: () => void;
  onBack: () => void;
};

export default function QuizResultModal({
  userName,
  stageTitle,
  result,
  nextLessonHref,
  onRetake,
  onBack,
}: QuizResultModalProps) {
  const firstName = userName.split(" ")[0] || userName;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div
        className="w-full max-w-lg rounded-2xl bg-white px-6 py-10 text-center shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
        dir="rtl"
      >
        {result.stagePassed ? (
          <>
            <h2 className="text-2xl font-bold text-black md:text-3xl">
              أحسنت يا {firstName} 🎉
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#454545]">
              لقد تجاوزت {stageTitle} بنجاح
            </p>
            {result.certificateUrl ? (
              <Button asChild className="mt-8 h-12 min-w-48 px-8">
                <a
                  href={result.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  <Download className="size-4" />
                  تحميل الشهادة
                </a>
              </Button>
            ) : (
              <Button type="button" className="mt-8 h-12 min-w-48 px-8" onClick={onBack}>
                العودة إلى البرنامج
              </Button>
            )}
          </>
        ) : result.passed ? (
          <>
            <h2 className="text-2xl font-bold text-black md:text-3xl">
              أحسنت يا {firstName} 🎉
            </h2>
            <p className="mt-4 text-sm text-[#454545]">
              لقد اجتزت الاختبار بنجاح
            </p>
            <p className="mt-2 text-sm text-[#717171]">
              لقد حصلت على {result.correctAnswers}/{result.totalQuestions} · نسبة
              النجاح: {result.score}%
            </p>
            {nextLessonHref ? (
              <Button asChild className="mt-8 h-12 min-w-52 px-8">
                <a
                  href={nextLessonHref}
                  {...(isExternalLessonHref(nextLessonHref)
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  الانتقال للفصل التالي
                </a>
              </Button>
            ) : (
              <Button type="button" className="mt-8 h-12 min-w-52 px-8" onClick={onBack}>
                العودة إلى البرنامج
              </Button>
            )}
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-black md:text-3xl">
              لا بأس، يمكنك المحاولة مرة أخرى 😕
            </h2>
            <p className="mt-4 text-sm text-[#454545]">
              لقد حصلت على {result.correctAnswers}/{result.totalQuestions}
            </p>
            <p className="mt-2 text-sm text-[#717171]">
              الحد الأدنى للنجاح: {result.passingPercentage}%
            </p>
            <Button type="button" className="mt-8 h-12 min-w-48 px-8" onClick={onRetake}>
              إعادة الاختبار
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
