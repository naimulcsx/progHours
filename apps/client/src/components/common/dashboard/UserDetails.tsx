import { Box, Stack, Text } from "@mantine/core";
import { useUser } from "~/hooks/useUser";

export function UserDetails() {
  const { user } = useUser();
  return (
    <Stack
      sx={{
        flexGrow: 1
      }}
    >
      <Box>
        <Text
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            maxWidth: 130,
            fontWeight: 600
          }}
          size="sm"
        >
          Naimul Haque
        </Text>
        <Text
          size="sm"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            maxWidth: 130
          }}
        >
          {user?.email}
        </Text>
      </Box>
    </Stack>
  );
}
