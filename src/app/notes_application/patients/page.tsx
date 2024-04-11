import { getPatients } from "@/app/server/serverActions";
import PatientsClientEntryPoint from "@/app/notes_application/patients/PatientsClientEntryPoint";

export default async function PatientsPage() {
  const patients = await getPatients();

  return <PatientsClientEntryPoint patients={patients} />;
}
