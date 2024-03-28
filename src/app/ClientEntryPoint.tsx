"use client";

import { Note } from "@/app/types";
import pageStyles from "./page.module.css";

import SelectedNote from "@/app/SelectedNote";
import NotesList from "@/app/NotesList";

import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function ClientEntryPoint({
  note,
  notes,
}: {
  note: Note | null;
  notes: Note[];
}) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "xs",
          collapsed: { mobile: false, desktop: false },
        }}
        padding="md"
      >
        <AppShell.Header>
          {/*<Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />*/}
          <div>Logo</div>
        </AppShell.Header>

        <AppShell.Navbar p="md">
          <NotesList notes={notes} />
        </AppShell.Navbar>

        <AppShell.Main>
          <SelectedNote note={note} />
        </AppShell.Main>
      </AppShell>

      {/*<NotesList notes={notes} />*/}

      {/*<SelectedNote note={note} />*/}
    </>
  );
}
