import { ReactNode } from "react";
import { Navigate, RouteObject } from "react-router-dom";
import SignInPage from "~/pages/auth/sign-in.page";
import SignUpPage from "~/pages/auth/sign-up.page";
import HomePage from "~/pages/home.page";

const defineRoute = (path: string, element: ReactNode) => ({ path, element });

export const getRoutes = (isLoggedIn: boolean): RouteObject[] => [
  defineRoute("/", isLoggedIn ? <HomePage /> : <Navigate to="/auth/sign-in" />),
  defineRoute(
    "/auth/sign-up",
    isLoggedIn ? <Navigate to="/" /> : <SignUpPage />
  ),
  defineRoute(
    "/auth/sign-in",
    isLoggedIn ? <Navigate to="/" /> : <SignInPage />
  )
];
