"use client";

import pageStyles from "@/app/page.module.css";
import NoteColumnItem from "@/app/notes-components/NoteColumnItem";
import { Note } from "@/app/types";

interface NotesListProps {
  notes: Note[];
}

export default function NotesList(props: NotesListProps) {
  const { notes } = props;

  return (
    <div className={pageStyles["notes-column"]}>
      <div className={pageStyles["notes-list"]}></div>
      {notes.map((note) => {
        return <NoteColumnItem key={note.id} note={note} />;
      })}
    </div>
  );
}
