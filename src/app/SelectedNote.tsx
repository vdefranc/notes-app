"use client";

import { useSearchParams } from "next/navigation";
import notes from "@/app/mock-notes";
import { createNote } from "@/app/serverActions";

export default function SelectedNote() {
  // should move this to the top-level server component and just do a SELECT
  const searchParams = useSearchParams();
  const selectedNoteId = searchParams.get("note");
  const selectedNote = notes.find((note) => note.id === selectedNoteId);

  return (
    <form action={createNote}>
      <input type="text" name="title" value={selectedNote?.title || ""}></input>
      <button type="submit">submit!</button>
    </form>
  );
}
