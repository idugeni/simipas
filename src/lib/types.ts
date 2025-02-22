// src/lib/types.ts
export interface JournalEntry {
  startTime: string;
  endTime: string;
  skpkgOption: number;
  description: string;
  quantity: number;
}

export interface UserInput {
  date: string;
  shiftType: ShiftType;
}

export type ShiftType = 'Siang' | 'PagiMalam' | 'LepasMalam';

export type ShiftSchedule = {
  [key in ShiftType]: JournalEntry[];
};
