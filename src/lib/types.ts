export type UserType = "PENGAMANAN" | "STAFF ADMINISTRASI";

export interface User {
  id?: number;
  fullName: string;
  nip: string;
  password: string;
  userType: UserType;
  skpkgOption: number;
  startTime: string;
  endTime: string;
  description: string;
  quantity: number;
}

export interface JournalEntry {
  startTime: string;
  endTime: string;
  skpkgOption: number;
  description: string;
  quantity: number;
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
