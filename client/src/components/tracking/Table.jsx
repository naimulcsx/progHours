import { useTable } from "react-table"

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
    accessor: (row) => [row.pid, row.name],
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

const TrackingTable = () => {
  const tableInstance = useTable({
    data: practiceData,
    columns: practiceColumns,
  })
  const { getTableProps, getTableBodyProps, rows, prepareRow, headerGroups } =
    tableInstance
  return (
    <div className="pt-12">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => {
            return (
              <tr className="text-base font-medium">
                {headerGroup.headers.map((header) => {
                  return <td>{header.render("Header")}</td>
                })}
              </tr>
            )
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)
            return (
              <tr className="bg-white">
                {row.cells.map((cell) => {
                  // check if the cell is problem name
                  if (cell.column.Header === "Problem Name") {
                    const [pid, name] = cell.value
                    return (
                      <td>
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
                      <td>
                        <span className="px-2 py-1 text-sm font-medium rounded-md bg-lightGreen text-green">
                          {cell.render("Cell")}
                        </span>
                      </td>
                    )
                  }

                  if (cell.column.Header === "Solve Time") {
                    return (
                      <td>
                        <div className="flex items-center space-x-4">
                          <div className="w-2 h-2 bg-blue-400"></div>
                          <p className="">{cell.render("Cell")}</p>
                        </div>
                      </td>
                    )
                  }

                  // default raw style
                  return <td>{cell.render("Cell")}</td>
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
