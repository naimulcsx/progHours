import { ReactNode } from "react";
import { RouteObject } from "react-router-dom";
import SignInPage from "~/pages/auth/sign-in.page";
import SignUpPage from "~/pages/auth/sign-up.page";

import HomePage from "~/pages/index.page";
import LeaderboardPage from "~/pages/leaderboard.page";

const defineRoute = (path: string, element: ReactNode) => ({ path, element });

export const getRoutes = (isLoggedIn: boolean): RouteObject[] => [
  defineRoute("/", isLoggedIn ? <HomePage /> : <HomePage />),
  defineRoute(
    "/leaderboard",
    isLoggedIn ? <LeaderboardPage /> : <LeaderboardPage />
  ),
  defineRoute("/auth/sign-in", isLoggedIn ? <SignInPage /> : <SignInPage />),
  defineRoute("/auth/sign-up", isLoggedIn ? <SignUpPage /> : <SignUpPage />)
];
