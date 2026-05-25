"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

import { useSettings } from "@/src/features/settings";
import { motionViewport, staggerContainer } from "@/src/lib/motion";

import { buildContactDetails } from "./buildContactDetails";
import ContactDetailCard from "./ContactDetailCard";
import ContactWhyCard from "./ContactWhyCard";

export default function ContactInfoPanel() {
  const settings = useSettings();

  const contactDetails = useMemo(
    () => buildContactDetails(settings?.contacts, settings?.location?.map_url),
    [settings?.contacts, settings?.location?.map_url],
  );

  return (
    <motion.div
      className="flex flex-col gap-4"
      initial="hidden"
      whileInView="visible"
      viewport={motionViewport}
      variants={staggerContainer(0.1, 0.1)}
    >
      {contactDetails.map((item) => (
        <ContactDetailCard key={item.label} item={item} />
      ))}
      <ContactWhyCard />
    </motion.div>
  );
}
