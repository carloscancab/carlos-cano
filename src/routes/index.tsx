import { createFileRoute, Link } from "@tanstack/react-router";
import { CoverImage } from "@/components/cover-image";
import { RotatingSlogan } from "@/components/rotating-slogan";
import { MetaLine } from "@/components/site-shell";
import {
  SITE,
  audiences,
  contentCategories,
  featuredCases,
  audienceLabel,
} from "@/lib/content";

export const Route = createFileRoute("/")({ component: Home });

const bioLink =
  "underline decoration-rule underline-offset-4 hover:text-fg hover:decoration-fg";

function Home() {
  const cases = featuredCases();

  return (
    <div>
      <section className="mx-auto max-w-4xl px-5 pt-8 pb-10 sm:px-8 sm:pt-10 sm:pb-12">
        <div className="grid items-center gap-8 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-10">
          <div>
            <h1 className="rise font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl">
              {SITE.name}
            </h1>
            <MetaLine className="rise rise-2 mt-3">{SITE.role}</MetaLine>
            <div className="rise rise-3 mt-4">
              <RotatingSlogan />
            </div>
            <p className="rise rise-4 mt-4 max-w-md text-base leading-relaxed text-muted">
              I build{" "}
              <Link to="/brands" className={bioLink}>
                brands
              </Link>
              , narratives, and content in Web3. For{" "}
              <strong className="font-medium text-fg">people</strong>, not{" "}
              <em>“users.”</em>
            </p>
            <p className="rise rise-4 mt-5 text-base text-muted">I have:</p>
            <ul className="rise rise-4 mt-2 max-w-lg list-disc space-y-2.5 pl-5 text-base leading-relaxed text-muted">
              <li>
                <strong className="font-medium text-fg">10+ years</strong> of{" "}
                <Link to="/brands" className={bioLink}>
                  branding
                </Link>{" "}
                and content experience, collaborating on fundraises{" "}
                <strong className="font-medium text-fg">totaling $75M</strong>.
              </li>
              <li>
                <strong className="font-medium text-fg">
                  Deep expertise in Web3 and crypto
                </strong>
                , collaborating on different projects with names like Binance
                Labs, Circle, and Solana, including{" "}
                <Link
                  to="/audience/$slug"
                  params={{ slug: "institutional" }}
                  className={bioLink}
                >
                  institutional research
                </Link>
                {" "}and{" "}
                <Link
                  to="/c/$slug"
                  params={{ slug: "technical" }}
                  className={bioLink}
                >
                  product documentation
                </Link>
                .
              </li>
              <li>
                Built{" "}
                <Link
                  to="/brands/$slug"
                  params={{ slug: "chain-abstraction" }}
                  className={`${bioLink} font-medium text-fg`}
                >
                  one of the narratives that dominated Web3 conversations
                </Link>{" "}
                for over a year.
              </li>
              <li>
                Taken products{" "}
                <Link
                  to="/brands/$slug"
                  params={{ slug: "universal-x" }}
                  className={`${bioLink} font-medium text-fg`}
                >
                  from idea to top-10
                </Link>{" "}
                in extremely competitive sectors.
              </li>
              <li>
                A passion for{" "}
                <strong className="font-medium text-fg">
                  turning complex ideas into marketable concepts
                </strong>
                .
              </li>
            </ul>
            <p className="rise rise-4 mt-5 max-w-lg text-base leading-relaxed text-muted">
              Below are some{" "}
              <a href="#audiences" className={`${bioLink} font-medium text-fg`}>
                samples of my work
              </a>
              , along with{" "}
              <a href="#cases" className={`${bioLink} font-medium text-fg`}>
                immersive case studies
              </a>
              .
            </p>
          </div>
          <div className="rise rise-2 mx-auto h-64 w-52 shrink-0 overflow-hidden rounded-[50%] bg-surface sm:mx-0 sm:h-96 sm:w-64 lg:h-[26rem] lg:w-72">
            <CoverImage
              src="/images/portrait.jpg"
              alt="Carlos Cano"
              className="h-full w-full object-cover object-[center_32%] outline-none"
            />
          </div>
        </div>
      </section>

      <section id="audiences" className="scroll-mt-28 border-t border-rule">
        <div className="mx-auto max-w-4xl px-5 pt-12 sm:px-8 sm:pt-16">
          <MetaLine>Audiences</MetaLine>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl">
            Examples of my work, segmented by their intended readers.
          </h2>
        </div>
        <div className="mx-auto mt-8 grid max-w-4xl sm:mt-10 sm:grid-cols-3">
          {audiences.map((a) => (
            <Link
              key={a.slug}
              to="/audience/$slug"
              params={{ slug: a.slug }}
              className="group border-b border-rule px-5 py-8 last:border-b-0 sm:border-r sm:border-b-0 sm:px-8 sm:py-10 sm:last:border-r-0"
            >
              <div className="aspect-[3/2] overflow-hidden bg-surface">
                <CoverImage
                  src={a.image}
                  alt={a.imageAlt}
                  className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <p className="mt-5 text-sm tracking-[0.16em] text-faint uppercase">
                {a.short}
              </p>
              <h2 className="mt-1 font-display text-3xl group-hover:underline">
                {a.name}
              </h2>
              <p className="mt-3 max-w-sm text-base leading-relaxed text-muted">
                {a.story}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section
        id="cases"
        className="mx-auto max-w-4xl scroll-mt-28 px-5 pt-16 pb-16 sm:px-8 sm:pt-20"
      >
        <div className="flex items-end justify-between gap-6">
          <div>
            <MetaLine>Case studies</MetaLine>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl">
              Brands and narratives.
            </h2>
          </div>
          <Link
            to="/brands"
            className="hidden min-h-11 items-center text-sm tracking-[0.16em] text-muted uppercase hover:text-fg sm:inline-flex"
          >
            All cases
          </Link>
        </div>
        <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2">
          {cases.map((item, i) => (
            <Link
              key={item.slug}
              to="/brands/$slug"
              params={{ slug: item.slug }}
              className={`group ${
                i === cases.length - 1
                  ? "sm:col-span-2 sm:mx-auto sm:w-[calc(50%-0.75rem)]"
                  : ""
              }`}
            >
              <div className="aspect-[3/2] overflow-hidden bg-surface">
                <CoverImage
                  src={item.cover}
                  alt={item.coverAlt}
                  className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <p className="mt-4 text-sm tracking-[0.16em] text-faint uppercase">
                {item.client
                  ? item.client
                  : item.kind === "brand"
                    ? "Brand"
                    : "Narrative"}{" "}
                · {audienceLabel(item.audience)}
              </p>
              <h3 className="mt-1 font-display text-2xl group-hover:underline">
                {item.name}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-muted">
                {item.dek}
              </p>
            </Link>
          ))}
        </div>
        <Link
          to="/brands"
          className="mt-10 inline-flex min-h-11 items-center text-sm tracking-[0.16em] uppercase underline underline-offset-4 sm:hidden"
        >
          All cases
        </Link>
      </section>

      <section
        id="contents"
        className="mx-auto max-w-4xl scroll-mt-28 px-5 pb-16 sm:px-8 sm:pb-20"
      >
        <div className="border-t border-rule pt-16 sm:pt-20">
          <div className="flex items-end justify-between gap-6">
            <div>
              <MetaLine>Contents</MetaLine>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl">
                Content.
              </h2>
              <p className="mt-3 max-w-lg text-base leading-relaxed text-muted">
                A selection of published work. Not exhaustive.
              </p>
            </div>
            <Link
              to="/contents"
              className="hidden min-h-11 items-center text-sm tracking-[0.16em] text-muted uppercase hover:text-fg sm:inline-flex"
            >
              The archive
            </Link>
          </div>
          <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2">
            {contentCategories.map((c, i) => (
              <Link
                key={c.slug}
                to="/c/$slug"
                params={{ slug: c.slug }}
                className={`group ${
                  i === contentCategories.length - 1
                    ? "sm:col-span-2 sm:mx-auto sm:w-[calc(50%-0.75rem)]"
                    : ""
                }`}
              >
                <div className="aspect-[3/2] overflow-hidden bg-surface">
                  <CoverImage src={c.image} alt={c.imageAlt} />
                </div>
                <p className="mt-4 text-sm tracking-[0.16em] text-faint uppercase">
                  {c.short}
                </p>
                <h3 className="mt-1 font-display text-2xl group-hover:underline">
                  {c.name}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-muted">
                  {c.story}
                </p>
              </Link>
            ))}
          </div>
          <Link
            to="/contents"
            className="mt-10 inline-flex min-h-11 items-center text-sm tracking-[0.16em] uppercase underline underline-offset-4 sm:hidden"
          >
            The archive
          </Link>
        </div>
      </section>
    </div>
  );
}
