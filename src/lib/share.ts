export type ShareChannelId =
  | "whatsapp"
  | "x"
  | "facebook"
  | "telegram"
  | "email";

export type ShareChannel = {
  id: ShareChannelId;
  label: string;
  href: (url: string, title: string) => string;
};

export function buildShareUrl(url: string): string {
  if (typeof window !== "undefined" && url.startsWith("/")) {
    return `${window.location.origin}${url}`;
  }
  return url;
}

export function getShareChannels(): ShareChannel[] {
  return [
    {
      id: "whatsapp",
      label: "واتساب",
      href: (url, title) =>
        `https://wa.me/?text=${encodeURIComponent(`${title}\n${url}`)}`,
    },
    {
      id: "x",
      label: "X",
      href: (url, title) =>
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    },
    {
      id: "facebook",
      label: "فيسبوك",
      href: (url) =>
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      id: "telegram",
      label: "تيليجرام",
      href: (url, title) =>
        `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    },
    {
      id: "email",
      label: "بريد",
      href: (url, title) =>
        `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${title}\n${url}`)}`,
    },
  ];
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
