"use client";

import { createNote, updateNote } from "@/app/server/serverActions";
import { Note } from "@/app/types";
import { useEffect, useReducer } from "react";
import pageStyles from "@/app/page.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button, Group, Textarea, TextInput } from "@mantine/core";

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
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
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

  async function handleFormSubmit(formData: FormData) {
    const action = note?.id ? "update" : "create";

    if (formState.body.length > 300 || formState.body.length < 20) {
      alert(
        "Your note content must be between 20 and 300 characters in length!",
      );

      return;
    }

    if (formState.title.length < 1) {
      alert("Your note must have a title.");

      return;
    }

    if (action === "update" && note?.id) {
      const newNoteValue: Note = {
        ...note,
        body: formState.body,
        title: formState.title,
      };

      try {
        await updateNote(newNoteValue);
      } catch (e) {
        alert(
          "There was an error updating your note. Please try saving it again.",
        );
      }
    } else {
      try {
        const createdNote = await createNote(formData);
        const newParams = new URLSearchParams(searchParams);

        newParams.set("note", createdNote.id);
        router.replace(`${pathname}?${newParams.toString()}`);
      } catch (e) {
        alert(
          "There was an error creating your note. Please try submitting again.",
        );
      }
    }
  }

  return (
    <form id="note-form" action={handleFormSubmit}>
      <Group justify={"space-between"}>
        <TextInput
          name="title"
          label="Note title"
          placeholder={"note title"}
          value={formState.title}
          onChange={handleChangeEvent}
        />

        <Button
          variant="filled"
          onClick={() => {
            router.push("/");
          }}
        >
          Create New Note
        </Button>
      </Group>

      <br />

      <Textarea
        name="body"
        label={"Note content"}
        description="Your note can be between 20 and 300 characters long."
        placeholder={"add note body"}
        rows={10}
        value={formState.body}
        onChange={handleChangeEvent}
      />

      <br />

      <Button variant={"filled"} type="submit">
        save your note!
      </Button>
    </form>
  );
}
