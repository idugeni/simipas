import { chromium, Page } from 'playwright';
import { CONFIG } from '@/lib/config';
import { JournalEntry } from '@/lib/types';
import { createReadlineInterface, askQuestion } from '@/lib/utils';
import { SHIFT_SCHEDULES } from '@/lib/schedules';
import winston from 'winston';
import ansiStyles from 'ansi-styles';

// Setup logger dengan Winston dan ANSI Styles
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.uncolorize(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message }) => {
      const ts = timestamp as string;
      const [date, time] = ts.split(' ');
      const customLevel = level === 'info' ? 'SIMIPAS' : level;
      return `${ansiStyles.bold.open}${ansiStyles.blue.open}[${date}] - [${time}] ${customLevel}:${ansiStyles.blue.close} ${message}${ansiStyles.bold.close}`;
    }),
    winston.format.colorize({ all: true })
  ),
  transports: [new winston.transports.Console()]
});

export default logger;

export class SimpegAutomation {
  private page!: Page;
  private readonly DEFAULT_TIMEOUT = 30000; // 30 seconds

  constructor() {
    // Initialize in the initialize method
  }

  private async waitForNetworkIdle(timeout = this.DEFAULT_TIMEOUT) {
    try {
      await this.page.waitForLoadState('networkidle', { timeout });
    } catch (error) {
      logger.warn('Network did not reach idle state within timeout period');
    }
  }

  async askForUserInput(): Promise<{ date: string; shiftType: 'Siang' | 'PagiMalam' | 'LepasMalam' }> {
    logger.info('Meminta input pengguna untuk tanggal dan jenis shift jurnal harian.');

    // Ask for date
    const dateRl = createReadlineInterface();
    const date = await askQuestion(dateRl, 'Masukkan tanggal pengisian jurnal harian (DD/MM/YYYY): ');
    logger.info(`Input tanggal diterima: ${date}`);
    dateRl.close();

    // Ask for shift type
    const shiftRl = createReadlineInterface();
    logger.info('\nPilih jenis shift:\n1. Shift Siang\n2. Shift Pagi dan Malam\n3. Lepas Piket Malam');
    const shiftAnswer = await askQuestion(shiftRl, 'Masukkan nomor pilihan (1-3): ');
    shiftRl.close();

    let shiftType: 'Siang' | 'PagiMalam' | 'LepasMalam';
    switch (shiftAnswer) {
      case '1':
        shiftType = 'Siang';
        break;
      case '2':
        shiftType = 'PagiMalam';
        break;
      case '3':
        shiftType = 'LepasMalam';
        break;
      default:
        logger.warn('Input tidak valid, menggunakan default: Shift Siang');
        shiftType = 'Siang';
    }
    logger.info(`Input jenis shift diterima: ${shiftType}`);

    return { date, shiftType };
  }

  async initialize() {
    logger.info('Menginisialisasi browser dalam mode headless.');
    try {
      const browser = await chromium.launch({ headless: false });
      this.page = await browser.newPage();
      logger.info('Browser berhasil diinisialisasi.');
    } catch (error) {
      logger.error(`Gagal menginisialisasi browser: ${error}`);
      throw error;
    }
  }

  async login() {
    logger.info('Memulai proses login.');
    try {
      await this.page.goto(CONFIG.url);
      logger.info('Berhasil membuka URL login.');

      // Wait for the NIP input to be ready
      await this.page.waitForSelector('//input[@id="user_nip"]', { state: 'visible' });
      await this.page.fill('//input[@id="user_nip"]', CONFIG.credentials.nip);
      logger.info('NIP telah diisi.');

      const loginButton = await this.page.waitForSelector('//div[@class="boxLogin boxShadow"]//input[@id="masuk"]');
      await loginButton?.click();

      await this.page.waitForSelector('//input[@id="vpassword"]', { state: 'visible' });
      await this.page.fill('//input[@id="vpassword"]', CONFIG.credentials.password);
      logger.info('Password telah diisi.');

      const submitButton = await this.page.waitForSelector('//button[@id="btnsimpan"]');
      await submitButton?.click();

      // Wait for navigation and network idle
      await Promise.all([
        this.page.waitForURL('**/siap/index_new.php'),
        this.waitForNetworkIdle()
      ]);
      logger.info('Login berhasil, halaman utama dimuat.');
    } catch (error) {
      logger.error(`Gagal melakukan login: ${error}`);
      throw error;
    }
  }

  async navigateToJournal() {
    logger.info('Navigasi menuju halaman Jurnal Harian.');
    try {
      const kinerjaLink = await this.page.waitForSelector('//a[normalize-space()="KINERJA"]', {
        state: 'visible',
        timeout: this.DEFAULT_TIMEOUT
      });
      await kinerjaLink?.click();

      const jurnalLink = await this.page.waitForSelector('//td[normalize-space()="Jurnal Harian"]', {
        state: 'visible',
        timeout: this.DEFAULT_TIMEOUT
      });
      await jurnalLink?.click();

      // Wait for both the date input and network idle
      await Promise.all([
        this.page.waitForSelector('//input[@id="tgla"]', { state: 'visible' }),
        this.waitForNetworkIdle()
      ]);
      logger.info('Halaman Jurnal Harian berhasil dimuat.');
    } catch (error) {
      logger.error(`Gagal navigasi ke halaman jurnal: ${error}`);
      throw error;
    }
  }

  async selectDate(date: string) {
    logger.info(`Memilih tanggal: ${date}`);
    try {
      // Wait for date input to be visible and clickable
      const dateInput = await this.page.waitForSelector('//input[@id="tgla"]', {
        state: 'visible',
        timeout: this.DEFAULT_TIMEOUT
      });
      await dateInput?.click();

      // Wait for datepicker to appear
      await this.page.waitForSelector('.datepicker', {
        state: 'visible',
        timeout: this.DEFAULT_TIMEOUT
      });
      await this.waitForNetworkIdle();

      // Select the date
      const dateCell = await this.page.waitForSelector(`//td[normalize-space()="${date.split('/')[0]}"]`, {
        state: 'visible',
        timeout: this.DEFAULT_TIMEOUT
      });
      await dateCell?.click();

      // Wait for date selection to be processed
      await this.waitForNetworkIdle();
      logger.info(`Tanggal ${date} telah dipilih.`);
    } catch (error) {
      logger.error(`Gagal memilih tanggal: ${error}`);
      throw error;
    }
  }

  async fillJournalEntry(entry: JournalEntry) {
    logger.info(`Mengisi Jam Mulai ${entry.startTime} - Jam Selesai ${entry.endTime}`);
    try {
      // Wait for add button and click
      const addButton = await this.page.waitForSelector('//a[@id="tambah"]', { state: 'visible' });
      await addButton?.click();
      await this.waitForNetworkIdle();

      // Wait for form elements to be visible
      await Promise.all([
        this.page.waitForSelector('#jammulai', { state: 'visible' }),
        this.page.waitForSelector('#menitmulai', { state: 'visible' }),
        this.page.waitForSelector('#jamselesai', { state: 'visible' }),
        this.page.waitForSelector('#menitselesai', { state: 'visible' })
      ]);

      // Fill time fields
      const [startHour, startMinute] = entry.startTime.split(':');
      await this.page.selectOption('#jammulai', startHour);
      await this.page.selectOption('#menitmulai', startMinute);

      const [endHour, endMinute] = entry.endTime.split(':');
      await this.page.selectOption('#jamselesai', endHour);
      await this.page.selectOption('#menitselesai', endMinute);

      // Wait for and fill other form fields
      await this.page.waitForSelector('#skpkgid', { state: 'visible' });
      const skpkgValue = `2025199809216304201_0${entry.skpkgOption}`;
      await this.page.selectOption('#skpkgid', skpkgValue);
      await this.waitForNetworkIdle();

      await this.page.waitForSelector('#keterangan', { state: 'visible' });
      await this.page.fill('#keterangan', entry.description);

      await this.page.waitForSelector('#jumlah', { state: 'visible' });
      await this.page.fill('#jumlah', String(entry.quantity));

      // Submit form
      const saveButton = await this.page.waitForSelector('#btnsimpan', { state: 'visible' });
      await saveButton?.click();
      await this.waitForNetworkIdle();

      // Handle confirmation
      const okButton = await this.page.waitForSelector('#btnok', { state: 'visible' });
      await okButton?.click();
      await this.waitForNetworkIdle();

      logger.info('Jurnal entry berhasil diisi.');
    } catch (error) {
      logger.error(`Gagal mengisi jurnal entry: ${error}`);
      throw error;
    }
  }

  async fillShiftEntries(entries: JournalEntry[]) {
    logger.info('Memulai pengisian jurnal untuk shift yang dipilih.');

    for (const entry of entries) {
      try {
        // Fill the current entry
        await this.fillJournalEntry(entry);

        // Wait for any UI updates and network requests to complete
        await Promise.all([
          this.waitForNetworkIdle(),
          // Wait for the "tambah" button to be clickable again
          this.page.waitForSelector('//a[@id="tambah"]', {
            state: 'visible',
            timeout: this.DEFAULT_TIMEOUT
          })
        ]);

        logger.info(`Entry selesai diisi: ${entry.startTime} - ${entry.endTime}`);
      } catch (error) {
        logger.error(`Gagal mengisi entry ${entry.startTime} - ${entry.endTime}: ${error}`);
        throw error;
      }
    }

    logger.info('Semua entry berhasil diisi.');
  }

  async close() {
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

  async run() {
    let runAgain = true;

    while (runAgain) {
      const startTime = Date.now();
      try {
        const { date, shiftType } = await this.askForUserInput();

        // Parse the date to get a more complete format
        const [day, month, year] = date.split('/');
        const dateObj = new Date(Number(year), Number(month) - 1, Number(day));

        const monthNames = [
          'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
          'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];

        const formattedDate = `${dateObj.getDate()} ${monthNames[dateObj.getMonth()]} ${dateObj.getFullYear()}`;

        // Determine shift schedule name
        const shiftName = {
          'Siang': 'Shift Siang',
          'PagiMalam': 'Shift Pagi dan Malam',
          'LepasMalam': 'Shift Lepas Malam'
        }[shiftType];

        logger.info(`Memulai pengisian Jurnal Harian untuk ${shiftName}`);
        logger.info(`Tanggal Pengisian: ${formattedDate}`);
        logger.info('Memulai proses otomatisasi...');

        await this.initialize();
        await this.login();
        await this.navigateToJournal();
        await this.selectDate(date);

        const shiftSchedule = SHIFT_SCHEDULES[shiftType];
        if (!shiftSchedule) {
          throw new Error(`Jadwal untuk ${shiftType} tidak ditemukan`);
        }

        await this.fillShiftEntries(shiftSchedule);

        const duration = ((Date.now() - startTime) / 1000).toFixed(2);
        logger.info('┌───────────────────────────────────────────────');
        logger.info(`│ Pengisian jurnal berhasil dilakukan:          `);
        logger.info('│───────────────────────────────────────────────');
        logger.info(`│ Tanggal     : ${formattedDate}                `);
        logger.info('│───────────────────────────────────────────────');
        logger.info(`│ Shift       : ${shiftName}                    `);
        logger.info('│───────────────────────────────────────────────');
        logger.info(`│ Durasi      : ${duration} detik               `);
        logger.info('│───────────────────────────────────────────────');
        logger.info(`│ Total Entry : ${shiftSchedule.length} Kegiatan`);
        logger.info('└───────────────────────────────────────────────');

        const rl = createReadlineInterface();
        const answer = await askQuestion(rl, '\nApakah Anda ingin mengisi jurnal lagi? (Y/n): ');
        rl.close();

        if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
          logger.info('Memulai pengisian jurnal baru...');
          runAgain = true;
        } else {
          logger.info('Mengakhiri program pengisian jurnal.');
          runAgain = false;
        }
      } catch (error: any) {
        logger.error('────────────────────────────────────────────');
        logger.error('❌ Terjadi kesalahan saat pengisian jurnal:');
        logger.error(`   ${error.message}`);
        logger.error('────────────────────────────────────────────');

        const rl = createReadlineInterface();
        const retry = await askQuestion(rl, '\nApakah Anda ingin mencoba lagi? (Y/n): ');
        rl.close();

        runAgain = retry.toLowerCase() === 'y' || retry.toLowerCase() === 'yes';
      } finally {
        await this.close();
      }
    }

    logger.info('Terima kasih telah menggunakan SIMIPAS! 👋');
  };
}