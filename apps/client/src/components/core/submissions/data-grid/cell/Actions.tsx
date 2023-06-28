import { ActionIcon, Menu } from "@mantine/core";
import { IconDots, IconReload, IconTrash } from "@tabler/icons-react";
import {
  SubmissionRow,
  useRefetchProblemMutation
} from "@proghours/data-access";
import { CellContext } from "@tanstack/react-table";
import { useQueryClient } from "@tanstack/react-query";

export function ActionsCell({ cell }: CellContext<SubmissionRow, unknown>) {
  const {
    problem: { id }
  } = cell.row.original;
  const client = useQueryClient();
  const { mutate } = useRefetchProblemMutation({
    config: {
      onSuccess: (updatedProblem) => {
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
            mutate({ id });
          }}
        >
          Refetch
        </Menu.Item>
        <Menu.Item icon={<IconTrash size={14} />}>Delete</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
