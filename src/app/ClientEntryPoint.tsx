"use client";

import { Note } from "@/app/types";
import pageStyles from "./page.module.css";

import SelectedNote from "@/app/notes-components/SelectedNote";
import NotesList from "@/app/notes-components/NotesList";

import { AppShell, Group, rem, Text, ScrollArea } from "@mantine/core";
import { IconWriting } from "@tabler/icons-react";
import SearchBar from "@/app/notes-components/SearchBar";

export default function ClientEntryPoint({
  note,
  notes,
}: {
  note: Note | null;
  notes: Note[];
}) {
  return (
    <>
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

        <AppShell.Navbar p="md">
          <AppShell.Section>
            <SearchBar />
          </AppShell.Section>

          <AppShell.Section grow my="md" component={ScrollArea}>
            <NotesList notes={notes} />
          </AppShell.Section>
        </AppShell.Navbar>

        <AppShell.Main>
          <SelectedNote note={note} />
        </AppShell.Main>
      </AppShell>
    </>
  );
}
