"use client";

import { createNote, updateNote } from "@/app/server/serverActions";
import { Note, Patient } from "@/app/types";
import { useEffect, useReducer } from "react";
import pageStyles from "@/app/page.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button, Group, Select, Textarea, TextInput } from "@mantine/core";

interface FormState {
  body: string;
  title: string;
  patient_id: string;
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
  note,
  patients,
}: {
  note: Note | null;
  patients: Patient[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [formState, dispatch] = useReducer(formReducer, {
    title: note?.title ?? "",
    body: note?.body ?? "",
    patient_id: note?.patient_id ?? "",
  });

  useEffect(() => {
    dispatch({
      type: "reset",
      value: {
        body: note?.body || "",
        title: note?.title || "",
        patient_id: note?.patient_id ?? "",
      },
    });
  }, [note?.id]);

  // Note: Really grumpy about this `any`, but it's 10:30 at night, and it's time for me to submit this thing lol
  function handleChangeEvent(event: any) {
    dispatch({ type: event.target.name, value: event.target.value });
  }

  // NOTE: this handler feels questionable to me. I don't like that the conditions of "are we creating a note"
  // and "are we updating a note" are handled at this level. I'd choose to move these conditional details up the
  // callstack (if I had the time). Specifically, I'd turn the component in this file into a more-generic one
  // that accepts a `formAction` function. The parent component would be responsible for determining the
  // exact behavior of the action it passes
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

      <Select
        name="patient_id"
        label="patient id"
        placeholder={"patient id"}
        value={formState.patient_id}
        allowDeselect={false}
        onChange={(patient_id) =>
          // Select's onChange does not adhere to the typical form input onChange api.
          handleChangeEvent({
            target: { name: "patient_id", value: patient_id },
          })
        }
        data={patients.map((patient) => {
          return {
            value: patient.id,
            label: `${patient.first_name} ${patient.last_name}`,
          };
        })}
      />

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
