import { Loader2 } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";

type SubmitButtonProps = {
  loading?: boolean;
  className?: string;
  children: React.ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "className">;

export function SubmitButton({
  loading = false,
  disabled,
  children,
  className,
  ...buttonProps
}: SubmitButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      type="submit"
      disabled={isDisabled}
      className={`mt-2 h-14 flex shadow-[0px_2px_4px_0px_#006C3540] items-center justify-center gap-2 rounded-xl cursor-pointer bg-(--primary) text-base font-medium text-white disabled:cursor-not-allowed disabled:opacity-70 ${className}`}
      {...buttonProps}
    >
      {loading ? (
        <Loader2 className="size-5 animate-spin" aria-hidden />
      ) : null}
      <span>{children}</span>
    </button>
  );
}
