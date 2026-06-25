import { apiClient, ensureCsrfCookie } from "@/src/lib/apiClient";
import {
  isCourseQuizSnapshotPayload,
  mapCourseQuizLoadResponse,
  mapCourseQuizSubmitResponse,
  mapSnapshotToReview,
} from "@/src/features/products/mapCourseStages";
import type {
  CourseQuizLoadResult,
  CourseQuizSubmitResult,
} from "@/src/features/products/data/courseStages";
import type {
  CourseQuizApiResponse,
  CourseQuizSubmitApiResponse,
} from "@/src/features/products/types/courseStagesApi";

export async function getCourseQuizClient(
  slug: string,
  lessonId: number,
): Promise<CourseQuizLoadResult | null> {
  const { data, status } = await apiClient.get<CourseQuizApiResponse>(
    `/courses/${slug}/lessons/${lessonId}/quiz`,
    { validateStatus: () => true },
  );

  console.log("[CourseQuiz] load response", {
    slug,
    lessonId,
    status,
    raw: data,
  });

  if (status >= 400 || data?.success === false || !data?.data) {
    console.warn("[CourseQuiz] load failed", { slug, lessonId, status, raw: data });
    return null;
  }

  const mapped = mapCourseQuizLoadResponse(data.data, data.message ?? "");

  console.log("[CourseQuiz] load mapped", mapped);

  return mapped;
}

export type CourseQuizAnswerPayload = {
  question_id: number;
  answer_id: number;
};

export async function submitCourseQuizClient(
  slug: string,
  lessonId: number,
  answers: CourseQuizAnswerPayload[],
): Promise<CourseQuizSubmitResult | null> {
  await ensureCsrfCookie();

  const requestBody = { answers };

  console.log("[CourseQuiz] submit request", {
    slug,
    lessonId,
    url: `/courses/${slug}/lessons/${lessonId}/quiz/submit`,
    body: requestBody,
  });

  const { data, status } = await apiClient.post<CourseQuizSubmitApiResponse>(
    `/courses/${slug}/lessons/${lessonId}/quiz/submit`,
    requestBody,
    { validateStatus: () => true },
  );

  console.log("[CourseQuiz] submit response", {
    status,
    raw: data,
  });

  if (status >= 400 || data?.success === false) {
    console.warn("[CourseQuiz] submit failed", { status, raw: data });
    return null;
  }

  if (data?.data && isCourseQuizSnapshotPayload(data.data)) {
    const { review } = mapSnapshotToReview(
      data.data.snapshot,
      data.message ?? "",
      {
        passingPercentage: data.data.passing_percentage,
        title: data.data.title,
      },
    );

    return {
      passed: review.passed,
      score: review.score,
      correctAnswers: review.correctAnswers,
      totalQuestions: review.totalQuestions,
      passingPercentage: data.data.passing_percentage ?? 50,
      message: review.message,
    };
  }

  const mapped = mapCourseQuizSubmitResponse(data ?? {});

  console.log("[CourseQuiz] submit mapped", mapped);

  return mapped;
}
