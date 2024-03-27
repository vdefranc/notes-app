import pageStyles from "./page.module.css";

import SelectedNote from "@/app/SelectedNote";
import NotesList from "@/NotesList";
import { getNoteById, getNotes } from "@/app/serverActions";

export default async function Home({
  searchParams,
}: {
  searchParams: { note: string | null };
}) {
  const notes = await getNotes();

  const note = searchParams.note
    ? await getNoteById({ id: searchParams.note })
    : null;

  return (
    <main className={pageStyles.main}>
      <NotesList notes={notes} />
      <div className={pageStyles["selected-note"]}>
        {/*
          Need a component like DisplayArea.
          It would conditionally render an existing note or a blank note.
        */}

        <SelectedNote notes={notes} note={note} />
      </div>
    </main>
  );
}
