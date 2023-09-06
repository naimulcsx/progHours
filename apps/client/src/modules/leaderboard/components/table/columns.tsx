import {
  IconChevronDown,
  IconChevronUp,
  IconSelector
} from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";

import { ActionIcon, Avatar, Box, Group, Text } from "@mantine/core";

import { NumberFilter } from "~/modules/common/components/NumberFilter";

import { LeaderboardEntry } from "@proghours/data-access";

export const columns: ColumnDef<LeaderboardEntry>[] = [
  {
    accessorKey: "id",
    header: "Rank",
    size: 80
  },
  {
    accessorKey: "fullName",
    accessorFn: (row) => row.fullName + " " + row.username,
    header: "Name",
    size: 280,
    cell: ({ row }) => {
      const { fullName, username } = row.original;
      const avatarName = fullName
        .split(" ")
        .splice(0, 2)
        .map((el) => el[0])
        .join("");
      const { bg, color } = getAvatarColors(fullName);
      return (
        <Group gap="xs">
          <Avatar
            styles={{
              placeholder: { backgroundColor: bg, color }
            }}
            radius="xl"
          >
            {avatarName}
          </Avatar>
          <Box>
            <Text
              maw={210}
              lineClamp={1}
              variant="proghours-ui-strong"
              size="sm"
            >
              {fullName}
            </Text>
            <Text style={{ fontWeight: 400 }} size="sm">
              {username.toUpperCase()}
            </Text>
          </Box>
        </Group>
      );
    }
  },
  {
    accessorKey: "totalSolved",
    accessorFn: (row) => row.totalSolved,
    header: ({ column, table }) => {
      return (
        <Group>
          <Text size="sm" variant="proghours-ui-strong" fw={700}>
            Total Solved
          </Text>
          <Group gap={4}>
            <ActionIcon
              size="xs"
              onClick={() => {
                column.toggleSorting(column.getIsSorted() === "asc");
              }}
            >
              {column.getIsSorted() === false && <IconSelector size={16} />}
              {column.getIsSorted() === "asc" && <IconChevronUp size={16} />}
              {column.getIsSorted() === "desc" && <IconChevronDown size={16} />}
            </ActionIcon>
            <NumberFilter table={table} columnId="totalSolved" />
          </Group>
        </Group>
      );
    },
    size: 170,
    cell: (cell) => (
      <Text variant="proghours-ui-secondary" size="sm">
        {cell.row.original.totalSolved}
      </Text>
    ),
    enableSorting: true
  },
  {
    accessorKey: "totalSolveTime",
    header: ({ column, table }) => {
      return (
        <Group>
          <Text size="sm" variant="proghours-ui-strong" fw={700}>
            Solve Time
          </Text>
          <Group gap={4}>
            <ActionIcon
              size="xs"
              onClick={() => {
                column.toggleSorting(column.getIsSorted() === "asc");
              }}
            >
              {column.getIsSorted() === false && <IconSelector size={16} />}
              {column.getIsSorted() === "asc" && <IconChevronUp size={16} />}
              {column.getIsSorted() === "desc" && <IconChevronDown size={16} />}
            </ActionIcon>
            <NumberFilter table={table} columnId="totalSolveTime" />
          </Group>
        </Group>
      );
    },
    size: 170,
    cell: (cell) => (
      <Text variant="proghours-ui-secondary" size="sm">
        {Math.floor(cell.row.original.totalSolveTime / 60)}h{" "}
        {cell.row.original.totalSolveTime % 60}m
      </Text>
    )
  },
  {
    accessorKey: "averageDifficulty",
    size: 240,
    cell: (cell) => (
      <Text variant="proghours-ui-secondary" size="sm">
        {cell.row.original.averageDifficulty.toFixed(2)}
      </Text>
    ),
    header: ({ column, table }) => {
      return (
        <Group>
          <Text size="sm" variant="proghours-ui-strong" fw={700}>
            Avg. Difficulty
          </Text>
          <Group gap={4}>
            <ActionIcon
              size="xs"
              onClick={() => {
                column.toggleSorting(column.getIsSorted() === "asc");
              }}
            >
              {column.getIsSorted() === false && <IconSelector size={16} />}
              {column.getIsSorted() === "asc" && <IconChevronUp size={16} />}
              {column.getIsSorted() === "desc" && <IconChevronDown size={16} />}
            </ActionIcon>
            <NumberFilter table={table} columnId="averageDifficulty" />
          </Group>
        </Group>
      );
    }
  },
  {
    accessorKey: "points",
    header: ({ column, table }) => {
      return (
        <Group>
          <Text size="sm" variant="proghours-ui-strong" fw={700}>
            Points
          </Text>
          <Group gap={4}>
            <ActionIcon
              size="xs"
              onClick={() => {
                column.toggleSorting(column.getIsSorted() === "asc");
              }}
            >
              {column.getIsSorted() === false && <IconSelector size={16} />}
              {column.getIsSorted() === "asc" && <IconChevronUp size={16} />}
              {column.getIsSorted() === "desc" && <IconChevronDown size={16} />}
            </ActionIcon>
            <NumberFilter table={table} columnId="points" />
          </Group>
        </Group>
      );
    },
    cell: (cell) => (
      <Text variant="proghours-ui-secondary" size="sm">
        {cell.row.original.points.toFixed(2)}
      </Text>
    )
  }
];

function stringToColour(str: string, saturation = 50, lightness = 55) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  return `hsl(${hash % 360}, ${saturation}%, ${lightness}%)`;
}

export function getAvatarColors(name: string) {
  const bgColorHex = stringToColour(name);
  return {
    bg: bgColorHex,
    color: "#fff"
  };
}
