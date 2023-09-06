import { PropsWithChildren } from "react";

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

import {
  AccentColor,
  useAccentColor
} from "~/modules/common/contexts/AccentColorContext";
import { resolvers } from "~/theme";

const accentColors: AccentColor[] = [
  "green",
  "violet",
  "blue",
  "orange",
  "rose"
];

export function AppearanceSettings() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { accentColor, setAccentColor } = useAccentColor();
  const theme = useMantineTheme();
  return (
    <Stack>
      <SettingsItem
        title="Accent color"
        description="Choose the accent color used throughout the app."
      >
        <Group>
          {accentColors.map((color) => {
            const bg = resolvers[color](theme).light["--primary"];
            console.log(bg);
            return (
              <Tooltip
                key={color}
                label={color.charAt(0).toUpperCase() + color.substring(1)}
              >
                <ColorSwatch
                  style={{
                    cursor: "pointer",
                    width: "2rem",
                    height: "2rem"
                  }}
                  color={`hsl(${bg})`}
                  onClick={() => {
                    setAccentColor(color as AccentColor);
                  }}
                >
                  {color === accentColor && (
                    <Box
                      style={{
                        width: 16,
                        height: 16,
                        backgroundColor: theme.white,
                        borderRadius: "50%"
                      }}
                    ></Box>
                  )}
                </ColorSwatch>
              </Tooltip>
            );
          })}
        </Group>
      </SettingsItem>

      <SettingsItem
        title="Color scheme"
        description="Choose progHour's default color scheme."
      >
        <Select
          placeholder="Pick one"
          maw={160}
          defaultValue={colorScheme}
          onChange={(val) => {
            if (val !== colorScheme) {
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
    <Group justify="space-between">
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
