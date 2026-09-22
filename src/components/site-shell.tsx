import { useState } from "react";
import { Link } from "@tanstack/react-router";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { Mark } from "@/components/mark";
import { SITE } from "@/lib/content";
import { cn } from "@/lib/utils";

const links = [
  { to: "/brands" as const, label: "Cases" },
  { to: "/contents" as const, label: "Contents" },
  { to: "/now" as const, label: "Now" },
];

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative min-h-dvh bg-bg text-fg">
      <div className="sticky top-0 z-40">
        <p className="border-b border-invert bg-invert px-5 py-2 text-center text-[11px] leading-snug text-invert-fg sm:px-8">
          I’m still adding content to this site. Some pages may not work yet.{" "}
          <em>Yours truly, Carlos.</em>
        </p>
        <header className="border-b border-rule bg-bg/85 backdrop-blur-[6px]">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-5 sm:px-8">
          <Link
            to="/"
            className="group flex min-h-11 items-center gap-2.5 text-fg"
            aria-label={`${SITE.name}, home`}
          >
            <Mark />
            <span className="font-display text-base tracking-tight">
              {SITE.name}
            </span>
          </Link>

          <nav className="hidden items-center gap-7 sm:flex" aria-label="Primary">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="min-h-11 text-xs tracking-[0.16em] text-muted uppercase transition-colors duration-150 hover:text-fg"
                activeProps={{ className: "text-fg" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <button
                type="button"
                className="relative flex size-11 items-center justify-center text-fg sm:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5" strokeWidth={1.5} />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-fg/30" />
              <Dialog.Content
                className="fixed inset-0 z-50 flex flex-col bg-bg px-6 pt-6 pb-10"
                aria-describedby={undefined}
              >
                <div className="flex items-center justify-between">
                  <Dialog.Title className="font-display text-base">
                    {SITE.name}
                  </Dialog.Title>
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      className="flex size-11 items-center justify-center"
                      aria-label="Close menu"
                    >
                      <X className="size-5" strokeWidth={1.5} />
                    </button>
                  </Dialog.Close>
                </div>
                <nav className="mt-16 flex flex-col" aria-label="Mobile">
                  <Link
                    to="/"
                    onClick={() => setOpen(false)}
                    className="border-b border-rule py-4 font-display text-3xl"
                  >
                    Home
                  </Link>
                  {links.map((l) => (
                    <Link
                      key={l.to}
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className="border-b border-rule py-4 font-display text-3xl"
                    >
                      {l.label}
                    </Link>
                  ))}
                </nav>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
        </header>
      </div>

      <main>{children}</main>

      <footer className="mt-24 border-t border-rule">
        <div className="mx-auto grid max-w-4xl gap-10 px-5 py-12 sm:grid-cols-3 sm:px-8 sm:py-16">
          <div>
            <p className="flex items-center gap-2 font-display text-base">
              <Mark />
              {SITE.name}
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              {SITE.role} for web3.
            </p>
            <Link
              to="/now"
              className="mt-4 inline-flex min-h-11 items-center text-xs tracking-[0.16em] text-muted uppercase hover:text-fg"
            >
              What I am doing now
            </Link>
          </div>
          <div className="text-sm leading-relaxed text-muted">
            <p className="text-xs tracking-[0.16em] text-faint uppercase">
              Audiences
            </p>
            <div className="mt-3 flex flex-col gap-2">
              <Link
                to="/audience/$slug"
                params={{ slug: "retail" }}
                className="hover:text-fg"
              >
                Retail
              </Link>
              <Link
                to="/audience/$slug"
                params={{ slug: "institutional" }}
                className="hover:text-fg"
              >
                Institutional
              </Link>
              <Link
                to="/audience/$slug"
                params={{ slug: "b2b" }}
                className="hover:text-fg"
              >
                B2B
              </Link>
              <Link to="/contents" className="mt-3 hover:text-fg">
                Contents
              </Link>
              <Link to="/studio" className="hover:text-fg">
                Podcasts
              </Link>
            </div>
          </div>
          <div className="text-sm leading-relaxed text-muted">
            <p className="text-xs tracking-[0.16em] text-faint uppercase">
              Contact
            </p>
            <ContactLinks className="mt-3" />
          </div>
        </div>
      </footer>
    </div>
  );
}

export function ContactLinks({ className }: { className?: string }) {
  const items = [
    { href: `mailto:${SITE.email}`, label: "Email", external: false },
    { href: SITE.x, label: "X", external: true },
    { href: SITE.linkedin, label: "LinkedIn", external: true },
  ];

  return (
    <div className={cn("flex flex-col items-start", className)}>
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className="inline-flex min-h-11 items-center text-xs tracking-[0.16em] text-fg uppercase hover:underline"
          {...(item.external
            ? { target: "_blank", rel: "noreferrer" }
            : {})}
        >
          {item.label}
        </a>
      ))}
    </div>
  );
}

export function MetaLine({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-sm tracking-[0.16em] text-muted uppercase",
        className,
      )}
    >
      {children}
    </p>
  );
}
