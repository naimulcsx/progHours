import {
  Box,
  ColorScheme,
  MantineProvider,
  ColorSchemeProvider,
  useMantineTheme
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useLocation, useRoutes } from "react-router-dom";
import theme from "~/styles/theme";
import { getRoutes } from "./routes";
import { useUser } from "./hooks/useUser";
import { useLocalStorage } from "@mantine/hooks";
import { useColorAccent } from "./contexts/ColorAccentContext";
import { NavigationProgress, nprogress } from "@mantine/nprogress";
import { ModalsProvider } from "@mantine/modals";
import { useEffect } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

function Entry() {
  const { user } = useUser();
  const theme = useMantineTheme();
  const page = useRoutes(getRoutes(!!user));
  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        background:
          theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white
      }}
    >
      {page}
    </Box>
  );
}

export function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "dark",
    getInitialValueInEffect: false
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  const { accentColor } = useColorAccent();

  const location = useLocation();

  useEffect(() => {
    nprogress.complete();
  }, [location.pathname]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ ...theme, colorScheme, primaryColor: accentColor }}
      >
        <ModalsProvider>
          <NavigationProgress autoReset={true} />
          <QueryClientProvider client={queryClient}>
            <Entry />
            <Notifications position="top-right" transitionDuration={400} />
          </QueryClientProvider>
        </ModalsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
