"use client";

import pageStyles from "@/app/page.module.css";
import NoteColumnItem from "@/app/NoteColumnItem";
import { Note } from "@/app/notes/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button, TextInput } from "@mantine/core";

interface NotesListProps {
  notes: Note[];
}

export default function NotesList(props: NotesListProps) {
  const { notes } = props;
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  return (
    <div className={pageStyles["notes-column"]}>
      <TextInput
        name="title"
        label="Search your notes"
        description="You can filter your notes by the content of their title and content."
        placeholder={"search for notes..."}
        defaultValue={searchParams.get("query")?.toString()}
        onChange={(e) => {
          const newParams = new URLSearchParams(searchParams);
          const searchTerm = e.target.value;

          if (searchTerm) {
            newParams.set("query", e.target.value);
          } else {
            newParams.delete("query");
          }

          router.replace(`${pathname}?${newParams.toString()}`);
        }}
      />

      {/*TODO: pencil icon on the left? */}
      <Button
        fullWidth
        variant="filled"
        onClick={() => {
          router.push("/");
        }}
      >
        Create New Note
      </Button>

      <div className={pageStyles["notes-list"]}></div>
      {notes.map((note) => {
        return <NoteColumnItem key={note.id} note={note} />;
      })}
    </div>
  );
}
