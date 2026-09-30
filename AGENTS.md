# Agent Instructions: Static Website Project

## 1. Project Overview
- **Project Name:** Yalla Habibi
- **Category:** Local Business
- **Description:** Yalla Habibi is a popular Lucena City fusion restaurant that serves vibrant, customizable Mediterranean-Mexican dishes like shawarma bowls and birria tacos. Its target audience consists of health-conscious young adults, local professionals, and families seeking fresh, flavorful, and fast-casual dining alternatives.
- **Primary Goal:** To attract customers

## 2. Technical Stack & Constraints
- **Core Stack:** Plain HTML5, CSS3, Vanilla JavaScript (ES6+).
- **Zero External Dependencies:** Do NOT use external build tools, package managers (npm/yarn), or third-party CSS/JS frameworks (no Tailwind CDN, Bootstrap, React, or jQuery).
- **Font & Icon Constraints:** Modern web-safe system font stacks or Google Fonts via `<link>` tag. Use inline SVGs or local SVG files in `assets/` for icons.
- **Paths:** All internal links, stylesheets, scripts, and asset references must use **relative paths** (e.g., `./assets/logo.png`, `./style.css`, `./script.js`) to ensure compatibility with GitHub Pages subdirectory hosting.

## 3. Directory Layout
```text
yalla-habibi/
├── AGENTS.md
├── index.html
├── style.css
├── script.js
└── assets/
    ├── 531821665_1160541802759277_3831146347920746539_n.jpg  (Official Yalla Habibi Circular Logo)
    ├── 550381175_1192264436253680_4836399726310677350_n.png  (Hero Interior Arch & Neon Art: "Mediterranean mood, mexican groove!")
    ├── 779944832_1475819591231495_5318647149067050822_n.jpg  (Build Your Own Bowl Menu Infographic & 4-Step Guide)
    ├── 800275457_1496946245785496_5178054049255909124_n.jpg  (Featured Item: New Shawarma Wrap)
    ├── 642359699_17875232058520632_6829404238685055257_n.jpg  (Featured Item: Loaded Habibi Fries Platter & Fresh Salad)
    ├── 642119347_17875051863520632_3456016616253996285_n.jpg  (Featured Item: Shawarma Rice Bowl & Matcha Swirl Soft Serve)
    └── 660427105_17879556843520632_7744609485749811534_n.jpg  (Fast-Casual Takeout Bags & Party Meal Packs)
```

## 4. UI/UX & Design Guidelines
- **Color Palette:**
  - Primary: Deep Mediterranean Teal (`#0C4A4A` / `#0D6269`)
  - Accent / CTA: Warm Terracotta Orange (`#E05A2B` / `#D34E1E`) & Habibi Gold (`#F59E0B`)
  - Background: Off-white Warm Cream (`#FBF9F5`) and Crisp White (`#FFFFFF`)
  - Text: High-contrast Dark Neutral (`#1E293B` / `#0F172A`)
  - Muted: Warm Sand / Slate Gray (`#64748B`)
- **Typography:** Google Fonts: `'Outfit'` / `'Plus Jakarta Sans'` with clean web-safe system fallback.
- **Layout Approach:** Mobile-first design using CSS Flexbox and CSS Grid.
- **Responsiveness:** Fluid breakpoints (Mobile: < 640px, Tablet: 640px - 1024px, Desktop: > 1024px).

## 5. Required Sections
1. **Header / Navbar:** Brand logo, navigation links, and a mobile hamburger menu toggle.
2. **Hero Section:** Clear value proposition, headline, short description, primary CTA buttons, and interior visual showcase.
3. **Core Content Section:** Products/services showcase + pricing/menu with real dishes (shawarma bowls, wraps, loaded fries, matcha desserts).
4. **Interactive Component Container:** Interactive "Build Your Own Bowl" customizer / order builder, interactive menu filter, modal dish inspector, and FAQ accordion.
5. **Contact / CTA Section:** Working static contact & reservation form UI, Lucena City location, operating hours, and direct contact cards.
6. **Footer:** Copyright, quick links, opening hours, Lucena City address, and accessible social links.

## 6. Agent Rules of Engagement
- Always generate complete, functional code blocks—avoid placeholders, ellipsis comments (`/* code continues here */`), or truncated snippets.
- Ensure semantic HTML tags are prioritized (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- Keep CSS organized with clear section headers, CSS custom properties (`:root`), and smooth transitions.
- Keep JavaScript modular, event-driven, and scoped without polluting global namespace.