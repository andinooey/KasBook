# JejakDuit
Aplikasi pencatatan keuangan (PWA). Tanpa login dan tanpa backend: data tersimpan di browser (localStorage) pada perangkat masing-masing.

## Deploy ke Cloudflare Pages
Hubungkan repo GitHub. Build command dikosongkan, output directory `/`.

## Fitur
- Beranda: dompet (saldo per dompet), catat cepat dengan garis budget per kategori, budget, grafik 7 hari, pengingat cadangan.
- Dompet: banyak dompet (Tunai, bank, e-wallet) dengan saldo awal, transaksi dicatat per dompet, filter Transaksi per dompet.
- Transfer: pindah uang antar dompet tanpa dihitung sebagai pemasukan atau pengeluaran.
- Catat: keypad dengan tombol 000, tahan ⌫ untuk hapus cepat, kalkulator `+` `−`, "Simpan & tambah lagi", opsi Ulangi tiap bulan.
- Transaksi: cari, filter jenis, filter rentang tanggal, geser baris ke kiri untuk menghapus (ada Urungkan).
- Transaksi > Kalender: tampilan bulan dengan total pengeluaran per hari, penanda pemasukan, warna lebih pekat di hari boros, geser untuk ganti bulan, ketuk tanggal untuk rincian dan catat di tanggal itu.
- Laporan: donat per kategori, tren 6 bulan, perbandingan dengan bulan lalu (bulan berjalan dibandingkan di tanggal yang sama).
- Profil: 7 palet (termasuk pink), mode terang/gelap, mata uang (Rupiah atau tanpa), budget, master kategori (tambah, ubah, hapus; kategori yang sudah dipakai transaksi tidak bisa dihapus), transaksi berulang bulanan, cadangan JSON, ekspor/impor CSV.
- Keamanan: kunci aplikasi dengan PIN 4 angka (kunci otomatis, pembatasan percobaan), biometrik opsional lewat WebAuthn, tampilan disamarkan di pratinjau multitasking. PIN hanya mengunci tampilan, data di localStorage tidak dienkripsi. Lupa PIN berarti data dihapus.
- PWA: bisa dipasang, jalan pintas "Catat pengeluaran/pemasukan" dari ikon aplikasi, font tersimpan untuk offline.

## Catatan
- Data hanya ada di perangkat tempat dipakai. Jika data situs dihapus, data hilang. Cadangkan lewat Profil > Cadangkan data (JSON), yang berisi transaksi, kategori, budget, dan transaksi berulang. CSV hanya berisi transaksi (kolom dompet dan ke_dompet ikut diekspor, CSV lama tanpa kolom itu tetap bisa diimpor). Cadangan JSON memuat dompet tetapi tidak memuat PIN.
- Perangkat berbeda tidak saling sinkron.
- Transaksi berulang dicatat saat aplikasi dibuka pada atau setelah tanggalnya (PWA tidak bisa berjalan di latar belakang).
- Setelah deploy, sw.js memakai cache `jejakduit-v7`. Naikkan nomor versinya tiap rilis agar perangkat lama memuat file baru.
