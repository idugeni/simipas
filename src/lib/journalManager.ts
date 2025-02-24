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
      await dateInput.click();
      await this.page.waitForSelector('.datepicker', {
        state: 'visible',
        timeout: DEFAULT_TIMEOUT
      });
      await this.page.waitForLoadState('networkidle');

      const [day, month, year] = date.split('/');
      const desiredDay = String(parseInt(day, 10));
      const desiredMonth = Number(month);
      const desiredYear = Number(year);
      const englishMonths = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];

      let header = await this.page.$eval('.datepicker .switch', el => (el.textContent || '').trim());
      logger.info(`Header awal: ${header}`);
      let [currentMonthName, currentYearStr] = header.split(' ');
      let currentMonth = englishMonths.indexOf(currentMonthName) + 1;
      let currentYear = Number(currentYearStr);

      const navigateToTargetHeader = async () => {
        let attempts = 0;
        while (attempts < 12) {
          header = await this.page.$eval('.datepicker .switch', el => (el.textContent || '').trim());
          if (header.includes(englishMonths[desiredMonth - 1]) && header.includes(String(desiredYear))) {
            break;
          }
          if (
            currentYear < desiredYear ||
            (currentYear === desiredYear && currentMonth < desiredMonth)
          ) {
            await this.page.click('.datepicker .next');
          } else {
            await this.page.click('.datepicker .prev');
          }
          await this.page.waitForTimeout(500);
          header = await this.page.$eval('.datepicker .switch', el => (el.textContent || '').trim());
          [currentMonthName, currentYearStr] = header.split(' ');
          currentMonth = englishMonths.indexOf(currentMonthName) + 1;
          currentYear = Number(currentYearStr);
          attempts++;
        }
        if (!(header.includes(englishMonths[desiredMonth - 1]) && header.includes(String(desiredYear)))) {
          throw new Error(`Gagal menavigasi ke ${englishMonths[desiredMonth - 1]} ${desiredYear}`);
        }
      };

      if (currentYear === desiredYear && currentMonth === desiredMonth) {
        logger.info("Target bulan sudah tampil di header.");
        const dayXPath = `//td[not(contains(@class, "old")) and not(contains(@class, "new")) and normalize-space()="${desiredDay}"]`;
        let dayCell = await this.page.$(dayXPath);
        if (!dayCell) {
          logger.info("Sel hari tidak ditemukan di tampilan utama, coba periksa adjacent sel.");
          const altXPath = `//td[(contains(@class, "old") or contains(@class, "new")) and normalize-space()="${desiredDay}"]`;
          dayCell = await this.page.waitForSelector(altXPath, { state: 'visible', timeout: DEFAULT_TIMEOUT });
        }
        await dayCell.click();
      } else {
        let cellXPath = '';
        let adjacent = false;
        if (currentYear === desiredYear && currentMonth + 1 === desiredMonth) {
          cellXPath = `//td[contains(@class, "new") and normalize-space()="${desiredDay}"]`;
          adjacent = true;
        }
        else if (currentYear === desiredYear && currentMonth - 1 === desiredMonth) {
          cellXPath = `//td[contains(@class, "old") and normalize-space()="${desiredDay}"]`;
          adjacent = true;
        }

        if (adjacent) {
          logger.info("Target tanggal terdeteksi sebagai sel adjacent.");
          const dayCell = await this.page.waitForSelector(cellXPath, { state: 'visible', timeout: DEFAULT_TIMEOUT });
          await dayCell.click();
        } else {
          await navigateToTargetHeader();
          cellXPath = `//td[not(contains(@class, "old")) and not(contains(@class, "new")) and normalize-space()="${desiredDay}"]`;
          logger.info(`Mencari sel hari setelah navigasi dengan XPath: ${cellXPath}`);
          const dayCell = await this.page.waitForSelector(cellXPath, { state: 'visible', timeout: DEFAULT_TIMEOUT });
          await dayCell.click();
        }
      }

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
