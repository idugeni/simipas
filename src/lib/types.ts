export type UserType = "PENGAMANAN" | "STAFF ADMINISTRASI";

export interface UserActivity {
  id?: number;
  userId?: number;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  status?: string;
  createdAt?: string;
}

export interface User {
  id?: number;
  fullName: string;
  nip: string;
  password: string;
  userType: UserType;
  activities?: UserActivity[];
}

export interface JournalEntry {
  startTime: string;
  endTime: string;
  title: string;
  description: string;
  status?: string;
}

export type ShiftType = "ALL" | "Siang" | "PagiMalam" | "LepasMalam";

export interface UserInput {
  shiftType: ShiftType;
  date?: string | null;
  startDate?: string | null;
  endDate?: string | null;
}

export interface AutomationResult {
  success: boolean;
  result?: { totalEntries: number };
  error?: string;
}

export type ShiftSchedule = {
  [key in Exclude<ShiftType, "ALL">]: JournalEntry[];
};
