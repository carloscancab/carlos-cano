import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/writing")({
  beforeLoad: () => {
    throw redirect({ to: "/contents" });
  },
});
