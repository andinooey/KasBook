# JejakDuit
Aplikasi pencatatan keuangan (PWA). Tanpa login dan tanpa backend: data tersimpan di browser (localStorage) pada perangkat masing-masing.

## Deploy ke Cloudflare Pages
Hubungkan repo GitHub. Build command dikosongkan, output directory `/`.

## Fitur
- Beranda: dompet (kartu menampilkan saldo, masuk/keluar bulan ini, saldo minus berwarna merah, tombol Transfer), catat cepat dengan garis budget per kategori (urutan tombol bisa diatur lewat tombol Atur), budget, grafik 7 hari, pengingat cadangan.
- Dompet: banyak dompet (Tunai, bank, e-wallet) dengan saldo awal. Ketuk kartu dompet untuk melihat detail: saldo, masuk/keluar bulan ini, grafik saldo 30 hari, tombol Catat/Transfer/Sesuaikan/Ubah, dan transaksi per hari. Dengan 1 dompet, Beranda menawarkan chip sekali ketuk (BCA, GoPay, OVO, Dana). Dompet yang sudah dipakai bisa dihapus dengan memindahkan transaksinya ke dompet lain. Saldo minus diberi tanda merah, toast, dan notifikasi di lonceng.
- Sesuaikan saldo: ketik saldo asli di rekening, app mencatat selisihnya sebagai penyesuaian (tidak dihitung sebagai pemasukan atau pengeluaran di Beranda dan Laporan).
- Transfer: pindah uang antar dompet tanpa dihitung sebagai pemasukan atau pengeluaran. Biaya admin opsional dicatat sebagai pengeluaran terpisah (kategori Lainnya) di dompet asal.
- Catat: keypad dengan tombol 000, tahan ⌫ untuk hapus cepat, kalkulator `+` `−`, "Simpan & tambah lagi", opsi Ulangi tiap bulan.
- Transaksi: cari, filter jenis, chip filter dompet berwarna (titik warna dompet di tiap baris), filter rentang tanggal, geser baris ke kiri untuk menghapus (ada Urungkan).
- Transaksi > Kalender: tampilan bulan dengan titik merah (ada pengeluaran) dan titik hijau (ada pemasukan) per hari, nominal ada di rincian saat tanggal diketuk, geser untuk ganti bulan, ketuk tanggal untuk rincian dan catat di tanggal itu.
- Laporan: bisa disaring per dompet, donat per kategori, tren 6 bulan, perbandingan dengan bulan lalu (bulan berjalan dibandingkan di tanggal yang sama), grafik garis biaya per kategori bulan ini vs bulan lalu (ketuk grafik untuk lihat angkanya).
- Profil: 7 palet (termasuk pink), mode terang/gelap, animasi Hemat (default) atau Penuh, mata uang (Rupiah atau tanpa), budget, master kategori (tambah, ubah, hapus; kategori yang sudah dipakai transaksi tidak bisa dihapus), transaksi berulang bulanan, cadangan JSON (bisa dibagikan lewat Web Share ke WhatsApp atau Files), ekspor/impor CSV.
- Keamanan: kunci aplikasi dengan PIN 6 angka (PIN 4 angka lama tetap berfungsi sampai diganti) (kunci otomatis, pembatasan percobaan), biometrik opsional lewat WebAuthn, tampilan disamarkan di pratinjau multitasking. PIN hanya mengunci tampilan, data di localStorage tidak dienkripsi. Lupa PIN berarti data dihapus.
- Budget: batas persen peringatan diatur di lembar Budget (muncul di lonceng). Pengingat catat: Profil > Pengingat catat untuk mengatur jeda hari (1 sampai 30) dan jam 24 jam. Notifikasi perangkat muncul saat aplikasi dibuka pada atau setelah jam itu, dilewati kalau hari itu sudah ada catatan.
- PWA: bisa dipasang, jalan pintas "Catat pengeluaran/pemasukan" dari ikon aplikasi, font tersimpan untuk offline.

## Catatan
- Data hanya ada di perangkat tempat dipakai. Jika data situs dihapus, data hilang. Cadangkan lewat Profil > Cadangkan data (JSON), yang berisi transaksi, kategori, budget, dan transaksi berulang. CSV hanya berisi transaksi (kolom dompet dan ke_dompet ikut diekspor, CSV lama tanpa kolom itu tetap bisa diimpor). Cadangan JSON memuat dompet tetapi tidak memuat PIN.
- Semua angka memakai format Indonesia: titik sebagai pemisah ribuan, koma sebagai desimal. Kolom input uang diberi titik otomatis saat mengetik.
- Perangkat berbeda tidak saling sinkron.
- Transaksi berulang dicatat saat aplikasi dibuka pada atau setelah tanggalnya (PWA tidak bisa berjalan di latar belakang).
- Setelah deploy, sw.js memakai cache `jejakduit-v14`. Naikkan nomor versinya tiap rilis agar perangkat lama memuat file baru.

## Build
`app.js` di root adalah hasil minify. Sumber yang bisa dibaca ada di `src/app.js`. Setelah mengubah sumber, jalankan `sh build.sh` lalu naikkan versi cache di `sw.js`.
SW memakai cache dulu lalu memperbarui di belakang, jadi pengguna melihat toast "Versi baru tersedia" setelah rilis baru.
