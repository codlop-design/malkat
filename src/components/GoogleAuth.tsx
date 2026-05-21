import Image from "next/image";

export default function GoogleAuth() {
  return (
    <button className="w-full h-14 flex items-center justify-center gap-2 rounded-xl cursor-pointer text-base font-medium text-[#000000] border border-(--primary) disabled:cursor-not-allowed disabled:opacity-70">
      <Image src="/google.svg" alt="Google" width={24} height={24} />
      <span>متابعة باستخدام جوجل</span>
    </button>
  );
}
