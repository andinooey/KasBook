# JejakDuit
Aplikasi pencatatan keuangan (PWA). Tanpa login dan tanpa backend: data tersimpan di browser (localStorage) pada perangkat masing-masing.

## Deploy ke Cloudflare Pages
Hubungkan repo GitHub. Build command dikosongkan, output directory `/`.

## Fitur
- **Pengaturan awal:** pengguna baru yang datanya masih kosong melihat 3 langkah (saldo Tunai, kategori yang dipakai, budget bulanan). Semua bisa dilewati dan hanya tampil sekali.
- **Beranda:** total saldo dengan Masuk/Keluar bulan ini, dompet (saldo minus berwarna merah, tombol Pindah dana), Catat per kategori (grid 5 kolom, urutan bisa diatur lewat tombol Atur), transaksi terbaru, Budget dan grafik 7 hari dalam satu kartu geser, kartu Jatuh tempo untuk transaksi berulang, dan pengingat cadangan satu baris yang bisa ditunda 7 hari.
- **Dompet:** banyak dompet (Tunai, bank, e-wallet) dengan saldo awal. Ketuk kartu dompet untuk detail: saldo, masuk/keluar bulan ini, grafik saldo 30 hari, tombol Catat/Pindah dana/Sesuaikan/Ubah, dan transaksi per hari. Dengan 1 dompet, Beranda menawarkan chip sekali ketuk (BCA, GoPay, OVO, Dana). Dompet yang sudah dipakai bisa dihapus dengan memindahkan transaksinya ke dompet lain. Saldo minus diberi tanda merah, toast, dan notifikasi di lonceng.
- **Sesuaikan saldo:** ketik saldo asli di rekening, app mencatat selisihnya sebagai penyesuaian (tidak dihitung sebagai pemasukan atau pengeluaran).
- **Pindah dana:** pindah uang antar dompet tanpa dihitung sebagai pemasukan atau pengeluaran. Biaya admin opsional dicatat sebagai pengeluaran terpisah (kategori Lainnya) di dompet asal.
- **Catat:** keypad dengan tombol 000, tahan ⌫ untuk hapus cepat, kalkulator `+` `−`, kolom catatan langsung tampil, "Simpan & tambah lagi", opsi Ulangi tiap bulan.
- **Transaksi (Daftar):** kolom cari (catatan, kategori, nama dompet, nominal) dan satu tombol Filter (Jenis, Kategori, Dompet, Nominal, Tanggal). Filter aktif tampil sebagai chip yang bisa dihapus. Baris hasil menampilkan jumlah, total Keluar dan Masuk, serta urutan Terbaru/Terbesar. Geser baris ke kiri untuk menghapus (ada Urungkan).
- **Transaksi (Kalender):** titik hijau (masuk) dan biru (pindah dana) di atas tanggal, total keluar ringkas di bawah tanggal, 🔥 untuk hari pengeluaran terbesar bulan itu, ringkasan Masuk/Keluar/Pindah dana/Selisih, geser untuk ganti bulan, ketuk tanggal untuk rincian dan catat di tanggal itu.
- **Laporan:** tab Minggu/Bulan/Tahun, bisa disaring per dompet. Isinya: ringkasan (pengeluaran, pembanding periode lalu, masuk, sisa, proyeksi), grafik line interaktif, donat dan daftar kategori, Budget (tab Bulan), dan Sorotan.
- **Budget:** total dan batas per kategori diatur di lembar Budget (bisa dimatikan dengan saklar).
- **Notifikasi (Profil > Notifikasi):** saklar notifikasi perangkat di atas, lalu dua pengingat yang bisa dibuka-tutup: Pengingat catat (jeda 1 sampai 30 hari dan jam 24 jam) dan Peringatan budget (batas persen dan jam 24 jam), masing-masing punya saklar. Notifikasi perangkat muncul saat aplikasi dibuka pada atau setelah jam yang dipilih, dan pengingat catat dilewati kalau hari itu sudah ada catatan.
- **Profil:** urutan Umum (dompet, budget, notifikasi, kategori, transaksi berulang), Keamanan, Data, Tampilan (5 palet, mode terang/gelap/otomatis), lalu Hapus semua data. Mata uang selalu Rupiah dan animasi selalu mode Hemat.
- **Keamanan:** kunci aplikasi dengan PIN 6 angka (PIN 4 angka lama tetap berfungsi sampai diganti), kunci otomatis, pembatasan percobaan, biometrik opsional lewat WebAuthn, tampilan disamarkan di pratinjau multitasking. PIN hanya mengunci tampilan, data di localStorage tidak dienkripsi. Lupa PIN berarti data dihapus.
- **Data:** cadangan JSON (bisa dibagikan lewat Web Share ke WhatsApp atau Files), ekspor/impor CSV, Urungkan untuk hapus kategori, dompet, dan transaksi berulang.
- **PWA:** bisa dipasang, jalan pintas "Catat pengeluaran/pemasukan" dari ikon aplikasi, font tersimpan untuk offline.

## Catatan
- Data hanya ada di perangkat tempat dipakai. Jika data situs dihapus, data hilang. Cadangkan lewat Profil > Cadangkan data (JSON), yang berisi transaksi, kategori, budget, transaksi berulang, dan dompet, tetapi tidak berisi PIN maupun pengaturan tampilan. CSV hanya berisi transaksi (kolom dompet dan ke_dompet ikut diekspor, CSV lama tanpa kolom itu tetap bisa diimpor). Format cadangan memakai kata `tf`/`transfer` untuk pindah dana demi kompatibilitas.
- Semua angka memakai format Indonesia: titik sebagai pemisah ribuan, koma sebagai desimal. Kolom input uang diberi titik otomatis saat mengetik.
- Perangkat berbeda tidak saling sinkron.
- PWA tidak bisa berjalan di latar belakang: transaksi berulang dicatat dan notifikasi muncul saat aplikasi dibuka pada atau setelah waktunya.
- Pinch-zoom sengaja dinonaktifkan di `index.html` (`user-scalable=no`). Kolom input sudah 16px sehingga iPhone tidak zoom sendiri.

## Build dan rilis
`app.js` di root adalah hasil minify. Sumber yang bisa dibaca ada di `src/app.js`.
1. Ubah `src/app.js` atau `style.css`.
2. Jalankan `sh build.sh` (memakai esbuild kalau ada, kalau tidak terser lewat npx dan butuh internet).
3. Naikkan nomor versi cache di `sw.js` (`const C='jejakduit-vNN'`), supaya perangkat lama memuat file baru.
4. Tambahkan catatan di `CHANGELOG.md`.

Service worker memakai cache dulu lalu memperbarui di belakang, jadi pengguna melihat toast "Versi baru tersedia" setelah rilis baru. Nomor versi yang berlaku selalu yang tertulis di `sw.js`.

Riwayat perubahan per versi ada di [CHANGELOG.md](CHANGELOG.md).
