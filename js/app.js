(function () {
  "use strict";

  const DATA = window.PEMPEK_DATA;
  const STORAGE_KEY = "kst_lemak_nian_state_v1";

  // =========================================================================
  // APPLICATION STATE (WITH LOCALSTORAGE PERSISTENCE)
  // =========================================================================
  const defaultState = {
    selectedFish: "tenggiri",
    selectedCategory: "all",
    selectedCuko: "Pedas Asli Palembang",
    selectedDestinationId: "jakarta",
    selectedCourierCode: "PAXEL",
    servingMethod: "goreng",
    cart: [
      {
        key: "paket-coba__tenggiri",
        itemId: "paket-coba",
        fishId: "tenggiri",
        qty: 1
      }
    ]
  };

  const VALID_CUKO_LEVELS = ["Pedas Asli Palembang", "Sedang", "Pisah Cabe / Tidak Pedas"];
  const VALID_SERVING_METHODS = ["goreng", "kukus", "airfryer"];

  function loadPersistedState() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return { ...defaultState, cart: [...defaultState.cart] };
      const parsed = JSON.parse(raw);

      const validFish = DATA.fishTypes.some((f) => f.id === parsed.selectedFish)
        ? parsed.selectedFish
        : defaultState.selectedFish;
      const validDest = DATA.shippingDestinations.some((d) => d.id === parsed.selectedDestinationId)
        ? parsed.selectedDestinationId
        : defaultState.selectedDestinationId;
      const validCuko = VALID_CUKO_LEVELS.includes(parsed.selectedCuko)
        ? parsed.selectedCuko
        : defaultState.selectedCuko;
      const validServing = VALID_SERVING_METHODS.includes(parsed.servingMethod)
        ? parsed.servingMethod
        : defaultState.servingMethod;
      const validCart = Array.isArray(parsed.cart)
        ? parsed.cart
            .filter(
              (c) =>
                c &&
                Number.isInteger(c.qty) &&
                c.qty > 0 &&
                DATA.menuItems.some((m) => m.id === c.itemId) &&
                DATA.fishTypes.some((f) => f.id === c.fishId)
            )
            .map((c) => ({
              key: `${c.itemId}__${c.fishId}`,
              itemId: c.itemId,
              fishId: c.fishId,
              qty: Math.min(99, c.qty)
            }))
        : [...defaultState.cart];

      return {
        selectedFish: validFish,
        selectedCategory: "all",
        selectedCuko: validCuko,
        selectedDestinationId: validDest,
        selectedCourierCode: typeof parsed.selectedCourierCode === "string" ? parsed.selectedCourierCode : defaultState.selectedCourierCode,
        servingMethod: validServing,
        cart: validCart
      };
    } catch {
      return { ...defaultState, cart: [...defaultState.cart] };
    }
  }

  function saveState() {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          selectedFish: state.selectedFish,
          selectedCuko: state.selectedCuko,
          selectedDestinationId: state.selectedDestinationId,
          selectedCourierCode: state.selectedCourierCode,
          servingMethod: state.servingMethod,
          cart: state.cart
        })
      );
    } catch {
      // Ignore storage quota or private-mode errors
    }
  }

  const state = loadPersistedState();
  let lastFocusedBeforeModal = null;

  // =========================================================================
  // HELPERS
  // =========================================================================
  function formatRupiah(amount) {
    return "Rp" + Math.round(amount).toLocaleString("id-ID");
  }

  function getFishById(id) {
    return DATA.fishTypes.find((f) => f.id === id) || DATA.fishTypes[0];
  }

  function getMenuItemById(id) {
    return DATA.menuItems.find((m) => m.id === id);
  }

  function getDestinationById(id) {
    return DATA.shippingDestinations.find((d) => d.id === id) || DATA.shippingDestinations[0];
  }

  function getSafetyInfo(courier) {
    if (courier.maxDays <= 1) {
      return {
        level: "safe",
        badgeClass: "safety-badge--safe",
        label: "✓ Sangat Aman (Vakum)",
        risky: false
      };
    }
    if (courier.maxDays === 2) {
      return {
        level: "safe",
        badgeClass: "safety-badge--safe",
        label: "✓ Aman (1–2 Hari)",
        risky: false
      };
    }
    if (courier.maxDays === 3) {
      return {
        level: "warn",
        badgeClass: "safety-badge--warn",
        label: "⚠ Batas Aman (Tambah Ice Gel)",
        risky: false
      };
    }
    return {
      level: "danger",
      badgeClass: "safety-badge--danger",
      label: "✕ Tidak Disarankan (>3 Hari)",
      risky: true
    };
  }

  function computeCartMetrics() {
    let totalItems = 0;
    let foodWeightGram = 0;
    let subtotal = 0;

    state.cart.forEach((entry) => {
      const item = getMenuItemById(entry.itemId);
      if (!item) return;
      const unitPrice = item.prices[entry.fishId] ?? item.prices.tenggiri;
      totalItems += entry.qty;
      foodWeightGram += item.weightGram * entry.qty;
      subtotal += unitPrice * entry.qty;
    });

    const totalWeightGram =
      totalItems > 0 ? foodWeightGram + DATA.brand.packagingAllowanceGram : 0;
    const chargeableKg = totalWeightGram > 0 ? Math.max(1, Math.ceil(totalWeightGram / 1000)) : 1;

    return {
      totalItems,
      foodWeightGram,
      totalWeightGram,
      chargeableKg,
      subtotal
    };
  }

  function getCourierCost(courier, chargeableKg) {
    if (!courier) return 0;
    return courier.flatRate ? courier.pricePerKg : courier.pricePerKg * chargeableKg;
  }

  function showToast(message) {
    const toastEl = document.getElementById("toast");
    toastEl.textContent = message;
    toastEl.classList.add("is-visible");
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(() => {
      toastEl.classList.remove("is-visible");
    }, 2400);
  }

  // =========================================================================
  // RENDER: 3-FISH COMPARISON
  // =========================================================================
  function renderFishComparison() {
    const container = document.getElementById("fishCompareGrid");
    container.innerHTML = DATA.fishTypes
      .map((fish) => {
        const isHighlighted = fish.id === state.selectedFish;
        return `
          <article class="fish-card ${isHighlighted ? "is-highlighted" : ""}">
            <div>
              <div class="fish-card-top">
                <h3>${fish.name}</h3>
                <span class="fish-badge">${fish.badge}</span>
              </div>
              ${fish.priceHint ? `<div class="fish-price-hint">${fish.priceHint}</div>` : ""}
              <p class="fish-card-tagline">${fish.tagline}</p>

              <div class="fish-metrics">
                ${renderMetricRow("Kelembutan", fish.metrics.kelembutan, fish.accentColor)}
                ${renderMetricRow("Kekenyalan", fish.metrics.kekenyalan, fish.accentColor)}
                ${renderMetricRow("Aroma Ikan", fish.metrics.aromaIkan, fish.accentColor)}
              </div>
            </div>

            <div>
              <div class="fish-best-for">
                <strong>Cocok:</strong> ${fish.bestFor}
              </div>
              <button
                type="button"
                class="btn ${isHighlighted ? "btn--primary" : "btn--secondary"} btn--full"
                data-pick-fish="${fish.id}"
              >
                Pilih ${fish.name} →
              </button>
            </div>
          </article>
        `;
      })
      .join("");

    container.querySelectorAll("[data-pick-fish]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.selectedFish = btn.dataset.pickFish;
        renderFishComparison();
        renderFishSwitcher();
        renderMenuGrid();
        saveState();
        document.getElementById("rakit-paket").scrollIntoView({ behavior: "smooth" });
        showToast(`Varian ${getFishById(state.selectedFish).name} dipilih!`);
      });
    });
  }

  function renderMetricRow(label, value, color) {
    return `
      <div class="metric-row">
        <span class="metric-label">${label}</span>
        <div class="metric-track">
          <div class="metric-fill" style="width: ${value}%; background: ${color}"></div>
        </div>
        <span class="metric-val">${value}</span>
      </div>
    `;
  }

  // =========================================================================
  // RENDER: BOX BUILDER CONTROLS & MENU GRID
  // =========================================================================
  function renderFishSwitcher() {
    const switcher = document.getElementById("fishSwitcher");
    switcher.innerHTML = DATA.fishTypes
      .map((fish) => {
        const active = fish.id === state.selectedFish;
        const shortName = fish.name.replace(/^Ikan\s+/i, "");
        return `
          <button
            type="button"
            class="fish-switch-btn ${active ? "is-active" : ""}"
            role="tab"
            aria-selected="${active}"
            data-fish-switch="${fish.id}"
          >
            <strong class="fish-switch-full">${fish.name}</strong>
            <strong class="fish-switch-short">${shortName}</strong>
            <span class="fish-switch-sub-full">${fish.priceTierLabel} • ${fish.badge}</span>
            <span class="fish-switch-sub-short">${fish.priceTierLabel.replace("Kelas ", "")}</span>
          </button>
        `;
      })
      .join("");

    switcher.querySelectorAll("[data-fish-switch]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.selectedFish = btn.dataset.fishSwitch;
        renderFishComparison();
        renderFishSwitcher();
        renderMenuGrid();
        saveState();
      });
    });
  }

  function renderMenuGrid() {
    const grid = document.getElementById("menuGrid");
    const activeFish = getFishById(state.selectedFish);

    const filtered = DATA.menuItems.filter((item) => {
      if (state.selectedCategory === "all") return true;
      return item.category === state.selectedCategory;
    });

    grid.innerHTML = filtered
      .map((item) => {
        const fishKey = item.fixedFish ? "tenggiri" : state.selectedFish;
        const cartKey = `${item.id}__${fishKey}`;
        const existing = state.cart.find((c) => c.key === cartKey);
        const qty = existing ? existing.qty : 0;
        const price = item.prices[fishKey];
        const fishNote = item.fixedFish ? item.fixedLabel : activeFish.name;

        const hasImage = Boolean(item.image);

        return `
          <article class="menu-card ${hasImage ? "menu-card--with-media" : ""} ${qty > 0 ? "in-cart" : ""}">
            ${
              hasImage
                ? `
                  <div class="menu-card-media">
                    <img
                      src="${item.image}"
                      alt="${item.imageAlt || item.name}"
                      width="800"
                      height="500"
                      loading="lazy"
                      decoding="async"
                    />
                    ${item.badge ? `<span class="menu-media-badge">${item.badge}</span>` : ""}
                  </div>
                `
                : ""
            }
            <div class="menu-card-body">
              <div>
                <div class="menu-card-meta">
                  ${!hasImage && item.badge ? `<span class="menu-tag">${item.badge}</span>` : ""}
                  <span class="menu-weight">±${item.weightGram} gr • ${item.servings}</span>
                </div>
                <h4>${item.name}</h4>
                <p>${item.shortDesc}</p>
              </div>

              <div class="menu-card-footer">
                <div class="menu-price-block">
                  <span class="menu-price">${formatRupiah(price)}</span>
                  <span class="menu-fish-note">${fishNote}</span>
                </div>

                <div class="menu-card-actions">
                  ${
                    qty === 0
                      ? `
                        <button type="button" class="btn btn--secondary btn--sm" data-add-item="${item.id}" data-fish="${fishKey}">+1</button>
                        ${
                          item.quickBulk
                            ? `<button type="button" class="btn btn--primary btn--sm" data-bulk-item="${item.id}" data-fish="${fishKey}" data-bulk-qty="${item.quickBulk}">+${item.quickBulk}</button>`
                            : ""
                        }
                      `
                      : `
                        <div class="qty-stepper">
                          <button type="button" class="qty-btn" data-dec-key="${cartKey}" aria-label="Kurangi">−</button>
                          <span class="qty-value">${qty}</span>
                          <button type="button" class="qty-btn" data-inc-key="${cartKey}" aria-label="Tambah 1">+</button>
                        </div>
                        ${
                          item.quickBulk
                            ? `<button type="button" class="quick-bulk-pill" data-bulk-item="${item.id}" data-fish="${fishKey}" data-bulk-qty="${item.quickBulk}" title="Tambah ${item.quickBulk} pcs sekaligus">+${item.quickBulk}</button>`
                            : ""
                        }
                      `
                  }
                </div>
              </div>
            </div>
          </article>
        `;
      })
      .join("");

    grid.querySelectorAll("[data-add-item]").forEach((btn) => {
      btn.addEventListener("click", () => {
        updateCartItem(btn.dataset.addItem, btn.dataset.fish, 1);
      });
    });

    grid.querySelectorAll("[data-bulk-item]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const bulkQty = Number(btn.dataset.bulkQty) || 5;
        updateCartItem(btn.dataset.bulkItem, btn.dataset.fish, bulkQty);
      });
    });

    grid.querySelectorAll("[data-inc-key]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const [itemId, fishId] = btn.dataset.incKey.split("__");
        updateCartItem(itemId, fishId, 1);
      });
    });

    grid.querySelectorAll("[data-dec-key]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const [itemId, fishId] = btn.dataset.decKey.split("__");
        updateCartItem(itemId, fishId, -1);
      });
    });
  }

  function updateCartItem(itemId, fishId, delta) {
    const key = `${itemId}__${fishId}`;
    const idx = state.cart.findIndex((c) => c.key === key);

    if (idx === -1 && delta > 0) {
      const safeQty = Math.min(99, delta);
      state.cart.push({ key, itemId, fishId, qty: safeQty });
      const item = getMenuItemById(itemId);
      showToast(`+${safeQty} ${item.name} masuk ke box`);
    } else if (idx !== -1) {
      state.cart[idx].qty = Math.min(99, state.cart[idx].qty + delta);
      if (state.cart[idx].qty <= 0) {
        state.cart.splice(idx, 1);
      } else if (delta > 1) {
        const item = getMenuItemById(itemId);
        showToast(`+${delta} ${item.name} ditambahkan`);
      }
    }

    renderMenuGrid();
    renderOrderPanel();
    saveState();
  }

  // =========================================================================
  // RENDER: ORDER PANEL & SMART ONGKIR ESTIMATOR
  // =========================================================================
  function renderDestinations() {
    const select = document.getElementById("destinationSelect");
    select.innerHTML = DATA.shippingDestinations
      .map(
        (d) =>
          `<option value="${d.id}" ${d.id === state.selectedDestinationId ? "selected" : ""}>${d.city} — ${d.province}</option>`
      )
      .join("");

    const quickWrap = document.getElementById("quickCities");
    quickWrap.innerHTML = DATA.shippingDestinations
      .filter((d) => d.popular)
      .map(
        (d) => `
          <button
            type="button"
            class="quick-city-btn ${d.id === state.selectedDestinationId ? "is-active" : ""}"
            data-quick-city="${d.id}"
          >
            ${d.city.split(" ")[0].replace(",", "")}
          </button>
        `
      )
      .join("");

    quickWrap.querySelectorAll("[data-quick-city]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.selectedDestinationId = btn.dataset.quickCity;
        const dest = getDestinationById(state.selectedDestinationId);
        state.selectedCourierCode = dest.couriers[0].code;
        renderDestinations();
        renderOrderPanel();
        saveState();
      });
    });
  }

  function renderOrderPanel() {
    const metrics = computeCartMetrics();
    const dest = getDestinationById(state.selectedDestinationId);

    // Ensure selected courier exists on current destination
    let selectedCourier = dest.couriers.find((c) => c.code === state.selectedCourierCode);
    if (!selectedCourier) {
      selectedCourier = dest.couriers[0];
      state.selectedCourierCode = selectedCourier.code;
    }

    // Header & Mobile Bar Badges
    document.getElementById("headerCartCount").textContent = metrics.totalItems;

    // Weight Optimizer Bar
    const weightSummaryEl = document.getElementById("weightSummaryText");
    const weightFillEl = document.getElementById("weightMeterFill");
    const weightTipEl = document.getElementById("weightTipText");

    if (metrics.totalItems === 0) {
      weightSummaryEl.textContent = "0 gr (Estimasi 1 kg)";
      weightFillEl.style.width = "0%";
      weightTipEl.textContent =
        "Tambahkan pempek untuk melihat total harga, atau langsung cek estimasi ongkir 1 kg di bawah.";
    } else {
      const capGram = metrics.chargeableKg * 1000;
      const remainingGram = Math.max(0, capGram - metrics.totalWeightGram);
      const fillPercent = Math.min(100, Math.round((metrics.totalWeightGram / capGram) * 100));

      weightSummaryEl.textContent = `${metrics.totalWeightGram.toLocaleString("id-ID")} gr (${metrics.chargeableKg} kg)`;
      weightFillEl.style.width = `${fillPercent}%`;

      if (remainingGram >= 180) {
        weightTipEl.innerHTML = `💡 Sisa kapasitas <strong>±${remainingGram} gr</strong> lagi masih masuk ongkir <strong>${metrics.chargeableKg} kg</strong>! Bisa tambah 1 porsi satuan / Extra Cuko.`;
      } else {
        weightTipEl.innerHTML = `✓ Kapasitas ongkir <strong>${metrics.chargeableKg} kg</strong> terpakai optimal (sudah termasuk kemasan vakum &amp; dus).`;
      }
    }

    // Cart Items List
    const cartListEl = document.getElementById("cartItemsList");
    if (state.cart.length === 0) {
      cartListEl.innerHTML = `
        <div class="cart-empty">
          Box masih kosong. Klik <strong>+ Tambah</strong> pada paket atau pempek satuan di sebelah kiri.
        </div>
      `;
    } else {
      cartListEl.innerHTML = state.cart
        .map((entry) => {
          const item = getMenuItemById(entry.itemId);
          const fish = getFishById(entry.fishId);
          const price = item.prices[entry.fishId] * entry.qty;
          const variantLabel = item.fixedFish ? item.fixedLabel : fish.name;

          return `
            <div class="cart-line">
              <div>
                <span class="cart-line-title">${item.name} × ${entry.qty}</span>
                <span class="cart-line-sub">${variantLabel} • ±${item.weightGram * entry.qty} gr</span>
              </div>
              <div class="cart-line-right">
                <strong>${formatRupiah(price)}</strong>
                <button type="button" class="cart-remove-btn" data-remove-key="${entry.key}" title="Hapus item">✕</button>
              </div>
            </div>
          `;
        })
        .join("");

      cartListEl.querySelectorAll("[data-remove-key]").forEach((btn) => {
        btn.addEventListener("click", () => {
          state.cart = state.cart.filter((c) => c.key !== btn.dataset.removeKey);
          renderMenuGrid();
          renderOrderPanel();
          saveState();
        });
      });
    }

    // Courier List
    const courierListEl = document.getElementById("courierList");
    courierListEl.innerHTML = dest.couriers
      .map((courier) => {
        const isSelected = courier.code === selectedCourier.code;
        const cost = getCourierCost(courier, metrics.chargeableKg);
        const safety = getSafetyInfo(courier);
        const etaText =
          courier.maxDays === 0
            ? "Estimasi hari yang sama"
            : courier.minDays === courier.maxDays
            ? `Estimasi ${courier.maxDays} hari`
            : `Estimasi ${courier.minDays}–${courier.maxDays} hari`;

        return `
          <button
            type="button"
            class="courier-option ${isSelected ? "is-selected" : ""} ${safety.risky ? "is-risky" : ""}"
            data-courier-code="${courier.code}"
          >
            <div class="courier-top">
              <span class="courier-name">${courier.name}</span>
              <span class="courier-price">${formatRupiah(cost)}</span>
            </div>
            <div class="courier-meta">
              <span>${courier.service} • ${etaText}</span>
              <span class="safety-badge ${safety.badgeClass}">${safety.label}</span>
            </div>
            <div style="font-size: 0.72rem; color: var(--ink-muted); margin-top: 4px">${courier.note}</div>
          </button>
        `;
      })
      .join("");

    courierListEl.querySelectorAll("[data-courier-code]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.selectedCourierCode = btn.dataset.courierCode;
        renderOrderPanel();
        saveState();
      });
    });

    // Totals
    const shippingCost = getCourierCost(selectedCourier, metrics.chargeableKg);
    const grandTotal = metrics.subtotal + shippingCost;

    document.getElementById("subtotalText").textContent = formatRupiah(metrics.subtotal);
    document.getElementById("shippingLabelText").textContent = selectedCourier.flatRate
      ? `Estimasi Ongkir (${selectedCourier.name})`
      : `Estimasi Ongkir (${metrics.chargeableKg} kg • ${selectedCourier.name})`;
    document.getElementById("shippingCostText").textContent = formatRupiah(shippingCost);
    document.getElementById("grandTotalText").textContent = formatRupiah(grandTotal);

    // Mobile Sticky Bar
    const mobileBar = document.getElementById("mobileStickyBar");
    if (metrics.totalItems > 0) {
      mobileBar.classList.add("has-items");
      document.body.classList.add("has-sticky-bar");
      document.getElementById("mobileBarSummary").textContent =
        `${metrics.totalItems} item • ${formatRupiah(grandTotal)}`;
      document.getElementById("mobileBarSub").textContent =
        `Termasuk est. ongkir ke ${dest.city.split(" ")[0].replace(",", "")}`;
    } else {
      mobileBar.classList.remove("has-items");
      document.body.classList.remove("has-sticky-bar");
    }
  }

  // =========================================================================
  // WHATSAPP MESSAGE BUILDER & MODAL
  // =========================================================================
  function buildWhatsAppMessage() {
    const metrics = computeCartMetrics();
    const dest = getDestinationById(state.selectedDestinationId);
    const courier = dest.couriers.find((c) => c.code === state.selectedCourierCode) || dest.couriers[0];
    const shippingCost = getCourierCost(courier, metrics.chargeableKg);
    const grandTotal = metrics.subtotal + shippingCost;

    const customerName = (document.getElementById("customerNameInput").value || "").trim();
    const customerNote = (document.getElementById("customerNoteInput").value || "").trim();

    const lines = [
      `Halo *${DATA.brand.name}* (Palembang), saya ingin memesan pempek:`,
      ""
    ];

    if (customerName) {
      lines.push(`*Nama:* ${customerName}`);
    }

    if (state.cart.length === 0) {
      lines.push("Saya ingin konsultasi paket & menu Pempek Tenggiri / Gabus / Kakap.");
    } else {
      lines.push("*Daftar Pesanan:*");
      state.cart.forEach((entry, idx) => {
        const item = getMenuItemById(entry.itemId);
        const fish = getFishById(entry.fishId);
        const variant = item.fixedFish ? item.fixedLabel : fish.name;
        const linePrice = item.prices[entry.fishId] * entry.qty;
        lines.push(`${idx + 1}. ${item.name} (${variant}) × ${entry.qty} = ${formatRupiah(linePrice)}`);
      });
      lines.push("");
      lines.push(`*Level Cuko:* ${state.selectedCuko}`);
      lines.push(`*Estimasi Berat:* ${metrics.totalWeightGram.toLocaleString("id-ID")} gr (${metrics.chargeableKg} kg)`);
    }

    lines.push(`*Kota Tujuan:* ${dest.city}, ${dest.province}`);
    lines.push(`*Pilihan Kurir:* ${courier.name} (${courier.service})`);

    if (state.cart.length > 0) {
      lines.push("");
      lines.push(`Subtotal Produk: ${formatRupiah(metrics.subtotal)}`);
      lines.push(`Estimasi Ongkir: ${formatRupiah(shippingCost)}`);
      lines.push(`*Estimasi Total: ${formatRupiah(grandTotal)}*`);
    }

    if (customerNote) {
      lines.push("");
      lines.push(`*Catatan / Alamat:* ${customerNote}`);
    }

    lines.push("");
    lines.push("Mohon konfirmasi ketersediaan & total akhirnya ya. Terima kasih!");

    return lines.join("\n");
  }

  function refreshWaModal() {
    const msg = buildWhatsAppMessage();
    document.getElementById("waPreviewBox").textContent = msg;
    const url = `https://wa.me/${DATA.brand.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    document.getElementById("confirmSendWaBtn").href = url;
  }

  function openWaModal() {
    lastFocusedBeforeModal = document.activeElement;
    refreshWaModal();
    document.getElementById("waModal").classList.add("is-open");
    document.body.classList.add("modal-open");
    document.getElementById("closeWaModalBtn").focus();
  }

  function closeWaModal() {
    document.getElementById("waModal").classList.remove("is-open");
    document.body.classList.remove("modal-open");
    if (lastFocusedBeforeModal && typeof lastFocusedBeforeModal.focus === "function") {
      lastFocusedBeforeModal.focus();
    }
  }

  // =========================================================================
  // RENDER: SERVING GUIDE, TESTIMONIALS & FAQ
  // =========================================================================
  const SERVING_METHODS = {
    goreng: [
      "Diamkan pempek di suhu ruang ±20 menit hingga tidak beku.",
      "Goreng dengan minyak panas api sedang 3–5 menit sampai kuning keemasan.",
      "Potong, tambahkan timun segar, lalu siram Cuko KST Lemak Nian."
    ],
    kukus: [
      "Keluarkan pempek dari kemasan vakum hingga suhu ruang.",
      "Kukus 8–10 menit hingga empuk, kenyal, dan hangat merata.",
      "Sajikan selagi hangat dengan siraman cuko kental."
    ],
    airfryer: [
      "Diamkan pempek di suhu ruang, oles tipis minyak goreng.",
      "Panggang suhu 180°C selama 8–10 menit (balik di menit ke-5).",
      "Angkat saat luar garing ringan dan nikmati dengan cuko."
    ]
  };

  function renderServingSteps() {
    const list = document.getElementById("servingSteps");
    const steps = SERVING_METHODS[state.servingMethod] || SERVING_METHODS.goreng;
    list.innerHTML = steps
      .map(
        (step, index) => `
          <li>
            <span class="step-num">${index + 1}</span>
            <span>${step}</span>
          </li>
        `
      )
      .join("");
  }

  function renderTestimonials() {
    const grid = document.getElementById("testimonialsGrid");
    grid.innerHTML = DATA.testimonials
      .map(
        (t) => `
          <article class="testimonial-card">
            <div>
              <div class="testimonial-stars" aria-label="Rating ${t.rating} dari 5">★★★★★</div>
              <p class="testimonial-quote">"${t.quote}"</p>
            </div>
            <div class="testimonial-author">
              <div>
                <strong>${t.name}</strong>
                <span>${t.city} • ${t.channel}</span>
              </div>
              <span class="testimonial-fish-pill">${t.fish}</span>
            </div>
          </article>
        `
      )
      .join("");
  }

  function renderFaq() {
    const list = document.getElementById("faqList");
    list.innerHTML = DATA.faqs
      .map(
        (item, index) => `
          <div class="faq-item ${index === 0 ? "is-open" : ""}">
            <button type="button" class="faq-trigger" aria-expanded="${index === 0}">
              <span>${item.question}</span>
              <span class="faq-icon" aria-hidden="true">+</span>
            </button>
            <div class="faq-panel">${item.answer}</div>
          </div>
        `
      )
      .join("");

    list.querySelectorAll(".faq-trigger").forEach((btn) => {
      btn.addEventListener("click", () => {
        const parent = btn.closest(".faq-item");
        const willOpen = !parent.classList.contains("is-open");
        list.querySelectorAll(".faq-item").forEach((el) => {
          el.classList.remove("is-open");
          el.querySelector(".faq-trigger").setAttribute("aria-expanded", "false");
        });
        if (willOpen) {
          parent.classList.add("is-open");
          btn.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  // =========================================================================
  // BIND EVENTS & INIT
  // =========================================================================
  function bindEvents() {
    // Category filter tabs
    document.querySelectorAll("#categoryTabs .cat-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        document.querySelectorAll("#categoryTabs .cat-tab").forEach((t) => t.classList.remove("is-active"));
        tab.classList.add("is-active");
        state.selectedCategory = tab.dataset.category;
        renderMenuGrid();
      });
    });

    // Cuko spice level chips (sync active with persisted state)
    document.querySelectorAll("#cukoLevelGrid .cuko-chip").forEach((chip) => {
      chip.classList.toggle("is-active", chip.dataset.cuko === state.selectedCuko);
      chip.addEventListener("click", () => {
        document.querySelectorAll("#cukoLevelGrid .cuko-chip").forEach((c) => c.classList.remove("is-active"));
        chip.classList.add("is-active");
        state.selectedCuko = chip.dataset.cuko;
        saveState();
      });
    });

    // Destination select change
    document.getElementById("destinationSelect").addEventListener("change", (e) => {
      state.selectedDestinationId = e.target.value;
      const dest = getDestinationById(state.selectedDestinationId);
      state.selectedCourierCode = dest.couriers[0].code;
      renderDestinations();
      renderOrderPanel();
      saveState();
    });

    // Clear cart
    document.getElementById("clearCartBtn").addEventListener("click", () => {
      state.cart = [];
      renderMenuGrid();
      renderOrderPanel();
      saveState();
      showToast("Isi box dikosongkan");
    });

    // Serving guide tabs (sync active with persisted state)
    document.querySelectorAll("#servingTabs .serving-tab").forEach((tab) => {
      tab.classList.toggle("is-active", tab.dataset.method === state.servingMethod);
      tab.addEventListener("click", () => {
        document.querySelectorAll("#servingTabs .serving-tab").forEach((t) => t.classList.remove("is-active"));
        tab.classList.add("is-active");
        state.servingMethod = tab.dataset.method;
        renderServingSteps();
        saveState();
      });
    });

    // Header cart scroll & mobile sticky bar
    document.getElementById("headerCartBtn").addEventListener("click", () => {
      document.getElementById("orderPanel").scrollIntoView({ behavior: "smooth" });
    });

    document.getElementById("mobileBarActionBtn").addEventListener("click", () => {
      document.getElementById("orderPanel").scrollIntoView({ behavior: "smooth" });
    });

    // Mobile drawer with ARIA state
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const mobileDrawer = document.getElementById("mobileDrawer");
    const setDrawerOpen = (isOpen) => {
      mobileDrawer.classList.toggle("is-open", isOpen);
      mobileMenuBtn.setAttribute("aria-expanded", String(isOpen));
    };
    mobileMenuBtn.addEventListener("click", () => {
      setDrawerOpen(!mobileDrawer.classList.contains("is-open"));
    });
    mobileDrawer.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setDrawerOpen(false));
    });

    // Escape key closes modal and mobile drawer
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (document.getElementById("waModal").classList.contains("is-open")) {
          closeWaModal();
        }
        if (mobileDrawer.classList.contains("is-open")) {
          setDrawerOpen(false);
        }
      }
    });

    // WhatsApp modal open/close & live inputs
    document.getElementById("openWaModalBtn").addEventListener("click", openWaModal);
    document.getElementById("closeWaModalBtn").addEventListener("click", closeWaModal);
    document.getElementById("waModal").addEventListener("click", (e) => {
      if (e.target.id === "waModal") closeWaModal();
    });
    document.getElementById("customerNameInput").addEventListener("input", refreshWaModal);
    document.getElementById("customerNoteInput").addEventListener("input", refreshWaModal);

    document.getElementById("copyWaTextBtn").addEventListener("click", async () => {
      const text = buildWhatsAppMessage();
      try {
        await navigator.clipboard.writeText(text);
        showToast("Format pesanan disalin ke clipboard!");
      } catch {
        showToast("Silakan salin teks dari kotak pratinjau.");
      }
    });

    // Direct WA links for Hero, Banner, FAQ, Footer & Floating Button
    const quickConsultUrl = (msg) =>
      `https://wa.me/${DATA.brand.whatsappNumber}?text=${encodeURIComponent(msg)}`;

    document.getElementById("heroQuickWaBtn").addEventListener("click", () => {
      window.open(
        quickConsultUrl(
          `Halo ${DATA.brand.name}, saya tertarik memesan Pempek Asli Palembang (Tenggiri/Gabus/Kakap). Boleh dibantu rekomendasinya?`
        ),
        "_blank",
        "noopener,noreferrer"
      );
    });

    document.getElementById("bannerWaConsultBtn").addEventListener("click", () => {
      window.open(
        quickConsultUrl(
          `Halo ${DATA.brand.name}, saya ingin tanya paket Hampers Songket / pemesanan jumlah banyak (reseller).`
        ),
        "_blank",
        "noopener,noreferrer"
      );
    });

    document.getElementById("faqWaBtn").addEventListener("click", () => {
      window.open(
        quickConsultUrl(`Halo ${DATA.brand.name}, saya ada pertanyaan sebelum memesan pempek.`),
        "_blank",
        "noopener,noreferrer"
      );
    });

    const defaultWaHref = quickConsultUrl(
      `Halo ${DATA.brand.name}, saya ingin memesan Pempek Asli Palembang.`
    );
    const footerWaLink = document.getElementById("footerWaLink");
    if (footerWaLink) {
      footerWaLink.href = defaultWaHref;
      footerWaLink.textContent = `WhatsApp Admin (${DATA.brand.whatsappDisplay})`;
    }

    const panelWaNumber = document.getElementById("panelWaNumber");
    if (panelWaNumber) {
      panelWaNumber.textContent = DATA.brand.whatsappDisplay;
    }

    const footerMapsLink = document.getElementById("footerMapsLink");
    if (footerMapsLink && DATA.brand.mapsUrl) {
      footerMapsLink.href = DATA.brand.mapsUrl;
    }

    const footerHampersLink = document.getElementById("footerHampersLink");
    if (footerHampersLink) {
      footerHampersLink.href = quickConsultUrl(
        `Halo ${DATA.brand.name}, saya ingin pesan paket Hampers / pesanan acara dari Palembang.`
      );
    }

    const floatingWaBtn = document.getElementById("floatingWaBtn");
    if (floatingWaBtn) {
      floatingWaBtn.href = defaultWaHref;
    }

    // Hydrate footer metadata & current year
    const footerAddressEl = document.getElementById("footerAddress");
    if (footerAddressEl) footerAddressEl.textContent = `📍 ${DATA.brand.kitchenAddress}`;
    const footerHoursEl = document.getElementById("footerHours");
    if (footerHoursEl) footerHoursEl.textContent = `🕒 ${DATA.brand.operationalHours}`;
    const yearEl = document.getElementById("currentYear");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  }

  function init() {
    renderFishComparison();
    renderFishSwitcher();
    renderMenuGrid();
    renderDestinations();
    renderOrderPanel();
    renderServingSteps();
    renderTestimonials();
    renderFaq();
    bindEvents();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
