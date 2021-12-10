import { VerticalDotsIcon } from "./Icons"

const problemStats = [
  {
    pid: "CF-1366C",
    problemName: "Palindromic Paths",
    judgeName: "CODEFORCES",
    verdict: "AC",
    solveTime: 54,
    tags: ["Number Theory", "Greedy"],
  },
  {
    pid: "CF-1366C",
    problemName: "Palindromic Paths",
    judgeName: "CODEFORCES",
    verdict: "AC",
    solveTime: 54,
    tags: ["Number Theory", "Greedy"],
  },
]

const TrackingTable = () => {
  return (
    <div className="pt-12">
      <table>
        <thead>
          <tr className="text-base font-medium">
            <td>ID</td>
            <td>Problem Name</td>
            <td>Verdict</td>
            <td>Solve Time</td>
            <td>Tags</td>
            <td>Date</td>
          </tr>
        </thead>
        <tbody>
          {problemStats.map((problem, index) => (
            <tr key={index} className="bg-white">
              {/* id */}
              <td>{index + 1}</td>

              {/* problem info */}
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
              <td>
                <span className="px-2 py-1 text-sm font-medium rounded-md bg-lightGreen text-green">
                  {problem.verdict}
                </span>
              </td>
              <td>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-blue-400"></div>
                  <p className="">{problem.solveTime}</p>
                </div>
              </td>
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
              <td>{new Date(Date.now()).toDateString()}</td>
              <td>
                <VerticalDotsIcon size={24} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TrackingTable
