import { useTable } from "react-table"
import { PlusIcon } from "@heroicons/react/solid"

const practiceData = [
  {
    id: 1,
    pid: "CF-1366C",
    name: "Palindromic Paths",
    judgeName: "CODEFORCES",
    verdict: "AC",
    solveTime: 54,
    tags: ["Number Theory", "Greedy"],
  },
  {
    id: 2,
    pid: "CF-1366C",
    name: "Palindromic Paths",
    judgeName: "CODEFORCES",
    verdict: "AC",
    solveTime: 54,
    tags: ["Number Theory", "Greedy"],
  },
]

const practiceColumns = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Problem Name",
    accessor: (row) => [row.problem.pid, row.problem.name, row.id],
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
    accessor: "tags",
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
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusIcon className="w-5 h-5 mr-2 -ml-1" aria-hidden="true" />
            New Entry
          </button>
        </div>
      </div>
    )
  return (
    <div className="pt-12">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => {
            return (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className="text-base font-medium"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <td {...header.getHeaderProps()}>
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
                  // check if the cell is problem name
                  if (cell.column.Header === "Problem Name") {
                    const [pid, name, id] = cell.value
                    return (
                      <td {...cell.getCellProps()} key={id}>
                        <div className="flex items-center space-x-4">
                          {/* replace with judge image */}
                          <div className="w-10 h-10 bg-purple-300 rounded-full"></div>
                          <div>
                            <h6 className="font-medium">{pid}</h6>
                            <p>{name}</p>
                          </div>
                        </div>
                      </td>
                    )
                  }

                  // check if the cell is for verdict
                  if (cell.column.Header === "Verdict") {
                    return (
                      <td {...cell.getCellProps()}>
                        <span className="px-2 py-1 text-sm font-medium rounded-md bg-lightGreen text-green">
                          {cell.render("Cell")}
                        </span>
                      </td>
                    )
                  }

                  if (cell.column.Header === "Solve Time") {
                    return (
                      <td {...cell.getCellProps()}>
                        <div className="flex items-center space-x-4">
                          <div className="w-2 h-2 bg-blue-400"></div>
                          <p className="">{cell.render("Cell")}</p>
                        </div>
                      </td>
                    )
                  }

                  // default raw style
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
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
