import {
  StarIcon,
  LightningBoltIcon,
  TrendingUpIcon,
  ClockIcon,
} from "@heroicons/react/outline"
import calculatePoints from "@/utils/calculatePoints"
type HeroIconProps = (props: React.ComponentProps<"svg">) => JSX.Element

interface ProgressBox {
  title: string
  Icon: HeroIconProps
  data: string | number
}

interface Progress {
  average_difficulty: number
  total_solved: number
  total_solve_time: number
  verdict_count: {
    AC: number
    WA: number
    RTE: number
    MLE: number
    TLE: number
  }
}
//
const Box = ({ title, Icon, data }: ProgressBox) => {
  return (
    <div className="flex flex-col items-center w-full p-8 mx-auto space-x-2 text-center bg-white rounded-lg shadow md:flex-row md:items-start md:text-left md:mx-0 md:w-auto md:space-x-4 ">
      <div className="p-3 rounded-full bg-primary bg-opacity-10 text-primary">
        <Icon className="w-8 h-8" />
      </div>
      <div className="pt-1 space-y-2">
        <div className="space-y-4">
          <h2 className="text-2xl xl:text-3xl">{data}</h2>
        </div>
        <h4 className="text-lg font-normal text-gray-500">{title}</h4>
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
  const { total_solved, total_solve_time, average_difficulty } = progress

  return (
    <div className="flex justify-center">
      <div className="w-full">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Box
            Icon={StarIcon}
            title="Points"
            data={calculatePoints(progress).toFixed(2)}
          />
          <Box
            Icon={TrendingUpIcon}
            title="Problems Solved"
            data={total_solved}
          />
          <Box
            Icon={ClockIcon}
            title="Solve Time"
            data={convertToHours(total_solve_time)}
          />
          <Box
            Icon={LightningBoltIcon}
            title="Average Difficulty"
            data={average_difficulty.toFixed(2)}
          />
        </div>
      </div>
    </div>
  )
}

export default ProgressBox
