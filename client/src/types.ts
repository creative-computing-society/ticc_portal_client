export interface ISlotObject {
  capacity: number;
  date: string;
  end_time: string;
  id: number;
  isAvailable: boolean;
  slots_booked: number;
  start_time: string;
}

export interface IUserObject {
  id: number;
  email: string;
  full_name: string;
  is_ticc_counsellor: boolean;
  is_ticc_manager: boolean;
  phone_number: string;
}

export interface IStudentObject {
  id: number;
  roll_number: string | null;
  branch: string | null;
  admission_year: number | null;
  gender: string | null;
  user: IUserObject;
}
