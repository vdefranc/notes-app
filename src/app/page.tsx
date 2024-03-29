import { getNoteById, getNotes } from "@/app/server/serverActions";
import ClientEntryPoint from "@/app/ClientEntryPoint";

export default async function Home({
  searchParams,
}: {
  searchParams: { note: string | null; query: string | null };
}) {
  const notes = await getNotes(searchParams.query ?? "");

  const note = searchParams.note
    ? await getNoteById({ id: searchParams.note })
    : null;

  return <ClientEntryPoint note={note} notes={notes} />;
}
