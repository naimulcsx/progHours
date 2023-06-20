import {
  AnchorProps,
  ButtonProps,
  MantineTheme,
  MantineThemeOverride,
  PaperProps,
  PasswordInputProps,
  TextInputProps,
  TextProps,
  TitleProps,
  NavLinkProps,
  TableProps
} from "@mantine/core";
import { NotificationProps } from "@mantine/notifications";

const getTitleDefaultProps = (theme: MantineTheme): TitleProps => ({
  color: theme.colorScheme === "dark" ? theme.white : theme.colors.dark[9]
});

const getTextDefaultProps = (theme: MantineTheme): TextProps => ({
  color:
    theme.colorScheme === "dark" ? theme.colors.gray[4] : theme.colors.gray[7]
});

const getButtonDefaultProps = (theme: MantineTheme): ButtonProps => ({
  sx: {
    fontWeight: 600
  }
});

const getAnchorDefaultProps = (theme: MantineTheme): AnchorProps => ({
  color:
    theme.colorScheme === "dark" ? theme.colors.blue[4] : theme.colors.blue[5]
});

const getTextInputDefaultProps = (theme: MantineTheme): TextInputProps => ({
  styles: {
    label: {
      fontWeight: 600
    }
  }
});

const getPasswordInputDefaultProps = (
  theme: MantineTheme
): PasswordInputProps => ({
  styles: {
    label: {
      fontWeight: 600
    }
  }
});

const getNotificationDefaultProps = (
  theme: MantineTheme
): Omit<NotificationProps, "message"> => ({
  styles: {
    root: {
      boxShadow: theme.shadows.xs,
      ...(theme.colorScheme === "dark" && {
        boxShadow:
          "rgba(0, 0, 0, 0.25) 0px 4px 8px -4px, rgba(0, 0, 0, 0.04) 0px -1px 1px inset, rgba(255, 255, 255, 0.06) 0px 2px 0px inset"
      })
    },
    title: {
      fontWeight: 600,
      color: theme.colorScheme === "dark" ? theme.white : theme.colors.dark[9]
    },
    description: {
      color:
        theme.colorScheme === "dark"
          ? theme.colors.gray[4]
          : theme.colors.gray[7]
    }
  }
});

const getPaperDefaultProps = (theme: MantineTheme): PaperProps => ({
  sx: {
    ...(theme.colorScheme === "light" && {
      border: `1px solid ${theme.colors.gray[2]}`
    }),
    ...(theme.colorScheme === "dark" && {
      boxShadow:
        "rgba(0, 0, 0, 0.25) 0px 4px 8px -4px, rgba(0, 0, 0, 0.04) 0px -1px 1px inset, rgba(255, 255, 255, 0.06) 0px 2px 0px inset"
    })
  }
});

const getNavLinkDefaultProps = (theme: MantineTheme): NavLinkProps => ({
  styles: {
    root: {
      background: "transparent",
      borderRadius: theme.radius.md,
      paddingLeft: 4,
      paddingRight: 4,
      "&[data-active='true']": {
        "&:hover": {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[4]
              : theme.colors.gray[2]
        },

        background:
          theme.colorScheme === "dark"
            ? theme.colors.dark[5]
            : theme.colors.gray[1],
        boxShadow:
          theme.colorScheme === "dark"
            ? "inset 0px 1px 1px rgb(255 255 255 / 15%)"
            : "none",

        "& span": {
          color:
            theme.colorScheme === "dark" ? theme.white : theme.colors.dark[8]
        }
      },
      "& span": {
        fontWeight: 600
      }
    }
  }
});

const getTableDefaultProps = (theme: MantineTheme): TableProps => {
  return {
    verticalSpacing: "sm",
    horizontalSpacing: "md",
    sx: {
      background:
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      "thead tr th": {
        borderBottom: "2px solid"
      },
      "tbody tr td, thead tr th": {
        borderColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[5]
            : theme.colors.gray[3],
        verticalAlign: "top"
      }
    }
  };
};

const theme: MantineThemeOverride = {
  colorScheme: "dark",
  defaultRadius: "md",
  fontFamily: "Manrope, sans-serif",
  components: {
    Text: { defaultProps: getTextDefaultProps },
    Title: { defaultProps: getTitleDefaultProps },
    Button: { defaultProps: getButtonDefaultProps },
    Anchor: { defaultProps: getAnchorDefaultProps },
    TextInput: { defaultProps: getTextInputDefaultProps },
    PasswordInputProps: { defaultProps: getPasswordInputDefaultProps },
    Notification: { defaultProps: getNotificationDefaultProps },
    Paper: { defaultProps: getPaperDefaultProps },
    NavLink: { defaultProps: getNavLinkDefaultProps },
    Table: { defaultProps: getTableDefaultProps }
  },
  colors: {
    dark: [
      "#eceef2",
      "#d4d8e3",
      "#8390ad",
      "#637394", // [3] input placeholder text
      "#3c455d", // [4] input border
      "#282e3e",
      "#242936", // [6] input bg
      "#1a1d26", // [7] navbar bg, sidebar bg, paper bg
      "#13151c", // [8] body bg
      "#0c0d12" // [9] title color
    ]
  }
};

export default theme;
