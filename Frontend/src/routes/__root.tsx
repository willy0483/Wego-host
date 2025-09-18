import Footer from "@/components/footer";
import Header from "@/components/header";
import NotFound from "@/components/notFound";
import Sådanirkerdet from "@/components/sådanirkerdet";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/providers/authProvider";
import { createRootRoute, HeadContent, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <main>
      {/* meta data */}
      <HeadContent />
      {/* auth and userData */}
      <AuthProvider>
        <Header />
        <section className="min-h-[calc(100vh-80px)]">
          <Outlet />
        </section>
        <Toaster />
        <Footer />

        {/* modules */}
        <Sådanirkerdet />

        {/* Add dev tools for router */}
        <TanStackRouterDevtools />
      </AuthProvider>
    </main>
  ),
  notFoundComponent: NotFound,

  // Setup meta data for site
  head: () => ({
    meta: [
      {
        name: "description",
        content:
          "WeGo er en online service der tilbyder bæredygtig samkørsel til sine registrerede brugere. Som bruger kan man søge og booke ture med forskellige præferencer til en given destination. ",
      },
      {
        title: "Wego",
      },
      {
        name: "keywords",
        content:
          "React, Vite, Tailwind, Tanstack, Template, Authentication, Routing, Web App, UI, Modern, Responsive,Tanstack ,Tanstack Query, Tanstack Router",
      },
      {
        name: "author",
        content: "William Leander Jensen",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0",
      },
      {
        name: "theme-color",
        content: "#09366d",
      },
    ],
    links: [
      {
        rel: "icon",
        href: "/icons/wego-logo.svg",
      },
    ],
  }),
});
