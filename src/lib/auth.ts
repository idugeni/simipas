// src/lib/auth.ts
import { Page } from 'playwright';
import { CONFIG } from '@/lib/config';
import logger from '@/lib/logger';

export class Auth {
  constructor(private page: Page) {}

  async login(): Promise<void> {
    logger.info('Memulai proses login.');
    try {
      await this.page.goto(CONFIG.url);
      logger.info('Berhasil membuka URL login.');

      await this.fillCredentials();
      await this.submitLogin();
      logger.info('Login berhasil, halaman utama dimuat.');
    } catch (error) {
      logger.error(`Gagal melakukan login: ${error}`);
      throw error;
    }
  }

  private async fillCredentials(): Promise<void> {
    await this.page.waitForSelector('//input[@id="user_nip"]', { state: 'visible' });
    await this.page.fill('//input[@id="user_nip"]', CONFIG.credentials.nip);
    logger.info('NIP telah diisi.');

    const loginButton = await this.page.waitForSelector('//div[@class="boxLogin boxShadow"]//input[@id="masuk"]');
    await loginButton?.click();

    await this.page.waitForSelector('//input[@id="vpassword"]', { state: 'visible' });
    await this.page.fill('//input[@id="vpassword"]', CONFIG.credentials.password);
    logger.info('Password telah diisi.');
  }

  private async submitLogin(): Promise<void> {
    const submitButton = await this.page.waitForSelector('//button[@id="btnsimpan"]');
    await submitButton?.click();

    await Promise.all([
      this.page.waitForURL('**/siap/index_new.php'),
      this.page.waitForLoadState('networkidle')
    ]);
  }
}
