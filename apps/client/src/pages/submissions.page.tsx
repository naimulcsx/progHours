import { Group, Loader, Title, Transition } from "@mantine/core";
import { DashboardLayout } from "~/components/common/dashboard/Layout";
import { SubmissionsDataTable } from "~/components/core/submissions/data-grid";
import { columns } from "~/components/core/submissions/data-grid/columns";
import { useSubmissions } from "@proghours/data-access";

export default function SubmissionsPage() {
  const { data, isLoading, isFetching, isSuccess } = useSubmissions();
  return (
    <DashboardLayout>
      <Group sx={{ alignItems: "center" }}>
        <Title order={3}>Submissions</Title>
        <Transition
          mounted={isLoading || isFetching}
          transition="fade"
          duration={800}
        >
          {(styles) => (
            <div style={{ ...styles, display: "flex", alignItems: "center" }}>
              <Loader size="xs" />
            </div>
          )}
        </Transition>
      </Group>
      <Transition mounted={isSuccess} transition="fade" duration={800}>
        {(styles) => (
          <div style={{ ...styles, transitionDelay: "250ms" }}>
            <SubmissionsDataTable columns={columns} data={data || []} />
          </div>
        )}
      </Transition>
    </DashboardLayout>
  );
}
