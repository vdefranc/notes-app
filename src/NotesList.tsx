"use client";

import pageStyles from "@/app/page.module.css";
import NoteColumnItem from "@/app/NoteColumnItem";
import { Note } from "@/app/notes/types";
import { useRouter } from "next/navigation";

interface NotesListProps {
  notes: Note[];
}

export default function NotesList(props: NotesListProps) {
  const { notes } = props;
  const router = useRouter();

  return (
    <div className={pageStyles["notes-column"]}>
      <div className={pageStyles["note-column-item"]}>
        <p>
          <button
            onClick={() => {
              router.push("/");
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
