import { Link } from "@tanstack/react-router";
import { CircleCheckIcon, MenuIcon } from "lucide-react";
import { ModeToggle } from "~/components/theme/mode-toggle";
import { Button } from "~/components/ui/button";
import { useSidebar } from "~/components/ui/sidebar";

export const SiteHeader = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="flex h-(--header-height) items-center px-4">
        <div className="flex items-center gap-2">
          <Button
            className="h-8 w-8"
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
          >
            <MenuIcon />
          </Button>
          <Link to="/" className="flex items-center gap-2 text-lg font-medium">
            <CircleCheckIcon />
            Tasks
          </Link>
        </div>
        <div className="ml-auto">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};
