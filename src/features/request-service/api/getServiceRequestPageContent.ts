import { fetcher } from "@/src/lib/fetch";
import type {
  ServiceRequestPageApiData,
  ServiceRequestPageContent,
  ServiceRequestSection,
} from "@/src/features/request-service/types";

const EMPTY_SECTION: ServiceRequestSection = {
  title: "",
  content: "",
  items: [],
};

function pickSection(
  sections: ServiceRequestSection[] | undefined,
): ServiceRequestSection {
  return sections?.[0] ?? EMPTY_SECTION;
}

export async function getServiceRequestPageContent(): Promise<ServiceRequestPageContent | null> {
  const response = await fetcher<ServiceRequestPageApiData>(
    "/service-request-page",
  );

  if (!response?.success) {
    return null;
  }

  const { start, whyUs, services } = response.data;

  return {
    start: pickSection(start),
    whyUs: pickSection(whyUs),
    services: pickSection(services),
  };
}
