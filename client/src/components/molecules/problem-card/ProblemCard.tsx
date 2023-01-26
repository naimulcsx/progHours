import {
  CFIcon,
  SPOJIcon,
  CCIcon,
  UVAIcon,
  CSESIcon,
  TophIcon,
  TimusIcon,
  EOlympIcon,
  LeetCodeIcon,
  LightOJIcon,
  AtCoderIcon,
  BeeCrowdIcon,
  HackerRankIcon,
  CodeToWinIcon,
  HackerEarthIcon,
  KattisOJIcon,
} from "~/components/atoms/icons"
import { Anchor, Box, Group, Text, Title } from "@mantine/core"
import { IconCheck, IconExternalLink, IconQuestionMark } from "@tabler/icons"

const iconMap = [
  { prefix: "Gym-", icon: CFIcon },
  { prefix: "CF-", icon: CFIcon },
  { prefix: "SPOJ-", icon: SPOJIcon },
  { prefix: "CC-", icon: CCIcon },
  { prefix: "LOJ-", icon: LightOJIcon },
  { prefix: "UVA-", icon: UVAIcon, spacing: 1 },
  { prefix: "ICPCLive-", icon: UVAIcon },
  { prefix: "CSES-", icon: CSESIcon, spacing: 1 },
  { prefix: "Toph-", icon: TophIcon },
  { prefix: "AC-", icon: AtCoderIcon },
  { prefix: "Eolymp-", icon: EOlympIcon },
  { prefix: "BC-", icon: BeeCrowdIcon },
  { prefix: "HR-", icon: HackerRankIcon, spacing: 1 },
  { prefix: "LC-", icon: LeetCodeIcon },
  { prefix: "Tim-", icon: TimusIcon },
  { prefix: "CW-", icon: CodeToWinIcon, spacing: 1 },
  { prefix: "HE-", icon: HackerEarthIcon },
  { prefix: "KT-", icon: KattisOJIcon },
]

interface ProblemCardProps {
  name: string
  link: string
  pid: string
}

export default function ProblemCard({ name, link, pid }: ProblemCardProps) {
  // select icon based on the online judge
  let OnlineJudgeIcon: any = iconMap
    .filter((item) => (pid.includes(item.prefix) ? true : false))
    .at(0)

  // If there is no match, use the Unknown icon
  if (!OnlineJudgeIcon) OnlineJudgeIcon.icon = IconQuestionMark

  return (
    <Group spacing="md">
      <Box
        sx={(theme) => ({
          width: 32,
          height: 32,
          border: "1px solid",
          padding: 2,
          borderRadius: "50%",
          borderColor: theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3],
        })}
      >
        <OnlineJudgeIcon.icon />
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Group position="apart" spacing="xs" align="center" w="full">
          <Anchor
            sx={(theme) => ({
              color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.dark[9],
            })}
            href={link}
            target="_blank"
          >
            <Title
              order={5}
              sx={(theme) => ({
                color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.dark[9],
              })}
            >
              {pid}
            </Title>
          </Anchor>
          <Box>
            <IconCheck color="lime" />
          </Box>
        </Group>
        {/* <Text
          sx={(theme) => ({
            color: theme.colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.dark[3],
            maxWidth: 200,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          })}
        >
          {name}
        </Text> */}
      </Box>
    </Group>
  )
}
