import { getPatients } from "@/app/server/serverActions";
import PatientsClientEntryPoint from "@/app/notes-manager/patients/PatientsClientEntryPoint";

export default async function PatientsPage() {
  const patients = await getPatients();

  return <PatientsClientEntryPoint patients={patients} />;
}
