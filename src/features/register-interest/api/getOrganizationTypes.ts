import { fetcher } from "@/src/lib/fetch";
import type { LookupOption } from "@/src/features/register-interest/types";

export async function getOrganizationTypes(): Promise<LookupOption[]> {
  const response = await fetcher<LookupOption[]>("/orgnization-types");

  if (!response?.success) {
    return [];
  }

  return response.data;
}
