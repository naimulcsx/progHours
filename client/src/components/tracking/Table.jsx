import { usePagination, useTable } from "react-table"
import {
  FiChevronRight,
  FiChevronLeft,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi"
import { useMutation, useQueryClient } from "react-query"
import { deleteSubmission, getSubmissions } from "../../api/submissions"
import { toast } from "react-toastify"
import { CFIcon, TrashIcon, EditIcon } from "@/components/Icons"
import EmptyState from "@/components/tracking/EmptyState"

const ProblemActions = ({ id }) => {
  const queryClient = useQueryClient()

  const { mutate } = useMutation((id) => deleteSubmission(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("practice", getSubmissions)
    },

    onError: (err) => {
      toast.error(err.response.data.message, { className: "toast" })
    },
  })

  return (
    <div className="flex space-x-4">
      <EditIcon className="w-[22px] h-[22px] text-dark" aria-hidden="true" />
      <button onClick={() => mutate(id)}>
        <TrashIcon
          className="w-[22px] h-[22px] text-red-500"
          aria-hidden="true"
        />
      </button>
    </div>
  )
}

const practiceColumns = [
  {
    Header: "Id",
    accessor: "idx",
  },
  {
    Header: "Problem Name",
    accessor: (row) => {
      return (
        <div className="flex space-x-4">
          <div className="flex items-center justify-center h-10 bg-white border rounded-full basis-10">
            <CFIcon />
          </div>
          <div>
            <p className="font-medium text-gray-900">{row.problem.pid}</p>
            <p className="text-sm text-gray-600">{row.problem.name}</p>
          </div>
        </div>
      )
    },
  },
  // {
  //   Header: "Problem Name",
  //   accessor: "problem.name",
  // },
  {
    Header: "Verdict",
    accessor: "verdict",
  },
  {
    Header: "Solve Time",
    accessor: "solveTime",
  },
  {
    Header: "Tags",
    accessor: (row) => "Tag1, Tag2, Tag3",
  },
  {
    Header: "Date",
    accessor: (row) =>
      new Date(row.createdAt).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        minute: "2-digit",
        hour: "2-digit",
      }),
  },
  {
    Header: "Actions",
    accessor: (row) => {
      return <ProblemActions id={row.id} />
    },
  },
]

const TrackingTable = ({ problemData }) => {
  let k = problemData.length
  problemData.forEach((el) => (el.idx = k--))
  const tableInstance = useTable(
    {
      data: problemData,
      columns: practiceColumns,
      initialState: {
        pageSize: 10,
      },
    },
    usePagination
  )
  const {
    getTableProps,
    getTableBodyProps,
    page,
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

  if (problemData.length === 0) return <EmptyState />
  return (
    <div className="mt-6 overflow-hidden border border-gray-100 rounded-lg">
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
          {page.map((row, idx) => {
            prepareRow(row)
            return (
              <tr
                {...row.getRowProps()}
                key={row.id}
                className={`hover:bg-primary hover:bg-opacity-[0.04] bg-white`}
              >
                {row.cells.map((cell) => {
                  const extraProps = {}
                  extraProps[`data-${cell.column.id.toLowerCase()}`] =
                    cell.value

                  return (
                    <td
                      {...cell.getCellProps()}
                      {...extraProps}
                      className="px-6 py-[10px]"
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
      <div className="flex items-center justify-between px-6 py-3 space-x-4 bg-white pagination">
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
      </div>
    </div>
  )
}

export default TrackingTable
