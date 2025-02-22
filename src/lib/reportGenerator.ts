// src/lib/reportGenerator.ts
import logger from '@/lib/logger';
import { MONTH_NAMES, SHIFT_NAMES } from '@/lib/constants';
import { UserInput } from '@/lib/types';

export class ReportGenerator {
  static generateCompletionReport(
    input: UserInput,
    startTime: number,
    entriesCount: number
  ): void {
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    const formattedDate = this.formatDate(input.date);
    const shiftName = SHIFT_NAMES[input.shiftType];

    logger.info('┌───────────────────────────────────────────────');
    logger.info(`│ Pengisian jurnal berhasil dilakukan:          `);
    logger.info('│───────────────────────────────────────────────');
    logger.info(`│ Tanggal     : ${formattedDate}                `);
    logger.info('│───────────────────────────────────────────────');
    logger.info(`│ Shift       : ${shiftName}                    `);
    logger.info('│───────────────────────────────────────────────');
    logger.info(`│ Durasi      : ${duration} detik               `);
    logger.info('│───────────────────────────────────────────────');
    logger.info(`│ Total Entry : ${entriesCount} kegiatan        `);
    logger.info('└───────────────────────────────────────────────');
  }

  private static formatDate(date: string): string {
    const [day, month, year] = date.split('/');
    const dateObj = new Date(Number(year), Number(month) - 1, Number(day));
    return `${dateObj.getDate()} ${MONTH_NAMES[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
  }
}
