import { Button, Text, useMantineTheme } from "@mantine/core";
import { openSpotlight } from "@mantine/spotlight";
import { IconSearch } from "~/assets/icons";

export default function SpotlightButton() {
  const theme = useMantineTheme();
  const textStyles = { color: "hsl(var(--muted-foreground))", fontWeight: 400 };
  return (
    <Button
      leftSection={<IconSearch height={20} width={20} />}
      variant="outline"
      color="gray"
      onClick={() => openSpotlight()}
      styles={{
        root: {
          height: 40,
          boxShadow: theme.shadows.xs,
          width: "100%",
          borderColor: "hsl(var(--border))"
        },
        inner: {
          justifyContent: "flex-start"
        },
        section: {
          color: "hsl(var(--muted-foreground))"
        }
      }}
    >
      <Text mr="xl" style={textStyles}>
        Search...
      </Text>
      <Text ml="xl" style={textStyles}>
        Ctrl + K
      </Text>
    </Button>
  );
}
