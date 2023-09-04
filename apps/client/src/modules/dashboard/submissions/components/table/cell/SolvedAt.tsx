import { useState } from "react";
import { DatePickerInput } from "@mantine/dates";
import {
  SubmissionRow,
  useUpdateSubmissionMutation
} from "@proghours/data-access";
import { useQueryClient } from "@tanstack/react-query";
import { IconCheck } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import moment from "moment";
import { CellContext } from "@tanstack/react-table";

export function SolvedAtCell(cell: CellContext<SubmissionRow, unknown>) {
  const queryClient = useQueryClient();
  const [solvedAt, setSolvedAt] = useState(
    new Date(cell.row.original.solvedAt)
  );
  const { mutate } = useUpdateSubmissionMutation({
    config: {
      onSuccess: () => {
        queryClient.invalidateQueries(["submissions"]);
        notifications.show({
          icon: <IconCheck />,
          color: "green",
          title: "Success",
          message: "Updated submission!"
        });
      }
    }
  });
  return (
    <DatePickerInput
      size="xs"
      style={{ minWidth: 100 }}
      value={solvedAt}
      valueFormat="DD-MM-YYYY"
      onChange={(date) => {
        const value = date || new Date();
        setSolvedAt(value);
        mutate({
          id: cell.row.original.id,
          solvedAt: moment
            .utc({
              year: value?.getFullYear(),
              date: value.getDate(),
              month: value.getMonth()
            })
            .toDate()
        });
      }}
    />
  );
}
