import { cssBundleHref } from "@remix-run/css-bundle";
import {
  type LinksFunction,
  LoaderArgs,
  type MetaFunction,
  json
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from "@remix-run/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import jwt from "jwt-simple";

import {
  ColorSchemeScript,
  MantineColorScheme,
  MantineProvider
} from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import "@mantine/nprogress/styles.css";

import {
  JwtPayload,
  Layout,
  UserProvider,
  cssVariablesResolver,
  theme
} from "@proghours/ui";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : [])
];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  viewport: "width=device-width,initial-scale=1"
});

export async function loader({ request }: LoaderArgs) {
  const cookie = Object.fromEntries(
    (request.headers.get("cookie") ?? "")
      .split("; ")
      .map((v) => v.split(/=(.*)/s).map(decodeURIComponent))
  );

  let user: JwtPayload | undefined;

  try {
    user = jwt.decode(cookie.accessToken, process.env.JWT_SECRET as string);
  } catch {
    user = undefined;
  }

  let colorScheme: Exclude<MantineColorScheme, "auto"> = "light";
  if (cookie.colorScheme === "dark") colorScheme = "dark";

  return json({ colorScheme, user });
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

export default function App() {
  const { colorScheme, user } = useLoaderData<typeof loader>();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Onest:wght@400..700&display=swap"
          rel="stylesheet"
        />
        <Meta />
        <Links />
        <ColorSchemeScript forceColorScheme={colorScheme} />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <MantineProvider
            theme={theme}
            cssVariablesResolver={cssVariablesResolver}
            forceColorScheme={colorScheme}
          >
            <UserProvider user={user as JwtPayload}>
              <ModalsProvider>
                <Layout>
                  <Outlet />
                  <ScrollRestoration />
                  <Scripts />
                  <LiveReload />
                  <Notifications position="top-center" />
                </Layout>
              </ModalsProvider>
            </UserProvider>
          </MantineProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
