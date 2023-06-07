import { Box, MantineProvider, useMantineTheme } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRoutes } from "react-router-dom";
import theme from "~/styles/theme";
import { getRoutes } from "./routes";

const queryClient = new QueryClient();

function Entry() {
  const theme = useMantineTheme();
  const isLoggedIn = false;
  const page = useRoutes(getRoutes(isLoggedIn));
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[0]
      }}
    >
      <main>{page}</main>
    </Box>
  );
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
        <Entry />
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
