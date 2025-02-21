// src/types.ts
export interface JournalEntry {
    startTime: string;
    endTime: string;
    skpkgOption: number;
    description: string;
    quantity: number;
  }
  
  export interface ShiftSchedule {
    Siang: JournalEntry[];
    PagiMalam: JournalEntry[];
    LepasMalam: JournalEntry[];
  }