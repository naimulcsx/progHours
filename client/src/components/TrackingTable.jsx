import { RectangleBox, ThreeDots, ArrowDown } from "./Icons"

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
        <h4>{problemNo}</h4>
        <p className="p3">{problemTitle}</p>
      </div>
    </div>
  )
}

function TagBox({ color, text }) {
  return <div className={`bg-opacity-10 ${color} p-2 rounded-md`}>{text}</div>
}

const TrackingTable = () => {
  return (
    <div className="pt-12">
      <table>
        <thead>
          <tr>
            <td>
              <h5>ID</h5>
            </td>
            <td>
              <h5 className="flex items-center space-x-5">
                <span>Problem Name</span>
                <ArrowDown />
              </h5>
            </td>
            <td>
              <h5>Verdict</h5>
            </td>
            <td>
              <h5>Solve Time</h5>
            </td>
            <td>
              <h5>Tags</h5>
            </td>
            <td>
              <h5>Date</h5>
            </td>
          </tr>
        </thead>
        <tbody>
          {problemStats.map((list, index) => (
            <tr key={index}>
              <td>
                <h5>{index + 1}</h5>
              </td>
              <td>
                <ProblemBox
                  image={list.problemBoxs.image}
                  problemNo={list.problemBoxs.problemNo}
                  problemTitle={list.problemBoxs.problemTitle}
                />
              </td>
              <td>
                <span className="bg-lightGreen text-green rounded-md font-semibold  px-5 py-2 text-lg">
                  {list.verdict}
                </span>
              </td>
              <td>
                <div className="flex items-center space-x-4">
                  <RectangleBox className="text-sky" />
                  <p className="text-lg font-semibold">{list.solveTime}</p>
                </div>
              </td>
              <td>
                <div className="flex items-center space-x-4">
                  <div className="bg-opacity-10 bg-sky text-sky p-2 rounded-md">
                    Number Theory
                  </div>
                  <div className="bg-opacity-10 bg-orange text-orange p-2 rounded-md">
                    Greedy
                  </div>
                </div>
              </td>
              <td>
                <div className="text-lg">
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
