import type { LucideIcon } from "lucide-react";

type MetaItemProps = {
  icon: LucideIcon;
  label: string;
  value: string;
};

export default function MetaItem({ icon: Icon, label, value }: MetaItemProps) {
  return (
    <div className="flex flex-col gap-1 rounded-xl bg-[#FAFAFA] px-3 py-2.5">
      <Icon className="size-4 text-primary" strokeWidth={1.5} />
      <span className="text-xs text-[#717171]">{label}</span>
      <span className="text-sm font-medium text-black">{value}</span>
    </div>
  );
}
