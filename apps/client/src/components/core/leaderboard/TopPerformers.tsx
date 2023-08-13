import { Box, SimpleGrid, Text, Title, useMantineTheme } from "@mantine/core";
import { shadow3d } from "~/styles/theme";
import { LeaderboardEntry } from "@proghours/data-access";
import { IconSecondPlace } from "~/assets/icons/IconSecondPlace";
import { IconFirstPlace } from "~/assets/icons/IconFirstPlace";
import { IconThirdPlace } from "~/assets/icons/IconThirdPlace";

export function TopPerformers({ topUsers }: { topUsers: LeaderboardEntry[] }) {
  const theme = useMantineTheme();

  const gradientStart =
    theme.colorScheme === "dark"
      ? theme.colors.dark[6]
      : theme.colors[theme.primaryColor][6];

  const gradientEnd =
    theme.colorScheme === "dark"
      ? theme.colors.dark[8]
      : theme.colors[theme.primaryColor][8];

  return (
    <Box
      mb="xl"
      p="lg"
      style={{
        borderRadius: theme.radius.lg,
        background: `linear-gradient(to bottom, ${gradientStart}, ${gradientEnd})`,
        boxShadow: shadow3d,
        position: "relative",
        overflow: "hidden"
      }}
    >
      <BgPattern />
      <Box sx={{ position: "relative" }}>
        <Box mb="xl">
          <Title mb={2} order={2} sx={{ color: "white" }}>
            Top Performers
          </Title>
          <Text sx={{ color: "white" }}>
            The stage is set, and the world is watching. It's time to shine!
          </Text>
        </Box>
      </Box>
      <SimpleGrid
        cols={3}
        sx={{ position: "relative", alignItems: "flex-end" }}
      >
        {topUsers?.map((user, idx) => {
          const _order = [1, 0, 2];
          const _rank = ["1st", "2nd", "3rd"];
          return (
            <Box
              p="xl"
              sx={{
                position: "relative",
                background: theme.fn.rgba(
                  "#fff",
                  theme.colorScheme === "dark" ? 0.035 : 0.1
                ),
                order: _order[idx],
                borderRadius: theme.radius.lg,
                backdropFilter: "blur(4px)"
              }}
              key={user.userId}
            >
              <Box>
                {idx === 0 && <IconFirstPlace />}
                {idx === 1 && <IconSecondPlace />}
                {idx === 2 && <IconThirdPlace />}
                <Box>
                  <Title order={4} sx={{ color: "white" }} lineClamp={1}>
                    {user.fullName}
                  </Title>
                  <Text
                    lineClamp={1}
                    sx={{
                      fontWeight: 500,
                      color: theme.white
                    }}
                  >
                    {user.points.toFixed(2)}
                  </Text>
                  <Text
                    sx={{
                      position: "absolute",
                      top: 16,
                      right: 24,
                      color: "white"
                    }}
                    size="xl"
                    fw={700}
                  >
                    {_rank[idx]}
                  </Text>
                  <Text size="sm" sx={{ color: "white" }}>
                    @{user.username.toUpperCase()}
                  </Text>
                </Box>
              </Box>
            </Box>
          );
        })}
      </SimpleGrid>
    </Box>
  );
}

function BgPattern() {
  const theme = useMantineTheme();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      fill="none"
      viewBox="0 0 360 200"
      style={{ position: "absolute", inset: 0 }}
    >
      <g clipPath="url(#clip0_2_2343)">
        <mask
          id="mask0_2_2343"
          style={{ maskType: "alpha" }}
          width="480"
          height="480"
          x="-60"
          y="-135"
          maskUnits="userSpaceOnUse"
        >
          <circle
            cx="180"
            cy="105"
            r="120"
            stroke="#000"
            strokeDasharray="7.2 7.2"
            strokeWidth="240"
          ></circle>
        </mask>
        <g mask="url(#mask0_2_2343)">
          <path
            fill={
              theme.colorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors[theme.primaryColor][7]
            }
            d="M0 -15H360V225H0z"
          ></path>
        </g>
      </g>
      <defs>
        <clipPath id="clip0_2_2343">
          <path fill="#fff" d="M0 0H360V200H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
}
