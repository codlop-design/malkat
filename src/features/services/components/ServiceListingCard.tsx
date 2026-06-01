import ServiceCard, {
  type ServiceCardProps,
} from "@/src/features/products/components/cards/ServiceCard";

type ServiceListingCardProps = {
  service: ServiceCardProps;
};

export default function ServiceListingCard({ service }: ServiceListingCardProps) {
  return <ServiceCard category="services" {...service} />;
}
