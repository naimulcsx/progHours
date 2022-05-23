import { twMerge } from "tailwind-merge"

function hexToRgb(hex: string) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b
  })

  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

function stringToColour(str: string) {
  str = str + "_"
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  let colour = "#"
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff
    colour += ("00" + value.toString(16)).substr(-2)
  }
  return colour
}

const Avatar = ({
  name,
  className,
  size = "base",
}: {
  name: string
  className?: string
  size?: "sm" | "base" | "xl"
}) => {
  const bgColorHex = stringToColour(name)
  const { r, g, b } = hexToRgb(bgColorHex)!
  const textColor = r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "#000" : "#fff"

  const sizes = {
    sm: "w-8 h-8 text-xs",
    base: "w-10 h-10 text-sm",
    xl: "w-24 h-24 text-xl",
  }

  return (
    <div
      className={twMerge(
        `${sizes[size]} flex items-center justify-center rounded-full font-bold`,
        className
      )}
      style={{
        backgroundColor: bgColorHex,
        color: textColor,
      }}
    >
      {name.split(" ").map((word, i) => {
        return <span key={i}>{word[0]}</span>
      })}
    </div>
  )
}

export default Avatar
