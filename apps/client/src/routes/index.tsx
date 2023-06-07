import { ReactNode } from "react";
import { Navigate, RouteObject } from "react-router-dom";
import SignInPage from "~/pages/auth/signin.page";
import SignUpPage from "~/pages/auth/signup.page";
import HomePage from "~/pages/home.page";

const defineRoute = (path: string, element: ReactNode) => ({ path, element });

export const getRoutes = (isLoggedIn: boolean): RouteObject[] => [
  defineRoute("/", isLoggedIn ? <HomePage /> : <Navigate to="/auth/signin" />),
  defineRoute(
    "/auth/signup",
    isLoggedIn ? <Navigate to="/" /> : <SignUpPage />
  ),
  defineRoute("/auth/signin", isLoggedIn ? <Navigate to="/" /> : <SignInPage />)
];
