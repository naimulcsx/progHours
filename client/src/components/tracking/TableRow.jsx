import { VerticalDotsIcon } from "components/Icons"

const TableRow = ({ problem, index }) => {
  return (
    <tr key={problem.pid} className="bg-white">
      <td> {index} </td>
      {/* problem name and id  */}
      <td>
        <div className="flex items-center space-x-4">
          {/* replace with judge image */}
          <div className="w-10 h-10 bg-purple-300 rounded-full"></div>
          <div>
            <h6 className="font-medium">{problem.pid}</h6>
            <p>{problem.problemName}</p>
          </div>
        </div>
      </td>

      {/* verdict */}
      <td>
        <span className="px-2 py-1 text-sm font-medium rounded-md bg-lightGreen text-green">
          {problem.verdict}
        </span>
      </td>

      {/* solve time */}
      <td>
        <div className="flex items-center space-x-4">
          <div className="w-2 h-2 bg-blue-400"></div>
          <p className="">{problem.solveTime}</p>
        </div>
      </td>

      {/* problem tags */}
      <td>
        <div className="flex items-center space-x-4">
          <div className="px-2 py-1 text-sm rounded-lg bg-opacity-10 bg-sky text-sky">
            Number Theory
          </div>
          <div className="px-2 py-1 text-sm rounded-lg bg-opacity-10 bg-orange text-orange">
            Greedy
          </div>
        </div>
      </td>

      {/* time of the problem  */}
      <td>{new Date(Date.now()).toDateString()}</td>

      {/* dots icon */}
      <td>
        <VerticalDotsIcon size={24} />
      </td>
    </tr>
  )
}

export default TableRow
