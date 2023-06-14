import { Box, Button } from "@mantine/core";
import { useActiveUser } from "@proghours/data-access";
import { useLogout } from "~/hooks/useLogout";

export default function HomePage() {
  const { data } = useActiveUser();
  const { handleLogout } = useLogout();
  return (
    <Box>
      <Button onClick={handleLogout}>Log out</Button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Box>
  );
}
