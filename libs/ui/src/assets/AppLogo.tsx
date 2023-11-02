import { SVGProps } from "react";

import { Badge, Flex, Group, GroupProps, Text } from "@mantine/core";

export function AppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 20 20"
      {...props}
    >
      <path
        fill="hsl(var(--primary))"
        fillRule="evenodd"
        d="M8.247.43a3.778 3.778 0 013.505 0l6.333 3.322c.578.3 1.06.748 1.398 1.295A3.46 3.46 0 0120 6.857v6.286a3.46 3.46 0 01-.517 1.81c-.337.547-.82.995-1.398 1.296l-6.333 3.321a3.778 3.778 0 01-3.505 0L1.915 16.25a3.587 3.587 0 01-1.398-1.296A3.46 3.46 0 010 13.143V6.857a3.46 3.46 0 01.517-1.81c.337-.547.82-.994 1.398-1.295L8.247.43z"
        clipRule="evenodd"
      ></path>
      <path
        fill="#FBFAFC"
        d="M10 13.653c2.103 0 3.809-1.644 3.809-3.672 0-2.029-1.706-3.672-3.809-3.672S6.191 7.952 6.191 9.98c0 2.028 1.705 3.672 3.809 3.672z"
      ></path>
    </svg>
  );
}

export function AppLogo({
  size = "md",
  iconOnly = false,
  ...props
}: GroupProps & { size?: "sm" | "md" | "lg"; iconOnly?: boolean }) {
  const styles = {
    sm: {
      logoSize: "30px",
      fontSize: "20px"
    },
    md: {
      logoSize: "2rem",
      fontSize: "1.125rem"
    },
    lg: {
      logoSize: "2rem",
      fontSize: "1.125rem"
    }
  };
  return (
    <Group
      gap="xs"
      style={{
        alignItems: "center"
      }}
      {...props}
    >
      <Flex style={{ margin: iconOnly ? "0 auto" : 0 }}>
        <AppIcon width={styles[size].logoSize} height={styles[size].logoSize} />
      </Flex>
      {!iconOnly && (
        <>
          <Text
            style={{
              fontSize: styles[size].fontSize,
              fontWeight: 700,
              color: "hsl(var(--accent-foreground))"
            }}
          >
            progHours
          </Text>
          <Badge>beta</Badge>
        </>
      )}
    </Group>
  );
}
