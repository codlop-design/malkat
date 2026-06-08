import { getServiceTypes } from "@/src/features/services/api/getServiceTypes";
import { fetcher } from "@/src/lib/fetch";
import type {
  ServiceRequestFormOptions,
  ServiceRequestLookupOption,
} from "@/src/features/request-service/types";

export async function getServiceRequestFormOptions(): Promise<ServiceRequestFormOptions> {
  const [serviceTypes, groupsResponse] = await Promise.all([
    getServiceTypes(),
    fetcher<ServiceRequestLookupOption[]>("/service-request-target-groups"),
  ]);

  return {
    serviceTypes: serviceTypes.map(({ id, title }) => ({ id, title })),
    targetGroups: groupsResponse?.success ? (groupsResponse.data ?? []) : [],
  };
}
