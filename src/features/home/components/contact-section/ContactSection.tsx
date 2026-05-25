"use client";

import { motion } from "framer-motion";

import ContactForm from "@/src/features/contact/components/ContactForm";
import type { ContactType } from "@/src/features/contact/types";
import { fadeUp, motionViewport } from "@/src/lib/motion";
import ContactInfoPanel from "./ContactInfoPanel";
import ContactSectionHeader from "./ContactSectionHeader";

type ContactSectionProps = {
  contactTypes: ContactType[];
};

export default function ContactSection({ contactTypes }: ContactSectionProps) {
  return (
    <section className="bg-[#FAFAFA] py-16">
      <div className="container">
        <ContactSectionHeader />

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          <ContactInfoPanel />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={motionViewport}
            variants={fadeUp}
          >
            <ContactForm contactTypes={contactTypes} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
