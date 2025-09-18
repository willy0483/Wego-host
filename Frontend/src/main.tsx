import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import "./App.css";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import ModuleProvider from "./providers/moduleProvider";
import { FilterProvider } from "./providers/filterProvider";

// Create a new router instance
const router = createRouter({ routeTree, notFoundMode: "root" });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FilterProvider>
      <ModuleProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          {/* Add dev tools for query */}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ModuleProvider>
    </FilterProvider>
  </StrictMode>
);
