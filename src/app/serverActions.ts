"use server";

import { revalidatePath } from "next/cache";

import * as uuid from "uuid";
import * as vercelPg from "@vercel/postgres";
import { Note } from "@/app/notes/types";

const { sql } = vercelPg;

export async function createNote(formData: FormData) {
  // need validation
  const values = Object.fromEntries(formData.entries());

  const noteData: Omit<Note, "created_at" | "id"> = {
    // probably aren't going to care about user ids!
    title: String(values.title),
    body: String(values.body),
    user_id: uuid.v4(),

    updated_at: new Date(),
  };

  await sql`
    INSERT INTO notes (user_id, title, body, updated_at)
    VALUES (${noteData.user_id}, ${noteData.title}, ${noteData.body}, ${noteData.updated_at.toISOString()})
  `;

  revalidatePath("/");
}

export async function updateNote(note: Note) {
  // need validation

  const noteData: Note = {
    // probably aren't going to care about user ids!
    ...note,
    updated_at: new Date(),
  };

  await sql`
    update notes set title=${noteData.title}, body=${noteData.body}, updated_at=${noteData.updated_at.toISOString()}
    where id=${noteData.id}
  `;

  revalidatePath(`/`);
}

export async function getNotes(query: string = ""): Promise<Note[]> {
  try {
    if (!!query) {
      const noteQueryResult = await sql<Note>`
        select * from notes 
        where body like '%'||${query}||'%' or title like '%'||${query}||'%' 
        order by updated_at desc;
      `;

      return noteQueryResult.rows;
    }

    const noteQueryResult =
      await sql<Note>`select * from notes order by updated_at desc;`;

    return noteQueryResult.rows;
  } catch (err) {
    console.log("error querying for notes: ", err);
    return [];
  }
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
