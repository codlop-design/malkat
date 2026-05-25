import { fetcher } from "@/src/lib/fetch";
import type { ContactPageData } from "@/src/features/contact/types";

export async function getContactPageContent(): Promise<ContactPageData | null> {
  const response = await fetcher<ContactPageData>("/contact-us");

  if (!response?.success) {
    return null;
  }

  return response.data;
}
