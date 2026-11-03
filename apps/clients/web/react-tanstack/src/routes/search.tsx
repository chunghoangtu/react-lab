import { createFileRoute } from "@tanstack/react-router";
import z, { string } from "zod";

// type Category = "electronics" | "clothing" | "books" | "toys";
// type ItemFilters = {
//   query: string;
//   hasDiscount: boolean;
//   categories: Category[];
// };
// const Category = z.union([
//   z.literal("electronics"),
//   z.literal("clothing"),
//   z.literal("books"),
//   z.literal("toys"),
// ]);

const Category = z.enum(["electronics", "clothing", "books", "toys"]);
type Category = z.infer<typeof Category>;

const ItemFilters = z.object({
  query: z.optional(z.string()),
  hasDiscount: z.optional(
    z
      .union([z.boolean(), z.enum(["true", "false"])])
      .transform((value) => value === true || value === "true")
  ),
  categories: z.optional(z.array(Category)),
});
type ItemFilters = z.infer<typeof ItemFilters>;

export const Route = createFileRoute("/search")({
  staticData: { breadcrumb: "Search" },
  // validateSearch: (search: Record<string, unknown>): ItemFilters => {
  //   return {
  //     query: search.query as string,
  //     hasDiscount: search.hasDiscount == "true",
  //     categories: search.categories as Category[],
  //   };
  // },
  validateSearch: (search) => z.parse(ItemFilters, search),
  component: RouteComponent,
});

function RouteComponent() {
  const { query, hasDiscount, categories } = Route.useSearch();

  return (
    <div>
      <h1>Search</h1>
      <pre>{JSON.stringify({ query, hasDiscount, categories }, null, 2)}</pre>
    </div>
  );
}
