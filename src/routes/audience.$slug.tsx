import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CoverImage } from "@/components/cover-image";
import { CollectionBand } from "@/components/collection-band";
import { Carousel } from "@/components/case-carousel";
import { Playable } from "@/components/playable-media";
import { WorkRow } from "@/components/work-card";
import { MetaLine } from "@/components/site-shell";
import {
  SITE,
  articlesFor,
  brandsFor,
  studioFor,
  getAudience,
  sortVideos,
  type Article,
  type StudioItem,
} from "@/lib/content";
import { ogCover, shareMeta } from "@/lib/og/meta";

export const Route = createFileRoute("/audience/$slug")({
  loader: ({ params }) => {
    const audience = getAudience(params.slug);
    if (!audience) throw notFound();
    const pieces = articlesFor(audience.slug);
    return {
      audience,
      cases: brandsFor(audience.slug),
      videos: sortVideos(pieces.filter((a) => a.video)),
      pieces: pieces.filter((a) => !a.video),
      shows: studioFor(audience.slug).filter(
        (s) => s.slug !== "real-world-value",
      ),
    };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.audience.name} — ${SITE.name}`
          : SITE.name,
      },
      ...(loaderData
        ? shareMeta({
            title: `${loaderData.audience.name} — ${SITE.name}`,
            description: loaderData.audience.story,
            path: `/audience/${loaderData.audience.slug}`,
            image: ogCover(`audience-${loaderData.audience.slug}`),
          })
        : []),
    ],
  }),
  component: AudiencePage,
});

function SectionHead({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="max-w-xl">
      <MetaLine>{kicker}</MetaLine>
      <h2 className="mt-2 font-display text-3xl sm:text-4xl">{title}</h2>
      {children ? (
        <p className="mt-3 text-base leading-relaxed text-muted">{children}</p>
      ) : null}
    </div>
  );
}

function AudiencePage() {
  const { audience, cases, pieces, shows, videos } = Route.useLoaderData();
  const bands =
    audience.slug === "institutional"
      ? (["7702", "coalition", "messari", "papers", "d-core"] as const)
      : audience.slug === "b2b"
        ? (["7702", "coalition", "docs", "devs", "papers"] as const)
        : audience.slug === "retail"
          ? (["academy"] as const)
          : [];

  const featuredShow = shows.find((s) => s.featuredPlay) ?? shows[0];
  const otherShows = shows.filter((s) => s.slug !== featuredShow?.slug);
  const showPodcasts = audience.slug !== "retail" && shows.length > 0;
  const particlePieces = pieces.filter((a) => a.source === "Particle Network");
  const otherPieces = pieces.filter((a) => a.source !== "Particle Network");
  const featuredParticle = particlePieces.filter((a) => a.featured);
  const restParticle = particlePieces.filter((a) => !a.featured);
  const featuredOther = otherPieces.filter((a) => a.featured);
  const restOther = otherPieces.filter((a) => !a.featured);
  const isRetail = audience.slug === "retail";

  return (
    <div>
      <section className="mx-auto grid max-w-4xl items-end gap-10 px-5 pt-14 pb-14 sm:grid-cols-2 sm:px-8 sm:pt-20 sm:pb-16">
        <div>
          <MetaLine>Audience</MetaLine>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl">
            {audience.name}
          </h1>
          <p className="mt-2 text-sm tracking-[0.16em] text-muted uppercase">
            {audience.short}
          </p>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
            {audience.story}
          </p>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
            Samples of work I've published for this audience. Hardly
            exhaustive. See also{" "}
            <Link
              to="/contents"
              className="underline underline-offset-4 hover:text-fg"
            >
              the archive
            </Link>
            .
          </p>
        </div>
        <div className="aspect-[3/2] overflow-hidden bg-surface">
          <CoverImage src={audience.image} alt={audience.imageAlt} />
        </div>
      </section>

      {cases.length ? (
        <section className="border-t border-rule">
          <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-16">
            <SectionHead kicker="01 · Cases" title="Case studies">
              The longer pieces for this audience.
            </SectionHead>
            <div className="mt-8 border-t border-rule">
              {cases.map((b) => (
                <WorkRow
                  key={b.slug}
                  item={{
                    slug: b.slug,
                    title: b.name,
                    dek: b.dek,
                    audience: b.audience,
                    kind: b.kind,
                    date: `${b.year.replace("–", "").slice(0, 4)}-01-01`,
                    cover: b.cover,
                    coverAlt: b.coverAlt,
                    href: { to: "/brands/$slug", params: { slug: b.slug } },
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {isRetail && particlePieces.length ? (
        <WritingSection
          kicker="02 · Particle"
          title="Particle Network"
          dek="Announcements, product posts, and reports."
          featured={featuredParticle}
          rest={restParticle}
        />
      ) : null}

      {videos.length ? (
        <section className="border-t border-rule">
          <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-16">
            <SectionHead
              kicker={isRetail ? "03 · Videos" : "02 · Videos"}
              title="Videos"
            >
              Product and announcement films.
            </SectionHead>
            <div className="mt-10 grid gap-10 sm:grid-cols-2">
              {videos.map((article) => (
                <VideoCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {isRetail
        ? bands.map((slug) => (
            <CollectionBand
              key={slug}
              slug={slug}
              audience={audience.slug}
            />
          ))
        : bands.map((slug) => (
            <CollectionBand
              key={slug}
              slug={slug}
              compactReports={slug === "d-core"}
              audience={audience.slug}
            />
          ))}

      {showPodcasts && featuredShow ? (
        <section className="border-t border-rule">
          <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-16">
            <SectionHead kicker="03 · Podcasts" title="Real-World Value">
              Published through Particle Network. Solana first.{" "}
              <Link
                to="/studio"
                className="underline underline-offset-4 hover:text-fg"
              >
                The rest of the series
              </Link>
              .
            </SectionHead>
            <div className="mt-10">
              <Playable
                youtube={featuredShow.youtube}
                title={featuredShow.title}
              />
              <p className="mt-4 font-display text-2xl sm:text-3xl">
                {featuredShow.title}
              </p>
              <p className="mt-2 max-w-xl text-base leading-relaxed text-muted">
                {featuredShow.dek}
              </p>
            </div>
            {otherShows.length ? (
              <div className="mt-12">
                <p className="mb-5 text-sm tracking-[0.16em] text-faint uppercase">
                  More episodes
                </p>
                <Carousel>
                  {otherShows.map((ep) => (
                    <PodcastSlide key={ep.slug} episode={ep} />
                  ))}
                </Carousel>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {isRetail ? (
        otherPieces.length ? (
          <WritingSection
            kicker="04 · Also"
            title="Other writing"
            dek="D-Core primers and related pieces."
            featured={featuredOther}
            rest={restOther}
          />
        ) : null
      ) : (
        <WritingSection
          kicker="04 · Writing"
          title="Published pieces"
          dek="Articles and reports for this audience."
          featured={[...featuredParticle, ...featuredOther]}
          rest={[...restParticle, ...restOther]}
        />
      )}
    </div>
  );
}

function WritingSection({
  kicker,
  title,
  dek,
  featured,
  rest,
}: {
  kicker: string;
  title: string;
  dek: string;
  featured: Article[];
  rest: Article[];
}) {
  if (!featured.length && !rest.length) return null;
  return (
    <section className="border-t border-rule">
      <div className="mx-auto max-w-4xl px-5 py-14 pb-24 sm:px-8 sm:py-16 sm:pb-28">
        <SectionHead kicker={kicker} title={title}>
          {dek}{" "}
          <Link
            to="/contents"
            className="underline underline-offset-4 hover:text-fg"
          >
            The archive
          </Link>
          .
        </SectionHead>
        {featured.length ? (
          <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2">
            {featured.map((article) => (
              <FeaturedPiece key={article.slug} article={article} />
            ))}
          </div>
        ) : null}
        {rest.length ? (
          <div className="mt-12 border-t border-rule">
            {rest.map((article) => (
              <WorkRow
                key={article.slug}
                item={{
                  slug: article.slug,
                  title: article.title,
                  dek: article.dek,
                  note: article.note,
                  audience: article.audience,
                  kind: "content",
                  date: article.date,
                  cover: article.cover,
                  coverAlt: article.coverAlt,
                  category: article.category,
                  source: article.source,
                  external: article.href,
                }}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function FeaturedPiece({ article }: { article: Article }) {
  const offsite = Boolean(article.href?.startsWith("http"));
  const inner = (
    <>
      <div className="aspect-[16/9] overflow-hidden bg-surface">
        <CoverImage
          src={article.cover}
          alt={article.coverAlt}
          className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <p className="mt-4 text-sm tracking-[0.16em] text-faint uppercase">
        {article.source} · {article.category}
      </p>
      <h3 className="mt-1 font-display text-2xl group-hover:underline">
        {article.title}
      </h3>
      <p className="mt-2 text-base leading-relaxed text-muted">{article.dek}</p>
    </>
  );
  if (!article.href) return <div>{inner}</div>;
  return (
    <a
      href={article.href}
      target={offsite ? "_blank" : undefined}
      rel={offsite ? "noreferrer" : undefined}
      className="group block"
    >
      {inner}
    </a>
  );
}

function VideoCard({ article }: { article: Article }) {
  return (
    <figure>
      <Playable
        youtube={article.video?.youtube}
        src={article.video?.src}
        poster={article.video?.poster}
        title={article.title}
      />
      <figcaption className="mt-3">
        <p className="text-sm tracking-[0.16em] text-faint uppercase">
          {article.source}
        </p>
        <a
          href={article.href}
          target={article.href?.startsWith("http") ? "_blank" : undefined}
          rel={article.href?.startsWith("http") ? "noreferrer" : undefined}
          className="mt-1 block font-display text-xl hover:underline"
        >
          {article.title}
        </a>
        <p className="mt-1.5 text-base leading-relaxed text-muted">
          {article.dek}
        </p>
      </figcaption>
    </figure>
  );
}

function PodcastSlide({ episode }: { episode: StudioItem }) {
  return (
    <figure className="w-[86%] shrink-0 snap-start sm:w-[62%]">
      <Playable youtube={episode.youtube} title={episode.title} />
      <figcaption className="mt-3">
        <p className="text-sm tracking-[0.16em] text-faint uppercase">
          {episode.duration}
        </p>
        <a
          href={episode.href}
          target="_blank"
          rel="noreferrer"
          className="mt-1 block font-display text-xl hover:underline"
        >
          {episode.title}
        </a>
        <p className="mt-1.5 text-base leading-relaxed text-muted">
          {episode.dek}
        </p>
      </figcaption>
    </figure>
  );
}
