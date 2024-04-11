export interface Note {
  id: string;
  patient_id: string;
  title: string;
  body: string;
  created_at: Date;
  updated_at: Date;
}

export interface Patient {
  id: string;
  first_name: string;
  last_name: string;
  created_at: Date;
  updated_at: Date;
}
