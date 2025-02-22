// src/lib/automation.ts
import { BrowserManager } from '@/lib/browser';
import { Auth } from '@/lib/auth';
import { JournalManager } from '@/lib/journalManager';
import { UserInterface } from '@/lib/userInterface';
import { ReportGenerator } from '@/lib/reportGenerator';
import { SHIFT_SCHEDULES } from '@/lib/schedules';
import logger from '@/lib/logger';
import { JournalEntry } from '@/lib/types';

export class SimpegAutomation {
  private browserManager: BrowserManager;
  private auth: Auth | null = null;
  private journalManager: JournalManager | null = null;

  constructor() {
    this.browserManager = new BrowserManager();
  }

  private async initialize() {
    const page = await this.browserManager.initialize();
    this.auth = new Auth(page);
    this.journalManager = new JournalManager(page);
  }

  private async fillShiftEntries(entries: JournalEntry[]) {
    if (!this.journalManager) {
      throw new Error('Journal manager not initialized');
    }

    logger.info('Memulai pengisian jurnal untuk shift yang dipilih.');

    for (const entry of entries) {
      try {
        await this.journalManager.fillJournalEntry(entry);
        logger.info(`Entry selesai diisi: ${entry.startTime} - ${entry.endTime}`);
      } catch (error) {
        logger.error(`Gagal mengisi entry ${entry.startTime} - ${entry.endTime}: ${error}`);
        throw error;
      }
    }

    logger.info('Semua entry berhasil diisi.');
  }

  async run() {
    let runAgain = true;

    while (runAgain) {
      const startTime = Date.now();
      try {
        const userInput = await UserInterface.getUserInput();

        await this.initialize();

        if (!this.auth || !this.journalManager) {
          throw new Error('Automation components not properly initialized');
        }

        await this.auth.login();
        await this.journalManager.navigateToJournal();
        await this.journalManager.selectDate(userInput.date);

        const shiftSchedule = SHIFT_SCHEDULES[userInput.shiftType];
        if (!shiftSchedule) {
          throw new Error(`Jadwal untuk ${userInput.shiftType} tidak ditemukan`);
        }

        await this.fillShiftEntries(shiftSchedule);

        ReportGenerator.generateCompletionReport(
          userInput,
          startTime,
          shiftSchedule.length
        );

        runAgain = await UserInterface.askToContinue('\nApakah Anda ingin mengisi jurnal lagi? (Y/n): ');

        if (runAgain) {
          logger.info('Memulai pengisian jurnal baru...');
        } else {
          logger.info('Mengakhiri program pengisian jurnal.');
        }
      } catch (error) {
        logger.error(`Gagal mengisi jurnal: ${error}`);
        runAgain = await UserInterface.askToContinue('\nApakah Anda ingin mencoba lagi? (Y/n): ');
      } finally {
        await this.browserManager.close();
      }
    }

    logger.info('Terima kasih telah menggunakan SIMIPAS! 👋');
    logger.info('Repository: https://github.com/idugeni/simipas');
  }
}
