"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import * as React from "react";

import { MantineProvider } from "@mantine/core";

import { cssVariablesResolver, theme } from "@proghours/ui";

export function Providers(props: {
  children: React.ReactNode;
  colorScheme: "light" | "dark";
}) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <MantineProvider
      theme={theme}
      cssVariablesResolver={cssVariablesResolver}
      forceColorScheme={props.colorScheme}
    >
      <QueryClientProvider client={queryClient}>
        <ReactQueryStreamedHydration>
          {props.children}
        </ReactQueryStreamedHydration>
      </QueryClientProvider>
    </MantineProvider>
  );
}
