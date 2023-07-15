import { useState } from "react";
import { MantineTheme, Select, useMantineTheme } from "@mantine/core";
import { IconCheck, IconSelector } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import {
  SubmissionRow,
  getSubmissions,
  useUpdateSubmissionMutation
} from "@proghours/data-access";
import { Verdict } from "@prisma/client";
import { notifications } from "@mantine/notifications";

const getStyles = (theme: MantineTheme) => ({
  AC: {
    background: theme.colors.green[8],
    color: theme.colors.green[0]
  },
  WA: {
    background: theme.colors.red[8],
    color: theme.colors.red[0]
  },
  TLE: {
    background: theme.colors.yellow[8],
    color: theme.colors.yellow[0]
  }
});

const getLightStyles = (theme: MantineTheme) => ({
  AC: {
    background: theme.colors.green[5],
    color: theme.colors.green[0]
  },
  WA: {
    background: theme.colors.red[5],
    color: theme.colors.red[0]
  },
  TLE: {
    background: theme.colors.yellow[5],
    color: theme.colors.yellow[0]
  }
});

export const VerdictCell = (row: SubmissionRow) => {
  const theme = useMantineTheme();
  const client = useQueryClient();
  const [selected, setSelected] = useState<Verdict>(row.verdict);
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
      if (row.id === submission.id) {
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
      if (value !== row.verdict) {
        mutate({ id: row.id, verdict: value });
      }
      setSelected(value);
    }
  };

  return (
    <Select
      sx={{ maxWidth: 70 }}
      size="xs"
      styles={{
        input: {
          ...(theme.colorScheme === "dark"
            ? getStyles(theme)[selected]
            : getLightStyles(theme)[selected]),
          fontWeight: 600,
          border: 0,
          "&:focus": {
            border: 0
          }
        }
      }}
      value={selected}
      onChange={handleSelect}
      rightSection={<IconSelector size={16} color="white" />}
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