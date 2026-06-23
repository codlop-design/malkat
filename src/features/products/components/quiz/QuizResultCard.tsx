import { Download } from "lucide-react";

import { Button } from "@/src/components/ui/button";
import type { CourseQuizSubmitResult } from "@/src/features/products/data/courseStages";

type QuizResultCardProps = {
  userName: string;
  stageTitle: string;
  result: CourseQuizSubmitResult;
  nextLessonHref?: string | null;
  onRetake: () => void;
  onBack: () => void;
};

export default function QuizResultCard({
  userName,
  stageTitle,
  result,
  nextLessonHref,
  onRetake,
  onBack,
}: QuizResultCardProps) {
  const firstName = userName.split(" ")[0] || userName;

  if (result.stagePassed) {
    return (
      <div className="mx-auto max-w-xl py-6 text-center">
        <h1 className="text-2xl font-bold text-black md:text-3xl">
          أحسنت يا {firstName} 🎉
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-[#454545] md:text-base">
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
      </div>
    );
  }

  if (result.passed) {
    return (
      <div className="mx-auto max-w-xl py-6 text-center">
        <h1 className="text-2xl font-bold text-black md:text-3xl">
          أحسنت يا {firstName} 🎉
        </h1>
        <p className="mt-4 text-sm text-[#454545] md:text-base">
          لقد حصلت على {result.correctAnswers}/{result.totalQuestions}
        </p>
        <p className="mt-2 text-sm text-[#717171]">
          نسبة النجاح: {result.score}%
        </p>

        {nextLessonHref ? (
          <Button asChild className="mt-8 h-12 min-w-52 px-8">
            <a href={nextLessonHref}>الانتقال للفصل التالي</a>
          </Button>
        ) : (
          <Button type="button" className="mt-8 h-12 min-w-52 px-8" onClick={onBack}>
            العودة إلى البرنامج
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl py-6 text-center">
      <h1 className="text-2xl font-bold text-black md:text-3xl">
        لا بأس، يمكنك المحاولة مرة أخرى 😕
      </h1>
      <p className="mt-4 text-sm text-[#454545] md:text-base">
        لقد حصلت على {result.correctAnswers}/{result.totalQuestions}
      </p>
      <p className="mt-2 text-sm text-[#717171]">
        الحد الأدنى للنجاح: {result.passingPercentage}%
      </p>

      <Button type="button" className="mt-8 h-12 min-w-48 px-8" onClick={onRetake}>
        إعادة الاختبار
      </Button>
    </div>
  );
}
