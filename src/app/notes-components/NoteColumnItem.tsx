"use client";

import Link from "next/link";
import { Note } from "@/app/types";
import pageStyles from "@/app/page.module.css";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { Text } from "@mantine/core";

interface NoteColumnItemProps {
  note: Note;
}

export default function NoteColumnItem(props: NoteColumnItemProps) {
  const { note } = props;
  const searchParams = useSearchParams();

  const noteId = searchParams.get("note");

  return (
    <Link href={`?note=${note.id}`}>
      <div
        className={clsx(pageStyles["note-column-item"], {
          [pageStyles["note_column_item__selected_item"]]: note.id === noteId,
        })}
        style={{ maxWidth: "100%", overflow: "hidden" }}
      >
        <Text size="md" fw="600">
          {note.title}
        </Text>

        <p className={pageStyles["truncate"]}>{note.body}</p>

        <Text size="sm" fs={"italic"} fw={400}>
          Updated on {note.updated_at.toISOString().split("T")[0]}
        </Text>
      </div>
    </Link>
  );
}
