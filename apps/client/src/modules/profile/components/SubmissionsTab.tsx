import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import { Box, Flex, Paper, Title, Transition } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";

import {
  UserSubmissionsResponse,
  useUserSubmissions
} from "@proghours/data-access";

import { SubmissionsDataTable } from "~/modules/dashboard/submissions/components/table";

export function SubmissionsTab() {
  const { username } = useParams();
  const [searchParams] = useSearchParams();

  const { data, isSuccess, isFetching } = useUserSubmissions({
    username: username!
  });

  const [filteredData, setFilteredData] = useState<UserSubmissionsResponse>([]);
  const [value, setValue] = useState<Date | null>(null);

  useEffect(() => {
    if (data) setFilteredData(data);
  }, [data]);

  useEffect(() => {
    const date = searchParams.get("date");
    if (date) {
      setValue(dayjs(date, "DD-MM-YYYY").toDate());
    }
  }, [searchParams]);

  useEffect(() => {
    if (value && data) {
      setFilteredData(
        data.filter((el) => {
          return (
            dayjs(el.solvedAt).format("DD-MM-YYYY") ===
            dayjs(value).format("DD-MM-YYYY")
          );
        })
      );
    }
  }, [data, value]);

  return (
    <Box mt="lg">
      <Flex justify="space-between">
        <Title order={4}>Submissions</Title>
        <Flex align="center" gap="xs">
          <DatePickerInput
            size="xs"
            placeholder="Filter by date"
            value={value}
            onChange={setValue}
            miw={140}
            h={30}
          />
        </Flex>
      </Flex>
      <Transition mounted={!isFetching} transition="fade" duration={300}>
        {(styles) => (
          <Box style={{ ...styles, transitionDelay: "250ms" }}>
            {isSuccess && (
              <Paper mt="md">
                <SubmissionsDataTable
                  editable={false}
                  data={[...filteredData]
                    .reverse()
                    .map((el, i) => ({ ...el, serial: i + 1 }))
                    .reverse()}
                />
              </Paper>
            )}
          </Box>
        )}
      </Transition>
    </Box>
  );
}
