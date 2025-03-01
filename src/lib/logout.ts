// src/lib/logout.ts
import { Page } from 'playwright';
import { DEFAULT_TIMEOUT } from '@/lib/constants';
import logger from '@/lib/logger';

export async function doLogout(page: Page): Promise<void> {
  try {
    // Siapkan penanganan untuk event dialog, jika muncul
    const dialogPromise = page.waitForEvent('dialog', { timeout: DEFAULT_TIMEOUT }).catch(() => null);

    // Jika logout menyebabkan navigasi, tunggu secara bersamaan dengan aksi klik
    const [navigationResponse] = await Promise.all([
      page.waitForNavigation({ timeout: DEFAULT_TIMEOUT }).catch(() => null),
      page.click('a[onclick*="do_logout"]')
    ]);

    // Tangani dialog jika muncul
    const dialog = await dialogPromise;
    if (dialog) {
      logger.info(`Dialog muncul dengan pesan "${dialog.message()}" dan akan diterima`);
      try {
        await dialog.accept();
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        logger.warn(`Gagal menerima dialog karena: ${errorMessage}. Proses logout tetap dilanjutkan`);
      }
    } else {
      logger.info('Tidak ada dialog logout yang muncul, melanjutkan proses logout.');
    }

    // Jika tidak terjadi navigasi, kita bisa menunggu state tertentu sebagai indikasi logout berhasil
    if (!navigationResponse) {
      // Misalnya, menunggu selector form login muncul (sesuaikan dengan aplikasi Anda)
      // await page.waitForSelector('form#login', { timeout: DEFAULT_TIMEOUT });
      // Atau, jika memang diperlukan, tunggu sampai state jaringan idle:
      await page.waitForLoadState('networkidle', { timeout: DEFAULT_TIMEOUT });
    }
    logger.info('Logout berhasil tanpa hambatan.');
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.error(`Terjadi kesalahan saat logout: ${errorMessage}. Proses logout tidak dapat diselesaikan`);
  }
}
