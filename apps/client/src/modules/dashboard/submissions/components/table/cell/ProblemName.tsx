import { IconChecks } from "@tabler/icons-react";
import { CellContext } from "@tanstack/react-table";
import { ReactNode } from "react";

import { Box, Group, Text } from "@mantine/core";

import { SubmissionRow } from "@proghours/data-access";

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
    problem: { pid, name },
    isVerified
  } = cell.row.original;
  return (
    <Group gap="md" style={{ width: "100%" }}>
      <Box
        style={{
          width: 32,
          height: 32,
          border: "1px solid",
          padding: 4,
          borderRadius: "50%",
          borderColor: "hsl(var(--border))"
        }}
      >
        {(iconMap.filter((item, i) => pid.includes(item.prefix)).at(0)
          ?.icon as ReactNode) ?? undefined}
      </Box>
      <Box style={{ flex: 1 }}>
        <Group gap="xs" align="center" justify="space-between" w="100%">
          <Text
            style={{ color: "hsl(var(--foreground))", fontWeight: 600 }}
            lineClamp={1}
          >
            {pid}
          </Text>
          {isVerified && (
            <IconChecks size={18} color="#22c55e" style={{ marginRight: 16 }} />
          )}
        </Group>
        <Text size="sm" lineClamp={1}>
          {name}
        </Text>
      </Box>
    </Group>
  );
};
