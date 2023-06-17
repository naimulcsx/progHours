import {
  Box,
  Group,
  GroupProps,
  Text,
  Title,
  TitleOrder,
  useMantineTheme
} from "@mantine/core";
import { SVGProps } from "react";

export function AppIcon(props: SVGProps<SVGSVGElement>) {
  const theme = useMantineTheme();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill={theme.colors[theme.primaryColor][6]}
        fillRule="evenodd"
        d="M9.898.516a4.544 4.544 0 014.204 0l7.6 3.986C23.119 5.244 24 6.674 24 8.228v7.544c0 1.554-.881 2.984-2.297 3.726l-7.6 3.986a4.544 4.544 0 01-4.205 0l-7.6-3.986C.88 18.756 0 17.326 0 15.773V8.228c0-1.554.881-2.984 2.298-3.726l7.6-3.986z"
        clipRule="evenodd"
      ></path>
      <ellipse
        cx="12"
        cy="11.752"
        fill="#FBFAFC"
        rx="4.571"
        ry="4.407"
      ></ellipse>
    </svg>
  );
}

export function AppLogo({
  size = "md",
  ...props
}: GroupProps & { size?: "sm" | "md" }) {
  const theme = useMantineTheme();
  const styles = {
    sm: {
      logoSize: 28,
      textSize: "10px",
      titleOrder: 5
    },
    md: {
      logoSize: 40,
      textSize: "xs",
      titleOrder: 3
    }
  };
  return (
    <Group
      spacing="sm"
      sx={{
        alignItems: "center",
        color: theme.colors[theme.primaryColor][5]
      }}
      {...props}
    >
      <AppIcon width={styles[size].logoSize} height={styles[size].logoSize} />
      <Box>
        <Title
          order={styles[size].titleOrder as TitleOrder}
          sx={{
            color:
              theme.colorScheme === "dark" ? theme.white : theme.colors.blue[5]
          }}
        >
          progHours
        </Title>
        <Text
          size={styles[size].textSize}
          sx={{
            color:
              theme.colorScheme === "dark" ? theme.white : theme.colors.blue[5]
          }}
        >
          v0.4.0
        </Text>
      </Box>
    </Group>
  );
}
