"use client";

import ContactInfoPanel from "./ContactInfoPanel";
import ContactSectionHeader from "./ContactSectionHeader";

export default function ContactSection() {
  return (
    <section className="bg-[#FAFAFA] py-16">
      <div className="container">
        <ContactSectionHeader />
        <ContactInfoPanel />
      </div>
    </section>
  );
}
