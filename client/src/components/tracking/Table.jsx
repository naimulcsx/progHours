import { useTable } from "react-table"
import { PlusIcon, TrashIcon, PencilAltIcon } from "@heroicons/react/outline"
import { Link } from "react-router-dom"

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
    accessor: (row) => (
      <button onClick={() => alert("helllo world")} className="flex space-x-4">
        <PencilAltIcon className="w-5 h-5 text-dark" aria-hidden="true" />
        <TrashIcon className="w-5 h-5 text-red-500" aria-hidden="true" />
      </button>
    ),
  },
]

const TrackingTable = ({ problemData }) => {
  const tableInstance = useTable({
    data: problemData,
    columns: practiceColumns,
  })
  const { getTableProps, getTableBodyProps, rows, prepareRow, headerGroups } =
    tableInstance

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
    <div className="mt-12 overflow-hidden shadow rounded-xl">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => {
            return (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className="text-base font-medium bg-white text-dark"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <td {...header.getHeaderProps()} className="px-6 py-4">
                      {header.render("Header")}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()} key={row.id} className="bg-white">
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()} className="px-6 py-4">
                      {cell.render("Cell")}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default TrackingTable
