type VideoSectionProps = {
  src?: string | null;
};

export default function VideoSection({ src }: VideoSectionProps) {
  if (!src) {
    return null;
  }

  return (
    <section className="pt-12 pb-0">
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        className="h-full w-full object-cover"
      />
    </section>
  );
}
