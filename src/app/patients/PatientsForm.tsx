"use client";

import { Patient } from "@/app/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useReducer } from "react";
import { Button, Group, TextInput } from "@mantine/core";
import { createPatient } from "@/app/server/serverActions";

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
  const searchParams = useSearchParams();
  const pathname = usePathname();
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
    const action = patient?.id ? "update" : "create";

    if (formState.first_name.length < 1) {
      alert("Your patient's name must be at least one character");

      return;
    }

    if (action === "update" && patient?.id) {
      const newPatientValue: Patient = {
        ...patient,
        first_name: formState.first_name,
        last_name: formState.last_name,
      };

      try {
        // await updatePatient(newpatientValue);
      } catch (e) {
        alert(
          "There was an error updating your patient. Please try saving it again.",
        );
      }
    } else {
      try {
        const createdPatient = await createPatient(formData);
        // const newParams = new URLSearchParams(searchParams);
      } catch (e) {
        alert(
          "There was an error creating your patient. Please try submitting again.",
        );
      }
    }
  }

  return (
    <form id="patient-form" action={handleFormSubmit}>
      <Group justify={"space-between"}>
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

        <Button
          variant="filled"
          onClick={() => {
            router.push("/");
          }}
        >
          Create New Patient
        </Button>
      </Group>

      <br />

      <Button variant={"filled"} type="submit">
        save your patient!
      </Button>
    </form>
  );
}
