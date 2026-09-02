import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppSidebar } from "~/components/layout/app-sidebar";
import { SiteHeader } from "~/components/layout/site-header";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";

const RouteComponent = () => {
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            <div className="flex flex-1 justify-center">
              <div className="w-full max-w-3xl flex flex-col gap-4 p-4">
                <Outlet />
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export const Route = createFileRoute("/_app")({
  component: RouteComponent,
});
