"use server";

import { revalidatePath } from "next/cache";

import { Note, Patient } from "@/app/types";
import pool from "@/app/server/psqlClient";

/*
    note that in this file, there are a few instances where we are using th `pool.query` method.
    When using that method, db connections are automatically closed after the query resolves,
    so we aren't leaking db clients/connections
    https://node-postgres.com/features/pooling#single-query
*/

export async function createNote(formData: FormData): Promise<Note> {
  // NOTE: It would have been appropriate to add input validation in this function
  const values = Object.fromEntries(formData.entries());

  const noteData: Omit<Note, "created_at" | "updated_at" | "id"> = {
    title: String(values.title),
    body: String(values.body),
    patient_id: String(values.patient_id),
  };

  const result = await pool.query<Note>(
    `
      INSERT INTO notes (title, body, patient_id)
      VALUES ($1, $2, $3) returning *;
    `,
    [noteData.title, noteData.body, noteData.patient_id],
  );

  revalidatePath("/");

  return result.rows[0];
}

export async function updateNote(note: Note) {
  // NOTE: It would have been appropriate to add input validation in this function
  const noteData: Note = {
    ...note,
    updated_at: new Date(),
  };

  const queryResult = await pool.query<Note>(
    `
      update notes set title=$1, body=$2, updated_at=$3
      where id=$4
    `,
    [
      noteData.title,
      noteData.body,
      noteData.updated_at.toISOString(),
      noteData.id,
    ],
  );

  revalidatePath(`/?note=${note.id}`);

  return queryResult.rows;
}

export async function getNotes(query: string = ""): Promise<Note[]> {
  try {
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

export async function createPatient(formData: FormData): Promise<Patient> {
  // NOTE: It would have been appropriate to add input validation in this function
  const values = Object.fromEntries(formData.entries());

  const patientData: Omit<Patient, "created_at" | "updated_at" | "id"> = {
    first_name: String(values.first_name),
    last_name: String(values.last_name),
  };

  const result = await pool.query<Patient>(
    `
      INSERT INTO patients (first_name, last_name)
      VALUES ($1, $2) returning *;
    `,
    [patientData.first_name, patientData.last_name],
  );

  revalidatePath("/");

  return result.rows[0];
}

export async function getPatients(): Promise<Patient[]> {
  try {
    const queryResult = await pool.query<Patient>(
      "select * from patients order by updated_at desc",
    );

    return queryResult.rows;
  } catch (err) {
    console.log("error querying for notes: ", err);
    return [];
  }
}
