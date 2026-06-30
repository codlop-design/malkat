import type { CourseCertificate } from "@/src/features/products/data/courseStages";

export const CERTIFICATE_TEMPLATE_PATH = "/certificates/template.png";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function resolveAssetUrl(path: string, origin: string): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${origin}${path.startsWith("/") ? path : `/${path}`}`;
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
      color: #1f3552;
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
      border-radius: 4px;
      background-color: #f7f4ec;
      background-image: url("${CERTIFICATE_TEMPLATE_PATH}");
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
    }

    .overlay {
      position: absolute;
      inset: 34% 7% 24%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 12px 24px;
      text-align: center;
      direction: rtl;
      background: linear-gradient(
        180deg,
        rgba(247, 244, 236, 0) 0%,
        rgba(247, 244, 236, 0.96) 12%,
        rgba(247, 244, 236, 0.96) 88%,
        rgba(247, 244, 236, 0) 100%
      );
    }

    .award-line {
      font-size: clamp(14px, 1.55vw, 22px);
      font-weight: 600;
      color: #1f3552;
      line-height: 1.8;
    }

    .award-line .date {
      display: inline-block;
      min-width: 120px;
      font-weight: 700;
    }

    .name-box {
      margin-top: 2.2%;
      width: min(72%, 560px);
      min-height: clamp(44px, 5.5vw, 72px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px 24px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.82);
      border: 1px solid rgba(255, 255, 255, 0.95);
      font-size: clamp(18px, 2.2vw, 32px);
      font-weight: 700;
      color: #1f3552;
      line-height: 1.4;
    }

    .program-line {
      margin-top: 3.2%;
      max-width: 88%;
      font-size: clamp(16px, 1.85vw, 28px);
      font-weight: 700;
      color: #c9872a;
      line-height: 1.7;
    }

    .program-line .program-name {
      color: #008075;
    }

    .competencies {
      margin-top: 1.4%;
      max-width: 90%;
      font-size: clamp(11px, 1.05vw, 16px);
      font-weight: 500;
      color: #1f3552;
      line-height: 1.8;
    }

    @media print {
      body {
        background: #fff;
      }

      .page {
        padding: 0;
      }

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

export function buildCertificateMarkup(certificate: CourseCertificate): string {
  const courseName = escapeHtml(certificate.courseName);
  const userName = escapeHtml(certificate.userName);
  const issuedAt = escapeHtml(certificate.issuedAt);

  return `
    <div class="certificate">
      <div class="overlay">
        <p class="award-line">
          تم منح هذه الشهادة بتاريخ
          <span class="date">${issuedAt}</span>
          إلى
        </p>
        <div class="name-box">${userName}</div>
        <p class="program-line">
          لإتمام برنامج
          <span class="program-name">${courseName}</span>
          لتأسيس كفايات الأطفال
        </p>
        <p class="competencies">
          كفايات شرعية - كفايات قيمية - كفايات شخصية - كفايات ممتدة
        </p>
      </div>
    </div>
  `;
}

export function buildCertificatePrintHtml(
  certificate: CourseCertificate,
  origin: string,
): string {
  const templateUrl = resolveAssetUrl(CERTIFICATE_TEMPLATE_PATH, origin);
  const styles = buildCertificateStyles().replace(
    `url("${CERTIFICATE_TEMPLATE_PATH}")`,
    `url("${templateUrl}")`,
  );

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>شهادة إتمام - ${escapeHtml(certificate.courseName)}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Baloo+Bhaijaan+2:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <style>${styles}</style>
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
