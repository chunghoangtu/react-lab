import type { ComponentType } from "react";

import PageTransition from "@/components/routing/PageTransition";

export default function withTransition<Props extends object>(
  Component: ComponentType<Props>,
) {
  function TransitionedPage(props: Props) {
    return (
      <PageTransition>
        <Component {...props} />
      </PageTransition>
    );
  }

  TransitionedPage.displayName = `withTransition(${Component.displayName || Component.name || "Component"})`;

  return TransitionedPage;
}