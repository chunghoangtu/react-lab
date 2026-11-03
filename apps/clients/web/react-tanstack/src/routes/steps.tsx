import { LAST_STEP, StepsPage } from "@/features/steps/pages";
import { createFileRoute } from "@tanstack/react-router";

type StepsSearchParams = { username: string; step?: number };

export const Route = createFileRoute("/steps")({
  component: StepsPage,
  validateSearch: (search: Record<string, unknown>): StepsSearchParams => {
    const step = Number(search.step);

    return {
      ...(search.step === undefined
        ? {}
        : { step: isNaN(step) ? 0 : Math.max(Math.min(LAST_STEP, step), 0) }),
      username: search.username ? String(search.username) : "Guest",
    };
  },
  loaderDeps: ({ search }) => {
    console.log("loaderDeps:", search);
    return {
      ...search,
    };
  },
  loader: ({ params, deps }) => {
    console.log("loader params: ", params);
    console.log("loader deps: ", deps);
  },
  staticData: {
    breadcrumb: ({ search }: { search: StepsSearchParams }) =>
      search.step ? ["Steps", `${search.step}`] : "Steps",
  },
});
