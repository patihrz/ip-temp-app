# IP Temp 🌩️

**Unggah, Bagikan, Lupakan.** Solusi berbagi file temporer yang cepat, aman, dan menghapus file secara otomatis setelah 3 jam.

[![Demo Langsung](https://img.shields.io/badge/Lihat%20Demo-Live-cyan?style=for-the-badge&logo=vercel)](https://ip-temp-app.vercel.app/)

![Tangkapan Layar Aplikasi IP Temp](https://i.imgur.com/uGg0yV0.png) 
*(Ini adalah gambar placeholder, ganti dengan screenshot aplikasi Anda yang sebenarnya)*

---

## ✨ Fitur Utama

- **Privasi Otomatis:** Semua file yang diunggah akan **dihapus secara permanen** dari server setelah 3 jam.
- **Antarmuka Modern:** UI yang bersih dan intuitif dengan dukungan _drag-and-drop_.
- **Dukungan File Besar:** Mengunggah file hingga **500 MB**.
- **Berbagi Instan:** Dapatkan link publik dan **QR Code** secara otomatis setelah unggahan selesai.
- **Keamanan Berlapis:** File berbahaya (seperti `.html`, `.js`, `.exe`) secara otomatis diblokir di sisi server dan link yang dihasilkan memaksa browser untuk men-download file.
- **Dibangun di Atas Infrastruktur Andal:** Didukung penuh oleh Google Cloud Platform untuk kecepatan dan ketersediaan yang terjamin.

---

## 🚀 Teknologi yang Digunakan

Proyek ini dibangun menggunakan ekosistem JavaScript modern yang berfokus pada pengalaman developer dan performa.

### Frontend
- **Framework:** [Next.js](https://nextjs.org/) (React)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animasi:** [Framer Motion](https://www.framer.com/motion/)
- **QR Code:** [react-qr-code](https://github.com/rosskhanas/react-qr-code)

### Backend & Infrastruktur
- **Penyimpanan File:** [Google Cloud Storage](https://cloud.google.com/storage)
- **Logika Serverless:** [Google Cloud Functions](https://cloud.google.com/functions)
- **Penjadwalan Tugas (Cron Job):** [Google Cloud Scheduler](https://cloud.google.com/scheduler)
- **Hosting Frontend:** [Vercel](https://vercel.com/)

---

## 🛠️ Konsep & Arsitektur

**IP Temp** menggunakan arsitektur _serverless_ yang memisahkan antara frontend dan backend.

1.  **Frontend (Next.js di Vercel):** Bertugas menampilkan antarmuka kepada pengguna. Saat pengguna ingin mengunggah file, frontend akan meminta "tiket" (Signed URL) ke backend.
2.  **Backend (Google Cloud Functions):**
    - **`generate-upload-url`:** Fungsi ini menerima permintaan dari frontend. Ia melakukan validasi keamanan (memblokir ekstensi berbahaya), lalu membuat URL unik yang aman dan berbatas waktu untuk mengunggah file langsung ke Cloud Storage.
    - **`delete-old-files`:** Fungsi ini adalah "robot pembersih". Ia dipicu setiap 3 jam oleh Cloud Scheduler untuk memindai seluruh bucket dan menghapus file yang usianya sudah melebihi batas waktu.

Alur ini memastikan bahwa file besar tidak pernah membebani server frontend, karena proses unggah terjadi langsung antara browser pengguna dan Google Cloud Storage.

---

## 💻 Cara Menjalankan Secara Lokal

Ingin mencoba atau berkontribusi pada proyek ini? Ikuti langkah-langkah berikut:

1.  **Clone Repositori**
    ```bash
    git clone [https://github.com/patihrz/ip-temp-app.git](https://github.com/patihrz/ip-temp-app.git)
    cd ip-temp-app
    ```

2.  **Instal Dependensi**
    Pastikan Anda memiliki [Node.js](https://nodejs.org/) terpasang.
    ```bash
    npm install
    ```

3.  **Setup Environment Variables**
    Buat file baru bernama `.env.local` di root folder proyek. Isi dengan URL Cloud Function Anda:
    ```
    NEXT_PUBLIC_GENERATE_UPLOAD_URL=[https://generate-upload-url-xxx.a.run.app](https://generate-upload-url-xxx.a.run.app)
    ```

4.  **Jalankan Server Development**
    ```bash
    npm run dev
    ```

5.  Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

---

## 📂 Struktur Proyek

/
├── public/               # Aset statis
├── src/
│   └── app/
│       ├── globals.css   # CSS Global
│       ├── layout.js     # Layout utama aplikasi
│       └── page.js       # Komponen utama halaman depan
├── .env.local            # File environment (rahasia, tidak di-commit)
├── .gitignore            # Daftar file yang diabaikan oleh Git
├── next.config.js        # Konfigurasi Next.js
├── package.json          # Daftar dependensi dan skrip
└── README.md             # Anda sedang membacanya



/├── public/               # Aset statis├── src/│   └── app/│       ├── globals.css   # CSS Global│       ├── layout.js     # Layout utama aplikasi│       └── page.js       # Komponen utama halaman depan├── .env.local            # File environment (rahasia, tidak di-commit)├── .gitignore            # Daftar file yang diabaikan oleh Git├── next.config.js        # Konfigurasi Next.js├── package.json          # Daftar dependensi dan skrip└── README.md             # Anda sedang membacanya
---

## 🤝 Kontribusi

Kontribusi dalam bentuk apa pun sangat diterima! Jika Anda menemukan bug atau memiliki ide fitur, silakan buat sebuah [Issue](https://github.com/patihrz/ip-temp-app/issues) atau ajukan sebuah [Pull Request](https://github.com/patihrz/ip-temp-app/pulls).

---

## 📄 Lisensi


Proyek ini dilisensikan di bawah **MIT License**. Lihat file `LICENSE` untuk detail lebih lanjut.

Proyek ini dilisensikan di bawah **MIT License**. Lihat file `LICENSE` untuk detail lebih lanjut.

