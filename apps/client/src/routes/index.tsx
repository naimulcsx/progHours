import React, { ReactNode, Suspense } from "react";
import { Navigate, RouteObject } from "react-router-dom";

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

const withSuspenseLayout = (
  PageComponent: React.FC,
  props?: { withContainer: boolean }
): ReactNode => {
  return (
    <Layout {...props}>
      <Suspense>
        <PageComponent />
      </Suspense>
    </Layout>
  );
};

const withSuspenseDashboardLayout = (PageComonent: React.FC): ReactNode => {
  return (
    <DashboardLayout>
      <Suspense>
        <PageComonent />
      </Suspense>
    </DashboardLayout>
  );
};

export const getRoutes = (isLoggedIn: boolean): RouteObject[] => [
  defineRoute("/", withSuspenseLayout(HomePage, { withContainer: false })),
  defineRoute(
    "/leaderboard",
    isLoggedIn
      ? withSuspenseDashboardLayout(LeaderboardPage)
      : withSuspenseLayout(LeaderboardPage, { withContainer: true })
  ),
  defineRoute(
    "/auth/sign-in",
    isLoggedIn ? <Navigate to="/" /> : withSuspenseLayout(SignInPage)
  ),
  defineRoute(
    "/auth/sign-up",
    isLoggedIn ? <Navigate to="/" /> : withSuspenseLayout(SignUpPage)
  ),
  defineRoute(
    "/overview",
    isLoggedIn ? (
      withSuspenseDashboardLayout(OverviewPage)
    ) : (
      <Navigate to="/auth/login" />
    )
  ),
  defineRoute(
    "/submissions",
    isLoggedIn ? (
      withSuspenseDashboardLayout(SubmissionsPage)
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
      withSuspenseDashboardLayout(SettingsPage)
    ) : (
      <Navigate to="/auth/sign-in" />
    )
  ),
  defineRoute(
    "/@/:username",
    withSuspenseLayout(UserProfilePage, { withContainer: false })
  ),
  defineRoute(
    "/@/:username/:tabValue",
    withSuspenseLayout(UserProfilePage, { withContainer: false })
  )
];
