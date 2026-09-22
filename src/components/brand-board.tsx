import { cn } from "@/lib/utils";
import type { BrandIdentity } from "@/lib/content";

export function BrandBoard({
  identity,
  size = "tile",
  className,
}: {
  identity: BrandIdentity;
  size?: "tile" | "hero";
  className?: string;
}) {
  const invert = identity.field === "invert";

  return (
    <div
      className={cn(
        "relative flex overflow-hidden",
        size === "hero"
          ? "min-h-72 items-end p-8 sm:min-h-96 sm:p-12"
          : "aspect-[3/2] items-end p-5 sm:p-7",
        invert ? "bg-invert text-invert-fg" : "bg-surface text-fg",
        className,
      )}
      aria-hidden="true"
    >
      <Wordmark identity={identity} size={size} />
    </div>
  );
}

function Wordmark({
  identity,
  size,
}: {
  identity: BrandIdentity;
  size: "tile" | "hero";
}) {
  const word = identity.wordmark;
  const display = size === "hero" ? "text-5xl sm:text-7xl" : "text-3xl sm:text-4xl";

  switch (identity.treatment) {
    case "cut": {
      const mid = Math.ceil(word.length / 2);
      return (
        <span className={cn("flex items-end font-medium tracking-tight", display)}>
          <span>{word.slice(0, mid)}</span>
          <span className="mx-2 mb-2 inline-block h-[0.8em] w-px bg-current sm:mx-3" />
          <span>{word.slice(mid)}</span>
        </span>
      );
    }
    case "wide":
      return (
        <span
          className={cn(
            "font-medium tracking-widest uppercase",
            size === "hero" ? "text-2xl sm:text-4xl" : "text-lg sm:text-xl",
          )}
        >
          {word}
        </span>
      );
    case "stack":
      return (
        <span className={cn("flex flex-col leading-none font-medium tracking-tight", display)}>
          {word.split("\n").map((line) => (
            <span key={line}>{line}</span>
          ))}
        </span>
      );
    case "mono":
      return (
        <span className={cn("font-mono font-normal tracking-tight lowercase", display)}>
          {word}_
        </span>
      );
    case "condensed":
      return (
        <span
          className={cn(
            "font-semibold tracking-tighter uppercase",
            size === "hero" ? "text-6xl sm:text-8xl" : "text-4xl sm:text-5xl",
          )}
        >
          {word}
        </span>
      );
    default:
      return (
        <span className="flex flex-col">
          <span className="mb-4 h-px w-10 bg-current" />
          <span className={cn("font-medium tracking-tight", display)}>{word}</span>
        </span>
      );
  }
}
