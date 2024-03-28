"use client";

import noteFormStyles from "./noteform.module.css";

import { createNote, updateNote } from "@/app/serverActions";
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

export default function SelectedNote({ note }: { note: Note | null }) {
  const [formState, dispatch] = useReducer(formReducer, {
    title: note?.title ?? "",
    body: note?.body ?? "",
  });

  useEffect(() => {
    dispatch({
      type: "reset",
      value: {
        body: note?.body || "",
        title: note?.title || "",
      },
    });
  }, [note?.id]);

  // todo: get rid of `any`
  function handleChangeEvent(event: any) {
    dispatch({ type: event.target.name, value: event.target.value });
  }

  return (
    <div className={pageStyles["selected-note"]}>
      <form
        id="note-form"
        action={async (event) => {
          const action = note?.id ? "update" : "create";

          if (action === "update" && note?.id) {
            const newNoteValue: Note = {
              ...note,
              body: formState.body,
              title: formState.title,
            };

            await updateNote(newNoteValue);
          } else {
            await createNote(event);
          }
        }}
      >
        <input
          type="text"
          placeholder={"add note text"}
          name="title"
          value={formState.title}
          onChange={handleChangeEvent}
        />
        <br />
        <br />

        <textarea
          className={noteFormStyles["note-body"]}
          name="body"
          placeholder={"add note body"}
          rows={10}
          value={formState.body}
          onChange={handleChangeEvent}
        />
        <br />
        <br />

        <button type="submit">submit!</button>
      </form>
    </div>
  );
}
