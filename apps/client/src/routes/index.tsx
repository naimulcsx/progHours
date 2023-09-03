import { ReactNode } from "react";
import { RouteObject } from "react-router-dom";

import HomePage from "~/pages/index.page";
import LeaderboardPage from "~/pages/leaderboard.page";

const defineRoute = (path: string, element: ReactNode) => ({ path, element });

export const getRoutes = (isLoggedIn: boolean): RouteObject[] => [
  defineRoute("/", isLoggedIn ? <HomePage /> : <HomePage />),
  defineRoute(
    "/leaderboard",
    isLoggedIn ? <LeaderboardPage /> : <LeaderboardPage />
  )
];
