import pageStyles from "./page.module.css";

import SelectedNote from "@/app/notes-components/SelectedNote";
import NotesList from "@/app/notes-components/NotesList";
import { getNoteById, getNotes } from "@/app/server/serverActions";

export default async function Home({
  searchParams,
}: {
  searchParams: { note: string | null; query: string | null };
}) {
  const notes = await getNotes(searchParams.query ?? "");

  const note = searchParams.note
    ? await getNoteById({ id: searchParams.note })
    : null;

  return (
    <main className={pageStyles.main}>
      <NotesList notes={notes} />

      <SelectedNote note={note} />
    </main>
  );
}
