import {
  Box,
  ColorSwatch,
  Container,
  Group,
  Select,
  Stack,
  Tabs,
  Text,
  Title,
  Tooltip,
  useMantineColorScheme,
  useMantineTheme
} from "@mantine/core";
import { PropsWithChildren } from "react";
import { DashboardLayout } from "~/components/common/dashboard/Layout";
import { useColorAccent } from "~/contexts/ColorAccentContext";

export default function SettingsPage() {
  const theme = useMantineTheme();
  const { accentColor, setAccentColor } = useColorAccent();
  const { toggleColorScheme } = useMantineColorScheme();
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
                  size="xs"
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

/* 
FONT SCALING

<SettingsItem
  title="Font scale"
  description="Choose your preffered font scaling."
>
  <Select
    size="xs"
    maw={160}
    defaultValue="100%"
    onChange={(val) => {
      const htmlEl = document.querySelector("html");
      if (htmlEl) {
        htmlEl.style.fontSize = val!;
      }
    }}
    data={[
      {
        value: "85%",
        label: "Extra Small"
      },
      {
        value: "90%",
        label: "Small"
      },
      {
        value: "95%",
        label: "Medium"
      },
      {
        value: "100%",
        label: "Normal"
      },
      {
        value: "105%",
        label: "Large"
      }
    ]}
  />
</SettingsItem> 
*/
