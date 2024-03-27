"use server";

import { revalidatePath } from "next/cache";

import * as uuid from "uuid";
import { sql } from "@vercel/postgres";
import { Note } from "@/app/notes/types";

export async function createNote(formData: FormData) {
  // need validation
  const values = Object.fromEntries(formData.entries());

  const noteData: Omit<Note, "created_at" | "id"> = {
    // probably aren't going to care about user ids!
    title: String(values.title),
    body: String(values.body),
    user_id: uuid.v4(),
    updated_at: new Date().toISOString(),
  };

  await sql`
    INSERT INTO notes (user_id, title, body, updated_at)
    VALUES (${noteData.user_id}, ${noteData.title}, ${noteData.body}, ${noteData.updated_at})
  `;

  revalidatePath("/");
}

export async function updateNote(note: Note) {
  // need validation

  const noteData: Note = {
    // probably aren't going to care about user ids!
    ...note,
    updated_at: new Date().toISOString(),
  };

  await sql`
    update notes set title=${noteData.title}, body=${noteData.body}, updated_at=${noteData.updated_at}
    where id=${noteData.id}
  `;

  revalidatePath(`/`);
}

export async function getNotes(): Promise<Note[]> {
  const noteQueryResult = await sql<Note>`
    select * from notes order by updated_at desc;
  `;

  return noteQueryResult.rows;
}

export async function getNoteById({
  id,
}: {
  id: string;
}): Promise<Note | null> {
  const noteQueryResult = await sql<Note>`
    select * from notes where id=${id};
  `;

  return noteQueryResult.rows[0];
}
