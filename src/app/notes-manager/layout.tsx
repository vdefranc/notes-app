"use client";
import { AppShell, Group, rem, ScrollArea, Text } from "@mantine/core";
import pageStyles from "@/app/page.module.css";
import { IconWriting } from "@tabler/icons-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      header={{ height: 100 }}
      navbar={{
        width: "25%",
        breakpoint: "xs",
        collapsed: { mobile: false, desktop: false },
      }}
      padding="md"
    >
      <AppShell.Header className={pageStyles["app-header"]}>
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
      </AppShell.Header>

      {children}
    </AppShell>
  );
}
