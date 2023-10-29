import localFont from "next/font/local";

import { ColorSchemeScript } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/nprogress/styles.css";

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
  return (
    <html lang="en" className={onest.className}>
      <head>
        <ColorSchemeScript forceColorScheme="light" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
