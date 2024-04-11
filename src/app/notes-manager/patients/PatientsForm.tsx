"use client";

import { Patient } from "@/app/types";
import { useRouter } from "next/navigation";
import { useEffect, useReducer } from "react";
import { AppShell, Button, Group, ScrollArea, TextInput } from "@mantine/core";
import { createPatient } from "@/app/server/serverActions";
import SearchBar from "@/app/notes-components/SearchBar";
import NotesList from "@/app/notes-components/NotesList";

interface FormState {
  first_name: string;
  last_name: string;
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

export default function PatientsForm({ patient }: { patient: Patient | null }) {
  const router = useRouter();
  const [formState, dispatch] = useReducer(formReducer, {
    first_name: patient?.first_name ?? "",
    last_name: patient?.last_name ?? "",
  });

  useEffect(() => {
    dispatch({
      type: "reset",
      value: {
        first_name: patient?.first_name || "",
        last_name: patient?.last_name || "",
      },
    });
  }, [patient?.id]);

  function handleChangeEvent(event: any) {
    dispatch({ type: event.target.name, value: event.target.value });
  }

  async function handleFormSubmit(formData: FormData) {
    if (formState.first_name.length < 1) {
      alert("Your patient's name must be at least one character");

      return;
    }

    try {
      await createPatient(formData);
    } catch (e) {
      alert(
        "There was an error creating your patient. Please try submitting again.",
      );
    }
  }

  return (
    <>
      <form id="patient-form" action={handleFormSubmit}>
        <TextInput
          name="first_name"
          label="patient first name"
          placeholder={"patient title"}
          value={formState.first_name}
          onChange={handleChangeEvent}
        />

        <TextInput
          name="last_name"
          label="patient last name"
          placeholder={"patient last name"}
          value={formState.last_name}
          onChange={handleChangeEvent}
        />

        <br />

        <Button variant={"filled"} type="submit">
          submit!
        </Button>
      </form>
    </>
  );
}
