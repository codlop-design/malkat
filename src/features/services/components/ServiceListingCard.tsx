import ServiceCard from "@/src/features/products/components/cards/ServiceCard";
import type { ServiceItem } from "@/src/features/services/data/services";

type ServiceListingCardProps = {
  service: ServiceItem;
};

export default function ServiceListingCard({ service }: ServiceListingCardProps) {
  const { id, slug, title, description, imageSrc, tags } = service;

  return (
    <ServiceCard
      id={id}
      category="services"
      slug={slug}
      title={title}
      description={description}
      imageSrc={imageSrc}
      tags={tags}
    />
  );
}
