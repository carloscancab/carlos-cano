import { useEffect, useState } from "react";
import { SITE } from "@/lib/content";

export function RotatingSlogan() {
  const words = SITE.cycle;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const id = window.setInterval(() => {
      setIndex((n) => (n + 1) % words.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, [words.length]);

  const current = words[index];

  return (
    <p className="font-display text-[1.85rem] leading-[1.2] [text-wrap:pretty] sm:text-4xl lg:text-[2.65rem]">
      <span className="sr-only">Everybody wants to be {current}.</span>
      <span aria-hidden="true" className="block">
        Everybody wants to be
      </span>
      <span aria-hidden="true" className="relative mt-0.5 block italic">
        <span className="invisible">understood.</span>
        {words.map((word, i) => (
          <span
            key={word}
            className="absolute top-0 left-0 transition-opacity duration-500 ease-out"
            style={{ opacity: i === index ? 1 : 0 }}
          >
            {word}.
          </span>
        ))}
      </span>
    </p>
  );
}
