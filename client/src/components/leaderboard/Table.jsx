import { useTable, useSortBy } from "react-table"

const columns = [
  {
    Header: "#",
    accessor: (row, i) => i + 1,
  },
  {
    Header: "Name",
    accessor: "name",
    Cell: (cell) => {
      return (
        <div className="flex items-center space-x-4">
          <img
            src={`https://robohash.org/${cell.value}?bgset=bg2&size=40x40`}
            className="rounded-full"
          />
          <div>
            <p className="font-medium">{cell.value}</p>
            <p className="text-sm text-gray-500">
              {cell.row.original.username}
            </p>
          </div>
        </div>
      )
    },
  },
  {
    Header: "Solve Count",
    accessor: "solve_count",
  },
  {
    Header: "Solve Time",
    accessor: "solve_time",
  },
  {
    Header: "Average Solve Difficulty",
    accessor: "avg_diffculty",
    Cell: (cell) => cell.value,
  },
  {
    Header: "Points",
    accessor: "points",
    Cell: (cell) => cell.value,
  },
]

const LeaderboardTable = ({ ranklist }) => {
  const tableInstance = useTable(
    {
      data: ranklist,
      columns,
    },
    useSortBy
  )

  const { getTableProps, getTableBodyProps, rows, prepareRow, headerGroups } =
    tableInstance

  return (
    <table
      {...getTableProps()}
      className="leaderboard border-collapse max-w-6  xl"
    >
      <thead>
        {headerGroups.map((headerGroup) => {
          return (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              className="text-base text-dark"
            >
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    {...header.getHeaderProps(header.getSortByToggleProps())}
                    className="border-b border-slate-100"
                  >
                    {header.render("Header")}
                  </th>
                )
              })}
            </tr>
          )
        })}
      </thead>
      <tbody>
        {rows.map((row) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()} className={`bg-white`}>
              {row.cells.map((cell) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    className="border-b border-slate-100"
                  >
                    {cell.render("Cell")}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default LeaderboardTable
