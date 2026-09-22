import { createFileRoute } from "@tanstack/react-router";
import { ReconstructionNote } from "@/components/reconstruction-note";
import { SITE } from "@/lib/content";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [{ title: `Work — ${SITE.name}` }],
  }),
  component: () => <ReconstructionNote title="This index is not up yet." />,
});
