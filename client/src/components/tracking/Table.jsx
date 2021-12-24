import TableRow from "components/tracking/TableRow"

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
          {problemStats.map((problem, index) => {
            return <TableRow problem={problem} index={index} />
          })}
        </tbody>
      </table>
    </div>
  )
}

export default TrackingTable
