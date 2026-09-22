import { createFileRoute } from "@tanstack/react-router";
import { ContactLinks, MetaLine } from "@/components/site-shell";
import { NOW, formatDate } from "@/lib/content";

export const Route = createFileRoute("/now")({
  head: () => ({
    meta: [{ title: `Now — Carlos Cano` }],
  }),
  component: NowPage,
});

function NowPage() {
  return (
    <article className="mx-auto max-w-2xl px-5 py-14 sm:px-8 sm:py-20">
      <MetaLine>Now</MetaLine>
      <h1 className="mt-3 font-display text-4xl sm:text-5xl">
        What I am doing now
      </h1>
      <p className="mt-5 text-base leading-relaxed text-muted">{NOW.lede}</p>
      <p className="mt-3 text-sm tracking-[0.16em] text-faint uppercase">
        Updated {formatDate(NOW.updated)}
      </p>

      <div className="mt-14 space-y-12">
        {NOW.sections.map((section) => (
          <section key={section.title}>
            <h2 className="font-display text-2xl">{section.title}</h2>
            <p className="mt-3 text-base leading-relaxed">{section.body}</p>
          </section>
        ))}
      </div>

      <div className="mt-16">
        <p className="text-base leading-relaxed text-muted">
          This is a{" "}
          <a
            href="https://sive.rs/now2"
            className="text-fg underline underline-offset-4 hover:no-underline"
          >
            now page
          </a>
          . If we have not spoken in a year, start here.
        </p>
        <ContactLinks className="mt-4" />
      </div>
    </article>
  );
}