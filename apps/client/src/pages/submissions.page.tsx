import { Box, Group, Loader, Stack, Title, Transition } from "@mantine/core";
import { DashboardLayout } from "~/components/common/dashboard/Layout";
import { SubmissionRow, useSubmissions } from "@proghours/data-access";
import { DataGridToolbar } from "~/components/common/datagrid/Toolbar";
import { SubmissionsTable } from "~/components/core/submissions/data-grid";
import { useDataGrid } from "~/components/common/datagrid";

export default function SubmissionsPage() {
  const [table, setRef] = useDataGrid<SubmissionRow>();
  const { data, isFetching, isSuccess } = useSubmissions();
  return (
    <DashboardLayout>
      <Group sx={{ alignItems: "center" }}>
        <Title order={2}>Submissions</Title>
        <Transition mounted={isFetching} transition="fade" duration={800}>
          {(styles) => (
            <div style={{ ...styles, display: "flex", alignItems: "center" }}>
              <Loader size="xs" />
            </div>
          )}
        </Transition>
      </Group>
      <Transition mounted={!isFetching} transition="fade" duration={300}>
        {(styles) => (
          <Box style={{ ...styles, transitionDelay: "250ms" }}>
            {isSuccess && (
              <Stack mt="md" spacing="lg">
                {table && (
                  <DataGridToolbar
                    table={table}
                    withGlobalFilter
                    columnFilters={[
                      {
                        id: "problem_difficulty",
                        label: "Difficulty"
                      },
                      {
                        id: "verdict",
                        label: "Verdict"
                      }
                    ]}
                  />
                )}
                <SubmissionsTable data={data} tableRef={setRef} />
              </Stack>
            )}
          </Box>
        )}
      </Transition>
    </DashboardLayout>
  );
}
