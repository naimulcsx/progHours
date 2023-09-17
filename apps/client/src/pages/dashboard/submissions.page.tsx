import { Helmet } from "react-helmet-async";

import { Box, Group, Loader, Stack, Title, Transition } from "@mantine/core";

import { useSubmissions } from "@proghours/data-access";

import { DashboardLayout } from "~/modules/common/components/DashboardLayout";
import { SubmissionsDataTable } from "~/modules/dashboard/submissions/components/table";

export default function SubmissionsPage() {
  const { data, isFetching, isSuccess } = useSubmissions();
  return (
    <DashboardLayout>
      <Helmet>
        <title>Submissions - progHours</title>
      </Helmet>
      <Group style={{ alignItems: "center" }}>
        <Title order={3}>Submissions</Title>
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
              <Stack mt="md" gap="lg">
                <SubmissionsDataTable data={data} />
              </Stack>
            )}
          </Box>
        )}
      </Transition>
    </DashboardLayout>
  );
}
