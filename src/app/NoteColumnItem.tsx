"use client";

import Link from "next/link";
import { Note } from "@/app/notes/types";
import pageStyles from "@/app/page.module.css";

interface NoteColumnItemProps {
  note: Note;
}

export default function NoteColumnItem(props: NoteColumnItemProps) {
  const { note } = props;

  return (
    <Link href={`?note=${note.id}`}>
      <div className={pageStyles["note-column-item"]}>
        <p>
          {note.title} by user {note.user_id}
        </p>
      </div>
    </Link>
  );
}
