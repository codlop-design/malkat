import type { CourseCertificate } from "@/src/features/products/data/courseStages";

export function formatCertificateCourseName(name: string): string {
  return name.replace(/^برنامج\s+/u, "").trim() || name;
}

export function buildCertificateStyles(): string {
  return `
    * { box-sizing: border-box; margin: 0; padding: 0; }

    @page {
      size: A4 landscape;
      margin: 0;
    }

    html, body {
      width: 100%;
      height: 100%;
    }

    body {
      font-family: "Baloo Bhaijaan 2", Arial, sans-serif;
      background: #ececec;
    }

    .page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
    }

    .certificate {
      position: relative;
      width: min(100%, 1123px);
      aspect-ratio: 1123 / 794;
      overflow: hidden;
      border-radius: 6px;
      background-color: #f6f4ec;
      background-image: radial-gradient(
        circle at 1px 1px,
        rgba(31, 53, 82, 0.05) 1px,
        transparent 0
      );
      background-size: 18px 18px;
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
      display: flex;
      flex-direction: column;
      padding: 5% 6% 6%;
      direction: rtl;
      color: #1f3552;
    }

    .watermark {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      z-index: 0;
    }

    .watermark img {
      width: 42%;
      max-width: 360px;
      opacity: 0.05;
      object-fit: contain;
    }

    .decor {
      position: absolute;
      pointer-events: none;
      z-index: 0;
    }

    .decor-orange {
      left: -4%;
      bottom: -8%;
      width: 28%;
      height: 42%;
    }

    .decor-teal {
      left: 16%;
      bottom: -10%;
      width: 22%;
      height: 36%;
    }

    .decor-gold {
      left: 2%;
      top: 34%;
      width: 8%;
      height: 28%;
      opacity: 0.85;
    }

    .certificate-header,
    .certificate-body,
    .certificate-footer {
      position: relative;
      z-index: 1;
    }

    .certificate-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 24px;
      min-height: 72px;
    }

    .partner-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      max-width: 34%;
    }

    .partner-icon {
      width: 42px;
      height: 42px;
      flex-shrink: 0;
    }

    .partner-text {
      font-size: clamp(11px, 1.1vw, 16px);
      font-weight: 700;
      line-height: 1.5;
      color: #1f3552;
    }

    .main-brand {
      display: flex;
      align-items: center;
      gap: 12px;
      max-width: 42%;
      margin-right: auto;
    }

    .main-brand-logo {
      width: clamp(48px, 5vw, 72px);
      height: clamp(48px, 5vw, 72px);
      object-fit: contain;
      flex-shrink: 0;
    }

    .main-brand-text {
      text-align: right;
    }

    .main-brand-name {
      font-size: clamp(22px, 2.4vw, 34px);
      font-weight: 800;
      line-height: 1.1;
      color: #1f3552;
    }

    .main-brand-tagline {
      margin-top: 4px;
      font-size: clamp(10px, 0.95vw, 14px);
      font-weight: 500;
      color: #5c6b7d;
      line-height: 1.5;
    }

    .certificate-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 2% 4%;
      gap: clamp(14px, 2.2vw, 28px);
    }

    .award-line {
      font-size: clamp(14px, 1.45vw, 21px);
      font-weight: 600;
      line-height: 1.8;
      color: #1f3552;
    }

    .award-line .date {
      font-weight: 700;
    }

    .name-pill {
      width: min(68%, 560px);
      min-height: clamp(48px, 5.5vw, 72px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px 32px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.88);
      box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.95);
      font-size: clamp(22px, 2.5vw, 36px);
      font-weight: 700;
      line-height: 1.3;
      color: #1f3552;
    }

    .program-line {
      max-width: 92%;
      font-size: clamp(16px, 1.8vw, 28px);
      font-weight: 700;
      line-height: 1.75;
      color: #c9872a;
    }

    .program-line .program-name {
      color: #008075;
    }

    .competencies {
      max-width: 94%;
      font-size: clamp(11px, 1vw, 16px);
      font-weight: 500;
      line-height: 1.8;
      color: #1f3552;
    }

    .certificate-footer {
      display: flex;
      justify-content: flex-end;
      padding-top: 8px;
    }

    .signature-block {
      min-width: 180px;
      text-align: center;
    }

    .signature-title {
      font-size: clamp(12px, 1.05vw, 16px);
      font-weight: 500;
      color: #8a96a3;
    }

    .signature-line {
      margin-top: 28px;
      border-top: 2px dotted #b8c0c8;
    }

    @media print {
      body { background: #fff; }
      .page { padding: 0; }
      .certificate {
        width: 100vw;
        height: 100vh;
        max-width: none;
        aspect-ratio: auto;
        border-radius: 0;
        box-shadow: none;
      }
    }
  `;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function decorSvg(): string {
  return `
    <svg class="decor decor-orange" viewBox="0 0 200 260" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M20 220C60 120 120 40 180 20C150 90 130 180 110 250C70 240 40 235 20 220Z" fill="#F0782E"/>
      <path d="M0 260C30 180 70 110 120 70C90 130 70 200 55 260H0Z" fill="#E85D24"/>
    </svg>
    <svg class="decor decor-teal" viewBox="0 0 180 220" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M10 210C50 150 90 80 150 30C130 90 120 160 115 220C70 215 35 212 10 210Z" fill="#008075"/>
      <path d="M40 220C70 170 100 120 160 80C130 130 110 180 100 220H40Z" fill="#00A896"/>
    </svg>
    <svg class="decor decor-gold" viewBox="0 0 60 180" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M30 0C10 40 5 90 15 130C22 160 35 175 45 180C35 150 28 110 30 70C32 40 35 15 30 0Z" fill="#C9A227"/>
      <path d="M20 20C15 60 18 100 28 140" stroke="#D4AF37" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `;
}

function partnerIconSvg(): string {
  return `
    <svg class="partner-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M24 4C14 12 8 22 8 32C8 38 12 42 18 42C20 34 22 26 24 18C26 26 28 34 30 42C36 42 40 38 40 32C40 22 34 12 24 4Z" fill="#008075"/>
      <path d="M24 18V42" stroke="#C9A227" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `;
}

export function buildCertificateMarkup(certificate: CourseCertificate): string {
  const courseName = escapeHtml(
    formatCertificateCourseName(certificate.courseName),
  );
  const userName = escapeHtml(certificate.userName);
  const issuedAt = escapeHtml(certificate.issuedAt);
  const logo = certificate.logo
    ? `<img class="main-brand-logo" src="${escapeHtml(certificate.logo)}" alt="" />`
    : "";
  const watermark = certificate.logo
    ? `<div class="watermark"><img src="${escapeHtml(certificate.logo)}" alt="" /></div>`
    : "";

  return `
    <div class="certificate">
      ${watermark}
      ${decorSvg()}

      <header class="certificate-header">
        <div class="partner-brand">
          ${partnerIconSvg()}
          <p class="partner-text">شركة ازر للتعليم</p>
        </div>
        <div class="main-brand">
          <div class="main-brand-text">
            <p class="main-brand-name">ملكات</p>
            <p class="main-brand-tagline">تأسيس كفايات الأطفال</p>
          </div>
          ${logo}
        </div>
      </header>

      <main class="certificate-body">
        <p class="award-line">
          تم منح هذه الشهادة بتاريخ
          <span class="date">${issuedAt}</span>
          إلى
        </p>
        <div class="name-pill">${userName}</div>
        <p class="program-line">
          لإتمام برنامج
          <span class="program-name">${courseName}</span>
          لتأسيس كفايات الأطفال
        </p>
        <p class="competencies">
          كفايات شرعية - كفايات قيمية - كفايات شخصية - كفايات ممتدة
        </p>
      </main>

      <footer class="certificate-footer">
        <div class="signature-block">
          <p class="signature-title">المدير التنفيذي</p>
          <div class="signature-line"></div>
        </div>
      </footer>
    </div>
  `;
}

export function buildCertificatePrintHtml(
  certificate: CourseCertificate,
  origin: string,
): string {
  void origin;

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>شهادة إتمام - ${escapeHtml(certificate.courseName)}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Baloo+Bhaijaan+2:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <style>${buildCertificateStyles()}</style>
</head>
<body>
  <div class="page">
    ${buildCertificateMarkup(certificate)}
  </div>
  <script>
    window.addEventListener("load", function () {
      setTimeout(function () {
        window.focus();
        window.print();
      }, 700);
    });
  </script>
</body>
</html>`;
}

export function openCourseCertificatePrintWindow(
  certificate: CourseCertificate,
): void {
  if (typeof window === "undefined") {
    return;
  }

  const html = buildCertificatePrintHtml(certificate, window.location.origin);
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const blobUrl = URL.createObjectURL(blob);
  const printWindow = window.open(blobUrl, "_blank");

  if (!printWindow) {
    URL.revokeObjectURL(blobUrl);
    return;
  }

  printWindow.addEventListener("load", () => {
    URL.revokeObjectURL(blobUrl);
  });
}
