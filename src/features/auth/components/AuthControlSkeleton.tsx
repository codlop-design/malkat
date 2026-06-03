import { Loader2 } from "lucide-react";

import { cn } from "@/src/lib/utils";

type AuthControlSkeletonProps = {
  className?: string;
};

export default function AuthControlSkeleton({
  className,
}: AuthControlSkeletonProps) {
  return (
    <div
      className={cn(
        "flex size-10 items-center justify-center rounded-full bg-[#E8F6F4] ring-1 ring-primary/15",
        className,
      )}
      role="status"
      aria-label="جاري التحميل"
    >
      <Loader2 className="size-5 animate-spin text-primary" aria-hidden />
    </div>
  );
}
