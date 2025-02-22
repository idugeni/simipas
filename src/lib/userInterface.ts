import { createReadlineInterface, askQuestion } from '@/lib/utils';
import logger from '@/lib/logger';
import { UserInput } from '@/lib/types';

export class UserInterface {
  static async getUserInput(): Promise<UserInput> {
    logger.info('Meminta input pengguna untuk tanggal dan jenis shift jurnal harian.');

    const shiftType = await this.getShiftInput();

    if (shiftType === 'ALL') {
      const startDate = await this.getStartDateInput();
      const endDate = await this.getEndDateInput();
      return { shiftType, startDate, endDate };
    } else {
      const date = await this.getDateInput();
      return { date, shiftType };
    }
  }

  private static async getDateInput(): Promise<string> {
    const dateRl = createReadlineInterface();
    const date = await askQuestion(dateRl, 'Masukkan tanggal pengisian jurnal harian (DD/MM/YYYY): ');
    logger.info(`Input tanggal diterima: ${date}`);
    dateRl.close();
    return date;
  }

  private static async getStartDateInput(): Promise<string> {
    const startRl = createReadlineInterface();
    const startDate = await askQuestion(startRl, 'Masukkan tanggal mulai (DD/MM/YYYY): ');
    logger.info(`Input tanggal mulai diterima: ${startDate}`);
    startRl.close();
    return startDate;
  }

  private static async getEndDateInput(): Promise<string> {
    const endRl = createReadlineInterface();
    const endDate = await askQuestion(endRl, 'Masukkan tanggal berakhir (DD/MM/YYYY): ');
    logger.info(`Input tanggal berakhir diterima: ${endDate}`);
    endRl.close();
    return endDate;
  }

  private static async getShiftInput(): Promise<'Siang' | 'PagiMalam' | 'LepasMalam' | 'ALL'> {
    const shiftRl = createReadlineInterface();
    logger.info('\nPilih Shift:\n1. Shift Siang\n2. Shift Pagi dan Malam\n3. Lepas Piket Malam\n4. Semua Jadwal (SPM)');
    const shiftAnswer = await askQuestion(shiftRl, 'Masukkan nomor pilihan (1-4): ');
    shiftRl.close();

    if (shiftAnswer === '1') return 'Siang';
    if (shiftAnswer === '2') return 'PagiMalam';
    if (shiftAnswer === '3') return 'LepasMalam';
    if (shiftAnswer === '4') return 'ALL';

    logger.error('Input tidak valid. Silakan coba lagi.');
    return this.getShiftInput();
  }

  static async askToContinue(message: string): Promise<boolean> {
    const rl = createReadlineInterface();
    const answer = await askQuestion(rl, message);
    rl.close();
    return answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes';
  }
}
