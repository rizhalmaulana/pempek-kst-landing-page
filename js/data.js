/**
 * ============================================================================
 * KONFIGURASI DATA WEBSITE — PEMPEK KST LEMAK NIAN (PALEMBANG)
 * ============================================================================
 * Pusat konfigurasi profil brand, daftar produk, harga per jenis ikan,
 * tarif estimasi ongkir dari Palembang, testimoni, dan FAQ.
 */

window.PEMPEK_DATA = {
  brand: {
    name: "Pempek KST Lemak Nian",
    shortName: "KST Lemak Nian",
    tagline: "Pempek Asli Palembang — Pilihan Ikan Tenggiri, Gabus & Kakap",
    originCity: "Palembang, Sumatera Selatan",
    kitchenAddress: "Gg. Musyawarah 5 2229, Lorok Pakjo, Kec. Ilir Bar. I, Kota Palembang, Sumatera Selatan 30151",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Gg.+Musyawarah+5+2229,+Lorok+Pakjo,+Kec.+Ilir+Bar.+I,+Kota+Palembang,+Sumatera+Selatan+30151",
    whatsappNumber: "6287817110555",
    whatsappDisplay: "+62 878-1711-0555",
    cutoffTime: "13.00 WIB",
    operationalHours: "Senin – Minggu, 08.00 – 19.00 WIB",
    packagingAllowanceGram: 150
  },

  /**
   * 3 VARIAN IKAN UTAMA
   * Perbedaan karakter & kelas harga menjadi nilai jual unik brand ini.
   */
  fishTypes: [
    {
      id: "tenggiri",
      name: "Ikan Tenggiri",
      badge: "Paling Favorit",
      priceHint: "Satuan mulai Rp3.500 • Paket 10 Rp35.000",
      tagline: "Gurih klasik khas Palembang dengan aroma ikan segar yang mantap.",
      description:
        "Menggunakan daging ikan tenggiri batang segar pilihan. Menghasilkan tekstur padat-kenyal seimbang dan aroma gurih autentik yang paling dicari pecinta pempek sejati.",
      bestFor: "Pecinta pempek klasik, oleh-oleh kantor, dan paket keluarga.",
      priceTierLabel: "Mulai Rp3,5rb",
      accentColor: "#7D1E26",
      metrics: {
        kekenyalan: 90,
        kelembutan: 82,
        aromaIkan: 94,
        ekonomis: 85
      },
      highlights: [
        "100% daging tenggiri segar tanpa campuran",
        "Aroma gurih kuat, makin nikmat disiram cuko pedas",
        "Tetap lembut walau sudah dingin"
      ]
    },
    {
      id: "gabus",
      name: "Ikan Gabus",
      badge: "Autentik Premium",
      priceHint: "Satuan mulai Rp4.000 • Paket 10 Rp40.000",
      tagline: "Tekstur paling halus & lembut, rasa gurih bersih khas selera Palembang lama.",
      description:
        "Ikan sungai primadona masyarakat Palembang asli. Warna adonan lebih cerah alami, serat sangat halus, rasa gurih lembut tanpa amis—pilihan utama untuk hampers eksklusif & anak-anak.",
      bestFor: "Selera autentik Palembang, anak-anak, lansia, & hampers VIP.",
      priceTierLabel: "Mulai Rp4rb",
      accentColor: "#B8862E",
      metrics: {
        kekenyalan: 80,
        kelembutan: 98,
        aromaIkan: 76,
        ekonomis: 76
      },
      highlights: [
        "Daging ikan gabus sungai segar berkualitas tinggi",
        "Tekstur paling halus, ringan & tidak berbau amis",
        "Pilihan terbaik untuk oleh-oleh & bingkisan spesial"
      ]
    },
    {
      id: "kakap",
      name: "Ikan Kakap",
      badge: "Paling Ekonomis",
      priceHint: "Satuan mulai Rp2.500 • Paket 10 Rp25.000",
      tagline: "Padat, kenyal, gurih seimbang dengan harga paling ramah di kantong.",
      description:
        "Olahan ikan kakap putih segar dengan komposisi ikan tetap melimpah. Menghasilkan gigitan padat dan renyah saat digoreng—cocok untuk stok camilan freezer harian di rumah.",
      bestFor: "Stok freezer rumah, acara arisan, & pesanan jumlah besar.",
      priceTierLabel: "Mulai Rp2,5rb",
      accentColor: "#2F5D50",
      metrics: {
        kekenyalan: 86,
        kelembutan: 78,
        aromaIkan: 80,
        ekonomis: 98
      },
      highlights: [
        "Ikan kakap segar dengan rasa gurih seimbang",
        "Luar ekstra renyah ketika digoreng garing",
        "Paling hemat untuk stok camilan keluarga & reseller"
      ]
    }
  ],

  /**
   * KATALOG MENU (Paket Mulai Isi 10, Beli Satuan Per Pcs, dan Cuko/Pelengkap)
   * Harga otomatis menyesuaikan jenis ikan (tenggiri / gabus / kakap).
   * Jika `fixedFish: true`, item tidak bergantung pada pilihan ikan (misal Cuko).
   */
  menuItems: [
    // --- PAKET SIAP KIRIM (MULAI ISI 10) ---
    {
      id: "paket-coba",
      category: "paket",
      name: "Paket Hemat Coba (Isi 10)",
      shortDesc: "3 Telur Kecil + 3 Adaan + 2 Lenjer Kecil + 2 Kulit Krispi + Cuko 150ml.",
      badge: "Mulai Isi 10",
      image: "assets/paket-coba-10.jpg",
      imageAlt: "Ilustrasi Paket Hemat Coba Isi 10 pempek kecil goreng dan cuko kental Palembang",
      weightGram: 550,
      servings: "10 Pcs • 1–2 Orang",
      prices: {
        tenggiri: 35000,
        gabus: 40000,
        kakap: 25000
      }
    },
    {
      id: "paket-puas",
      category: "paket",
      name: "Paket Puas Mix Besar & Kecil (Isi 15)",
      shortDesc: "2 Kapal Selam Besar + 1 Lenjer Besar + 4 Telur Kecil + 4 Adaan + 4 Kulit/Pistel + Cuko 250ml.",
      badge: "Best Seller",
      image: "assets/paket-puas-15.jpg",
      imageAlt: "Ilustrasi Paket Puas Mix Isi 15 dengan Kapal Selam Besar, Lenjer, Adaan, dan cuko Palembang",
      weightGram: 950,
      servings: "15 Pcs • 3–4 Orang",
      prices: {
        tenggiri: 78000,
        gabus: 90000,
        kakap: 58000
      }
    },
    {
      id: "paket-keluarga",
      category: "paket",
      name: "Paket Keluarga Komplit (Isi 25)",
      shortDesc: "3 Kapal Selam Besar + 2 Lenjer Besar + 5 Telur Kecil + 5 Adaan + 5 Kulit + 5 Pistel + Cuko 400ml.",
      badge: "Paling Hemat",
      image: "assets/paket-keluarga-25.jpg",
      imageAlt: "Ilustrasi Paket Keluarga Komplit Isi 25 kemasan vakum siap goreng beserta hasil sajian pempek",
      weightGram: 1550,
      servings: "25 Pcs • 5–6 Orang",
      prices: {
        tenggiri: 128000,
        gabus: 148000,
        kakap: 95000
      }
    },
    {
      id: "paket-hampers",
      category: "paket",
      name: "Hampers Songket Palembang (Isi 20)",
      shortDesc: "Box eksklusif motif Songket + kartu ucapan + 2 Kapal Selam + 2 Lenjer Besar + 16 Pempek Kecil Mix + Cuko 350ml + Ice Gel.",
      badge: "Cocok Hadiah",
      image: "assets/paket-hampers-20.jpg",
      imageAlt: "Ilustrasi Hampers Songket Palembang Isi 20 lengkap dengan box hadiah, kemasan vakum, botol cuko, dan ice gel",
      weightGram: 1300,
      servings: "20 Pcs • 4–5 Orang",
      prices: {
        tenggiri: 115000,
        gabus: 132000,
        kakap: 88000
      }
    },

    // --- BELI SATUAN (PER 1 PCS) ---
    {
      id: "kapal-selam",
      category: "satuan",
      name: "Pempek Kapal Selam Besar",
      shortDesc: "Isi 1 butir telur ayam utuh, gurih padat, ukuran jumbo khas Palembang.",
      badge: "Wajib Coba",
      image: "assets/satuan-kapal-selam.jpg",
      imageAlt: "Foto Pempek Kapal Selam Besar goreng renyah dengan siraman cuko dan timun",
      weightGram: 170,
      servings: "Satuan (1 Pcs)",
      prices: {
        tenggiri: 14000,
        gabus: 16000,
        kakap: 11000
      }
    },
    {
      id: "lenjer-besar",
      category: "satuan",
      name: "Pempek Lenjer Besar",
      shortDesc: "Potongan padat panjang, pas diiris tebal lalu digoreng garing luarnya.",
      badge: "Satuan",
      image: "assets/satuan-lenjer-besar.jpg",
      imageAlt: "Foto Pempek Lenjer Besar asli Palembang disajikan bersama cuko kental",
      weightGram: 160,
      servings: "Satuan (1 Pcs)",
      prices: {
        tenggiri: 13000,
        gabus: 15000,
        kakap: 10000
      }
    },
    {
      id: "telur-kecil",
      category: "satuan",
      name: "Pempek Telur Kecil",
      shortDesc: "Pempek isi telur ukuran pas sekali gigit, favorit anak-anak & camilan sore.",
      badge: "Bisa Satuan",
      image: "assets/satuan-telur-kecil.jpg",
      imageAlt: "Foto Pempek Telur Kecil goreng keemasan khas Palembang",
      weightGram: 45,
      servings: "Satuan (1 Pcs)",
      quickBulk: 5,
      prices: {
        tenggiri: 3500,
        gabus: 4000,
        kakap: 2500
      }
    },
    {
      id: "lenjer-kecil",
      category: "satuan",
      name: "Pempek Lenjer Kecil",
      shortDesc: "Pempek lenjer mini padat kenyal, cocok buat dicampur di dalam box satuan.",
      badge: "Bisa Satuan",
      image: "assets/satuan-lenjer-kecil.jpg",
      imageAlt: "Foto Pempek Lenjer Kecil goreng gurih khas Palembang",
      weightGram: 45,
      servings: "Satuan (1 Pcs)",
      quickBulk: 5,
      prices: {
        tenggiri: 3500,
        gabus: 4000,
        kakap: 2500
      }
    },
    {
      id: "adaan",
      category: "satuan",
      name: "Pempek Adaan Bulat",
      shortDesc: "Pempek bulat dengan bawang merah, santan tipis & daun bawang harum.",
      badge: "Favorit",
      image: "assets/satuan-adaan.jpg",
      imageAlt: "Foto Pempek Adaan Bulat goreng keemasan khas Palembang",
      weightGram: 45,
      servings: "Satuan (1 Pcs)",
      quickBulk: 5,
      prices: {
        tenggiri: 3500,
        gabus: 4000,
        kakap: 2500
      }
    },
    {
      id: "kulit-krispi",
      category: "satuan",
      name: "Pempek Kulit Krispi",
      shortDesc: "Olahan kulit ikan segar—aroma gurih maksimal, super renyah saat digoreng.",
      badge: "Crispy",
      image: "assets/satuan-kulit.jpg",
      imageAlt: "Foto Pempek Kulit Krispi garing khas Palembang",
      weightGram: 45,
      servings: "Satuan (1 Pcs)",
      quickBulk: 5,
      prices: {
        tenggiri: 3500,
        gabus: 4000,
        kakap: 2500
      }
    },
    {
      id: "pistel-kates",
      category: "satuan",
      name: "Pempek Pistel Kates",
      shortDesc: "Isi tumisan pepaya muda & ebi wangi khas dapur tradisional Palembang.",
      badge: "Khas",
      image: "assets/satuan-pistel.jpg",
      imageAlt: "Foto Pempek Pistel Kates homemade khas Palembang",
      weightGram: 45,
      servings: "Satuan (1 Pcs)",
      quickBulk: 5,
      prices: {
        tenggiri: 3500,
        gabus: 4000,
        kakap: 2500
      }
    },

    // --- CUKO & PELENGKAP ---
    {
      id: "extra-cuko",
      category: "pelengkap",
      name: "Extra Cuko Kental Botol 250ml",
      shortDesc: "Gula aren batok Lubuklinggau, asam jawa, ebi & rawit asli—tanpa cuka biang.",
      badge: "Best Pairing",
      image: "assets/pelengkap-cuko.jpg",
      imageAlt: "Foto botol Extra Cuko Kental Palembang dituang ke sajian pempek",
      weightGram: 280,
      servings: "Botol 250ml",
      fixedFish: true,
      fixedLabel: "Semua Varian",
      prices: {
        tenggiri: 12000,
        gabus: 12000,
        kakap: 12000
      }
    },
    {
      id: "tekwan-frozen",
      category: "pelengkap",
      name: "Tekwan Frozen Komplit (3 Porsi)",
      shortDesc: "Pentol ikan tenggiri + bumbu kuah udang, jamur kuping, bengkuang & soun.",
      badge: "Spesial",
      image: "assets/pelengkap-tekwan.jpg",
      imageAlt: "Foto semangkuk Tekwan asli Palembang dengan pentol ikan, jamur kuping, dan soun",
      weightGram: 550,
      servings: "3 Porsi",
      fixedFish: true,
      fixedLabel: "Ikan Tenggiri",
      prices: {
        tenggiri: 38000,
        gabus: 38000,
        kakap: 38000
      }
    },
    {
      id: "ice-gel-box",
      category: "pelengkap",
      name: "Upgrade Thermal Foil + Ice Gel",
      shortDesc: "Lapisan aluminium foil insulasi + gel pendingin tambahan untuk kirim luar pulau.",
      badge: "Rekomendasi",
      image: "assets/pelengkap-icegel.jpg",
      imageAlt: "Foto Ice Gel pendingin dan box kemasan pengiriman luar kota",
      weightGram: 150,
      servings: "1 Set",
      fixedFish: true,
      fixedLabel: "Pelindung Kirim",
      prices: {
        tenggiri: 8000,
        gabus: 8000,
        kakap: 8000
      }
    }
  ],

  /**
   * DATA ESTIMASI ONGKIR DARI PALEMBANG
   * Klasifikasi Keamanan Pengiriman Makanan (Food-Safe):
   * - maxDays <= 1 -> "sangat-aman"
   * - maxDays === 2 -> "aman"
   * - maxDays === 3 -> "waspada"
   * - maxDays >= 4 -> "tidak-disarankan"
   */
  shippingDestinations: [
    {
      id: "palembang",
      city: "Palembang (Dalam Kota)",
      province: "Sumatera Selatan",
      popular: true,
      couriers: [
        { code: "INSTAN", name: "Kurir Instan / GoSend / Grab", service: "Same Day 1–3 Jam", pricePerKg: 15000, flatRate: true, minDays: 0, maxDays: 0, note: "Bisa pesan matang siap santap atau vakum" },
        { code: "KURIR-TOKO", name: "Kurir Dapur KST", service: "Antar Sore Hari", pricePerKg: 12000, flatRate: true, minDays: 0, maxDays: 0, note: "Flat ongkir area Ilir & Seberang Ulu" }
      ]
    },
    {
      id: "jakarta",
      city: "Jakarta (Pusat, Selatan, Barat, Timur, Utara)",
      province: "DKI Jakarta",
      popular: true,
      couriers: [
        { code: "PAXEL", name: "Paxel Frozen / Next Day", service: "Suhu Terjaga (Cold Chain)", pricePerKg: 28000, minDays: 1, maxDays: 1, note: "Paling direkomendasikan untuk makanan vakum" },
        { code: "JNE-YES", name: "JNE YES", service: "Yakin Esok Sampai", pricePerKg: 34000, minDays: 1, maxDays: 1, note: "Prioritas kargo udara dari Palembang" },
        { code: "SICEPAT-BEST", name: "SiCepat BEST", service: "Besok Sampai Tujuan", pricePerKg: 31000, minDays: 1, maxDays: 2, note: "Cepat & aman dengan kemasan vakum" },
        { code: "JNE-REG", name: "JNE Reguler / J&T", service: "Reguler Darat/Udara", pricePerKg: 21000, minDays: 2, maxDays: 3, note: "Disarankan tambah Ice Gel jika pilih Reguler" }
      ]
    },
    {
      id: "bodetabek",
      city: "Bekasi, Tangerang, Depok, Bogor",
      province: "Jabodetabek",
      popular: true,
      couriers: [
        { code: "PAXEL", name: "Paxel Next Day", service: "Suhu Terjaga (Cold Chain)", pricePerKg: 29000, minDays: 1, maxDays: 2, note: "Aman sampai rumah, suhu stabil" },
        { code: "JNE-YES", name: "JNE YES", service: "Yakin Esok Sampai", pricePerKg: 36000, minDays: 1, maxDays: 1, note: "Pengiriman kilat prioritas" },
        { code: "JNE-REG", name: "JNE Reguler / J&T", service: "Reguler", pricePerKg: 22000, minDays: 2, maxDays: 3, note: "Wajib kemasan vakum (sudah termasuk)" }
      ]
    },
    {
      id: "bandung",
      city: "Bandung & Cimahi",
      province: "Jawa Barat",
      popular: true,
      couriers: [
        { code: "PAXEL", name: "Paxel Next Day", service: "Suhu Terjaga (Cold Chain)", pricePerKg: 30000, minDays: 1, maxDays: 2, note: "Rekomendasi utama area Bandung Raya" },
        { code: "JNE-YES", name: "JNE YES", service: "Yakin Esok Sampai", pricePerKg: 38000, minDays: 1, maxDays: 2, note: "Prioritas cepat dari Palembang" },
        { code: "JNE-REG", name: "JNE Reguler / J&T", service: "Reguler", pricePerKg: 24000, minDays: 2, maxDays: 3, note: "Disarankan tambah Thermal Foil + Ice Gel" }
      ]
    },
    {
      id: "surabaya",
      city: "Surabaya & Sidoarjo",
      province: "Jawa Timur",
      popular: true,
      couriers: [
        { code: "PAXEL", name: "Paxel Frozen / Next Day", service: "Cold Chain Udara", pricePerKg: 35000, minDays: 1, maxDays: 2, note: "Sangat aman untuk kirim ke Jawa Timur" },
        { code: "JNE-YES", name: "JNE YES", service: "Yakin Esok Sampai", pricePerKg: 42000, minDays: 1, maxDays: 2, note: "Kargo udara langsung" },
        { code: "JNE-REG", name: "JNE Reguler", service: "Reguler", pricePerKg: 28000, minDays: 3, maxDays: 4, note: "Tidak disarankan — terlalu lama untuk kualitas rasa" }
      ]
    },
    {
      id: "yogyakarta",
      city: "Yogyakarta & Sleman",
      province: "DI Yogyakarta",
      popular: true,
      couriers: [
        { code: "PAXEL", name: "Paxel Next Day", service: "Cold Chain", pricePerKg: 33000, minDays: 1, maxDays: 2, note: "Suhu terjaga sampai tujuan" },
        { code: "JNE-YES", name: "JNE YES", service: "Yakin Esok Sampai", pricePerKg: 40000, minDays: 1, maxDays: 2, note: "Estimasi cepat & aman" },
        { code: "JNE-REG", name: "JNE Reguler", service: "Reguler", pricePerKg: 27000, minDays: 3, maxDays: 4, note: "Risiko perjalanan panjang, pilih Next Day" }
      ]
    },
    {
      id: "semarang",
      city: "Semarang & Solo",
      province: "Jawa Tengah",
      popular: false,
      couriers: [
        { code: "PAXEL", name: "Paxel Next Day", service: "Cold Chain", pricePerKg: 33000, minDays: 1, maxDays: 2, note: "Rekomendasi untuk Jawa Tengah" },
        { code: "JNE-YES", name: "JNE YES", service: "Yakin Esok Sampai", pricePerKg: 40000, minDays: 1, maxDays: 2, note: "Prioritas cepat" },
        { code: "JNE-REG", name: "JNE Reguler", service: "Reguler", pricePerKg: 27000, minDays: 3, maxDays: 4, note: "Kurang disarankan untuk pempek segar" }
      ]
    },
    {
      id: "lampung",
      city: "Bandar Lampung",
      province: "Lampung",
      popular: false,
      couriers: [
        { code: "TRAVEL", name: "Travel / Shuttle Palembang–Lampung", service: "Kilat Via Tol (Same Day)", pricePerKg: 20000, minDays: 0, maxDays: 1, note: "Lewat Tol Trans Sumatera, cepat sampai!" },
        { code: "JNE-YES", name: "JNE YES", service: "Yakin Esok Sampai", pricePerKg: 25000, minDays: 1, maxDays: 1, note: "Sangat aman & praktis antar ke alamat" },
        { code: "JNT-REG", name: "J&T Express / JNE Reg", service: "Reguler", pricePerKg: 16000, minDays: 1, maxDays: 2, note: "Aman karena jarak dekat" }
      ]
    },
    {
      id: "jambi",
      city: "Jambi",
      province: "Jambi",
      popular: false,
      couriers: [
        { code: "JNE-YES", name: "JNE YES", service: "Yakin Esok Sampai", pricePerKg: 24000, minDays: 1, maxDays: 1, note: "Cepat & aman dari Palembang" },
        { code: "JNT-REG", name: "J&T Express / SiCepat", service: "Reguler", pricePerKg: 15000, minDays: 1, maxDays: 2, note: "Aman dengan kemasan vakum" }
      ]
    },
    {
      id: "bengkulu",
      city: "Bengkulu",
      province: "Bengkulu",
      popular: false,
      couriers: [
        { code: "JNE-YES", name: "JNE YES", service: "Yakin Esok Sampai", pricePerKg: 28000, minDays: 1, maxDays: 2, note: "Rekomendasi tercepat" },
        { code: "JNT-REG", name: "J&T Express", service: "Reguler", pricePerKg: 19000, minDays: 2, maxDays: 3, note: "Tambahkan Ice Gel untuk ekstra aman" }
      ]
    },
    {
      id: "medan",
      city: "Medan",
      province: "Sumatera Utara",
      popular: true,
      couriers: [
        { code: "PAXEL", name: "Paxel Next Day", service: "Cold Chain Udara", pricePerKg: 36000, minDays: 1, maxDays: 2, note: "Direkomendasikan agar rasa tetap segar" },
        { code: "JNE-YES", name: "JNE YES", service: "Yakin Esok Sampai", pricePerKg: 42000, minDays: 1, maxDays: 2, note: "Kargo udara cepat" },
        { code: "JNE-REG", name: "JNE Reguler", service: "Reguler", pricePerKg: 28000, minDays: 3, maxDays: 4, note: "Tidak disarankan demi menjaga kesegaran" }
      ]
    },
    {
      id: "pekanbaru",
      city: "Pekanbaru",
      province: "Riau",
      popular: false,
      couriers: [
        { code: "JNE-YES", name: "JNE YES", service: "Yakin Esok Sampai", pricePerKg: 35000, minDays: 1, maxDays: 2, note: "Aman sampai tujuan" },
        { code: "JNE-REG", name: "JNE Reguler / J&T", service: "Reguler", pricePerKg: 24000, minDays: 2, maxDays: 3, note: "Disarankan tambah Thermal Foil + Ice Gel" }
      ]
    },
    {
      id: "batam",
      city: "Batam",
      province: "Kepulauan Riau",
      popular: false,
      couriers: [
        { code: "JNE-YES", name: "JNE YES", service: "Kargo Udara Prioritas", pricePerKg: 44000, minDays: 1, maxDays: 2, note: "Wajib layanan Express untuk Batam" },
        { code: "JNE-REG", name: "JNE Reguler", service: "Reguler", pricePerKg: 32000, minDays: 3, maxDays: 5, note: "Tidak disarankan untuk makanan vakum" }
      ]
    },
    {
      id: "denpasar",
      city: "Denpasar & Badung (Bali)",
      province: "Bali",
      popular: true,
      couriers: [
        { code: "PAXEL", name: "Paxel Frozen / Next Day", service: "Cold Chain Udara", pricePerKg: 42000, minDays: 1, maxDays: 2, note: "Sangat aman sampai Bali" },
        { code: "JNE-YES", name: "JNE YES", service: "Kargo Udara Express", pricePerKg: 48000, minDays: 1, maxDays: 2, note: "Cepat sampai dengan kemasan vakum" },
        { code: "JNE-REG", name: "JNE Reguler", service: "Reguler", pricePerKg: 34000, minDays: 4, maxDays: 5, note: "Tidak disarankan (>4 hari perjalanan)" }
      ]
    },
    {
      id: "makassar",
      city: "Makassar",
      province: "Sulawesi Selatan",
      popular: false,
      couriers: [
        { code: "PAXEL", name: "Paxel Next Day", service: "Cold Chain Udara", pricePerKg: 46000, minDays: 1, maxDays: 2, note: "Wajib pilih Next Day + Ice Gel" },
        { code: "JNE-YES", name: "JNE YES", service: "Express Udara", pricePerKg: 54000, minDays: 2, maxDays: 2, note: "Aman sampai Makassar" },
        { code: "JNE-REG", name: "JNE Reguler", service: "Reguler", pricePerKg: 39000, minDays: 4, maxDays: 6, note: "Tidak disarankan untuk produk pempek" }
      ]
    },
    {
      id: "balikpapan",
      city: "Balikpapan & Samarinda",
      province: "Kalimantan Timur",
      popular: false,
      couriers: [
        { code: "JNE-YES", name: "JNE YES", service: "Express Udara", pricePerKg: 52000, minDays: 2, maxDays: 2, note: "Wajib Express + Thermal Ice Gel" },
        { code: "JNE-REG", name: "JNE Reguler", service: "Reguler", pricePerKg: 38000, minDays: 4, maxDays: 6, note: "Tidak disarankan demi keamanan pangan" }
      ]
    }
  ],

  /**
   * TESTIMONI PELANGGAN
   */
  testimonials: [
    {
      name: "Dina Kartika",
      city: "Jakarta Selatan",
      channel: "Repeat Order WA",
      fish: "Ikan Gabus",
      rating: 5,
      quote:
        "Sebagai wong Palembang yang merantau di Jakarta, nemu varian Ikan Gabus yang teksturnya sehalus ini susah banget! Kirim pakai Paxel sehari sampai masih dingin, cukonya kental nendang."
    },
    {
      name: "Hendra Wijaya",
      city: "Bandung",
      channel: "Pengiriman Luar Kota",
      fish: "Ikan Tenggiri",
      rating: 5,
      quote:
        "Suka banget fitur rakit paketnya, bisa campur Kapal Selam Tenggiri sama Kulit Krispi. Pas sampai Bandung kemasan vakumnya rapi banget, digoreng luarnya garing dalamnya lembut."
    },
    {
      name: "Rina Oktaviani",
      city: "Surabaya",
      channel: "Repeat Order WA",
      fish: "Ikan Kakap",
      rating: 5,
      quote:
        "Awalnya ragu kirim Palembang ke Surabaya, tapi ikut saran kurir Next Day di website ini alhamdulillah aman 100%! Varian Kakapnya gurih pol dan hemat buat stok kulkas anak-anak."
    },
    {
      name: "Budi Santoso",
      city: "Palembang",
      channel: "Hampers Kantor",
      fish: "Mix Tenggiri & Gabus",
      rating: 5,
      quote:
        "Pesan 15 box Hampers Songket untuk tamu kantor dari Jakarta. Packing-nya berkelas, cukonya tidak pakai cuka biang jadi aman di lambung. Semua tamu langsung tanya beli di mana."
    }
  ],

  /**
   * PERTANYAAN UMUM (FAQ)
   */
  faqs: [
    {
      question: "Apa perbedaan utama pempek Ikan Tenggiri, Gabus, dan Kakap di KST Lemak Nian?",
      answer:
        "Ikan Tenggiri punya rasa gurih kuat dan aroma ikan klasik yang paling populer. Ikan Gabus bertekstur paling halus, lembut, dan gurih bersih (primadona selera Palembang asli & cocok untuk anak-anak). Ikan Kakap terasa padat, kenyal, renyah saat digoreng, dan paling ekonomis untuk stok keluarga. Ketiganya 100% memakai daging ikan segar tanpa pengawet."
    },
    {
      question: "Apakah aman dikirim dari Palembang ke luar kota / luar pulau?",
      answer:
        "Sangat aman! Pempek kami dikemas vakum kedap udara (vacuum-sealed) setelah direbus dan didinginkan higienis, lalu diberi pilihan kurir cepat seperti Paxel Cold Chain dan JNE YES (1–2 hari sampai). Di kalkulator ongkir kami, kurir dengan durasi terlalu lama otomatis diberi tanda peringatan agar kualitas rasa tetap terjaga."
    },
    {
      question: "Berapa lama daya tahan pempek di suhu ruang dan di freezer?",
      answer:
        "Dalam kemasan vakum tertutup rapat: tahan 3–4 hari di suhu ruang, hingga 7 hari di kulkas chiller, dan hingga 1–2 bulan di freezer (-18°C). Cuko botolan tahan hingga 2 minggu di chiller dan 1 bulan di freezer."
    },
    {
      question: "Apakah cukonya aman di lambung dan bisa pilih level pedas?",
      answer:
        "Ya! Cuko KST Lemak Nian dimasak dari gula aren batok asli Lubuklinggau, asam jawa, bawang putih, ebi, dan cabai rawit—0% cuka sintetis/biang sehingga lebih nyaman di lambung. Anda bisa memilih level Pedas Asli Palembang, Sedang, atau Pisah Cabe saat memesan."
    },
    {
      question: "Jam berapa batas pemesanan (cut-off) agar dikirim hari yang sama?",
      answer:
        "Pesanan yang dikonfirmasi sebelum pukul 13.00 WIB akan diproses fresh dan dikirim di hari yang sama dari dapur kami di Palembang. Pesanan setelah pukul 13.00 WIB akan masuk pengiriman esok pagi agar tidak menginap di gudang ekspedisi."
    },
    {
      question: "Bagaimana cara pembayaran dan apakah bisa pesan untuk hampers atau acara?",
      answer:
        "Setelah Anda mengirim rincian pesanan ke WhatsApp kami di +62 878-1711-0555, admin akan mengonfirmasi stok dan total ongkir terbaru, lalu pembayaran dapat dilakukan melalui transfer bank atau QRIS. Kami juga melayani pemesanan Hampers Songket Palembang, oleh-oleh kantor, arisan, dan reseller."
    }
  ]
};
