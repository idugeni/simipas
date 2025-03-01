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

## Table of Contents

<div align="center">

[Overview](#overview) | [Features](#features) | [Installation](#installation) | [Usage](#usage) | [Project Structure](#project-structure) | [Contributing](#contributing) | [License](#license) | [Contact](#contact)

</div>

## Overview

SIMIPAS merupakan alat otomatisasi yang diciptakan khusus untuk memudahkan pengisian jurnal harian di SIMPEG KEMENIMIPAS. Dengan memanfaatkan teknologi modern seperti TypeScript dan Playwright, tool ini membantu:

- Mengurangi beban administrasi.
- Meningkatkan akurasi data.
- Mempercepat proses input jurnal harian.

## Features

- **Otomatisasi Pengisian Jurnal:** Mengotomatiskan proses input data harian dengan presisi.
- **Integrasi Khusus SIMPEG:** Dibuat untuk memenuhi kebutuhan SIMPEG KEMENIMIPAS.
- **Logging dan Monitoring:** Menggunakan Winston untuk pencatatan aktivitas dan debugging.
- **Automasi Web:** Menggunakan Playwright untuk interaksi otomatis dengan antarmuka web.
- **TypeScript Modern:** Menjamin kualitas dan maintainability kode melalui penggunaan TypeScript.

## Installation

### Prasyarat

- Node.js (v23.8.0 atau lebih baru)
- npm atau yarn

### Langkah Instalasi

1. **Clone repository**

   ```bash
   git clone https://github.com/idugeni/simipas.git
   ```

   ```bash
   cd simipas
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

   atau jika menggunakan yarn

   ```bash
   yarn install
   ```

3. **BUAT FILE `.env.local`** untuk menyimpan konfigurasi aplikasi

   ```bash
   SIMPEG_URL=
   SIMPEG_NIP=
   SIMPEG_PASSWORD=
   ```

4. Edit file `task.json` sesuai dengan kebutuhan untuk pengisian jurnal harian

   ```bash
   {
    "option1": "",
    "option2": ""
   }
   ```

## Usage

Pastikan semua dependensi telah terinstal dengan benar sebelum menjalankan perintah-perintah berikut.

### 1. Menjalankan Aplikasi

- **Pengembangan (Development)**  
  Jalankan aplikasi dalam mode pengembangan dengan perintah berikut:

  ```bash
  npm run dev
  ```

  Perintah ini akan menjalankan file `src/app/index.ts` menggunakan `ts-node-dev` dengan konfigurasi tambahan `dotenv/config` dan `tsconfig-paths/register`.

- **Produksi (Start)**  
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

- **Linting**  
  Cek kualitas kode dengan:
  
  ```bash
  npm run lint
  ```

- **Format Kode**  
  Format seluruh kode sumber dengan Prettier:

  ```bash
  npm run format
  ```

- **Cek Kode (Build + Lint)**  
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

## Project Structure

```bash
simipas/
├── src/
│   ├── data/
│   │   └── task.json             # Data tugas otomatis
│   ├── lib/
│   │   ├── auth.ts               # Modul untuk otentikasi
│   │   ├── automation.ts         # Logika otomasi pengisian jurnal
│   │   ├── browser.ts            # Modul untuk browser
│   │   ├── config.ts             # Konfigurasi aplikasi
│   │   ├── constants.ts          # Konstanta yang digunakan
│   │   ├── journalManager.ts     # Manajemen jurnal
│   │   ├── logger.ts             # Modul untuk logging
│   │   ├── reportGenerator.ts    # Fungsi untuk menghasilkan laporan
│   │   ├── schedules.ts          # Pengaturan jadwal tugas otomatis
│   │   ├── types.ts              # Tipe data dan interface yang digunakan
│   │   ├── userInterface.ts      # Modul untuk user interface
│   │   └── utils.ts              # Fungsi utilitas pendukung
│   └── app/
│       └── index.ts              # Entry point aplikasi
├── .env                          # File konfigurasi environment
├── .eslinttrc.json               # Konfigurasi ESLint
├── .gitignore                    # Daftar file/folder yang diabaikan oleh Git
├── .prettierrc                   # Konfigurasi Prettier
├── eslint.config.mjs             # Konfigurasi ESLint
├── LICENSE                       # Lisensi proyek
├── package-lock.json             # Lock file npm
├── package.json                  # Konfigurasi project dan dependensi
├── README.md                     # Dokumentasi project
└── tsconfig.json                 # Konfigurasi TypeScript
```

## Contributing

Kami sangat menghargai kontribusi dari komunitas pengembang untuk meningkatkan kualitas dan kemampuan proyek SIMIPAS. Jika Anda memiliki ide, saran, atau perbaikan yang ingin Anda sumbangkan, silakan ikuti langkah-langkah berikut:

1. Fork repository: Buat salinan repository SIMIPAS ke akun GitHub Anda sendiri dengan menekan tombol `Fork` pada halaman repository.
2. Buat branch baru: Buat branch baru pada repository Anda dengan nama yang sesuai dengan perubahan yang ingin Anda lakukan (misalnya, `fix-bug` atau `tambah-fitur`).
3. Lakukan perubahan: Lakukan perubahan yang ingin Anda lakukan pada branch baru Anda.
4. Buat commit: Buat commit untuk perubahan yang Anda lakukan dengan menggunakan pesan commit yang jelas dan singkat.
5. Buat pull request: Buat pull request ke repository asli SIMIPAS dengan memilih branch yang sesuai dan menambahkan deskripsi yang jelas tentang perubahan yang Anda lakukan.

## License

Proyek SIMIPAS dilisensikan di bawah [MIT License](LICENSE). Dengan melakukan kontribusi, Anda setuju untuk memberikan hak cipta atas karya Anda kepada proyek SIMIPAS dan memungkinkan penggunaan karya Anda di bawah lisensi yang sama.

Terima kasih atas kontribusi Anda! Kami berharap dapat bekerja sama dengan Anda untuk meningkatkan kualitas dan kemampuan proyek SIMIPAS.

## Contact

| **Kontak** | **Informasi** | **Link** |
| --- | --- | --- |
| Email | <officialelsa21@gmail.com> | [Email](mailto:officialelsa21@gmail.com) |
| Github | idugeni | [GitHub Profile](https://github.com/idugeni) |
| Issue Tracker | simipas/issues | [Issue Tracker](https://github.com/idugeni/simipas/issues) |

Terima kasih telah menggunakan SIMIPAS. Jika ada pertanyaan atau saran, jangan ragu untuk membuka issue atau menghubungi author. Semoga SIMIPAS dapat membantu meningkatkan produktivitas dan efisiensi kerja!
