import { ActionIcon, Menu } from "@mantine/core";
import {
  IconCheck,
  IconDots,
  IconReload,
  IconTrash
} from "@tabler/icons-react";
import {
  SubmissionRow,
  useRefetchProblemMutation
} from "@proghours/data-access";
import { CellContext } from "@tanstack/react-table";
import { useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";

export function ActionsCell({
  cell,
  modalState
}: CellContext<SubmissionRow, unknown> & {
  modalState: { opened: boolean; open: () => void; close: () => void };
}) {
  const {
    problem: { id, pid }
  } = cell.row.original;

  const { open } = modalState;
  const client = useQueryClient();

  // refetch problem
  const { mutate } = useRefetchProblemMutation({
    config: {
      onSuccess: (updatedProblem) => {
        notifications.update({
          id: `refetch-problem-${pid}`,
          color: "green",
          title: "Success",
          message: `Refetched ${pid}`,
          icon: <IconCheck />
        });

        const submissions: SubmissionRow[] =
          client.getQueryData(["submissions"]) ?? [];

        const newSubmissions = submissions.map((submission) => {
          if (submission.problemId === updatedProblem.id)
            return {
              ...submission,
              problem: updatedProblem
            };
          return submission;
        });

        client.setQueryData(["submissions"], newSubmissions);
      }
    }
  });

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon>
          <IconDots size={18} stroke={1.5} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          icon={<IconReload size={14} />}
          onClick={() => {
            notifications.show({
              id: `refetch-problem-${pid}`,
              color: "yellow",
              title: "Loading",
              message: `Refetching ${pid}`,
              loading: true
            });
            mutate({ id });
          }}
        >
          Refetch
        </Menu.Item>
        <Menu.Item
          icon={<IconTrash size={14} />}
          onClick={() => {
            open();
          }}
        >
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
