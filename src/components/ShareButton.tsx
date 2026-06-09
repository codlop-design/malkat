"use client";

import { Share2 } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import ShareModal from "@/src/components/ShareModal";
import { buildShareUrl } from "@/src/lib/share";
import { cn } from "@/src/lib/utils";

type ShareButtonProps = {
  url: string;
  title?: string;
  className?: string;
  iconClassName?: string;
  label?: string;
};

export default function ShareButton({
  url,
  title = "",
  className,
  iconClassName,
  label = "مشاركة",
}: ShareButtonProps) {
  const [open, setOpen] = useState(false);

  const shareUrl = useMemo(() => buildShareUrl(url), [url]);

  const handleClick = useCallback(async () => {
    if (
      typeof navigator !== "undefined" &&
      navigator.share &&
      window.matchMedia("(max-width: 767px)").matches
    ) {
      try {
        await navigator.share({ title, url: shareUrl });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
      }
    }

    setOpen(true);
  }, [shareUrl, title]);

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          "flex items-center justify-center transition-colors",
          className,
        )}
        aria-label={label}
      >
        <Share2
          className={cn("size-5", iconClassName)}
          strokeWidth={1.5}
        />
      </button>

      <ShareModal
        open={open}
        onClose={() => setOpen(false)}
        url={shareUrl}
        title={title}
      />
    </>
  );
}
