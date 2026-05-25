import { fetcher } from "@/src/lib/fetch";
import type { LookupOption } from "@/src/features/register-interest/types";

export async function getPartnershipTypes(): Promise<LookupOption[]> {
  const response = await fetcher<LookupOption[]>("/parternes-types");

  if (!response?.success) {
    return [];
  }

  return response.data;
}
