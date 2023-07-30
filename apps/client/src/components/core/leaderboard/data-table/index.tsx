import { DataTable } from "~/components/common/datatable";
import { UseLeaderboardResponse } from "@proghours/data-access";
import { memo, useEffect, useState } from "react";
import { Avatar, Box, Group, Text } from "@mantine/core";

type LeaderboardDataTableProps = {
  data: UseLeaderboardResponse;
};

function LeaderboardDataTable({ data }: LeaderboardDataTableProps) {
  console.log(data); // data -> filtered records -> paginated records
  const [filteredRecords, setFilteredRecords] = useState(data || []);
  useEffect(() => {
    setFilteredRecords(data);
  }, [data]);

  // pagination
  const batchSize = 20;
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(filteredRecords.slice(0, batchSize));

  useEffect(() => {
    setRecords(filteredRecords.slice(0, batchSize));
  }, [filteredRecords]);

  useEffect(() => {
    const from = (page - 1) * batchSize;
    const to = from + batchSize;
    setRecords(filteredRecords.slice(from, to));
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [page]);

  return (
    <DataTable
      height="calc(100vh - 150px)"
      verticalSpacing="xs"
      withBorder={false}
      // provide data
      records={records}
      // pagination
      totalRecords={filteredRecords.length}
      recordsPerPage={batchSize}
      page={page}
      onPageChange={(p: number) => setPage(p)}
      // define columns
      columns={[
        {
          accessor: "rank",
          title: "Rank",
          width: 100
        },
        {
          accessor: "fullName",
          title: "Name",
          width: 280,
          render: (row) => {
            const avatarName = row.fullName
              .split(" ")
              .splice(0, 2)
              .map((el) => el[0])
              .join("");
            const { bg, color } = getAvatarColors(row.fullName);
            return (
              <Group spacing="xs">
                <Avatar sx={{ backgroundColor: bg, color }} radius="xl">
                  {avatarName}
                </Avatar>
                <Box>
                  <Text
                    sx={{
                      fontWeight: 500,
                      maxWidth: 180,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis"
                    }}
                  >
                    {row.fullName}
                  </Text>
                  <Text>{row.username.toUpperCase()}</Text>
                </Box>
              </Group>
            );
          }
        },
        {
          accessor: "totalSolved",
          title: "Total Sovled",
          width: 180
        },
        {
          accessor: "totalSolveTime",
          title: "Solve time",
          width: 180,
          render: (row) =>
            `${Math.floor(row.totalSolveTime / 60)}h ${
              row.totalSolveTime % 60
            }m`
        },
        {
          accessor: "averageDifficulty",
          title: "Average difficulty",
          render: (row) => row.averageDifficulty.toFixed(2)
        },
        {
          accessor: "points",
          title: "Points",
          render: (row) => row.points.toFixed(2)
        }
      ]}
    />
  );
}

function stringToColour(str: string, saturation = 50, lightness = 45) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  return `hsl(${hash % 360}, ${saturation}%, ${lightness}%)`;
}

function getAvatarColors(name: string) {
  const bgColorHex = stringToColour(name);
  return {
    bg: bgColorHex,
    color: "#fff"
  };
}

export default memo(LeaderboardDataTable);
