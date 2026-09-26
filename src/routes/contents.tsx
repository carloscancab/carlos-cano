import { createFileRoute, Link } from "@tanstack/react-router";
import { CoverImage } from "@/components/cover-image";
import { MetaLine } from "@/components/site-shell";
import {
  SITE,
  articles,
  articlesForCategory,
  contentCategories,
} from "@/lib/content";
import { shareMeta } from "@/lib/og/meta";

export const Route = createFileRoute("/contents")({
  head: () => ({
    meta: [
      { title: `Contents — ${SITE.name}` },
      ...shareMeta({
        title: `Contents — ${SITE.name}`,
        description: `The archive, filed by kind. ${articles.length} pieces. Not exhaustive.`,
        path: "/contents",
      }),
    ],
  }),
  component: ContentsPage,
});

function ContentsPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-20">
      <MetaLine>Contents</MetaLine>
      <h1 className="mt-3 max-w-xl font-display text-4xl sm:text-5xl">
        Content.
      </h1>
      <p className="mt-5 max-w-lg text-base leading-relaxed text-muted">
        The archive, filed by kind. {articles.length} pieces. Not exhaustive.
      </p>

      <div className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2">
        {contentCategories.map((c) => {
          const n = articlesForCategory(c.slug).length;
          return (
            <Link
              key={c.slug}
              to="/c/$slug"
              params={{ slug: c.slug }}
              className="group"
            >
              <div className="aspect-[3/2] overflow-hidden bg-surface">
                <CoverImage
                  src={c.image}
                  alt={c.imageAlt}
                  className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <p className="mt-4 text-sm tracking-[0.16em] text-faint uppercase">
                {c.short}
                {n ? ` · ${n}` : ""}
              </p>
              <h2 className="mt-1 font-display text-2xl group-hover:underline">
                {c.name}
              </h2>
              <p className="mt-2 text-base leading-relaxed text-muted">
                {c.story}
              </p>
            </Link>
          );
        })}
      </div>

      <p className="mt-16 max-w-lg text-base leading-relaxed text-muted">
        {articles.length} pieces. Also grouped by{" "}
        <Link
          to="/audience/$slug"
          params={{ slug: "retail" }}
          className="underline underline-offset-4 hover:text-fg"
        >
          audience
        </Link>
        .
      </p>
    </div>
  );
}
