import type { CourseLesson } from "@/src/features/products/data/courseStages";
import { courseLessonDescriptionHref } from "@/src/features/products/types";

export type LessonStartMode = "text" | "file" | "none";

function resolveLessonContentMode(lesson: CourseLesson): LessonStartMode {
  const hasDescription = Boolean(lesson.description?.trim());
  const hasFile = Boolean(lesson.fileUrl);

  if (lesson.type === "text") {
    return "text";
  }

  if (lesson.type === "file" && hasFile) {
    return "file";
  }

  if (hasDescription && !hasFile) {
    return "text";
  }

  if (hasFile) {
    return "file";
  }

  if (hasDescription) {
    return "text";
  }

  return "none";
}

export function getLessonContentMode(lesson: CourseLesson): LessonStartMode {
  return resolveLessonContentMode(lesson);
}

export function getLessonStartMode(lesson: CourseLesson): LessonStartMode {
  if (lesson.isLocked) {
    return "none";
  }

  return resolveLessonContentMode(lesson);
}

export function isExternalLessonHref(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function buildNextLessonHref(
  slug: string,
  returnTo: string,
  lesson: CourseLesson,
): string {
  const mode = resolveLessonContentMode(lesson);

  if (mode === "file" && lesson.fileUrl) {
    return lesson.fileUrl;
  }

  if (mode === "text") {
    const params = new URLSearchParams({ returnTo });
    return `${courseLessonDescriptionHref(slug, lesson.id)}?${params.toString()}`;
  }

  const separator = returnTo.includes("?") ? "&" : "?";

  if (lesson.fileUrl) {
    return lesson.fileUrl;
  }

  return `${returnTo}${separator}openLesson=${lesson.id}`;
}
