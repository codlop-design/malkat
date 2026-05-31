import RequestServiceCategories from "@/src/features/request-service/components/RequestServiceCategories";
import RequestServiceIntro from "@/src/features/request-service/components/RequestServiceIntro";
import RequestServiceWhyUs from "@/src/features/request-service/components/RequestServiceWhyUs";
import type {
  ServiceRequestFormOptions,
  ServiceRequestPageContent,
} from "@/src/features/request-service/types";

type RequestServicePageContentProps = {
  content: ServiceRequestPageContent;
  formOptions: ServiceRequestFormOptions;
};

export default function RequestServicePageContent({
  content,
  formOptions,
}: RequestServicePageContentProps) {
  return (
    <>
      <RequestServiceIntro
        section={content.start}
        formOptions={formOptions}
      />
      <RequestServiceWhyUs section={content.whyUs} />
      <RequestServiceCategories section={content.services} />
    </>
  );
}
