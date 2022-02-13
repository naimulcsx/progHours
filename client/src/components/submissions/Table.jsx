import { usePagination, useTable } from "react-table"
import EmptyState from "@/components/submissions/EmptyState"

// import columns components
import ProblemName from "./columns/ProblemName"
import Actions from "./columns/Actions"
import Verdict from "./columns/Verdict"
import DatePicker from "./columns/DatePicker"
import AddEntryRow from "./AddEntryRow"
import SolveTime from "./columns/SolveTime"

const practiceColumns = [
  {
    Header: "Id",
    accessor: "idx",
  },
  {
    Header: "Problem Name",
    accessor: (row) => `${row.problem.pid} |-| ${row.problem.name}`,
    Cell: ProblemName,
  },
  {
    Header: "Verdict",
    accessor: "verdict",
    Cell: Verdict,
  },
  {
    Header: "Solve Time",
    accessor: "solveTime",
    Cell: SolveTime,
  },
  {
    Header: "Tags",
    accessor: (row) => "Tag1, Tag2, Tag3",
  },
  {
    Header: "Date",
    accessor: "solvedAt",
    Cell: DatePicker,
    // Cell: (cell) =>
    //   new Date(cell.value).toLocaleString("en-US", {
    //     year: "numeric",
    //     month: "long",
    //     day: "numeric",
    //     minute: "2-digit",
    //     hour: "2-digit",
    //   }),
  },
  {
    Header: "Actions",
    accessor: (row) => row.id,
    Cell: Actions,
  },
]

const TrackingTable = ({ problemData }) => {
  let k = problemData.length
  problemData.forEach((el) => (el.idx = k--))

  const tableInstance = useTable(
    {
      data: problemData,
      columns: practiceColumns,
      initialState: { pageSize: 10 },
    },
    usePagination
  )
  const {
    getTableProps,
    getTableBodyProps,
    rows,
    prepareRow,
    headerGroups,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = tableInstance

  return (
    <div className="mt-6 border border-gray-100 rounded-lg max-h-[780px]">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => {
            return (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className="text-base bg-white text-dark"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <th {...header.getHeaderProps()} className="px-6 py-4">
                      {header.render("Header")}
                    </th>
                  )
                })}
              </tr>
            )
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          <AddEntryRow id={problemData.length + 1} />
          {rows.map((row) => {
            prepareRow(row)
            return (
              <tr
                {...row.getRowProps()}
                key={row.original.id}
                className={`hover:bg-light bg-white`}
              >
                {row.cells.map((cell) => {
                  const extraProps = {}
                  extraProps[
                    `data-${cell.column.id.toLowerCase().split(" ").join("-")}`
                  ] = cell.value
                  return (
                    <td
                      {...cell.getCellProps()}
                      {...extraProps}
                      className="px-6 py-2"
                    >
                      <span>{cell.render("Cell")}</span>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      {/* <div className="flex items-center justify-between px-6 py-3 space-x-4 bg-white pagination">
        <div>
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value))
            }}
          >
            {[5, 10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-4">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            <FiChevronsLeft size={20} />
          </button>{" "}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            <FiChevronLeft size={20} />
          </button>{" "}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            <FiChevronRight size={20} />
          </button>{" "}
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            <FiChevronsRight size={20} />
          </button>{" "}
          <span>
            | Go to page:{" "}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(page)
              }}
              style={{ width: "100px" }}
            />
          </span>
        </div>
      </div> */}
      {problemData.length === 0 && <EmptyState />}
    </div>
  )
}

export default TrackingTable
