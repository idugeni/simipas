# Shift Management SIMIPAS

## Overview

SIMIPAS menyediakan fitur manajemen shift yang terintegrasi dengan SIMPEG KEMENIMIPAS untuk memudahkan pencatatan dan pengelolaan jadwal shift petugas. Fitur ini dirancang khusus untuk memenuhi kebutuhan pencatatan shift di lingkungan P2U (Pengamanan Pintu Utama).

## Kategori dan Jenis Shift

SIMIPAS mengakomodasi dua kategori utama shift kerja:

### 1. Shift Pengamanan

Pola rotasi shift untuk petugas pengamanan:

- **Shift Siang**
  - Waktu masuk: 13.01 WIB
  - Waktu pulang: 19.01 WIB
  - Tugas: Pengamanan dan pemeriksaan akses masuk sore hingga malam

- **Shift Pagi + Malam**
  - Shift Pagi:
    - Waktu masuk: 07.01 WIB
    - Waktu pulang: 13.01 WIB
  - Dilanjutkan Shift Malam:
    - Periode 1: 19.01 WIB - 23.59 WIB
    - Periode 2: 00.01 WIB - 07.01 WIB (hari berikutnya)
  - Tugas: Pengamanan dan pemeriksaan akses masuk selama periode pagi dan malam

- **Pola Rotasi Shift**
  Urutan rotasi shift yang diterapkan:
  1. Shift Siang
  2. Shift Pagi + Malam
  3. Lepas Piket (Lepas Malam)
  4. Libur
  Setelah libur, kembali ke Shift Siang

- **Lepas Piket (Lepas Malam)**
  - Merupakan periode istirahat setelah menjalani Shift Pagi + Malam
  - Berlaku untuk hari berikutnya setelah shift pagi + malam
  - Bertujuan memberikan waktu pemulihan yang cukup bagi petugas

### 2. Staff Administrasi

Terdapat dua pola kerja untuk staff administrasi:

- **Non-Shift (Normal)**
  - Waktu kerja reguler setiap hari
  - Waktu masuk: 07.30 WIB
  - Waktu pulang: 15.30 WIB
  - Berlaku untuk hari kerja (Senin-Kamis)
  - Juma'at pulang jam 12.30 WIB
  - Sabtu pulang jam 11.30 WIB

- **Shift Siang Khusus**
  - Diterapkan dalam kondisi tertentu
  - Waktu masuk: 13.01 WIB
  - Waktu pulang: 19.01 WIB
  - Disesuaikan dengan kebutuhan operasional

## Penggunaan Fitur Shift

### 1. Pengisian Shift Harian

- Buka aplikasi SIMIPAS
- Pilih menu "Manajemen Shift"
- Pilih tanggal yang akan diisi
- Pilih jenis shift (Pagi/Siang/Malam)
- Isi detail aktivitas shift
- Klik "Simpan" untuk menyimpan data

### 2. Pengisian Range Tanggal

Untuk mengisi shift dalam rentang waktu tertentu:

- Pilih menu "Pengisian Batch"
- Tentukan tanggal awal dan akhir
- Pilih jenis shift yang akan diterapkan
- Isi template aktivitas yang akan digunakan
- Klik "Terapkan" untuk mengisi semua tanggal sekaligus

### 3. Integrasi dengan SIMPEG

Data shift yang diisi akan secara otomatis:

- Terintegrasi dengan sistem SIMPEG
- Tercatat dalam jurnal harian
- Terhitung dalam perhitungan jam kerja
- Tersimpan dalam database untuk keperluan pelaporan

## Tips Penggunaan

1. **Konsistensi Pengisian**
   - Isi shift secara rutin setiap hari
   - Pastikan detail aktivitas terisi lengkap
   - Periksa kembali sebelum menyimpan

2. **Manajemen Waktu**
   - Gunakan fitur pengisian batch untuk efisiensi
   - Atur notifikasi pengingat pengisian
   - Monitor status pengisian secara berkala

3. **Pelaporan**
   - Manfaatkan fitur ekspor data untuk laporan
   - Simpan backup data secara berkala
   - Review laporan sebelum disubmit

## Troubleshooting

### Masalah Umum

1. **Data Tidak Tersimpan**
   - Periksa koneksi internet
   - Pastikan semua field terisi
   - Coba refresh dan isi ulang

2. **Konflik Jadwal**
   - Koordinasi dengan petugas lain
   - Gunakan fitur swap shift jika perlu
   - Hubungi admin untuk bantuan

### Kontak Support

Jika mengalami kendala dalam penggunaan fitur shift:

- Email: support@simipas.go.id
- Telepon: (021) xxx-xxxx
- Helpdesk: Lantai 1 Gedung Utama

## Pembaruan dan Pengembangan

Fitur shift management akan terus dikembangkan sesuai kebutuhan. Pembaruan akan mencakup:

- Optimasi sistem rotasi shift
- Penambahan fitur analisis kinerja
- Integrasi dengan sistem absensi
- Peningkatan UI/UX

Pastikan untuk selalu menggunakan versi terbaru SIMIPAS untuk mendapatkan fitur-fitur terkini.