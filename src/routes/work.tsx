import { createFileRoute } from "@tanstack/react-router";
import { ReconstructionNote } from "@/components/reconstruction-note";
import { SITE } from "@/lib/content";
import { shareMeta } from "@/lib/og/meta";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: `Work — ${SITE.name}` },
      ...shareMeta({ title: `Work — ${SITE.name}`, description: SITE.lede, path: "/work" }),
    ],
  }),
  component: () => <ReconstructionNote title="This index is not up yet." />,
});
