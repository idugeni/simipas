// src/lib/logout.ts
import { Page } from 'playwright';
import { DEFAULT_TIMEOUT } from '@/lib/constants';
import logger from '@/lib/logger';

export async function doLogout(page: Page): Promise<void> {
  try {
    // Menunggu event dialog dengan penanganan jika tidak muncul
    const dialogPromise = page.waitForEvent('dialog', { timeout: DEFAULT_TIMEOUT }).catch(() => null);
    await page.click('a[onclick*="do_logout"]');
    const dialog = await dialogPromise;
    if (dialog) {
      logger.info(`Dialog muncul dengan pesan ${dialog.message()} dan akan diterima`);
      await dialog.accept().catch((error: unknown) => {
        const errorMessage = error instanceof Error ? error.message : String(error);
        logger.warn(`Gagal menerima dialog karena ${errorMessage} sehingga proses logout tetap dilanjutkan`);
      });
    } else {
      logger.info('Tidak ada dialog logout yang muncul sehingga proses logout dilanjutkan');
    }
    await page.waitForLoadState('networkidle', { timeout: DEFAULT_TIMEOUT });
    logger.info('Logout berhasil tanpa adanya hambatan');
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.error(`Terjadi kesalahan saat logout karena ${errorMessage} sehingga proses logout tidak dapat diselesaikan`);
  }
}
