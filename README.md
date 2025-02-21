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

> Anda dapat mengembangkan sendiri sesuai dengan bagian anda masing-masing, dibutuhkan pengetahuan tentang `Backend`.

## 📌 Table of Contents

<div align="center">

[Overview](#overview) | [Features](#features) | [Installation](#installation) | [Usage](#usage) | [Project Structure](#project-structure) | [Contributing](#contributing) | [License](#license) | [Contact](#contact)

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

3. **Ubah `NIP` dan `PASSWORD`**

   ```bash
   // src/config.ts

   export const CONFIG = {
     url: 'https://simpeg.kemenimipas.go.id/devp/siap/signin.php',
     credentials: {
       nip: '<nip>',
       password: '<password>'
     },
     taskDescriptions: {
       option1: 'Melaksanakan koordinasi dengan Kepala Regu Pengamanan untuk mengidentifikasi dan mengevaluasi potensi risiko keamanan, serta menyampaikan informasi terkait potensi ancaman dan menerima arahan demi peningkatan keamanan.',
       option2: 'Melaksanakan serangkaian tugas pengamanan dan pengawasan di area Pintu Utama, termasuk verifikasi identitas pengunjung, penggeledahan badan dan barang bawaan, pemantauan CCTV, penanganan tamu khusus, patroli keamanan area P2U, dan pelaporan kejadian mencurigakan atau pelanggaran peraturan, guna memastikan keamanan, ketertiban, dan mencegah masuknya barang terlarang atau orang yang tidak berkepentingan.'
     }
   };
   ```

## ▶️ Usage

### Menjalankan Aplikasi

Untuk menjalankan aplikasi, gunakan perintah berikut:

```bash
npm start
```

Perintah ini akan menjalankan file `src/app/index.ts` menggunakan ts-node.

### Build Aplikasi

Jika ingin meng-compile kode TypeScript ke JavaScript, jalankan:

```bash
npx tsc
```

Hasil build akan tersimpan di folder `dist`.

## 📁 Project Structure

```bash
simipas/
├── src/
│   ├── lib/
│   │   ├── automation.ts      # Logika otomasi pengisian jurnal
│   │   ├── schedules.ts       # Pengaturan jadwal tugas otomatis
│   │   ├── types.ts           # Tipe data dan interface yang digunakan
│   │   └── utils.ts           # Fungsi utilitas pendukung
│   └── app/
│       └── index.ts           # Entry point aplikasi
├── .gitignore                 # Daftar file/folder yang diabaikan oleh Git
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
