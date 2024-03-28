"use server";

import { revalidatePath } from "next/cache";

import * as uuid from "uuid";
import * as vercelPg from "@vercel/postgres";
import { Note } from "@/app/notes/types";
import pool from "@/app/psqlClient";

const { sql } = vercelPg;

export async function createNote(formData: FormData): Promise<Note> {
  // need validation
  const values = Object.fromEntries(formData.entries());

  const noteData: Omit<Note, "created_at" | "updated_at" | "id"> = {
    // probably aren't going to care about user ids!
    title: String(values.title),
    body: String(values.body),
    user_id: uuid.v4(),
  };

  const result = await sql<Note>`
    INSERT INTO notes (user_id, title, body)
    VALUES (${noteData.user_id}, ${noteData.title}, ${noteData.body}) returning *;
  `;

  revalidatePath("/");

  return result.rows[0];
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
    // note that clients are closed automatically when using pool.query
    // https://node-postgres.com/features/pooling#single-query
    const queryResult = await pool.query<Note>(
      `
          select * from notes 
          where body like '%'||$1||'%' or title like '%'||$1||'%' 
          order by updated_at desc;
        `,
      [query],
    );

    return queryResult.rows;
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
  const noteQueryResult = await pool.query<Note>(
    "select * from notes where id=$1",
    [id],
  );

  return noteQueryResult.rows[0];
}
