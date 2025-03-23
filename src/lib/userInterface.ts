import { createReadlineInterface, askQuestion } from './utils';
import logger from './logger';
import { UserInput } from './types';

export class UserInterface {
  static async getUserInput(): Promise<UserInput> {
    while (true) {
      const shiftType = await this.getShiftInput();
      let userInput: UserInput;
      
      if (shiftType === 'ALL') {
        const startDate = await this.getStartDateInput();
        const endDate = await this.getEndDateInput(startDate);
        userInput = { shiftType, startDate, endDate };
      } else {
        const date = await this.getDateInput();
        userInput = { date, shiftType };
      }
      
      // Konfirmasi akhir sebelum mengeksekusi script
      const isConfirmed = await this.askToContinue('Apakah Anda yakin tanggal sudah benar? (y/n): ');
      if (isConfirmed) {
        return userInput;
      } else {
        logger.info('Baik, silakan masukkan ulang data tanggal.');
      }
    }
  }

  private static async getDateInput(): Promise<string> {
    const rl = createReadlineInterface();
    let validDate = '';
    while (true) {
      const input = await askQuestion(rl, 'Silakan masukkan tanggal pengisian jurnal harian (format DD/MM/YYYY): ');
      if (this.isValidDate(input)) {
        validDate = input;
        break;
      } else {
        logger.error(`Input tanggal tidak valid, yaitu ${input}. Harap masukkan tanggal dengan format DD/MM/YYYY`);
      }
    }
    logger.info(`Input tanggal diterima, yaitu ${validDate}`);
    rl.close();
    return validDate;
  }

  private static async getStartDateInput(): Promise<string> {
    const rl = createReadlineInterface();
    let validDate = '';
    while (true) {
      const input = await askQuestion(rl, 'Silakan masukkan tanggal mulai (format DD/MM/YYYY): ');
      if (this.isValidDate(input)) {
        validDate = input;
        break;
      } else {
        logger.error(`Input tanggal mulai tidak valid, yaitu ${input}. Harap masukkan tanggal dengan format DD/MM/YYYY`);
      }
    }
    logger.info(`Input tanggal mulai diterima, yaitu ${validDate}`);
    rl.close();
    return validDate;
  }

  private static async getEndDateInput(startDate: string): Promise<string> {
    const rl = createReadlineInterface();
    let validDate = '';
    while (true) {
      const input = await askQuestion(rl, 'Silakan masukkan tanggal berakhir (format DD/MM/YYYY): ');
      if (!this.isValidDate(input)) {
        logger.error(`Input tanggal berakhir tidak valid, yaitu ${input}. Harap masukkan tanggal dengan format DD/MM/YYYY`);
        continue;
      }
      const start = this.parseDate(startDate);
      const end = this.parseDate(input);
      if (end < start) {
        logger.error(`Tanggal berakhir ${input} tidak boleh lebih awal dari tanggal mulai ${startDate}`);
        continue;
      }
      validDate = input;
      break;
    }
    logger.info(`Input tanggal berakhir diterima, yaitu ${validDate}`);
    rl.close();
    return validDate;
  }

  private static async getShiftInput(): Promise<'Siang' | 'PagiMalam' | 'LepasMalam' | 'ALL'> {
    const rl = createReadlineInterface();
    logger.info('Pilih shift yang diinginkan:\n1. Shift Siang\n2. Shift Pagi dan Malam\n3. Lepas Piket Malam\n4. Semua Shift');
    const shiftAnswer = await askQuestion(rl, 'Silakan masukkan nomor pilihan (1-4): ');
    rl.close();
    if (shiftAnswer === '1') return 'Siang';
    if (shiftAnswer === '2') return 'PagiMalam';
    if (shiftAnswer === '3') return 'LepasMalam';
    if (shiftAnswer === '4') return 'ALL';
    logger.error('Input tidak valid. Harap coba kembali dengan memilih nomor yang sesuai');
    return this.getShiftInput();
  }

  static async askToContinue(message: string): Promise<boolean> {
    const rl = createReadlineInterface();
    const answer = await askQuestion(rl, message);
    rl.close();
    return answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes';
  }

  private static isValidDate(dateStr: string): boolean {
    const regex = /^(0?[1-9]|[12]\d|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$/;
    if (!regex.test(dateStr)) return false;
    const [day, month, year] = dateStr.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
  }

  private static parseDate(dateStr: string): Date {
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day);
  }
}
