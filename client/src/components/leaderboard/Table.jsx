import { useTable } from "react-table"

const columns = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Points",
    accessor: "points",
  },
]

const LeaderboardTable = () => {
  const tableInstance = useTable({
    data: [
      { name: "Test", points: 100 },
      { name: "Fahim", points: 20 },
    ],
    columns,
  })

  const { getTableProps, getTableBodyProps, rows, prepareRow, headerGroups } =
    tableInstance

  return (
    <table {...getTableProps()} className="border-collapse">
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
                    {...header.getHeaderProps()}
                    className="px-6 py-3 border border-slate-100"
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
                    className="border border-slate-100"
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
