import { Badge, Group, MultiSelect } from "@mantine/core";
import { DataTable, DataTableSortStatus } from "~/components/common/datatable";
import { GetSubmissionsResponse } from "@proghours/data-access";
import { ProblemName } from "./cell/ProblemName";
import { VerdictCell } from "./cell/Verdict";
import { SolveTimeCell } from "./cell/SolveTime";
import { SolvedAtCell } from "./cell/SolvedAt";
import { useEffect, useRef, useState } from "react";
import { IconSearch } from "~/assets/icons";
import { CreateSubmissionRow } from "./CreateSubmissionRow";
import { ActionsCell } from "./cell/Actions";

type SubmissionDataTableProps = {
  data: GetSubmissionsResponse;
};

export default function SubmissionsDataTable({
  data
}: SubmissionDataTableProps) {
  const [submissions] = useState(data || []);

  // pagination
  const batchSize = 10;
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(submissions.slice(0, batchSize));

  useEffect(() => {
    const from = (page - 1) * batchSize;
    const to = from + batchSize;
    setRecords(submissions.slice(from, to));
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
      let filteredRecords = submissions;

      // apply tags filters
      if (selectedTags.length > 0) {
        filteredRecords = filteredRecords.filter(({ problem }) => {
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
        filteredRecords = filteredRecords.filter(({ problem }) => {
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
        setRecords(filteredRecords);
      } else {
        setRecords(submissions.slice(0, batchSize));
      }
    }
    initialRenderRef.current = false;
  }, [selectedTags, selectedDifficulty]);

  // has filters
  const hasFilters = selectedTags.length > 0 || selectedDifficulty.length > 0;

  // pagination props
  const paginationProps = !hasFilters
    ? {
        totalRecords: submissions.length,
        recordsPerPage: batchSize,
        page: page,
        onPageChange: (p: number) => setPage(p)
      }
    : {};

  // sort status
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "",
    direction: "asc"
  });

  // TODO: add sorting logic
  // useEffect(() => {
  //   const data = sortBy(companies, sortStatus.columnAccessor) as Company[];
  //   setRecords(sortStatus.direction === "desc" ? data.reverse() : data);
  // }, [sortStatus]);

  return (
    <DataTable
      firstRow={<CreateSubmissionRow />}
      verticalSpacing="xs"
      withBorder={false}
      borderRadius="sm"
      // provide data
      records={records}
      // pagination
      {...paginationProps}
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
              label="Departments "
              description="Show all data? working at the selected departments"
              data={tags}
              value={selectedTags}
              placeholder="Search departments…"
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
