import {
  Accordion,
  ActionIcon,
  Anchor,
  AppShell,
  AppShellHeader,
  AppShellNavbar,
  Badge,
  Button,
  CSSVariablesResolver,
  Container,
  Divider,
  Input,
  Menu,
  Modal,
  NavLink,
  Notification,
  Paper,
  PasswordInput,
  Popover,
  SegmentedControl,
  Select,
  Table,
  Tabs,
  TagsInput,
  Text,
  TextInput,
  Title,
  createTheme,
  rem
} from "@mantine/core";

import { AccentColor } from "~/modules/common/contexts/AccentColorContext";

import accordionClasses from "./css/Accordion.module.css";
import actionIconClasses from "./css/ActionIcon.module.css";
import anchorClasses from "./css/Anchor.module.css";
import appShellClasses from "./css/AppShell.module.css";
import badgeClasses from "./css/Badge.module.css";
import buttonClasses from "./css/Button.module.css";
import containerClasses from "./css/Container.module.css";
import dividerClasses from "./css/Divider.module.css";
import inputClasses from "./css/Input.module.css";
import menuClasses from "./css/Menu.module.css";
import modalClasses from "./css/Modal.module.css";
import navlinkClasses from "./css/NavLink.module.css";
import notificationClasses from "./css/Notification.module.css";
import paperClasses from "./css/Paper.module.css";
import passwordInputClasses from "./css/PasswordInput.module.css";
import popoverClasses from "./css/Popover.module.css";
import segmentedControlClasses from "./css/SegmentedControl.module.css";
import selectClasses from "./css/Select.module.css";
import tableClasses from "./css/Table.module.css";
import tabsClasses from "./css/Tabs.module.css";
import tagsInputClasses from "./css/TagsInput.module.css";
import textClasses from "./css/Text.module.css";
import textInputClasses from "./css/TextInput.module.css";
import titleClasses from "./css/Title.module.css";

export const resolvers: Record<AccentColor, CSSVariablesResolver> = {
  blue: () => ({
    variables: { "--radius": "0.5rem" },
    light: {
      "--background": "0 0% 100%",
      "--foreground": "222.2 84% 4.9%",
      "--card": "0 0% 100%",
      "--card-foreground": "222.2 84% 4.9%",
      "--popover": "0 0% 100%",
      "--popover-foreground": "222.2 84% 4.9%",
      "--primary": "221.2 83.2% 53.3%",
      "--primary-foreground": "210 40% 98%",
      "--secondary": "210 40% 96.1%",
      "--secondary-foreground": "222.2 47.4% 11.2%",
      "--muted": "210 40% 96.1%",
      "--muted-foreground": "215.4 16.3% 46.9%",
      "--accent": "210 40% 96.1%",
      "--accent-foreground": "222.2 47.4% 11.2%",
      "--destructive": "0 84.2% 60.2%",
      "--destructive-foreground": "210 40% 98%",
      "--border": "214.3 31.8% 91.4%",
      "--input": "214.3 31.8% 91.4%",
      "--ring": "221.2 83.2% 53.3%"
    },
    dark: {
      "--background": "222.2 84% 6%",
      "--foreground": "210 40% 98%",
      "--card": "222.2 84% 4.9%",
      "--card-foreground": "210 40% 98%",
      "--popover": "222.2 84% 4.9%",
      "--popover-foreground": "210 40% 98%",
      "--primary": "217.2 91.2% 62.8%",
      "--primary-foreground": "0 0% 100%",
      "--secondary": "217.2 32.6% 17.5%",
      "--secondary-foreground": "210 40% 98%",
      "--muted": "217.2 32.6% 17.5%",
      "--muted-foreground": "215 20.2% 65.1%",
      "--accent": "217.2 32.6% 17.5%",
      "--accent-foreground": "210 40% 98%",
      "--destructive": "0 62.8% 30.6%",
      "--destructive-foreground": "210 40% 98%",
      "--border": "217.2 32.6% 17.5%",
      "--input": "217.2 32.6% 17.5%",
      "--ring": "224.3 76.3% 48%"
    }
  }),
  green: () => ({
    variables: { "--radius": "0.5rem" },
    light: {
      "--background": "0 0% 100%",
      "--foreground": "240 10% 3.9%",
      "--card": "0 0% 100%",
      "--card-foreground": "240 10% 3.9%",
      "--popover": "0 0% 100%",
      "--popover-foreground": "240 10% 3.9%",
      "--primary": "142.1 76.2% 36.3%",
      "--primary-foreground": "355.7 100% 97.3%",
      "--secondary": "240 4.8% 95.9%",
      "--secondary-foreground": "240 5.9% 10%",
      "--muted": "240 4.8% 95.9%",
      "--muted-foreground": "240 3.8% 46.1%",
      "--accent": "240 4.8% 95.9%",
      "--accent-foreground": "240 5.9% 10%",
      "--destructive": "0 84.2% 60.2%",
      "--destructive-foreground": "0 0% 98%",
      "--border": "240 5.9% 90%",
      "--input": "240 5.9% 90%",
      "--ring": "142.1 76.2% 36.3%"
    },
    dark: {
      "--background": "20 14.3% 4.1%",
      "--foreground": "0 0% 95%",
      "--card": "24 9.8% 10%",
      "--card-foreground": "0 0% 95%",
      "--popover": "0 0% 9%",
      "--popover-foreground": "0 0% 95%",
      "--primary": "142.1 70.6% 45.3%",
      "--primary-foreground": "144.9 80.4% 10%",
      "--secondary": "240 3.7% 15.9%",
      "--secondary-foreground": "0 0% 98%",
      "--muted": "0 0% 15%",
      "--muted-foreground": "240 5% 64.9%",
      "--accent": "12 6.5% 15.1%",
      "--accent-foreground": "0 0% 98%",
      "--destructive": "0 62.8% 30.6%",
      "--destructive-foreground": "0 85.7% 97.3%",
      "--border": "240 3.7% 15.9%",
      "--input": "240 3.7% 15.9%",
      "--ring": "142.4 71.8% 29.2%"
    }
  }),
  violet: () => ({
    variables: { "--radius": "0.5rem" },
    light: {
      "--background": "0 0% 100%",
      "--foreground": "224 71.4% 4.1%",
      "--card": "0 0% 100%",
      "--card-foreground": "224 71.4% 4.1%",
      "--popover": "0 0% 100%",
      "--popover-foreground": "224 71.4% 4.1%",
      "--primary": "262.1 83.3% 57.8%",
      "--primary-foreground": "210 20% 98%",
      "--secondary": "220 14.3% 95.9%",
      "--secondary-foreground": "220.9 39.3% 11%",
      "--muted": "220 14.3% 95.9%",
      "--muted-foreground": "220 8.9% 46.1%",
      "--accent": "220 14.3% 95.9%",
      "--accent-foreground": "220.9 39.3% 11%",
      "--destructive": "0 84.2% 60.2%",
      "--destructive-foreground": "210 20% 98%",
      "--border": "220 13% 91%",
      "--input": "220 13% 91%",
      "--ring": "262.1 83.3% 57.8%"
    },
    dark: {
      "--background": "224 71.4% 4.1%",
      "--foreground": "210 20% 98%",
      "--card": "224 71.4% 4.1%",
      "--card-foreground": "210 20% 98%",
      "--popover": "224 71.4% 4.1%",
      "--popover-foreground": "210 20% 98%",
      "--primary": "263.4 70% 61.4%",
      "--primary-foreground": "210 20% 98%",
      "--secondary": "215 27.9% 16.9%",
      "--secondary-foreground": "210 20% 98%",
      "--muted": "215 27.9% 16.9%",
      "--muted-foreground": "217.9 10.6% 64.9%",
      "--accent": "215 27.9% 16.9%",
      "--accent-foreground": "210 20% 98%",
      "--destructive": "0 62.8% 30.6%",
      "--destructive-foreground": "210 20% 98%",
      "--border": "215 27.9% 16.9%",
      "--input": "215 27.9% 16.9%",
      "--ring": "263.4 70% 50.4%"
    }
  }),
  orange: () => ({
    variables: { "--radius": "0.5rem" },
    light: {
      "--background": "0 0% 100%",
      "--foreground": "20 14.3% 4.1%",
      "--card": "0 0% 100%",
      "--card-foreground": "20 14.3% 4.1%",
      "--popover": "0 0% 100%",
      "--popover-foreground": "20 14.3% 4.1%",
      "--primary": "24.6 95% 53.1%",
      "--primary-foreground": "60 9.1% 97.8%",
      "--secondary": "60 4.8% 95.9%",
      "--secondary-foreground": "24 9.8% 10%",
      "--muted": "60 4.8% 95.9%",
      "--muted-foreground": "25 5.3% 44.7%",
      "--accent": "60 4.8% 95.9%",
      "--accent-foreground": "24 9.8% 10%",
      "--destructive": "0 84.2% 60.2%",
      "--destructive-foreground": "60 9.1% 97.8%",
      "--border": "20 5.9% 90%",
      "--input": "20 5.9% 90%",
      "--ring": "24.6 95% 53.1%"
    },
    dark: {
      "--background": "20 14.3% 4.1%",
      "--foreground": "60 9.1% 97.8%",
      "--card": "20 14.3% 4.1%",
      "--card-foreground": "60 9.1% 97.8%",
      "--popover": "20 14.3% 4.1%",
      "--popover-foreground": "60 9.1% 97.8%",
      "--primary": "20.5 90.2% 48.2%",
      "--primary-foreground": "60 9.1% 97.8%",
      "--secondary": "12 6.5% 15.1%",
      "--secondary-foreground": "60 9.1% 97.8%",
      "--muted": "12 6.5% 15.1%",
      "--muted-foreground": "24 5.4% 63.9%",
      "--accent": "12 6.5% 15.1%",
      "--accent-foreground": "60 9.1% 97.8%",
      "--destructive": "0 72.2% 50.6%",
      "--destructive-foreground": "60 9.1% 97.8%",
      "--border": "12 6.5% 15.1%",
      "--input": "12 6.5% 15.1%",
      "--ring": "20.5 90.2% 48.2%"
    }
  }),
  rose: () => ({
    variables: { "--radius": "0.5rem" },
    light: {
      "--background": "0 0% 100%",
      "--foreground": "240 10% 3.9%",
      "--card": "0 0% 100%",
      "--card-foreground": "240 10% 3.9%",
      "--popover": "0 0% 100%",
      "--popover-foreground": "240 10% 3.9%",
      "--primary": "346.8 77.2% 49.8%",
      "--primary-foreground": "355.7 100% 97.3%",
      "--secondary": "240 4.8% 95.9%",
      "--secondary-foreground": "240 5.9% 10%",
      "--muted": "240 4.8% 95.9%",
      "--muted-foreground": "240 3.8% 46.1%",
      "--accent": "240 4.8% 95.9%",
      "--accent-foreground": "240 5.9% 10%",
      "--destructive": "0 84.2% 60.2%",
      "--destructive-foreground": "0 0% 98%",
      "--border": "240 5.9% 90%",
      "--input": "240 5.9% 90%",
      "--ring": "346.8 77.2% 49.8%",
      "--radius": "0.5rem"
    },
    dark: {
      "--background": "20 14.3% 4.1%",
      "--foreground": "0 0% 95%",
      "--card": "24 9.8% 10%",
      "--card-foreground": "0 0% 95%",
      "--popover": "0 0% 9%",
      "--popover-foreground": "0 0% 95%",
      "--primary": "346.8 77.2% 49.8%",
      "--primary-foreground": "355.7 100% 97.3%",
      "--secondary": "240 3.7% 15.9%",
      "--secondary-foreground": "0 0% 98%",
      "--muted": "0 0% 15%",
      "--muted-foreground": "240 5% 64.9%",
      "--accent": "12 6.5% 15.1%",
      "--accent-foreground": "0 0% 98%",
      "--destructive": "0 62.8% 30.6%",
      "--destructive-foreground": "0 85.7% 97.3%",
      "--border": "240 3.7% 15.9%",
      "--input": "240 3.7% 15.9%",
      "--ring": "346.8 77.2% 49.8%"
    }
  })
};

export const theme = createTheme({
  fontFamily: "Rubik, sans-serif",
  defaultRadius: "md",
  shadows: {
    xs: "0 1px 2px 0 rgba(0,0,0,.05)"
  },
  headings: {
    sizes: {
      h1: {
        fontSize: rem(48),
        lineHeight: rem(48)
      },
      h2: {
        fontSize: rem(30),
        lineHeight: rem(36)
      },
      h3: {
        fontSize: rem(24),
        lineHeight: rem(32)
      },
      h4: {
        fontSize: rem(20),
        lineHeight: rem(28)
      },
      h5: {
        fontSize: rem(18),
        lineHeight: rem(28)
      },
      h6: {
        fontSize: rem(16),
        lineHeight: rem(28)
      }
    }
  },
  breakpoints: {
    xs: "40em",
    sm: "48em",
    md: "64em",
    lg: "80em",
    xl: "87.5em"
  },
  components: {
    Accordion: Accordion.extend({
      defaultProps: { variant: "proghours-ui" },
      classNames: accordionClasses
    }),
    Container: Container.extend({
      defaultProps: { variant: "proghours-ui" },
      classNames: containerClasses
    }),
    Title: Title.extend({
      classNames: titleClasses
    }),
    Button: Button.extend({
      defaultProps: { variant: "msu-primary" },
      classNames: buttonClasses
    }),
    Text: Text.extend({
      defaultProps: { variant: "proghours-ui" },
      classNames: textClasses
    }),
    AppShell: AppShell.extend({
      defaultProps: { variant: "proghours-ui" },
      classNames: appShellClasses
    }),
    AppShellHeader: AppShellHeader.extend({
      defaultProps: { variant: "proghours-ui" }
    }),
    AppShellNavbar: AppShellNavbar.extend({
      defaultProps: { variant: "proghours-ui" }
    }),
    Anchor: Anchor.extend({
      defaultProps: { variant: "proghours-ui" },
      classNames: anchorClasses
    }),
    ActionIcon: ActionIcon.extend({
      defaultProps: { variant: "proghours-ui" },
      classNames: actionIconClasses
    }),
    Select: Select.extend({
      defaultProps: { variant: "proghours-ui", withCheckIcon: false },
      classNames: selectClasses
    }),
    Table: Table.extend({
      defaultProps: { variant: "proghours-ui" },
      classNames: tableClasses
    }),
    TextInput: TextInput.extend({
      defaultProps: { variant: "proghours-ui" },
      classNames: textInputClasses
    }),
    PasswordInput: PasswordInput.extend({
      defaultProps: { variant: "proghours-ui" },
      classNames: passwordInputClasses
    }),
    Input: Input.extend({
      defaultProps: { variant: "proghours-ui" },
      classNames: inputClasses
    }),
    NavLink: NavLink.extend({
      defaultProps: { variant: "proghours-ui" },
      classNames: navlinkClasses
    }),
    SegmentedControl: SegmentedControl.extend({
      defaultProps: { variant: "proghours-ui" },
      classNames: segmentedControlClasses
    }),
    Paper: Paper.extend({
      defaultProps: { variant: "proghours-ui" },
      classNames: paperClasses
    }),
    Badge: Badge.extend({
      defaultProps: { variant: "proghours-ui" },
      classNames: badgeClasses
    }),
    Tabs: Tabs.extend({
      classNames: tabsClasses
    }),
    Popover: Popover.extend({
      classNames: popoverClasses
    }),
    Divider: Divider.extend({
      classNames: dividerClasses
    }),
    Menu: Menu.extend({
      defaultProps: {
        variant: "proghours-ui",
        transitionProps: { transition: "pop", duration: 150 }
      },
      classNames: menuClasses
    }),
    Notification: Notification.extend({
      defaultProps: {
        variant: "proghours-ui",
        closeButtonProps: { variant: "proghours-ui" }
      },
      classNames: notificationClasses
    }),
    Modal: Modal.extend({
      defaultProps: { variant: "proghours-ui", overlayProps: { blur: 8 } },
      classNames: modalClasses
    }),
    TagsInput: TagsInput.extend({
      defaultProps: { variant: "proghours-ui" },
      classNames: tagsInputClasses
    })
  }
});
