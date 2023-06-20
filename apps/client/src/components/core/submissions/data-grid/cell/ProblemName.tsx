import { CellContext } from "@tanstack/react-table";
import { Submission } from "../columns";
import { Anchor, Box, Group, Text, Title } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";

export const ProblemName = ({ cell }: CellContext<Submission, unknown>) => {
  const {
    problem: { url, pid, name }
  } = cell.row.original;
  return (
    <Group spacing="md">
      <Box
        sx={(theme) => ({
          width: 32,
          height: 32,
          border: "1px solid",
          padding: 2,
          borderRadius: "50%",
          borderColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[4]
              : theme.colors.gray[3]
        })}
      ></Box>
      <Box>
        <Group spacing="xs" align="center">
          <Title order={5} sx={{ fontWeight: 600 }}>
            {pid}
          </Title>
          <Anchor href={url} target="_blank">
            <IconExternalLink size={16} />
          </Anchor>
        </Group>
        <Text
          sx={{
            maxWidth: 200,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
        >
          {name}
        </Text>
      </Box>
    </Group>
  );
};
