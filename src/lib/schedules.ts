// src/schedules.ts
import { ShiftSchedule } from '@/lib/types';  // Remove unused JournalEntry import
import { CONFIG } from '@/lib/config';

export const SHIFT_SCHEDULES: ShiftSchedule = {
    Siang: [
        {
            startTime: "13:01",
            endTime: "13:15",
            skpkgOption: 1,
            description: CONFIG.taskDescriptions.option1,
            quantity: 1
        },
        {
            startTime: "13:15",
            endTime: "19:15",
            skpkgOption: 2,
            description: CONFIG.taskDescriptions.option2,
            quantity: 1
        }
    ],
    PagiMalam: [
        {
            startTime: "07:01",
            endTime: "07:15",
            skpkgOption: 1,
            description: CONFIG.taskDescriptions.option1,
            quantity: 1
        },
        {
            startTime: "07:15",
            endTime: "13:15",
            skpkgOption: 2,
            description: CONFIG.taskDescriptions.option2,
            quantity: 1
        },
        {
            startTime: "19:01",
            endTime: "19:15",
            skpkgOption: 1,
            description: CONFIG.taskDescriptions.option1,
            quantity: 1
        },
        {
            startTime: "19:15",
            endTime: "23:59",
            skpkgOption: 2,
            description: CONFIG.taskDescriptions.option2,
            quantity: 1
        }
    ],
    LepasMalam: [
        {
            startTime: "01:01",
            endTime: "08:15",
            skpkgOption: 2,
            description: CONFIG.taskDescriptions.option2,
            quantity: 1
        }
    ]
};
