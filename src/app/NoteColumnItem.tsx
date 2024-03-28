"use client";

import Link from "next/link";
import { Note } from "@/app/types";
import pageStyles from "@/app/page.module.css";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";

interface NoteColumnItemProps {
  note: Note;
}

export default function NoteColumnItem(props: NoteColumnItemProps) {
  const { note } = props;
  const searchParams = useSearchParams();

  const noteId = searchParams.get("note");

  return (
    <Link
      href={`?note=${note.id}`}
      className={clsx("link-item", {
        // [pageStyles["unselected-link-item"]]: note.id !== noteId,
        [pageStyles["selected-link-item"]]: note.id === noteId,
      })}
    >
      <div
        className={clsx(pageStyles["note-column-item"], {
          [pageStyles["note_column_item__selected_item"]]: note.id === noteId,
        })}
      >
        <p
          className={`${pageStyles["note-column-item__title"]} ${pageStyles["truncate"]}`}
        >
          {note.title}
        </p>

        <p className={pageStyles["truncate"]}>
          <span className={pageStyles["note-column-item__updated_at"]}>
            {note.updated_at.toISOString().split("T")[0]}
          </span>
          &nbsp; &ndash; &nbsp;
          <span className={pageStyles["note-column-item__body-preview"]}>
            {note.body}
          </span>
        </p>
      </div>
    </Link>
  );
}
