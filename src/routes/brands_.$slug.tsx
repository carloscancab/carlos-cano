import { createFileRoute, notFound, Link, redirect } from "@tanstack/react-router";
import { CoverImage } from "@/components/cover-image";
import { ChainAbstractionCase } from "@/components/chain-abstraction-case";
import { UniversalXCase } from "@/components/universal-x-case";
import { MetaLine } from "@/components/site-shell";
import { SITE, audienceLabel, getBrand } from "@/lib/content";
import { ogCover, shareMeta } from "@/lib/og/meta";

export const Route = createFileRoute("/brands_/$slug")({
  loader: ({ params }) => {
    if (params.slug === "chain-of-traction") {
      throw redirect({
        to: "/brands/$slug",
        params: { slug: "chain-abstraction" },
      });
    }
    const brand = getBrand(params.slug);
    if (!brand) throw notFound();
    return { brand };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.brand.name} — ${SITE.name}`
          : SITE.name,
      },
      ...(loaderData
        ? shareMeta({
            title: `${loaderData.brand.name} — ${SITE.name}`,
            description: loaderData.brand.dek,
            path: `/brands/${loaderData.brand.slug}`,
            image: ogCover(`brands-${loaderData.brand.slug}`),
            type: "article",
          })
        : []),
    ],
  }),
  component: BrandPage,
});

function BrandPage() {
  const { brand } = Route.useLoaderData();
  const isChain = brand.slug === "chain-abstraction";
  const isUx = brand.slug === "universal-x";
  const isLong = isChain || isUx;

  return (
    <article>
      <div className="border-b border-invert bg-invert px-5 py-3 text-center text-invert-fg sm:px-8">
        <p className="text-sm leading-relaxed sm:text-base">
          This case study is still being edited. However, it’s live to give
          you a general idea of my work.{" "}
          <em className="opacity-80">Yours truly, Carlos.</em>
        </p>
      </div>
      <figure className="overflow-hidden bg-surface">
        <CoverImage
          src={brand.cover}
          alt={brand.coverAlt}
          className="aspect-[16/9] sm:aspect-[2.2/1]"
        />
      </figure>

      <header className={`mx-auto px-5 pt-10 sm:px-8 sm:pt-12 ${isLong ? "max-w-3xl" : "max-w-4xl"}`}>
        {isChain ? (
          <>
            <p className="text-sm tracking-[0.16em] text-faint uppercase">
              Case study
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-3xl leading-[1.15] sm:text-5xl">
              Chain abstraction:
              <span className="mt-2 block">Crafting a dominating narrative</span>
            </h1>
            {brand.client ? (
              <p className="mt-2 font-display text-xl text-muted">
                {brand.client}
              </p>
            ) : null}
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
              {brand.dek}
            </p>
          </>
        ) : isUx ? (
          <>
            <p className="text-sm tracking-[0.16em] text-faint uppercase">
              Case study
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-3xl leading-[1.15] sm:text-5xl">
              Universal X:
              <span className="mt-2 block">From the sentence to a billion</span>
            </h1>
            {brand.client ? (
              <p className="mt-2 font-display text-xl text-muted">
                {brand.client}
              </p>
            ) : null}
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
              {brand.dek}
            </p>
          </>
        ) : (
          <>
            <MetaLine>
              <Link to="/brands" className="hover:text-fg">
                Cases
              </Link>
              {" · "}
              {brand.kind === "brand" ? "Brand" : "Narrative"}
              {brand.client ? ` · ${brand.client}` : ""}
              {" · "}
              <Link
                to="/audience/$slug"
                params={{ slug: brand.audience }}
                className="hover:text-fg"
              >
                {audienceLabel(brand.audience)}
              </Link>
              {" · "}
              {brand.year}
            </MetaLine>
            <h1 className="mt-3 font-display text-4xl sm:text-5xl">
              {brand.name}
            </h1>
            {brand.client ? (
              <p className="mt-2 font-display text-xl text-muted">
                {brand.client}
              </p>
            ) : null}
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
              {brand.dek}
            </p>
          </>
        )}
      </header>

      {isChain ? (
        <ChainAbstractionCase />
      ) : isUx ? (
        <UniversalXCase />
      ) : (
        <>
          <div className="mx-auto mt-10 grid max-w-4xl gap-8 border-y border-rule px-5 py-8 sm:grid-cols-3 sm:px-8">
            <Spec label="Role" value={brand.role} />
            <Spec label="Audience" value={audienceLabel(brand.audience)} />
            <Spec label="Year" value={brand.year} />
          </div>
          <div className="mx-auto mt-16 grid max-w-4xl gap-12 px-5 pb-24 sm:grid-cols-2 sm:px-8">
            <div>
              <h2 className="text-sm tracking-[0.16em] text-faint uppercase">
                Problem
              </h2>
              <p className="mt-3 leading-relaxed">{brand.problem}</p>
            </div>
            <div>
              <h2 className="text-sm tracking-[0.16em] text-faint uppercase">
                Work
              </h2>
              <p className="mt-3 leading-relaxed">{brand.work}</p>
            </div>
            <div className="sm:col-span-2">
              <h2 className="text-sm tracking-[0.16em] text-faint uppercase">
                Made
              </h2>
              <ul className="mt-4 grid gap-px bg-rule sm:grid-cols-4">
                {brand.made.map((item) => (
                  <li
                    key={item}
                    className="bg-bg py-4 pr-6 text-sm font-medium tracking-tight"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {brand.slug === "panther-protocol" ? (
              <p className="max-w-xl text-base leading-relaxed text-muted sm:col-span-2">
                Also:{" "}
                <a
                  href="https://docs.pantherprotocol.io/docs"
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-4 hover:text-fg"
                >
                  Panther Protocol documentation
                </a>
                , filed under{" "}
                <Link
                  to="/audience/$slug"
                  params={{ slug: "b2b" }}
                  className="underline underline-offset-4 hover:text-fg"
                >
                  B2B
                </Link>
                , and related{" "}
                <Link
                  to="/audience/$slug"
                  params={{ slug: "institutional" }}
                  className="underline underline-offset-4 hover:text-fg"
                >
                  institutional
                </Link>{" "}
                work.
              </p>
            ) : null}
          </div>
        </>
      )}
    </article>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm tracking-[0.16em] text-faint uppercase">{label}</p>
      <p className="mt-2 text-base font-medium tracking-tight">{value}</p>
    </div>
  );
}
