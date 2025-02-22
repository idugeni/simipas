import 'dotenv/config';
import logger from '@/lib/logger';

export const CONFIG = {
  url: process.env.SIMPEG_URL || '',
  credentials: {
    nip: process.env.SIMPEG_NIP || '',
    password: process.env.SIMPEG_PASSWORD || '',
  },
  taskDescriptions: {
    option1: 'Melaksanakan koordinasi dengan Kepala Regu Pengamanan untuk mengidentifikasi dan mengevaluasi potensi risiko keamanan, serta menyampaikan informasi terkait potensi ancaman dan menerima arahan demi peningkatan keamanan.',
    option2: 'Melaksanakan serangkaian tugas pengamanan dan pengawasan di area Pintu Utama, termasuk verifikasi identitas pengunjung, penggeledahan badan dan barang bawaan, pemantauan CCTV, penanganan tamu khusus, patroli keamanan area P2U, dan pelaporan kejadian mencurigakan atau pelanggaran peraturan, guna memastikan keamanan, ketertiban, dan mencegah masuknya barang terlarang atau orang yang tidak berkepentingan.'
  }
};

// Logging untuk memastikan environment variables terbaca
logger.info(`URL SIMPEG: ${CONFIG.url ? '✅ Terbaca' : '❌ Tidak Terbaca'}`);
logger.info(`NIP: ${CONFIG.credentials.nip ? '✅ Terbaca' : '❌ Tidak Terbaca'}`);
logger.info(`Password: ${CONFIG.credentials.password ? '✅ Terbaca' : '❌ Tidak Terbaca'}`);

// Jika ada variabel yang kosong, tampilkan error dan hentikan aplikasi
if (!CONFIG.url || !CONFIG.credentials.nip || !CONFIG.credentials.password) {
  logger.error('❌ ERROR: Variabel lingkungan tidak terbaca! Pastikan file .env sudah benar.');
  process.exit(1);
}
