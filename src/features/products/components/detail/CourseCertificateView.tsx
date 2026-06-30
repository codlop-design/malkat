import Image from "next/image";

import type { CourseCertificate } from "@/src/features/products/data/courseStages";

type CourseCertificateViewProps = {
  certificate: CourseCertificate;
  className?: string;
};

export default function CourseCertificateView({
  certificate,
  className = "",
}: CourseCertificateViewProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border-4 border-primary/20 bg-white px-8 py-10 text-center shadow-[0_8px_32px_rgba(0,0,0,0.08)] ${className}`}
      dir="rtl"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-4 rounded-xl border border-primary/15"
      />

      {certificate.logo ? (
        <div className="relative mx-auto mb-6 h-16 w-40">
          <Image
            src={certificate.logo}
            alt=""
            fill
            className="object-contain"
            sizes="160px"
          />
        </div>
      ) : null}

      <p className="text-sm font-medium tracking-wide text-primary">
        شهادة إتمام
      </p>
      <h3 className="mt-3 text-2xl font-bold text-black md:text-3xl">
        {certificate.courseName}
      </h3>
      <p className="mt-6 text-sm text-[#717171]">تُمنح هذه الشهادة إلى</p>
      <p className="mt-2 text-xl font-bold text-black md:text-2xl">
        {certificate.userName}
      </p>
      <p className="mt-8 text-sm text-[#717171]">
        تاريخ الإصدار:{" "}
        <span className="font-medium text-[#454545]">
          {certificate.issuedAt}
        </span>
      </p>
    </div>
  );
}

function buildCertificatePrintHtml(certificate: CourseCertificate): string {
  const logoHtml = certificate.logo
    ? `<img src="${certificate.logo}" alt="" style="height:64px;max-width:160px;object-fit:contain;margin:0 auto 24px;display:block;" />`
    : "";

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8" />
  <title>شهادة إتمام - ${certificate.courseName}</title>
  <style>
    body {
      margin: 0;
      padding: 32px;
      font-family: Arial, sans-serif;
      background: #fafafa;
      color: #111;
    }
    .certificate {
      max-width: 720px;
      margin: 0 auto;
      padding: 48px 32px;
      border: 4px solid rgba(0, 128, 117, 0.2);
      border-radius: 16px;
      background: #fff;
      text-align: center;
    }
    .label { color: #008075; font-size: 14px; font-weight: 600; }
    .course { margin-top: 12px; font-size: 28px; font-weight: 700; }
    .subtitle { margin-top: 24px; color: #717171; font-size: 14px; }
    .name { margin-top: 8px; font-size: 24px; font-weight: 700; }
    .date { margin-top: 32px; color: #717171; font-size: 14px; }
  </style>
</head>
<body>
  <div class="certificate">
    ${logoHtml}
    <div class="label">شهادة إتمام</div>
    <div class="course">${certificate.courseName}</div>
    <div class="subtitle">تُمنح هذه الشهادة إلى</div>
    <div class="name">${certificate.userName}</div>
    <div class="date">تاريخ الإصدار: ${certificate.issuedAt}</div>
  </div>
</body>
</html>`;
}

export function printCourseCertificate(certificate: CourseCertificate): void {
  const printWindow = window.open("", "_blank", "noopener,noreferrer");

  if (!printWindow) {
    return;
  }

  printWindow.document.write(buildCertificatePrintHtml(certificate));
  printWindow.document.close();
  printWindow.focus();

  printWindow.onload = () => {
    printWindow.print();
  };
}
