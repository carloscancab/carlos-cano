export function Playable({
  youtube,
  src,
  poster,
  title,
}: {
  youtube?: string;
  src?: string;
  poster?: string;
  title: string;
}) {
  if (youtube) {
    return (
      <iframe
        className="aspect-video w-full bg-invert"
        src={`https://www.youtube-nocookie.com/embed/${youtube}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }
  if (src) {
    return (
      <video
        className="aspect-video w-full bg-invert"
        controls
        playsInline
        preload="metadata"
        poster={poster}
      >
        <source src={src} type="video/mp4" />
      </video>
    );
  }
  return null;
}
