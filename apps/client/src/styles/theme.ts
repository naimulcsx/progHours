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
    input: {
      border: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[3]
      }`
    },
    label: {}
  }
});

const getPasswordInputDefaultProps = (
  theme: MantineTheme
): PasswordInputProps => ({
  styles: {
    input: {
      border: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[3]
      }`
    },
    label: {}
  }
});

const getSelectDefaultProps = (theme: MantineTheme): SelectProps => {
  return {
    data: [],
    styles: {
      input: {
        border: `1px solid ${
          theme.colorScheme === "dark"
            ? theme.colors.dark[4]
            : theme.colors.gray[3]
        }`
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
    background:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
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
      position: "relative",
      background: "transparent",
      borderRadius: 6,
      "&[data-active='true']": {
        background:
          theme.colorScheme === "dark"
            ? theme.fn.rgba(theme.colors[theme.primaryColor][3], 0.1)
            : theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.1),
        "&:hover": {
          background:
            theme.colorScheme === "dark"
              ? theme.fn.rgba(theme.colors[theme.primaryColor][3], 0.1)
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
      color: theme.colors.gray[6]
    }
  }
});

const getTableDefaultProps = (theme: MantineTheme): TableProps => {
  return {
    sx: {
      "tr th": {
        paddingTop: 8,
        paddingBottom: 8,
        background:
          theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white
      }
    },
    styles: {}
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
            ? theme.colors.dark[5]
            : theme.colors.gray[2],
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.fn.rgba(theme.colors[theme.primaryColor][0], 0.25)
      }
    }
  };
};

const getAppShellDefaultProps = (
  theme: MantineTheme
): Omit<AppShellProps, "children"> => {
  return {
    styles: {
      main: {}
    }
  };
};

const getTabsDefaultProps = (
  theme: MantineTheme
): Omit<TabsProps, "children"> => {
  const borderBottomColor =
    theme.colorScheme === "dark"
      ? theme.colors[theme.primaryColor][3]
      : theme.colors[theme.primaryColor][5];
  return {
    sx: {
      "button[data-active]": {
        background:
          theme.colorScheme === "dark"
            ? theme.colors.dark[5]
            : theme.colors[theme.primaryColor][0],
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        borderBottomColor,
        "&:hover": {
          borderBottomColor
        }
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
      "#E5EDF4",
      "#D7DFEA",
      "#C7CFDA",
      "#A8B5C6",
      "#94A3B8",
      "#334155",
      "#0F172A",
      "#020617"
    ],
    dark: [
      "#cdc8d8",
      "#8d879e",
      "#6c6583",
      "#5C5475",
      "#403b52", // [4] input border
      "#2d2939",
      "#262331", // [6] input bg
      "#1E1B26",
      "#16141C",
      "#121016"
    ]
    // dark: [
    //   "#C1C7D6",
    //   "#A8B1C6",
    //   "#909BB6",
    //   "#505C7C", // [3] input placeholder text
    //   "#3C455D", // [4] input border
    //   "#353D53",
    //   "#2F3648", // [6] input bg
    //   "#212634", // [7] navbar bg, sidebar bg, paper bg
    //   "#1B1F29",
    //   "#16141c" // [9] body bg, title color
    // ]
  },
  shadows: {
    xs: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
  }
};

export default theme;

// dark color scheme
// [
//   "#DFE4E8",
//   "#BFC8D0",
//   "#97A5B1",
//   "#566676", // [3] input placeholder text
//   "#39414C", // [4] input border
//   "#323942",
//   "#2A3039", // [6] input bg
//   "#1C2025", // [7] navbar bg, sidebar bg, paper bg
//   "#15171B",
//   "#0E0F11" // [8] body bg, title color, alt #0B0D0F
// ];
