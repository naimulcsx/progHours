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
  BadgeProps,
  ModalProps,
  NavbarProps
} from "@mantine/core";
import { DatePickerInputProps } from "@mantine/dates";
import { NotificationProps } from "@mantine/notifications";

const getTitleDefaultProps = (theme: MantineTheme): TitleProps => ({
  color: theme.colorScheme === "dark" ? theme.white : theme.colors.gray[8]
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
    theme.colorScheme === "dark" ? theme.colors.blue[4] : theme.colors.blue[5],
  sx: {
    ":hover": {
      textDecoration: "none"
    }
  }
});

const getTextInputDefaultProps = (theme: MantineTheme): TextInputProps => ({
  styles: {
    input: {},
    label: {}
  }
});

const getPasswordInputDefaultProps = (
  theme: MantineTheme
): PasswordInputProps => ({
  styles: {
    input: {},
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
      borderRadius: 6,
      "&[data-active='true']": {
        background:
          theme.colorScheme === "dark"
            ? theme.colors[theme.primaryColor][9]
            : theme.colors[theme.primaryColor][0],
        "&:hover": {
          background:
            theme.colorScheme === "dark"
              ? theme.colors[theme.primaryColor][9]
              : theme.colors[theme.primaryColor][0]
        },
        "& span": {
          color:
            theme.colorScheme === "dark"
              ? theme.white
              : theme.colors[theme.primaryColor][9]
        }
      },
      "& span": {
        fontWeight: 500
      }
    },
    icon: {
      color: theme.colors.gray[5]
    }
  }
});

const getTableDefaultProps = (theme: MantineTheme): TableProps => {
  return {
    sx: {
      "thead.mantine-DataGrid-thead tr th": {
        paddingTop: 8,
        paddingBottom: 8,
        background:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
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
      input: {},
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
      label: {}
    }
  };
};

const getBadgeDefaultProps = (theme: MantineTheme): BadgeProps => {
  return {
    styles: {
      root: {
        background:
          theme.colorScheme === "dark"
            ? theme.colors.dark[5]
            : theme.colors.gray[1],
        color:
          theme.colorScheme === "dark"
            ? theme.colors.dark[0]
            : theme.colors.dark[3],
        fontWeight: 600
      }
    }
  };
};

const getModalDefaultProps = (theme: MantineTheme): ModalProps => {
  return {
    opened: false,
    /* eslint-disable @typescript-eslint/no-empty-function */
    onClose: () => {},
    styles: {
      header: {
        backgroundColor: theme.colors.dark[6]
      },
      body: {
        backgroundColor: theme.colors.dark[6]
      }
    }
  };
};

const getNavbarDefaultProps = (theme: MantineTheme): NavbarProps => {
  return {
    p: "md",
    children: null,
    width: { base: 0, lg: 264 },
    hidden: true,
    hiddenBreakpoint: "lg",
    styles: {
      root: {
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white
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
    PasswordInput: { defaultProps: getPasswordInputDefaultProps },
    Notification: { defaultProps: getNotificationDefaultProps },
    Paper: { defaultProps: getPaperDefaultProps },
    NavLink: { defaultProps: getNavLinkDefaultProps },
    Table: { defaultProps: getTableDefaultProps },
    Menu: { defaultProps: getMenuDefaultProps },
    DatePickerInput: { defaultProps: getDatePickerInputDefaultProps },
    SegmentedControl: { defaultProps: getSegmentedControlDefaultProps },
    Badge: { defaultProps: getBadgeDefaultProps },
    Modal: { defaultProps: getModalDefaultProps },
    Navbar: { defaultProps: getNavbarDefaultProps }
  },
  colors: {},
  shadows: {
    xs: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
  }
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
