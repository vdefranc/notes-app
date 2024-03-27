import pageStyles from "./page.module.css";
import notes from "./mock-notes";

import SelectedNote from "@/app/SelectedNote";
import NotesList from "@/NotesList";

export default function Home() {
  return (
    <main className={pageStyles.main}>
      <NotesList notes={notes} />

      <div className={pageStyles["selected-note"]}>
        <SelectedNote />
      </div>
    </main>
  );
}
