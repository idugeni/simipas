import { BrowserManager } from '@/lib/browser';
import { Auth } from '@/lib/auth';
import { JournalManager } from '@/lib/journalManager';
import { UserInterface } from '@/lib/userInterface';
import { ReportGenerator } from '@/lib/reportGenerator';
import { SHIFT_SCHEDULES } from '@/lib/schedules';
import logger from '@/lib/logger';
import { JournalEntry, UserInput, ShiftType } from '@/lib/types';
import { doLogout } from '@/lib/logout';
import { Page } from 'playwright';

export class SimpegAutomation {
  private browserManager: BrowserManager;
  private auth: Auth | null = null;
  private journalManager: JournalManager | null = null;
  private page: Page | null = null;

  constructor() {
    this.browserManager = new BrowserManager();
  }

  private async initialize() {
    this.page = await this.browserManager.initialize();
    this.auth = new Auth(this.page);
    this.journalManager = new JournalManager(this.page);
  }

  private async fillShiftEntries(entries: JournalEntry[]): Promise<number> {
    if (!this.journalManager) throw new Error('Journal manager not initialized');
    let count = 0;
    for (const entry of entries) {
      try {
        await this.journalManager.fillJournalEntry(entry);
        count++;
      } catch (error) {
        logger.error(`Gagal mengisi entry ${entry.startTime} - ${entry.endTime} dengan error ${error}`);
        throw error;
      }
    }
    return count;
  }

  private parseDate(dateStr: string): Date {
    const [day, month, year] = dateStr.split('/');
    return new Date(Number(year), Number(month) - 1, Number(day));
  }

  async run() {
    let runAgain = true;
    let userInput: UserInput = await UserInterface.getUserInput();
    let totalEntries = 0;
    const startTimeOverall = Date.now();

    try {
      await this.initialize();
      if (!this.auth || !this.journalManager) throw new Error('Automation components not properly initialized');
      await this.auth.login();
      await this.journalManager.navigateToJournal();

      if (userInput.shiftType !== 'ALL') {
        await this.journalManager.selectDate(userInput.date!);
        const shiftSchedule = SHIFT_SCHEDULES[userInput.shiftType];
        if (!shiftSchedule) throw new Error(`Jadwal untuk ${userInput.shiftType} tidak ditemukan`);
        totalEntries = await this.fillShiftEntries(shiftSchedule);
        ReportGenerator.generateCompletionReport(userInput, startTimeOverall, totalEntries);
      } else {
        const startDate = this.parseDate(userInput.startDate!);
        const endDate = this.parseDate(userInput.endDate!);
        const allShiftTypes: Exclude<ShiftType, 'ALL'>[] = ['Siang', 'PagiMalam', 'LepasMalam'];
        let dayIndex = 0;
        for (let dt = new Date(startDate); dt <= endDate; dt.setDate(dt.getDate() + 1)) {
          const day = String(dt.getDate()).padStart(2, '0');
          const month = String(dt.getMonth() + 1).padStart(2, '0');
          const year = dt.getFullYear();
          const formattedDate = `${day}/${month}/${year}`;
          await this.journalManager.selectDate(formattedDate);
          const shift = allShiftTypes[dayIndex % allShiftTypes.length];
          const shiftSchedule = SHIFT_SCHEDULES[shift];
          if (shiftSchedule) {
            totalEntries += await this.fillShiftEntries(shiftSchedule);
          } else {
            logger.warn(`Jadwal untuk ${shift} tidak ditemukan pada tanggal ${formattedDate}`);
          }
          dayIndex++;
        }
        ReportGenerator.generateCompletionReport(userInput, startTimeOverall, totalEntries);
      }

      runAgain = await UserInterface.askToContinue('\nApakah Anda ingin mengisi jurnal lagi? (y/n): ');

      while (runAgain) {
        userInput = await UserInterface.getUserInput();
        totalEntries = 0;
        const startTimeLoop = Date.now();
        if (userInput.shiftType !== 'ALL') {
          await this.journalManager.selectDate(userInput.date!);
          const shiftSchedule = SHIFT_SCHEDULES[userInput.shiftType];
          if (!shiftSchedule) throw new Error(`Jadwal untuk ${userInput.shiftType} tidak ditemukan`);
          totalEntries = await this.fillShiftEntries(shiftSchedule);
          ReportGenerator.generateCompletionReport(userInput, startTimeLoop, totalEntries);
        } else {
          const startDate = this.parseDate(userInput.startDate!);
          const endDate = this.parseDate(userInput.endDate!);
          const allShiftTypes: Exclude<ShiftType, 'ALL'>[] = ['Siang', 'PagiMalam', 'LepasMalam'];
          let dayIndex = 0;
          for (let dt = new Date(startDate); dt <= endDate; dt.setDate(dt.getDate() + 1)) {
            const day = String(dt.getDate()).padStart(2, '0');
            const month = String(dt.getMonth() + 1).padStart(2, '0');
            const year = dt.getFullYear();
            const formattedDate = `${day}/${month}/${year}`;
            await this.journalManager.selectDate(formattedDate);
            const shift = allShiftTypes[dayIndex % allShiftTypes.length];
            const shiftSchedule = SHIFT_SCHEDULES[shift];
            if (shiftSchedule) {
              totalEntries += await this.fillShiftEntries(shiftSchedule);
            } else {
              logger.warn(`Jadwal untuk ${shift} tidak ditemukan pada tanggal ${formattedDate}`);
            }
            dayIndex++;
          }
          ReportGenerator.generateCompletionReport(userInput, startTimeLoop, totalEntries);
        }
        runAgain = await UserInterface.askToContinue('\nApakah Anda ingin mengisi jurnal lagi? (y/n): ');
      }
      
      if (!runAgain && this.auth && this.page) {
        await doLogout(this.page);
      }
    } catch (error) {
      logger.error(`Gagal mengisi jurnal dengan error ${error}`);
    } finally {
      await this.browserManager.close();
    }

    logger.info('Terima kasih telah menggunakan SIMIPAS! 👋');
    logger.info('Repository: https://github.com/idugeni/simipas');
  }
}
