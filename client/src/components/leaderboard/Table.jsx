import axios from "axios"
import { useEffect, useState } from "react"
import { useTable, useSortBy } from "react-table"

const columns = [
  {
    Header: "Name",
    accessor: "name",
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
    Header: "Points",
    accessor: (row) => parseInt(row.solve_count) + parseInt(row.solve_time),
  },
]

const LeaderboardTable = () => {
  const [ranklist, setRanklist] = useState([])
  useEffect(async () => {
    const { data } = await axios.get("/api/users/ranklist")
    setRanklist(data.ranklist)
  }, [])

  const tableInstance = useTable(
    {
      data: ranklist,
      columns,
      initialState: {
        sortBy: [
          {
            id: "Points",
            desc: true,
          },
        ],
      },
    },
    useSortBy
  )

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
                    {...header.getHeaderProps(header.getSortByToggleProps())}
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
