import {
  Box,
  Button,
  Flex,
  Group,
  Menu,
  SimpleGrid,
  Stack,
  Text,
  Title,
  useMantineTheme
} from "@mantine/core";
import { IconDotsVertical, IconPlus } from "@tabler/icons-react";
import { ReactNode } from "react";
import { IconEdit, IconTrash, IconLinkExternal } from "~/assets/icons";
import { CFIcon } from "~/assets/online-judges";

export function HandlesSettings() {
  const theme = useMantineTheme();
  return (
    <Box>
      <SimpleGrid cols={3}>
        <Button
          variant="light"
          h="100%"
          sx={{
            background: theme.colors.dark[6],
            border: 1,
            borderStyle: "solid",
            borderColor: theme.colors.dark[4]
          }}
          leftIcon={<IconPlus size={16} color="white" />}
        >
          <Text>Add handle</Text>
        </Button>
        <OJHandleCard />
      </SimpleGrid>
    </Box>
  );
}

export interface OJHandleCardProps {
  oj: string;
  icon: ReactNode;
  handle: string;
}

function OJHandleCard() {
  const theme = useMantineTheme();
  return (
    <Box sx={{ position: "relative" }}>
      <Group
        sx={{
          background: theme.colors.dark[6],
          borderRadius: theme.radius.md,
          border: 1,
          borderStyle: "solid",
          borderColor: theme.colors.dark[4]
        }}
        p="md"
      >
        <Flex
          p="xs"
          align="center"
          justify="center"
          sx={() => ({
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: theme.colors.dark[4]
          })}
        >
          <CFIcon />
        </Flex>
        <Stack spacing={1}>
          <Title order={5}>Codeforces</Title>
          <Text size="sm">naimul_haque</Text>
        </Stack>
      </Group>
      <Menu>
        <Menu.Target>
          <Button
            color="gray"
            variant="subtle"
            size="xs"
            sx={{ position: "absolute", top: 8, right: 8, padding: 4 }}
          >
            <IconDotsVertical size={16} />
          </Button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            component="a"
            icon={<IconLinkExternal width={16} height={16} />}
            target="_blank"
            // href={getOJProfileURL(onlineJudge.name, handle)}
            sx={{ height: 36 }}
          >
            Visit Profile
          </Menu.Item>
          <Menu.Item
            icon={<IconEdit width={16} height={16} />}
            // onClick={() => setEditOpen(true)}
          >
            Edit Handle
          </Menu.Item>
          <Menu.Item
            icon={<IconTrash width={16} height={16} />}
            // onClick={() => setDeleteOpen(true)}
          >
            Delete Handle
          </Menu.Item>

          {/* Other items ... */}
        </Menu.Dropdown>
      </Menu>
    </Box>
  );
}
