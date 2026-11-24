# Humam Asathin Haqqani — Personal Portfolio

> Personal portfolio website of **Humam Asathin Haqqani**, Sarjana Terapan Teknik Informatika (Universitas Harkat Negeri). Focuses on Backend Engineering, Mobile Development, Data Science, and AI.

Built with pure **Vanilla Web Technologies (HTML5, CSS3, JavaScript ES6+)** with zero third-party framework dependencies, optimized for static hosting on **GitHub Pages**.

---

## ✨ Overview & Features

- **Editorial & Modern Design**: Implements an alabaster and denim blue aesthetic (`#F7F4EE` base, `#2D4A6E` primary, `#9E6240` warm accent), paired with _Lora_ serif for headings and _Plus Jakarta Sans_ for body typography.
- **Client-Side Bilingual (ID / EN)**: Seamless one-click language toggle between **Bahasa Indonesia** and **English** with zero page reload, powered by a localized dictionary and persisted via `localStorage`.
- **Interactive Project Showcase**:
  - Multi-category filter tabs (_Backend, Frontend, Mobile, Fullstack, AI & Data_).
  - Modal dialog with multi-slide screen previews, carousel navigation, keyboard shortcuts (`Esc`, `←`, `→`), and detailed contribution breakdowns.
- **Performance & Accessibility**:
  - Pure native implementation with zero bundle overhead.
  - Semantic HTML5 layout and ARIA attributes for accessibility.
  - Fully responsive design from mobile displays to ultra-wide desktop monitors.

---

## 📂 Project Structure

```text
HumamPortfolio/
├── index.html           # Main semantic markup & section definitions
├── README.md            # Repository documentation
├── assets/              # Static assets (profile photo, vector graphics)
│   ├── profile.jpg
│   └── profile-placeholder.svg
├── css/
│   └── style.css        # Design tokens, typography, component styling & responsive media queries
└── js/
    ├── translations.js  # Bilingual dictionary for ID & EN localization
    └── main.js          # Core interactivity: language switcher, filter engine, modal dialog & carousel
```

---

## 🛠️ Tech Stack

- **Markup & Layout**: HTML5 (Semantic elements)
- **Styling**: Modern CSS3 (Custom properties / CSS variables, Flexbox, Grid, CSS transitions)
- **Scripting**: Vanilla JavaScript (ES6+, DOM API, LocalStorage, event delegation)
- **Typography**: Google Fonts (_Lora_, _Plus Jakarta Sans_, _JetBrains Mono_)
- **Hosting Target**: GitHub Pages / Static Web Hosting

---

## 💻 Local Preview

Because this project is built entirely on standard static web technologies, no build tools or package managers are required.

### Option 1: Direct File

Simply open `index.html` in any modern web browser.

### Option 2: Local HTTP Server (Recommended)

Using Python:

```bash
python -m http.server 8000
```

Or using Node.js:

```bash
npx serve .
```

Then navigate to `http://localhost:8000` in your browser.

---

## 📄 License & Attribution

Designed and developed by **Humam Asathin Haqqani**.
