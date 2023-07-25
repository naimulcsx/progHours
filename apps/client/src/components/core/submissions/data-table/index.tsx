import { Badge, Group, MultiSelect } from "@mantine/core";
import { DataTable, DataTableSortStatus } from "~/components/common/datatable";
import { GetSubmissionsResponse } from "@proghours/data-access";
import { ProblemName } from "./cell/ProblemName";
import { VerdictCell } from "./cell/Verdict";
import { SolveTimeCell } from "./cell/SolveTime";
import { SolvedAtCell } from "./cell/SolvedAt";
import { memo, useEffect, useRef, useState } from "react";
import { IconSearch } from "~/assets/icons";
import { CreateSubmissionRow } from "./CreateSubmissionRow";
import { ActionsCell } from "./cell/Actions";

type SubmissionDataTableProps = {
  data: GetSubmissionsResponse;
};

function SubmissionsDataTable({ data }: SubmissionDataTableProps) {
  // data -> filtered records -> paginated records
  const [filteredRecords, setFilteredRecords] = useState(data || []);
  useEffect(() => {
    setSelectedTags([]);
    setSelectedDifficulty([]);
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

  // tags filters
  const tags = ["number theory", "greedy", "strings", "implementation"];
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const initialRenderRef = useRef(true);

  // difficulty filters
  const difficulty = ["800", "900", "1000", "1100", "1200"];
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);

  useEffect(() => {
    if (!initialRenderRef.current) {
      let newRecords = data;

      // apply tags filters
      if (selectedTags.length > 0) {
        newRecords = newRecords.filter(({ problem }) => {
          const tags = problem.problemTags.map(
            (problemTag) => problemTag.tag.name
          );
          if (
            selectedTags.length > 0 &&
            !selectedTags.some((tag) => tags.includes(tag))
          ) {
            return false;
          }
          return true;
        });
      }

      // apply difficulty filters
      if (selectedDifficulty.length > 0) {
        newRecords = newRecords.filter(({ problem }) => {
          const difficulty = problem.difficulty.toString();
          if (
            selectedDifficulty.length > 0 &&
            !selectedDifficulty.some((d) => d === difficulty)
          ) {
            return false;
          }
          return true;
        });
      }

      if (selectedDifficulty.length > 0 || selectedTags.length > 0) {
        setFilteredRecords(newRecords);
      } else {
        setFilteredRecords(data);
      }
    }
    initialRenderRef.current = false;
  }, [selectedTags, selectedDifficulty]);

  // sort status
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "",
    direction: "asc"
  });

  return (
    <DataTable
      height="calc(100vh - 150px)"
      firstRow={<CreateSubmissionRow />}
      verticalSpacing="xs"
      withBorder={false}
      // provide data
      records={records}
      // pagination
      totalRecords={filteredRecords.length}
      recordsPerPage={batchSize}
      page={page}
      onPageChange={(p: number) => setPage(p)}
      // column sorting
      sortStatus={sortStatus}
      onSortStatusChange={setSortStatus}
      // define columns
      columns={[
        {
          accessor: "problem.name",
          title: "Problem",
          render: ProblemName,
          width: 280
        },
        {
          accessor: "verdict",
          title: "Verdict",
          render: VerdictCell,
          width: 90
        },
        {
          accessor: "solveTime",
          title: "Solve Time",
          render: SolveTimeCell,
          width: 110
        },
        {
          accessor: "problem.tags",
          title: "Tags",
          render: (row) => {
            const tags = row.problem.problemTags.map(
              (problemTag) => problemTag.tag.name
            );
            return (
              <Group spacing="xs" sx={{ maxWidth: 240 }}>
                {tags.map((tag) => {
                  return <Badge key={tag}>{tag}</Badge>;
                })}
              </Group>
            );
          },
          width: 320,
          filter: (
            <MultiSelect
              id="tags-filter"
              maw={400}
              label="Tags"
              description="Filter your submissions by tags"
              data={tags}
              value={selectedTags}
              placeholder="Search tags"
              onChange={setSelectedTags}
              icon={<IconSearch />}
              clearable
              searchable
            />
          ),
          filtering: selectedTags.length > 0
        },
        {
          accessor: "problem.difficulty",
          title: "Difficulty",
          filter: (
            <MultiSelect
              id="difficulty-filter"
              maw={400}
              label="Difficulty"
              data={difficulty}
              value={selectedDifficulty}
              placeholder="Search departments…"
              onChange={setSelectedDifficulty}
              icon={<IconSearch />}
              clearable
              searchable
            />
          ),
          width: 140,
          filtering: selectedDifficulty.length > 0,
          sortable: true
        },
        {
          accessor: "solvedAt",
          title: "Solved At",
          render: SolvedAtCell,
          width: 120
        },
        {
          accessor: "actions",
          title: "Actions",
          render: ActionsCell
        }
      ]}
    />
  );
}

export default memo(SubmissionsDataTable);

// R&D: infinite scroll
// const [loading, setLoading] = useState(false);
// const scrollViewportRef = useRef<HTMLDivElement>(null);
// let timeout: ReturnType<typeof setTimeout> | undefined;
// const loadMoreRecords = () => {
//   if (records.length < submissions.length) {
//     setLoading(true);
//     timeout = setTimeout(() => {
//       setRecords(submissions.slice(0, records.length + batchSize));
//       setLoading(false);
//     }, 250);
//   }
// };
// useEffect(() => {
//   return () => {
//     if (timeout) clearTimeout(timeout);
//   };
// }, [timeout]);
