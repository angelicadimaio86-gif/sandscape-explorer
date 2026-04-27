/* ============================================
   MUSEO DIGITALE DELLE SABBIE DEL MONDO
   Detail Page Script
   ============================================ */

const SAND_COLOR_MAP_D = {
  cava: "#2E8B57",
  desertica: "#EDC9AF",
  eolicadesertica: "#F4A460",
  fluviale: "#708090",
  lacustre: "#ADD8E6",
  lagunare: "#20B2AA",
  marina: "#0077BE",
  marinafluviale: "#5F9EA0",
  marinavulcanica: "#483D8B",
  montagna: "#8B4513",
  nonspecificata: "#D3D3D3",
  torrentizia: "#4682B4",
  vulcanica: "#333333",
};

/* ============================================
   PALETTE EDITORIALE — BOX METADATA
   Ogni voce: { bg, border, text }
   ============================================ */

/* Tipologie */
const TIPOLOGIA_PALETTE = {
  desertica:        { bg: "#F6D2A5", border: "#E89A4A", text: "#4C2B14" },
  eolicadesertica:  { bg: "#F6D2A5", border: "#E89A4A", text: "#4C2B14" },
  marina:           { bg: "#D9ECF7", border: "#4A90B8", text: "#16384D" },
  marinafluviale:   { bg: "#D6E6E8", border: "#5D95A4", text: "#1E3D47" },
  marinavulcanica:  { bg: "#D8D2E0", border: "#7A6E97", text: "#2C2540" },
  fluviale:         { bg: "#DCEBDD", border: "#7BA27D", text: "#2D4B33" },
  torrentizia:      { bg: "#DCEBDD", border: "#7BA27D", text: "#2D4B33" },
  lacustre:         { bg: "#DDF2F0", border: "#6EA7A2", text: "#274542" },
  lagunare:         { bg: "#DDF2F0", border: "#6EA7A2", text: "#274542" },
  vulcanica:        { bg: "#E8C8BF", border: "#A85C4A", text: "#4C241B" },
  corallina:        { bg: "#F2D9D5", border: "#C78882", text: "#5C312F" },
  organogena:       { bg: "#F2D9D5", border: "#C78882", text: "#5C312F" },
  glaciale:         { bg: "#E3EFF8", border: "#8AB1D6", text: "#2B4661" },
  montagna:         { bg: "#E3D6C6", border: "#9C7B5A", text: "#4A331E" },
  cava:             { bg: "#E1E5D6", border: "#8E9C72", text: "#3A4127" },
  nonspecificata:   { bg: "#F4EDE2", border: "#CBB79E", text: "#4C4035" },
};

/* Continenti */
const CONTINENTE_PALETTE = {
  "nord america":     { bg: "#F4DDD2", border: "#C77956", text: "#5A2D1D" },
  "centro america":   { bg: "#E4E8C9", border: "#A5A85C", text: "#44491E" },
  "sud america":      { bg: "#DCE8D8", border: "#7D9B71", text: "#31412D" },
  "europa":           { bg: "#E2E7EF", border: "#8496B0", text: "#364252" },
  "africa":           { bg: "#F1E0B8", border: "#C89A3A", text: "#5B4514" },
  "asia":             { bg: "#EBCFCA", border: "#B86D62", text: "#522723" },
  "oceania":          { bg: "#DCEEF2", border: "#73AAB4", text: "#28474D" },
  "non specificato":  { bg: "#EFEAE2", border: "#B8AA99", text: "#51483F" },
};

/* Paesi — palette desaturata ispirata alle bandiere */
const PAESE_PALETTE = {
  "italia":           { bg: "#DCE8D5", border: "#8AA67C", text: "#33492C" },
  "italy":            { bg: "#DCE8D5", border: "#8AA67C", text: "#33492C" },
  "francia":          { bg: "#DCE2EC", border: "#8295B3", text: "#2E3C52" },
  "france":           { bg: "#DCE2EC", border: "#8295B3", text: "#2E3C52" },
  "germania":         { bg: "#E8DCC4", border: "#B8995A", text: "#4A3A1E" },
  "spagna":           { bg: "#F4D9B8", border: "#D49856", text: "#5A3818" },
  "portogallo":       { bg: "#DCE6D2", border: "#8AA572", text: "#33422A" },
  "regno unito":      { bg: "#DDE2EC", border: "#8C9DB8", text: "#2F3E55" },
  "uk":               { bg: "#DDE2EC", border: "#8C9DB8", text: "#2F3E55" },
  "stati uniti":      { bg: "#E5E4EA", border: "#8E91A8", text: "#2E3548" },
  "usa":              { bg: "#E5E4EA", border: "#8E91A8", text: "#2E3548" },
  "canada":           { bg: "#F1D9D5", border: "#C57F77", text: "#5A2A24" },
  "messico":          { bg: "#DCE8D2", border: "#8AA572", text: "#33442A" },
  "brasile":          { bg: "#DDE7C9", border: "#8FA45C", text: "#3A4720" },
  "argentina":        { bg: "#DCE6F0", border: "#88A2C1", text: "#2C3E55" },
  "cile":             { bg: "#E2E2EA", border: "#8E96AC", text: "#2F3848" },
  "perù":             { bg: "#EFD6D2", border: "#C47D75", text: "#552924" },
  "peru":             { bg: "#EFD6D2", border: "#C47D75", text: "#552924" },
  "marocco":          { bg: "#E6CFC4", border: "#B27358", text: "#4D2719" },
  "egitto":           { bg: "#EFE0BC", border: "#C29E48", text: "#564018" },
  "sud africa":       { bg: "#DDE6D2", border: "#8AA572", text: "#33442A" },
  "sudafrica":        { bg: "#DDE6D2", border: "#8AA572", text: "#33442A" },
  "tunisia":          { bg: "#EBD0CB", border: "#B96E62", text: "#522622" },
  "kenya":            { bg: "#DDE5D0", border: "#85A06A", text: "#2E3F22" },
  "namibia":          { bg: "#E6D8C2", border: "#B59760", text: "#4D3A18" },
  "giappone":         { bg: "#F2D8D5", border: "#C57F77", text: "#5A2A24" },
  "japan":            { bg: "#F2D8D5", border: "#C57F77", text: "#5A2A24" },
  "cina":             { bg: "#F0D2C5", border: "#C97A55", text: "#582918" },
  "india":            { bg: "#F1DCBA", border: "#C8983E", text: "#5A4014" },
  "thailandia":       { bg: "#E6D8E0", border: "#A07CA0", text: "#3F2A40" },
  "indonesia":        { bg: "#F1D8D5", border: "#C57F77", text: "#5A2A24" },
  "australia":        { bg: "#DDE3EE", border: "#8295B3", text: "#2E3C52" },
  "nuova zelanda":    { bg: "#DDE3EE", border: "#8295B3", text: "#2E3C52" },
  "bahamas":          { bg: "#DCEBF0", border: "#7AA8B6", text: "#274750" },
  "cuba":             { bg: "#DDE3EE", border: "#8295B3", text: "#2E3C52" },
  "non specificato":  { bg: "#EEE3D3", border: "#BFA07B", text: "#4A3A2B" },
};

const PAESE_FALLBACK = { bg: "#EEE3D3", border: "#BFA07B", text: "#4A3A2B" };

/* Palette fisse per campi non categorici */
const FIELD_PALETTE = {
  campione:    { bg: "#F1E4C9", border: "#C7A25A", text: "#5A431B" },
  nome:        { bg: "#EFE3D6", border: "#B98F68", text: "#3F2A1E" },
  provenienza: { bg: "#F3E8D8", border: "#C9A982", text: "#5A4330" },
  provincia:   { bg: "#F3E8D8", border: "#C9A982", text: "#5A4330" },
  isola:       { bg: "#E8EFE3", border: "#9CB28A", text: "#3A4A2D" },
  regione:     { bg: "#F3E8D8", border: "#C9A982", text: "#5A4330" },
  bacino:      { bg: "#DCEAF4", border: "#6A97B8", text: "#23425A" },
  anno:        { bg: "#E9E2D8", border: "#A99682", text: "#4C4035" },
  fallback:    { bg: "#F4EDE2", border: "#CBB79E", text: "#4C4035" },
};

function normalizeKey(s) {
  return (s || "").toString().toLowerCase().trim()
    .replace(/\s*[-\/]\s*/g, " ")
    .replace(/\s+/g, " ");
}

function getTipologiaPalette(name) {
  var k = normalizeSandTypeD(name);
  return TIPOLOGIA_PALETTE[k] || FIELD_PALETTE.fallback;
}

function getContinentePalette(name) {
  var k = normalizeKey(name);
  return CONTINENTE_PALETTE[k] || CONTINENTE_PALETTE["non specificato"];
}

function getPaesePalette(name) {
  var k = normalizeKey(name);
  return PAESE_PALETTE[k] || PAESE_FALLBACK;
}

function normalizeSandTypeD(name) {
  if (!name) return "";
  var cleaned = name.toLowerCase().trim()
    .replace(/\s*[-\/]\s*/g, "-")
    .replace(/\s+/g, " ");
  var aliases = {
    "montana": "montagna",
    "eolica-desertica": "eolicadesertica",
    "eolica desertica": "eolicadesertica",
    "marina-fluviale": "marinafluviale",
    "marina-vulcanica": "marinavulcanica",
    "non specificata": "nonspecificata",
  };
  if (aliases[cleaned]) return aliases[cleaned];
  return cleaned.replace(/[-\/ ]/g, "");
}

function getSandColorD(name) {
  return SAND_COLOR_MAP_D[normalizeSandTypeD(name)] || "#D3D3D3";
}

function getContrastTextColorD(hex) {
  var c = hex.replace("#", "");
  var r = parseInt(c.substring(0, 2), 16);
  var g = parseInt(c.substring(2, 4), 16);
  var b = parseInt(c.substring(4, 6), 16);
  var toLinear = function(v) {
    var s = v / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  var L = 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
  return 1.05 / (L + 0.05) >= (L + 0.05) / 0.05 ? "#FFFFFF" : "#111111";
}

/* --- Mobile Menu --- */
function initMobileMenuDetail() {
  var toggle = document.getElementById('menu-toggle');
  var overlay = document.getElementById('mobile-nav-overlay');
  var nav = document.getElementById('mobile-nav');
  if (!toggle || !nav) return;

  function openMenu() {
    nav.classList.add('active');
    if (overlay) overlay.classList.add('active');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    nav.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', function () {
    var isOpen = nav.classList.contains('active');
    isOpen ? closeMenu() : openMenu();
  });

  if (overlay) overlay.addEventListener('click', closeMenu);

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });
}

/* --- Header glass effect on scroll --- */
(function() {
  var header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function() {
      header.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });
  }
})();

(function () {
  'use strict';

  var detailPage = document.getElementById('detail-page');
  var basePath = (function() {
    var path = window.location.pathname;
    if (path.includes('/museo/')) return '../';
    return '';
  })();

  function getSampleId() {
    var params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id'), 10);
  }

  async function loadDetail() {
    var id = getSampleId();
    if (!id) { showError('ID campione non specificato.'); return; }

    try {
      var response = await fetch(basePath + 'dati.json');
      if (!response.ok) throw new Error('Errore nel caricamento dei dati');
      var campioni = await response.json();
      var campione = campioni.find(function(c){return c.id === id});

      if (!campione) { showError('Campione #' + id + ' non trovato.'); return; }

      document.title = campione.nome + ' — Museo delle Sabbie';
      renderDetail(campione, campioni);
    } catch (error) {
      showError(error.message);
    }
  }

  function showError(message) {
    detailPage.innerHTML =
      '<div class="detail-back"><a href="index.html" class="btn btn-back">← Torna alla collezione</a></div>' +
      '<div class="empty-state"><div class="empty-state-icon">⚠️</div><h3>Errore</h3><p>' + message + '</p></div>';
  }

  function metaItem(label, value) {
    if (!value) return '';
    return '<div class="metadata-item"><div class="metadata-label">' + label + '</div><div class="metadata-value">' + value + '</div></div>';
  }

  function imageBlock(src, alt, label) {
    return '<div class="detail-image-block">' +
      '<img src="' + basePath + src + '" alt="' + alt + '" onerror="this.src=\'' + basePath + 'images/coming-soon.jpg\';">' +
      '<div class="detail-image-label">' + label + '</div>' +
    '</div>';
  }

  function renderDetail(c, allCampioni) {
    var related = allCampioni
      .filter(function(s){return s.continente === c.continente && s.id !== c.id})
      .slice(0, 4);

    var sc = getSandColorD(c.tipologia);
    var tc = getContrastTextColorD(sc);

    var imagesHtml = imageBlock(c.immagine, 'Campione di sabbia: ' + c.nome, '📷 Immagine del campione');
    var microscopeImages = [];
    if (c.microscopio && c.microscopio !== 'images/coming-soon.jpg' && c.microscopio !== c.immagine) {
      microscopeImages.push({ src: c.microscopio, label: '🔬 Immagine al microscopio' });
    }
    if (Array.isArray(c.immagini_extra)) {
      c.immagini_extra.forEach(function(img) {
        if (img && img.src && !microscopeImages.some(function(existing) { return existing.src === img.src; })) {
          microscopeImages.push({ src: img.src, label: img.label || '🔬 Immagine al microscopio' });
        }
      });
    }
    imagesHtml += microscopeImages.map(function(img) {
      return imageBlock(img.src, img.label + ': ' + c.nome, img.label);
    }).join('');

    var tipologiaHtml = '<div class="metadata-item"><span class="metadata-label">Tipologia</span>' +
      '<span class="metadata-value sand-type-item" tabindex="0" role="listitem" data-sand-color="' + sc + '" data-sand-text="' + tc + '" style="background-color:' + sc + ';color:' + tc + ';padding:4px 12px;border-radius:20px;transition:all 0.3s ease;display:inline-flex;align-items:center;gap:6px;">' +
      '<span class="sand-swatch" style="width:9px;height:9px;border-radius:50%;background-color:' + sc + ';display:inline-block;transition:background-color 0.3s ease;"></span>' +
      c.tipologia + '</span></div>';

    detailPage.innerHTML =
      '<div class="detail-back"><a href="index.html" class="btn btn-back">← Torna alla collezione</a></div>' +
      '<div class="detail-header"><h1>' + c.nome + '</h1><p class="detail-header-location">📍 ' + c.provenienza + ' — ' + c.paese + ', ' + c.continente + '</p></div>' +
      '<div class="detail-content">' +
        '<div class="detail-images">' +
          imagesHtml +
        '</div>' +
        '<div class="detail-info">' +
          '<div class="detail-description"><h2>Descrizione</h2><p>' + c.descrizione + '</p></div>' +
          '<div class="detail-metadata"><h2>Scheda tecnica</h2><div class="metadata-grid">' +
            metaItem('Campione N°', c.id) +
            metaItem('Nome', c.nome) +
            metaItem('Provenienza', c.provenienza) +
            metaItem('Provincia', c.provincia) +
            metaItem('Isola', c.isola) +
            metaItem('Regione', c.regione) +
            metaItem('Bacino / Mare', c.bacino) +
            metaItem('Paese', c.paese) +
            metaItem('Continente', c.continente) +
            tipologiaHtml +
            metaItem('Anno di raccolta', c.anno) +
          '</div></div>' +
          '<div class="detail-qr"><h2>QR Code</h2><div class="qr-container" id="qr-code"></div><p class="qr-note">Scansiona per accedere a questa scheda dal tuo dispositivo</p></div>' +
        '</div>' +
      '</div>' +
      (related.length > 0 ? '<section class="related-section"><h2>Campioni correlati</h2><div class="related-grid">' +
        related.map(function(r) {
          var rsc = getSandColorD(r.tipologia);
          var rtc = getContrastTextColorD(rsc);
          return '<a href="dettaglio.html?id=' + r.id + '" class="card" aria-label="Vai al campione: ' + r.nome + '">' +
            '<div class="card-image-wrapper"><img class="card-image" src="' + basePath + r.immagine + '" alt="Campione: ' + r.nome + '" loading="lazy" onerror="this.src=\'' + basePath + 'images/coming-soon.jpg\';"><span class="card-badge">#' + r.id + '</span></div>' +
            '<div class="card-body"><h3 class="card-title">' + r.nome + '</h3><p class="card-location">📍 ' + r.provenienza + '</p>' +
            '<div class="card-meta"><span class="card-tag continent">' + r.continente + '</span><span class="card-tag">' + r.paese + '</span>' +
            '<li class="card-tag type sand-type-item" tabindex="0" role="listitem" data-sand-color="' + rsc + '" data-sand-text="' + rtc + '" style="background-color:' + rsc + ';color:' + rtc + ';transition:all 0.3s ease;"><span class="sand-swatch" style="background-color:' + rsc + ';transition:background-color 0.3s ease;"></span>' + r.tipologia + '</li>' +
            '</div></div></a>';
        }).join('') +
      '</div></section>' : '');

    generateQR(c.id);

    // Attach hover/focus listeners
    document.querySelectorAll('.sand-type-item').forEach(function(el) {
      var color = el.dataset.sandColor;
      var swatch = el.querySelector('.sand-swatch');

      var activate = function() {
        el.style.boxShadow = '0 2px 8px ' + color + '66';
        if (swatch) swatch.style.transform = 'scale(1.3)';
      };
      var deactivate = function() {
        el.style.boxShadow = 'none';
        if (swatch) swatch.style.transform = 'scale(1)';
      };

      el.addEventListener('mouseenter', activate);
      el.addEventListener('mouseleave', deactivate);
      el.addEventListener('focus', activate);
      el.addEventListener('blur', deactivate);
    });
  }

  function generateQR(id) {
    var qrContainer = document.getElementById('qr-code');
    if (!qrContainer) return;
    var pageUrl = window.location.href;

    if (typeof QRCode !== 'undefined') {
      new QRCode(qrContainer, {
        text: pageUrl, width: 180, height: 180,
        colorDark: '#2A2520', colorLight: '#FFFFFF',
        correctLevel: QRCode.CorrectLevel.M
      });
    } else {
      var img = document.createElement('img');
      img.src = 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=' + encodeURIComponent(pageUrl);
      img.alt = 'QR Code per questo campione';
      img.width = 180;
      img.height = 180;
      qrContainer.appendChild(img);
    }
  }

  initMobileMenuDetail();
  loadDetail();
})();
