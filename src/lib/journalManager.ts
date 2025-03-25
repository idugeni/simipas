import { Page } from "playwright";
import logger from "./logger";
import { JournalEntry } from "./types";
import { DEFAULT_TIMEOUT } from "./constants";

export class JournalManager {
  constructor(private page: Page) {}

  async navigateToJournal(): Promise<void> {
    logger.info("Memulai navigasi ke halaman Jurnal Harian");
    try {
      const kinerjaLink = await this.page.waitForSelector(
        '//a[normalize-space()="KINERJA"]',
        {
          state: "visible",
          timeout: DEFAULT_TIMEOUT,
        },
      );
      await kinerjaLink?.click();
      const jurnalLink = await this.page.waitForSelector(
        '//td[normalize-space()="Jurnal Harian"]',
        {
          state: "visible",
          timeout: DEFAULT_TIMEOUT,
        },
      );
      await jurnalLink?.click();
      await Promise.all([
        this.page.waitForSelector('//input[@id="tgla"]', { state: "visible" }),
        this.page.waitForLoadState("networkidle"),
      ]);
      logger.info("Halaman Jurnal Harian berhasil dimuat dengan baik");
    } catch (error: unknown) {
      if (error instanceof Error) {
        logger.error(
          `Navigasi ke halaman jurnal gagal karena ${error.message} sehingga proses tidak dapat dilanjutkan`,
        );
      } else {
        logger.error(
          "Navigasi ke halaman jurnal gagal karena alasan yang tidak diketahui sehingga proses tidak dapat dilanjutkan",
        );
      }
      throw error;
    }
  }

  async selectDate(date: string): Promise<void> {
    logger.info(`Memulai pemilihan tanggal ${date}`);
    try {
      const dateInput = await this.page.waitForSelector('//input[@id="tgla"]', {
        state: "visible",
        timeout: DEFAULT_TIMEOUT,
      });
      await dateInput.click();
      await this.page.waitForSelector(".datepicker", {
        state: "visible",
        timeout: DEFAULT_TIMEOUT,
      });
      await this.page.waitForLoadState("networkidle");
      const [day, month, year] = date.split("/");
      const desiredDay = String(parseInt(day, 10));
      const desiredMonth = Number(month);
      const desiredYear = Number(year);
      const englishMonths = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      let header = await this.page.$eval(".datepicker .switch", (el) =>
        (el.textContent || "").trim(),
      );
      let [currentMonthName, currentYearStr] = header.split(" ");
      let currentMonth = englishMonths.indexOf(currentMonthName) + 1;
      let currentYear = Number(currentYearStr);
      const navigateToTargetHeader = async () => {
        let attempts = 0;
        while (attempts < 12) {
          header = await this.page.$eval(".datepicker .switch", (el) =>
            (el.textContent || "").trim(),
          );
          if (
            header.includes(englishMonths[desiredMonth - 1]) &&
            header.includes(String(desiredYear))
          )
            break;
          if (
            currentYear < desiredYear ||
            (currentYear === desiredYear && currentMonth < desiredMonth)
          ) {
            await this.page.click(".datepicker .next");
          } else {
            await this.page.click(".datepicker .prev");
          }
          await this.page.waitForTimeout(500);
          header = await this.page.$eval(".datepicker .switch", (el) =>
            (el.textContent || "").trim(),
          );
          [currentMonthName, currentYearStr] = header.split(" ");
          currentMonth = englishMonths.indexOf(currentMonthName) + 1;
          currentYear = Number(currentYearStr);
          attempts++;
        }
        if (
          !(
            header.includes(englishMonths[desiredMonth - 1]) &&
            header.includes(String(desiredYear))
          )
        ) {
          throw new Error(
            `Gagal menavigasi ke ${englishMonths[desiredMonth - 1]} ${desiredYear}`,
          );
        }
      };
      if (!(currentYear === desiredYear && currentMonth === desiredMonth)) {
        await navigateToTargetHeader();
      }
      let dayXPath = `//tr/td[contains(@class, "day") and not(contains(@class, "old")) and not(contains(@class, "active")) and normalize-space()="${desiredDay}"]`;
      let dayCell = await this.page.$(dayXPath);
      if (!dayCell) {
        dayXPath = `//tr/td[contains(@class, "day") and contains(@class, "active") and normalize-space()="${desiredDay}"]`;
        dayCell = await this.page.$(dayXPath);
      }
      if (!dayCell) {
        dayXPath = `//tr/td[contains(@class, "day") and contains(@class, "old") and normalize-space()="${desiredDay}"]`;
        dayCell = await this.page.$(dayXPath);
      }
      if (!dayCell) {
        throw new Error(`Tidak dapat menemukan sel untuk tanggal ${date}`);
      }
      await dayCell.click();
      await this.page.waitForLoadState("networkidle");
      logger.info(`Tanggal ${date} berhasil dipilih`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        logger.error(
          `Pemilihan tanggal gagal karena ${error.message} sehingga proses pemilihan tidak dapat diteruskan`,
        );
      } else {
        logger.error(
          "Pemilihan tanggal gagal karena alasan yang tidak diketahui sehingga proses pemilihan tidak dapat diteruskan",
        );
      }
      throw error;
    }
  }

  async fillJournalEntry(entry: JournalEntry): Promise<void> {
    logger.info(
      `Memproses pengisian entri jurnal dari jam mulai ${entry.startTime} hingga jam selesai ${entry.endTime}`,
    );
    try {
      await this.openEntryForm();
      await this.fillTimeFields(entry);
      await this.fillEntryDetails(entry);
      await this.submitEntry();
      logger.info("Entri jurnal berhasil diisi dengan sukses");
    } catch (error: unknown) {
      if (error instanceof Error) {
        logger.error(
          `Pengisian entri jurnal gagal karena ${error.message} sehingga proses pengisian tidak dapat dilanjutkan`,
        );
      } else {
        logger.error(
          "Pengisian entri jurnal gagal karena alasan yang tidak diketahui sehingga proses pengisian tidak dapat dilanjutkan",
        );
      }
      throw error;
    }
  }

  private async openEntryForm(): Promise<void> {
    const addButton = await this.page.waitForSelector('//a[@id="tambah"]', {
      state: "visible",
    });
    await addButton?.click();
    await this.page.waitForLoadState("networkidle");
  }

  private async fillTimeFields(entry: JournalEntry): Promise<void> {
    await Promise.all([
      this.page.waitForSelector("#jammulai", { state: "visible" }),
      this.page.waitForSelector("#menitmulai", { state: "visible" }),
      this.page.waitForSelector("#jamselesai", { state: "visible" }),
      this.page.waitForSelector("#menitselesai", { state: "visible" }),
    ]);
    const [startHour, startMinute] = entry.startTime.split(":");
    const [endHour, endMinute] = entry.endTime.split(":");
    await Promise.all([
      this.page.selectOption("#jammulai", startHour),
      this.page.selectOption("#menitmulai", startMinute),
      this.page.selectOption("#jamselesai", endHour),
      this.page.selectOption("#menitselesai", endMinute),
    ]);
  }

  private async fillEntryDetails(entry: JournalEntry): Promise<void> {
    await this.page.waitForSelector("#skpkgid", { state: "visible" });
    // Extract the SKP option from the title or use a default value
    const skpkgNumber = entry.title.match(/\d+/)?.[0] || "1";
    const skpkgValue = `2025199809216304201_0${skpkgNumber}`;
    await this.page.selectOption("#skpkgid", skpkgValue);
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForSelector("#keterangan", { state: "visible" });
    await this.page.fill("#keterangan", entry.description);
    await this.page.waitForSelector("#jumlah", { state: "visible" });
    // Use a default quantity of 1 since we no longer store this value
    await this.page.fill("#jumlah", "1");
  }

  private async submitEntry(): Promise<void> {
    const saveButton = await this.page.waitForSelector("#btnsimpan", {
      state: "visible",
    });
    await saveButton?.click();
    await this.page.waitForLoadState("networkidle");
    const okButton = await this.page.waitForSelector("#btnok", {
      state: "visible",
    });
    await okButton?.click();
    await this.page.waitForLoadState("networkidle");
  }
}
