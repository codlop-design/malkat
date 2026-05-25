import { fetcher } from "@/src/lib/fetch";
import type { ApplicantType } from "@/src/features/register-interest/types";

export async function getApplicantTypes(): Promise<ApplicantType[]> {
  const response = await fetcher<ApplicantType[]>("/applicant-types");

  if (!response?.success) {
    return [];
  }

  return response.data;
}
