"use client";

import { Note, Patient } from "@/app/types";
import pageStyles from "./page.module.css";

import SelectedNote from "@/app/notes-components/SelectedNote";
import NotesList from "@/app/notes-components/NotesList";

import { AppShell, Group, rem, Text, ScrollArea } from "@mantine/core";
import { IconWriting } from "@tabler/icons-react";
import SearchBar from "@/app/notes-components/SearchBar";

export default function ClientEntryPoint({
  note,
  notes,
  patients,
}: {
  note: Note | null;
  notes: Note[];
  patients: Patient[];
}) {
  return (
    <>
      <AppShell.Navbar p="md">
        <AppShell.Section>
          <SearchBar />
        </AppShell.Section>

        <AppShell.Section grow my="md" component={ScrollArea}>
          <NotesList notes={notes} />
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>
        <SelectedNote note={note} patients={patients} />
      </AppShell.Main>
    </>
  );
}
