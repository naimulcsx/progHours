import { Button, Text, useMantineTheme } from "@mantine/core";
import { openSpotlight } from "@mantine/spotlight";
import { IconSearch } from "~/assets/icons";

export default function SpotlightButton() {
  const theme = useMantineTheme();
  return (
    <Button
      leftIcon={<IconSearch height={20} width={20} />}
      variant="outline"
      color="gray"
      onClick={() => openSpotlight()}
      styles={{
        root: {
          boxShadow: theme.shadows.xs,
          width: "100%",
          borderColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[4]
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
      <Text mr="xl" sx={{ color: theme.colors.gray[6], fontWeight: 400 }}>
        Search...
      </Text>
    </Button>
  );
}
