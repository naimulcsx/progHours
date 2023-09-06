import {
  Box,
  MantineProvider,
  localStorageColorSchemeManager,
  useMantineColorScheme
} from "@mantine/core";
import { BrowserRouter, useLocation, useRoutes } from "react-router-dom";
import { resolvers, theme } from "./theme";
import { getRoutes } from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Notifications } from "@mantine/notifications";
import { HelmetProvider } from "react-helmet-async";
import { useUser } from "./modules/auth/hooks/useUser";
import { NavigationProgress, nprogress } from "@mantine/nprogress";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/nprogress/styles.css";
import "./theme/global.css";

import { useAccentColor } from "./modules/common/contexts/AccentColorContext";
import { useEffect } from "react";

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
        defaultColorScheme="dark"
        colorSchemeManager={colorSchemeManager}
        cssVariablesResolver={resolvers[accentColor]}
      >
        <QueryClientProvider client={queryClient}>
          <HelmetProvider>
            <Entry />
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
