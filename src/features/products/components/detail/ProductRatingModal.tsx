"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Star, X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useState,
  useSyncExternalStore,
  type FormEvent,
} from "react";
import { createPortal } from "react-dom";

import { SubmitButton } from "@/src/components/SubmitButton";
import { cn } from "@/src/lib/utils";

type ProductRatingModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  question: string;
  isSubmitting?: boolean;
  onSubmit: (values: { rate: number; comment: string }) => void;
};

function StarPicker({
  value,
  onChange,
}: {
  value: number;
  onChange: (rate: number) => void;
}) {
  const [hovered, setHovered] = useState(0);
  const active = hovered || value;

  return (
    <div
      className="flex items-center justify-center gap-2"
      role="radiogroup"
      aria-label="اختر التقييم"
    >
      {Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= active;

        return (
          <button
            key={starValue}
            type="button"
            role="radio"
            aria-checked={value === starValue}
            className="rounded-full p-1 transition-transform hover:scale-105"
            onMouseEnter={() => setHovered(starValue)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => onChange(starValue)}
          >
            <Star
              className={cn(
                "size-8",
                isFilled
                  ? "fill-[#F5B800] text-[#F5B800]"
                  : "fill-[#E5E5E5] text-[#E5E5E5]",
              )}
              strokeWidth={0}
            />
          </button>
        );
      })}
    </div>
  );
}

export default function ProductRatingModal({
  open,
  onClose,
  title,
  question,
  isSubmitting = false,
  onSubmit,
}: ProductRatingModalProps) {
  const [rate, setRate] = useState(0);
  const [comment, setComment] = useState("");
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const handleClose = useCallback(() => {
    if (isSubmitting) return;
    setRate(0);
    setComment("");
    onClose();
  }, [isSubmitting, onClose]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, handleClose]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (rate < 1) return;
    onSubmit({ rate, comment });
  }

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100000] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          dir="rtl"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            aria-label="إغلاق"
            onClick={handleClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-rating-title"
            className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
          >
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="absolute start-4 top-4 flex size-8 items-center justify-center rounded-full text-[#717171] transition-colors hover:bg-[#F5F5F5]"
              aria-label="إغلاق"
            >
              <X className="size-4" />
            </button>

            <form className="flex flex-col gap-5 pt-2" onSubmit={handleSubmit}>
              <div className="text-center">
                <h2
                  id="product-rating-title"
                  className="text-xl font-bold text-black"
                >
                  {title}
                </h2>
                <p className="mt-2 text-sm text-[#717171]">{question}</p>
              </div>

              <StarPicker value={rate} onChange={setRate} />

              <div>
                <label
                  htmlFor="product-rating-comment"
                  className="mb-2 block text-sm font-medium text-black"
                >
                  اكتب تعليقك (اختياري)
                </label>
                <textarea
                  id="product-rating-comment"
                  rows={5}
                  value={comment}
                  disabled={isSubmitting}
                  onChange={(event) => setComment(event.target.value)}
                  className="w-full resize-none rounded-xl border border-[#E5E5E5] bg-[#FAF8F5] p-3 text-sm text-[#454545] outline-none transition-colors focus:border-primary disabled:opacity-60"
                  placeholder="شاركنا رأيك..."
                />
              </div>

              <SubmitButton
                loading={isSubmitting}
                disabled={rate < 1}
                className="mt-0 h-12 rounded-xl"
              >
                إرسال التقييم
              </SubmitButton>
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
