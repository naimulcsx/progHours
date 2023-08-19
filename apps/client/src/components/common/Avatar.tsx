import { Avatar as MantineAvatar } from "@mantine/core";

export function Avatar({ fullName }: { fullName: string }) {
  const avatarName = fullName
    .split(" ")
    .splice(0, 2)
    .map((el) => el[0])
    .join("");
  const { bg, color } = getAvatarColors(fullName);
  return (
    <MantineAvatar
      styles={{
        placeholder: { backgroundColor: bg, color }
      }}
      radius="xl"
      size="lg"
    >
      {avatarName}
    </MantineAvatar>
  );
}

function stringToColour(str: string, saturation = 50, lightness = 55) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  return `hsl(${hash % 360}, ${saturation}%, ${lightness}%)`;
}

export function getAvatarColors(name: string) {
  const bgColorHex = stringToColour(name);
  return {
    bg: bgColorHex,
    color: "#fff"
  };
}
