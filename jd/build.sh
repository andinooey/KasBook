#!/bin/sh
# Minify src/app.js menjadi app.js (butuh Node). Terser juga mengecilkan nama variabel, jadi hasilnya jauh lebih kecil.
# Setelah build, naikkan nomor cache di sw.js supaya perangkat lama memuat file baru.
npx --yes terser src/app.js --compress --mangle -o app.js
