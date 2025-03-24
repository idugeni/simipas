import "dotenv/config";
import logger from "./logger";

export const CONFIG = {
  url: process.env.SIMPEG_URL || "",
};

logger.info(`URL SIMPEG ${CONFIG.url ? "berhasil dimuat" : "gagal dimuat"}.`);

if (!CONFIG.url) {
  logger.error(
    "URL SIMPEG tidak terbaca. Pastikan file .env telah dikonfigurasi dengan benar.",
  );
  process.exit(1);
}
