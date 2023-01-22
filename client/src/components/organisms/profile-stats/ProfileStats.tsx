import { Grid } from "@mantine/core"
import { IconEnergy, IconFlag, IconPoints, IconTime } from "~/components/atoms/icons"
import { ProfileStatsCard } from "~/components/molecules"
import convertMinsToHours from "~/utils/convertMinsToHours"
import calculatePoints from "~/utils/calculatePoints"

export default function ProfileStats({ statistics }: ProfileStatsProps) {
  let { totalSolved, totalSolveTime, totalDifficulty } = statistics
  const items = [
    {
      label: "Points",
      value: calculatePoints(statistics).toFixed(2),
      Icon: () => <IconPoints />,
    },
    {
      label: "Problems Solved",
      value: totalSolved,
      Icon: () => <IconFlag />,
    },
    {
      label: "Solve Time",
      value: convertMinsToHours(totalSolveTime),
      Icon: () => <IconTime />,
    },
    {
      label: "Average Difficulty",
      value: (totalDifficulty / totalSolved || 0).toFixed(2),
      Icon: () => <IconEnergy />,
    },
  ]
  return (
    <Grid>
      {items.map((item, index) => (
        <Grid.Col key={index} span={6} xl={3}>
          <ProfileStatsCard
            icon={<item.Icon />}
            data={{
              label: item.label,
              value: item.value,
            }}
          />
        </Grid.Col>
      ))}
    </Grid>
  )
}

export interface ProfileStatsProps {
  statistics: {
    totalDifficulty: number
    totalSolved: number
    totalSolveTime: number
    totalSolvedWithDifficulty: number
  }
}
