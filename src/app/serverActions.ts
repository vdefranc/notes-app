"use server";

import * as uuid from "uuid";
import { sql } from "@vercel/postgres";
import { Note } from "@/app/notes/types";

export async function createNote(formData: FormData) {
  const data = Object.fromEntries(formData.entries());

  // need validation

  const noteData: Omit<Note, "created_at" | "id"> = {
    // probably aren't going to care about user ids!
    user_id: uuid.v4(),
    title: String(data.title),
    // need to add body to the form data
    body: String(data.title),
    updated_at: new Date().toISOString(),
  };

  await sql`
    INSERT INTO notes (user_id, title, body, updated_at)
    VALUES (${noteData.user_id}, ${noteData.title}, ${noteData.body}, ${noteData.updated_at})
  `;
}
