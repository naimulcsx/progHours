import {
  StarIcon,
  LightningBoltIcon,
  TrendingUpIcon,
  ClockIcon,
} from "@heroicons/react/outline"
import calculatePoints from "@/utils/calculatePoints"

interface ProgressBox {
  title: string
  icon: JSX.Element
  data: string | number
}

interface Progress {
  avg_difficulty: number
  solve_count: number
  solve_time: number
  verdict: {
    AC: number
    WA: number
    RTE: number
    MLE: number
    TLE: number
  }
}
//
const Box = ({ title, icon, data }: ProgressBox) => {
  return (
    <div
      className="flex flex-col text-center items-center mx-auto space-x-2 px-8 py-5  bg-white rounded-md  shadow shadow-primary/5 w-full
    md:flex-row md:items-start md:text-left md:mx-0 md:w-auto md:space-x-4
    "
    >
      <div className="p-3 rounded-full bg-primary bg-opacity-10 text-primary">
        {icon}
      </div>
      <div className="pt-1 space-y-4">
        <h4 className="text-dark font-medium text-lg md:text-xl">{title}</h4>
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl">{data}</h2>
        </div>
      </div>
    </div>
  )
}

function convertToHours(totalTimeInMin: number): string {
  const h = Math.floor(totalTimeInMin / 60)
  const m = totalTimeInMin % 60
  return `${h}h ${m}m`
}

const ProgressBox = ({ progress }: { progress: Progress }) => {
  if (!progress) return <div>Loading</div>
  const { solve_count, solve_time, avg_difficulty } = progress

  return (
    <div className="flex justify-center">
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-4 md:gap-8">
          <Box
            icon={<StarIcon className="w-7" />}
            title="Points"
            data={calculatePoints(progress).toFixed(2)}
          />
          <Box
            icon={<TrendingUpIcon className="w-7" />}
            title="Problems Solved"
            data={solve_count}
          />
          <Box
            icon={<ClockIcon className="w-7" />}
            title="Solve Time"
            data={convertToHours(solve_time)}
          />
          <Box
            icon={<LightningBoltIcon className="w-7" />}
            title="Average Difficulty"
            data={avg_difficulty.toFixed(2)}
          />
        </div>
      </div>
    </div>
  )
}

export default ProgressBox
