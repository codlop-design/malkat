import { mapCourseCertificateResponse } from "@/src/features/products/mapCourseStages";
import type { CourseCertificateResult } from "@/src/features/products/data/courseStages";
import type { CourseCertificateApiResponse } from "@/src/features/products/types/courseStagesApi";
import { apiClient } from "@/src/lib/apiClient";

export async function getCourseCertificateClient(
  slug: string,
): Promise<CourseCertificateResult | null> {
  const { data, status } = await apiClient.get<CourseCertificateApiResponse>(
    `/courses/${slug}/certificate`,
    { validateStatus: () => true },
  );

  if (status === 401 || status === 419) {
    return null;
  }

  if (status >= 400 || data?.success === false) {
    return {
      earned: false,
      message: data?.message ?? "",
      certificate: null,
    };
  }

  return mapCourseCertificateResponse(data ?? {});
}
