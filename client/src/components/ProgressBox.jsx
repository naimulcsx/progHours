import { BsArrowUpRight } from "react-icons/bs"
import { FaRegComment } from "react-icons/fa"
import { GiArrowCursor } from "react-icons/gi"
import { MdWatchLater } from "react-icons/md"
import { SiOpslevel } from "react-icons/si"

const Box = ({ title, icon, result, progress, today }) => {
  return (
    <div className="flex items-start px-8 py-5 space-x-4 transition-transform duration-500 bg-white border rounded-md hover:transform hover:-translate-y-4 border-lightGrey">
      <div className="p-3 rounded-full bg-primary bg-opacity-10 text-primary">
        {icon}
      </div>
      <div className="pt-3 space-y-8">
        <h5 className="text-primaryDark">{title}</h5>
        <div className="space-y-4">
          <h2>{result}</h2>
          <div className="flex items-center space-x-5">
            <BsArrowUpRight />
            <p className="text-lg text-primaryDark">{progress} %</p>
            <p className="text-lg text-secondaryDark">{today}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const ProgressBox = ({ progress }) => {
  const { total_solve, total_solve_time, total_difficulty } = progress

  return (
    <div className="flex justify-center">
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-9">
          <Box
            icon={<FaRegComment size={24} />}
            title="Points"
            result="850"
            progress="5.0"
            today="+45 today"
          />

          <Box
            icon={<GiArrowCursor size={24} />}
            title="Problems Solved"
            result={total_solve}
            progress="5.0"
            today="+10 today"
          />

          <Box
            icon={<MdWatchLater size={24} />}
            title="Solve Time"
            result={total_solve_time}
            progress="5.0"
            today="-13m 35s"
          />

          <Box
            icon={<SiOpslevel size={24} />}
            title="Average Difficulty"
            result={total_difficulty}
            progress="5.0"
            today="+45 today"
          />
        </div>
      </div>
    </div>
  )
}

export default ProgressBox
