"use client";

import noteFormStyles from "./noteform.module.css";
import { useSearchParams } from "next/navigation";
import { createNote } from "@/app/serverActions";
import { Note } from "@/app/notes/types";
import { useEffect, useReducer } from "react";
import pageStyles from "@/app/page.module.css";

interface FormState {
  body: string;
  title: string;
}

interface InputAction {
  type: keyof FormState;
  value: string;
}

interface ResetAction {
  type: "reset";
  value: FormState;
}

type FormAction = InputAction | ResetAction;

function formReducer(state: FormState, action: FormAction) {
  switch (action.type) {
    case "reset":
      return { ...action.value };
    default:
      return {
        ...state,
        [action.type]: action.value,
      };
  }
}

export default function SelectedNote({
  notes,
  note,
}: {
  notes: Note[];
  note: Note | null;
}) {
  // should move this to the top-level server component and just do a SELECT
  const searchParams = useSearchParams();
  const selectedNoteId = searchParams.get("note");
  const selectedNote = note || notes.find((note) => note.id === selectedNoteId);

  useEffect(() => {
    if (note?.body && note?.title) {
      dispatch({
        type: "reset",
        value: {
          body: note.body,
          title: note.title,
        },
      });
    }
  }, [note?.id]);

  const [formState, dispatch] = useReducer(formReducer, {
    title: selectedNote?.title ?? "",
    body: selectedNote?.body ?? "",
  });

  // todo: get rid of `any`
  function handleChangeEvent(event: any) {
    dispatch({ type: event.target.name, value: event.target.value });
  }

  return (
    <div className={pageStyles["selected-note"]}>
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
    </div>
  );
}
