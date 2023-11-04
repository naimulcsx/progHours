import { HandleType } from "@prisma/client";
import { IconEdit, IconExternalLink } from "@tabler/icons-react";
import { ReactNode } from "react";
import { Link, useParams } from "react-router-dom";

import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Grid,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title
} from "@mantine/core";
import { modals } from "@mantine/modals";

import { useUserHandles, useUserProfile } from "@proghours/data-access";

import { CCIcon, CFIcon } from "~/assets/oj-icons";
import { useUser } from "~/modules/auth/hooks/useUser";
import { HandlesSettings } from "~/modules/dashboard/settings/HandleSettings";

import { AboutSkillsSettings } from "./AboutSkillsSettings";

export function ProfileTab() {
  const { user } = useUser();
  const { username } = useParams();

  // get user profile
  const { data } = useUserProfile({
    username: username!,
    config: { enabled: !!username }
  });

  // user handles
  const { data: userHandles } = useUserHandles({
    username: username!,
    config: { enabled: !!username }
  });

  const ownProfile = user && data && user.username === data.userName;

  const openModal = () =>
    modals.open({
      size: "lg",
      title: "Update profile",
      children: <AboutSkillsSettings />
    });

  const openHandleSettingsModal = () =>
    modals.open({
      size: "lg",
      title: "Update handles",
      children: <HandlesSettings />
    });

  const updateProfileButton = (
    <ActionIcon ml="xs" size="sm" onClick={openModal}>
      <IconEdit size={12} />
    </ActionIcon>
  );

  const updateHandlesButton = (
    <ActionIcon ml="xs" size="sm" onClick={openHandleSettingsModal}>
      <IconEdit size={12} />
    </ActionIcon>
  );

  return (
    <Box>
      {data && userHandles && (
        <Grid mt="lg" gutter="xl" style={{ overflow: "initial" }}>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Stack gap="md">
              <Title order={4}>
                About
                {ownProfile && updateProfileButton}
              </Title>
              <Stack gap="xs">
                {data.metaData.about ? (
                  data.metaData.about.split("\n").map((part, i) => (
                    <Text variant="proghours-ui-secondary" key={i}>
                      {part}
                    </Text>
                  ))
                ) : (
                  <Text>&mdash;</Text>
                )}
              </Stack>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack style={{ position: "sticky", top: 80 }}>
              {/* skills */}
              <Title order={4}>
                Skills {ownProfile && updateProfileButton}
              </Title>
              <Group gap="xs">
                {data.metaData.skills &&
                  data.metaData.skills.map((skill) => (
                    <Badge size="md" key={skill}>
                      {skill}
                    </Badge>
                  ))}
                {(!data.metaData.skills ||
                  data.metaData.skills?.length === 0) && <Text>&mdash;</Text>}
              </Group>

              {/* handles */}
              <Title order={4}>
                Profiles {ownProfile && updateHandlesButton}
              </Title>
              <SimpleGrid cols={2}>
                {userHandles.map(({ type, handle }) => {
                  const handleTypeIcon: Record<HandleType, ReactNode> = {
                    CODEFORCES: <CFIcon height={24} width={24} />,
                    CODECHEF: <CCIcon height={24} width={24} />
                  };

                  const getUrl = (handleType: HandleType, handle: string) => {
                    if (handleType === "CODEFORCES")
                      return `https://codeforces.com/profile/${handle}`;
                    if (handleType === "CODECHEF")
                      return `https://www.codechef.com/users/${handle}`;
                    return "";
                  };

                  return (
                    <Button
                      key={type}
                      component={Link}
                      target="_blank"
                      to={getUrl(type, handle)}
                      variant="proghours-ui-secondary"
                      leftSection={handleTypeIcon[type]}
                      rightSection={<IconExternalLink size={16} />}
                    >
                      {handle}
                    </Button>
                  );
                })}
                {userHandles.length === 0 && <Text>&mdash;</Text>}
              </SimpleGrid>
            </Stack>
          </Grid.Col>
        </Grid>
      )}
    </Box>
  );
}
