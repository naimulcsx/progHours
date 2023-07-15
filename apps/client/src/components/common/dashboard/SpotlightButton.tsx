import { Button, Text, useMantineTheme } from "@mantine/core";
import { openSpotlight } from "@mantine/spotlight";
import { IconSearch } from "~/assets/icons";

export default function SpotlightButton() {
  const theme = useMantineTheme();
  const textStyles = { color: theme.colors.gray[6], fontWeight: 400 };
  return (
    <Button
      leftIcon={<IconSearch height={20} width={20} />}
      variant="outline"
      color="gray"
      onClick={() => openSpotlight()}
      styles={{
        root: {
          height: 40,
          boxShadow: theme.shadows.xs,
          width: "100%",
          borderColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[5]
              : theme.colors.gray[3]
        },
        inner: {
          justifyContent: "flex-start"
        },
        leftIcon: {
          color: theme.colors.gray[5]
        }
      }}
    >
      <Text mr="xl" sx={textStyles}>
        Search...
      </Text>
      <Text ml="xl" sx={textStyles}>
        Ctrl + K
      </Text>
    </Button>
  );
}
