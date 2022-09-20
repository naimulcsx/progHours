function stringToColour(str: string, saturation = 50, lightness = 45) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
    hash = hash & hash
  }
  return `hsl(${hash % 360}, ${saturation}%, ${lightness}%)`
}

export const getAvatarColors = (name: string) => {
  const bgColorHex = stringToColour(name)
  return {
    bg: bgColorHex,
    color: "#fff",
  }
}
