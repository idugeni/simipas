// src/lib/userInterface.ts
import { createReadlineInterface, askQuestion } from '@/lib/utils';
import logger from '@/lib/logger';
import { UserInput } from '@/lib/types';

export class UserInterface {
  static async getUserInput(): Promise<UserInput> {
    logger.info('Meminta input pengguna untuk tanggal dan jenis shift jurnal harian.');

    const date = await this.getDateInput();
    const shiftType = await this.getShiftInput();

    return { date, shiftType };
  }

  private static async getDateInput(): Promise<string> {
    const dateRl = createReadlineInterface();
    const date = await askQuestion(dateRl, 'Masukkan tanggal pengisian jurnal harian (DD/MM/YYYY): ');
    logger.info(`Input tanggal diterima: ${date}`);
    dateRl.close();
    return date;
  }

  private static async getShiftInput(): Promise<'Siang' | 'PagiMalam' | 'LepasMalam'> {
    const shiftRl = createReadlineInterface();
    logger.info('\nPilih jenis shift:\n1. Shift Siang\n2. Shift Pagi dan Malam\n3. Lepas Piket Malam');
    const shiftAnswer = await askQuestion(shiftRl, 'Masukkan nomor pilihan (1-3): ');
    shiftRl.close();

    switch (shiftAnswer) {
      case '1': return 'Siang';
      case '2': return 'PagiMalam';
      case '3': return 'LepasMalam';
      default:
        logger.warn('Input tidak valid, menggunakan default: Shift Siang');
        return 'Siang';
    }
  }

  static async askToContinue(message: string): Promise<boolean> {
    const rl = createReadlineInterface();
    const answer = await askQuestion(rl, message);
    rl.close();
    return answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes';
  }
}
