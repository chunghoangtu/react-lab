import { TablePage } from "@/features/table/pages";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/table")({
  staticData: { breadcrumb: "Table" },
  beforeLoad: ({ context }) => {
    const { isLogged } = context.authentication;

    if (!isLogged())
      throw redirect({
        to: "/login",
      });
  },
  component: TablePage,
});
