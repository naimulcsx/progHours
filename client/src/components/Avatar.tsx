import { getAvatarColors } from "@/utils/getAvatarColors"
import { Box, BoxProps } from "@mantine/core"
import { FC } from "react"

const Avatar: FC<AvatarProps> = ({
  name,
  height = 32,
  width = 32,
  fontSize = 12,
}) => {
  const { bg, color } = getAvatarColors(name)

  const initials = name
    .split(" ")
    .map((t: string) => t.charAt(0))
    .splice(0, 2)
    .join("")
    .toUpperCase()

  return (
    <Box
      sx={(theme) => ({
        height: height,
        width: width,
        display: "flex",
        alignItems: "center",
        gap: theme.spacing.sm,
      })}
    >
      <Box
        sx={{
          background: bg,
          color: color,
          height: height,
          width: width,
          borderRadius: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: 700,
          fontSize: fontSize,
        }}
      >
        {initials}
      </Box>
    </Box>
  )
}

export interface AvatarProps {
  name: string
  height?: number
  width?: number
  fontSize?: number
}

export default Avatar
