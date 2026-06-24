import type { CourseLesson } from "@/src/features/products/data/courseStages";

export type LessonStartMode = "text" | "file" | "none";

export function getLessonStartMode(lesson: CourseLesson): LessonStartMode {
  if (lesson.isLocked) {
    return "none";
  }

  const hasDescription = Boolean(lesson.description?.trim());
  const hasFile = Boolean(lesson.fileUrl);

  if (lesson.type === "text" && hasDescription) {
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

export function isExternalLessonHref(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function buildNextLessonHref(
  returnTo: string,
  lesson: CourseLesson,
): string {
  const mode = getLessonStartMode(lesson);

  if (mode === "file" && lesson.fileUrl) {
    return lesson.fileUrl;
  }

  const separator = returnTo.includes("?") ? "&" : "?";
  return `${returnTo}${separator}openLesson=${lesson.id}`;
}
