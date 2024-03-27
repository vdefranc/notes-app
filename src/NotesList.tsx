"use client";

import pageStyles from "@/app/page.module.css";
import NoteColumnItem from "@/app/NoteColumnItem";
import { Note } from "@/app/notes/types";

interface NotesListProps {
  notes: Note[];
}

export default function NotesList(props: NotesListProps) {
  const { notes } = props;

  return (
    <div className={pageStyles["notes-column"]}>
      <div className={pageStyles["note-column-item"]}>
        <p>
          <button
            onClick={() => {
              console.log("click click!");
            }}
          >
            create note
          </button>
        </p>
      </div>

      {notes.map((note) => {
        return <NoteColumnItem key={note.id} note={note} />;
      })}
    </div>
  );
}
