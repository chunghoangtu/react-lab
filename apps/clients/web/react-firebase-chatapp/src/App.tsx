import { RouterProvider, createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import AppProvider from "@/providers/AppProvider";
import AuthProvider from "@/providers/AuthProvider";
import AddRoomModal from "@/components/modals/AddRoomModal";
import InviteMemberModal from "@/components/modals/InviteMemberModal";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <RouterProvider router={router} />
        <AddRoomModal />
        <InviteMemberModal />
      </AppProvider>
    </AuthProvider>
  );
}
