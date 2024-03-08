import {
  IconCheck,
  IconDots,
  IconListDetails,
  IconReload,
  IconTrash
} from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { CellContext } from "@tanstack/react-table";

import { ActionIcon, Anchor, Menu, Table, Text, Title } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";

import {
  SubmissionRow,
  useDeleteSubmission,
  useRefetchProblem
} from "@proghours/data-access";

export function ActionsCell(cell: CellContext<SubmissionRow, unknown>) {
  const {
    id: submissionId,
    problem: { id, pid },
    metaData
  } = cell.row.original;
  const client = useQueryClient();

  const { mutate: refetchProblem } = useRefetchProblem({
    config: {
      onSuccess: (updatedProblem) => {
        notifications.update({
          id: `refetch-problem-${pid}`,
          color: "green",
          title: "Success",
          message: `Refetched ${pid}`,
          icon: <IconCheck />,
          loading: false
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

  const { mutate: deleteSubmission } = useDeleteSubmission({
    config: {
      onSuccess(data) {
        notifications.show({
          color: "green",
          title: "Success",
          message: `Deleted ${pid}`,
          icon: <IconCheck />
        });

        const submissions: SubmissionRow[] =
          client.getQueryData(["submissions"]) ?? [];

        const newSubmissions = submissions.filter((submission) => {
          if (submission.id === data.id) return false;
          return true;
        });

        client.setQueryData(["submissions"], newSubmissions);
      }
    }
  });

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: <Title order={6}>Delete {pid}</Title>,
      children: (
        <Text size="sm">
          Are you sure you want to delete {pid}? This action is destructive and
          the data can not be restored.
        </Text>
      ),
      labels: { confirm: "Delete submission", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => {
        deleteSubmission({ id: submissionId });
      }
    });

  const _metaData = metaData as {
    submissions?: Array<{
      id: string;
      pid: string;
      verdict: string;
      createdAt: string;
      url: string;
    }>;
  };

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon variant="proghours-ui-outline">
          <IconDots size={18} stroke={1.5} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        {_metaData.submissions && (
          <Menu.Item
            leftSection={<IconListDetails size={14} />}
            onClick={() => {
              modals.open({
                size: "lg",
                title: `Details for ${pid}`,
                children: (
                  <Table>
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>Id</Table.Th>
                        <Table.Th>Verdict</Table.Th>
                        <Table.Th>Created at</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {_metaData.submissions?.map(
                        ({ id, verdict, createdAt, url }) => (
                          <Table.Tr key={id}>
                            <Table.Td>
                              <Anchor
                                size="sm"
                                style={{ color: "var(--mantine-color-blue-5)" }}
                                target="_blank"
                                href={url}
                              >
                                {id}
                              </Anchor>
                            </Table.Td>
                            <Table.Td>{verdict}</Table.Td>
                            <Table.Td>{createdAt}</Table.Td>
                          </Table.Tr>
                        )
                      )}
                    </Table.Tbody>
                  </Table>
                )
              });
            }}
          >
            Details
          </Menu.Item>
        )}
        <Menu.Item
          leftSection={<IconReload size={14} />}
          onClick={() => {
            notifications.show({
              id: `refetch-problem-${pid}`,
              color: "yellow",
              title: "Loading",
              message: `Refetching ${pid}`,
              loading: true
            });
            refetchProblem({ id });
          }}
        >
          Refetch
        </Menu.Item>
        <Menu.Item
          leftSection={<IconTrash size={14} />}
          onClick={openDeleteModal}
        >
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
