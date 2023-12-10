import React, {
  PropsWithChildren,
  ReactNode,
  Suspense,
  useLayoutEffect
} from "react";
import { Navigate, RouteObject, useLocation } from "react-router-dom";

import { AppShellProps } from "@mantine/core";

import { DashboardLayout } from "~/modules/common/components/DashboardLayout";
import { Layout } from "~/modules/common/components/Layout";

const UserProfilePage = React.lazy(
  () => import("~/pages/profile/profile.page")
);
const SignInPage = React.lazy(() => import("~/pages/auth/sign-in.page"));
const SignUpPage = React.lazy(() => import("~/pages/auth/sign-up.page"));
const HomePage = React.lazy(() => import("~/pages/index.page"));
const OverviewPage = React.lazy(
  () => import("~/pages/dashboard/overview.page")
);
const SettingsPage = React.lazy(
  () => import("~/pages/dashboard/settings.page")
);
const SubmissionsPage = React.lazy(
  () => import("~/pages/dashboard/submissions.page")
);
const LeaderboardPage = React.lazy(() => import("~/pages/leaderboard.page"));

const defineRoute = (path: string, element: ReactNode) => ({ path, element });

const Wrapper = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

const WithSuspenseLayout = (
  PageComponent: React.FC,
  props?: { withContainer: boolean }
): ReactNode => {
  return (
    <Wrapper>
      <Layout {...props}>
        <Suspense>
          <PageComponent />
        </Suspense>
      </Layout>
    </Wrapper>
  );
};

const WithSuspenseDashboardLayout = (
  PageComonent: React.FC,
  props?: AppShellProps
): ReactNode => {
  return (
    <Wrapper>
      <DashboardLayout {...props}>
        <Suspense>
          <PageComonent />
        </Suspense>
      </DashboardLayout>
    </Wrapper>
  );
};

export const getRoutes = (isLoggedIn: boolean): RouteObject[] => [
  defineRoute("/", WithSuspenseLayout(HomePage, { withContainer: false })),
  defineRoute(
    "/leaderboard",
    isLoggedIn
      ? WithSuspenseDashboardLayout(LeaderboardPage)
      : WithSuspenseLayout(LeaderboardPage, { withContainer: true })
  ),
  defineRoute(
    "/auth/sign-in",
    isLoggedIn ? (
      <Navigate to="/" />
    ) : (
      WithSuspenseLayout(SignInPage, { withContainer: false })
    )
  ),
  defineRoute(
    "/auth/sign-up",
    isLoggedIn ? (
      <Navigate to="/" />
    ) : (
      WithSuspenseLayout(SignUpPage, { withContainer: false })
    )
  ),
  defineRoute(
    "/overview",
    isLoggedIn ? (
      WithSuspenseDashboardLayout(OverviewPage)
    ) : (
      <Navigate to="/auth/login" />
    )
  ),
  defineRoute(
    "/submissions",
    isLoggedIn ? (
      WithSuspenseDashboardLayout(SubmissionsPage)
    ) : (
      <Navigate to="/auth/login" />
    )
  ),
  defineRoute(
    "/settings",
    isLoggedIn ? (
      <Navigate to="/settings/appearance" />
    ) : (
      <Navigate to="/auth/sign-in" />
    )
  ),
  defineRoute(
    "/settings/:tabValue",
    isLoggedIn ? (
      WithSuspenseDashboardLayout(SettingsPage)
    ) : (
      <Navigate to="/auth/sign-in" />
    )
  ),
  defineRoute(
    "/@/:username",
    WithSuspenseLayout(UserProfilePage, { withContainer: false })
  ),
  defineRoute(
    "/@/:username/:tabValue",
    WithSuspenseLayout(UserProfilePage, { withContainer: false })
  )
];
