"use client";

import pageStyles from "./page.module.css";

import SelectedNote from "@/app/SelectedNote";
import NotesList from "@/app/NotesList";
import { getNoteById, getNotes } from "@/app/serverActions";
import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function Notes({
  searchParams,
}: {
  searchParams: { note: string | null; query: string | null };
}) {
  const [opened, { toggle }] = useDisclosure();

  console.log("AYYYY YOOOOO");

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: { sm: 200, lg: 300 },
        breakpoint: "lg",
        collapsed: { mobile: false, desktop: false },
      }}
      padding="md"
    >
      <AppShell.Header>
        {/*<Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />*/}
        <div>Logo</div>
      </AppShell.Header>

      <AppShell.Navbar p="md">Navbar</AppShell.Navbar>

      <AppShell.Main>Main</AppShell.Main>
    </AppShell>
  );
}
