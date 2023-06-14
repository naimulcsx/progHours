import { Box, MantineProvider, useMantineTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRoutes } from "react-router-dom";
import theme from "~/styles/theme";
import { getRoutes } from "./routes";
import { useUser } from "./hooks/useUser";

const queryClient = new QueryClient();

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
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[0]
      }}
    >
      {page}
    </Box>
  );
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
        <Entry />
        <Notifications position="top-right" />
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
