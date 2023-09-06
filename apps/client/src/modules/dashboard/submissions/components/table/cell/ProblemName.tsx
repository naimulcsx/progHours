import { CellContext } from "@tanstack/react-table";
import { ReactNode } from "react";

import { Box, Group, Text, Title } from "@mantine/core";

import {
  ACIcon,
  BCIcon,
  CCIcon,
  CFIcon,
  CSESIcon,
  CTWIcon,
  EOlympIcon,
  HEIcon,
  HRIcon,
  KattisIcon,
  LCIcon,
  LOJIcon,
  SPOJIcon,
  TimusIcon,
  TophIcon,
  UVAIcon
} from "~/assets/oj-icons";

import { SubmissionRow } from "@proghours/data-access";

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

export const ProblemName = (cell: CellContext<SubmissionRow, unknown>) => {
  const {
    problem: { pid, name }
  } = cell.row.original;
  return (
    <Group gap="md" style={{ width: "100%" }}>
      <Box
        style={(theme) => ({
          width: 32,
          height: 32,
          border: "1px solid",
          padding: 2,
          borderRadius: "50%",
          borderColor: "hsl(var(--border))"
        })}
      >
        {(iconMap.filter((item, i) => pid.includes(item.prefix)).at(0)
          ?.icon as ReactNode) ?? undefined}
      </Box>
      <Box>
        <Group gap="xs" align="center">
          <Title order={6} style={{ fontWeight: 500 }}>
            {pid}
          </Title>
        </Group>
        <Text
          size="sm"
          style={{
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
