import {
  CFIcon,
  SPOJIcon,
  CCIcon,
  LightOJIcon,
  UVAIcon,
  CSESIcon,
  TophIcon,
  AtCoder,
  EOlympIcon,
  BeeCrowd,
  HackerRankIcon,
  LeetCodeIcon,
  TimusIcon,
  CodeToWinIcon,
  HackerEarthIcon,
  KattisOJIcon,
} from "~/components/Icons"
import { CellContext } from "@tanstack/react-table"
import { Cell } from "react-table"
import { Submission } from "~/types/Submission"
import { ExternalLinkIcon } from "@heroicons/react/outline"
import { QuestionMarkCircleIcon } from "@heroicons/react/outline"
import { Anchor, Box, Group, Text, Title } from "@mantine/core"
import { IconExternalLink } from "@tabler/icons"

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
  { prefix: "AC-", icon: AtCoder },
  { prefix: "Eolymp-", icon: EOlympIcon },
  { prefix: "BC-", icon: BeeCrowd },
  { prefix: "HR-", icon: HackerRankIcon, spacing: 1 },
  { prefix: "LC-", icon: LeetCodeIcon },
  { prefix: "Tim-", icon: TimusIcon },
  { prefix: "CW-", icon: CodeToWinIcon, spacing: 1 },
  { prefix: "HE-", icon: HackerEarthIcon },
  { prefix: "KT-", icon: KattisOJIcon },
]

const ProblemName = (cell: CellContext<Submission, unknown>) => {
  const { pid, name, link } = cell.cell.row.original.problem
  /** Select Icon based on the online judge */
  let OnlineJudgeIcon: any = iconMap.filter((item, i) => (pid.includes(item.prefix) ? true : false)).at(0)
  /** If there is no match, use the Unknown icon */
  if (!OnlineJudgeIcon) OnlineJudgeIcon.icon = QuestionMarkCircleIcon
  return (
    <Group spacing="md">
      <Box
        sx={(theme) => ({
          width: 32,
          height: 32,
          border: "1px solid",
          padding: 2,
          borderRadius: "50%",
          borderColor: theme.colors.dark[4],
        })}
      >
        <OnlineJudgeIcon.icon />
      </Box>
      <Box>
        <Group spacing="xs" align="center">
          <Title order={5} sx={(theme) => ({ color: theme.colors.dark[0] })}>
            {pid}
          </Title>
          <Anchor sx={(theme) => ({ color: theme.colors.dark[0] })} href={link} target="_blank">
            <IconExternalLink size={16} />
          </Anchor>
        </Group>
        <Text
          sx={(theme) => ({
            color: theme.colors.dark[2],
            maxWidth: 200,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          })}
        >
          {name}
        </Text>
      </Box>
    </Group>
  )
}

export default ProblemName
