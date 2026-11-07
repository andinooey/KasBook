# Kasku
Aplikasi pencatatan keuangan (PWA + Firebase).
Isi `firebase-config.js` dan `firebase-messaging-sw.js`, lalu deploy ke Cloudflare Pages (build command kosong, output directory `/`).

## Penting
Aplikasi tanpa layar login memakai Firebase Anonymous Auth. Aktifkan di Firebase Console: Authentication > Sign-in method > Anonymous > Enable > Save.
