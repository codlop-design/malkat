"use client";

import type { CourseCertificate } from "@/src/features/products/data/courseStages";
import {
  buildCertificateMarkup,
  buildCertificateStyles,
} from "@/src/features/products/lib/courseCertificateDocument";

type CourseCertificateViewProps = {
  certificate: CourseCertificate;
  className?: string;
};

export default function CourseCertificateView({
  certificate,
  className = "",
}: CourseCertificateViewProps) {
  return (
    <div className={className} dir="rtl">
      <style>{buildCertificateStyles()}</style>
      <div
        dangerouslySetInnerHTML={{
          __html: buildCertificateMarkup(certificate),
        }}
      />
    </div>
  );
}

export { openCourseCertificatePrintWindow as printCourseCertificate } from "@/src/features/products/lib/courseCertificateDocument";
