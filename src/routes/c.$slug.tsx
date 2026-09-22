import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CoverImage } from "@/components/cover-image";
import { CollectionBand } from "@/components/collection-band";
import { Carousel } from "@/components/case-carousel";
import { Playable } from "@/components/playable-media";
import { WorkRow } from "@/components/work-card";
import { MetaLine } from "@/components/site-shell";
import {
  SITE,
  CATEGORY_BANDS,
  articlesBySource,
  articlesForCategory,
  featuredCases,
  getCategory,
  sortVideos,
  studio,
  type Article,
  type StudioItem,
} from "@/lib/content";

export const Route = createFileRoute("/c/$slug")({
  loader: ({ params }) => {
    const category = getCategory(params.slug);
    if (!category) throw notFound();
    const pieces = articlesForCategory(category.slug);
    return {
      category,
      pieces,
      bands: CATEGORY_BANDS[category.slug],
    };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.category.name} — ${SITE.name}`
          : SITE.name,
      },
    ],
  }),
  component: CategoryPage,
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

function CategoryPage() {
  const { category, pieces, bands } = Route.useLoaderData();
  const bandSet = new Set(bands);
  const rest = pieces.filter(
    (a) => !a.collection || !bandSet.has(a.collection),
  );
  const isMultimedia = category.slug === "multimedia";
  const isTechnical = category.slug === "technical";
  const isNarrative = category.slug === "narrative";
  const isPromotional = category.slug === "promotional";
  const cases = isNarrative ? featuredCases() : [];
  const videos = sortVideos(
    (isMultimedia || isPromotional
      ? rest.filter((a) => a.video && a.source !== "Carlos Maximiliano")
      : []
    ),
  );
  const maximiliano = isMultimedia
    ? pieces.filter((a) => a.source === "Carlos Maximiliano")
    : [];
  const leftover = rest.filter(
    (a) =>
      a.source !== "Carlos Maximiliano" &&
      !(isMultimedia && a.video) &&
      !(isPromotional && a.video),
  );
  const groups = articlesBySource(leftover);
  const episodes = isMultimedia
    ? studio.filter((s) => s.slug !== "real-world-value")
    : [];
  const featuredEp = episodes.find((s) => s.featuredPlay) ?? episodes[0];
  const otherEps = episodes.filter((s) => s.slug !== featuredEp?.slug);

  return (
    <div>
      <section className="mx-auto grid max-w-4xl items-end gap-10 px-5 pt-14 pb-10 sm:grid-cols-2 sm:px-8 sm:pt-20 sm:pb-14">
        <div>
          <MetaLine>
            <Link to="/contents" className="hover:text-fg">
              Contents
            </Link>
            {" · "}
            {category.short}
            {pieces.length ? ` · ${pieces.length}` : ""}
          </MetaLine>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl">
            {category.name}
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
            {category.story}
          </p>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
            {pieces.length} pieces
            {isMultimedia ? `, plus ${episodes.length} podcast episodes` : ""}.
            Also filed by{" "}
            <Link
              to="/audience/$slug"
              params={{ slug: "retail" }}
              className="underline underline-offset-4 hover:text-fg"
            >
              retail
            </Link>
            ,{" "}
            <Link
              to="/audience/$slug"
              params={{ slug: "institutional" }}
              className="underline underline-offset-4 hover:text-fg"
            >
              institutional
            </Link>
            , and{" "}
            <Link
              to="/audience/$slug"
              params={{ slug: "b2b" }}
              className="underline underline-offset-4 hover:text-fg"
            >
              B2B
            </Link>
            .
          </p>
        </div>
        <div className="aspect-[3/2] overflow-hidden bg-surface">
          <CoverImage src={category.image} alt={category.imageAlt} />
        </div>
      </section>

      {cases.length ? (
        <section className="border-t border-rule">
          <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-16">
            <SectionHead kicker="00 · Cases" title="Case studies">
              Chain abstraction, Universal X, Panther.{" "}
              <Link
                to="/brands"
                className="underline underline-offset-4 hover:text-fg"
              >
                All cases
              </Link>
              .
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

      {videos.length ? (
        <section className="border-t border-rule">
          <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-16">
            <SectionHead
              kicker={isMultimedia ? "01 · Videos" : "01 · Film"}
              title={isMultimedia ? "Videos" : "Campaign films"}
            >
              {isMultimedia
                ? "Announcement and product films."
                : "Launch and campaign videos."}
            </SectionHead>
            <div className="mt-10 grid gap-10 sm:grid-cols-2">
              {videos.map((article) => (
                <VideoCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {bands.map((slug) => (
        <CollectionBand
          key={slug}
          slug={slug}
          compactReports={slug === "d-core"}
          category={
            (slug === "7702" || slug === "coalition") &&
            category.slug === "promotional"
              ? undefined
              : category.slug
          }
        />
      ))}

      {isMultimedia && featuredEp ? (
        <section className="border-t border-rule">
          <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-16">
            <SectionHead kicker="02 · Podcasts" title="Real-World Value">
              Published through Particle Network. Hosted by Carlos Cano.{" "}
              <Link
                to="/studio"
                className="underline underline-offset-4 hover:text-fg"
              >
                The series
              </Link>
              .
            </SectionHead>
            <div className="mt-10">
              <Playable
                youtube={featuredEp.youtube}
                title={featuredEp.title}
              />
              <p className="mt-4 font-display text-2xl sm:text-3xl">
                {featuredEp.title}
              </p>
              <p className="mt-2 max-w-xl text-base leading-relaxed text-muted">
                {featuredEp.dek}
              </p>
            </div>
            {otherEps.length ? (
              <div className="mt-12">
                <p className="mb-5 text-sm tracking-[0.16em] text-faint uppercase">
                  {otherEps.length} more episodes
                </p>
                <Carousel>
                  {otherEps.map((ep) => (
                    <PodcastSlide key={ep.slug} episode={ep} />
                  ))}
                </Carousel>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {groups.map((group, i) => (
        <SourceChapter
          key={group.source}
          index={String(
            i +
              1 +
              (isMultimedia ? 2 : 0) +
              (videos.length ? 1 : 0) +
              (cases.length ? 1 : 0) +
              bands.length,
          ).padStart(2, "0")}
          source={group.source}
          items={group.items}
          featuredGrid={
            isTechnical ||
            isPromotional ||
            group.items.some((a) => a.featured)
          }
        />
      ))}

      {isMultimedia && maximiliano.length ? (
        <section className="border-t border-rule">
          <div className="mx-auto max-w-4xl px-5 py-14 pb-24 sm:px-8 sm:py-16 sm:pb-28">
            <SectionHead
              kicker="At the bottom · TikTok"
              title="Carlos Maximiliano"
            >
              Shorts from{" "}
              <a
                href="https://www.tiktok.com/@carlosmxml"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 hover:text-fg"
              >
                @carlosmxml
              </a>
              . Parral. Not Web3.
            </SectionHead>
            <div className="mt-10 grid gap-10 sm:grid-cols-2">
              {maximiliano.map((article) => (
                <VideoCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}

function SourceChapter({
  index,
  source,
  items,
  featuredGrid,
}: {
  index: string;
  source: string;
  items: Article[];
  featuredGrid: boolean;
}) {
  const featured = featuredGrid ? items.filter((a) => a.featured) : [];
  const rest = featuredGrid ? items.filter((a) => !a.featured) : items;
  return (
    <section className="border-t border-rule">
      <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-16">
        <SectionHead
          kicker={`${index} · ${items.length} ${items.length === 1 ? "piece" : "pieces"}`}
          title={source}
        >
          {source === "Particle Network"
            ? "Announcements, product posts, and reports."
            : source === "Panther Protocol"
              ? "Protocol posts, the raise, and privacy explainers."
              : source === "Panther Academy"
                ? "Explainers on zero-knowledge, staking, and DeFi."
                : source === "D-Core"
                  ? "Public primers."
                  : source === "Fringe Finance"
                    ? "Lending, the model, and the roadmap."
                    : source === "7702 Collective"
                      ? "The collective and its first report."
                      : `${items.length} pieces.`}
        </SectionHead>
        {featured.length ? (
          <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2">
            {featured.map((article) => (
              <FeaturedPiece key={article.slug} article={article} />
            ))}
          </div>
        ) : null}
        {rest.length ? (
          <div className={`border-t border-rule ${featured.length ? "mt-12" : "mt-8"}`}>
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
