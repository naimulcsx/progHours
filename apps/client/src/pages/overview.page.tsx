import {
  Box,
  Button,
  ColorSwatch,
  Group,
  Tooltip,
  useMantineTheme
} from "@mantine/core";
import { useActiveUser } from "@proghours/data-access";
import { DashboardLayout } from "~/components/common/dashboard/Layout";
import { useColorAccent } from "~/contexts/ColorAccentContext";
import { useLogout } from "~/hooks/useLogout";

export default function OverviewPage() {
  const { data } = useActiveUser();
  const { handleLogout } = useLogout();
  const theme = useMantineTheme();
  const { accentColor, setAccentColor } = useColorAccent();
  return (
    <DashboardLayout>
      Overview page
      <Button onClick={handleLogout}>Log out</Button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <Group>
        {Object.keys(theme.colors)
          .filter((color) => !["dark", "gray"].includes(color))
          .map((color) => (
            <Tooltip
              key={color}
              label={color.charAt(0).toUpperCase() + color.substring(1)}
            >
              <ColorSwatch
                sx={{
                  cursor: "pointer",
                  width: 32,
                  height: 32
                }}
                color={theme.colors[color][6]}
                onClick={() => {
                  setAccentColor(color);
                }}
              >
                {accentColor === color && (
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      backgroundColor: theme.white,
                      borderRadius: "50%"
                    }}
                  ></Box>
                )}
              </ColorSwatch>
            </Tooltip>
          ))}
      </Group>
    </DashboardLayout>
  );
}
