type VideoSectionProps = {
  src?: string | null;
};

export default function VideoSection({ src }: VideoSectionProps) {
  if (!src) {
    return null;
  }

  return (
    <section className="py-12">
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
