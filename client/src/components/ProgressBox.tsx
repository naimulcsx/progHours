import { BsArrowUpRight } from "react-icons/bs"
import { FaRegComment } from "react-icons/fa"
import { GiArrowCursor } from "react-icons/gi"
import { MdWatchLater } from "react-icons/md"
import { SiOpslevel } from "react-icons/si"
import calculatePoints from "../utils/calculatePoints"

const Box = ({ title, icon, result, progress, today }) => {
  return (
    <div
      className="flex flex-col text-center items-center mx-auto px-8 py-5 space-x-4 bg-white rounded-md  shadow shadow-primary/5 w-full
    md:flex-row md:items-start md:text-left md:mx-0 md:w-auto
    "
    >
      <div className="p-3 rounded-full bg-primary bg-opacity-10 text-primary">
        {icon}
      </div>
      <div className="pt-1 space-y-4">
        <h4 className="text-dark font-medium">{title}</h4>
        <div className="space-y-4">
          <h2>{result}</h2>
          {/* <div className="flex items-center space-x-5">
            <BsArrowUpRight />
            <p className="text-lg text-primaryDark">{progress} %</p>
            <p className="text-lg text-secondaryDark">{today}</p>
          </div> */}
        </div>
      </div>
    </div>
  )
}

function convertToHours(totalTimeInMin) {
  const h = Math.floor(totalTimeInMin / 60)
  const m = totalTimeInMin % 60
  return `${h}h ${m}m`
}

const ProgressBox = ({ progress }) => {
  if (!progress) return <div>Loading</div>
  const { solve_count, solve_time, avg_difficulty } = progress

  return (
    <div className="flex justify-center">
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-8">
          <Box
            icon={<FaRegComment size={20} />}
            title="Points"
            result={calculatePoints(progress).toFixed(2)}
            progress="5.0"
            today="+45 today"
          />

          <Box
            icon={<GiArrowCursor size={20} />}
            title="Problems Solved"
            result={solve_count}
            progress="5.0"
            today="+10 today"
          />

          <Box
            icon={<MdWatchLater size={20} />}
            title="Solve Time"
            result={convertToHours(solve_time)}
            progress="5.0"
            today="-13m 35s"
          />

          <Box
            icon={<SiOpslevel size={20} />}
            title="Average Difficulty"
            result={avg_difficulty.toFixed(2)}
            progress="5.0"
            today="+45 today"
          />
        </div>
      </div>
    </div>
  )
}

export default ProgressBox
