import { IconAt } from "@tabler/icons-react";
import { useParams } from "react-router-dom";

import { Box, Container, Flex, Text, Title } from "@mantine/core";

import { UserProfileResponse, useUserProfile } from "@proghours/data-access";

import {
  Icon100Solved,
  Icon250Solved,
  Icon500Solved,
  Icon750Solved,
  Icon1000Solved,
  IconFlag,
  IconPoints,
  IconRank
} from "~/assets/icons";
import { Avatar } from "~/modules/common/components/Avatar";

export function ProfileHeader() {
  const { username } = useParams();

  // get user profiles
  const { data } = useUserProfile({
    username: username!,
    config: { enabled: !!username }
  });

  return (
    <Container size="xl">
      {data && (
        <Box>
          <Flex justify="space-between">
            <Box>
              <Flex gap="lg" py="md">
                <Avatar fullName={data.fullName} size="xl" />
                <Box>
                  <Flex align="center" gap="xs">
                    <Title order={2} mb={4}>
                      {data.fullName}
                    </Title>
                  </Flex>

                  <Flex align="center" gap={4}>
                    <IconAt size={18} stroke={1.5} />
                    <Text>{data.userName.toUpperCase()}</Text>
                  </Flex>

                  <Flex gap="xs" mt="sm">
                    {data.totalSolved >= 100 && (
                      <Icon100Solved height={40} width={40} />
                    )}
                    {data.totalSolved >= 250 && (
                      <Icon250Solved height={40} width={40} />
                    )}
                    {data.totalSolved >= 500 && (
                      <Icon500Solved height={40} width={40} />
                    )}
                    {data.totalSolved >= 750 && (
                      <Icon750Solved height={40} width={40} />
                    )}
                    {data.totalSolved >= 1000 && (
                      <Icon1000Solved height={40} width={40} />
                    )}
                  </Flex>
                </Box>
              </Flex>
            </Box>
            <HeaderStats data={data} />
          </Flex>
        </Box>
      )}
    </Container>
  );
}

const stats = [
  {
    icon: <IconRank height={48} />,
    label: "Rank",
    key: "rank"
  },
  {
    icon: <IconFlag height={48} />,
    label: "Total Solved",
    key: "totalSolved"
  },
  {
    icon: <IconPoints height={48} />,
    label: "Points",
    key: "points"
  }
] as const;

function HeaderStats({ data }: { data: UserProfileResponse }) {
  return (
    <Flex>
      {stats.map((stat) => {
        return (
          <Box
            key={stat.label}
            p="lg"
            style={{
              textAlign: "center"
            }}
          >
            {stat.icon}
            <Text my={4} size="xs">
              {stat.label}
            </Text>
            <Title order={5} fw={500}>
              {data[stat.key]}
            </Title>
          </Box>
        );
      })}
    </Flex>
  );
}
