import { cn } from "@/lib/utils";

export function CoverImage({
  src,
  alt,
  className,
  sizes = "(min-width: 1024px) 720px, 100vw",
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      sizes={sizes}
      className={cn("h-full w-full object-cover", className)}
    />
  );
}
