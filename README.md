# JejakDuit
Aplikasi pencatatan keuangan (PWA). Tanpa login dan tanpa backend: data tersimpan di browser (localStorage) pada perangkat masing-masing.

## Deploy ke Cloudflare Pages
Hubungkan repo GitHub. Build command dikosongkan, output directory `/`.

## Fitur
- Beranda: catat cepat, budget, grafik 7 hari, pengingat cadangan.
- Catat: keypad dengan tombol 000, tahan ⌫ untuk hapus cepat, kalkulator `+` `−`, "Simpan & tambah lagi", opsi Ulangi tiap bulan.
- Transaksi: cari, filter jenis, filter rentang tanggal, geser baris ke kiri untuk menghapus (ada Urungkan).
- Laporan: donat per kategori, tren 6 bulan.
- Profil: 7 palet (termasuk pink), mode terang/gelap, mata uang (Rupiah atau tanpa), budget, master kategori (tambah, ubah, hapus; kategori yang sudah dipakai transaksi tidak bisa dihapus), transaksi berulang bulanan, cadangan JSON, ekspor/impor CSV.
- PWA: bisa dipasang, jalan pintas "Catat pengeluaran/pemasukan" dari ikon aplikasi, font tersimpan untuk offline.

## Catatan
- Data hanya ada di perangkat tempat dipakai. Jika data situs dihapus, data hilang. Cadangkan lewat Profil > Cadangkan data (JSON), yang berisi transaksi, kategori, budget, dan transaksi berulang. CSV hanya berisi transaksi.
- Perangkat berbeda tidak saling sinkron.
- Transaksi berulang dicatat saat aplikasi dibuka pada atau setelah tanggalnya (PWA tidak bisa berjalan di latar belakang).
- Setelah deploy, sw.js memakai cache `jejakduit-v2`. Naikkan nomor versinya tiap rilis agar perangkat lama memuat file baru.
