import { useAuth } from "@/lib/utils";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/min-side")({
  component: RouteComponent,
});

function RouteComponent() {
  const { checkAuth } = useAuth();

  checkAuth();

  return <Outlet />;
}
