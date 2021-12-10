import { ThreeDots, ArrowDown } from "./Icons"

const problemStats = [
  {
    problemBoxs: {
      image: "codeforces.png",
      problemNo: "CF-1366C",
      problemTitle: "Palindromic Paths",
    },

    verdict: "AC",
    solveTime: "54 mins",
    tags: ["Number Theory", "Greedy"],
    date: {
      day: "Thu, 20 Feb 2021",
      time: "9:38 AM",
    },
  },

  {
    problemBoxs: {
      image: "codeforces.png",
      problemNo: "CF-1366C",
      problemTitle: "Palindromic Paths",
    },

    verdict: "AC",
    solveTime: "54 mins",
    tags: ["Number Theory", "Greedy"],
    date: {
      day: "Thu, 20 Feb 2021",
      time: "9:38 AM",
    },
  },
]

function ProblemBox({ image, problemNo, problemTitle }) {
  return (
    <div className="flex items-center space-x-4">
      <div className="">
        <img src={`/image/${image}`} className="object-cover w-16" alt="" />
      </div>

      <div>
        <h5>{problemNo}</h5>
        <p>{problemTitle}</p>
      </div>
    </div>
  )
}

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
          {problemStats.map((list, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <ProblemBox
                  image={list.problemBoxs.image}
                  problemNo={list.problemBoxs.problemNo}
                  problemTitle={list.problemBoxs.problemTitle}
                />
              </td>
              <td>
                <span className="px-4 py-2 font-semibold rounded-md bg-lightGreen text-green">
                  {list.verdict}
                </span>
              </td>
              <td>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-blue-400"></div>
                  <p className="font-semibold ">{list.solveTime}</p>
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
              <td>
                <div className="">
                  <p className="font-semibold">{list.date.day}</p>
                  <p className="text-secondaryDark">{list.date.time}</p>
                </div>
              </td>
              <td>
                <ThreeDots size={25} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TrackingTable
