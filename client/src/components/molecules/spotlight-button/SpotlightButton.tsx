import { Button, Text } from "@mantine/core"
import { openSpotlight } from "@mantine/spotlight"
import { IconSearch } from "@tabler/icons"

export default function SpotlightButton() {
  return (
    <Button
      leftIcon={<IconSearch size={14} />}
      variant="outline"
      color="gray"
      onClick={() => openSpotlight()}
      sx={(theme) => ({
        borderColor: theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3],
        [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
          display: "none",
        },
      })}
    >
      <Text mr="xl">Search...</Text>
      <Text ml="xl">Ctrl + K</Text>
    </Button>
  )
}
