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
  NavbarProps,
  SelectProps,
  AppShellProps,
  TabsProps,
  DividerProps
} from "@mantine/core";
import { DatePickerInputProps } from "@mantine/dates";
import { NotificationProps } from "@mantine/notifications";

export const shadow3d =
  "rgba(0, 0, 0, 0.25) 0px 4px 8px -4px, rgba(0, 0, 0, 0.04) 0px -1px 1px inset, rgba(255, 255, 255, 0.06) 0px 2px 0px inset";

/**
 * Typography Styles
 */
const getTitleDefaultProps = (theme: MantineTheme): TitleProps => ({
  color: theme.colorScheme === "dark" ? theme.white : theme.colors.dark[4]
});
const getTextDefaultProps = (theme: MantineTheme): TextProps => ({
  color:
    theme.colorScheme === "dark" ? theme.colors.gray[5] : theme.colors.gray[7]
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

/**
 * Buttons
 */
const getButtonDefaultProps = (theme: MantineTheme): ButtonProps => ({
  sx: {
    fontWeight: 500
  }
});

/**
 * Input styles
 */
function getBorderColor(theme: MantineTheme) {
  return theme.colorScheme === "dark"
    ? theme.colors.dark[4]
    : theme.colors.gray[2];
}
const getTextInputDefaultProps = (theme: MantineTheme): TextInputProps => ({
  styles: {
    input: {
      background: "transparent",
      borderColor: getBorderColor(theme),
      "&:disabled": {
        background:
          theme.colorScheme === "dark"
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
      }
    }
  }
});
const getPasswordInputDefaultProps = (
  theme: MantineTheme
): PasswordInputProps => ({
  styles: {
    input: { background: "transparent", borderColor: getBorderColor(theme) },
    label: {}
  }
});
const getSelectDefaultProps = (theme: MantineTheme): SelectProps => {
  return {
    data: [],
    styles: {
      input: {
        background: "transparent",
        borderColor: getBorderColor(theme)
      },
      dropdown: {
        background:
          theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
      }
    }
  };
};

const getNotificationDefaultProps = (
  theme: MantineTheme
): Omit<NotificationProps, "message"> => ({
  styles: {
    root: {
      paddingTop: 16,
      paddingBottom: 16,
      background:
        theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,
      boxShadow: theme.shadows.lg,
      border:
        theme.colorScheme === "dark" ? 0 : `1px solid ${theme.colors.dark[4]}`,
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
          ? theme.colors.gray[3]
          : theme.colors.gray[7]
    }
  }
});

const getPaperDefaultProps = (theme: MantineTheme): PaperProps => ({
  sx: {
    padding: theme.spacing.lg,
    borderRadius: theme.radius.md,
    background:
      theme.colorScheme === "dark"
        ? `linear-gradient(to bottom right, ${theme.colors.dark[6]}, ${theme.colors.dark[8]})`
        : theme.white,
    ...(theme.colorScheme === "light" && {
      border: `1px solid ${theme.fn.rgba(theme.colors.gray[2], 0.8)}`,
      boxShadow: theme.shadows.xs
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
      position: "relative",
      background: "transparent",
      borderRadius: 6,
      "&:hover": {
        background:
          theme.colorScheme === "dark"
            ? theme.colors.dark[5]
            : theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.1)
      },
      "&[data-active='true']": {
        background:
          theme.colorScheme === "dark"
            ? theme.colors.dark[5]
            : theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.1),
        "&:hover": {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[5]
              : theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.125)
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
      color:
        theme.colorScheme === "dark"
          ? theme.colors.gray[6]
          : theme.colors.gray[5]
    }
  }
});

const getTableDefaultProps = (theme: MantineTheme): TableProps => {
  const styles = {
    borderColor:
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
  };
  return {
    sx: {
      "tbody tr td": styles,
      "thead tr th": styles
    }
  };
};

const getDatePickerInputDefaultProps = (
  theme: MantineTheme
): DatePickerInputProps => {
  return {
    styles: {
      input: {
        border: `1px solid ${
          theme.colorScheme === "dark"
            ? theme.colors.dark[4]
            : theme.colors.gray[3]
        }`
      },
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
    },
    styles: {
      dropdown: {
        background:
          theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.white
      }
    }
  };
};

const getSegmentedControlDefaultProps = (
  theme: MantineTheme
): SegmentedControlProps => {
  return {
    data: [],
    styles: {
      root: {
        background:
          theme.colorScheme === "dark"
            ? theme.fn.darken(theme.colors.dark[4], 0.5)
            : theme.colors.gray[1]
      }
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
            : theme.colors.dark[4],
        fontWeight: 500
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
        borderColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.fn.rgba(theme.colors.gray[2], 0.75),
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.white
      }
    }
  };
};

const getAppShellDefaultProps = (
  theme: MantineTheme
): Omit<AppShellProps, "children"> => {
  return {
    styles: {
      main: {
        width: "calc(100vw - 15px)"
      }
    }
  };
};

const getTabsDefaultProps = (
  theme: MantineTheme
): Omit<TabsProps, "children"> => {
  return {
    styles: {
      tab: {
        fontWeight: 500,
        "&[data-active=true]": {
          span: {
            color:
              theme.colorScheme === "dark" ? theme.white : theme.colors.dark[9]
          }
        }
      },
      tabLabel: {
        color:
          theme.colorScheme === "dark"
            ? theme.colors.gray[5]
            : theme.colors.gray[6]
      }
    }
  };
};

const getDividierDefaultProps = (theme: MantineTheme): DividerProps => {
  return {
    variant: "dotted",
    styles: {
      label: {}
    }
  };
};

const theme: MantineThemeOverride = {
  colorScheme: "dark",
  defaultRadius: "md",
  fontFamily: "'Rubik', sans-serif",
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
    Navbar: { defaultProps: getNavbarDefaultProps },
    Select: { defaultProps: getSelectDefaultProps },
    AppShell: { defaultProps: getAppShellDefaultProps },
    Tabs: { defaultProps: getTabsDefaultProps },
    Divider: { defaultProps: getDividierDefaultProps }
  },
  colors: {
    gray: [
      "#f4f3f7",
      "#F1F5F9",
      "#DFE5EE",
      "#D7DFEA",
      "#C7CFDA",
      "#A8B5C6",
      "#687281",
      "#334155",
      "#0F172A",
      "#020617"
    ],
    dark: [
      "#D2D2D4",
      "#9CA0AC",
      "#a3a8b4",
      "#52596D", // [3] input placeholder text
      "#1F2937", // [4] input border
      "#1C2532",
      "#19212C", // [6] input bg
      "#161D27",
      "#121821", // HSL(224°, 35%, 10%)
      "#030712" // HSL(224°, 71%, 4%) [9] body bg, title color
    ]
  },
  shadows: {
    xs: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
    "3d": shadow3d
  }
};

export default theme;
