import { Button, MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Routes, Link } from 'react-router-dom';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <div>
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  progHours{' '}
                  <Button variant="subtle" component={Link} to="/page-2">
                    Click here for page 2.
                  </Button>
                </div>
              }
            />
            <Route
              path="/page-2"
              element={
                <div>
                  <Button variant="subtle" component={Link} to="/">
                    Click here to go back to root page.
                  </Button>
                </div>
              }
            />
          </Routes>
        </div>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
