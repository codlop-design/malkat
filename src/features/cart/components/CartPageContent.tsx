import { CartItemCategory } from "../types/cart-types";
import QuantityControl from "@/src/components/QuantityControl";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import Image from "next/image";
import { Clock, BookOpen, Trash } from "lucide-react";

const CART_ITEMS: CartItemCategory[] = [
  {
    id: "books",
    title: "الكتب",
    icon: (
      <svg
        width="21"
        height="21"
        viewBox="0 0 21 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.3732 14.169C12.1701 15.4986 10.9077 18.0787 10.5 18.8125V7C10.8442 6.38045 11.7977 4.6642 13.4122 3.40431C14.2222 2.77218 14.6273 2.45611 15.1886 2.73011C15.75 3.00411 15.75 3.61573 15.75 4.83896V12.0539C15.75 12.7089 15.75 13.0364 15.6208 13.2652C15.4917 13.4941 15.1189 13.7191 14.3732 14.169Z"
          stroke="#404040"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.5 6.82986C9.89897 6.19852 8.15653 4.6991 5.23299 4.17338C3.75191 3.90705 3.01137 3.77389 2.38069 4.28429C1.75 4.79469 1.75 5.62352 1.75 7.28117V13.2385C1.75 14.7542 1.75 15.512 2.15477 15.9852C2.55955 16.4583 3.45069 16.6185 5.23299 16.939C6.82179 17.2247 8.06176 17.68 8.95928 18.1374C9.84233 18.5875 10.2839 18.8125 10.5 18.8125C10.7161 18.8125 11.1577 18.5875 12.0407 18.1374C12.9382 17.68 14.1782 17.2247 15.767 16.939C17.5493 16.6185 18.4405 16.4583 18.8452 15.9852C19.25 15.512 19.25 14.7542 19.25 13.2385V7.28117C19.25 5.62352 19.25 4.79469 18.6193 4.28429C17.9886 3.77389 16.625 4.17338 15.75 4.8125"
          stroke="#404040"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    items: [
      {
        id: "book-1",
        title: "قصص الأنبياء للأطفال",
        description:
          "سلسلة قصص تربوية رائعة تحكي قصص الأنبياء الكرام بأسلوب مناسب للأطفال مع رسوم جميلة.",
        image:
          "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80",
        quantity: 3,
        isFree: true,
        level: "متوسط",
        ageRange: "6-9 سنوات",
        isOnline: true,
      },
      {
        id: "book-2",
        title: "قصص الأنبياء للأطفال",
        description:
          "سلسلة قصص تربوية رائعة تحكي قصص الأنبياء الكرام بأسلوب مناسب للأطفال مع رسوم جميلة.",
        image:
          "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80",
        quantity: 3,
        isFree: true,
        level: "متوسط",
        ageRange: "6-9 سنوات",
        isOnline: true,
      },
    ],
  },
  {
    id: "courses",
    title: "الدورات",
    icon: (
      <svg
        width="21"
        height="21"
        viewBox="0 0 21 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.75 7C1.75 8.17406 8.8429 11.375 10.5 11.375C12.1571 11.375 19.25 8.17406 19.25 7C19.25 5.82594 12.1571 2.625 10.5 2.625C8.8429 2.625 1.75 5.82594 1.75 7Z"
          stroke="#404040"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.25 9.625L5.46384 14.53C5.46876 14.6427 5.48062 14.7557 5.51464 14.8633C5.60444 15.1474 5.76566 15.4047 6.00868 15.5788C7.95517 16.9737 13.0448 16.9737 14.9913 15.5788C15.2343 15.4047 15.3956 15.1474 15.4854 14.8633C15.5194 14.7557 15.5312 14.6427 15.5362 14.53L15.75 9.625"
          stroke="#404040"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18.6875 8.3125C18.6875 7.89829 18.3517 7.5625 17.9375 7.5625C17.5233 7.5625 17.1875 7.89829 17.1875 8.3125H17.9375H18.6875ZM16.6875 17.293L17.4172 17.4663L16.6875 17.293ZM19.1875 17.293L19.9172 17.1197V17.1197L19.1875 17.293ZM17.9375 8.3125H17.1875V14.4438H17.9375H18.6875V8.3125H17.9375ZM16.6875 17.293L17.4172 17.4663C17.5414 16.9434 17.7556 16.4636 17.9876 16.0095C18.1973 15.5992 18.483 15.1043 18.6351 14.7193L17.9375 14.4438L17.2399 14.1683C17.1223 14.4662 16.9275 14.7876 16.6519 15.327C16.3986 15.8227 16.1226 16.426 15.9578 17.1197L16.6875 17.293ZM19.1875 17.293L19.9172 17.1197C19.7524 16.426 19.4764 15.8227 19.2231 15.327C18.9475 14.7876 18.7527 14.4662 18.6351 14.1683L17.9375 14.4438L17.2399 14.7193C17.392 15.1043 17.6777 15.5992 17.8874 16.0095C18.1194 16.4636 18.3336 16.9434 18.4578 17.4663L19.1875 17.293ZM18.2135 18.375V17.625H17.6615V18.375V19.125H18.2135V18.375ZM16.6875 17.293L15.9578 17.1197C15.8493 17.5764 15.7716 18.2247 16.2379 18.6924C16.4556 18.9107 16.7218 19.011 16.9493 19.0615C17.1761 19.1117 17.4221 19.125 17.6615 19.125V18.375V17.625C17.4644 17.625 17.3443 17.6126 17.2741 17.597C17.2047 17.5816 17.2429 17.5759 17.3001 17.6333C17.3296 17.6629 17.3512 17.6966 17.3642 17.7274C17.3763 17.7559 17.3766 17.7709 17.3758 17.7621C17.3733 17.7355 17.3739 17.6487 17.4172 17.4663L16.6875 17.293ZM19.1875 17.293L18.4578 17.4663C18.5011 17.6487 18.5017 17.7355 18.4992 17.7621C18.4984 17.7709 18.4987 17.7559 18.5108 17.7274C18.5238 17.6966 18.5454 17.6629 18.5749 17.6333C18.6321 17.5759 18.6703 17.5816 18.6009 17.597C18.5307 17.6126 18.4106 17.625 18.2135 17.625V18.375V19.125C18.4529 19.125 18.6989 19.1117 18.9257 19.0615C19.1532 19.011 19.4194 18.9107 19.6371 18.6924C20.1034 18.2247 20.0257 17.5764 19.9172 17.1197L19.1875 17.293Z"
          fill="#404040"
        />
      </svg>
    ),
    items: [
      {
        id: "course-1",
        title: "أساسيات البرمجة للأطفال",
        description:
          "دورة تفاعلية تساعد الأطفال على تعلم أساسيات البرمجة والتفكير المنطقي من خلال أنشطة وألعاب تعليمية ممتعة.",
        image:
          "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80",
        quantity: 1,
        isFree: false,
        level: "مبتدئ",
        ageRange: "6-9 سنوات",
        duration: "6 أسابيع",
        sessions: "12 جلسة",
        isOnline: true,
        instructorName: "د. محمد الشهري",
        instructorAvatar: "https://github.com/shadcn.png",
      },
    ],
  },
  {
    id: "services",
    title: "الخدمات",
    icon: (
      <svg
        width="21"
        height="21"
        viewBox="0 0 21 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="5.46875"
          cy="5.46875"
          r="3.71875"
          stroke="#404040"
          strokeWidth="1.5"
        />
        <path
          d="M15.75 8.1875V9.1875M15.75 8.1875C14.8643 8.1875 14.084 7.74556 13.6264 7.07452M17.8737 4.30063C18.1443 4.69747 18.3021 5.17444 18.3021 5.6875C18.3021 6.20062 18.1443 6.67764 17.8736 7.07452C17.416 7.74556 16.6357 8.1875 15.75 8.1875M15.75 3.1875C16.6357 3.1875 17.4161 3.6295 17.8737 4.30063M15.75 3.1875C14.8643 3.1875 14.0839 3.6295 13.6263 4.30063M15.75 3.1875V2.1875M18.8125 3.6875L17.8737 4.30063M12.6878 7.6875L13.6264 7.07452M12.6875 3.6875L13.6263 4.30063M18.8122 7.6875L17.8736 7.07452M13.6263 4.30063C13.3557 4.69747 13.1979 5.17444 13.1979 5.6875C13.1979 6.20062 13.3557 6.67764 13.6264 7.07452"
          stroke="#404040"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle
          cx="15.5312"
          cy="15.5312"
          r="3.71875"
          stroke="#404040"
          strokeWidth="1.5"
        />
        <circle
          cx="5.46875"
          cy="15.5312"
          r="3.71875"
          stroke="#404040"
          strokeWidth="1.5"
        />
      </svg>
    ),
    items: [
      {
        id: "service-1",
        title: "استشارة التطور المعرفي",
        description:
          "خدمة مخصصة لتقييم وتوجيه مهارات الطفل المعرفية باستخدام تقنيات حديثة.",
        image:
          "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80",
        quantity: 1,
        isFree: false,
        isOnline: true,
      },
    ],
  },
  {
    id: "activities",
    title: "الأنشطة",
    icon: (
      <svg
        width="21"
        height="21"
        viewBox="0 0 21 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.5 5.069C11.474 5.77407 12.4643 6.6165 13.4239 7.57607C14.3835 8.53568 15.2259 9.52606 15.931 10.5001M15.931 10.5001C18.1923 7.37638 19.0408 4.42121 17.8098 3.1902C16.5788 1.95919 13.6237 2.80769 10.5 5.069C9.52605 5.77408 8.5357 6.61651 7.57613 7.57608C6.61653 8.53569 5.77408 9.52606 5.069 10.5001M15.931 10.5001C18.1923 13.6237 19.0407 16.5788 17.8097 17.8098C16.8971 18.7225 15.0367 18.4921 12.8625 17.3903M15.931 10.5001C15.2259 11.474 14.3835 12.4644 13.4239 13.4239C12.4644 14.3835 11.474 15.226 10.5 15.9311M10.5 15.9311C9.52602 15.226 8.53565 14.3835 7.57605 13.4239C6.61649 12.4644 5.77407 11.474 5.069 10.5001M10.5 15.9311C7.37637 18.1923 4.42126 19.0408 3.19027 17.8098C1.95928 16.5788 2.80775 13.6237 5.069 10.5001M5.069 10.5001C2.80769 7.37637 1.95918 4.4212 3.19019 3.19019C4.10287 2.2775 5.96331 2.50791 8.1375 3.6097"
          stroke="#404040"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle
          cx="10.5"
          cy="10.5"
          r="1.75"
          stroke="#404040"
          strokeWidth="1.5"
        />
      </svg>
    ),
    items: [
      {
        id: "guide-1",
        title: "الأدلة التعليمية للأطفال",
        description: "الأدلة التعليمية للأطفال",
        image:
          "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80",
        quantity: 1,
        isFree: false,
        isOnline: false,
        ageRange: "6-9 سنوات",
      },
    ],
  },
  {
    id: "guides",
    title: "الأدلة",
    icon: (
      <svg
        width="21"
        height="21"
        viewBox="0 0 21 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.0625 8.75C3.0625 5.45017 3.0625 3.80025 4.1517 2.77513C5.24089 1.75 6.99393 1.75 10.5 1.75H11.1761C14.0297 1.75 15.4565 1.75 16.4473 2.44811C16.7312 2.64812 16.9832 2.88533 17.1958 3.15253C17.9375 4.08509 17.9375 5.42794 17.9375 8.11364V10.3409C17.9375 12.9337 17.9375 14.2301 17.5272 15.2655C16.8675 16.93 15.4725 18.243 13.7039 18.8638C12.6038 19.25 11.2264 19.25 8.47159 19.25C6.89741 19.25 6.11031 19.25 5.48168 19.0293C4.47107 18.6746 3.67391 17.9243 3.29697 16.9731C3.0625 16.3815 3.0625 15.6407 3.0625 14.1591V8.75Z"
          stroke="#404040"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M17.9375 10.5C17.9375 12.1108 16.6317 13.4167 15.0208 13.4167C14.4383 13.4167 13.7515 13.3146 13.1851 13.4664C12.6818 13.6012 12.2887 13.9943 12.1539 14.4976C12.0021 15.064 12.1042 15.7508 12.1042 16.3333C12.1042 17.9442 10.7983 19.25 9.1875 19.25"
          stroke="#404040"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7 6.125H13.125"
          stroke="#404040"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7 9.625H9.625"
          stroke="#404040"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    items: [
      {
        id: "guide-1",
        title: "الأدلة التعليمية للأطفال",
        description: "الأدلة التعليمية للأطفال",
        image:
          "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80",
        quantity: 1,
        isFree: true,
        isOnline: false,
        ageRange: "للأباء",
      },
    ],
  },
];

const CartPageContent = () => {
  return (
    <section className="py-10">
      <div className="container">
        <div className="space-y-6">
          {CART_ITEMS.map((item) => (
            <Accordion
              key={item.id}
              type="single"
              collapsible
              defaultValue={CART_ITEMS[0].title}
            >
              <AccordionItem
                value={item.title}
                className="p-3 border border-[#C7C7CC] rounded-xl"
              >
                <AccordionTrigger className="gap-2 p-0 no-underline! items-center">
                  {item.icon}
                  <span className="text-base font-medium text-[#454545]">
                    {item.title}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="space-y-2 pt-4 pb-0">
                  {item.items.map((item) => (
                    <div
                      key={item.id}
                      className="space-y-4 pt-4 border-t border-[#E5E5E5]"
                    >
                      <div className="flex items-center gap-2">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={100}
                          height={100}
                          className="shrink-0 object-cover aspect-square rounded-lg"
                        />
                        <div className="space-y-2">
                          <h3 className="text-base font-medium text-[#454545] line-clamp-2">
                            {item.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-3">
                            {item.description}
                          </p>
                          {item.instructorName && (
                            <div className="flex items-center gap-2">
                              <Avatar>
                                <AvatarImage src={item.instructorAvatar} />
                                <AvatarFallback>
                                  {item.instructorName.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <p className="text-sm text-muted-foreground">
                                {item.instructorName}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      {(item.duration || item.sessions) && (
                        <div className="flex items-center gap-4">
                          {item.duration && (
                            <span className="text-sm text-black flex items-center gap-2">
                              <Clock className="size-4" />
                              {item.duration}
                            </span>
                          )}
                          {item.sessions && (
                            <span className="text-sm text-black flex items-center gap-2">
                              <BookOpen className="size-4" />
                              {item.sessions}
                            </span>
                          )}
                        </div>
                      )}
                      <div className="flex items-center gap-2 w-full">
                        {item.isOnline && (
                          <span className="text-sm text-muted-foreground text-center p-1 rounded-full bg-[#F8F1E7]">
                            اونلاين
                          </span>
                        )}
                        {item.ageRange && (
                          <span className="text-sm text-muted-foreground text-center p-1 rounded-full bg-[#F8F1E7]">
                            {item.ageRange}
                          </span>
                        )}
                        {item.level && (
                          <span className="text-sm text-black text-center p-1 rounded-full bg-[#F8F1E7]">
                            {item.level}
                          </span>
                        )}
                        {item.isFree && (
                          <span className="text-sm text-black text-center py-1 px-3 rounded-full bg-[#E3F0F2] ms-auto">
                            مجاني
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between w-full">
                        <QuantityControl quantity={item.quantity} />
                        <Button variant={"destructive"} size={"icon"}>
                          <Trash className="size-4" />
                          <span className="sr-only">حذف</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
          <Button className="w-[98%] mx-auto bg-pimary! text-white py-3 mt-2 px-2 h-14 rounded-2xl gap-2 hover:bg-primary/90">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="size-5"
            >
              <path
                d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
                stroke="white"
                strokeWidth="1.5"
              />
              <path
                d="M8 12.75C8 12.75 9.6 13.6625 10.4 15C10.4 15 12.8 9.75 16 8"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-base font-bold">تأكيد الطلب</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CartPageContent;
