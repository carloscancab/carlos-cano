import { createFileRoute } from "@tanstack/react-router";
import { ReconstructionNote } from "@/components/reconstruction-note";
import { SITE } from "@/lib/content";

export const Route = createFileRoute("/a/$slug")({
  head: () => ({
    meta: [{ title: `Contents — ${SITE.name}` }],
  }),
  component: () => <ReconstructionNote title="This piece is not up yet." />,
});
