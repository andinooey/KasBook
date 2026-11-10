# Riwayat versi JejakDuit

Versi terbaru di atas. Penjelasan fitur terkini ada di README.md.

## Versi 29 (tambahan di atas v28)
- Poles tampilan, hanya CSS (`style.css`), tanpa animasi baru dan tanpa perubahan perilaku. Kartu saldo lebih berdimensi (sorot cahaya, tepi halus), kartu dan dompet memakai bayangan dua lapis dengan garis tipis, ikon kategori bergradasi lembut dengan bayangan berwarna, tautan "Lihat semua/Atur/Kelola" jadi kapsul, tombol Simpan dan keypad lebih timbul, nominal Catat lebih besar. Mode terang dan gelap sudah dicek.

## Versi 28 (tambahan di atas v27)
- Beranda: pengingat cadangan jadi satu baris ringkas yang bisa ditunda 7 hari (tombol ×). Teks "Total saldo = jumlah semua dompet" dihapus. Kapsul Masuk/Keluar diberi label "bulan ini".
- Transaksi: tombol + di header dihapus (tombol + di navigasi tetap). Placeholder pencarian jadi "Cari transaksi". Baris transaksi menampilkan nama dompet (bila punya lebih dari satu) dan pengeluaran diberi tanda minus.
- Profil: urutan jadi Umum, Keamanan, Data, Tampilan, lalu Hapus semua data. Pilihan Mata uang dihapus (selalu Rupiah). Pilihan Animasi dihapus (selalu mode Hemat). Palet dari 7 jadi 5 (Hijau Hutan dan Hitam Emas dihapus; pengguna yang memakainya otomatis kembali ke Tosca Laut).
- Pengaturan awal 3 langkah untuk pengguna baru yang datanya masih kosong: saldo Tunai, kategori pengeluaran yang dipakai, dan budget bulanan. Tiap langkah bisa dilewati, dan hanya tampil sekali.
- Dokumentasi: riwayat versi dipindah ke CHANGELOG.md, README hanya berisi kondisi terkini.

## Versi 27 (tambahan di atas v26)
- Transaksi: tombol Filter tunggal (lembar berisi Jenis, Kategori, Dompet, Nominal, Tanggal), chip filter aktif yang bisa dihapus, baris hasil (jumlah, Keluar, Masuk), Hapus filter, urutan Terbaru/Terbesar, pesan kosong dengan Reset filter. Pencarian juga cocok dengan nominal (mis. 25000 atau 25.000) dan nama dompet. Chip Semua/Keluar/Masuk/Pindah dana, tombol Tanggal, dan chip dompet di daftar dihapus (pindah ke lembar Filter; Kalender tetap memakai chip dompet).
- Laporan dirombak dari 14 blok menjadi 4: Ringkasan, Grafik, Kategori, Budget (+ Sorotan 2 baris). Dihapus: Rasio tabungan, "Per kategori: A vs B", "Naik paling banyak", "Per dompet", kartu Selisih dan Rata-rata/hari (rata-rata pindah ke Sorotan), persen budget di daftar kategori, dan grafik batang.
- Grafik line interaktif (sentuh dan geser): Bulan = total berjalan harian vs bulan lalu (putus-putus) dengan sakelar Harian/6 bulan; Minggu = total berjalan vs minggu lalu; Tahun = Masuk, Keluar, dan Keluar tahun lalu. Angka tiap titik tampil di atas grafik; di Tahun dan 6 bulan ada tombol "Buka bulan".
- Donat: ketuk baris kategori untuk menyalakan irisannya. Budget: ketuk baris untuk membuka Transaksi yang sudah terfilter kategori itu.
- Catatan perbandingan panjang dipindah ke ikon i di kartu Ringkasan. "Mgg ini/Mgg lalu" ditulis penuh, "Baru, bulan lalu 0" menjadi "Baru".
- Build: app.js di root sudah diminify dengan esbuild (154 KB menjadi 136 KB). `build.sh` memakai esbuild kalau tersedia, kalau tidak memakai terser lewat npx.

## Versi 26 (tambahan di atas v25)
- Urungkan: hapus kategori, hapus dompet, dan hentikan transaksi berulang kini bisa diurungkan lewat toast (sebelumnya langsung hilang).
- Laporan: Rasio tabungan, Budget vs realisasi per kategori (tab Bulan, dengan sisa hari), Naik paling banyak, dan Per dompet.
- Aksesibilitas: kontras teks diperbaiki (hijau, amber, hero, keypad, segmen) berdasarkan pengukuran WCAG; tombol kecil mendapat area ketuk lebih besar.

## Versi 25 (tambahan di atas v24)
- Beranda: "Catat cepat" diganti "Catat per kategori", berupa grid rata 5 kolom (ikon di atas, nama di bawah), tanpa ring budget.

## Versi 24 (tambahan di atas v23)
- Laporan punya tab Minggu, Bulan, Tahun. Tiap periode: navigasi sendiri, perbandingan dengan periode sebelumnya (adil untuk periode yang masih berjalan), diagram dan daftar per kategori, grafik (7 hari, 6 bulan, 12 bulan; klik bulan di tab Tahun membuka tab Bulan).
- Kartu ringkasan di atas Laporan: lebih hemat atau lebih boros dibanding periode lalu.
- Kartu Sorotan: Minggu (hari paling boros, hari tanpa pengeluaran), Bulan (transaksi terbesar, hari paling boros, proyeksi akhir bulan), Tahun (bulan paling boros dan hemat, rata-rata per bulan).
- Beranda: kartu dompet hanya menampilkan saldo, keterangan hero diredupkan, kartu ringkasan dirapatkan, kapsul kategori tinggi 36px.

## Versi 23 (tambahan di atas v22)
- Tombol Simpan nonaktif kini terbaca (abu-abu solid, bukan pudar); "Simpan & tambah lagi" satu baris.
- Jarak bawah halaman dicek: konten berhenti 20px di atas tombol +.
- Baris pindah dana satu baris (jam dihilangkan); semua keterangan baris dipotong dengan elipsis.
- Skala radius (28/24/18) dan jarak (16) disatukan untuk kartu, daftar, dompet, tombol.

## Versi 22 (tambahan di atas v21)
- Beranda lebih pendek: urutan Catat cepat, Terbaru, lalu Budget dan 7 hari digabung jadi satu kartu yang bisa digeser (dengan titik penanda).
- Kategori berbentuk kapsul, di Catat cepat (ring budget tetap ada di sekeliling ikon) dan di Catat transaksi. Pil kategori di atas nominal dihapus karena kategori terpilih sudah terlihat di kapsul.
- Tombol + di navigasi lebih besar dan menonjol sedikit di atas kapsul.

## Versi 21 (tambahan di atas v20)
- Detail dompet: ikon mata untuk sembunyikan/tampilkan saldo; keterangan "Pindah dana bulan ini" dihapus; tombol "Pindah dana" satu baris dan rata tengah.
- Tombol + saat berada di dalam dompet langsung memakai dompet itu.
- Laporan: grafik garis per kategori diganti daftar teks "kategori, bulan ini vs bulan lalu".
- Form pindah dana dirapatkan sehingga keypad dan tombol simpan muat di layar.

## Versi 20 (tambahan di atas v19)
- Notifikasi digabung jadi satu: Profil > Notifikasi. Saklar perangkat di atas, lalu Pengingat catat dan Peringatan budget sebagai accordion (buka-tutup), masing-masing punya saklar on/off.
- Budget bulanan bisa dimatikan (saklar di sheet Budget). Saat mati, ring budget, peringatan, dan batas per kategori disembunyikan; angka tetap tersimpan.
- Form Pindah dana: pil ikon dan tulisan "Pindah dana" di atas nominal dihapus.
- Sembunyikan saldo memakai titik bulat (••••••), bukan blur.
- Tipografi: ukuran minimum 11px, teks bantu 12,5px; layar 360px dirapikan.
- Shadow tidak lagi terpotong di daftar geser (dompet, filter, kategori); daftar budget diberi fade bawah.

## Versi 19 (tambahan di atas v18)
- Kalender: nominal keluar di bawah tanggal tetap merah saat tanggal dipilih maupun hari ini (tanggal terpilih memakai latar tint dan cincin, bukan latar solid). Nominal keluar di rincian hari juga merah.
- Ringkasan Masuk, Keluar, Pindah dana, Selisih, dan Transaksi (kalender dan rincian hari) diganti satu kartu ringkas dengan pembatas tipis, tanpa ikon. Nilai nol diredupkan.
- Garis kategori dirapikan: kelas `.dl` dipakai ganda (teks perbandingan di Laporan dan daftar jatuh tempo) sehingga teks "vs bulan lalu" bergeser. Teks perbandingan sekarang memakai `.dlt`. Garis budget di Catat cepat diganti cincin progres di sekeliling ikon, jadi tidak lagi terlihat seperti garis bawah label dan tinggi semua tile sama.
- Pengingat budget: saklar aktif/mati, pengaturan hanya tampil saat aktif. Bagian peringatan dipindah dari lembar Budget ke Profil > Pengingat budget. Notifikasi perangkat budget punya saklar sendiri (default mengikuti pengaturan Pengingat catat).

## Versi 18 (tambahan di atas v17)
- Kotak Masuk, Keluar, Pindah dana, dan Selisih/Transaksi dibuat lebih besar dan jelas; keterangan di bawah Dompet dan Catat cepat dihapus; kalender: cincin untuk hari ini, 🔥 saja untuk pengeluaran terbesar, legend disederhanakan.

## Versi 17
- Kalender: titik masuk (hijau) dan pindah dana (biru) di atas tanggal, total keluar ringkas di bawah tanggal, keterangan titik, kotak Pindah dana di ringkasan bulan dan rincian hari, serta sorotan hari pengeluaran terbesar.
- "Transfer" diganti "Pindah dana" di seluruh tampilan (format cadangan tetap kompatibel).
- Peringatan budget punya pengaturan jam sendiri (24 jam).
- Kolom catatan langsung tampil di form catat.
- Transaksi berulang: default minta konfirmasi (Catat, Ubah, Lewati) lewat kartu Jatuh tempo di Beranda. Saklar Catat otomatis tersedia per item.
- Catatan build: app.js di zip ini belum diminify. Jalankan `sh build.sh` (butuh Node dan internet) untuk meminify dari src/app.js, lalu naikkan nomor cache di sw.js.
