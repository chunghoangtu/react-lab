import type { PropsWithChildren } from "react";

// import { I18nProvider } from "./i18n-provider";
// import { QueryProvider } from "./query-provider";
// import { SocketProvider } from "./socket-provider";
// import { ThemeProvider } from "./theme-provider";

export default function AppProviders({ children }: PropsWithChildren) {
  return (
    // <ThemeProvider>
    //   <QueryProvider>
    //     <SocketProvider>
    //       <I18nProvider>
    <>{children}</>
    //       </I18nProvider>
    //     </SocketProvider>
    //   </QueryProvider>
    // </ThemeProvider>
  );
}
