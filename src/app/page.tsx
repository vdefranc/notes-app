import pageStyles from "./page.module.css";
import notes from "./mock-notes";

export default function Home() {
  return (
    <main className={pageStyles.main}>
      <div className={pageStyles["notes-column"]}>
        {notes.map((note) => {
          return (
            <div key={note.id}>
              <p>
                {note.title} by user {note.user_id}
              </p>
            </div>
          );
        })}
      </div>

      <div className={pageStyles["selected-note"]}>
        <h2>{notes[0].title}</h2>
        <p>{notes[0].body}</p>
      </div>
    </main>
  );
}
