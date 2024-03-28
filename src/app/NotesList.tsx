"use client";

import pageStyles from "@/app/page.module.css";
import NoteColumnItem from "@/app/NoteColumnItem";
import { Note } from "@/app/notes/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
      <input
        type="text"
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
