import { apiClient, ensureCsrfCookie } from "@/src/lib/apiClient";
import {
  mapCourseQuizResponse,
  mapCourseQuizSubmitResponse,
  mapQuizSnapshotResponse,
} from "@/src/features/products/mapCourseStages";
import type {
  CourseQuiz,
  CourseQuizSnapshot,
  CourseQuizSubmitResult,
} from "@/src/features/products/data/courseStages";
import type {
  CourseQuizApiPayload,
  CourseQuizApiResponse,
  CourseQuizSnapshotApiPayload,
  CourseQuizSubmitApiResponse,
} from "@/src/features/products/types/courseStagesApi";

export type CourseQuizLoadResult =
  | { kind: "quiz"; quiz: CourseQuiz }
  | { kind: "snapshot"; snapshot: CourseQuizSnapshot };

export type CourseQuizSubmitClientResult =
  | { kind: "result"; result: CourseQuizSubmitResult }
  | { kind: "snapshot"; snapshot: CourseQuizSnapshot };

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

function isQuizQuestionsPayload(data: unknown): data is CourseQuizApiPayload {
  return (
    typeof data === "object" &&
    data != null &&
    "questions" in data &&
    Array.isArray((data as CourseQuizApiPayload).questions)
  );
}

export async function getCourseQuizClient(
  slug: string,
  lessonId: number,
): Promise<CourseQuizLoadResult | null> {
  const { data, status } = await apiClient.get<CourseQuizApiResponse>(
    `/courses/${slug}/lessons/${lessonId}/quiz`,
    { validateStatus: () => true },
  );

  if (status >= 400 || data?.success === false || !data?.data) {
    return null;
  }

  if (isQuizSnapshotPayload(data.data)) {
    return {
      kind: "snapshot",
      snapshot: mapQuizSnapshotResponse(
        data.data,
        data.message ?? "",
        `اختبار الدرس ${lessonId}`,
      ),
    };
  }

  if (!isQuizQuestionsPayload(data.data)) {
    return null;
  }

  return {
    kind: "quiz",
    quiz: mapCourseQuizResponse(data.data),
  };
}

export type CourseQuizAnswerPayload = {
  question_id: number;
  answer_id: number;
};

export async function submitCourseQuizClient(
  slug: string,
  lessonId: number,
  answers: CourseQuizAnswerPayload[],
): Promise<CourseQuizSubmitClientResult | null> {
  await ensureCsrfCookie();

  const requestBody = { answers };

  const { data, status } = await apiClient.post<CourseQuizSubmitApiResponse>(
    `/courses/${slug}/lessons/${lessonId}/quiz/submit`,
    requestBody,
    { validateStatus: () => true },
  );

  if (status >= 400 || data?.success === false || !data?.data) {
    return null;
  }

  if (isQuizSnapshotPayload(data.data)) {
    return {
      kind: "snapshot",
      snapshot: mapQuizSnapshotResponse(
        data.data,
        data.message ?? "",
        `اختبار الدرس ${lessonId}`,
      ),
    };
  }

  const result = mapCourseQuizSubmitResponse(data);
  if (!result) {
    return null;
  }

  return { kind: "result", result };
}
