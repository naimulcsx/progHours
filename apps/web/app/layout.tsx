import { Role } from "@prisma/client";
import jwt from "jsonwebtoken";
import localFont from "next/font/local";
import { cookies } from "next/headers";
import NextTopLoader from "nextjs-toploader";

import { ColorSchemeScript } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/nprogress/styles.css";

import { Layout } from "~/modules/common/components/layout/Layout";

import "../styles/global.css";
import { Providers } from "./providers";

const onest = localFont({
  src: "../styles/fonts/onest.woff2",
  variable: "--proghours-font"
});

export const metadata = {
  title: "progHours - Code. Compete. Conquer!",
  description:
    "Track your progress with comprehensive analytics on your problem solving journey."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const cookiesStore = cookies();
  const colorSchemeValue = cookiesStore.get("color-scheme");
  const accessToken = cookiesStore.get("access-token");

  let colorScheme: "light" | "dark" = "light";
  if (colorSchemeValue?.value === "dark") colorScheme = "dark";

  type JwtPayload = {
    sub: number;
    username: string;
    fullName: string;
    email: string;
    role: Role;
    iat: 1698629260;
    exp: 1699234060;
  };

  let user: JwtPayload | undefined = undefined;

  if (accessToken) {
    try {
      user = jwt.verify(
        accessToken.value,
        process.env.JWT_SECRET as string
      ) as unknown as JwtPayload;
    } catch (err) {
      user = undefined;
    }
  }

  return (
    <html lang="en" className={onest.className}>
      <head>
        <ColorSchemeScript forceColorScheme={colorScheme} />
      </head>
      <body>
        <NextTopLoader color="hsl(var(--primary))" showSpinner={false} />
        <Providers colorScheme={colorScheme} user={user}>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
