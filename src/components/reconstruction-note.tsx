import { Link } from "@tanstack/react-router";
import { MetaLine } from "@/components/site-shell";

export function ReconstructionNote({
  title = "This page is not up yet.",
}: {
  title?: string;
}) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col justify-center px-5 py-24 sm:px-8">
      <MetaLine>Under reconstruction</MetaLine>
      <h1 className="mt-4 font-display text-4xl sm:text-5xl">{title}</h1>
      <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
        This site is being rebuilt. The page you asked for does not have its
        final content yet.
      </p>
      <Link
        to="/"
        className="mt-10 inline-flex min-h-11 items-center text-xs tracking-[0.16em] uppercase underline underline-offset-4"
      >
        Home
      </Link>
    </div>
  );
}
