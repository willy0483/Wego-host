import Aside from "@/components/aside";
import FilterNav from "@/components/filterNav";
import MobilAside from "@/components/mobilAside";
import MobilFilterNav from "@/components/mobilFilterNav";
import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";

export const Route = createFileRoute("/lift")({
  component: RouteComponent,
});

function RouteComponent() {
  const location = useLocation();
  const pathName = location.pathname;

  return (
    <>
      <FilterNav />
      <div
        className={`${pathName == "/lift" ? "" : "hidden"} bg-app-background`}
      >
        <MobilFilterNav />
      </div>
      <div
        className={`container mx-auto min-h-screen max-w-5xl flex flex-col ${pathName == "/lift" ? "xl:grid xl:grid-cols-[20%_1fr]" : ""} gap-8 py-4`}
      >
        <div className={`${pathName == "/lift" ? "" : "hidden"}`}>
          <Aside />
          <MobilAside />
        </div>
        <Outlet />
      </div>
    </>
  );
}
