import { useQueryClient } from "@tanstack/react-query";
import { useRef, useState, KeyboardEvent } from "react";
import { CellContext } from "@tanstack/react-table";
import { TextInput } from "@mantine/core";
import { Submission } from "../columns";
import {
  getSubmissions,
  useUpdateSubmissionMutation
} from "@proghours/data-access";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";

export default function SolveTimeCell(cell: CellContext<Submission, unknown>) {
  const client = useQueryClient();
  const prevRef = useRef(cell.getValue());
  const [solveTime, setSolveTime] = useState(cell.getValue() as string);
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
      if (submission.id === cell.row.original.id) {
        return { ...submission, solveTime: parseInt(solveTime) };
      }
      return submission;
    });
    client.setQueryData(["submissions"], newSubmissions);
  };

  const handleBlur = async (value: string) => {
    if (prevRef.current !== solveTime) {
      await updateState();
      mutate({ id: cell.row.original.id, solveTime: parseInt(value) });
      prevRef.current = value;
    }
  };
  const handleEnter = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && prevRef.current !== solveTime) {
      await updateState();
      mutate({ id: cell.row.original.id, solveTime: parseInt(solveTime) });
      prevRef.current = solveTime;
    }
  };
  return (
    <TextInput
      size="xs"
      type="number"
      value={solveTime}
      onChange={(e) => setSolveTime(e.target.value)}
      onBlur={(e) => handleBlur(e.target.value)}
      onKeyUp={(e) => handleEnter(e)}
    />
  );
}
