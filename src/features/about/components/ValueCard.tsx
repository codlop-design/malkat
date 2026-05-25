import Image from "next/image";

export type ValueCardProps = {
  title: string;
  description: string;
  iconSrc: string;
};

export default function ValueCard({
  title,
  description,
  iconSrc,
}: ValueCardProps) {
  return (
    <article className="flex flex-col items-center rounded-2xl bg-white px-6 py-8 text-center h-full md:px-8 md:py-10">
      <div className="mb-5 flex size-[72px] items-center justify-center rounded-2xl bg-[#F5F5F5]">
        <Image src={iconSrc} alt="" width={48} height={48} />
      </div>
      <h3 className="mb-3 text-lg font-bold text-black md:text-xl">{title}</h3>
      <p className="text-sm leading-[1.85] text-[#454545] md:text-base">
        {description}
      </p>
    </article>
  );
}
