import { Box, Group, Loader, Stack, Title, Transition } from "@mantine/core";
import { DashboardLayout } from "~/components/common/dashboard/Layout";
import { useSubmissions } from "@proghours/data-access";
import { SubmissionsDataTable } from "~/components/core/submissions/table";
// import SubmissionsDataTable from "~/components/core/submissions/data-table";

export default function SubmissionsPage() {
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
                {/* <SubmissionsDataTable data={data} /> */}
                <SubmissionsDataTable data={data} />
              </Stack>
            )}
          </Box>
        )}
      </Transition>
    </DashboardLayout>
  );
}
