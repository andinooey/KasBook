# JejakDuit
Aplikasi pencatatan keuangan (PWA). Tanpa login dan tanpa backend: data tersimpan di browser (localStorage) pada perangkat masing-masing.

## Deploy ke Cloudflare Pages
Hubungkan repo GitHub. Build command dikosongkan, output directory `/`.

## Fitur
- Beranda: dompet (kartu menampilkan saldo, masuk/keluar bulan ini, saldo minus berwarna merah, tombol Transfer), catat cepat dengan cincin budget di sekeliling ikon kategori (urutan tombol bisa diatur lewat tombol Atur: geser pegangan atau pakai tombol panah), budget, grafik 7 hari, pengingat cadangan.
- Dompet: banyak dompet (Tunai, bank, e-wallet) dengan saldo awal. Ketuk kartu dompet untuk melihat detail: saldo, masuk/keluar bulan ini, grafik saldo 30 hari, tombol Catat/Transfer/Sesuaikan/Ubah, dan transaksi per hari. Dengan 1 dompet, Beranda menawarkan chip sekali ketuk (BCA, GoPay, OVO, Dana). Dompet yang sudah dipakai bisa dihapus dengan memindahkan transaksinya ke dompet lain. Saldo minus diberi tanda merah, toast, dan notifikasi di lonceng.
- Sesuaikan saldo: ketik saldo asli di rekening, app mencatat selisihnya sebagai penyesuaian (tidak dihitung sebagai pemasukan atau pengeluaran di Beranda dan Laporan).
- Transfer: pindah uang antar dompet tanpa dihitung sebagai pemasukan atau pengeluaran. Biaya admin opsional dicatat sebagai pengeluaran terpisah (kategori Lainnya) di dompet asal.
- Catat: keypad dengan tombol 000, tahan ⌫ untuk hapus cepat, kalkulator `+` `−`, "Simpan & tambah lagi", opsi Ulangi tiap bulan.
- Transaksi: cari, filter jenis, chip filter dompet berwarna (titik warna dompet di tiap baris), filter rentang tanggal, geser baris ke kiri untuk menghapus (ada Urungkan).
- Transaksi > Kalender: tampilan bulan dengan titik merah (ada pengeluaran) dan titik hijau (ada pemasukan) per hari, nominal ada di rincian saat tanggal diketuk, geser untuk ganti bulan, ketuk tanggal untuk rincian dan catat di tanggal itu.
- Laporan: bisa disaring per dompet, donat per kategori, tren 6 bulan, perbandingan dengan bulan lalu (bulan berjalan dibandingkan di tanggal yang sama), grafik garis biaya per kategori bulan ini vs bulan lalu (ketuk grafik untuk lihat angkanya).
- Profil: 7 palet (termasuk pink), mode terang/gelap, animasi Hemat (default) atau Penuh, mata uang (Rupiah atau tanpa), budget, master kategori (tambah, ubah, hapus; kategori yang sudah dipakai transaksi tidak bisa dihapus), transaksi berulang bulanan, cadangan JSON (bisa dibagikan lewat Web Share ke WhatsApp atau Files), ekspor/impor CSV.
- Keamanan: kunci aplikasi dengan PIN 6 angka (PIN 4 angka lama tetap berfungsi sampai diganti) (kunci otomatis, pembatasan percobaan), biometrik opsional lewat WebAuthn, tampilan disamarkan di pratinjau multitasking. PIN hanya mengunci tampilan, data di localStorage tidak dienkripsi. Lupa PIN berarti data dihapus.
- Budget: total dan batas per kategori diatur di lembar Budget. Pengingat budget (Profil > Pengingat budget) punya saklar aktif/mati; saat aktif muncul pengaturan batas persen, notifikasi perangkat, dan jam 24 jam. Saat mati, peringatan budget tidak muncul di lonceng, toast, maupun notifikasi perangkat. Pengingat catat: Profil > Pengingat catat untuk mengatur jeda hari (1 sampai 30) dan jam 24 jam. Notifikasi perangkat muncul saat aplikasi dibuka pada atau setelah jam itu, dilewati kalau hari itu sudah ada catatan.
- PWA: bisa dipasang, jalan pintas "Catat pengeluaran/pemasukan" dari ikon aplikasi, font tersimpan untuk offline.

## Catatan
- Data hanya ada di perangkat tempat dipakai. Jika data situs dihapus, data hilang. Cadangkan lewat Profil > Cadangkan data (JSON), yang berisi transaksi, kategori, budget, dan transaksi berulang. CSV hanya berisi transaksi (kolom dompet dan ke_dompet ikut diekspor, CSV lama tanpa kolom itu tetap bisa diimpor). Cadangan JSON memuat dompet tetapi tidak memuat PIN.
- Semua angka memakai format Indonesia: titik sebagai pemisah ribuan, koma sebagai desimal. Kolom input uang diberi titik otomatis saat mengetik.
- Perangkat berbeda tidak saling sinkron.
- Transaksi berulang dicatat saat aplikasi dibuka pada atau setelah tanggalnya (PWA tidak bisa berjalan di latar belakang).
- Setelah deploy, sw.js memakai cache `jejakduit-v19`. Naikkan nomor versinya tiap rilis agar perangkat lama memuat file baru.

## Build
`app.js` di root adalah hasil minify. Sumber yang bisa dibaca ada di `src/app.js`. Setelah mengubah sumber, jalankan `sh build.sh` lalu naikkan versi cache di `sw.js`.
SW memakai cache dulu lalu memperbarui di belakang, jadi pengguna melihat toast "Versi baru tersedia" setelah rilis baru.

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

## Versi 27
- Beranda: kategori maksimal 10 slot (5×2). Lebih dari 10 → 9 kategori + tile "Semua" yang membuka sheet berisi semua kategori. Pemasukan selalu tampil.
- Hero: bar budget (hanya jika budget aktif) dengan teks terpakai dan sisa; ketuk untuk atur budget. Teks "Total saldo = jumlah semua dompet" dihapus.
- Kartu Budget dan 7 hari dihapus dari Beranda. Terbaru hanya menampilkan transaksi hari ini dan kemarin.
- Strip dompet dikecilkan (ikon di kiri, nama dan saldo di kanan).
- Saran "Pisahkan biar tahu saldo tiap rekening" hanya muncul di awal (belum ada transaksi, satu dompet) dan bisa ditutup dengan tombol silang.
- Profil: kartu hitungan Transaksi, pengaturan Mata uang (selalu Rupiah), dan pengaturan Animasi (selalu hemat) dihapus. Pilihan warna jadi 5: Tosca, Biru, Hijau, Ungu, Jingga.

## Versi 27 (lanjutan)
- Profil: kartu Hari mencatat dan Hari beruntun dihapus beserta kode perhitungannya.
- Warna Hijau Hutan diganti Mawar Muda (pink).
- Transaksi: tombol + di kanan atas dihapus. Tombol + di navigasi mencatat sesuai tanggal yang dipilih di Kalender.
- Transaksi: tombol Filter (dengan badge jumlah filter aktif) membuka sheet berisi Jenis, Kategori, Dompet (multi-pilih), Nominal (min/maks dan pilihan cepat), Tanggal, dan Urutkan (Terbaru/Terbesar). Filter aktif tampil sebagai chip yang bisa dihapus, ada ringkasan hasil, dan state kosong dengan Reset filter. Pencarian juga mencocokkan nominal dan nama dompet.
- Pindah dana sekarang menampilkan jam. Di Beranda, "Hari ini" jadi label di atas daftar, bukan di tiap baris.
- Filter: kolom tanggal dan nominal dirapikan (tidak terpotong), grup kategori mengikuti Jenis (Keluar/Masuk/Pindah dana), ikon tombol filter selalu putih saat aktif.
- Beranda: Terbaru dikelompokkan per tanggal seperti tab Transaksi.

## Versi 28
- Laporan tab Minggu dirombak (Bulan dan Tahun belum): pilih minggu lewat tombol ‹ › atau ketuk judul periode, ringkasan pengeluaran dibanding minggu lalu, grafik "Hari apa paling boros?" (dengan bayangan minggu lalu), donut "Uang paling banyak ke mana?" (6 kategori + Lainnya, ketuk potongan untuk detail, daftar lengkap), dan 3 transaksi terbesar. Judul bagian bisa dilipat.
- Perbaikan v28: nama kelas baris kategori Laporan bentrok dengan strip dompet di Beranda (diganti), garis penunjuk donut tidak lagi menyentuh cincin, kartu donut dirapatkan.

- Judul section Laporan Minggu sekarang pakai ikon (kalender, pie, koin).

## Versi 29
- Laporan **Bulan**: arus bersih + budget bulanan, laju pengeluaran vs bulan lalu (dengan garis budget dan proyeksi), kalender heatmap (ketuk tanggal untuk rincian), pengeluaran per rentang tanggal, donut kategori.
- Laporan **Tahun**: tabungan setahun, masuk vs keluar per bulan, pertumbuhan saldo, donut kategori, tren 3 kategori terbesar, total per 3 bulan. Pilih tahun lewat judul.
- **Budget bulanan beda tiap bulan**: di sheet Budget pilih bulan (‹ ›). Yang disimpan berlaku dari bulan itu sampai diubah lagi; ada saklar "Hanya bulan ini". Data: `S.bud.mo['YYYY-MM']`; data lama tetap dipakai untuk bulan sebelum isian pertama.
- **Budget mingguan** (`S.bud.wk.total`): tab Mingguan di sheet Budget, tampil sebagai bar di kartu atas Laporan Minggu.
- Budget bulanan juga tampil di kartu atas Laporan Bulan. Jika belum diatur, ada tombol "Atur budget".

## Versi 30
- Tiap tab Laporan punya judul pertanyaan di atas kartu utama (mis. "Berapa pengeluaranku minggu ini?").
- Kartu atas Minggu disamakan dengan mockup: total, perbandingan, bar budget mingguan dengan rata-rata per hari dan sisa (tanpa Masuk/Selisih).
- Tab Minggu/Bulan/Tahun nempel di atas saat scroll.
- Grafik bisa diketuk untuk detail: batang harian (Minggu), laju pengeluaran dan batang per rentang tanggal (Bulan), masuk vs keluar dan saldo (Tahun).
- Donut baru: ujung potongan membulat, garis label melengkung, animasi sapuan donut lalu garis dan label muncul bergantian.

## Versi 31
- Beranda: "Catat per kategori" dibungkus kartu putih lagi.
- Total saldo di hero punya animasi count (naik dari angka sebelumnya, atau dari 0 saat masuk Beranda). Tidak jalan saat saldo disembunyikan atau mode kurangi gerak aktif.
- Tombol mata: saat saldo disembunyikan, total dan saldo tiap dompet di sheet Kelola dompet ikut tersamarkan.

## Versi 32
- Donut Laporan (Minggu/Bulan/Tahun): animasi diganti ke versi ringan tanpa mask SVG (penyebab kedip di HP), dan baru main saat donut masuk layar. Potongan muncul searah jarum jam, lalu garis dan label.
- Jarak antar potongan donut dibuat konstan dan sejajar (tidak lagi menyempit di sisi dalam).
