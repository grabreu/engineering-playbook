import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import appCss from "~/app.css?url";
import { ThemeProvider } from "~/components/theme/theme-provider";
import { TooltipProvider } from "~/components/ui/tooltip";
import { seo } from "~/utils/seo";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    head: () => ({
      meta: [
        {
          charSet: "utf-8",
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          name: "theme-color",
          content: "#ffffff",
        },
        ...seo({
          title: "Todo App | TanStack Start",
          description: "A sample todo application built with TanStack Start.",
        }),
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        { rel: "manifest", href: "/site.webmanifest" },
        { rel: "icon", href: "/favicon.ico" },
      ],
    }),
    shellComponent: ({ children }) => {
      return (
        <html lang="en" suppressHydrationWarning>
          <head>
            <HeadContent />
          </head>
          <body>
            <ThemeProvider defaultTheme="system" storageKey="theme">
              <TooltipProvider>{children}</TooltipProvider>
            </ThemeProvider>
            <TanStackDevtools
              plugins={[
                {
                  name: "Tanstack Router",
                  render: <TanStackRouterDevtoolsPanel />,
                },
                {
                  name: "Tanstack Query",
                  render: <ReactQueryDevtools />,
                },
              ]}
            />
            <Scripts />
          </body>
        </html>
      );
    },
  },
);
