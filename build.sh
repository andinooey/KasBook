#!/bin/sh
# Minify src/app.js menjadi app.js (butuh Node).
# Pakai esbuild (offline kalau sudah terpasang), kalau tidak ada pakai terser lewat npx (butuh internet).
# Setelah build, naikkan nomor cache di sw.js supaya perangkat lama memuat file baru.
if command -v esbuild >/dev/null 2>&1; then
  esbuild src/app.js --minify --target=es2020 --charset=utf8 --legal-comments=none --outfile=app.js
else
  npx --yes terser src/app.js --compress --mangle -o app.js
fi
