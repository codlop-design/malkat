import { apiClient, ensureCsrfCookie } from "@/src/lib/apiClient";
import {
  mapCourseQuizResponse,
  mapCourseQuizSubmitResponse,
} from "@/src/features/products/mapCourseStages";
import type {
  CourseQuiz,
  CourseQuizSubmitResult,
} from "@/src/features/products/data/courseStages";
import type {
  CourseQuizApiResponse,
  CourseQuizSubmitApiResponse,
} from "@/src/features/products/types/courseStagesApi";

export async function getCourseQuizClient(
  slug: string,
  lessonId: number,
): Promise<CourseQuiz | null> {
  const { data, status } = await apiClient.get<CourseQuizApiResponse>(
    `/courses/${slug}/lessons/${lessonId}/quiz`,
    { validateStatus: () => true },
  );

  if (status >= 400 || data?.success === false || !data?.data) {
    return null;
  }

  return mapCourseQuizResponse(data.data);
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
    url: `/courses/${slug}/lessons/${lessonId}/quiz`,
    body: requestBody,
  });

  const { data, status } = await apiClient.post<CourseQuizSubmitApiResponse>(
    `/courses/${slug}/lessons/${lessonId}/quiz`,
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

  const mapped = mapCourseQuizSubmitResponse(data ?? {});

  console.log("[CourseQuiz] submit mapped", mapped);

  return mapped;
}
