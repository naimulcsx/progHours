import { Box, Group, GroupProps, Text, useMantineTheme } from "@mantine/core";
import { SVGProps } from "react";

export function AppIcon(props: SVGProps<SVGSVGElement>) {
  const theme = useMantineTheme();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 32 32"
      style={{
        border:
          theme.colorScheme === "dark"
            ? `1px solid ${theme.colors.dark[8]}`
            : `1px solid ${theme.colors.gray[3]}`,
        borderRadius: 8
      }}
      {...props}
    >
      <g clipPath="url(#clip0_2006_3009)">
        <path fill="#fff" d="M32 0H0v32h32V0z"></path>
        <path fill="url(#paint0_linear_2006_3009)" d="M32 0H0v32h32V0z"></path>
        <path
          fill="#D0D5DD"
          fillRule="evenodd"
          d="M16 2.039c-7.71 0-13.961 6.25-13.961 13.96 0 7.711 6.25 13.962 13.96 13.962 7.711 0 13.962-6.25 13.962-13.961 0-7.71-6.25-13.961-13.961-13.961zM1.96 15.999C1.96 8.247 8.247 1.962 16 1.962c7.753 0 14.039 6.285 14.039 14.039 0 7.753-6.286 14.039-14.04 14.039-7.753 0-14.038-6.286-14.038-14.04z"
          clipRule="evenodd"
        ></path>
        <path
          fill="#D0D5DD"
          fillRule="evenodd"
          d="M16 12.078a3.922 3.922 0 100 7.844 3.922 3.922 0 000-7.844zM12 16a4 4 0 118 0 4 4 0 01-8 0z"
          clipRule="evenodd"
        ></path>
        <path
          fill="#D0D5DD"
          fillRule="evenodd"
          d="M16 13.32a2.68 2.68 0 100 5.36 2.68 2.68 0 000-5.36zM13.243 16a2.757 2.757 0 115.515 0 2.757 2.757 0 01-5.515 0z"
          clipRule="evenodd"
        ></path>
        <path fill="#D0D5DD" d="M15.96 0h.079v32h-.078V0z"></path>
        <path fill="#D0D5DD" d="M32 15.96v.079H0v-.078h32z"></path>
        <path
          fill="#D0D5DD"
          d="M26.602 0h.077v32h-.077V0zM10.64 0h.078v32h-.077V0zM21.281 0h.078v32h-.078V0zM5.32 0h.078v32H5.32V0z"
        ></path>
        <path
          fill="#D0D5DD"
          d="M32 26.602v.077H0v-.077h32zM32 10.64v.078H0v-.077h32zM32 21.281v.078H0v-.078h32zM32 5.32v.078H0V5.32h32z"
        ></path>
        <g clipPath="url(#clip1_2006_3009)">
          <mask
            id="mask0_2006_3009"
            style={{ maskType: "luminance" }}
            width="20"
            height="20"
            x="6"
            y="6"
            maskUnits="userSpaceOnUse"
          >
            <path fill="#fff" d="M6 6h20v20H6V6z"></path>
          </mask>
          <g mask="url(#mask0_2006_3009)">
            <g filter="url(#filter0_d_2006_3009)">
              <path
                fill={theme.colors[theme.primaryColor][6]}
                fillRule="evenodd"
                d="M14.029 6.43a3.6 3.6 0 013.411 0l6.165 3.322a3.53 3.53 0 011.864 3.105v6.286a3.53 3.53 0 01-1.864 3.106L17.44 25.57a3.6 3.6 0 01-3.411 0L7.864 22.25A3.53 3.53 0 016 19.143v-6.286a3.531 3.531 0 011.864-3.105L14.03 6.43z"
                clipRule="evenodd"
              ></path>
            </g>
            <path
              fill="#FBFAFC"
              d="M15.735 19.653c2.047 0 3.707-1.644 3.707-3.672 0-2.029-1.66-3.672-3.707-3.672-2.048 0-3.708 1.643-3.708 3.672 0 2.028 1.66 3.672 3.708 3.672z"
            ></path>
          </g>
        </g>
        <g filter="url(#filter1_b_2006_3009)">
          <path fill="#fff" fillOpacity="0.2" d="M0 16H32V32H0z"></path>
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d_2006_3009"
          width="27.47"
          height="32"
          x="2"
          y="6"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          ></feColorMatrix>
          <feOffset dy="8"></feOffset>
          <feGaussianBlur stdDeviation="2"></feGaussianBlur>
          <feComposite in2="hardAlpha" operator="out"></feComposite>
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.05 0"></feColorMatrix>
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2006_3009"
          ></feBlend>
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_2006_3009"
            result="shape"
          ></feBlend>
        </filter>
        <filter
          id="filter1_b_2006_3009"
          width="42"
          height="26"
          x="-5"
          y="11"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feGaussianBlur
            in="BackgroundImageFix"
            stdDeviation="2.5"
          ></feGaussianBlur>
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_2006_3009"
          ></feComposite>
          <feBlend
            in="SourceGraphic"
            in2="effect1_backgroundBlur_2006_3009"
            result="shape"
          ></feBlend>
        </filter>
        <linearGradient
          id="paint0_linear_2006_3009"
          x1="16"
          x2="16"
          y1="0"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff"></stop>
          <stop offset="1" stopColor="#fff"></stop>
        </linearGradient>
        <clipPath id="clip0_2006_3009">
          <rect width="32" height="32" fill="#fff" rx="8"></rect>
        </clipPath>
        <clipPath id="clip1_2006_3009">
          <path fill="#fff" d="M0 0H20V20H0z" transform="translate(6 6)"></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export function AppLogo({
  size = "md",
  ...props
}: GroupProps & { size?: "sm" | "md" | "lg" }) {
  const theme = useMantineTheme();
  const styles = {
    sm: {
      logoSize: "1.75rem",
      textSize: "0.625rem",
      fontSize: "1rem"
    },
    md: {
      logoSize: "2rem",
      textSize: "0.625rem",
      fontSize: "1rem"
    },
    lg: {
      logoSize: "2.25rem",
      textSize: "0.75rem",
      fontSize: "1.125rem"
    }
  };
  return (
    <Group
      spacing="xs"
      sx={{
        alignItems: "center",
        color: theme.colors[theme.primaryColor][5]
      }}
      {...props}
    >
      <AppIcon width={styles[size].logoSize} height={styles[size].logoSize} />
      <Box>
        <Text
          sx={{
            fontWeight: 700,
            lineHeight: 1.4,
            letterSpacing: -0.075,
            fontSize: styles[size].fontSize,
            color:
              theme.colorScheme === "dark"
                ? theme.white
                : theme.colors[theme.primaryColor][7]
          }}
        >
          progHours
        </Text>
      </Box>
    </Group>
  );
}
