import {
  Box,
  MantineProvider,
  localStorageColorSchemeManager
} from "@mantine/core";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { resolver, theme } from "./theme";
import { getRoutes } from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "@mantine/core/styles.css";
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
  return (
    <BrowserRouter>
      <MantineProvider
        theme={theme}
        defaultColorScheme="light"
        colorSchemeManager={colorSchemeManager}
        cssVariablesResolver={resolver}
      >
        <QueryClientProvider client={queryClient}>
          <Entry />
        </QueryClientProvider>
      </MantineProvider>
    </BrowserRouter>
  );
}

function Entry() {
  const children = useRoutes(getRoutes(false));
  return <Box>{children}</Box>;
}

export default App;
