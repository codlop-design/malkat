"use client";

import Image from "next/image";

import type { CourseCertificate } from "@/src/features/products/data/courseStages";
import {
  buildCertificateStyles,
  formatCertificateCourseName,
} from "@/src/features/products/lib/courseCertificateDocument";

type CourseCertificateViewProps = {
  certificate: CourseCertificate;
  className?: string;
};

function CertificateDecorations() {
  return (
    <>
      <svg
        className="decor decor-orange"
        viewBox="0 0 200 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M20 220C60 120 120 40 180 20C150 90 130 180 110 250C70 240 40 235 20 220Z"
          fill="#F0782E"
        />
        <path
          d="M0 260C30 180 70 110 120 70C90 130 70 200 55 260H0Z"
          fill="#E85D24"
        />
      </svg>
      <svg
        className="decor decor-teal"
        viewBox="0 0 180 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M10 210C50 150 90 80 150 30C130 90 120 160 115 220C70 215 35 212 10 210Z"
          fill="#008075"
        />
        <path
          d="M40 220C70 170 100 120 160 80C130 130 110 180 100 220H40Z"
          fill="#00A896"
        />
      </svg>
      <svg
        className="decor decor-gold"
        viewBox="0 0 60 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M30 0C10 40 5 90 15 130C22 160 35 175 45 180C35 150 28 110 30 70C32 40 35 15 30 0Z"
          fill="#C9A227"
        />
        <path
          d="M20 20C15 60 18 100 28 140"
          stroke="#D4AF37"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </>
  );
}

export default function CourseCertificateView({
  certificate,
  className = "",
}: CourseCertificateViewProps) {
  const courseName = formatCertificateCourseName(certificate.courseName);
  const logoIsRemote = certificate.logo?.startsWith("http") ?? false;

  return (
    <div className={className} dir="rtl">
      <style>{buildCertificateStyles()}</style>

      <div className="certificate">
        {certificate.logo ? (
          <div className="watermark" aria-hidden>
            <img src={certificate.logo} alt="" />
          </div>
        ) : null}

        <CertificateDecorations />

        <header className="certificate-header">
          <div className="partner-brand">
            <svg
              className="partner-icon"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M24 4C14 12 8 22 8 32C8 38 12 42 18 42C20 34 22 26 24 18C26 26 28 34 30 42C36 42 40 38 40 32C40 22 34 12 24 4Z"
                fill="#008075"
              />
              <path
                d="M24 18V42"
                stroke="#C9A227"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <p className="partner-text">شركة ازر للتعليم</p>
          </div>

          <div className="main-brand">
            <div className="main-brand-text">
              <p className="main-brand-name">ملكات</p>
              <p className="main-brand-tagline">تأسيس كفايات الأطفال</p>
            </div>
            {certificate.logo ? (
              <Image
                src={certificate.logo}
                alt=""
                width={72}
                height={72}
                className="main-brand-logo"
                unoptimized={logoIsRemote}
              />
            ) : null}
          </div>
        </header>

        <main className="certificate-body">
          <p className="award-line">
            تم منح هذه الشهادة بتاريخ{" "}
            <span className="date">{certificate.issuedAt}</span> إلى
          </p>
          <div className="name-pill">{certificate.userName}</div>
          <p className="program-line">
            لإتمام برنامج{" "}
            <span className="program-name">{courseName}</span> لتأسيس كفايات
            الأطفال
          </p>
          <p className="competencies">
            كفايات شرعية - كفايات قيمية - كفايات شخصية - كفايات ممتدة
          </p>
        </main>

        <footer className="certificate-footer">
          <div className="signature-block">
            <p className="signature-title">المدير التنفيذي</p>
            <div className="signature-line" />
          </div>
        </footer>
      </div>
    </div>
  );
}

export { openCourseCertificatePrintWindow as printCourseCertificate } from "@/src/features/products/lib/courseCertificateDocument";
