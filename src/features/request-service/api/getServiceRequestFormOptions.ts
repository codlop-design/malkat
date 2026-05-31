import { fetcher } from "@/src/lib/fetch";
import type {
  ServiceRequestFormOptions,
  ServiceRequestLookupOption,
} from "@/src/features/request-service/types";

export async function getServiceRequestFormOptions(): Promise<ServiceRequestFormOptions> {
  const [typesResponse, groupsResponse] = await Promise.all([
    fetcher<ServiceRequestLookupOption[]>("/service-request-types"),
    fetcher<ServiceRequestLookupOption[]>("/service-request-target-groups"),
  ]);

  return {
    serviceTypes: typesResponse?.success ? (typesResponse.data ?? []) : [],
    targetGroups: groupsResponse?.success ? (groupsResponse.data ?? []) : [],
  };
}
