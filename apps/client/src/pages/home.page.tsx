import { Box } from "@mantine/core";
import { useActiveUser } from "@proghours/data-access";

export default function HomePage() {
  const { data } = useActiveUser();
  return <Box>{JSON.stringify(data, null, 2)}</Box>;
}
