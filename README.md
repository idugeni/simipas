# SIMIPAS

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-v23.8.0-green" alt="Node.js Version">
  <img src="https://img.shields.io/badge/License-MIT-blue" alt="License">
  <img src="https://img.shields.io/github/issues/idugeni/simipas" alt="GitHub Issues">
  <img src="https://img.shields.io/github/stars/idugeni/simipas?style=social" alt="GitHub Stars">
  <img src="https://img.shields.io/github/forks/idugeni/simipas?style=social" alt="GitHub Forks">
  <img src="https://img.shields.io/badge/version-0.1.7--alpha-orange" alt="Version">
</p>

SIMIPAS adalah tool untuk mengisi jurnal harian SIMPEG KEMENIMIPAS secara otomatis. Project ini dirancang untuk meningkatkan efisiensi kerja melalui otomasi, sehingga pengguna bisa fokus pada hal-hal yang lebih penting.

> **Disclaimer:** Aplikasi ini dibuat sesuai dengan `SKP TAHUNAN` dan `JURNAL HARIAN` sesuai dengan bagian dari pekerjaan saya selaku pembuat script yaitu di `Pengamanan Pintu Utama (P2U)`.
>
> Anda dapat mengembangkan sendiri sesuai dengan bagian anda masing-masing, dibutuhkan pengetahuan tentang `Backend`.

## 📌 Table of Contents

<div align="center">

[Overview](#-overview) | [Features](#-features) | [Installation](#-installation) | [Usage](#-usage) | [Project Structure](#-project-structure) | [Contributing](#-contributing) | [License](#-license) | [Contact](#-contact)

</div>

## 🔍 Overview

SIMIPAS merupakan alat otomatisasi yang diciptakan khusus untuk memudahkan pengisian jurnal harian di SIMPEG KEMENIMIPAS. Dengan memanfaatkan teknologi modern seperti TypeScript dan Playwright, tool ini membantu:

- Mengurangi beban administrasi.
- Meningkatkan akurasi data.
- Mempercepat proses input jurnal harian.

## 🚀 Features

- **Otomatisasi Pengisian Jurnal:** Mengotomatiskan proses input data harian dengan presisi.
- **Integrasi Khusus SIMPEG:** Dibuat untuk memenuhi kebutuhan SIMPEG KEMENIMIPAS.
- **Logging dan Monitoring:** Menggunakan Winston untuk pencatatan aktivitas dan debugging.
- **Automasi Web:** Menggunakan Playwright untuk interaksi otomatis dengan antarmuka web.
- **TypeScript Modern:** Menjamin kualitas dan maintainability kode melalui penggunaan TypeScript.

## 📦 Installation

### Prasyarat

- Node.js (v23.8.0 atau lebih baru)
- npm atau yarn

### Langkah Instalasi

1. **Clone repository:**

   ```bash
   git clone https://github.com/idugeni/simipas.git
   cd simipas
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # atau jika menggunakan yarn:
   yarn install
   ```

3. **BUAT FILE `.env`**

   ```bash
   SIMPEG_URL=
   SIMPEG_NIP=
   SIMPEG_PASSWORD=
   ```

## ▶️ Usage

Pastikan semua dependensi telah terinstal dengan benar sebelum menjalankan perintah-perintah berikut.

### 1. Menjalankan Aplikasi

- **Pengembangan (Development):**  
  Jalankan aplikasi dalam mode pengembangan dengan perintah berikut:

  ```bash
  npm run dev
  ```

  Perintah ini akan menjalankan file `src/app/index.ts` menggunakan `ts-node-dev` dengan konfigurasi tambahan `dotenv/config` dan `tsconfig-paths/register`.

- **Produksi (Start):**  
  Sebelum menjalankan aplikasi dalam mode produksi, pastikan sudah melakukan build dengan perintah:

  ```bash
  npm run build
  ```

  Setelah build selesai, jalankan aplikasi dengan:

  ```bash
  npm start
  ```

  Perintah ini akan menjalankan file `dist/app/index.js` menggunakan `ts-node` dengan konfigurasi yang sama.

### 2. Build Aplikasi

Untuk mengkompilasi kode TypeScript ke JavaScript, gunakan perintah:

```bash
npm run build
```

Hasil kompilasi akan tersimpan di folder `dist`.

### 3. Perintah Pendukung Lainnya

- **Linting:**  
  Cek kualitas kode dengan:
  
  ```bash
  npm run lint
  ```

- **Linting dan Perbaikan Otomatis:**  
  Perbaiki masalah kode secara otomatis dengan:

  ```bash
  npm run lint:fix
  ```

- **Format Kode:**  
  Format seluruh kode sumber dengan Prettier:

  ```bash
  npm run format
  ```

- **Cek Kode (Build + Lint):**  
  Pastikan kode bebas dari error dengan:

  ```bash
  npm run check
  ```

### 4. Catatan Penting

Jika browser tidak muncul saat menjalankan aplikasi, pastikan untuk menginstal dependensi Playwright dengan perintah:

```bash
npx playwright install
```

Hal ini diperlukan karena aplikasi menggunakan pustaka **Playwright** untuk pengujian otomatisasi browser.

## 📁 Project Structure

```bash
simipas/
├── src/
│   ├── lib/
│   │   ├── auth               # Modul untuk otentikasi
│   │   ├── automation.ts      # Logika otomasi pengisian jurnal
│   │   ├── browser            # Modul untuk browser
│   │   ├── config             # Konfigurasi aplikasi
│   │   ├── constants          # Konstanta yang digunakan
│   │   ├── journalManager     # Manajemen jurnal
│   │   ├── logger             # Modul untuk logging
│   │   ├── reportGenerator    # Fungsi untuk menghasilkan laporan
│   │   ├── schedules.ts       # Pengaturan jadwal tugas otomatis
│   │   ├── types.ts           # Tipe data dan interface yang digunakan
│   │   ├── userInterface      # Modul untuk user interface
│   │   └── utils.ts           # Fungsi utilitas pendukung
│   └── app/
│       └── index.ts           # Entry point aplikasi
├── .env                       # File konfigurasi environment
├── .eslinttrc.json            # Konfigurasi ESLint
├── .gitignore                 # Daftar file/folder yang diabaikan oleh Git
├── .prettierrc                # Konfigurasi Prettier
├── eslint.config.mjs          # Konfigurasi ESLint
├── LICENCE                    # Lisensi proyek
├── package-lock.json          # Lock file npm
├── package.json               # Konfigurasi project dan dependensi
├── README.md                  # Dokumentasi project
└── tsconfig.json              # Konfigurasi TypeScript
```

## 🤝 Contributing

Kontribusi sangat dihargai! Jika memiliki ide atau perbaikan, silakan fork repository ini, buat branch baru, dan ajukan pull request. Pastikan untuk mengikuti panduan kontribusi dan standar kode yang berlaku.

## 📜 License

Project ini dilisensikan di bawah [MIT License](LICENSE).

## 📞 Contact

Pembuat project : **Eliyanto Sarage**

- [GitHub Profile](https://github.com/idugeni)  
- [Issue Tracker](https://github.com/idugeni/simipas/issues)

Terima kasih telah menggunakan SIMIPAS. Jika ada pertanyaan atau saran, jangan ragu untuk membuka issue atau menghubungi author. Semoga SIMIPAS dapat membantu meningkatkan produktivitas dan efisiensi kerja!
