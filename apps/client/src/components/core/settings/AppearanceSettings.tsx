import {
  Box,
  ColorSwatch,
  Group,
  Select,
  Stack,
  Text,
  Title,
  Tooltip,
  useMantineColorScheme,
  useMantineTheme
} from "@mantine/core";
import { PropsWithChildren } from "react";
import { useColorAccent } from "~/contexts/ColorAccentContext";

export function AppearanceSettings() {
  const theme = useMantineTheme();
  const { accentColor, setAccentColor } = useColorAccent();
  const { toggleColorScheme } = useMantineColorScheme();
  return (
    <Stack>
      <SettingsItem
        title="Accent color"
        description="Choose the accent color used throughout the app."
      >
        <Group>
          {Object.keys(theme.colors)
            .filter((color) =>
              [
                "pink",
                "grape",
                "violet",
                "indigo",
                "blue",
                "red",
                "yellow",
                "orange"
              ].includes(color)
            )
            .map((color) => (
              <Tooltip
                key={color}
                label={color.charAt(0).toUpperCase() + color.substring(1)}
              >
                <ColorSwatch
                  sx={{
                    cursor: "pointer",
                    width: "2rem",
                    height: "2rem"
                  }}
                  color={theme.colors[color][6]}
                  onClick={() => {
                    setAccentColor(color);
                  }}
                >
                  {accentColor === color && (
                    <Box
                      sx={{
                        width: 16,
                        height: 16,
                        backgroundColor: theme.white,
                        borderRadius: "50%"
                      }}
                    ></Box>
                  )}
                </ColorSwatch>
              </Tooltip>
            ))}
        </Group>
      </SettingsItem>

      <SettingsItem
        title="Color scheme"
        description="Choose progHour's default color scheme."
      >
        <Select
          placeholder="Pick one"
          maw={160}
          defaultValue={theme.colorScheme}
          onChange={(val) => {
            if (val !== theme.colorScheme) {
              toggleColorScheme();
            }
          }}
          data={[
            { value: "dark", label: "Dark" },
            { value: "light", label: "Light" }
          ]}
        />
      </SettingsItem>
    </Stack>
  );
}

function SettingsItem({
  title,
  description,
  children
}: PropsWithChildren<{
  title: string;
  description: string;
}>) {
  return (
    <Group position="apart">
      <Box mb="sm">
        <Title order={4} fw={600}>
          {title}
        </Title>
        <Text size="sm">{description}</Text>
      </Box>
      <Box>{children}</Box>
    </Group>
  );
}
