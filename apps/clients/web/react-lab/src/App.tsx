import { AppProviders } from "@providers/app-provider";
import { RouterProvider } from "@providers/router-provider";

// const queryClient = new QueryClient();
export default function App() {
  return (
    <>
      <AppProviders>
        <RouterProvider />
      </AppProviders>
    </>
  );
}
