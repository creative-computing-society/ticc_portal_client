export interface IHolidayObject {
  id: number;
  date: string;
  description: string | null;
}
export interface IBookingObject {
  id: number;
  slot: ISlotObject;
  student: number;
  user_id: number;
  student_email: string;
  student_name: string;
  additional_info: string;
  is_active: boolean;
  remarks: Status;
  assigned_counsellor: number | null;
}

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

export type Status =
  | "Pending"
  | "Completed"
  | "Cancelled by student"
  | "Cancelled by counsellor"
  | "Missed by student"
  | "Cancelled due to Institute holiday"
  | "Counsellor on leave";
