import type { LucideIcon } from "lucide-react";

export type ContactDetailItem = {
  label: string;
  value: string;
  href?: string;
  icon: LucideIcon;
  valueDir?: "ltr";
  openInNewTab?: boolean;
};
