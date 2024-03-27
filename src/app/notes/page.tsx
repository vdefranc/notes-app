import notes from "../mock-notes";

export default function Home() {
  return (
    <div>
      {notes.map((note) => {
        return (
          <p key={note.id}>
            {note.title} by user {note.user_id}
          </p>
        );
      })}
    </div>
  );
}
