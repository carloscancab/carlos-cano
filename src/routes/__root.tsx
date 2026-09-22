import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
  Link,
} from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { SiteShell } from "@/components/site-shell";
import { SITE } from "@/lib/content";
import appCss from "../styles.css?url";

const APP_NAME = SITE.name;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${APP_NAME} — ${SITE.role}` },
      { name: "description", content: SITE.lede },
      { name: "theme-color", content: "#FBFBF9" },
      { property: "og:title", content: SITE.name },
      { property: "og:description", content: SITE.lede },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://carlos-cano.vercel.app/" },
      { property: "og:image", content: "https://carlos-cano.vercel.app/og.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE.name },
      { name: "twitter:description", content: SITE.lede },
      { name: "twitter:image", content: "https://carlos-cano.vercel.app/og.jpg" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400;1,6..72,500&family=Shippori+Mincho:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  notFoundComponent: NotFound,
  component: RootDocument,
});

function RootDocument() {
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="bg-bg text-fg">
        <PreviewHostBridge />
        <AuthProvider>
          <SiteShell>
            <Outlet />
          </SiteShell>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}

function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-start justify-center px-5 py-24 sm:px-8">
      <p className="text-xs tracking-[0.16em] text-muted uppercase">404</p>
      <h1 className="mt-4 font-display text-4xl sm:text-5xl">
        This page is not in the index.
      </h1>
      <p className="mt-5 max-w-md text-muted">
        The work you asked for is not here.
      </p>
      <Link
        to="/"
        className="mt-10 inline-flex min-h-11 items-center text-xs tracking-[0.16em] uppercase underline"
      >
        Home
      </Link>
    </section>
  );
}
