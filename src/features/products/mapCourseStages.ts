import type {
  CourseLesson,
  CourseLessonDescription,
  CourseQuiz,
  CourseQuizLoadResult,
  CourseQuizReview,
  CourseQuizSubmitResult,
  CourseStage,
} from "@/src/features/products/data/courseStages";
import type {
  CourseQuizApiPayload,
  CourseQuizApiResponse,
  CourseQuizSnapshotPayload,
  CourseQuizSubmitApiResponse,
  CourseLessonDescriptionApi,
  CourseStageApi,
  CourseStageLessonApi,
  CourseStagesApiResponse,
} from "@/src/features/products/types/courseStagesApi";

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
): CourseQuizSubmitResult {
  const data = payload.data;

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

function isQuizSnapshotPayload(
  data: CourseQuizApiPayload | CourseQuizSnapshotPayload,
): data is CourseQuizSnapshotPayload {
  return Array.isArray((data as CourseQuizSnapshotPayload).snapshot);
}

export function mapCourseQuizSnapshotResponse(
  message: string,
  payload: CourseQuizSnapshotPayload,
): CourseQuizReview {
  const snapshot = payload.snapshot ?? [];
  const questions = snapshot.map((item, index) => ({
    id: item.question_id,
    text: item.question_text || `السؤال ${index + 1}`,
    image: null,
    answers: item.answers.map((answer) => ({
      id: answer.id,
      text: answer.answer_text,
      image: null,
      isCorrect: answer.is_correct,
    })),
  }));

  const selections: Record<number, number> = {};
  for (const item of snapshot) {
    selections[item.question_id] = item.user_answer_id;
  }

  const correctAnswers = snapshot.filter((item) => item.is_correct).length;
  const totalQuestions = snapshot.length;
  const score =
    totalQuestions > 0
      ? Math.round((correctAnswers / totalQuestions) * 100)
      : 0;

  return {
    message,
    title: "مراجعة الاختبار",
    questions,
    selections,
    correctAnswers,
    totalQuestions,
    score,
    passed: true,
    passingPercentage: 50,
  };
}

export function parseCourseQuizApiResponse(
  payload: CourseQuizApiResponse,
): CourseQuizLoadResult | null {
  if (!payload.data) {
    return null;
  }

  if (isQuizSnapshotPayload(payload.data)) {
    if (payload.data.snapshot.length === 0) {
      return null;
    }

    return {
      mode: "review",
      review: mapCourseQuizSnapshotResponse(
        payload.message ?? "",
        payload.data,
      ),
    };
  }

  if (!payload.data.questions?.length) {
    return null;
  }

  return {
    mode: "active",
    quiz: mapCourseQuizResponse(payload.data),
  };
}

export function mapCourseLessonDescriptionResponse(
  payload: CourseLessonDescriptionApi,
): CourseLessonDescription {
  return {
    id: payload.id,
    title: payload.title,
    description: payload.description ?? "",
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
