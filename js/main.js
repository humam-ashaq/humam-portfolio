/**
 * MAIN INTERACTIVITY SCRIPT
 * Humam Asathin Haqqani Portfolio
 * Pure Vanilla JavaScript (No Frameworks)
 */

document.addEventListener('DOMContentLoaded', () => {
  // State
  let currentLang = localStorage.getItem('portfolio_lang') || 'id';

  // DOM Elements
  const langSwitch = document.getElementById('lang-switch');
  const langBtnId = document.getElementById('lang-btn-id');
  const langBtnEn = document.getElementById('lang-btn-en');
  const navLinksContainer = document.getElementById('nav-links');
  const navToggleBtn = document.getElementById('nav-toggle');
  const header = document.getElementById('header');
  const backToTopBtn = document.getElementById('back-to-top');
  const contactForm = document.getElementById('contact-form');
  const formAlert = document.getElementById('form-alert');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const currentYearSpan = document.getElementById('current-year');

  // Update current year dynamically
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  /* ==========================================================================
     1. BILINGUAL LANGUAGE SWITCHER (ID / EN)
     ========================================================================== */
  function applyLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    localStorage.setItem('portfolio_lang', lang);

    // Update HTML lang attribute
    document.documentElement.lang = lang;

    // Update Segmented Pill Active State
    if (langBtnId && langBtnEn) {
      if (lang === 'id') {
        langBtnId.classList.add('active');
        langBtnEn.classList.remove('active');
        langBtnId.setAttribute('aria-pressed', 'true');
        langBtnEn.setAttribute('aria-pressed', 'false');
      } else {
        langBtnEn.classList.add('active');
        langBtnId.classList.remove('active');
        langBtnEn.setAttribute('aria-pressed', 'true');
        langBtnId.setAttribute('aria-pressed', 'false');
      }
    }

    // Translate all elements with data-i18n
    const translatableElements = document.querySelectorAll('[data-i18n]');
    translatableElements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang][key]) {
        // If element has HTML tags inside like <strong> or SVGs, preserve properly
        el.innerHTML = translations[lang][key];
      }
    });

    // Translate form placeholders with data-i18n-ph
    const placeholderElements = document.querySelectorAll('[data-i18n-ph]');
    placeholderElements.forEach(el => {
      const key = el.getAttribute('data-i18n-ph');
      if (translations[lang][key]) {
        el.setAttribute('placeholder', translations[lang][key]);
      }
    });

    // Update Page Meta Title based on language
    if (lang === 'id') {
      document.title = "Humam Asathin Haqqani | Portofolio Sarjana Terapan Teknik Informatika";
    } else {
      document.title = "Humam Asathin Haqqani | Applied Bachelor Portfolio";
    }
  }

  // Segmented Pill Click Handlers
  if (langBtnId) {
    langBtnId.addEventListener('click', (e) => {
      e.stopPropagation();
      applyLanguage('id');
    });
  }

  if (langBtnEn) {
    langBtnEn.addEventListener('click', (e) => {
      e.stopPropagation();
      applyLanguage('en');
    });
  }

  if (langSwitch) {
    langSwitch.addEventListener('click', () => {
      const nextLang = currentLang === 'id' ? 'en' : 'id';
      applyLanguage(nextLang);
    });
  }

  // Initialize Language
  applyLanguage(currentLang);


  /* ==========================================================================
     2. MOBILE NAVIGATION DRAWER
     ========================================================================== */
  if (navToggleBtn && navLinksContainer) {
    navToggleBtn.addEventListener('click', () => {
      const isOpen = navLinksContainer.classList.contains('open');
      if (isOpen) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });

    // Close when clicking nav links
    const navLinks = navLinksContainer.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileNav();
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (navLinksContainer.classList.contains('open')) {
        if (!navLinksContainer.contains(e.target) && !navToggleBtn.contains(e.target)) {
          closeMobileNav();
        }
      }
    });
  }

  function openMobileNav() {
    navLinksContainer.classList.add('open');
    navToggleBtn.classList.add('open');
    navToggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    navLinksContainer.classList.remove('open');
    navToggleBtn.classList.remove('open');
    navToggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }


  /* ==========================================================================
     3. SCROLL SPY & NAVBAR ELEVATION
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');
  const allNavLinks = document.querySelectorAll('.nav-link');

  function handleScroll() {
    const scrollY = window.pageYOffset;

    // Header elevation shadow
    if (header) {
      if (scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }

    // Active nav link scroll spy
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        allNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Trigger once on load

  // Back to top action
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Ensure clicking 'Beranda' or Logo always scrolls to the exact top (top: 0)
  document.querySelectorAll('a[href="#home"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      if (window.history.pushState) {
        window.history.pushState(null, '', '#home');
      }
    });
  });

  // If page loaded with #home hash, ensure exact top alignment
  if (window.location.hash === '#home' || !window.location.hash) {
    window.scrollTo(0, 0);
  }


  /* ==========================================================================
     4. PROJECT FILTERING TABS & INTERACTIVE DETAIL MODAL
     ========================================================================== */
  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Toggle active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
          const categories = card.getAttribute('data-category').split(' ');

          if (filterValue === 'all' || categories.includes(filterValue)) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(10px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 200);
          }
        });
      });
    });
  }

  // Project Detail Catalog Data for Modal Dialog (Clean Placeholders)
  const projectCatalog = {
    p1: {
      title: "Judul Proyek 1",
      badge: "Kategori • Scope Proyek",
      badgeClass: "badge-coral",
      desc: "Deskripsi lengkap mengenai proyek ini, mencakup latar belakang permasalahan, arsitektur teknis yang dirancang, serta fungsionalitas dan solusi yang berhasil diimplementasikan.",
      contributions: [
        "Uraian peran dan tanggung jawab utama dalam merancang sistem atau antarmuka proyek.",
        "Uraian implementasi fitur kunci, integrasi modul, dan pengujian fungsionalitas.",
        "Uraian optimasi performa, pengelolaan basis data, atau integrasi API pihak ketiga.",
        "Uraian kolaborasi tim, dokumentasi teknis, atau proses deployment sistem."
      ],
      tech: ["Teknologi 1", "Teknologi 2", "Teknologi 3", "Teknologi 4"],
      slides: [
        {
          caption: "Pratinjau Antarmuka 1",
          mockup: `<svg class="mockup-svg" viewBox="0 0 280 170" width="100%" height="100%" aria-hidden="true">
            <g transform="translate(85, 8)">
              <rect x="0" y="0" width="110" height="155" rx="18" fill="#1E293B" stroke="#334155" stroke-width="2.5"/>
              <rect x="4" y="4" width="102" height="147" rx="15" fill="#F8FAFC"/>
              <rect x="38" y="8" width="34" height="6" rx="3" fill="#0F172A"/>
              <rect x="10" y="22" width="90" height="65" rx="8" fill="#E2E8F0"/>
              <circle cx="55" cy="54" r="18" fill="#2D4A6E" opacity="0.15"/>
              <text x="55" y="58" font-size="16" text-anchor="middle">📱</text>
              <rect x="16" y="70" width="78" height="13" rx="4" fill="#0F172A" opacity="0.85"/>
              <text x="55" y="79" font-size="7" font-family="sans-serif" font-weight="700" fill="#FFFFFF" text-anchor="middle">Tampilan Layar Utama</text>
              <rect x="10" y="93" width="42" height="24" rx="5" fill="#EBF1F7" stroke="#CBD5E1" stroke-width="0.8"/>
              <text x="31" y="104" font-size="6.5" font-family="sans-serif" fill="#2D4A6E" text-anchor="middle">Fitur A</text>
              <text x="31" y="113" font-size="8" font-family="sans-serif" font-weight="700" fill="#2D4A6E" text-anchor="middle">Aktif</text>
              <rect x="58" y="93" width="42" height="24" rx="5" fill="#F3E8DF" stroke="#CBD5E1" stroke-width="0.8"/>
              <text x="79" y="104" font-size="6.5" font-family="sans-serif" fill="#9E6240" text-anchor="middle">Fitur B</text>
              <text x="79" y="113" font-size="8" font-family="sans-serif" font-weight="700" fill="#9E6240" text-anchor="middle">Terhubung</text>
              <rect x="10" y="123" width="90" height="16" rx="8" fill="#2D4A6E"/>
              <text x="55" y="134" font-size="7.5" font-family="sans-serif" font-weight="700" fill="#FFFFFF" text-anchor="middle">Aksi Utama Sistem</text>
            </g>
          </svg>`
        },
        {
          caption: "Pratinjau Modul Fitur",
          mockup: `<svg class="mockup-svg" viewBox="0 0 280 170" width="100%" height="100%" aria-hidden="true">
            <g transform="translate(85, 8)">
              <rect x="0" y="0" width="110" height="155" rx="18" fill="#0F172A" stroke="#334155" stroke-width="2.5"/>
              <rect x="4" y="4" width="102" height="147" rx="15" fill="#1E293B"/>
              <rect x="38" y="8" width="34" height="6" rx="3" fill="#020617"/>
              <rect x="10" y="22" width="90" height="120" rx="8" fill="#0F172A"/>
              <rect x="18" y="32" width="40" height="42" rx="4" fill="none" stroke="#38BDF8" stroke-width="1.5" stroke-dasharray="3 2"/>
              <rect x="18" y="26" width="38" height="9" rx="2" fill="#2D4A6E"/>
              <text x="37" y="33" font-size="5.5" font-family="sans-serif" font-weight="700" fill="#FFFFFF" text-anchor="middle">Komponen 1</text>
              <rect x="62" y="55" width="32" height="35" rx="4" fill="none" stroke="#F59E0B" stroke-width="1.5" stroke-dasharray="3 2"/>
              <rect x="62" y="49" width="30" height="9" rx="2" fill="#9E6240"/>
              <text x="77" y="56" font-size="5.5" font-family="sans-serif" font-weight="700" fill="#FFFFFF" text-anchor="middle">Komponen 2</text>
              <rect x="16" y="118" width="78" height="16" rx="4" fill="#065F46"/>
              <text x="55" y="129" font-size="7" font-family="sans-serif" font-weight="700" fill="#A7F3D0" text-anchor="middle">Status: Siap Produksi</text>
            </g>
          </svg>`
        }
      ]
    },
    p2: {
      title: "Judul Proyek 2",
      badge: "Kategori • Scope Proyek",
      badgeClass: "badge-blue",
      desc: "Deskripsi lengkap mengenai proyek ini, mencakup latar belakang permasalahan, arsitektur teknis yang dirancang, serta fungsionalitas dan solusi yang berhasil diimplementasikan.",
      contributions: [
        "Uraian peran dan tanggung jawab utama dalam merancang sistem atau antarmuka proyek.",
        "Uraian implementasi fitur kunci, integrasi modul, dan pengujian fungsionalitas.",
        "Uraian optimasi performa, pengelolaan basis data, atau integrasi API pihak ketiga.",
        "Uraian kolaborasi tim, dokumentasi teknis, atau proses deployment sistem."
      ],
      tech: ["Teknologi 1", "Teknologi 2", "Teknologi 3", "Teknologi 4"],
      slides: [
        {
          caption: "Pratinjau Arsitektur Sistem",
          mockup: `<svg class="mockup-svg" viewBox="0 0 280 170" width="100%" height="100%" aria-hidden="true">
            <g transform="translate(35, 12)">
              <rect x="0" y="0" width="210" height="145" rx="14" fill="#0F172A" stroke="#1E293B" stroke-width="1.5"/>
              <circle cx="14" cy="14" r="4" fill="#EF4444"/>
              <circle cx="26" cy="14" r="4" fill="#F59E0B"/>
              <circle cx="38" cy="14" r="4" fill="#10B981"/>
              <rect x="60" y="8" width="120" height="12" rx="4" fill="#1E293B"/>
              <text x="120" y="17" font-size="7" font-family="monospace" fill="#94A3B8" text-anchor="middle">api.endpoint.internal/v1/service</text>
              <rect x="14" y="28" width="60" height="16" rx="4" fill="#064E3B"/>
              <text x="44" y="39" font-size="8" font-family="monospace" font-weight="700" fill="#34D399" text-anchor="middle">200 OK • Online</text>
              <rect x="80" y="28" width="58" height="16" rx="4" fill="#1E3A8A"/>
              <text x="109" y="39" font-size="8" font-family="monospace" font-weight="700" fill="#60A5FA" text-anchor="middle">POST /process</text>
              <rect x="14" y="50" width="182" height="66" rx="6" fill="#020617"/>
              <text x="24" y="66" font-size="7.5" font-family="monospace" fill="#F43F5E">"status": <tspan fill="#34D399">"success"</tspan>,</text>
              <text x="24" y="80" font-size="7.5" font-family="monospace" fill="#F43F5E">"service_id": <tspan fill="#38BDF8">"SRV-2026-001"</tspan>,</text>
              <text x="24" y="94" font-size="7.5" font-family="monospace" fill="#F43F5E">"execution_time": <tspan fill="#A78BFA">"12.4ms"</tspan></text>
              <rect x="14" y="122" width="182" height="15" rx="4" fill="#1E293B"/>
              <text x="105" y="132" font-size="7.5" font-family="monospace" fill="#94A3B8" text-anchor="middle">High-Performance Backend Engine</text>
            </g>
          </svg>`
        }
      ]
    },
    p3: {
      title: "Judul Proyek 3",
      badge: "Kategori • Scope Proyek",
      badgeClass: "badge-green",
      desc: "Deskripsi lengkap mengenai proyek ini, mencakup latar belakang permasalahan, arsitektur teknis yang dirancang, serta fungsionalitas dan solusi yang berhasil diimplementasikan.",
      contributions: [
        "Uraian peran dan tanggung jawab utama dalam merancang sistem atau antarmuka proyek.",
        "Uraian implementasi fitur kunci, integrasi modul, dan pengujian fungsionalitas.",
        "Uraian optimasi performa, pengelolaan basis data, atau integrasi API pihak ketiga.",
        "Uraian kolaborasi tim, dokumentasi teknis, atau proses deployment sistem."
      ],
      tech: ["Teknologi 1", "Teknologi 2", "Teknologi 3", "Teknologi 4"],
      slides: [
        {
          caption: "Pratinjau Layar Sensor",
          mockup: `<svg class="mockup-svg" viewBox="0 0 280 170" width="100%" height="100%" aria-hidden="true">
            <g transform="translate(85, 8)">
              <rect x="0" y="0" width="110" height="155" rx="18" fill="#0F172A" stroke="#1E293B" stroke-width="2.5"/>
              <rect x="4" y="4" width="102" height="147" rx="15" fill="#1E293B"/>
              <rect x="38" y="8" width="34" height="6" rx="3" fill="#020617"/>
              <rect x="10" y="22" width="90" height="85" rx="8" fill="#0F172A"/>
              <circle cx="55" cy="58" r="22" fill="#2D4A6E" opacity="0.3"/>
              <circle cx="55" cy="58" r="8" fill="#38BDF8"/>
              <rect x="22" y="32" width="66" height="52" rx="4" fill="none" stroke="#38BDF8" stroke-width="1.5" stroke-dasharray="4 2"/>
              <rect x="20" y="90" width="70" height="12" rx="3" fill="#0369A1"/>
              <text x="55" y="99" font-size="7" font-family="sans-serif" font-weight="700" fill="#FFFFFF" text-anchor="middle">Modul Sensor: Aktif</text>
              <rect x="10" y="114" width="90" height="24" rx="6" fill="#020617"/>
              <text x="24" y="129" font-size="10" text-anchor="middle">⚡</text>
              <text x="58" y="129" font-size="7.5" font-family="sans-serif" font-weight="600" fill="#38BDF8">Inferensi Real-Time</text>
            </g>
          </svg>`
        }
      ]
    },
    p4: {
      title: "Judul Proyek 4",
      badge: "Kategori • Scope Proyek",
      badgeClass: "badge-purple",
      desc: "Deskripsi lengkap mengenai proyek ini, mencakup latar belakang permasalahan, arsitektur teknis yang dirancang, serta fungsionalitas dan solusi yang berhasil diimplementasikan.",
      contributions: [
        "Uraian peran dan tanggung jawab utama dalam merancang sistem atau antarmuka proyek.",
        "Uraian implementasi fitur kunci, integrasi modul, dan pengujian fungsionalitas.",
        "Uraian optimasi performa, pengelolaan basis data, atau integrasi API pihak ketiga.",
        "Uraian kolaborasi tim, dokumentasi teknis, atau proses deployment sistem."
      ],
      tech: ["Teknologi 1", "Teknologi 2", "Teknologi 3", "Teknologi 4"],
      slides: [
        {
          caption: "Pratinjau Dashboard Portal",
          mockup: `<svg class="mockup-svg" viewBox="0 0 280 170" width="100%" height="100%" aria-hidden="true">
            <g transform="translate(30, 18)">
              <rect x="0" y="0" width="220" height="126" rx="8" fill="#1E293B" stroke="#334155" stroke-width="2"/>
              <rect x="4" y="4" width="212" height="118" rx="6" fill="#F8FAFC"/>
              <rect x="4" y="4" width="212" height="16" fill="#E2E8F0"/>
              <circle cx="14" cy="12" r="3" fill="#EF4444"/>
              <circle cx="23" cy="12" r="3" fill="#F59E0B"/>
              <circle cx="32" cy="12" r="3" fill="#10B981"/>
              <rect x="44" y="8" width="100" height="8" rx="3" fill="#FFFFFF"/>
              <text x="94" y="14.5" font-size="5.5" font-family="sans-serif" fill="#64748B" text-anchor="middle">portal.aplikasi.com/dashboard</text>
              <rect x="12" y="26" width="70" height="14" rx="3" fill="#2D4A6E"/>
              <text x="47" y="35.5" font-size="6.5" font-family="sans-serif" font-weight="700" fill="#FFFFFF" text-anchor="middle">Dashboard Terpadu</text>
              <rect x="12" y="45" width="130" height="66" rx="4" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1"/>
              <rect x="12" y="45" width="130" height="14" fill="#F1F5F9"/>
              <text x="20" y="54" font-size="6" font-family="sans-serif" font-weight="700" fill="#475569">Modul Layanan</text>
              <text x="75" y="54" font-size="6" font-family="sans-serif" font-weight="700" fill="#475569">Status</text>
              <text x="115" y="54" font-size="6" font-family="sans-serif" font-weight="700" fill="#475569">Nilai</text>
              <text x="20" y="70" font-size="6" font-family="sans-serif" fill="#1E293B">Layanan A</text>
              <text x="75" y="70" font-size="6" font-family="sans-serif" fill="#059669">100% Selesai</text>
              <text x="115" y="70" font-size="6" font-family="sans-serif" font-weight="700" fill="#2D4A6E">Optimal</text>
              <rect x="150" y="45" width="58" height="66" rx="4" fill="#EFF6FF" stroke="#BFDBFE" stroke-width="1"/>
              <rect x="162" y="53" width="34" height="34" rx="3" fill="#1E293B"/>
              <rect x="166" y="57" width="10" height="10" fill="#FFFFFF"/>
              <rect x="182" y="57" width="10" height="10" fill="#FFFFFF"/>
              <rect x="166" y="73" width="10" height="10" fill="#FFFFFF"/>
              <text x="179" y="100" font-size="5.5" font-family="sans-serif" font-weight="700" fill="#1D4ED8" text-anchor="middle">Verifikasi QR</text>
              <path d="M-12 126 L232 126 L220 133 L-2 133 Z" fill="#94A3B8"/>
              <rect x="85" y="126" width="50" height="4" rx="2" fill="#CBD5E1"/>
            </g>
          </svg>`
        }
      ]
    },
    p5: {
      title: "Judul Proyek 5",
      badge: "Kategori • Scope Proyek",
      badgeClass: "badge-brown",
      desc: "Deskripsi lengkap mengenai proyek ini, mencakup latar belakang permasalahan, arsitektur teknis yang dirancang, serta fungsionalitas dan solusi yang berhasil diimplementasikan.",
      contributions: [
        "Uraian peran dan tanggung jawab utama dalam merancang sistem atau antarmuka proyek.",
        "Uraian implementasi fitur kunci, integrasi modul, dan pengujian fungsionalitas.",
        "Uraian optimasi performa, pengelolaan basis data, atau integrasi API pihak ketiga.",
        "Uraian kolaborasi tim, dokumentasi teknis, atau proses deployment sistem."
      ],
      tech: ["Teknologi 1", "Teknologi 2", "Teknologi 3", "Teknologi 4"],
      slides: [
        {
          caption: "Pratinjau Dashboard Metrik",
          mockup: `<svg class="mockup-svg" viewBox="0 0 280 170" width="100%" height="100%" aria-hidden="true">
            <g transform="translate(30, 15)">
              <rect x="0" y="0" width="220" height="135" rx="10" fill="#0B132B" stroke="#1C2541" stroke-width="1.5"/>
              <rect x="12" y="10" width="70" height="10" rx="3" fill="#1C2541"/>
              <text x="47" y="18" font-size="6.5" font-family="sans-serif" font-weight="700" fill="#6FFFE9" text-anchor="middle">LIVE METRICS FEED</text>
              <circle cx="198" cy="15" r="3.5" fill="#10B981"/>
              <text x="187" y="17.5" font-size="6" font-family="sans-serif" fill="#A5B4FC" text-anchor="end">Status: 99.9% Normal</text>
              <rect x="12" y="26" width="60" height="26" rx="4" fill="#1C2541"/>
              <text x="20" y="36" font-size="5.5" font-family="sans-serif" fill="#94A3B8">Metrik Utama</text>
              <text x="20" y="48" font-size="9" font-family="sans-serif" font-weight="700" fill="#6FFFE9">98.5%</text>
              <rect x="80" y="26" width="60" height="26" rx="4" fill="#1C2541"/>
              <text x="88" y="36" font-size="5.5" font-family="sans-serif" fill="#94A3B8">Throughput</text>
              <text x="88" y="48" font-size="9" font-family="sans-serif" font-weight="700" fill="#38BDF8">4,200 req/s</text>
              <rect x="148" y="26" width="60" height="26" rx="4" fill="#1C2541"/>
              <text x="156" y="36" font-size="5.5" font-family="sans-serif" fill="#94A3B8">Error Rate</text>
              <text x="156" y="48" font-size="9" font-family="sans-serif" font-weight="700" fill="#34D399">0.01%</text>
              <rect x="12" y="60" width="196" height="64" rx="6" fill="#1C2541" opacity="0.6"/>
              <path d="M16 100 Q 40 75, 60 90 T 100 80 T 140 70 T 175 88 T 204 68" fill="none" stroke="#6FFFE9" stroke-width="2"/>
              <path d="M16 100 Q 40 75, 60 90 T 100 80 T 140 70 T 175 88 T 204 68 L 204 120 L 16 120 Z" fill="#6FFFE9" opacity="0.12"/>
            </g>
          </svg>`
        }
      ]
    },
    p6: {
      title: "Judul Proyek 6",
      badge: "Kategori • Scope Proyek",
      badgeClass: "badge-blue",
      desc: "Deskripsi lengkap mengenai proyek ini, mencakup latar belakang permasalahan, arsitektur teknis yang dirancang, serta fungsionalitas dan solusi yang berhasil diimplementasikan.",
      contributions: [
        "Uraian peran dan tanggung jawab utama dalam merancang sistem atau antarmuka proyek.",
        "Uraian implementasi fitur kunci, integrasi modul, dan pengujian fungsionalitas.",
        "Uraian optimasi performa, pengelolaan basis data, atau integrasi API pihak ketiga.",
        "Uraian kolaborasi tim, dokumentasi teknis, atau proses deployment sistem."
      ],
      tech: ["Teknologi 1", "Teknologi 2", "Teknologi 3", "Teknologi 4"],
      slides: [
        {
          caption: "Pratinjau Test Pipeline",
          mockup: `<svg class="mockup-svg" viewBox="0 0 280 170" width="100%" height="100%" aria-hidden="true">
            <g transform="translate(30, 15)">
              <rect x="0" y="0" width="220" height="135" rx="10" fill="#0F172A" stroke="#1E293B" stroke-width="1.5"/>
              <rect x="14" y="10" width="80" height="12" rx="3" fill="#1E293B"/>
              <text x="54" y="18.5" font-size="6.5" font-family="monospace" font-weight="700" fill="#E2E8F0" text-anchor="middle">CI/CD TEST PIPELINE</text>
              <rect x="155" y="10" width="52" height="12" rx="3" fill="#064E3B"/>
              <text x="181" y="18.5" font-size="6" font-family="monospace" font-weight="700" fill="#34D399" text-anchor="middle">STATUS: PASS</text>
              <rect x="14" y="32" width="40" height="24" rx="4" fill="#1E293B" stroke="#10B981" stroke-width="1.2"/>
              <text x="34" y="42" font-size="6" font-family="sans-serif" fill="#94A3B8" text-anchor="middle">Unit Test</text>
              <text x="34" y="51" font-size="7" font-family="sans-serif" font-weight="700" fill="#34D399" text-anchor="middle">✓ Selesai</text>
              <line x1="54" y1="44" x2="68" y2="44" stroke="#10B981" stroke-width="1.5"/>
              <rect x="68" y="32" width="40" height="24" rx="4" fill="#1E293B" stroke="#10B981" stroke-width="1.2"/>
              <text x="88" y="42" font-size="6" font-family="sans-serif" fill="#94A3B8" text-anchor="middle">API Test</text>
              <text x="88" y="51" font-size="7" font-family="sans-serif" font-weight="700" fill="#34D399" text-anchor="middle">✓ Selesai</text>
              <line x1="108" y1="44" x2="122" y2="44" stroke="#10B981" stroke-width="1.5"/>
              <rect x="122" y="32" width="40" height="24" rx="4" fill="#1E293B" stroke="#10B981" stroke-width="1.2"/>
              <text x="142" y="42" font-size="6" font-family="sans-serif" fill="#94A3B8" text-anchor="middle">Load Test</text>
              <text x="142" y="51" font-size="7" font-family="sans-serif" font-weight="700" fill="#34D399" text-anchor="middle">✓ Selesai</text>
              <line x1="162" y1="44" x2="176" y2="44" stroke="#10B981" stroke-width="1.5"/>
              <rect x="176" y="32" width="30" height="24" rx="4" fill="#047857"/>
              <text x="191" y="47" font-size="12" text-anchor="middle" fill="#FFFFFF">✓</text>
              <rect x="14" y="66" width="192" height="58" rx="5" fill="#020617"/>
              <text x="22" y="80" font-size="6.5" font-family="monospace" fill="#34D399">PASS: test_module_integration (0.012s)</text>
              <text x="22" y="92" font-size="6.5" font-family="monospace" fill="#34D399">PASS: test_performance_benchmark (0.035s)</text>
              <text x="22" y="104" font-size="6.5" font-family="monospace" fill="#34D399">PASS: test_database_transactions (0.021s)</text>
              <text x="22" y="116" font-size="6.5" font-family="monospace" fill="#60A5FA">Total: 100% lulus, 0 gagal</text>
            </g>
          </svg>`
        }
      ]
    }
  };

  // Modal Dialog & Carousel State
  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalContentBody = document.getElementById('modal-content-body');

  let currentModalPid = null;
  let currentSlideIndex = 0;

  function renderCarouselSlide() {
    const data = projectCatalog[currentModalPid];
    if (!data) return;

    const showcaseContent = document.getElementById('modal-showcase-content');
    const captionBar = document.getElementById('modal-showcase-caption');
    const dotsContainer = document.getElementById('modal-showcase-dots');

    const slides = data.slides || [];
    if (slides.length === 0) return;

    const currentSlide = slides[currentSlideIndex];

    if (showcaseContent) {
      showcaseContent.style.opacity = '0';
      setTimeout(() => {
        showcaseContent.innerHTML = currentSlide.mockup;
        showcaseContent.style.opacity = '1';
      }, 120);
    }

    if (captionBar) {
      captionBar.textContent = `${data.title} — ${currentSlide.caption} (${currentSlideIndex + 1} / ${slides.length})`;
    }

    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.showcase-dot');
      dots.forEach((dot, idx) => {
        if (idx === currentSlideIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }
  }

  function prevSlide() {
    const data = projectCatalog[currentModalPid];
    if (!data || !data.slides) return;
    currentSlideIndex = (currentSlideIndex - 1 + data.slides.length) % data.slides.length;
    renderCarouselSlide();
  }

  function nextSlide() {
    const data = projectCatalog[currentModalPid];
    if (!data || !data.slides) return;
    currentSlideIndex = (currentSlideIndex + 1) % data.slides.length;
    renderCarouselSlide();
  }

  function goToSlide(idx) {
    currentSlideIndex = idx;
    renderCarouselSlide();
  }

  window.prevSlide = prevSlide;
  window.nextSlide = nextSlide;
  window.goToSlide = goToSlide;

  function openProjectModal(pid) {
    const data = projectCatalog[pid];
    if (!data || !projectModal || !modalContentBody) return;

    currentModalPid = pid;
    currentSlideIndex = 0;

    const slides = data.slides || [];
    const firstSlide = slides[0] || { caption: 'Overview', mockup: '' };

    modalContentBody.innerHTML = `
      <div class="modal-top-bar">
        <div class="modal-header-info">
          <span class="modal-category-badge">${data.badge}</span>
          <h3 class="modal-title">${data.title}</h3>
        </div>
        <button type="button" class="modal-close-btn" id="modal-inner-close" onclick="closeProjectModal()" aria-label="Tutup jendela modal">✕</button>
      </div>

      <div class="modal-showcase-box">
        <button type="button" class="carousel-arrow arrow-prev" aria-label="Slide sebelumnya" onclick="prevSlide()">‹</button>
        <div class="showcase-content-area" id="modal-showcase-content">
          ${firstSlide.mockup}
        </div>
        <button type="button" class="carousel-arrow arrow-next" aria-label="Slide berikutnya" onclick="nextSlide()">›</button>
        
        <div class="showcase-caption-bar" id="modal-showcase-caption">
          ${data.title} — ${firstSlide.caption} (1 / ${slides.length})
        </div>
      </div>

      <div class="showcase-dots-row" id="modal-showcase-dots">
        ${slides.map((_, idx) => `
          <button type="button" class="showcase-dot ${idx === 0 ? 'active' : ''}" onclick="goToSlide(${idx})" aria-label="Slide ${idx + 1}"></button>
        `).join('')}
      </div>

      <div class="modal-contributions-card">
        <h4 class="contrib-title">
          <span class="contrib-title-icon">📋</span> Peran &amp; Kontribusi Utama dalam Proyek:
        </h4>
        <ul class="contrib-list">
          ${data.contributions.map(point => `
            <li class="contrib-item">
              <span class="contrib-check">✓</span>
              <span class="contrib-text">${point}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <div class="modal-actions-row">
        <div class="modal-chips-row">
          ${data.tech.map(t => `<span class="p-chip">${t}</span>`).join('')}
        </div>
        <div style="display: flex; gap: 10px; align-items: center;">
          <a href="#projects" class="btn btn-accent" style="padding: 8px 18px; font-size: 0.84rem;" onclick="closeProjectModal()">
            Demo Aplikasi <span class="btn-emoji">💻</span>
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="padding: 8px 18px; font-size: 0.84rem;">
            Kode Sumber <span class="btn-emoji">↗</span>
          </a>
        </div>
      </div>
    `;

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (!projectModal) return;
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  window.closeProjectModal = closeProjectModal;

  // Make the ENTIRE PROJECT CARD CLICKABLE (dipencet di bagian manapun membuka modal)
  projectCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't intercept external anchor tags with target="_blank"
      if (e.target.closest('a[target="_blank"]')) return;
      e.preventDefault();
      const pid = card.getAttribute('data-pid');
      if (pid) {
        openProjectModal(pid);
      }
    });
  });

  // Modal triggers (buttons and links inside or outside cards)
  const modalTriggers = document.querySelectorAll('[data-open-modal]');
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const pid = trigger.getAttribute('data-open-modal');
      openProjectModal(pid);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeProjectModal);

  window.addEventListener('keydown', (e) => {
    if (projectModal && projectModal.classList.contains('active')) {
      if (e.key === 'Escape') {
        closeProjectModal();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    }
  });


  /* ==========================================================================
     5. CONTACT FORM HANDLING WITH FEEDBACK
     ========================================================================== */
  if (contactForm && formAlert) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !subject || !message) {
        showAlert(translations[currentLang].form_error_msg, 'error');
        return;
      }

      // Simulation of submission feedback
      const submitBtn = document.getElementById('form-submit-btn');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Mengirim...</span>`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        contactForm.reset();
        showAlert(translations[currentLang].form_success_msg, 'success');
      }, 700);
    });
  }

  function showAlert(msg, type) {
    formAlert.textContent = msg;
    formAlert.className = `form-alert ${type}`;
    formAlert.style.display = 'block';

    setTimeout(() => {
      formAlert.style.display = 'none';
    }, 6000);
  }


  /* ==========================================================================
     6. RANDOMIZED FLOATING PILLS POSITIONS ON REFRESH
     ========================================================================== */
  function randomizeFloatingPills() {
    const pills = Array.from(document.querySelectorAll('.floating-pill'));
    if (!pills.length) return;

    const isMobile = window.innerWidth <= 768;

    // 5 distinct perimeter anchor zones around the photo circle.
    // 'mid-right' has allowSE: false so the wide 'Software Engineering' pill
    // never covers the user's face in the upper-right center of the portrait.
    const desktopZones = [
      { id: 'top-right', top: -16, right: -18 },
      { id: 'top-left', top: 16, left: -28 },
      { id: 'mid-right', top: 122, right: -32, allowSE: false },
      { id: 'bottom-left', bottom: 65, left: -28 },
      { id: 'bottom-right', bottom: -14, right: 28 }
    ];

    const mobileZones = [
      { id: 'top-right', top: -12, right: -10 },
      { id: 'top-left', top: 12, left: -16 },
      { id: 'mid-right', top: 92, right: -22, allowSE: false },
      { id: 'bottom-left', bottom: 50, left: -16 },
      { id: 'bottom-right', bottom: -10, right: 18 }
    ];

    const zones = (isMobile ? mobileZones : desktopZones).map(z => ({ ...z }));

    // Isolate Software Engineering pill to guarantee it never takes mid-right
    const sePill = pills.find(p => p.getAttribute('data-pill') === 'se') || pills[0];
    const otherPills = pills.filter(p => p !== sePill);

    // Randomly pick one of the safe zones (excluding mid-right) for Software Engineering
    const safeZonesForSE = zones.filter(z => z.allowSE !== false);
    const chosenSEZone = safeZonesForSE[Math.floor(Math.random() * safeZonesForSE.length)];

    // Remove chosen zone from pool for the other pills
    const remainingZones = zones.filter(z => z !== chosenSEZone);

    // Shuffle the remaining 4 zones for the shorter pills (Backend, Python, Go, Laravel)
    for (let i = remainingZones.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [remainingZones[i], remainingZones[j]] = [remainingZones[j], remainingZones[i]];
    }

    const assignments = [
      { pill: sePill, zone: chosenSEZone },
      ...otherPills.map((pill, idx) => ({ pill, zone: remainingZones[idx % remainingZones.length] }))
    ];

    // Create a balanced color pool (e.g. 3 blue / 2 brown or 2 blue / 3 brown) and shuffle
    const themePool = ['pill-blue', 'pill-blue', 'pill-brown', 'pill-brown', Math.random() > 0.5 ? 'pill-blue' : 'pill-brown'];
    for (let i = themePool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [themePool[i], themePool[j]] = [themePool[j], themePool[i]];
    }

    assignments.forEach(({ pill, zone }, idx) => {
      // Assign randomized color theme (pure blue or pure brown)
      pill.classList.remove('pill-blue', 'pill-brown');
      pill.classList.add(themePool[idx % themePool.length]);

      // Slight organic jitter (±4px) for subtle variety
      const jitterX = Math.floor(Math.random() * 9) - 4;
      const jitterY = Math.floor(Math.random() * 7) - 3;

      // Explicitly reset all 4 coordinate edges to 'auto' so browser never stretches pill
      pill.style.top = 'auto';
      pill.style.right = 'auto';
      pill.style.bottom = 'auto';
      pill.style.left = 'auto';

      if (zone.top !== undefined) pill.style.top = `${zone.top + jitterY}px`;
      if (zone.bottom !== undefined) pill.style.bottom = `${zone.bottom + jitterY}px`;
      if (zone.left !== undefined) pill.style.left = `${zone.left + jitterX}px`;
      if (zone.right !== undefined) pill.style.right = `${zone.right + jitterX}px`;

      // Assign organic floating animation duration and staggered delays
      const duration = (3.4 + Math.random() * 1.8).toFixed(2);
      const delay = (Math.random() * 2.2).toFixed(2);
      pill.style.setProperty('--float-duration', `${duration}s`);
      pill.style.setProperty('--float-delay', `${delay}s`);
    });
  }

  // Execute on load
  randomizeFloatingPills();

});
