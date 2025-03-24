// src/lib/auth.ts
import { Page } from "playwright";
import logger from "./logger";
import { dbManager } from "./database";

export class Auth {
  private page: Page;
  private currentUser: {
    nip: string;
    password: string;
    userType: "PENGAMANAN" | "STAFF ADMINISTRASI";
  } | null = null;

  constructor(page: Page) {
    this.page = page;
  }

  async login(nip?: string, password?: string) {
    try {
      let user;
      if (!nip || !password) {
        const users = dbManager.getAllUsers();
        if (users.length === 0) {
          throw new Error("Tidak ada pengguna yang terdaftar dalam database");
        }
        // Gunakan user pertama sebagai default
        user = users[0];
        nip = user.nip;
        password = user.password;
      } else {
        user = dbManager.getUserByNip(nip);
        if (!user || user.password !== password) {
          throw new Error("NIP atau password tidak valid");
        }
      }

      await this.page.goto(
        "https://simpeg.kemenimipas.go.id/devp/siap/signin.php",
      );
      await this.page.fill("#nip", nip);
      await this.page.fill("#password", password);
      await this.page.click('button[type="submit"]');
      await this.page.waitForURL(
        "https://simpeg.kemenimipas.go.id/devp/siap/index.php",
      );

      this.currentUser = { nip, password, userType: user.userType };
      logger.info(`Login berhasil dengan NIP: ${nip}`);
      return user;
    } catch (error) {
      logger.error("Gagal login:", error);
      throw error;
    }
  }

  getCurrentUser() {
    return this.currentUser;
  }
}
