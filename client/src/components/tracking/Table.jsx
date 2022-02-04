import { usePagination, useTable } from "react-table"
import { PlusIcon, TrashIcon, PencilAltIcon } from "@heroicons/react/outline"
import { Link } from "react-router-dom"
import {
  FiChevronRight,
  FiChevronLeft,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi"
import { useMutation, useQueryClient } from "react-query"
import { deleteSubmission, getSubmissions } from "../../api/submissions"
import { toast } from "react-toastify"

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
    <button className="flex space-x-4">
      <PencilAltIcon className="w-5 h-5 text-dark" aria-hidden="true" />
      <TrashIcon
        className="w-5 h-5 text-red-500"
        aria-hidden="true"
        onClick={() => mutate(id)}
      />
    </button>
  )
}

const practiceColumns = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Problem Id",
    accessor: "problem.pid",
  },
  {
    Header: "Problem Name",
    accessor: "problem.name",
  },
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
    Header: "Actions",
    accessor: (row) => {
      console.log(row.id)
      return <ProblemActions id={row.id} />
    },
  },
]

const TrackingTable = ({ problemData }) => {
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

  if (problemData.length === 0)
    return (
      <div className="relative block w-full p-12 mt-12 text-center border-2 border-gray-300 border-dashed rounded-2xl">
        <svg
          className="w-12 h-12 mx-auto text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
          />
        </svg>
        <h3 className="mt-2 text-2xl font-medium text-gray-900">
          No submissions
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Get started by creating a new project.
        </p>
        <div className="mt-6">
          <Link to="/submissions/new">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PlusIcon className="w-5 h-5 mr-2 -ml-1" aria-hidden="true" />
              New Entry
            </button>
          </Link>
        </div>
      </div>
    )
  return (
    <div className="mt-6 overflow-hidden shadow rounded-lg">
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
                className={`hover:bg-primary hover:bg-opacity-5 bg-white`}
              >
                {row.cells.map((cell) => {
                  const extraProps = {}
                  extraProps[`data-${cell.column.id.toLowerCase()}`] =
                    cell.value

                  return (
                    <td
                      {...cell.getCellProps()}
                      {...extraProps}
                      className="px-6 py-4"
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
          {/* <span>
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
          </span> */}
        </div>
      </div>
    </div>
  )
}

export default TrackingTable
