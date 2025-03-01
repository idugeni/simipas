import 'dotenv/config';
import logger from '@/lib/logger';
import taskDescriptions from '@/data/tasks.json';

export const CONFIG = {
  url: process.env.SIMPEG_URL || '',
  credentials: {
    nip: process.env.SIMPEG_NIP || '',
    password: process.env.SIMPEG_PASSWORD || ''
  },
  taskDescriptions
};

logger.info(`URL SIMPEG ${CONFIG.url ? 'berhasil dimuat' : 'gagal dimuat'}.`);
logger.info(`NIP ${CONFIG.credentials.nip ? 'berhasil dimuat' : 'gagal dimuat'}.`);
logger.info(`Password ${CONFIG.credentials.password ? 'berhasil dimuat' : 'gagal dimuat'}.`);

if (!CONFIG.url || !CONFIG.credentials.nip || !CONFIG.credentials.password) {
  logger.error('Variabel lingkungan tidak terbaca. Pastikan file .env telah dikonfigurasi dengan benar.');
  process.exit(1);
}
