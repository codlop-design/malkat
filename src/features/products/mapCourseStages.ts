import type {
  CourseLesson,
  CourseQuiz,
  CourseQuizLoadResult,
  CourseQuizReview,
  CourseQuizSubmitResult,
  CourseStage,
} from "@/src/features/products/data/courseStages";
import type {
  CourseQuizApiPayload,
  CourseQuizSnapshotItemApi,
  CourseQuizSnapshotPayload,
  CourseQuizSubmitApiResponse,
  CourseStageApi,
  CourseStageLessonApi,
  CourseStagesApiResponse,
} from "@/src/features/products/types/courseStagesApi";

export function isCourseQuizSnapshotPayload(
  data: unknown,
): data is CourseQuizSnapshotPayload {
  return (
    typeof data === "object" &&
    data != null &&
    "snapshot" in data &&
    Array.isArray((data as CourseQuizSnapshotPayload).snapshot)
  );
}

export function mapSnapshotToReview(
  snapshot: CourseQuizSnapshotItemApi[],
  message: string,
  options?: { passingPercentage?: number; title?: string },
): { quiz: CourseQuiz; review: CourseQuizReview } {
  const selections: Record<number, number> = {};
  let correctAnswers = 0;

  const questions = snapshot.map((item) => {
    selections[item.question_id] = item.user_answer_id;
    if (item.is_correct) {
      correctAnswers += 1;
    }

    return {
      id: item.question_id,
      text: item.question_text,
      image: null,
      answers: item.answers.map((answer) => ({
        id: answer.id,
        text: answer.answer_text,
        image: null,
        isCorrect: answer.is_correct,
      })),
    };
  });

  const totalQuestions = questions.length;
  const score =
    totalQuestions > 0
      ? Math.round((correctAnswers / totalQuestions) * 100)
      : 0;
  const passingPercentage = options?.passingPercentage ?? 50;

  return {
    quiz: {
      id: 0,
      title: options?.title ?? "مراجعة الاختبار",
      totalQuestions,
      passingPercentage,
      questions,
    },
    review: {
      message,
      selections,
      correctAnswers,
      totalQuestions,
      passed: true,
      score,
    },
  };
}

function mapLesson(lesson: CourseStageLessonApi, index: number): CourseLesson {
  return {
    id: lesson.id,
    number: index + 1,
    title: lesson.title,
    subtitle: lesson.subtitle ?? "",
    type: lesson.type ?? "file",
    description: lesson.description ?? null,
    isLocked: lesson.is_locked,
    lockedMessage: lesson.locked_message ?? null,
    hasQuiz: lesson.has_quiz === true,
    isPassed: Boolean(
      lesson.is_passed ??
      (lesson as { quiz_passed?: boolean }).quiz_passed ??
      (lesson as { is_quiz_passed?: boolean }).is_quiz_passed,
    ),
    fileUrl: lesson.file ?? null,
  };
}

export function mapCourseStagesResponse(
  payload: CourseStagesApiResponse,
): CourseStage[] {
  return (payload.data ?? []).map((stage, stageIndex) => ({
    id: stage.id,
    number: stageIndex + 1,
    title: stage.title,
    isActive: stage.is_active === true,
    lessons: (stage.lessons ?? []).map(mapLesson),
  }));
}

export function mapCourseQuizResponse(
  payload: CourseQuizApiPayload,
): CourseQuiz {
  const questions = payload.questions.map((question, index) => ({
    id: question.id,
    text: question.question || `السؤال ${index + 1}`,
    image: question.image ?? null,
    answers: question.answers.map((answer) => ({
      id: answer.id,
      text: answer.answer,
      image: answer.image ?? null,
      isCorrect: answer.is_correct ?? false,
    })),
  }));

  return {
    id: payload.id ?? 0,
    title: payload.title,
    totalQuestions: questions.length,
    passingPercentage: payload.passing_percentage,
    questions,
  };
}

export function mapCourseQuizLoadResponse(
  data: unknown,
  message = "",
): CourseQuizLoadResult | null {
  if (!data || typeof data !== "object") {
    return null;
  }

  if (isCourseQuizSnapshotPayload(data)) {
    const { quiz, review } = mapSnapshotToReview(data.snapshot, message, {
      passingPercentage: data.passing_percentage,
      title: data.title,
    });

    return { quiz, review };
  }

  if (!("questions" in data) || !Array.isArray((data as CourseQuizApiPayload).questions)) {
    return null;
  }

  return {
    quiz: mapCourseQuizResponse(data as CourseQuizApiPayload),
    review: null,
  };
}

export function mapCourseQuizSubmitResponse(
  payload: CourseQuizSubmitApiResponse,
): CourseQuizSubmitResult {
  const data = payload.data;

  if (data && isCourseQuizSnapshotPayload(data)) {
    const { review } = mapSnapshotToReview(data.snapshot, payload.message ?? "", {
      passingPercentage: data.passing_percentage,
      title: data.title,
    });

    return {
      passed: review.passed,
      score: review.score,
      correctAnswers: review.correctAnswers,
      totalQuestions: review.totalQuestions,
      passingPercentage: data.passing_percentage ?? 50,
      message: review.message,
    };
  }

  return {
    passed: data?.passed ?? false,
    score: data?.score ?? 0,
    correctAnswers: data?.correct_answers ?? 0,
    totalQuestions: data?.total_questions ?? 0,
    passingPercentage: data?.passing_percentage ?? 0,
    message: payload.message ?? "",
    stagePassed: data?.stage_passed,
    certificateUrl: data?.certificate_url ?? null,
  };
}

export function parseWhatLearn(value: string): string[] | undefined {
  if (!value.trim()) return undefined;

  const paragraphMatches = value.match(/<p[^>]*>[\s\S]*?<\/p>/gi);
  if (paragraphMatches?.length) {
    const points = paragraphMatches
      .map((paragraph) => paragraph.replace(/<[^>]+>/g, "").trim())
      .filter(Boolean);

    if (points.length > 0) return points;
  }

  if (value.includes("<")) {
    const text = value.replace(/<[^>]+>/g, "").trim();
    return text ? [text] : undefined;
  }

  const points = value
    .split("،")
    .map((point) => point.trim())
    .filter(Boolean);

  return points.length > 0 ? points : undefined;
}
