"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { Rubik } from "next/font/google";
import * as React from "react";

import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import {
  JwtPayload,
  UserProvider,
  cssVariablesResolver,
  theme
} from "@proghours/ui";

const font = Rubik({
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap"
});

export function Providers(props: {
  children: React.ReactNode;
  colorScheme: "light" | "dark";
  user?: JwtPayload;
}) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false
          }
        }
      })
  );
  return (
    <MantineProvider
      theme={{ ...theme, fontFamily: font.style.fontFamily }}
      cssVariablesResolver={cssVariablesResolver}
      forceColorScheme={props.colorScheme}
    >
      <QueryClientProvider client={queryClient}>
        <UserProvider user={props.user}>
          <Notifications position="top-center" />
          <ReactQueryStreamedHydration>
            {props.children}
          </ReactQueryStreamedHydration>
        </UserProvider>
      </QueryClientProvider>
    </MantineProvider>
  );
}
