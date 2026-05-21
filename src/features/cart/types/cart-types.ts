export type CartItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  quantity: number;
  isFree: boolean;
  isOnline: boolean;
  level?: string;
  ageRange?: string;
  duration?: string;
  sessions?: string;
  instructorName?: string;
  instructorAvatar?: string;
};

export type CartItemCategory = {
  title: string;
  icon: React.ReactNode;
  items: CartItem[];
  id: string;
};

export type SideCartProps = {
  isLoading?: boolean;
};
