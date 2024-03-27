import notes from "../mock-notes";
import { getNoteById } from "@/app/serverActions";
import SelectedNote from "@/app/SelectedNote";

// TODO: remove ignore
// @ts-ignore
export default async function Note({ params, searchParams }) {
  const note = await getNoteById({ id: searchParams.note });

  return <SelectedNote notes={[]} note={note} />;
}
