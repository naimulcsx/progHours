import { IconCheck, IconLock, IconX } from "@tabler/icons-react";
import { useParams } from "react-router-dom";

import {
  Anchor,
  Box,
  Group,
  Paper,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  Title
} from "@mantine/core";
import { modals } from "@mantine/modals";

import { useUserProfile } from "@proghours/data-access";

import {
  Icon100Solved,
  Icon250Solved,
  Icon500Solved,
  Icon750Solved,
  Icon1000Solved
} from "~/assets/icons";

const medals = [
  {
    icon: <Icon100Solved width="64" height="64" />,
    name: "Solve 100 Problems",
    criteria: "Solve 100 problems",
    solvedRequired: 100
  },
  {
    icon: <Icon250Solved width="64" height="64" />,
    name: "Solve 250 Problems",
    criteria: "Solve 250 problems",
    solvedRequired: 250
  },
  {
    icon: <Icon500Solved width="64" height="64" />,
    name: "Solve 500 Problems",
    criteria: "Solve 500 problems",
    solvedRequired: 500
  },
  {
    icon: <Icon750Solved width="64" height="64" />,
    name: "Solve 750 Problems",
    criteria: "Solve 750 problems",
    solvedRequired: 750
  },
  {
    icon: <Icon1000Solved width="64" height="64" />,
    name: "Solve 1000 Problems",
    criteria: "Solve 1000 problems",
    solvedRequired: 1000
  }
];

export function MedalsTab() {
  const { username } = useParams();

  // get user profiles
  const { data } = useUserProfile({
    username: username!,
    config: { enabled: !!username }
  });

  return (
    <Box mt="lg">
      {data && (
        <SimpleGrid cols={6}>
          {medals.map((medal, i) => {
            const unlocked = data.totalSolved >= medal.solvedRequired;
            return (
              <Paper
                key={i}
                p="lg"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Box
                  style={{
                    position: "relative"
                  }}
                >
                  <Box style={{ opacity: unlocked ? 1 : 0.2 }}>
                    {medal.icon}
                  </Box>
                  {!unlocked && (
                    <Box
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)"
                      }}
                    >
                      <IconLock />
                    </Box>
                  )}
                </Box>
                <Anchor
                  size="sm"
                  fw={500}
                  style={{ color: "hsl(var(--foreground))" }}
                  onClick={() => {
                    modals.open({
                      size: "md",
                      title: "Medal Details",
                      children: (
                        <Stack>
                          <Box>{medal.icon}</Box>
                          <Box>
                            <Title order={4} mb="xs">
                              Criteria
                            </Title>
                            <Group gap="xs">
                              {!unlocked ? (
                                <IconX size={16} />
                              ) : (
                                <IconCheck size={16} />
                              )}
                              <Text>{medal.criteria}</Text>
                            </Group>
                          </Box>
                          <Box>
                            <Title order={4} mb="xs">
                              Progress
                            </Title>
                            <Text size="xs" fw={700} mb="xs">
                              {Math.min(data.totalSolved, medal.solvedRequired)}{" "}
                              / {medal.solvedRequired} solved
                            </Text>
                            <Progress
                              size="lg"
                              striped
                              animated={!unlocked}
                              color="green"
                              value={
                                (data.totalSolved / medal.solvedRequired) * 100
                              }
                            />
                          </Box>
                        </Stack>
                      )
                    });
                  }}
                >
                  View Details
                </Anchor>
              </Paper>
            );
          })}
        </SimpleGrid>
      )}
    </Box>
  );
}
