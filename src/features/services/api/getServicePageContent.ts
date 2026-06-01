import { cache } from "react";

import { fetcher } from "@/src/lib/fetch";
import type {
  ServicePageApiData,
  ServicePageContent,
  ServicePageSection,
} from "@/src/features/services/types/servicePage";
import { SERVICE_TYPES_REVALIDATE_SECONDS } from "@/src/features/services/api/getServiceTypes";

const EMPTY_SECTION: ServicePageSection = {
  title: "",
  content: "",
  items: [],
};

function pickSection(
  sections: ServicePageSection[] | undefined,
): ServicePageSection {
  return sections?.[0] ?? EMPTY_SECTION;
}

async function fetchServicePageContent(): Promise<ServicePageContent | null> {
  const response = await fetcher<ServicePageApiData>("/service-page", {
    next: { revalidate: SERVICE_TYPES_REVALIDATE_SECONDS },
  });

  if (!response?.success) {
    return null;
  }

  const { statistics, steps, special } = response.data;

  return {
    statistics: pickSection(statistics),
    steps: pickSection(steps),
    special: pickSection(special),
  };
}

export const getServicePageContent = cache(fetchServicePageContent);
