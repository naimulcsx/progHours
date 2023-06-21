import { useState } from "react";
import { MantineTheme, Select, useMantineTheme } from "@mantine/core";
import { CellContext } from "@tanstack/react-table";
import { IconCheck, IconSelector } from "@tabler/icons-react";
import { Submission } from "../columns";
import { useQueryClient } from "@tanstack/react-query";
import {
  getSubmissions,
  useUpdateSubmissionMutation
} from "@proghours/data-access";
import { Verdict } from "@prisma/client";
import { notifications } from "@mantine/notifications";

const getStyles = (theme: MantineTheme) => ({
  AC: {
    borderColor: theme.colors.green[6],
    background: theme.colors.green[8],
    color: theme.colors.green[0]
  },
  WA: {
    borderColor: theme.colors.red[6],
    background: theme.colors.red[8],
    color: theme.colors.red[0]
  },
  TLE: {
    borderColor: theme.colors.yellow[6],
    background: theme.colors.yellow[8],
    color: theme.colors.yellow[0]
  }
});

const getLightStyles = (theme: MantineTheme) => ({
  AC: {
    borderColor: theme.colors.green[6],
    background: theme.colors.green[5],
    color: theme.colors.green[0]
  },
  WA: {
    borderColor: theme.colors.red[6],
    background: theme.colors.red[5],
    color: theme.colors.red[0]
  },
  TLE: {
    borderColor: theme.colors.yellow[6],
    background: theme.colors.yellow[5],
    color: theme.colors.yellow[0]
  }
});

const VerdictCell = (cell: CellContext<Submission, unknown>) => {
  const theme = useMantineTheme();
  const client = useQueryClient();
  const [selected, setSelected] = useState<Verdict>(cell.getValue() as Verdict);
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
      if (cell.row.original.id === submission.id) {
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
      if (value !== cell.row.original.verdict) {
        mutate({ id: cell.row.original.id, verdict: value });
      }
      setSelected(value);
    }
  };

  return (
    <Select
      size="xs"
      styles={{
        input: {
          ...(theme.colorScheme === "dark"
            ? getStyles(theme)[selected]
            : getLightStyles(theme)[selected]),
          fontWeight: 600
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

export default VerdictCell;
