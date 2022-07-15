import {
  StarIcon,
  LightningBoltIcon,
  TrendingUpIcon,
  ClockIcon,
} from "@heroicons/react/outline"
import calculatePoints from "@/utils/calculatePoints"
import { SimpleGrid } from "@chakra-ui/react"
import { StatCard } from "@/components/stats/StatCard"

type HeroIconProps = (props: React.ComponentProps<"svg">) => JSX.Element

function convertToHours(totalTimeInMin: number): string {
  const h = Math.floor(totalTimeInMin / 60)
  const m = totalTimeInMin % 60
  return `${h}h ${m}m`
}

const UserStats = ({ progress }: { progress: Progress }) => {
  let {
    totalSolved,
    totalSolveTime,
    totalSolvedWithDifficulty,
    totalDifficulty,
  } = progress
  progress.averageDifficulty = totalDifficulty / totalSolvedWithDifficulty || 0
  return (
    <SimpleGrid columns={4} gap={4}>
      <StatCard
        icon={<StarIcon width={24} height={24} />}
        data={{
          label: "Points",
          value: calculatePoints(progress).toFixed(2),
        }}
      />
      <StatCard
        icon={<TrendingUpIcon width={24} height={24} />}
        data={{
          label: "Problems Solved",
          value: totalSolved,
        }}
      />
      <StatCard
        icon={<ClockIcon width={24} height={24} />}
        data={{
          label: "Solve Time",
          value: convertToHours(totalSolveTime),
        }}
      />
      <StatCard
        icon={<LightningBoltIcon width={24} height={24} />}
        data={{
          label: "Average Difficulty",
          value: progress.averageDifficulty.toFixed(2),
        }}
      />
    </SimpleGrid>
  )
}

export default UserStats

interface ProgressBox {
  title: string
  Icon: HeroIconProps
  data: string | number
}

interface Progress {
  averageDifficulty: number
  totalDifficulty: number
  totalSolved: number
  totalSolveTime: number
  totalSolvedWithDifficulty: number
  verdictCount: {
    AC: number
    WA: number
    TLE: number
  }
}
