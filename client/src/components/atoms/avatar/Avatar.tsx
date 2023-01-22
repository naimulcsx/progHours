import { Box } from "@mantine/core"
import { getAvatarColors } from "~/utils/getAvatarColors"
import useStyles from "./Avatar.styles"

export default function Avatar({ name, height = 32, width = 32, fontSize = 12 }: AvatarProps) {
  const { bg, color } = getAvatarColors(name)
  const initials = name
    .split(" ")
    .map((t: string) => t.charAt(0))
    .splice(0, 2)
    .join("")
    .toUpperCase()
  const { classes } = useStyles()
  return (
    <Box
      className={classes.wrapper}
      sx={{
        background: bg,
        color: color,
        height: height,
        width: width,
        fontSize: fontSize,
      }}
    >
      {initials}
    </Box>
  )
}

export interface AvatarProps {
  name: string
  height?: number
  width?: number
  fontSize?: number
}
