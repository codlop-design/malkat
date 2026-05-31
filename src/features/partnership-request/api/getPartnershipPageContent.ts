import { fetcher } from "@/src/lib/fetch";
import type {
  PartnershipPageApiData,
  PartnershipPageData,
  PartnershipSection,
} from "@/src/features/partnership-request/types";

const EMPTY_SECTION: PartnershipSection = {
  title: "",
  content: "",
  items: [],
};

function pickSection(
  sections: PartnershipSection[] | undefined,
): PartnershipSection {
  return sections?.[0] ?? EMPTY_SECTION;
}

export async function getPartnershipPageContent(): Promise<PartnershipPageData | null> {
  const response = await fetcher<PartnershipPageApiData>("/partnership-page");

  if (!response?.success) {
    return null;
  }

  const { start, whyUs } = response.data;

  return {
    start: pickSection(start),
    whyUs: pickSection(whyUs),
  };
}
