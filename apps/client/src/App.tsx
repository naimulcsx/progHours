import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, useLocation, useRoutes } from "react-router-dom";

import {
  Box,
  MantineProvider,
  localStorageColorSchemeManager,
  useMantineColorScheme
} from "@mantine/core";
import "@mantine/core/styles.layer.css";
import "@mantine/dates/styles.layer.css";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.layer.css";
import { NavigationProgress, nprogress } from "@mantine/nprogress";
import "@mantine/nprogress/styles.layer.css";

import { useUser } from "./modules/auth/hooks/useUser";
import { useAccentColor } from "./modules/common/contexts/AccentColorContext";
import { SidebarProvider } from "./modules/common/contexts/SidebarContext";
import { getRoutes } from "./routes";
import { resolvers, theme } from "./theme";
import "./theme/global.css";

const colorSchemeManager = localStorageColorSchemeManager({
  key: "proghours-color-scheme"
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

function App() {
  const { accentColor } = useAccentColor();
  return (
    <BrowserRouter>
      <MantineProvider
        theme={theme}
        defaultColorScheme="light"
        colorSchemeManager={colorSchemeManager}
        cssVariablesResolver={resolvers[accentColor]}
      >
        <QueryClientProvider client={queryClient}>
          <HelmetProvider>
            <ModalsProvider>
              <SidebarProvider>
                <Entry />
              </SidebarProvider>
            </ModalsProvider>
            <Notifications position="top-center" />
            <NavigationProgress />
          </HelmetProvider>
        </QueryClientProvider>
      </MantineProvider>
    </BrowserRouter>
  );
}

function Entry() {
  const { user } = useUser();
  const { colorScheme } = useMantineColorScheme();
  const children = useRoutes(getRoutes(!!user));
  const location = useLocation();

  useEffect(() => {
    nprogress.complete();
  }, [location.pathname]);

  return <Box className={colorScheme}>{children}</Box>;
}

export default App;
