import { Page } from 'playwright';
import logger from '@/lib/logger';
import { JournalEntry } from '@/lib/types';
import { DEFAULT_TIMEOUT } from '@/lib/constants';

export class JournalManager {
  constructor(private page: Page) { }

  async navigateToJournal(): Promise<void> {
    logger.info('Navigasi menuju halaman Jurnal Harian.');
    try {
      const kinerjaLink = await this.page.waitForSelector('//a[normalize-space()="KINERJA"]', {
        state: 'visible',
        timeout: DEFAULT_TIMEOUT
      });
      await kinerjaLink?.click();

      const jurnalLink = await this.page.waitForSelector('//td[normalize-space()="Jurnal Harian"]', {
        state: 'visible',
        timeout: DEFAULT_TIMEOUT
      });
      await jurnalLink?.click();

      await Promise.all([
        this.page.waitForSelector('//input[@id="tgla"]', { state: 'visible' }),
        this.page.waitForLoadState('networkidle')
      ]);
      logger.info('Halaman Jurnal Harian berhasil dimuat.');
    } catch (error) {
      logger.error(`Gagal navigasi ke halaman jurnal: ${error}`);
      throw error;
    }
  }

  async selectDate(date: string): Promise<void> {
    logger.info(`Memilih tanggal: ${date}`);
    try {
      const dateInput = await this.page.waitForSelector('//input[@id="tgla"]', {
        state: 'visible',
        timeout: DEFAULT_TIMEOUT
      });
      await dateInput?.click();

      await this.page.waitForSelector('.datepicker', {
        state: 'visible',
        timeout: DEFAULT_TIMEOUT
      });
      await this.page.waitForLoadState('networkidle');

      const [day, month, year] = date.split('/');
      const desiredDay = day;
      const desiredMonth = Number(month);
      const desiredYear = Number(year);

      let attempts = 0;
      const englishMonths = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      while (attempts < 12) {
        const currentMonthYear = await this.page.$eval('.datepicker .datepicker-switch', el => el.textContent?.trim() || '');
        const [currentMonthName, currentYearStr] = currentMonthYear.split(' ');
        const currentYear = Number(currentYearStr);
        const currentMonth = englishMonths.indexOf(currentMonthName) + 1;

        if (currentYear === desiredYear && currentMonth === desiredMonth) {
          break;
        }

        if (currentYear < desiredYear || (currentYear === desiredYear && currentMonth < desiredMonth)) {
          const nextButton = await this.page.waitForSelector('.datepicker .next', { state: 'visible', timeout: DEFAULT_TIMEOUT });
          await nextButton?.click();
        } else {
          const prevButton = await this.page.waitForSelector('.datepicker .prev', { state: 'visible', timeout: DEFAULT_TIMEOUT });
          await prevButton?.click();
        }
        attempts++;
        await this.page.waitForTimeout(500);
      }

      const dayCell = await this.page.waitForSelector(
        `//td[not(contains(@class, "old")) and not(contains(@class, "new")) and normalize-space()="${desiredDay}"]`,
        { state: 'visible', timeout: DEFAULT_TIMEOUT }
      );
      await dayCell?.click();

      await this.page.waitForLoadState('networkidle');
      logger.info(`Tanggal ${date} telah dipilih.`);
    } catch (error) {
      logger.error(`Gagal memilih tanggal: ${error}`);
      throw error;
    }
  }

  async fillJournalEntry(entry: JournalEntry): Promise<void> {
    logger.info(`Mengisi Jam Mulai ${entry.startTime} - Jam Selesai ${entry.endTime}`);
    try {
      await this.openEntryForm();
      await this.fillTimeFields(entry);
      await this.fillEntryDetails(entry);
      await this.submitEntry();
      logger.info('Jurnal entry berhasil diisi.');
    } catch (error) {
      logger.error(`Gagal mengisi jurnal entry: ${error}`);
      throw error;
    }
  }

  private async openEntryForm(): Promise<void> {
    const addButton = await this.page.waitForSelector('//a[@id="tambah"]', { state: 'visible' });
    await addButton?.click();
    await this.page.waitForLoadState('networkidle');
  }

  private async fillTimeFields(entry: JournalEntry): Promise<void> {
    await Promise.all([
      this.page.waitForSelector('#jammulai', { state: 'visible' }),
      this.page.waitForSelector('#menitmulai', { state: 'visible' }),
      this.page.waitForSelector('#jamselesai', { state: 'visible' }),
      this.page.waitForSelector('#menitselesai', { state: 'visible' })
    ]);

    const [startHour, startMinute] = entry.startTime.split(':');
    const [endHour, endMinute] = entry.endTime.split(':');

    await Promise.all([
      this.page.selectOption('#jammulai', startHour),
      this.page.selectOption('#menitmulai', startMinute),
      this.page.selectOption('#jamselesai', endHour),
      this.page.selectOption('#menitselesai', endMinute)
    ]);
  }

  private async fillEntryDetails(entry: JournalEntry): Promise<void> {
    await this.page.waitForSelector('#skpkgid', { state: 'visible' });
    const skpkgValue = `2025199809216304201_0${entry.skpkgOption}`;
    await this.page.selectOption('#skpkgid', skpkgValue);
    await this.page.waitForLoadState('networkidle');

    await this.page.waitForSelector('#keterangan', { state: 'visible' });
    await this.page.fill('#keterangan', entry.description);

    await this.page.waitForSelector('#jumlah', { state: 'visible' });
    await this.page.fill('#jumlah', String(entry.quantity));
  }

  private async submitEntry(): Promise<void> {
    const saveButton = await this.page.waitForSelector('#btnsimpan', { state: 'visible' });
    await saveButton?.click();
    await this.page.waitForLoadState('networkidle');

    const okButton = await this.page.waitForSelector('#btnok', { state: 'visible' });
    await okButton?.click();
    await this.page.waitForLoadState('networkidle');
  }
}
