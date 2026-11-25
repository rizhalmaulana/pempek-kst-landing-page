# Pempek KST Lemak Nian — Website Penjualan Resmi (Palembang)

Website penjualan resmi **Pempek KST Lemak Nian** (Lorok Pakjo, Kec. Ilir Bar. I, Kota Palembang, Sumatera Selatan 30151) dengan pilihan 100% daging ikan segar **Tenggiri, Gabus, dan Kakap**, fitur **Rakit Paket (Mulai Isi 10) & Beli Satuan**, **Estimasi Ongkir Ramah Makanan (*Food-Safe Indicator*)**, serta pemesanan langsung via **WhatsApp (+62 878-1711-0555)**.

## Struktur Folder

- `index.html` — Halaman utama dengan SEO metadata, Local GEO tags, Open Graph, dan Schema.org JSON-LD (`FoodEstablishment`, `OfferCatalog`, `FAQPage`).
- `css/styles.css` — Desain *Modern Heritage Palembang*, responsif mobile-first, dan ramah aksesibilitas.
- `js/data.js` — Pusat konfigurasi bisnis (profil, nomor WhatsApp, alamat, katalog menu, tarif ongkir, testimoni, dan FAQ).
- `js/app.js` — Logika interaktif (komparasi 3 ikan, keranjang campur ikan tersimpan otomatis di `localStorage`, kalkulator berat & ongkir, generator format WhatsApp).
- `assets/` — Foto produk & favicon resmi (`favicon.svg`, `hero-pempek.jpg`, `cuko-palembang.jpg`, `vacuum-pack.jpg`).
- `llms.txt` — Ringkasan terstruktur untuk **GEO (Generative Engine Optimization)** agar AI search mudah memahami & merekomendasikan brand.
- `site.webmanifest`, `robots.txt`, `sitemap.xml`, `_headers`, `vercel.json` — Konfigurasi SEO, PWA manifest, cache, dan header keamanan produksi.

## Publish ke Vercel

1. Daftar / login ke [vercel.com](https://vercel.com) (gratis untuk Hobby plan).
2. Cara termudah via CLI: jalankan `npx vercel --prod` di dalam folder proyek ini, atau push folder ke GitHub lalu import repository di dashboard Vercel.
3. File `vercel.json` otomatis menerapkan clean URL, security headers, dan caching aset.
