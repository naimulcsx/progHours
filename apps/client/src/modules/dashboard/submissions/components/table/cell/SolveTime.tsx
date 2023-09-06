import { IconCheck } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { CellContext } from "@tanstack/react-table";
import { KeyboardEvent, useRef, useState } from "react";

import { TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";

import {
  SubmissionRow,
  getSubmissions,
  useUpdateSubmissionMutation
} from "@proghours/data-access";

export function SolveTimeCell(cell: CellContext<SubmissionRow, unknown>) {
  const { id } = cell.row.original;
  const client = useQueryClient();
  const prevRef = useRef(cell.row.original.toString());
  const [solveTime, setSolveTime] = useState(
    cell.row.original.solveTime.toString() as string
  );

  const { mutate } = useUpdateSubmissionMutation({
    config: {
      onSuccess: () => {
        notifications.show({
          icon: <IconCheck />,
          color: "green",
          title: "Success",
          message: "Solve time updated"
        });
      }
    }
  });

  // optimisticly update ui without cache invalidation
  const updateState = async () => {
    const submissions = await client.ensureQueryData({
      queryKey: ["submissions"],
      queryFn: getSubmissions
    });
    const newSubmissions = submissions?.map((submission) => {
      if (submission.id === id) {
        return { ...submission, solveTime: parseInt(solveTime) };
      }
      return submission;
    });
    client.setQueryData(["submissions"], newSubmissions);
  };

  const handleBlur = async (value: string) => {
    if (prevRef.current !== solveTime) {
      await updateState();
      mutate({ id: id, solveTime: parseInt(value) });
      prevRef.current = value;
    }
  };
  const handleEnter = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && prevRef.current !== solveTime) {
      await updateState();
      mutate({ id: id, solveTime: parseInt(solveTime) });
      prevRef.current = solveTime;
    }
  };
  return (
    <TextInput
      style={{ maxWidth: 80 }}
      size="xs"
      type="number"
      value={solveTime}
      onChange={(e) => setSolveTime(e.target.value)}
      onBlur={(e) => handleBlur(e.target.value)}
      onKeyUp={(e) => handleEnter(e)}
    />
  );
}
