import { ReactNode } from "react";
import { CellContext } from "@tanstack/react-table";
import { SubmissionRow } from "@proghours/data-access";
import { Box, Group, Text, Title } from "@mantine/core";
import {
  CFIcon,
  CCIcon,
  SPOJIcon,
  ACIcon,
  LOJIcon,
  UVAIcon,
  CSESIcon,
  TophIcon,
  EOlympIcon,
  BCIcon,
  HRIcon,
  LCIcon,
  TimusIcon,
  CTWIcon,
  HEIcon,
  KattisIcon
} from "~/assets/online-judges";

const iconMap = [
  { prefix: "Gym-", icon: <CFIcon /> },
  { prefix: "CF-", icon: <CFIcon /> },
  { prefix: "SPOJ-", icon: <SPOJIcon /> },
  { prefix: "CC-", icon: <CCIcon /> },
  { prefix: "LOJ-", icon: <LOJIcon /> },
  { prefix: "UVA-", icon: <UVAIcon />, spacing: 1 },
  { prefix: "ICPCLive-", icon: UVAIcon },
  { prefix: "CSES-", icon: <CSESIcon />, spacing: 1 },
  { prefix: "Toph-", icon: <TophIcon /> },
  { prefix: "AC-", icon: <ACIcon /> },
  { prefix: "Eolymp-", icon: <EOlympIcon /> },
  { prefix: "BC-", icon: <BCIcon /> },
  { prefix: "HR-", icon: <HRIcon />, spacing: 1 },
  { prefix: "LC-", icon: <LCIcon /> },
  { prefix: "Tim-", icon: <TimusIcon /> },
  { prefix: "CW-", icon: <CTWIcon />, spacing: 1 },
  { prefix: "HE-", icon: <HEIcon /> },
  { prefix: "KT-", icon: <KattisIcon /> }
];

export const ProblemName = ({ cell }: CellContext<SubmissionRow, unknown>) => {
  const {
    problem: { pid, name }
  } = cell.row.original;
  return (
    <Group spacing="md" sx={{ width: "100%" }}>
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
      >
        {(iconMap.filter((item, i) => pid.includes(item.prefix)).at(0)
          ?.icon as ReactNode) ?? undefined}
      </Box>
      <Box>
        <Group spacing="xs" align="center">
          <Title order={6} sx={{ fontWeight: 600 }}>
            {pid}
          </Title>
          {/* <Anchor href={url} target="_blank">
            <IconExternalLink size={16} />
          </Anchor> */}
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
