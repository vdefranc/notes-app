import pageStyles from "./page.module.css";

import SelectedNote from "@/app/SelectedNote";
import NotesList from "@/NotesList";
import { getNotes } from "@/app/serverActions";

export default async function Home() {
  const notes = await getNotes();

  return (
    <main className={pageStyles.main}>
      <NotesList notes={notes} />

      <div className={pageStyles["selected-note"]}>
        {/*
          Need a component like DisplayArea.
          It would conditionally render an existing note or a blank note.
        */}

        <SelectedNote notes={notes} />
      </div>
    </main>
  );
}
