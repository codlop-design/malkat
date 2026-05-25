import { fetcher } from "@/src/lib/fetch";
import type { ContactType } from "@/src/features/contact/types";

export async function getContactTypes(): Promise<ContactType[]> {
  const response = await fetcher<ContactType[]>("/contact-us/types");

  if (!response?.success) {
    return [];
  }

  return response.data;
}
