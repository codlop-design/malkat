"use client";

import { Award, Download, Eye, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/src/components/ui/button";
import { getCourseCertificateClient } from "@/src/features/products/api/getCourseCertificateClient";
import CourseCertificateView, {
  printCourseCertificate,
} from "@/src/features/products/components/detail/CourseCertificateView";
import type { CourseCertificate } from "@/src/features/products/data/courseStages";

type CourseCertificateSectionProps = {
  slug: string;
  isAuthenticated: boolean;
  isPurchased?: boolean;
};

export default function CourseCertificateSection({
  slug,
  isAuthenticated,
  isPurchased = false,
}: CourseCertificateSectionProps) {
  const [certificate, setCertificate] = useState<CourseCertificate | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !isPurchased) {
      setCertificate(null);
      return;
    }

    let cancelled = false;

    async function loadCertificate() {
      setIsLoading(true);
      const result = await getCourseCertificateClient(slug);

      if (cancelled) return;

      setCertificate(result?.earned ? (result.certificate ?? null) : null);
      setIsLoading(false);
    }

    void loadCertificate();

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, isPurchased, slug]);

  if (!isAuthenticated || !isPurchased || isLoading || !certificate) {
    return null;
  }

  return (
    <>
      <div className="mt-6 rounded-2xl border border-[#D7F0EC] bg-[#F3FBFA] px-5 py-5 md:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-white">
              <Award className="size-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-black">
                مبروك! أكملت جميع اختبارات البرنامج
              </h3>
              <p className="mt-1 text-sm text-[#454545]">
                يمكنك الآن عرض شهادتك أو تحميلها.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant="outline"
              className="h-11 border-primary px-5 text-primary hover:bg-[#E0F5F3]"
              onClick={() => setIsModalOpen(true)}
            >
              <Eye className="size-4" />
              عرض الشهادة
            </Button>
            <Button
              type="button"
              className="h-11 px-5"
              onClick={() => printCourseCertificate(certificate)}
            >
              <Download className="size-4" />
              تحميل الشهادة
            </Button>
          </div>
        </div>
      </div>

      {isModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="relative w-full max-w-2xl">
            <button
              type="button"
              aria-label="إغلاق"
              className="absolute -top-3 left-0 z-10 flex size-10 items-center justify-center rounded-full bg-white text-[#454545] shadow-md"
              onClick={() => setIsModalOpen(false)}
            >
              <X className="size-5" />
            </button>

            <CourseCertificateView certificate={certificate} />

            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <Button
                type="button"
                className="h-11 min-w-44 px-6"
                onClick={() => printCourseCertificate(certificate)}
              >
                <Download className="size-4" />
                تحميل الشهادة
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-11 min-w-44 px-6"
                onClick={() => setIsModalOpen(false)}
              >
                إغلاق
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
