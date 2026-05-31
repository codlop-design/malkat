import type { ServiceRequestLookupOption } from "@/src/features/request-service/types";

export function mapLookupOptions(options: ServiceRequestLookupOption[]) {
  return options.map((option) => ({
    value: String(option.id),
    label: option.title,
  }));
}
