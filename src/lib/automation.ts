import { BrowserManager } from "./browser";
import { Auth } from "./auth";
import { JournalManager } from "./journalManager";
import { ReportGenerator } from "./reportGenerator";
import logger from "./logger";
import { JournalEntry, UserInput } from "./types";
import { dbManager } from "./database";
import { doLogout } from "./logout";
import { Page } from "playwright";

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

  private async fillShiftEntries(
    entries: JournalEntry[],
    userId?: number,
  ): Promise<number> {
    if (!this.journalManager)
      throw new Error("Journal manager not initialized");
    let count = 0;
    if (userId) {
      const userConfigs = dbManager.getUserConfigs(userId);
      for (const config of userConfigs) {
        try {
          await this.journalManager.fillJournalEntry({
            startTime: config.startTime,
            endTime: config.endTime,
            skpkgOption: config.skpkgOption,
            description: config.description,
            quantity: config.quantity,
          });
          count++;
        } catch (error) {
          logger.error(
            `Gagal mengisi entry ${config.startTime} - ${config.endTime} dengan error ${error}`,
          );
          throw error;
        }
      }
    } else {
      for (const entry of entries) {
        try {
          await this.journalManager.fillJournalEntry(entry);
          count++;
        } catch (error) {
          logger.error(
            `Gagal mengisi entry ${entry.startTime} - ${entry.endTime} dengan error ${error}`,
          );
          throw error;
        }
      }
    }
    return count;
  }

  async run(userInput: UserInput) {
    let totalEntries = 0;
    const startTimeOverall = Date.now();

    try {
      await this.initialize();
      if (!this.auth || !this.journalManager)
        throw new Error("Automation components not properly initialized");
      const user = await this.auth.login();
      await this.journalManager.navigateToJournal();

      await this.journalManager.selectDate(userInput.date!);
      totalEntries = await this.fillShiftEntries([], user.id);
      ReportGenerator.generateCompletionReport(
        userInput,
        startTimeOverall,
        totalEntries,
      );

      if (this.auth && this.page) {
        await doLogout(this.page);
      }
    } catch (error) {
      logger.error(`Gagal mengisi jurnal dengan error ${error}`);
    } finally {
      await this.browserManager.close();
    }

    logger.info("Otomasi SIMIPAS selesai");
    return { totalEntries };
  }
}
