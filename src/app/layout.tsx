import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@mantine/core/styles.css";
import {
  ColorSchemeScript,
  Group,
  MantineProvider,
  rem,
  Text,
} from "@mantine/core";
import { IconWriting } from "@tabler/icons-react";

import pageStyles from "./page.module.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "a notes app, crafted by vinny",
  description: "a simple notes application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />

        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>

      <body className={inter.className}>
        <MantineProvider>
          <>
            <header className={pageStyles["app-header"]}>
              <Group h="100%" px="md">
                <IconWriting
                  style={{ width: rem(50), height: rem(50) }}
                  stroke={2}
                ></IconWriting>

                <div>
                  <Text size="lg" fw="500">
                    A simple notes application by Vinny DeFrancesco
                  </Text>

                  <Text size="sm">
                    Do you like writing notes? You&apos;re in luck!
                  </Text>
                </div>
              </Group>
            </header>
            {children}
          </>
        </MantineProvider>
      </body>
    </html>
  );
}
