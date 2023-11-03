import React, { ReactNode, Suspense } from "react";
import { Navigate, RouteObject } from "react-router-dom";

const DashboardLeaderboardPage = React.lazy(
  () => import("~/pages/dashboard/leaderboard.page")
);
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

export const getRoutes = (isLoggedIn: boolean): RouteObject[] => [
  defineRoute(
    "/",
    <Suspense>
      <HomePage />
    </Suspense>
  ),
  defineRoute(
    "/leaderboard",
    isLoggedIn ? (
      <Suspense>
        <DashboardLeaderboardPage />
      </Suspense>
    ) : (
      <Suspense>
        <LeaderboardPage />
      </Suspense>
    )
  ),
  defineRoute(
    "/auth/sign-in",
    isLoggedIn ? (
      <Navigate to="/" />
    ) : (
      <Suspense>
        <SignInPage />
      </Suspense>
    )
  ),
  defineRoute(
    "/auth/sign-up",
    isLoggedIn ? (
      <Navigate to="/" />
    ) : (
      <Suspense>
        <SignUpPage />
      </Suspense>
    )
  ),
  defineRoute(
    "/overview",
    isLoggedIn ? (
      <Suspense>
        <OverviewPage />
      </Suspense>
    ) : (
      <Navigate to="/auth/login" />
    )
  ),
  defineRoute(
    "/submissions",
    isLoggedIn ? (
      <Suspense>
        <SubmissionsPage />
      </Suspense>
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
      <Suspense>
        <SettingsPage />
      </Suspense>
    ) : (
      <Navigate to="/auth/sign-in" />
    )
  ),
  defineRoute(
    "/@/:username",
    <Suspense>
      <UserProfilePage />
    </Suspense>
  ),
  defineRoute(
    "/@/:username/:tabValue",
    <Suspense>
      <UserProfilePage />
    </Suspense>
  )
];
