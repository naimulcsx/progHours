import { ReactNode } from "react";
import { Navigate, RouteObject } from "react-router-dom";

import SignInPage from "~/pages/auth/sign-in.page";
import SignUpPage from "~/pages/auth/sign-up.page";
import OverviewPage from "~/pages/dashboard/overview.page";
import HomePage from "~/pages/index.page";
import LeaderboardPage from "~/pages/leaderboard.page";
import DashboardLeaderboardPage from "~/pages/dashboard/leaderboard.page";
import SubmissionsPage from "~/pages/dashboard/submissions.page";
import SettingsPage from "~/pages/dashboard/settings.page";
import { UserProfilePage } from "~/pages/profile/profile.page";

const defineRoute = (path: string, element: ReactNode) => ({ path, element });

export const getRoutes = (isLoggedIn: boolean): RouteObject[] => [
  defineRoute("/", isLoggedIn ? <HomePage /> : <HomePage />),
  defineRoute(
    "/leaderboard",
    isLoggedIn ? <DashboardLeaderboardPage /> : <LeaderboardPage />
  ),
  defineRoute(
    "/auth/sign-in",
    isLoggedIn ? <Navigate to="/" /> : <SignInPage />
  ),
  defineRoute(
    "/auth/sign-up",
    isLoggedIn ? <Navigate to="/" /> : <SignUpPage />
  ),
  defineRoute(
    "/overview",
    isLoggedIn ? <OverviewPage /> : <Navigate to="/auth/login" />
  ),
  defineRoute(
    "/submissions",
    isLoggedIn ? <SubmissionsPage /> : <Navigate to="/auth/login" />
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
    isLoggedIn ? <SettingsPage /> : <Navigate to="/auth/sign-in" />
  ),
  defineRoute("/@/:username", <UserProfilePage />)
];
