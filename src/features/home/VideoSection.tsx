export default function VideoSection() {
  return (
    <section className="py-12">
      <video
        src="/video.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      />
    </section>
  );
}
