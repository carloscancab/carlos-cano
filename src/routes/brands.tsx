import { createFileRoute, Link } from "@tanstack/react-router";
import { CoverImage } from "@/components/cover-image";
import { MetaLine } from "@/components/site-shell";
import { audienceLabel, brands } from "@/lib/content";

export const Route = createFileRoute("/brands")({ component: BrandsPage });

function BrandsPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-20">
      <MetaLine>Case studies</MetaLine>
      <h1 className="mt-3 max-w-xl font-display text-4xl sm:text-5xl">
        Brands and narratives.
      </h1>
      <p className="mt-5 max-w-lg text-base leading-relaxed text-muted">
        Particle Network’s{" "}
        <Link
          to="/brands/$slug"
          params={{ slug: "chain-abstraction" }}
          className="underline underline-offset-4 hover:text-fg"
        >
          Chain Abstraction
        </Link>
        ,{" "}
        <Link
          to="/brands/$slug"
          params={{ slug: "universal-x" }}
          className="underline underline-offset-4 hover:text-fg"
        >
          Universal X
        </Link>
        , and{" "}
        <Link
          to="/brands/$slug"
          params={{ slug: "panther-protocol" }}
          className="underline underline-offset-4 hover:text-fg"
        >
          Panther Protocol
        </Link>
        . Related work also lives in{" "}
        <Link to="/contents" className="underline underline-offset-4 hover:text-fg">
          contents
        </Link>{" "}
        and{" "}
        <Link to="/studio" className="underline underline-offset-4 hover:text-fg">
          podcasts
        </Link>
        .
      </p>

      <div className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2">
        {brands.map((b) => (
          <Link
            key={b.slug}
            to="/brands/$slug"
            params={{ slug: b.slug }}
            className="group"
          >
            <div className="aspect-[3/2] overflow-hidden bg-surface">
              <CoverImage
                src={b.cover}
                alt={b.coverAlt}
                className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>
            <MetaLine className="mt-4">
              {b.client ? `${b.client} · ` : ""}
              {b.kind === "brand" ? "Brand" : "Narrative"} ·{" "}
              {audienceLabel(b.audience)} · {b.year}
            </MetaLine>
            <h2 className="mt-1.5 font-display text-2xl group-hover:underline">
              {b.name}
            </h2>
            <p className="mt-2 text-base leading-relaxed text-muted">{b.dek}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
