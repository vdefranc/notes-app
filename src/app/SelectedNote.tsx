"use client";

import noteFormStyles from "./noteform.module.css";
import { useSearchParams } from "next/navigation";
import { createNote } from "@/app/serverActions";
import { Note } from "@/app/notes/types";
import { useReducer } from "react";

interface FormState {
  body: string;
  title: string;
}

interface FormAction {
  type: keyof FormState;
  value: string;
}

function formReducer(state: FormState, action: FormAction) {
  return {
    ...state,
    [action.type]: action.value,
  };
}

export default function SelectedNote({ notes }: { notes: Note[] }) {
  // should move this to the top-level server component and just do a SELECT
  const searchParams = useSearchParams();
  const selectedNoteId = searchParams.get("note");
  const selectedNote = notes.find((note) => note.id === selectedNoteId);

  const [formState, dispatch] = useReducer(formReducer, {
    title: selectedNote?.title ?? "",
    body: selectedNote?.body ?? "",
  });

  // todo: get rid of `any`
  function handleChangeEvent(event: any) {
    dispatch({ type: event.target.name, value: event.target.value });
  }

  return (
    <form action={createNote} id="note-form" onChange={handleChangeEvent}>
      <input type="text" name="title" value={formState.title} />
      <br />
      <br />

      <textarea
        className={noteFormStyles["note-body"]}
        name="body"
        rows={10}
        value={formState.body}
      />
      <br />
      <br />

      <button type="submit">submit!</button>
    </form>
  );
}
