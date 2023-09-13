import { Verdict } from "@prisma/client";
import { IconCheck, IconSelector } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { CellContext } from "@tanstack/react-table";
import { useState } from "react";

import {
  MantineTheme,
  Select,
  useMantineColorScheme,
  useMantineTheme
} from "@mantine/core";
import { notifications } from "@mantine/notifications";

import {
  SubmissionRow,
  getSubmissions,
  useUpdateSubmissionMutation
} from "@proghours/data-access";

const getStyles = (theme: MantineTheme) => ({
  AC: {
    background: theme.colors.green[9],
    color: theme.colors.green[0]
  },
  WA: {
    background: theme.colors.red[9],
    color: theme.colors.red[0]
  },
  TLE: {
    background: theme.colors.yellow[9],
    color: theme.colors.yellow[0]
  }
});

const getLightStyles = (theme: MantineTheme) => ({
  AC: {
    background: theme.colors.green[1],
    color: theme.colors.green[9]
  },
  WA: {
    background: theme.colors.red[1],
    color: theme.colors.red[9]
  },
  TLE: {
    background: theme.colors.orange[1],
    color: theme.colors.orange[9]
  }
});

export const VerdictCell = (cell: CellContext<SubmissionRow, unknown>) => {
  const { id, verdict } = cell.row.original;

  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const client = useQueryClient();
  const [selected, setSelected] = useState<Verdict>(verdict);
  const { mutate } = useUpdateSubmissionMutation({
    config: {
      onSuccess: () => {
        notifications.show({
          icon: <IconCheck />,
          color: "green",
          title: "Success",
          message: "Verdict updated"
        });
      }
    }
  });

  const handleSelect = async (value: Verdict | null) => {
    // optimisticly update ui without cache invalidation
    const submissions = await client.ensureQueryData({
      queryKey: ["submissions"],
      queryFn: getSubmissions
    });
    const newSubmissions = submissions?.map((submission) => {
      if (id === submission.id) {
        return {
          ...submission,
          verdict: value
        };
      }
      return submission;
    });
    client.setQueryData(["submissions"], newSubmissions);
    // update submission in server
    if (value !== null) {
      if (value !== verdict) {
        mutate({ id: id, verdict: value });
      }
      setSelected(value);
    }
  };

  return (
    <Select
      style={{ maxWidth: 70 }}
      size="xs"
      styles={{
        input: {
          ...(colorScheme === "dark"
            ? getStyles(theme)[selected]
            : getLightStyles(theme)[selected]),
          fontWeight: 600,
          border: 0
        }
      }}
      value={selected}
      onChange={handleSelect}
      rightSection={
        <IconSelector
          size={16}
          color={
            colorScheme === "dark"
              ? getStyles(theme)[selected].color
              : getLightStyles(theme)[selected].color
          }
        />
      }
      rightSectionProps={{
        style: {
          pointerEvents: "none"
        }
      }}
      data={[
        { value: "AC", label: "AC" },
        { value: "WA", label: "WA" },
        { value: "TLE", label: "TLE" }
      ]}
    />
  );
};
