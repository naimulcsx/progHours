import axios from "axios"
import { useEffect, useState } from "react"
import { useTable, useSortBy } from "react-table"

function calculatePoints(obj) {
  return (obj.avg_diffculty * obj.solve_count) / 100.0
}

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
        <div className="flex space-x-4 px-6">
          <img
            src={`https://robohash.org/${cell.value}?bgset=bg2&size=48x48`}
            className="rounded-full"
          />
          <div>
            <p className="font-medium">{cell.value}</p>
            <p>{cell.row.original.username}</p>
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
    Cell: (cell) => cell.value.toFixed(2),
  },
  {
    Header: "Points",
    accessor: (row) => calculatePoints(row),
  },
]

const LeaderboardTable = () => {
  const [ranklist, setRanklist] = useState([])
  useEffect(async () => {
    const { data } = await axios.get("/api/users/ranklist")
    data.ranklist.sort((a, b) => {
      return calculatePoints(a) >= calculatePoints(b) ? -1 : 1
    })

    console.log(data.ranklist)

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
    <table {...getTableProps()} className="border-collapse max-w-6  xl">
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
