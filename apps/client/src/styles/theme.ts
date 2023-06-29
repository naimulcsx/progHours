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
  TableProps,
  MenuProps,
  SegmentedControlProps,
  BadgeProps
} from "@mantine/core";
import { DatePickerInputProps } from "@mantine/dates";
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
    fontWeight: 500
  }
});

const getAnchorDefaultProps = (theme: MantineTheme): AnchorProps => ({
  color:
    theme.colorScheme === "dark" ? theme.colors.blue[4] : theme.colors.blue[5]
});

const getTextInputDefaultProps = (theme: MantineTheme): TextInputProps => ({
  styles: {
    label: {}
  }
});

const getPasswordInputDefaultProps = (
  theme: MantineTheme
): PasswordInputProps => ({
  styles: {
    label: {}
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
      paddingLeft: 16,
      paddingRight: 16,
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

        "& span": {
          color:
            theme.colorScheme === "dark" ? theme.white : theme.colors.dark[9]
        },
        "&:before": {
          content: "''",
          position: "absolute",
          left: 0,
          height: 42,
          display: "block",
          width: 3,
          background: theme.colors[theme.primaryColor][5]
        }
      },
      "& span": {
        fontWeight: 500
      }
    },
    icon: {
      color: theme.colors.gray[6]
    }
  }
});

const getTableDefaultProps = (theme: MantineTheme): TableProps => {
  return {
    sx: {
      "thead.mantine-DataGrid-thead tr th": {
        background:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[1],
        border: 0,
        "&:first-of-type": {
          borderTopLeftRadius: theme.radius.md,
          borderBottomLeftRadius: theme.radius.md
        },
        "&:last-of-type": {
          borderTopRightRadius: theme.radius.md,
          borderBottomRightRadius: theme.radius.md
        }
      }
    }
  };
};

const getDatePickerInputDefaultProps = (
  theme: MantineTheme
): DatePickerInputProps => {
  return {
    styles: {
      weekdaysRow: {
        th: {
          fontSize: "0.75rem !important",
          padding: "0 !important",
          paddingBottom: "calc(0.625rem / 2) !important"
        }
      }
    }
  };
};

const getMenuDefaultProps = (theme: MantineTheme): MenuProps => {
  return {
    transitionProps: {
      transition: "pop"
    }
  };
};

const getSegmentedControlDefaultProps = (
  theme: MantineTheme
): SegmentedControlProps => {
  return {
    data: [],
    styles: {
      label: {
        paddingTop: 3,
        paddingBottom: 3
      }
    }
  };
};

const getBadgeDefaultProps = (theme: MantineTheme): BadgeProps => {
  return {
    styles: {
      root: {
        background: theme.colors.dark[5],
        color: theme.colors.dark[0]
      }
    }
  };
};

const theme: MantineThemeOverride = {
  colorScheme: "dark",
  defaultRadius: "md",
  fontFamily: "'Inter', sans-serif",
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
    Table: { defaultProps: getTableDefaultProps },
    Menu: { defaultProps: getMenuDefaultProps },
    DatePickerInput: { defaultProps: getDatePickerInputDefaultProps },
    SegmentedControl: { defaultProps: getSegmentedControlDefaultProps },
    Badge: { defaultProps: getBadgeDefaultProps }
  },
  colors: {}
};

/**
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
 */

export default theme;
