import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { CoverImage } from "@/components/cover-image";
import { MetaLine } from "@/components/site-shell";
import {
  type Article,
  type WorkCard,
  audienceLabel,
  categoryLabel,
  formatDate,
  kindLabel,
} from "@/lib/content";

function PieceMeta({ item }: { item: WorkCard }) {
  const kind =
    item.kind === "content" && item.category
      ? categoryLabel(item.category)
      : kindLabel(item.kind);
  return (
    <p className="text-sm text-muted">
      <span className="tracking-[0.16em] text-fg uppercase">{kind}</span>
      <span className="text-faint"> · {audienceLabel(item.audience)} · </span>
      {item.kind === "content" ? formatDate(item.date) : item.date.slice(0, 4)}
    </p>
  );
}

function PieceBody({ item }: { item: WorkCard }) {
  return (
    <>
      <h3 className="mt-2 font-display text-xl leading-tight group-hover:underline sm:text-2xl">
        {item.title}
      </h3>
      <p className="mt-2 max-w-xl text-base leading-relaxed text-muted">
        {item.dek}
      </p>
      {item.note ? (
        <p className="mt-2 max-w-xl text-base leading-relaxed text-muted">
          {item.note}
        </p>
      ) : null}
      {item.source ? (
        <p className="mt-3 text-sm tracking-[0.16em] text-faint uppercase">
          {item.external?.startsWith("http")
            ? `${item.source} ↗`
            : item.source}
        </p>
      ) : null}
    </>
  );
}

function wrapCard(item: WorkCard, className: string, children: ReactNode) {
  if (item.external) {
    const offsite = item.external.startsWith("http");
    return (
      <a
        href={item.external}
        target={offsite ? "_blank" : undefined}
        rel={offsite ? "noreferrer" : undefined}
        className={`group ${className}`}
      >
        {children}
      </a>
    );
  }
  if (item.href?.to === "/brands/$slug" && item.href.params) {
    return (
      <Link
        to="/brands/$slug"
        params={{ slug: item.href.params.slug }}
        className={`group ${className}`}
      >
        {children}
      </Link>
    );
  }
  if (item.href?.to === "/a/$slug" && item.href.params) {
    return (
      <Link
        to="/a/$slug"
        params={{ slug: item.href.params.slug }}
        className={`group ${className}`}
      >
        {children}
      </Link>
    );
  }
  if (item.href?.to === "/studio") {
    return (
      <Link to="/studio" className={`group ${className}`}>
        {children}
      </Link>
    );
  }
  return <div className={className}>{children}</div>;
}

export function WorkTile({ item }: { item: WorkCard }) {
  return wrapCard(
    item,
    "flex flex-col",
    <>
      <div className="aspect-[3/2] overflow-hidden bg-surface">
        <CoverImage
          src={item.cover}
          alt={item.coverAlt}
          className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <MetaLine className="mt-3">
        {item.kind === "content" && item.category
          ? categoryLabel(item.category)
          : kindLabel(item.kind)}{" "}
        · {audienceLabel(item.audience)}
      </MetaLine>
      <h3 className="mt-1.5 font-display text-xl leading-snug group-hover:underline">
        {item.title}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.dek}</p>
    </>,
  );
}

export function WorkRow({ item }: { item: WorkCard }) {
  return wrapCard(
    item,
    "block border-b border-rule py-6",
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
      <div className="aspect-[16/9] w-full shrink-0 overflow-hidden bg-surface sm:h-[4.75rem] sm:w-36 sm:aspect-auto">
        <CoverImage
          src={item.cover}
          alt={item.coverAlt}
          className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="min-w-0">
        <PieceMeta item={item} />
        <PieceBody item={item} />
      </div>
    </div>,
  );
}

export function ArticleRow({ article }: { article: Article }) {
  return (
    <WorkRow
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
        href: article.href
          ? undefined
          : { to: "/a/$slug", params: { slug: article.slug } },
      }}
    />
  );
}