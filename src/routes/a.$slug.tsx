import { createFileRoute } from "@tanstack/react-router";
import { ReconstructionNote } from "@/components/reconstruction-note";
import { SITE, getArticle } from "@/lib/content";
import { shareMeta } from "@/lib/og/meta";

export const Route = createFileRoute("/a/$slug")({
  head: ({ params }) => {
    const article = getArticle(params.slug);
    return {
      meta: [
        { title: `Contents — ${SITE.name}` },
        ...shareMeta({
          title: article ? `${article.title} — ${SITE.name}` : `Contents — ${SITE.name}`,
          description: article?.dek ?? SITE.lede,
          path: `/a/${params.slug}`,
        }),
      ],
    };
  },
  component: () => <ReconstructionNote title="This piece is not up yet." />,
});
