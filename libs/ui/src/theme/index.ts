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
  Loader,
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

import accordionClasses from "./css/Accordion.module.css";
import actionIconClasses from "./css/ActionIcon.module.css";
import anchorClasses from "./css/Anchor.module.css";
import appShellClasses from "./css/AppShell.module.css";
import badgeClasses from "./css/Badge.module.css";
import buttonClasses from "./css/Button.module.css";
import containerClasses from "./css/Container.module.css";
import dividerClasses from "./css/Divider.module.css";
import inputClasses from "./css/Input.module.css";
import loaderClasses from "./css/Loader.module.css";
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

export const cssVariablesResolver: CSSVariablesResolver = () => ({
  variables: { "--radius": "0.5rem" },
  light: {
    "--background": "0 0% 100%",
    "--foreground": "221 72% 15%",
    "--card": "0 0% 100%",
    "--card-foreground": "222.2 84% 4.9%",
    "--popover": "0 0% 100%",
    "--popover-foreground": "222.2 84% 4.9%",
    "--primary": "221.2 83.2% 53.3%",
    "--primary-foreground": "210 40% 98%",
    "--secondary": "210 40% 96.1%",
    "--secondary-foreground": "222.2 47.4% 11.2%",
    "--muted": "210 40% 96.1%",
    "--muted-foreground": "235 22% 29%",
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
});

export const theme = createTheme({
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
      defaultProps: { variant: "proghours-ui" },
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
    }),
    Loader: Loader.extend({
      defaultProps: { variant: "proghours-ui", size: "xs" },
      classNames: loaderClasses
    })
  }
});
