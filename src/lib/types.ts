export interface JournalEntry {
  startTime: string;
  endTime: string;
  skpkgOption: number;
  description: string;
  quantity: number;
}

export type ShiftType = 'Siang' | 'PagiMalam' | 'LepasMalam' | 'ALL';

export interface UserInput {
  date?: string;
  shiftType: ShiftType;
  startDate?: string;
  endDate?: string;
}

export type ShiftSchedule = {
  [key in Exclude<ShiftType, 'ALL'>]: JournalEntry[];
};
