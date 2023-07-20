import {
  Box,
  ColorSwatch,
  Container,
  Group,
  Select,
  Slider,
  Stack,
  Tabs,
  Text,
  Title,
  Tooltip,
  useMantineColorScheme,
  useMantineTheme
} from "@mantine/core";
import { PropsWithChildren, useEffect, useRef } from "react";
import { DashboardLayout } from "~/components/common/dashboard/Layout";
import { useColorAccent } from "~/contexts/ColorAccentContext";

export default function SettingsPage() {
  const theme = useMantineTheme();
  const { accentColor, setAccentColor } = useColorAccent();
  const { toggleColorScheme } = useMantineColorScheme();

  const htmlRef = useRef<HTMLHtmlElement>();
  useEffect(() => {
    htmlRef.current = document.getElementsByTagName("html")[0];
  }, []);

  const MARKS = [
    { value: 0, label: "XS" },
    { value: 25, label: "SM" },
    { value: 50, label: "MD" },
    { value: 75, label: "LG" },
    { value: 100, label: "XL" }
  ];

  return (
    <DashboardLayout>
      <Container>
        <Group>
          <Title order={2}>Settings</Title>
        </Group>

        <Tabs mt="md" defaultValue="appearance">
          <Tabs.List>
            <Tabs.Tab value="appearance">Appearance</Tabs.Tab>
            <Tabs.Tab value="profile">Your Profile</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="appearance">
            <Stack mt="md">
              <SettingsItem
                title="Accent color"
                description="Choose the accent color used throughout the app."
              >
                <Group>
                  {Object.keys(theme.colors)
                    .filter(
                      (color) =>
                        !["red", "yellow", "dark", "gray"].includes(color)
                    )
                    .map((color) => (
                      <Tooltip
                        key={color}
                        label={
                          color.charAt(0).toUpperCase() + color.substring(1)
                        }
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
                title="Base color scheme"
                description="Choose progHour's default color scheme."
              >
                <Select
                  placeholder="Pick one"
                  maw={140}
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

              <SettingsItem
                title="Font scale"
                description="Choose your preffered font scaling."
              >
                <Slider
                  w={240}
                  label={(val) =>
                    MARKS.find((mark) => mark.value === val)!.label
                  }
                  step={25}
                  defaultValue={75}
                  marks={MARKS}
                  onChange={(value) => {
                    const map: Record<string, string> = {
                      0: "85%",
                      25: "90%",
                      50: "95%",
                      75: "100%",
                      100: "105%"
                    };
                    if (htmlRef.current) {
                      setTimeout(() => {
                        htmlRef.current!.style.fontSize = map[value];
                      }, 200);
                    }
                  }}
                />
              </SettingsItem>
            </Stack>
          </Tabs.Panel>
          <Tabs.Panel value="profile">Second panel</Tabs.Panel>
        </Tabs>
      </Container>
    </DashboardLayout>
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
        <Title order={4}>{title}</Title>
        <Text size="sm">{description}</Text>
      </Box>
      <Box>{children}</Box>
    </Group>
  );
}
