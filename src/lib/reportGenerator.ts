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
    let formattedDate: string;
    let shiftName: string;

    if (input.shiftType === 'ALL') {
      formattedDate = `${this.formatDate(input.startDate!)} - ${this.formatDate(input.endDate!)}`;
      shiftName = 'Semua Shift';
    } else {
      formattedDate = this.formatDate(input.date!);
      shiftName = SHIFT_NAMES[input.shiftType];
    }

    logger.info(`Pengisian jurnal berhasil dilakukan pada tanggal ${formattedDate} untuk ${shiftName}, selama ${duration} detik, dan mencatat ${entriesCount} kegiatan.`);
  }

  private static formatDate(date: string): string {
    const [day, month, year] = date.split('/');
    const dateObj = new Date(Number(year), Number(month) - 1, Number(day));
    return `${dateObj.getDate()} ${MONTH_NAMES[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
  }
}
