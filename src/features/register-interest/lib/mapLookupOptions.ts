import type { LookupOption } from "@/src/features/register-interest/types";

export function mapLookupOptions(options: LookupOption[]) {
  return options.map((option) => ({
    value: String(option.id),
    label: option.title,
  }));
}
