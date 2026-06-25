import type {
  CourseLesson,
  CourseQuiz,
  CourseQuizSnapshot,
  CourseQuizSnapshotItem,
  CourseQuizSubmitResult,
  CourseStage,
} from "@/src/features/products/data/courseStages";
import type {
  CourseQuizApiPayload,
  CourseQuizSnapshotApiPayload,
  CourseQuizSnapshotItemApi,
  CourseQuizSubmitApiResponse,
  CourseStageApi,
  CourseStageLessonApi,
  CourseStagesApiResponse,
} from "@/src/features/products/types/courseStagesApi";

function isQuizSnapshotPayload(
  data: unknown,
): data is CourseQuizSnapshotApiPayload {
  return (
    typeof data === "object" &&
    data != null &&
    "snapshot" in data &&
    Array.isArray((data as CourseQuizSnapshotApiPayload).snapshot)
  );
}

function mapQuizSnapshotItem(
  item: CourseQuizSnapshotItemApi,
): CourseQuizSnapshotItem {
  return {
    questionId: item.question_id,
    questionText: item.question_text,
    userAnswerId: item.user_answer_id,
    correctAnswerId: item.correct_answer_id,
    isCorrect: item.is_correct,
    answers: item.answers.map((answer) => ({
      id: answer.id,
      text: answer.answer_text,
      image: null,
      isCorrect: answer.is_correct,
    })),
  };
}

export function mapQuizSnapshotResponse(
  payload: CourseQuizSnapshotApiPayload,
  message = "",
  fallbackTitle = "اختبار الدرس",
): CourseQuizSnapshot {
  const items = payload.snapshot.map(mapQuizSnapshotItem);

  return {
    message,
    title: payload.title ?? fallbackTitle,
    passingPercentage: payload.passing_percentage ?? 50,
    items,
  };
}

export function quizFromSnapshot(snapshot: CourseQuizSnapshot): CourseQuiz {
  return {
    id: 0,
    title: snapshot.title,
    totalQuestions: snapshot.items.length,
    passingPercentage: snapshot.passingPercentage,
    questions: snapshot.items.map((item) => ({
      id: item.questionId,
      text: item.questionText,
      image: null,
      answers: item.answers,
    })),
  };
}

export function selectionsFromSnapshot(
  snapshot: CourseQuizSnapshot,
): Record<number, number> {
  return Object.fromEntries(
    snapshot.items.map((item) => [item.questionId, item.userAnswerId]),
  );
}

export function resultFromSnapshot(
  snapshot: CourseQuizSnapshot,
  options?: { passed?: boolean; message?: string },
): CourseQuizSubmitResult {
  const totalQuestions = snapshot.items.length;
  const correctAnswers = snapshot.items.filter((item) => item.isCorrect).length;
  const score =
    totalQuestions > 0
      ? Math.round((correctAnswers / totalQuestions) * 100)
      : 0;

  return {
    passed: options?.passed ?? score >= snapshot.passingPercentage,
    score,
    correctAnswers,
    totalQuestions,
    passingPercentage: snapshot.passingPercentage,
    message: options?.message ?? snapshot.message,
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

export function mapCourseQuizSubmitResponse(
  payload: CourseQuizSubmitApiResponse,
): CourseQuizSubmitResult | null {
  const data = payload.data;

  if (!data || isQuizSnapshotPayload(data)) {
    return null;
  }

  return {
    passed: data.passed ?? false,
    score: data.score ?? 0,
    correctAnswers: data.correct_answers ?? 0,
    totalQuestions: data.total_questions ?? 0,
    passingPercentage: data.passing_percentage ?? 0,
    message: payload.message ?? "",
    stagePassed: data.stage_passed,
    certificateUrl: data.certificate_url ?? null,
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
