"use client";

import { Patient } from "@/app/types";

import { AppShell, Group, rem, Text, ScrollArea } from "@mantine/core";

import SearchBar from "@/app/notes-components/SearchBar";
import PatientsForm from "@/app/notes-manager/patients/PatientsForm";

export default function PatientsClientEntryPoint({
  patients,
}: {
  patients: Patient[];
}) {
  return (
    <>
      <AppShell.Navbar p="md">
        <AppShell.Section grow my="md" component={ScrollArea}>
          <p>
            <strong>Existing patients:</strong>
          </p>

          {patients.map((patient) => (
            <p key={patient.id}>
              {patient.first_name} {patient.last_name}
            </p>
          ))}
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>
        <h1>create a patient</h1>

        <PatientsForm patient={null} />
      </AppShell.Main>
    </>
  );
}
