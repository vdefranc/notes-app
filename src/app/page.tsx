import { getNoteById, getNotes } from "@/app/server/serverActions";
import ClientEntryPoint from "@/app/ClientEntryPoint";

interface HomepageProps {
  searchParams: { note: string | null; query: string | null };
}

export default async function Home({ searchParams }: HomepageProps) {
  const notes = await getNotes(searchParams.query ?? "");

  const note = searchParams.note
    ? await getNoteById({ id: searchParams.note })
    : null;

  return <ClientEntryPoint note={note} notes={notes} />;
}
