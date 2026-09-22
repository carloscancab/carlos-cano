import { CoverImage } from "@/components/cover-image";
import {
  type Article,
  type AudienceSlug,
  type ContentCategorySlug,
  COLLECTION_META,
  COLLECTIVE_MEMBERS,
  COALITION_MEMBERS,
  collectionAll,
} from "@/lib/content";

function PieceLink({
  article,
  invert,
  kicker,
}: {
  article: Article;
  invert?: boolean;
  kicker?: string;
}) {
  const offsite = Boolean(article.href?.startsWith("http"));
  const className = invert
    ? "group flex flex-col gap-4 border-b border-white/15 py-6 last:border-b-0 sm:flex-row sm:items-start sm:gap-5"
    : "group flex flex-col gap-4 border-b border-rule py-6 last:border-b-0 sm:flex-row sm:items-start sm:gap-5";
  const inner = (
    <>
      <div className="aspect-[16/9] w-full shrink-0 overflow-hidden bg-surface sm:h-[4.75rem] sm:w-36 sm:aspect-auto">
        <CoverImage
          src={article.cover}
          alt={article.coverAlt}
          className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="min-w-0">
        <p
          className={`text-sm tracking-[0.16em] uppercase ${invert ? "opacity-60" : "text-faint"}`}
        >
          {kicker ?? `${article.source} · ${article.category}`}
        </p>
        <h3 className="mt-1 font-display text-xl group-hover:underline sm:text-2xl">
          {article.title}
        </h3>
        <p
          className={`mt-1.5 text-base leading-relaxed ${invert ? "opacity-80" : "text-muted"}`}
        >
          {article.dek}
        </p>
      </div>
    </>
  );
  if (!article.href) return <div className={className}>{inner}</div>;
  if (offsite) {
    return (
      <a
        href={article.href}
        target="_blank"
        rel="noreferrer"
        className={className}
      >
        {inner}
      </a>
    );
  }
  return (
    <a href={article.href} className={className}>
      {inner}
    </a>
  );
}

function MemberGrid({
  members,
  folder,
}: {
  members: readonly { slug: string; name: string; desc: string; href: string }[];
  folder: string;
}) {
  return (
    <div className="mt-10">
      <p className="text-sm tracking-[0.16em] uppercase opacity-60">Members</p>
      <ul className="mt-5 grid grid-cols-2 gap-px bg-white/15 sm:grid-cols-4">
        {members.map((m) => (
          <li key={m.slug} className="bg-invert">
            <a
              href={m.href}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center gap-2 px-3 py-5 text-center hover:bg-white/5"
            >
              <img
                src={`/images/cases/${folder}/members/${m.slug}.png`}
                alt=""
                className="size-12 rounded-full bg-white object-cover"
              />
              <span className="block w-full truncate text-sm font-medium">
                {m.name}
              </span>
              <span className="block w-full truncate text-xs opacity-55">
                {m.desc}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CollectionBand({
  slug,
  compactReports,
  audience,
  category,
}: {
  slug: (typeof COLLECTION_META)[number]["slug"];
  compactReports?: boolean;
  audience?: AudienceSlug;
  category?: ContentCategorySlug;
}) {
  const meta = COLLECTION_META.find((c) => c.slug === slug);
  if (!meta) return null;
  const items = collectionAll(slug, audience).filter(
    (a) =>
      !category ||
      a.category === category ||
      a.alsoCategory?.includes(category),
  );
  if (!items.length) return null;

  const featured = compactReports
    ? items.filter((a) => a.featured)
    : items;
  const rest = compactReports ? items.filter((a) => !a.featured) : [];
  const initiative = slug === "7702" || slug === "coalition";
  const foundation = initiative
    ? (items.find((a) => a.featured) ?? items[0])
    : null;
  const afterFoundation = initiative
    ? items.filter((a) => a.slug !== foundation?.slug)
    : featured;

  return (
    <section className="border-t border-rule">
      <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="bg-invert px-5 py-10 text-invert-fg sm:px-8 sm:py-12">
          <p className="text-sm tracking-[0.16em] uppercase opacity-60">
            {meta.kicker}
          </p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl">
            {meta.title}
          </h2>
          <p className="mt-3 max-w-lg text-base leading-relaxed opacity-80">
            {meta.dek}
          </p>

          {foundation ? (
            <div className="mt-10 border-t border-white/15">
              <PieceLink
                article={foundation}
                invert
                kicker="Introduction"
              />
            </div>
          ) : null}

          {slug === "7702" ? (
            <MemberGrid members={COLLECTIVE_MEMBERS} folder="7702" />
          ) : null}
          {slug === "coalition" ? (
            <MemberGrid members={COALITION_MEMBERS} folder="coalition" />
          ) : null}

          {slug === "d-core" && featured.length ? (
            <div className="mt-10 border-t border-white/15 pt-8">
              <p className="text-sm tracking-[0.16em] uppercase opacity-60">
                Guide
              </p>
              {featured.map((article) => (
                <a
                  key={article.slug}
                  href={article.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-5 block"
                >
                  <div className="overflow-hidden bg-white/5">
                    <CoverImage
                      src={article.cover}
                      alt={article.coverAlt}
                      className="aspect-[2.2/1] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                  </div>
                  <h3 className="mt-4 font-display text-2xl group-hover:underline sm:text-3xl">
                    {article.title}
                  </h3>
                  <p className="mt-2 max-w-lg text-base leading-relaxed opacity-80">
                    {article.dek}
                  </p>
                </a>
              ))}
            </div>
          ) : !initiative && featured.length && slug !== "d-core" ? (
            <div className="mt-10 border-t border-white/15">
              {afterFoundation.map((article) => (
                <PieceLink
                  key={article.slug}
                  article={article}
                  invert
                  kicker={
                    slug === "academy"
                      ? "Panther Academy"
                      : slug === "papers"
                        ? "Paper"
                        : slug === "devs"
                          ? "For developers"
                          : `${article.source} · ${article.category}`
                  }
                />
              ))}
            </div>
          ) : null}

          {initiative && afterFoundation.length ? (
            <div className="mt-8 border-t border-white/15">
              {afterFoundation.map((article) => (
                <PieceLink
                  key={article.slug}
                  article={article}
                  invert
                  kicker={`${article.source} · ${article.category}`}
                />
              ))}
            </div>
          ) : null}

          {rest.length ? (
            <div className="mt-10 border-t border-white/15 pt-8">
              <p className="text-sm tracking-[0.16em] uppercase opacity-60">
                Institutional reports
              </p>
              <p className="mt-2 max-w-lg text-base leading-relaxed opacity-70">
                Published institutional reports.
              </p>
              <div className="mt-6 grid gap-x-8 gap-y-7 sm:grid-cols-2">
                {rest.map((r) => (
                  <a
                    key={r.slug}
                    href={r.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex gap-3"
                  >
                    <img
                      src="/images/cases/dcore/logo.png"
                      alt=""
                      className="mt-1 size-8 shrink-0 object-contain opacity-80"
                    />
                    <span className="min-w-0">
                      <span className="block text-sm tracking-[0.16em] uppercase opacity-60">
                        Report ·{" "}
                        {new Date(`${r.date}T00:00:00`).toLocaleDateString(
                          "en-GB",
                          { month: "short", year: "numeric" },
                        )}
                      </span>
                      <span className="mt-1 block font-display text-xl group-hover:underline">
                        {r.title}
                      </span>
                      <span className="mt-1 block text-base leading-relaxed opacity-80">
                        {r.dek}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
