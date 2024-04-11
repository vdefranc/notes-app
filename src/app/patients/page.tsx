import PatientsForm from "@/app/patients/PatientsForm";
import { getPatients } from "@/app/server/serverActions";

export default async function PatientsPage() {
  const patients = await getPatients();

  return (
    <>
      <h1>patients page</h1>

      <PatientsForm patient={null} />

      <div>
        {patients.map((patient) => (
          <p key={patient.id}>{patient.first_name}</p>
        ))}
      </div>
    </>
  );
}
