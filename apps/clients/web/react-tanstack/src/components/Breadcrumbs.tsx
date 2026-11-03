import { Link, useMatches, type AnyRouteMatch } from "@tanstack/react-router";

export type BreadcrumbValue = string | string[] | ((match: AnyRouteMatch) => string | string[]);

type ResolvedBreadcrumbItem = {
  path: string;
  label: string;
};

export default function Breadcrumbs() {
  const matches = useMatches();

  const breadcrumbs: ResolvedBreadcrumbItem[] = matches.flatMap((match) => {
    const staticData = match.staticData;
    if (!staticData?.breadcrumb) return [];

    const breadcrumbValue =
      typeof staticData.breadcrumb === "function"
        ? staticData.breadcrumb(match)
        : staticData.breadcrumb;

    const items = Array.isArray(breadcrumbValue) ? breadcrumbValue : [breadcrumbValue];

    return items.map((item) => ({
      label: item,
      path: match.pathname,
    }));
  });

  if (breadcrumbs.length === 0) {
    return null;
  }

  return (
    <div>
      <div>
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <div key={`${crumb.path}-${index}`}>
              <div>
                {isLast ? (
                  <label>{crumb.label}</label>
                ) : (
                  <a>
                    <Link to={crumb.path}>{crumb.label}</Link>
                  </a>
                )}
              </div>
              {!isLast && <p />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
