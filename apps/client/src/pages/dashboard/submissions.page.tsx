import { IconCheck, IconRefresh } from "@tabler/icons-react";
import { Helmet } from "react-helmet-async";

import {
  Box,
  Button,
  Container,
  Group,
  Loader,
  Stack,
  Title,
  Transition
} from "@mantine/core";
import { notifications } from "@mantine/notifications";

import { useRetrieve, useSubmissions } from "@proghours/data-access";

import { SubmissionsDataTable } from "~/modules/dashboard/submissions/components/table";

export default function SubmissionsPage() {
  const { data, isFetching, isSuccess } = useSubmissions();
  const { mutate } = useRetrieve({
    config: {
      onSuccess() {
        notifications.show({
          icon: <IconCheck />,
          color: "green",
          title: "Success",
          message: "Submissions will be retrieved within 2 - 5 minutes."
        });
      }
    }
  });
  return (
    <>
      <Helmet>
        <title>Submissions - progHours</title>
      </Helmet>
      <Container size="xl" px={0} pb={{ base: 66, md: 0 }}>
        <Group
          style={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Group>
            <Title order={4}>Submissions</Title>
            <Transition mounted={isFetching} transition="fade" duration={800}>
              {(styles) => (
                <div
                  style={{ ...styles, display: "flex", alignItems: "center" }}
                >
                  <Loader size="xs" />
                </div>
              )}
            </Transition>
          </Group>
          <Button
            size="xs"
            leftSection={<IconRefresh size={16} />}
            onClick={() => mutate()}
          >
            Retrieve
          </Button>
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
      </Container>
    </>
  );
}
