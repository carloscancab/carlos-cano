import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Carousel({ children }: { children: ReactNode }) {
  const scroller = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 12);
    setAtEnd(max <= 12 || el.scrollLeft >= max - 12);
  }, []);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [update, children]);

  function go(dir: -1 | 1) {
    const el = scroller.current;
    if (!el) return;
    const slide = el.querySelector("figure");
    const gap = 12;
    const w = slide
      ? slide.getBoundingClientRect().width + gap
      : el.clientWidth * 0.75;
    el.scrollBy({ left: dir * w, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div
        ref={scroller}
        className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:-mx-6 sm:px-6 [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
      <Arrow
        side="left"
        disabled={atStart}
        onClick={() => go(-1)}
        label="Previous slide"
      />
      <Arrow
        side="right"
        disabled={atEnd}
        onClick={() => go(1)}
        label="Next slide"
      />
    </div>
  );
}

function Arrow({
  side,
  disabled,
  onClick,
  label,
}: {
  side: "left" | "right";
  disabled: boolean;
  onClick: () => void;
  label: string;
}) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "absolute top-[38%] z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-bg text-fg ring-1 ring-fg/20 transition-opacity",
        side === "left" ? "left-1 sm:left-2" : "right-1 sm:right-2",
        disabled ? "opacity-40" : "opacity-100",
      )}
    >
      <Icon className="size-5" strokeWidth={1.5} />
    </button>
  );
}

export function Slide({
  src,
  alt,
  caption,
  frame = "photo",
}: {
  src: string;
  alt: string;
  caption: string;
  frame?: "photo" | "chart";
}) {
  return (
    <figure className="w-[82%] shrink-0 snap-start sm:w-[68%]">
      <img
        src={src}
        alt={alt}
        className={
          frame === "chart"
            ? "w-full bg-white/5"
            : "aspect-[3/2] w-full object-cover"
        }
      />
      <figcaption className="mt-3 text-sm leading-relaxed opacity-70">
        {caption}
      </figcaption>
    </figure>
  );
}
