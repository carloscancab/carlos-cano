import { createFileRoute, Link } from "@tanstack/react-router";
import { Carousel } from "@/components/case-carousel";
import { Playable } from "@/components/playable-media";
import { MetaLine } from "@/components/site-shell";
import { SITE, studio } from "@/lib/content";
import { ogCover, shareMeta } from "@/lib/og/meta";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: `Podcasts — ${SITE.name}` },
      ...shareMeta({
        title: `Podcasts — ${SITE.name}`,
        description: (studio.find((s) => s.featured) ?? studio[0]).dek,
        path: "/studio",
        image: ogCover("studio"),
        imageAlt: `${(studio.find((s) => s.featured) ?? studio[0]).coverAlt}, beside the word “Podcasts”`,
      }),
    ],
  }),
  component: StudioPage,
});

function StudioPage() {
  const series = studio.find((s) => s.featured) ?? studio[0];
  const episodes = studio.filter((s) => s.slug !== series.slug);
  const featured = episodes.find((s) => s.featuredPlay) ?? episodes[0];
  const rest = episodes.filter((s) => s.slug !== featured?.slug);

  return (
    <div>
      <section className="mx-auto max-w-4xl px-5 pt-14 pb-10 sm:px-8 sm:pt-20 sm:pb-14">
        <MetaLine>Podcasts</MetaLine>
        <h1 className="mt-3 font-display text-5xl sm:text-6xl">
          {series.title}
        </h1>
        <p className="mt-2 text-sm tracking-[0.16em] text-muted uppercase">
          {series.source} · {series.format} · {series.duration}
        </p>
        <p className="mt-6 max-w-xl text-lg leading-relaxed">
          {series.body}
        </p>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
          {series.dek}
        </p>
      </section>

      {featured ? (
        <section className="mx-auto max-w-4xl px-5 pb-10 sm:px-8">
          <MetaLine>Featured · Solana</MetaLine>
          <div className="mt-6">
            <Playable youtube={featured.youtube} title={featured.title} />
          </div>
          <h2 className="mt-5 font-display text-2xl sm:text-3xl">
            {featured.title}
          </h2>
          <p className="mt-2 max-w-xl text-base leading-relaxed text-muted">
            {featured.dek}
          </p>
        </section>
      ) : null}

      <section className="mx-auto max-w-4xl px-5 pb-24 sm:px-8">
        <MetaLine>More episodes</MetaLine>
        <p className="mt-3 max-w-lg text-base leading-relaxed text-muted">
          More episodes from the Particle Network channel. Hardly exhaustive.
        </p>
        <div className="mt-8">
          <Carousel>
            {rest.map((ep) => (
              <figure
                key={ep.slug}
                className="w-[86%] shrink-0 snap-start sm:w-[62%]"
              >
                <Playable youtube={ep.youtube} title={ep.title} />
                <figcaption className="mt-3">
                  <p className="text-sm tracking-[0.16em] text-faint uppercase">
                    {ep.duration}
                  </p>
                  <a
                    href={ep.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 block font-display text-xl hover:underline"
                  >
                    {ep.title}
                  </a>
                  <p className="mt-1.5 text-base leading-relaxed text-muted">
                    {ep.dek}
                  </p>
                </figcaption>
              </figure>
            ))}
          </Carousel>
        </div>
        <p className="mt-10 text-base text-muted">
          Also:{" "}
          <Link
            to="/c/$slug"
            params={{ slug: "multimedia" }}
            className="underline underline-offset-4 hover:text-fg"
          >
            other recorded work
          </Link>
          ,{" "}
          <Link
            to="/audience/$slug"
            params={{ slug: "institutional" }}
            className="underline underline-offset-4 hover:text-fg"
          >
            institutional
          </Link>
          ,{" "}
          <Link
            to="/audience/$slug"
            params={{ slug: "b2b" }}
            className="underline underline-offset-4 hover:text-fg"
          >
            B2B
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
