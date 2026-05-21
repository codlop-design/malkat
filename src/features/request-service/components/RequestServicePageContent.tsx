import RequestServiceCategories from "@/src/features/request-service/components/RequestServiceCategories";
import RequestServiceIntro from "@/src/features/request-service/components/RequestServiceIntro";
import RequestServiceWhyUs from "@/src/features/request-service/components/RequestServiceWhyUs";

export default function RequestServicePageContent() {
  return (
    <>
      <RequestServiceIntro />
      <RequestServiceWhyUs />
      <RequestServiceCategories />
    </>
  );
}
