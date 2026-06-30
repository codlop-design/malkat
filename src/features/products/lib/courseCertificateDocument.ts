import type { CourseCertificate } from "@/src/features/products/data/courseStages";

export const CERTIFICATE_TEMPLATE_PATH = "/certificates/template.png";

const TEMPLATE_BG = "#f6f4ec";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatCourseName(name: string): string {
  return name.replace(/^برنامج\s+/u, "").trim() || name;
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
      background-color: ${TEMPLATE_BG};
      background-image: url("${CERTIFICATE_TEMPLATE_PATH}");
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
    }

    .cover {
      position: absolute;
      left: 0;
      right: 0;
      z-index: 1;
      background: ${TEMPLATE_BG};
    }

    .cover-award {
      top: 31.8%;
      height: 5.2%;
    }

    .cover-name {
      top: 39.8%;
      left: 18%;
      right: 18%;
      height: 8.4%;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.94);
    }

    .cover-program {
      top: 50.8%;
      height: 7.4%;
    }

    .cover-competencies {
      top: 59.8%;
      height: 4.8%;
    }

    .field {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      z-index: 2;
      width: 88%;
      text-align: center;
      direction: rtl;
    }

    .award-line {
      top: 32.4%;
      font-size: clamp(13px, 1.45vw, 20px);
      font-weight: 600;
      color: #1f3552;
      line-height: 1.6;
      white-space: nowrap;
    }

    .award-line .date {
      font-weight: 700;
    }

    .name-box {
      top: 41.2%;
      width: min(64%, 520px);
      min-height: clamp(42px, 5vw, 64px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px 28px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.94);
      font-size: clamp(20px, 2.35vw, 34px);
      font-weight: 700;
      color: #1f3552;
      line-height: 1.3;
    }

    .program-line {
      top: 51.6%;
      width: 86%;
      font-size: clamp(15px, 1.75vw, 26px);
      font-weight: 700;
      color: #c9872a;
      line-height: 1.65;
    }

    .program-line .program-name {
      color: #008075;
    }

    .competencies {
      top: 60.2%;
      width: 90%;
      font-size: clamp(10px, 0.95vw, 15px);
      font-weight: 500;
      color: #1f3552;
      line-height: 1.7;
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
  const courseName = escapeHtml(formatCourseName(certificate.courseName));
  const userName = escapeHtml(certificate.userName);
  const issuedAt = escapeHtml(certificate.issuedAt);

  return `
    <div class="certificate">
      <div class="cover cover-award" aria-hidden="true"></div>
      <div class="cover cover-name" aria-hidden="true"></div>
      <div class="cover cover-program" aria-hidden="true"></div>
      <div class="cover cover-competencies" aria-hidden="true"></div>

      <p class="field award-line">
        تم منح هذه الشهادة بتاريخ
        <span class="date">${issuedAt}</span>
        إلى
      </p>
      <div class="field name-box">${userName}</div>
      <p class="field program-line">
        لإتمام برنامج
        <span class="program-name">${courseName}</span>
        لتأسيس كفايات الأطفال
      </p>
      <p class="field competencies">
        كفايات شرعية - كفايات قيمية - كفايات شخصية - كفايات ممتدة
      </p>
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
