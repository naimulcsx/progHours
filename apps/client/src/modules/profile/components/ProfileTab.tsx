import { HandleType } from "@prisma/client";
import {
  IconBrandGithub,
  IconEdit,
  IconExternalLink
} from "@tabler/icons-react";
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

import { CFIcon } from "~/assets/oj-icons";
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
          <Grid.Col span={8}>
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
          <Grid.Col span={4}>
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
                    CODECHEF: <IconBrandGithub height={24} width={24} />,
                    SPOJ: <IconBrandGithub />,
                    ATCODER: <IconBrandGithub />,
                    GITHUB: <IconBrandGithub />
                  };
                  return (
                    <Button
                      key={type}
                      component={Link}
                      target="_blank"
                      to={`https://codeforces.com/profile/${handle}`}
                      variant="msu-secondary"
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
