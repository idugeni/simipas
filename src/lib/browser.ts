// src/lib/browser.ts
import { chromium, Page } from 'playwright';
import logger from './logger';
import { DEFAULT_TIMEOUT } from './constants';

export class BrowserManager {
  private page: Page | null = null;

  async initialize(): Promise<Page> {
    logger.info('Menginisialisasi browser...');
    try {
      const browser = await chromium.launch({ headless: false });
      this.page = await browser.newPage();
      logger.info('Browser berhasil diinisialisasi.');
      return this.page;
    } catch (error) {
      logger.error(`Gagal menginisialisasi browser: ${error}`);
      throw error;
    }
  }

  async close(): Promise<void> {
    try {
      logger.info('Memulai proses penutupan browser...');
      if (this.page) {
        const browser = this.page.context().browser();
        await Promise.all([
          this.page.close().catch(e => logger.warn(`Gagal menutup halaman: ${e}`)),
          this.waitForNetworkIdle()
        ]);

        if (browser) {
          await browser.close().catch(e => logger.warn(`Gagal menutup browser: ${e}`));
        }
        logger.info('Browser berhasil ditutup.');
      }
    } catch (error) {
      logger.error(`Error saat menutup browser: ${error}`);
    }
  }

  async waitForNetworkIdle(timeout = DEFAULT_TIMEOUT): Promise<void> {
    try {
      await this.page?.waitForLoadState('networkidle', { timeout });
    } catch (error) {
      logger.error(`Network idle state not reached within timeout period: ${error}`);
    }
  }

  getPage(): Page {
    if (!this.page) {
      throw new Error('Browser page not initialized');
    }
    return this.page;
  }
}
